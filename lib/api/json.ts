const MAX_BODY_BYTES = 48_000;

export async function readJsonBody(request: Request): Promise<unknown> {
  const len = request.headers.get("content-length");
  if (len && Number(len) > MAX_BODY_BYTES) {
    throw new Error("payload_too_large");
  }
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    throw new Error("payload_too_large");
  }
  if (!text.trim()) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("invalid_json");
  }
}
