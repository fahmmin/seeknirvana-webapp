import { type NextRequest, NextResponse } from "next/server";

import {
  encryptSecret,
  exchangeGoogleFitCode,
  getGoogleFitConfig,
  isGoogleFitEnabled,
  verifySignedOAuthState,
} from "@/lib/integrations/google-fit";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

const STATE_COOKIE = "seeknirvana_google_fit_state";

function redirectToFitTab(
  request: NextRequest,
  status: "connected" | "error",
  reason?: string,
  walletAddress?: string,
) {
  // Prefer the request origin so local/dev callbacks do not switch hostnames
  // (e.g. localhost vs 0.0.0.0), which can drop wallet session state.
  const url = new URL("/dashboard/fit", request.nextUrl.origin);
  url.searchParams.set("google_fit", status);
  if (reason) {
    url.searchParams.set("reason", reason);
  }
  if (walletAddress) {
    url.searchParams.set("wallet", walletAddress);
  }
  return url;
}

export async function GET(request: NextRequest) {
  if (!isGoogleFitEnabled()) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "integration_disabled"));
  }

  try {
    getGoogleFitConfig();
  } catch {
    return NextResponse.redirect(redirectToFitTab(request, "error", "integration_not_configured"));
  }

  const error = request.nextUrl.searchParams.get("error");
  if (error) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "oauth_denied"));
  }

  const state = request.nextUrl.searchParams.get("state")?.trim() ?? "";
  const cookieState = request.cookies.get(STATE_COOKIE)?.value ?? "";
  if (!state || !cookieState || state !== cookieState) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "invalid_state"));
  }
  const parsedState = verifySignedOAuthState(state);
  const wallet_address = normalizeWalletAddress(parsedState?.wallet_address ?? "");
  if (!wallet_address) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "invalid_wallet"));
  }

  const code = request.nextUrl.searchParams.get("code")?.trim() ?? "";
  if (!code) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "missing_code"));
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "database_not_configured"));
  }

  const { data: profileExists, error: profileError } = await supabase
    .from("profiles")
    .select("wallet_address")
    .eq("wallet_address", wallet_address)
    .maybeSingle();
  if (profileError || !profileExists) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "profile_not_found"));
  }

  let tokens;
  try {
    tokens = await exchangeGoogleFitCode(code);
  } catch (e) {
    console.error("[google-fit/callback] token exchange failed", e);
    return NextResponse.redirect(redirectToFitTab(request, "error", "token_exchange_failed"));
  }

  const now = new Date();
  const expiresInMs = Math.max(60, Number(tokens.expires_in || 3600)) * 1000;
  const token_expiry = new Date(now.getTime() + expiresInMs).toISOString();

  const { data: existing, error: existingError } = await supabase
    .from("google_fit_connections")
    .select("refresh_token_encrypted")
    .eq("wallet_address", wallet_address)
    .maybeSingle();
  if (existingError) {
    console.error("[google-fit/callback] existing", existingError);
    return NextResponse.redirect(redirectToFitTab(request, "error", "save_failed"));
  }

  let refreshEncrypted = existing?.refresh_token_encrypted ?? null;
  if (tokens.refresh_token) {
    refreshEncrypted = encryptSecret(tokens.refresh_token);
  }
  if (!refreshEncrypted) {
    return NextResponse.redirect(redirectToFitTab(request, "error", "missing_refresh_token"));
  }

  const { error: upsertError } = await supabase.from("google_fit_connections").upsert(
    {
      wallet_address,
      google_user_id: null,
      scope: tokens.scope ?? "",
      access_token_encrypted: encryptSecret(tokens.access_token),
      refresh_token_encrypted: refreshEncrypted,
      token_expiry,
      connected_at: now.toISOString(),
      revoked_at: null,
      updated_at: now.toISOString(),
    },
    { onConflict: "wallet_address" },
  );

  if (upsertError) {
    console.error("[google-fit/callback] upsert", upsertError);
    return NextResponse.redirect(redirectToFitTab(request, "error", "save_failed"));
  }

  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({
      google_health_connected_at: now.toISOString(),
      updated_at: now.toISOString(),
    })
    .eq("wallet_address", wallet_address);

  if (profileUpdateError) {
    console.error("[google-fit/callback] profile update", profileUpdateError);
  }

  const isSecure =
    request.nextUrl.protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";
  const response = NextResponse.redirect(redirectToFitTab(request, "connected", undefined, wallet_address));
  response.cookies.set(STATE_COOKIE, "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
