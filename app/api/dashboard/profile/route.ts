import { NextRequest, NextResponse } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { getClientIp } from "@/lib/api/client-ip";
import { memberHubWelcomeHtml, memberHubWelcomeText } from "@/lib/email/templates";
import { getResend, getResendFrom } from "@/lib/email/resend-client";
import { rateLimitSync } from "@/lib/rate-limit";
import {
  dashboardOnboardingPostSchema,
  dashboardProfilePatchSchema,
} from "@/lib/schemas/dashboard";
import {
  isMissingColumnError,
  mapMinimalRowToProfile,
  mapProfile,
  MINIMAL_PROFILE_SELECT,
  PROFILE_SELECT,
  type MinimalProfileRow,
  type ProfileRow,
} from "@/lib/dashboard/map-profile";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

function isMissingRelationError(err: { message?: string; code?: string } | null): boolean {
  if (!err?.message) {
    return false;
  }
  const m = err.message.toLowerCase();
  return err.code === "42P01" || (m.includes("relation") && m.includes("does not exist"));
}

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

  let data: ProfileRow | MinimalProfileRow | null = null;
  let useMinimal = false;

  const full = await supabase.from("profiles").select(PROFILE_SELECT).eq("wallet_address", wallet_address).maybeSingle();

  if (full.error && isMissingColumnError(full.error)) {
    console.warn("[dashboard/profile GET] extended columns missing; retrying minimal select:", full.error.message);
    const minimal = await supabase
      .from("profiles")
      .select(MINIMAL_PROFILE_SELECT)
      .eq("wallet_address", wallet_address)
      .maybeSingle();
    if (minimal.error) {
      console.error("[dashboard/profile GET] minimal", minimal.error);
      return NextResponse.json(
        { error: "fetch_failed", hint: "apply_supabase_migrations" },
        { status: 502 },
      );
    }
    data = minimal.data as MinimalProfileRow | null;
    useMinimal = true;
  } else if (full.error) {
    console.error("[dashboard/profile GET]", full.error);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  } else {
    data = full.data as ProfileRow | null;
  }

  if (!data) {
    return NextResponse.json({
      onboarded: false,
      profile: null,
    });
  }

  const profile = useMinimal ? mapMinimalRowToProfile(data as MinimalProfileRow) : mapProfile(data as ProfileRow);
  const { data: connection, error: connectionError } = await supabase
    .from("google_fit_connections")
    .select("connected_at,last_sync_at,revoked_at")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (connectionError && !isMissingRelationError(connectionError)) {
    console.error("[dashboard/profile GET] google_fit_connections", connectionError);
  }

  if (connection && !connection.revoked_at) {
    profile.google_fit_connected_at = connection.connected_at ?? null;
    profile.google_fit_last_sync_at = connection.last_sync_at ?? null;
  } else {
    profile.google_fit_connected_at = null;
    profile.google_fit_last_sync_at = null;
  }

  return NextResponse.json({
    onboarded: Boolean(profile.onboarding_completed_at),
    profile,
    ...(useMinimal ? { schema: "minimal" as const } : {}),
  });
}

/**
 * Completes onboarding: name, email, phone + optional fields. Sets onboarding_completed_at.
 * Wallet address in the body is not cryptographically verified (SIWE) in v1.
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

  const parsed = dashboardOnboardingPostSchema.safeParse(body);
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
  const phone = parsed.data.phone.trim();
  const timezone = parsed.data.timezone?.trim() ?? null;
  const date_of_birth = parsed.data.date_of_birth ?? null;
  const bio = parsed.data.bio?.trim() ?? null;
  const now = new Date().toISOString();

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("member_hub_email_sent_at, role, avatar_url")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (existingError) {
    console.error("[dashboard/profile POST] existing", existingError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  const prev = existing as {
    member_hub_email_sent_at: string | null;
    role: string | null;
    avatar_url: string | null;
  } | null;
  const shouldSendWelcome = !prev?.member_hub_email_sent_at;
  const preserveRole = prev?.role === "admin" ? "admin" : "member";

  const { data: upserted, error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        wallet_address,
        email,
        full_name,
        phone,
        role: preserveRole,
        onboarding_completed_at: now,
        timezone,
        date_of_birth,
        bio,
        avatar_url: prev?.avatar_url ?? null,
        updated_at: now,
        member_hub_email_sent_at: prev?.member_hub_email_sent_at ?? null,
      },
      { onConflict: "wallet_address" },
    )
    .select(PROFILE_SELECT)
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

  const row = upserted as ProfileRow;
  return NextResponse.json({
    ok: true,
    onboarded: true,
    profile: mapProfile(row),
    memberHubEmailSent: sentMemberEmail,
  });
}

export async function PATCH(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-profile-patch:${ip}`, 60, 10 * 60_000);
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

  const parsed = dashboardProfilePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const {
    wallet_address: rawWallet,
    full_name,
    email,
    phone,
    timezone,
    date_of_birth,
    bio,
    google_health_connected,
    instagram_connected,
  } = parsed.data;

  const wallet_address = normalizeWalletAddress(rawWallet);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const hasUpdate =
    full_name !== undefined ||
    email !== undefined ||
    phone !== undefined ||
    timezone !== undefined ||
    date_of_birth !== undefined ||
    bio !== undefined ||
    google_health_connected !== undefined ||
    instagram_connected !== undefined;

  if (!hasUpdate) {
    return NextResponse.json({ error: "no_updates" }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: existing, error: fetchError } = await supabase.from("profiles").select(PROFILE_SELECT).eq("wallet_address", wallet_address).maybeSingle();

  if (fetchError) {
    console.error("[dashboard/profile PATCH] fetch", fetchError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  if (!existing) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { updated_at: now };

  if (full_name !== undefined) {
    patch.full_name = full_name.trim();
  }
  if (email !== undefined) {
    patch.email = email.trim().toLowerCase();
  }
  if (phone !== undefined) {
    patch.phone = phone.trim() === "" ? null : phone.trim();
  }
  if (timezone !== undefined) {
    patch.timezone = timezone.trim() === "" ? null : timezone.trim();
  }
  if (date_of_birth !== undefined) {
    if (date_of_birth === null || date_of_birth === "") {
      patch.date_of_birth = null;
    } else {
      patch.date_of_birth = date_of_birth;
    }
  }
  if (bio !== undefined) {
    patch.bio = bio?.trim() ? bio.trim() : null;
  }
  if (google_health_connected === true) {
    patch.google_health_connected_at = now;
  } else if (google_health_connected === false) {
    patch.google_health_connected_at = null;
  }
  if (instagram_connected === true) {
    patch.instagram_connected_at = now;
  } else if (instagram_connected === false) {
    patch.instagram_connected_at = null;
  }

  const { data: updated, error: updateError } = await supabase
    .from("profiles")
    .update(patch)
    .eq("wallet_address", wallet_address)
    .select(PROFILE_SELECT)
    .single();

  if (updateError || !updated) {
    console.error("[dashboard/profile PATCH] update", updateError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    profile: mapProfile(updated as ProfileRow),
  });
}
