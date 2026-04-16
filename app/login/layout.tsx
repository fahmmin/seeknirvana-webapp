import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Nirvana Ring",
  description: "Sign in to the Seek Nirvana member hub with email, social, or your wallet.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
