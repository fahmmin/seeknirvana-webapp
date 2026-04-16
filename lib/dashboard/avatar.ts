/** Deterministic hue from wallet address for avatar ring */
export function addressHue(address: string): number {
  let h = 0;
  for (let i = 0; i < address.length; i++) {
    h = (h + address.charCodeAt(i) * (i + 1)) % 360;
  }
  return h;
}

export function initialsFromName(name: string | null | undefined, fallback: string): string {
  const n = (name ?? "").trim();
  if (!n) {
    return fallback.slice(0, 2).toUpperCase();
  }
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  }
  return n.slice(0, 2).toUpperCase();
}
