import crypto from "crypto";

type OAuthTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
};

export type GoogleFitConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
};

export type GoogleFitAggregatePoint = {
  metric_date: string;
  steps: number;
  active_minutes: number;
  calories_kcal: number;
};

const DEFAULT_SCOPES = ["https://www.googleapis.com/auth/fitness.activity.read"];
const OAUTH_BASE = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const OAUTH_REVOKE_URL = "https://oauth2.googleapis.com/revoke";
const AGGREGATE_URL = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
const DAY_MS = 24 * 60 * 60 * 1000;

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getEncryptionKey(): Buffer {
  const raw = process.env.GOOGLE_FIT_ENCRYPTION_KEY?.trim() ?? "";
  if (!raw) {
    throw new Error("missing_encryption_key");
  }
  const buf = Buffer.from(raw, "base64");
  if (buf.length !== 32) {
    throw new Error("invalid_encryption_key");
  }
  return buf;
}

function getStateSecret(): Buffer {
  const key = getEncryptionKey();
  return crypto.createHash("sha256").update(key).update("google-fit-state-v1").digest();
}

function signState(payload: string): string {
  return crypto.createHmac("sha256", getStateSecret()).update(payload).digest("base64url");
}

export function encryptSecret(plainText: string): string {
  const iv = crypto.randomBytes(12);
  const key = getEncryptionKey();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64url")}.${encrypted.toString("base64url")}.${tag.toString("base64url")}`;
}

export function decryptSecret(cipherText: string): string {
  const [ivB64, encryptedB64, tagB64] = cipherText.split(".");
  if (!ivB64 || !encryptedB64 || !tagB64) {
    throw new Error("invalid_ciphertext");
  }
  const key = getEncryptionKey();
  const iv = Buffer.from(ivB64, "base64url");
  const encrypted = Buffer.from(encryptedB64, "base64url");
  const tag = Buffer.from(tagB64, "base64url");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export function isGoogleFitEnabled(): boolean {
  return (process.env.NEXT_PUBLIC_ENABLE_GOOGLE_FIT ?? "").trim() === "true";
}

export function getGoogleFitConfig(): GoogleFitConfig {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim() ?? "";
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim() ?? "";
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI?.trim() ?? "";
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("missing_google_oauth_env");
  }
  const scopesRaw = process.env.GOOGLE_FIT_SCOPES?.trim();
  const scopes = scopesRaw ? scopesRaw.split(/\s+/).filter(Boolean) : DEFAULT_SCOPES;
  return { clientId, clientSecret, redirectUri, scopes };
}

export function createSignedOAuthState(walletAddress: string): string {
  const payloadObj = {
    w: walletAddress,
    ts: Date.now(),
    nonce: crypto.randomBytes(12).toString("hex"),
  };
  const payload = base64UrlEncode(JSON.stringify(payloadObj));
  const sig = signState(payload);
  return `${payload}.${sig}`;
}

export function verifySignedOAuthState(state: string, maxAgeMs = 10 * 60_000): {
  wallet_address: string;
} | null {
  const [payload, signature] = state.split(".");
  if (!payload || !signature) {
    return null;
  }
  const expected = signState(payload);
  let valid = false;
  try {
    valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return null;
  }
  if (!valid) {
    return null;
  }
  try {
    const raw = JSON.parse(base64UrlDecode(payload)) as {
      w?: string;
      ts?: number;
      nonce?: string;
    };
    if (typeof raw.w !== "string" || typeof raw.ts !== "number" || !raw.nonce) {
      return null;
    }
    if (Date.now() - raw.ts > maxAgeMs) {
      return null;
    }
    return { wallet_address: raw.w };
  } catch {
    return null;
  }
}

export function createGoogleFitConsentUrl(state: string): string {
  const config = getGoogleFitConfig();
  const url = new URL(OAUTH_BASE);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("scope", config.scopes.join(" "));
  url.searchParams.set("state", state);
  return url.toString();
}

export async function exchangeGoogleFitCode(code: string): Promise<OAuthTokenResponse> {
  const config = getGoogleFitConfig();
  const body = new URLSearchParams({
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code",
  });
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = (await res.json()) as OAuthTokenResponse & { error?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(json.error || "token_exchange_failed");
  }
  return json;
}

export async function refreshGoogleFitAccessToken(refreshToken: string): Promise<OAuthTokenResponse> {
  const config = getGoogleFitConfig();
  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
  });
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = (await res.json()) as OAuthTokenResponse & { error?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(json.error || "token_refresh_failed");
  }
  return json;
}

export async function revokeGoogleToken(token: string): Promise<void> {
  const body = new URLSearchParams({ token });
  await fetch(OAUTH_REVOKE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
}

function isoDateFromMs(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

function numberFromPoint(point: unknown): number {
  const p = point as { value?: Array<{ intVal?: number; fpVal?: number }> };
  const value = p?.value?.[0];
  if (!value) {
    return 0;
  }
  if (typeof value.intVal === "number") {
    return value.intVal;
  }
  if (typeof value.fpVal === "number") {
    return value.fpVal;
  }
  return 0;
}

export async function fetchGoogleFitDailyActivity(
  accessToken: string,
  rangeDays: 7 | 30,
): Promise<GoogleFitAggregatePoint[]> {
  const endMs = Date.now();
  const startMs = endMs - rangeDays * DAY_MS;
  const res = await fetch(AGGREGATE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      aggregateBy: [
        { dataTypeName: "com.google.step_count.delta" },
        { dataTypeName: "com.google.active_minutes" },
        { dataTypeName: "com.google.calories.expended" },
      ],
      bucketByTime: { durationMillis: DAY_MS },
      startTimeMillis: startMs,
      endTimeMillis: endMs,
    }),
  });
  const json = (await res.json()) as {
    bucket?: Array<{
      startTimeMillis?: string;
      dataset?: Array<{ dataSourceId?: string; point?: unknown[] }>;
    }>;
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(json.error?.message || "aggregate_failed");
  }

  const points = new Map<string, GoogleFitAggregatePoint>();
  for (const bucket of json.bucket ?? []) {
    const date = isoDateFromMs(Number(bucket.startTimeMillis ?? "0"));
    if (!points.has(date)) {
      points.set(date, {
        metric_date: date,
        steps: 0,
        active_minutes: 0,
        calories_kcal: 0,
      });
    }
    const entry = points.get(date);
    if (!entry) {
      continue;
    }
    for (const ds of bucket.dataset ?? []) {
      const source = ds.dataSourceId ?? "";
      const total = (ds.point ?? []).reduce<number>(
        (sum, point) => sum + numberFromPoint(point),
        0,
      );
      if (source.includes("com.google.step_count.delta")) {
        entry.steps += Math.round(total);
      } else if (source.includes("com.google.active_minutes")) {
        entry.active_minutes += Math.round(total);
      } else if (source.includes("com.google.calories.expended")) {
        entry.calories_kcal += total;
      }
    }
  }

  return Array.from(points.values())
    .sort((a, b) => a.metric_date.localeCompare(b.metric_date))
    .map((p) => ({ ...p, calories_kcal: Math.round(p.calories_kcal * 100) / 100 }));
}
