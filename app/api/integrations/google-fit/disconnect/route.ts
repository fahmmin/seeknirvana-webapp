import { type NextRequest, NextResponse } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { decryptSecret, isGoogleFitEnabled, revokeGoogleToken } from "@/lib/integrations/google-fit";
import { googleFitWalletSchema } from "@/lib/schemas/google-fit";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

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

  const parsed = googleFitWalletSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const wallet_address = normalizeWalletAddress(parsed.data.wallet_address);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("google_fit_connections")
    .select("access_token_encrypted")
    .eq("wallet_address", wallet_address)
    .maybeSingle();
  if (fetchError) {
    console.error("[google-fit/disconnect] fetch", fetchError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
  if (!existing) {
    return NextResponse.json({ ok: true, disconnected: true });
  }

  try {
    const accessToken = decryptSecret(existing.access_token_encrypted);
    await revokeGoogleToken(accessToken);
  } catch (e) {
    console.warn("[google-fit/disconnect] revoke failed", e);
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("google_fit_connections")
    .update({ revoked_at: now, updated_at: now })
    .eq("wallet_address", wallet_address);
  if (updateError) {
    console.error("[google-fit/disconnect] update", updateError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ google_health_connected_at: null, updated_at: now })
    .eq("wallet_address", wallet_address);
  if (profileError) {
    console.error("[google-fit/disconnect] profile", profileError);
  }

  return NextResponse.json({ ok: true, disconnected: true });
}
