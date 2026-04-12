import { NextResponse, type NextRequest } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { getClientIp } from "@/lib/api/client-ip";
import { rateLimitSync } from "@/lib/rate-limit";
import { cohortApplicationSchema } from "@/lib/schemas/public-forms";

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

  return NextResponse.json({ ok: true });
}
