"use client";

import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiGooglefit, SiInstagram } from "react-icons/si";

import FadeIn from "@/components/animations/FadeIn";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import type { FitnessSummary } from "@/lib/dashboard/types";

function formatShortDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatCompact(value: number): string {
  return new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export default function FitAnalyticsPanel() {
  const { profile, address, loadProfile } = useDashboard();
  const [connectorBusy, setConnectorBusy] = useState<"google-fit" | "sync" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [fitnessLoading, setFitnessLoading] = useState(false);
  const [fitness, setFitness] = useState<FitnessSummary | null>(null);
  const googleFitEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_FIT === "true";
  const healthOn = Boolean(profile?.google_fit_connected_at);
  const instagramOn = Boolean(profile?.instagram_connected_at);

  useEffect(() => {
    if (!googleFitEnabled || !address || !healthOn) {
      setFitness(null);
      return;
    }
    let cancelled = false;
    setFitnessLoading(true);
    void (async () => {
      try {
        const res = await fetch(`/api/dashboard/fitness-summary?address=${encodeURIComponent(address)}&range=${range}`);
        const json = (await res.json()) as FitnessSummary;
        if (!cancelled && res.ok) {
          setFitness(json);
        }
      } finally {
        if (!cancelled) {
          setFitnessLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address, googleFitEnabled, healthOn, range]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("google_fit");
    const reason = params.get("reason");
    if (status === "connected") {
      setMessage("Google Fit connected.");
      setError(null);
      void loadProfile();
    } else if (status === "error") {
      setError(
        reason === "oauth_denied"
          ? "Google Fit connection was cancelled."
          : reason === "integration_not_configured"
            ? "Google Fit is not configured in this environment."
            : `Google Fit connection failed (${reason ?? "unknown_error"}).`,
      );
      setMessage(null);
    }
  }, [loadProfile]);

  const maxSteps = useMemo(() => {
    const values = fitness?.points.map((p) => p.steps) ?? [];
    const max = Math.max(...values, 0);
    return max > 0 ? max : 1;
  }, [fitness?.points]);

  const derived = useMemo(() => {
    const points = fitness?.points ?? [];
    if (points.length === 0) {
      return {
        avgSteps: 0,
        avgActiveMinutes: 0,
        activeDaysPct: 0,
        bestDaySteps: 0,
        bestDayDate: null as string | null,
        estimatedDistanceKm: 0,
        caloriesPerActiveMinute: 0,
      };
    }

    const totalSteps = points.reduce((sum, p) => sum + p.steps, 0);
    const totalActiveMinutes = points.reduce((sum, p) => sum + p.active_minutes, 0);
    const totalCalories = points.reduce((sum, p) => sum + p.calories_kcal, 0);
    const activeDays = points.filter((p) => p.steps >= 5000).length;
    const bestDay = points.reduce((best, p) => (p.steps > best.steps ? p : best), points[0]);

    return {
      avgSteps: Math.round(totalSteps / points.length),
      avgActiveMinutes: Math.round(totalActiveMinutes / points.length),
      activeDaysPct: Math.round((activeDays / points.length) * 100),
      bestDaySteps: bestDay.steps,
      bestDayDate: bestDay.metric_date,
      // Approximation: 1 step ~= 0.762m
      estimatedDistanceKm: Math.round((totalSteps * 0.000762) * 10) / 10,
      caloriesPerActiveMinute:
        totalActiveMinutes > 0 ? Math.round((totalCalories / totalActiveMinutes) * 100) / 100 : 0,
    };
  }, [fitness?.points]);

  function connectGoogleFit() {
    if (!address) {
      return;
    }
    window.location.assign(`/api/integrations/google-fit/connect?address=${encodeURIComponent(address)}`);
  }

  async function disconnectGoogleFit() {
    if (!address) {
      return;
    }
    setConnectorBusy("google-fit");
    setError(null);
    try {
      const res = await fetch("/api/integrations/google-fit/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address }),
      });
      if (!res.ok) {
        setError("Could not disconnect Google Fit.");
        return;
      }
      setMessage("Google Fit disconnected.");
      await loadProfile();
      setFitness(null);
    } finally {
      setConnectorBusy(null);
    }
  }

  async function syncGoogleFit() {
    if (!address) {
      return;
    }
    setConnectorBusy("sync");
    setError(null);
    try {
      const res = await fetch("/api/integrations/google-fit/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address, range }),
      });
      if (!res.ok) {
        setError("Could not sync Google Fit right now.");
        return;
      }
      setMessage("Google Fit synced.");
      await loadProfile();
      const summary = await fetch(`/api/dashboard/fitness-summary?address=${encodeURIComponent(address)}&range=${range}`);
      if (summary.ok) {
        setFitness((await summary.json()) as FitnessSummary);
      }
    } finally {
      setConnectorBusy(null);
    }
  }

  if (!googleFitEnabled) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm text-white/60 backdrop-blur-xl">
        Fit analytics are disabled in this environment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.35em] text-nirvana-gold">Performance</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          <span className="gradient-text">Fit analytics</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">Connect Google Fit and review activity trends in one clean view.</p>
      </FadeIn>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-3">
            <SiGooglefit className="h-5 w-5 text-nirvana-cyan" aria-hidden />
            <h2 className="text-sm font-semibold text-white">Google Fit</h2>
          </div>
          <p className="mt-2 text-xs text-white/50">
            Status: {healthOn ? <span className="text-nirvana-jade-light">Linked</span> : "Not linked"}
          </p>
          {profile?.google_fit_last_sync_at ? (
            <p className="mt-1 text-xs text-white/45">Last sync: {new Date(profile.google_fit_last_sync_at).toLocaleString()}</p>
          ) : null}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={connectorBusy !== null}
              onClick={healthOn ? () => void disconnectGoogleFit() : connectGoogleFit}
              className="rounded-full border border-white/15 py-2.5 text-xs font-medium text-white/90 hover:bg-white/5 disabled:opacity-50"
            >
              {connectorBusy === "google-fit" ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : healthOn ? (
                "Disconnect"
              ) : (
                "Connect"
              )}
            </button>
            <button
              type="button"
              disabled={connectorBusy !== null || !healthOn}
              onClick={() => void syncGoogleFit()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-nirvana-cyan/25 py-2.5 text-xs font-medium text-nirvana-cyan hover:bg-nirvana-cyan/10 disabled:opacity-50"
            >
              {connectorBusy === "sync" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-3.5 w-3.5" />}
              Sync
            </button>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-3">
            <SiInstagram className="h-5 w-5 text-pink-300" aria-hidden />
            <h2 className="text-sm font-semibold text-white">Instagram</h2>
          </div>
          <p className="mt-2 text-xs text-white/50">
            Status: {instagramOn ? <span className="text-nirvana-jade-light">Linked (demo)</span> : "Not linked"}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            Social insights are planned for a future release. This tab will stay the central home for third-party fitness
            and lifestyle integrations.
          </p>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
      ) : null}
      {message ? (
        <p className="rounded-xl border border-nirvana-jade/25 bg-nirvana-jade/10 px-4 py-3 text-sm text-nirvana-jade-light">{message}</p>
      ) : null}

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-white">Activity view</h2>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-nirvana-dark/40 p-1">
            <button
              type="button"
              onClick={() => setRange("7d")}
              className={`rounded-full px-3 py-1 text-xs ${range === "7d" ? "bg-nirvana-cyan/20 text-nirvana-cyan" : "text-white/60"}`}
            >
              7d
            </button>
            <button
              type="button"
              onClick={() => setRange("30d")}
              className={`rounded-full px-3 py-1 text-xs ${range === "30d" ? "bg-nirvana-cyan/20 text-nirvana-cyan" : "text-white/60"}`}
            >
              30d
            </button>
          </div>
        </div>

        {fitnessLoading ? (
          <div className="mt-6 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading analytics...
          </div>
        ) : !healthOn ? (
          <p className="mt-6 text-sm text-white/55">Connect Google Fit to unlock visual trends.</p>
        ) : !fitness || fitness.points.length === 0 ? (
          <p className="mt-6 text-sm text-white/55">No synced points yet. Run a sync to render your first trend view.</p>
        ) : (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Steps</p>
                <p className="mt-1 text-xl font-semibold text-white">{fitness.totals.steps.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Active minutes</p>
                <p className="mt-1 text-xl font-semibold text-white">{fitness.totals.active_minutes.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Calories (kcal)</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  {Math.round(fitness.totals.calories_kcal).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Avg daily steps</p>
                <p className="mt-1 text-base font-semibold text-white">{derived.avgSteps.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Avg active minutes/day</p>
                <p className="mt-1 text-base font-semibold text-white">{derived.avgActiveMinutes.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Active-day consistency</p>
                <p className="mt-1 text-base font-semibold text-white">{derived.activeDaysPct}%</p>
                <p className="mt-1 text-[11px] text-white/45">Days with 5k+ steps</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
                <p className="text-xs text-white/55">Estimated distance</p>
                <p className="mt-1 text-base font-semibold text-white">{derived.estimatedDistanceKm} km</p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-nirvana-cyan/10 to-transparent p-4">
                <p className="text-xs text-white/55">Best day</p>
                <p className="mt-1 text-base font-semibold text-white">
                  {derived.bestDayDate ? `${formatShortDate(derived.bestDayDate)} · ${formatCompact(derived.bestDaySteps)} steps` : "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-nirvana-jade/10 to-transparent p-4">
                <p className="text-xs text-white/55">Calories / active minute</p>
                <p className="mt-1 text-base font-semibold text-white">{derived.caloriesPerActiveMinute.toFixed(2)} kcal</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-nirvana-dark/35 p-4">
              <p className="mb-4 text-xs uppercase tracking-wide text-white/50">Daily steps trend</p>
              <div className="grid grid-cols-7 gap-2 sm:grid-cols-10">
                {fitness.points.map((point) => {
                  const height = Math.max(10, Math.round((point.steps / maxSteps) * 100));
                  return (
                    <div key={point.metric_date} className="flex flex-col items-center gap-2">
                      <div className="flex h-28 w-full items-end">
                        <div
                          className="w-full rounded-md bg-gradient-to-t from-nirvana-cyan/35 to-nirvana-jade/55"
                          style={{ height: `${height}%` }}
                          title={`${point.steps.toLocaleString()} steps`}
                        />
                      </div>
                      <span className="text-[10px] text-white/45">{formatShortDate(point.metric_date)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
