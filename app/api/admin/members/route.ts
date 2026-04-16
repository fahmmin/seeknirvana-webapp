import { NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/api/client-ip";
import { rateLimitSync } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

const MAX_ROWS = 500;

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`admin-members-get:${ip}`, 30, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  const raw = request.nextUrl.searchParams.get("address")?.trim() ?? "";
  const wallet_address = normalizeWalletAddress(raw);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: adminRow, error: adminErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (adminErr) {
    console.error("[admin/members GET] admin lookup", adminErr);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  const role = (adminRow as { role?: string } | null)?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { data: rows, error: listErr } = await supabase
    .from("profiles")
    .select(
      "wallet_address,email,full_name,phone,role,onboarding_completed_at,created_at,google_health_connected_at,instagram_connected_at,avatar_url",
    )
    .order("created_at", { ascending: false })
    .limit(MAX_ROWS);

  if (listErr) {
    console.error("[admin/members GET] list", listErr);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  const wallets = (rows ?? []).map((r) => (r as { wallet_address: string }).wallet_address);

  let cohortRows: {
    wallet_address: string;
    submitted_at: string;
    full_name: string;
    email: string;
    phone: string;
  }[] = [];
  if (wallets.length > 0) {
    const { data, error: cohortErr } = await supabase
      .from("cohort_applications")
      .select("wallet_address,submitted_at,full_name,email,phone")
      .in("wallet_address", wallets);
    if (cohortErr) {
      console.error("[admin/members GET] cohort", cohortErr);
    } else {
      cohortRows = (data ?? []) as typeof cohortRows;
    }
  }

  const cohortByWallet = new Map<string, { submitted_at: string; full_name: string; email: string; phone: string }>();
  for (const row of cohortRows) {
    cohortByWallet.set(row.wallet_address, {
      submitted_at: row.submitted_at,
      full_name: row.full_name,
      email: row.email,
      phone: row.phone,
    });
  }

  const members = (rows ?? []).map((r) => {
    const p = r as {
      wallet_address: string;
      email: string;
      full_name: string | null;
      phone: string | null;
      role: string;
      onboarding_completed_at: string | null;
      created_at: string;
      google_health_connected_at: string | null;
      instagram_connected_at: string | null;
    };
    const cohort = cohortByWallet.get(p.wallet_address);
    return {
      ...p,
      role: p.role === "admin" ? "admin" : "member",
      cohort_application: cohort
        ? {
            submitted_at: cohort.submitted_at,
            full_name: cohort.full_name,
            email: cohort.email,
            phone: cohort.phone,
          }
        : null,
    };
  });

  return NextResponse.json({ ok: true, members });
}
