import type { Metadata } from "next";
import { headers } from "next/headers";

import Web3ContextProvider from "@/components/providers/Web3ContextProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nirvana Ring | Awaken Your Dreams, Elevate Your Life",
  description:
    "Smart ring for lucid dreaming, mindfulness, and longevity. Ancient wisdom meets AI technology.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieHeader = (await headers()).get("cookie");

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="antialiased bg-nirvana-dark text-white overflow-x-hidden">
        <Web3ContextProvider cookies={cookieHeader}>{children}</Web3ContextProvider>
      </body>
    </html>
  );
}
