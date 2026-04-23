import type { Metadata } from "next";
import { headers } from "next/headers";

import Web3ContextProvider from "@/components/providers/Web3ContextProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nirvana Ring | Awaken Your Dreams, Elevate Your Life",
  description:
    "Smart ring for lucid dreaming, mindfulness, and longevity. Ancient wisdom meets AI technology.",
  icons: {
    icon: [{ url: "/logo-transparent.png", type: "image/png" }],
    shortcut: "/logo-transparent.png",
    apple: "/logo-transparent.png",
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
        <link rel="icon" type="image/png" href="/logo-transparent.png" />
        <link rel="shortcut icon" type="image/png" href="/logo-transparent.png" />
        <link rel="apple-touch-icon" href="/logo-transparent.png" />

      </head>
      <body className="antialiased bg-navy-950 text-white overflow-x-hidden">
        <Web3ContextProvider cookies={cookieHeader}>{children}</Web3ContextProvider>
      </body>
    </html>
  );
}
