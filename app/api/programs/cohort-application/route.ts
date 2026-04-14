import { NextResponse, type NextRequest } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { getClientIp } from "@/lib/api/client-ip";
import { rateLimitSync } from "@/lib/rate-limit";
import { cohortApplicationSchema } from "@/lib/schemas/public-forms";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`cohort-application:${ip}`, 20, 10 * 60_000);
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

  const parsed = cohortApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const walletAddress = normalizeWalletAddress(parsed.data.walletAddress ?? "");
  if (!walletAddress) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const fullName = parsed.data.fullName.trim();
  const email = parsed.data.email.trim().toLowerCase();

  const { error: applicationError } = await supabase
    .from("cohort_applications")
    .upsert(
      {
        wallet_address: walletAddress,
        full_name: fullName,
        email,
        phone: parsed.data.phone.trim(),
        age_range: parsed.data.ageRange.trim(),
        location: parsed.data.location.trim(),
        timezone: parsed.data.timezone.trim(),
        personality_type: parsed.data.personalityType.trim(),
        occupation: parsed.data.occupation.trim(),
        dream_experience: parsed.data.dreamExperience.trim(),
        wearable_experience: parsed.data.wearableExperience.trim(),
        preferred_session_window: parsed.data.preferredSessionWindow.trim(),
        sleep_goal: parsed.data.sleepGoal.trim(),
        current_challenge: parsed.data.currentChallenge.trim(),
        intentions: parsed.data.intentions.trim(),
        notes: parsed.data.notes.trim(),
        accept_program_terms: parsed.data.acceptProgramTerms,
        submitted_at: now,
        updated_at: now,
      },
      { onConflict: "wallet_address" },
    );

  if (applicationError) {
    console.error("[programs/cohort-application POST] application upsert", applicationError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        wallet_address: walletAddress,
        email,
        full_name: fullName,
        onboarding_completed_at: now,
        updated_at: now,
      },
      { onConflict: "wallet_address" },
    );

  if (profileError) {
    console.error("[programs/cohort-application POST] profile upsert", profileError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, onboarded: true });
}
