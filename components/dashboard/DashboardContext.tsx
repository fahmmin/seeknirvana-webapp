"use client";

import { useAppKit } from "@reown/appkit/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAccount } from "wagmi";

import { projectId } from "@/config/reown-wagmi";
import type { DashboardProfile } from "@/lib/dashboard/types";

type DashboardContextValue = {
  profile: DashboardProfile | null;
  profileLoading: boolean;
  onboarded: boolean | null;
  loadProfile: () => Promise<void>;
  address: `0x${string}` | undefined;
  reownReady: boolean;
  openConnect: () => void;
  submitError: string | null;
  setSubmitError: (v: string | null) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

const DASHBOARD_CACHE_KEY = "seeknirvana-dashboard-cache-v2";

type CacheShape = { profile: DashboardProfile };

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { open } = useAppKit();
  const { address, status } = useAccount();
  const reownReady = projectId.length > 0;

  const [profileLoading, setProfileLoading] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const raw = window.localStorage.getItem(DASHBOARD_CACHE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Partial<CacheShape>;
      if (parsed.profile?.onboarding_completed_at) {
        setProfile(parsed.profile);
        setOnboarded(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const loadProfile = useCallback(async () => {
    if (status === "disconnected") {
      setProfileLoading(false);
      setOnboarded(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
      }
      return;
    }
    if (!address || status !== "connected") {
      return;
    }
    setProfileLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/dashboard/profile?address=${encodeURIComponent(address)}`, { method: "GET" });
      const json = (await res.json()) as {
        onboarded?: boolean;
        profile?: DashboardProfile | null;
        error?: string;
        hint?: string;
      };
      if (!res.ok) {
        setOnboarded(false);
        setProfile(null);
        setSubmitError(
          json.error === "database_not_configured"
            ? "Member hub is temporarily unavailable."
            : json.hint === "apply_supabase_migrations"
              ? "Could not load your profile. Apply pending Supabase migrations (profiles schema) or contact support."
              : "Could not load your profile.",
        );
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
        }
        return;
      }
      const ob = Boolean(json.onboarded && json.profile);
      setOnboarded(ob);
      setProfile(json.profile ?? null);
      if (typeof window !== "undefined") {
        if (ob && json.profile) {
          window.localStorage.setItem(DASHBOARD_CACHE_KEY, JSON.stringify({ profile: json.profile } satisfies CacheShape));
        } else {
          window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
        }
      }
    } finally {
      setProfileLoading(false);
    }
  }, [address, status]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const value = useMemo(
    () =>
      ({
        profile,
        profileLoading,
        onboarded,
        loadProfile,
        address,
        reownReady,
        openConnect: () => void open(),
        submitError,
        setSubmitError,
      }) satisfies DashboardContextValue,
    [profile, profileLoading, onboarded, loadProfile, address, reownReady, open, submitError],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
