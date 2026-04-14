import { NextRequest, NextResponse } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { getClientIp } from "@/lib/api/client-ip";
import { memberHubWelcomeHtml, memberHubWelcomeText } from "@/lib/email/templates";
import { getResend, getResendFrom } from "@/lib/email/resend-client";
import { rateLimitSync } from "@/lib/rate-limit";
import { dashboardProfilePostSchema } from "@/lib/schemas/dashboard";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

type ProfileRow = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  onboarding_completed_at: string;
  member_hub_email_sent_at: string | null;
};

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-profile-get:${ip}`, 120, 10 * 60_000);
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

  const limitedAddr = rateLimitSync(`dashboard-profile-get:${ip}:${wallet_address}`, 120, 10 * 60_000);
  if (!limitedAddr.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limitedAddr.retryAfterMs },
      { status: 429 },
    );
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("wallet_address,email,full_name,onboarding_completed_at,member_hub_email_sent_at")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (error) {
    console.error("[dashboard/profile GET]", error);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  if (!data) {
    return NextResponse.json({
      onboarded: false,
      profile: null,
    });
  }

  const row = data as ProfileRow;
  return NextResponse.json({
    onboarded: Boolean(row.onboarding_completed_at),
    profile: {
      wallet_address: row.wallet_address,
      email: row.email,
      full_name: row.full_name,
      onboarding_completed_at: row.onboarding_completed_at,
    },
  });
}

/**
 * Persists member details for a connected wallet. Wallet address in the body is not
 * cryptographically verified (SIWE) in v1 — intended for a low-risk preorder hub; rate limited.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-profile-post:${ip}`, 30, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await readJsonBody(request);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "invalid";
    const status = msg === "payload_too_large" ? 413 : 400;
    return NextResponse.json({ error: msg }, { status });
  }

  const parsed = dashboardProfilePostSchema.safeParse(body);
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

  const email = parsed.data.email.trim().toLowerCase();
  const full_name = parsed.data.full_name.trim();
  const now = new Date().toISOString();

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("member_hub_email_sent_at, onboarding_completed_at")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (existingError) {
    console.error("[dashboard/profile POST] existing", existingError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  const prev = existing as {
    member_hub_email_sent_at: string | null;
    onboarding_completed_at: string | null;
  } | null;

  const shouldSendWelcome = !prev?.member_hub_email_sent_at;
  const onboardingAt = prev?.onboarding_completed_at ?? now;

  const { data: upserted, error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        wallet_address,
        email,
        full_name,
        onboarding_completed_at: onboardingAt,
        updated_at: now,
        member_hub_email_sent_at: prev?.member_hub_email_sent_at ?? null,
      },
      { onConflict: "wallet_address" },
    )
    .select("wallet_address,email,full_name,onboarding_completed_at,member_hub_email_sent_at")
    .single();

  if (upsertError || !upserted) {
    console.error("[dashboard/profile POST] upsert", upsertError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  let sentMemberEmail = false;
  if (shouldSendWelcome) {
    const resend = getResend();
    const from = getResendFrom();
    if (resend && from) {
      const { error: sendError } = await resend.emails.send({
        from,
        to: [email],
        subject: "Your Seek Nirvana member hub is ready",
        html: memberHubWelcomeHtml(),
        text: memberHubWelcomeText(),
      });
      if (sendError) {
        console.error("[dashboard/profile POST] Resend error:", sendError);
      } else {
        sentMemberEmail = true;
        const { error: markError } = await supabase
          .from("profiles")
          .update({ member_hub_email_sent_at: now, updated_at: now })
          .eq("wallet_address", wallet_address);
        if (markError) {
          console.error("[dashboard/profile POST] member_hub_email_sent_at update", markError);
        }
      }
    }
  }

  const row = upserted as ProfileRow & { member_hub_email_sent_at?: string | null };
  return NextResponse.json({
    ok: true,
    onboarded: true,
    profile: {
      wallet_address: row.wallet_address,
      email: row.email,
      full_name: row.full_name,
      onboarding_completed_at: row.onboarding_completed_at,
    },
    memberHubEmailSent: sentMemberEmail,
  });
}
