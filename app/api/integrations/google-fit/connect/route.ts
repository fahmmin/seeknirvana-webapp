import { type NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/api/client-ip";
import {
  createGoogleFitConsentUrl,
  createSignedOAuthState,
  getGoogleFitConfig,
  isGoogleFitEnabled,
} from "@/lib/integrations/google-fit";
import { rateLimitSync } from "@/lib/rate-limit";
import { normalizeWalletAddress } from "@/lib/web3/address";

const STATE_COOKIE = "seeknirvana_google_fit_state";

export async function GET(request: NextRequest) {
  if (!isGoogleFitEnabled()) {
    return NextResponse.json({ error: "integration_disabled" }, { status: 404 });
  }

  const ip = getClientIp(request);
  const limited = rateLimitSync(`google-fit-connect:${ip}`, 40, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  try {
    getGoogleFitConfig();
  } catch {
    return NextResponse.json({ error: "integration_not_configured" }, { status: 503 });
  }

  const rawAddress = request.nextUrl.searchParams.get("address")?.trim() ?? "";
  const wallet_address = normalizeWalletAddress(rawAddress);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const state = createSignedOAuthState(wallet_address);
  const url = createGoogleFitConsentUrl(state);
  const response = NextResponse.redirect(url);
  const isSecure =
    request.nextUrl.protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  return response;
}
