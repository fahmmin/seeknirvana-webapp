import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | Seek Nirvana",
  description:
    "Sacred agreement for using Seek Nirvana services. Ancient wisdom meets modern responsibility.",
};

export default function TermsPage() {
  return <TermsContent />;
}
