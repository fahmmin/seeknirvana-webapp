import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, mainnet } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "wagmi";

export const networks = [mainnet, base] as const;

/** User-supplied Reown Cloud project id (empty until configured). */
export const projectId =
  (process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? process.env.NEXT_PUBLIC_PROJECT_ID ?? "").trim() || "";

/**
 * Wagmi / AppKit require a non-empty project id at init. Placeholder lets `next build` succeed without secrets.
 * Use a real id from https://dashboard.reown.com for production.
 */
export const appKitProjectId = projectId || "00000000000000000000000000000000";

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId: appKitProjectId,
  networks: [...networks],
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
