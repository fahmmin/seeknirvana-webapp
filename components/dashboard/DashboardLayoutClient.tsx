"use client";

import { useAppKit } from "@reown/appkit/react";
import { motion } from "framer-motion";
import {
  Bell,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Settings,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { SiGooglefit } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import { DashboardProvider, useDashboard } from "@/components/dashboard/DashboardContext";
import OnboardingWizard from "@/components/dashboard/OnboardingWizard";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";

const DASHBOARD_CACHE_KEY = "seeknirvana-dashboard-cache-v2";

function DashboardChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { profile, address } = useDashboard();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isAdmin = profile?.role === "admin";

  const nav = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, match: (p: string) => p === "/dashboard" },
    { href: "/dashboard/updates", label: "Updates", icon: Bell, match: (p: string) => p.startsWith("/dashboard/updates") },
    { href: "/dashboard/fit", label: "Fit analytics", icon: SiGooglefit, match: (p: string) => p.startsWith("/dashboard/fit") },
    { href: "/dashboard/settings", label: "Settings", icon: Settings, match: (p: string) => p.startsWith("/dashboard/settings") },
    ...(isAdmin
      ? [{ href: "/admin/dashboard", label: "Admin", icon: Shield, match: (p: string) => p.startsWith("/admin/dashboard") }]
      : []),
  ];

  function handleSignOut() {
    disconnect();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
      window.location.assign("/");
    }
  }

  return (
    <div className="min-h-screen bg-nirvana-dark pb-24 lg:pb-10">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-nirvana-dark/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-nirvana-darker">
                <Image src="/images/SeekNirvana_Logo.png" alt="" width={36} height={36} className="object-cover" />
              </div>
              <span className="truncate text-sm font-semibold text-white sm:text-base">Seek Nirvana</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ProfileAvatar avatarUrl={profile?.avatar_url} name={profile?.full_name} address={address} size={40} />
            <button
              type="button"
              onClick={() => void open()}
              className="hidden rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 sm:inline"
            >
              Wallet
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pt-6 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 flex-col rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:flex">
          <p className="px-2 text-xs uppercase tracking-[0.3em] text-white/45">Member hub</p>
          <nav className="mt-4 space-y-1">
            {nav.map((item) => {
              const active = item.match(pathname ?? "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-nirvana-cyan/15 text-nirvana-cyan" : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-auto flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-red-400/35 hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-nirvana-dark/95 px-2 py-2 backdrop-blur-xl lg:hidden"
        aria-label="Member hub"
      >
        <div className="mx-auto flex max-w-lg justify-around">
          {nav.slice(0, 4).map((item) => {
            const active = item.match(pathname ?? "");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium sm:text-xs ${
                  active ? "text-nirvana-cyan" : "text-white/60"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setMobileNavOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col border-r border-white/10 bg-nirvana-darker p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button type="button" onClick={() => setMobileNavOpen(false)} className="rounded-lg p-2 text-white/70">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/85 hover:bg-white/5"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                handleSignOut();
                setMobileNavOpen(false);
              }}
              className="mt-auto flex items-center gap-3 rounded-xl border border-white/12 px-3 py-3 text-sm text-red-200/90"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { address, status } = useAccount();
  const { profileLoading, onboarded, openConnect, reownReady, submitError } = useDashboard();

  const isConnected = Boolean(address && status === "connected");

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-nirvana-dark">
        <div className="absolute inset-0 mandala-pattern pointer-events-none opacity-25" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
          >
            <Sparkles className="mx-auto h-10 w-10 text-nirvana-cyan/90" aria-hidden />
            <h1 className="mt-4 text-xl font-semibold text-white">Connect your wallet</h1>
            <p className="mt-2 text-sm text-white/60">
              Sign in with email, social, or your wallet to open your member hub.
            </p>
            {!reownReady ? (
              <p className="mt-6 text-sm text-nirvana-gold/90">Sign-in is not configured in this environment.</p>
            ) : (
              <button
                type="button"
                onClick={() => void openConnect()}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-8 py-3 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 transition hover:opacity-95"
              >
                Connect
              </button>
            )}
            <Link href="/login" className="mt-4 inline-block text-sm text-nirvana-cyan/90 hover:underline">
              Open sign-in page
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (profileLoading || onboarded === null) {
    return (
      <div className="min-h-screen bg-nirvana-dark px-4 py-28">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-white/80">
            <Loader2 className="h-5 w-5 animate-spin text-nirvana-cyan" aria-hidden />
            Loading your hub…
          </div>
        </div>
      </div>
    );
  }

  if (!onboarded) {
    return (
      <div className="min-h-screen bg-nirvana-dark">
        <div className="absolute inset-0 mandala-pattern pointer-events-none opacity-25" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-nirvana-gold">Welcome</p>
          <h1 className="mt-3 text-center text-2xl font-bold text-white sm:text-3xl">
            <span className="gradient-text">Let&apos;s set up your profile</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-white/60">
            A few quick steps—then your full member hub unlocks.
          </p>
          {submitError ? (
            <p className="mt-4 text-center text-sm text-red-400/90" role="alert">
              {submitError}
            </p>
          ) : null}
          <div className="mt-10">
            <OnboardingWizard />
          </div>
        </div>
      </div>
    );
  }

  return <DashboardChrome>{children}</DashboardChrome>;
}

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardProvider>
  );
}
