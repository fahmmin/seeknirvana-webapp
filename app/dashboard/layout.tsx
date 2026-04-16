import type { Metadata } from "next";

import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Member hub | Nirvana Ring",
  description: "Thank you for pre-ordering. Product updates and your Seek Nirvana member space.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
