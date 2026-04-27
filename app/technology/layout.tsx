import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | SeekNirvana",
  description:
    "See how SeekNirvana combines ring sensing, two on-device Gemma 4 language models, and a private mobile app for sleep and awareness guidance.",
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
