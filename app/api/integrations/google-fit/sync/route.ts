import { type NextRequest, NextResponse } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import {
  decryptSecret,
  encryptSecret,
  fetchGoogleFitDailyActivity,
  isGoogleFitEnabled,
  refreshGoogleFitAccessToken,
} from "@/lib/integrations/google-fit";
import { googleFitSyncSchema } from "@/lib/schemas/google-fit";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

type ConnectionRow = {
  wallet_address: string;
  access_token_encrypted: string;
  refresh_token_encrypted: string;
  token_expiry: string;
  scope: string;
};

function isMissingRelationError(err: { message?: string; code?: string } | null): boolean {
  if (!err?.message) {
    return false;
  }
  const m = err.message.toLowerCase();
  return err.code === "42P01" || (m.includes("relation") && m.includes("does not exist"));
}

export async function POST(request: NextRequest) {
  if (!isGoogleFitEnabled()) {
    return NextResponse.json({ error: "integration_disabled" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "invalid";
    const status = msg === "payload_too_large" ? 413 : 400;
    return NextResponse.json({ error: msg }, { status });
  }

  const parsed = googleFitSyncSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const wallet_address = normalizeWalletAddress(parsed.data.wallet_address);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }
  const rangeDays: 7 | 30 = parsed.data.range === "7d" ? 7 : 30;

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: connection, error: connectionError } = await supabase
    .from("google_fit_connections")
    .select("wallet_address,access_token_encrypted,refresh_token_encrypted,token_expiry,scope")
    .eq("wallet_address", wallet_address)
    .is("revoked_at", null)
    .maybeSingle();
  if (connectionError) {
    console.error("[google-fit/sync] connection fetch", connectionError);
    const hint = isMissingRelationError(connectionError) ? "apply_supabase_migrations" : undefined;
    return NextResponse.json({ error: "fetch_failed", ...(hint ? { hint } : {}) }, { status: 502 });
  }
  if (!connection) {
    return NextResponse.json({ error: "not_connected" }, { status: 404 });
  }

  const row = connection as ConnectionRow;
  let accessToken: string;
  let refreshToken: string;
  try {
    accessToken = decryptSecret(row.access_token_encrypted);
    refreshToken = decryptSecret(row.refresh_token_encrypted);
  } catch (e) {
    console.error("[google-fit/sync] decrypt", e);
    return NextResponse.json({ error: "invalid_token_store" }, { status: 502 });
  }

  let token_expiry = row.token_expiry;
  const now = new Date();
  const expiresSoon = Date.parse(row.token_expiry) - now.getTime() < 60_000;
  if (expiresSoon) {
    try {
      const refreshed = await refreshGoogleFitAccessToken(refreshToken);
      accessToken = refreshed.access_token;
      if (refreshed.refresh_token) {
        refreshToken = refreshed.refresh_token;
      }
      const expiresInMs = Math.max(60, Number(refreshed.expires_in || 3600)) * 1000;
      token_expiry = new Date(Date.now() + expiresInMs).toISOString();

      const { error: tokenUpdateError } = await supabase
        .from("google_fit_connections")
        .update({
          access_token_encrypted: encryptSecret(accessToken),
          refresh_token_encrypted: encryptSecret(refreshToken),
          token_expiry,
          scope: refreshed.scope ?? row.scope,
          updated_at: now.toISOString(),
        })
        .eq("wallet_address", wallet_address);
      if (tokenUpdateError) {
        console.error("[google-fit/sync] token update", tokenUpdateError);
      }
    } catch (e) {
      console.error("[google-fit/sync] token refresh", e);
      return NextResponse.json({ error: "token_refresh_failed" }, { status: 502 });
    }
  }

  let points;
  try {
    points = await fetchGoogleFitDailyActivity(accessToken, rangeDays);
  } catch (e) {
    console.error("[google-fit/sync] aggregate", e);
    return NextResponse.json({ error: "aggregate_failed" }, { status: 502 });
  }

  const syncedAt = new Date().toISOString();
  if (points.length > 0) {
    const { error: upsertError } = await supabase.from("fitness_daily_metrics").upsert(
      points.map((point) => ({
        wallet_address,
        metric_date: point.metric_date,
        steps: point.steps,
        active_minutes: point.active_minutes,
        calories_kcal: point.calories_kcal,
        source: "google_fit",
        synced_at: syncedAt,
        updated_at: syncedAt,
      })),
      { onConflict: "wallet_address,metric_date" },
    );
    if (upsertError) {
      console.error("[google-fit/sync] upsert", upsertError);
      const hint = isMissingRelationError(upsertError) ? "apply_supabase_migrations" : undefined;
      return NextResponse.json({ error: "save_failed", ...(hint ? { hint } : {}) }, { status: 502 });
    }
  }

  const { error: connectionUpdateError } = await supabase
    .from("google_fit_connections")
    .update({
      last_sync_at: syncedAt,
      token_expiry,
      updated_at: syncedAt,
      revoked_at: null,
    })
    .eq("wallet_address", wallet_address);
  if (connectionUpdateError) {
    console.error("[google-fit/sync] connection update", connectionUpdateError);
  }

  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ google_health_connected_at: syncedAt, updated_at: syncedAt })
    .eq("wallet_address", wallet_address);
  if (profileUpdateError) {
    console.error("[google-fit/sync] profile update", profileUpdateError);
  }

  return NextResponse.json({
    ok: true,
    synced_at: syncedAt,
    points_synced: points.length,
  });
}
