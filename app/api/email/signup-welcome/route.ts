import { NextResponse, type NextRequest } from "next/server";

import { readJsonBody } from "@/lib/api/json";
import { getClientIp } from "@/lib/api/client-ip";
import { signupWelcomeHtml, signupWelcomeText } from "@/lib/email/templates";
import { getResend, getResendFrom } from "@/lib/email/resend-client";
import { rateLimitSync } from "@/lib/rate-limit";
import { signupWelcomeSchema } from "@/lib/schemas/public-forms";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`signup-welcome:${ip}`, 40, 10 * 60_000);
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

  const parsed = signupWelcomeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const resend = getResend();
  const from = getResendFrom();
  if (!resend || !from) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const { email, name } = parsed.data;
  const html = signupWelcomeHtml();
  const text = signupWelcomeText();

  const { error } = await resend.emails.send({
    from,
    to: [email],
    subject: "Welcome to Seek Nirvana",
    html,
    text,
  });

  if (error) {
    console.error("[signup-welcome] Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
