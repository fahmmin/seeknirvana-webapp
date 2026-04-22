"use client";

import { useAppKit } from "@reown/appkit/react";
import { motion } from "framer-motion";
import { Activity, Bell, CheckCircle2, Link2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGooglefit, SiInstagram } from "react-icons/si";

import { FadeIn } from "@/src/components/FadeIn";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import {
  dashboardActionClass,
  dashboardBadgeClass,
  dashboardCardClass,
  dashboardEyebrowClass,
  dashboardHeadingWrapClass,
  dashboardMutedCardClass,
  dashboardPageClass,
  dashboardSubtitleClass,
  dashboardTitleClass,
} from "@/components/dashboard/ui";
import type { ProductUpdate } from "@/lib/dashboard/types";

export default function DashboardHome() {
  const { open } = useAppKit();
  const { profile, address } = useDashboard();
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);
  const [updatesError, setUpdatesError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setUpdatesLoading(true);
    setUpdatesError(false);
    void (async () => {
      try {
        const res = await fetch("/api/dashboard/updates");
        const json = (await res.json()) as { updates?: ProductUpdate[] };
        if (cancelled) return;
        if (res.ok && json.updates) {
          setUpdates(json.updates);
        } else {
          setUpdatesError(true);
        }
      } catch {
        if (!cancelled) setUpdatesError(true);
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
    <div className={dashboardPageClass}>
      <FadeIn>
        <div className={dashboardHeadingWrapClass}>
          <p className={dashboardEyebrowClass}>Preorder</p>
          <h1 className={dashboardTitleClass}>
            <span className="text-gradient-jade">{heading}</span>
          </h1>
          <p className={dashboardSubtitleClass}>Your calm space for account controls, connector health, and product progress.</p>
        </div>
      </FadeIn>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href="/dashboard/settings"
          className={`${dashboardCardClass} p-5 transition-colors hover:border-cyan/30`}
        >
          <div className="flex items-center gap-2 text-cyan">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Profile &amp; settings</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Edit details and wallet settings.</p>
        </Link>
        <Link
          href="/dashboard/updates"
          className={`${dashboardCardClass} p-5 transition-colors hover:border-cyan/30`}
        >
          <div className="flex items-center gap-2 text-cyan">
            <Bell className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Product updates</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Milestones from our team.</p>
        </Link>
        <Link
          href="/dashboard/fit"
          className={`${dashboardCardClass} p-5 transition-colors hover:border-cyan/30`}
        >
          <div className="flex items-center gap-2 text-cyan">
            <SiGooglefit className="h-4 w-4" />
            <span className="text-sm font-medium text-white">Fit analytics</span>
          </div>
          <p className="mt-2 text-xs text-white/50">Connectors, sync, and visual trends.</p>
        </Link>
      </div>

      <div className={`${dashboardMutedCardClass} p-5`}>
        <div className="flex items-center gap-2 text-white/90">
          <Link2 className="h-4 w-4 text-cyan" />
          <h2 className="text-sm font-semibold">Connectors</h2>
        </div>
        <p className="mt-1 text-xs text-white/45">Manage integrations in the Fit Analytics tab.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`${dashboardBadgeClass} ${healthConnected ? "border-jade/40 text-jade-light" : "border-white/15 text-white/50"}`}>
            <SiGooglefit className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" />
            Google Fit {healthConnected ? "· linked" : "· not linked"}
          </span>
          <span className={`${dashboardBadgeClass} ${igConnected ? "border-jade/40 text-jade-light" : "border-white/15 text-white/50"}`}>
            <SiInstagram className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" />
            Instagram {igConnected ? "· linked" : "· not linked"}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gold/25 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent p-6 shadow-[0_18px_50px_rgba(9,6,28,0.35)] backdrop-blur-xl sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold/90">Status</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Coming soon</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
              Your ring is reserved. We are polishing manufacturing and fulfillment details. You will see milestones here
              first—no need to dig through email unless we need something from you.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-jade/35 bg-white/[0.08] px-4 py-2 text-sm text-jade-light">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Preorder confirmed
          </div>
        </div>
      </motion.div>

      <div className={dashboardCardClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent updates</h3>
            <p className="mt-1 text-sm text-white/55">Latest milestones from our team.</p>
          </div>
          <Link
            href="/dashboard/updates"
            className={dashboardActionClass()}
          >
            Open updates
          </Link>
        </div>
        {updatesLoading ? (
          <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading updates...
          </div>
        ) : updatesError ? (
          <p className="mt-6 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-6 text-sm text-white/55">
            Could not load updates. Try refreshing the page.
          </p>
        ) : updates.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-6 text-sm text-white/55">
            No updates posted yet. Check back soon.
          </p>
        ) : (
          <p className="mt-6 text-sm text-white/70">
            {updates.length} update{updates.length > 1 ? "s" : ""} available in the Updates tab.
          </p>
        )}
      </div>

      <div className={`${dashboardMutedCardClass} flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/60`}>
        <ProfileAvatar avatarUrl={profile?.avatar_url} name={profile?.full_name} address={address} size={36} />
        <span className="text-white/40">Account</span>
        <span className="truncate text-white/80">{profile?.email}</span>
        <button
          type="button"
          onClick={() => void open()}
          className={`ml-auto ${dashboardActionClass()}`}
        >
          Wallet
        </button>
      </div>
    </div>
  );
}
