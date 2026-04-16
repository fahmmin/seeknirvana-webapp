"use client";

import { createAppKit } from "@reown/appkit/react";
import { base, mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

import { appKitProjectId, wagmiAdapter, wagmiConfig } from "@/config/reown-wagmi";

const metadata = {
  name: "Seek Nirvana",
  description: "Smart ring for lucid dreaming, mindfulness, and longevity.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seeknirvana.com",
  icons: ["/favicon.svg"],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId: appKitProjectId,
  networks: [mainnet, base],
  defaultNetwork: mainnet,
  metadata,
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "inherit",
  },
  features: {
    analytics: false,
  },
  showWallets: true,
});

export default function Web3ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const initialState = cookieToInitialState(wagmiConfig as Config, cookies ?? undefined);

  return (
    <WagmiProvider config={wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
