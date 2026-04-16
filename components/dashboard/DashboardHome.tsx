"use client";

import { useAppKit } from "@reown/appkit/react";
import { motion } from "framer-motion";
import { Activity, Bell, CheckCircle2, Link2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGooglefit, SiInstagram } from "react-icons/si";

import FadeIn from "@/components/animations/FadeIn";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import type { ProductUpdate } from "@/lib/dashboard/types";

export default function DashboardHome() {
  const { open } = useAppKit();
  const { profile, address } = useDashboard();
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setUpdatesLoading(true);
    void (async () => {
      try {
        const res = await fetch("/api/dashboard/updates");
        const json = (await res.json()) as { updates?: ProductUpdate[] };
        if (!cancelled && res.ok && json.updates) {
          setUpdates(json.updates);
        }
      } finally {
        if (!cancelled) {
          setUpdatesLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const heading = profile?.full_name ? `Welcome, ${profile.full_name.split(/\s+/)[0]}` : "Welcome to your member hub";

  const healthConnected = Boolean(profile?.google_fit_connected_at);
  const igConnected = Boolean(profile?.instagram_connected_at);

  return (
    <div className="space-y-6">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.35em] text-nirvana-gold">Preorder</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          <span className="gradient-text">{heading}</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">Your calm space for ring updates and account tools.</p>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/settings"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-nirvana-cyan/25"
        >
          <div className="flex items-center gap-2 text-nirvana-cyan">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Profile &amp; settings</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Edit details and wallet settings.</p>
        </Link>
        <Link
          href="/dashboard/updates"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-nirvana-cyan/25"
        >
          <div className="flex items-center gap-2 text-nirvana-cyan">
            <Bell className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Product updates</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Milestones from our team.</p>
        </Link>
        <Link
          href="/dashboard/fit"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-nirvana-cyan/25"
        >
          <div className="flex items-center gap-2 text-nirvana-cyan">
            <SiGooglefit className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Fit analytics</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Connectors, sync, and visual trends.</p>
        </Link>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-white">
          <Link2 className="h-4 w-4 text-nirvana-cyan" />
          <h2 className="text-sm font-semibold">Connectors</h2>
        </div>
        <p className="mt-1 text-xs text-white/45">Manage integrations in the Fit Analytics tab.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs ${healthConnected ? "border-nirvana-jade/40 text-nirvana-jade-light" : "border-white/15 text-white/50"}`}
          >
            <SiGooglefit className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" />
            Google Fit {healthConnected ? "· linked" : "· not linked"}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs ${igConnected ? "border-nirvana-jade/40 text-nirvana-jade-light" : "border-white/15 text-white/50"}`}
          >
            <SiInstagram className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" />
            Instagram {igConnected ? "· linked" : "· not linked"}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-nirvana-gold/25 bg-gradient-to-br from-white/[0.07] to-transparent p-6 sm:p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-nirvana-gold/90">Status</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Coming soon</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
              Your ring is reserved. We are polishing manufacturing and fulfillment details. You will see milestones here
              first—no need to dig through email unless we need something from you.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-nirvana-jade/35 bg-nirvana-jade/10 px-4 py-2 text-sm text-nirvana-jade-light">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Preorder confirmed
          </div>
        </div>
      </motion.div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent updates</h3>
            <p className="mt-1 text-sm text-white/55">Latest milestones from our team.</p>
          </div>
          <Link
            href="/dashboard/updates"
            className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-center text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 hover:bg-nirvana-cyan/10"
          >
            Open updates
          </Link>
        </div>
        {updatesLoading ? (
          <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading updates...
          </div>
        ) : updates.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-white/10 bg-nirvana-dark/40 px-4 py-6 text-sm text-white/55">
            No updates posted yet. Check back soon.
          </p>
        ) : (
          <p className="mt-6 text-sm text-white/70">
            {updates.length} update{updates.length > 1 ? "s" : ""} available in the Updates tab.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60">
        <ProfileAvatar avatarUrl={profile?.avatar_url} name={profile?.full_name} address={address} size={36} />
        <span className="text-white/40">Account</span>
        <span className="truncate text-white/80">{profile?.email}</span>
        <button
          type="button"
          onClick={() => void open()}
          className="ml-auto rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 hover:bg-nirvana-cyan/10"
        >
          Wallet
        </button>
      </div>
    </div>
  );
}
