import { Buffer } from "node:buffer";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** Sniff image MIME from magic bytes; returns null if unknown. */
export function sniffImageMime(buf: Buffer): string | null {
  if (buf.length < 12) {
    return null;
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    return "image/jpeg";
  }
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "image/png";
  }
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return "image/gif";
  }
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

export function mimeToExt(mime: string): string {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

export function isAllowedImageMime(mime: string): boolean {
  return ALLOWED.has(mime);
}
