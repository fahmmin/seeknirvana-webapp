import { getAddress, isAddress } from "viem";

/** Normalize to lowercase hex for storage (matches DB constraint). */
export function normalizeWalletAddress(raw: string): string | null {
  const t = raw.trim();
  if (!isAddress(t)) {
    return null;
  }
  return getAddress(t).toLowerCase();
}
