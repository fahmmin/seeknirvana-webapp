import { type NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/api/client-ip";
import { isGoogleFitEnabled } from "@/lib/integrations/google-fit";
import { rateLimitSync } from "@/lib/rate-limit";
import { googleFitSummaryQuerySchema } from "@/lib/schemas/google-fit";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

function isMissingRelationError(err: { message?: string; code?: string } | null): boolean {
  if (!err?.message) {
    return false;
  }
  const m = err.message.toLowerCase();
  return err.code === "42P01" || (m.includes("relation") && m.includes("does not exist"));
}

function dateNDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (days - 1));
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  if (!isGoogleFitEnabled()) {
    return NextResponse.json({ error: "integration_disabled" }, { status: 404 });
  }

  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-fitness-summary:${ip}`, 120, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  const parsed = googleFitSummaryQuerySchema.safeParse({
    address: request.nextUrl.searchParams.get("address") ?? "",
    range: request.nextUrl.searchParams.get("range") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }
  const wallet_address = normalizeWalletAddress(parsed.data.address);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }
  const range_days: 7 | 30 = parsed.data.range === "7d" ? 7 : 30;

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: connection, error: connectionError } = await supabase
    .from("google_fit_connections")
    .select("connected_at,last_sync_at,revoked_at")
    .eq("wallet_address", wallet_address)
    .maybeSingle();
  if (connectionError && !isMissingRelationError(connectionError)) {
    console.error("[dashboard/fitness-summary GET] connection", connectionError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
  const connected = Boolean(connection && !connection.revoked_at);
  const last_sync_at = connected ? (connection?.last_sync_at ?? null) : null;

  if (!connected) {
    return NextResponse.json({
      connected: false,
      last_sync_at: null,
      range_days,
      totals: { steps: 0, active_minutes: 0, calories_kcal: 0 },
      points: [],
    });
  }

  const { data: rows, error: metricsError } = await supabase
    .from("fitness_daily_metrics")
    .select("metric_date,steps,active_minutes,calories_kcal")
    .eq("wallet_address", wallet_address)
    .gte("metric_date", dateNDaysAgo(range_days))
    .order("metric_date", { ascending: true });

  if (metricsError) {
    console.error("[dashboard/fitness-summary GET] metrics", metricsError);
    const hint = isMissingRelationError(metricsError) ? "apply_supabase_migrations" : undefined;
    return NextResponse.json({ error: "fetch_failed", ...(hint ? { hint } : {}) }, { status: 502 });
  }

  const points = (rows ?? []).map((r) => ({
    metric_date: String(r.metric_date),
    steps: Number(r.steps ?? 0),
    active_minutes: Number(r.active_minutes ?? 0),
    calories_kcal: Number(r.calories_kcal ?? 0),
  }));

  const totals = points.reduce(
    (acc, point) => {
      acc.steps += point.steps;
      acc.active_minutes += point.active_minutes;
      acc.calories_kcal += point.calories_kcal;
      return acc;
    },
    { steps: 0, active_minutes: 0, calories_kcal: 0 },
  );

  return NextResponse.json({
    connected: true,
    last_sync_at,
    range_days,
    totals: {
      steps: Math.round(totals.steps),
      active_minutes: Math.round(totals.active_minutes),
      calories_kcal: Math.round(totals.calories_kcal * 100) / 100,
    },
    points,
  });
}
