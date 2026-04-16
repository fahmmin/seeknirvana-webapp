import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Nirvana Ring",
  description:
    "Your data, your sanctuary. Learn how Nirvana Ring protects your privacy and personal information.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
