type Bucket = { count: number; windowStart: number };

const storeKey = "__seekNirvanaRateLimit";

function getStore(): Map<string, Bucket> {
  const g = globalThis as typeof globalThis & { [storeKey]?: Map<string, Bucket> };
  if (!g[storeKey]) {
    g[storeKey] = new Map();
  }
  return g[storeKey];
}

/**
 * Best-effort fixed-window limiter (helps single-process / dev; for Vercel at scale use Upstash/KV).
 */
export function rateLimitSync(
  key: string,
  max: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterMs: number } {
  const store = getStore();
  const now = Date.now();
  let bucket = store.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    bucket = { count: 0, windowStart: now };
    store.set(key, bucket);
  }
  if (bucket.count >= max) {
    return { ok: false, retryAfterMs: windowMs - (now - bucket.windowStart) };
  }
  bucket.count += 1;
  return { ok: true };
}
