import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Order Nirvana Ring | $99 Early Bird",
  description:
    "Pre-order the Nirvana Ring for $99 (50% off). Smart wellness ring with Heart Rate, BP, Sleep & SpO2 monitoring. Ships Q2 2026.",
};

export default function PreorderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
