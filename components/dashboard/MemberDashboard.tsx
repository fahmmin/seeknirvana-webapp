"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, LayoutDashboard, Loader2, LogOut, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import FadeIn from "@/components/animations/FadeIn";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import { projectId } from "@/config/reown-wagmi";

type ApiProfile = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  onboarding_completed_at: string;
};

type ProductUpdate = {
  id: string;
  title: string;
  body: string;
  published_at: string;
  sort_order: number;
};

type DashboardCache = {
  profile: ApiProfile;
};

const DASHBOARD_CACHE_KEY = "seeknirvana-dashboard-cache-v1";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-nirvana-dark/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-nirvana-cyan/40";

type MemberDashboardProps = {
  section?: "overview" | "updates";
};

export default function MemberDashboard({ section = "overview" }: MemberDashboardProps) {
  const { open } = useAppKit();
  const { address, isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { embeddedWalletInfo } = useAppKitAccount();
  const embeddedEmail = embeddedWalletInfo?.user?.email?.trim() ?? "";

  const [profileLoading, setProfileLoading] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<ApiProfile | null>(null);

  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const reownReady = projectId.length > 0;
  const isWalletConnected = isConnected && status === "connected";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const raw = window.localStorage.getItem(DASHBOARD_CACHE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Partial<DashboardCache>;
      if (parsed.profile) {
        setProfile(parsed.profile);
        setOnboarded(true);
        if (parsed.profile.full_name) {
          setFullName(parsed.profile.full_name);
        }
        if (parsed.profile.email) {
          setEmail(parsed.profile.email);
        }
      }
    } catch {
      // Ignore malformed local cache.
    }
  }, []);

  useEffect(() => {
    if (!embeddedEmail) {
      return;
    }
    setEmail((current) => (current ? current : embeddedEmail));
  }, [embeddedEmail]);

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
      const res = await fetch(
        `/api/dashboard/profile?address=${encodeURIComponent(address)}`,
        { method: "GET" },
      );
      const json = (await res.json()) as {
        onboarded?: boolean;
        profile?: ApiProfile | null;
        error?: string;
      };
      if (!res.ok) {
        setOnboarded(false);
        setProfile(null);
        setSubmitError(json.error === "database_not_configured" ? "Member hub is temporarily unavailable." : "Could not load your profile.");
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
          window.localStorage.setItem(
            DASHBOARD_CACHE_KEY,
            JSON.stringify({ profile: json.profile } satisfies DashboardCache),
          );
        } else {
          window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
        }
      }
      if (json.profile?.full_name) {
        setFullName(json.profile.full_name);
      }
      if (json.profile?.email) {
        setEmail(json.profile.email);
      }
    } finally {
      setProfileLoading(false);
    }
  }, [address, status]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (!onboarded) {
      setUpdates([]);
      return;
    }
    let cancelled = false;
    setUpdatesLoading(true);
    void (async () => {
      try {
        const res = await fetch("/api/dashboard/updates");
        const json = (await res.json()) as { updates?: ProductUpdate[]; error?: string };
        if (cancelled) {
          return;
        }
        if (res.ok && json.updates) {
          setUpdates(json.updates);
        } else {
          setUpdates([]);
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
  }, [onboarded]);

  const showConnect = status === "disconnected";
  const showForm = isWalletConnected && !profileLoading && onboarded === false;
  const showDashboard = isWalletConnected && !profileLoading && onboarded === true;
  const showDashboardShell = !showConnect && !showForm;

  const heading = useMemo(() => {
    if (showDashboard && profile?.full_name) {
      return `Welcome, ${profile.full_name.split(/\s+/)[0]}`;
    }
    if (showDashboard) {
      return "Welcome to your member hub";
    }
    return "Member hub";
  }, [showDashboard, profile?.full_name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address || honeypot) {
      return;
    }
    setIsSaving(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: address,
          full_name: fullName.trim(),
          email: email.trim(),
          website: "",
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        profile?: ApiProfile;
        error?: string;
        issues?: unknown;
      };
      if (!res.ok) {
        if (json.error === "validation_error") {
          setSubmitError("Please check your name and email.");
        } else if (json.error === "database_not_configured") {
          setSubmitError("Member hub is temporarily unavailable.");
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
        return;
      }
      if (json.ok && json.profile) {
        setOnboarded(true);
        setProfile(json.profile);
        setFullName(json.profile.full_name ?? fullName.trim());
        setEmail(json.profile.email);
      }
    } finally {
      setIsSaving(false);
    }
  }

  function handleSignOut() {
    disconnect();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DASHBOARD_CACHE_KEY);
      window.location.assign("/");
    }
  }

  return (
    <div className="min-h-screen bg-nirvana-dark">
      <Navigation />

      <main className="relative pt-28 pb-20">
        <div className="absolute inset-0 mandala-pattern pointer-events-none opacity-25" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-center text-xs uppercase tracking-[0.35em] text-nirvana-gold">Preorder</p>
            <h1 className="mt-3 text-center text-3xl sm:text-4xl font-bold text-white">
              <span className="gradient-text">{heading}</span>
            </h1>
            <p className="mt-4 text-center text-sm text-white/60 leading-relaxed">
              A calm space for everyone who reserved a Nirvana Ring. Thank you for believing in this journey.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-8">
            {showConnect && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center"
              >
                <Sparkles className="mx-auto h-10 w-10 text-nirvana-cyan/90" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold text-white">Connect your wallet</h2>
                <p className="mt-2 text-sm text-white/60">
                  Sign in with the same wallet you used for checkout to open your member hub.
                </p>
                {!reownReady ? (
                  <p className="mt-6 text-sm text-nirvana-gold/90">Wallet sign-in is not configured in this environment.</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => void open()}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-8 py-3 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 transition hover:opacity-95"
                  >
                    Connect wallet
                  </button>
                )}
              </motion.div>
            )}

            {showForm && (
              <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl"
              >
                <h2 className="text-lg font-semibold text-white">Confirm your details</h2>
                <p className="mt-2 text-sm text-white/60">
                  We will use this email for important preorder updates. You can manage your wallet from account settings anytime.
                </p>

                <div className="mt-8 space-y-4">
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/50">Full name</span>
                    <input
                      className={`${inputClassName} mt-2`}
                      value={fullName}
                      onChange={(ev) => setFullName(ev.target.value)}
                      autoComplete="name"
                      required
                      maxLength={200}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-wide text-white/50">Email</span>
                    <input
                      type="email"
                      className={`${inputClassName} mt-2`}
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      autoComplete="email"
                      required
                      maxLength={320}
                    />
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(ev) => setHoneypot(ev.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                  />
                </div>

                {submitError ? (
                  <p className="mt-4 text-sm text-red-400/90" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark py-3.5 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 transition hover:opacity-95 disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      Saving…
                    </>
                  ) : (
                    "Enter member hub"
                  )}
                </button>
              </motion.form>
            )}

            {showDashboardShell && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
                  <aside className="flex min-h-[28rem] flex-col rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <p className="px-3 text-xs uppercase tracking-[0.3em] text-white/45">Portal</p>
                    <nav className="mt-5 space-y-2">
                      <a
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          section === "overview"
                            ? "bg-nirvana-cyan/15 text-nirvana-cyan"
                            : "text-white/75 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </a>
                      <a
                        href="/dashboard/updates"
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          section === "updates"
                            ? "bg-nirvana-cyan/15 text-nirvana-cyan"
                            : "text-white/75 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Bell className="h-4 w-4" />
                        Updates
                      </a>
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

                  <div className="space-y-6">
                    {profileLoading || onboarded === null ? (
                      <>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
                          <div className="flex items-center gap-3 text-white/80">
                            <Loader2 className="h-5 w-5 animate-spin text-nirvana-cyan" aria-hidden />
                            Loading your dashboard...
                          </div>
                          <div className="mt-6 space-y-3">
                            <div className="h-4 w-2/3 rounded bg-white/10" />
                            <div className="h-4 w-1/2 rounded bg-white/10" />
                            <div className="h-4 w-3/4 rounded bg-white/10" />
                          </div>
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
                          <div className="h-4 w-40 rounded bg-white/10" />
                          <div className="mt-6 h-24 rounded-2xl bg-white/5" />
                        </div>
                      </>
                    ) : section === "overview" ? (
                      <>
                        <div className="rounded-[2rem] border border-nirvana-gold/25 bg-gradient-to-br from-white/[0.07] to-transparent p-6 sm:p-8 backdrop-blur-xl">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.28em] text-nirvana-gold/90">Status</p>
                              <h2 className="mt-2 text-2xl font-semibold text-white">Coming soon</h2>
                              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                                Your ring is reserved. We are polishing manufacturing and fulfillment details. You will see
                                milestones here first-no need to dig through email unless we need something from you.
                              </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 rounded-full border border-nirvana-jade/35 bg-nirvana-jade/10 px-4 py-2 text-sm text-nirvana-jade-light">
                              <CheckCircle2 className="h-4 w-4" aria-hidden />
                              Preorder confirmed
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white">Recent updates</h3>
                              <p className="mt-1 text-sm text-white/55">Latest milestones from our team.</p>
                            </div>
                            <a
                              href="/dashboard/updates"
                              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 hover:bg-nirvana-cyan/10"
                            >
                              Open updates
                            </a>
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
                      </>
                    ) : (
                      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
                        <div className="flex items-center gap-2 text-white">
                          <Bell className="h-5 w-5 text-nirvana-cyan" aria-hidden />
                          <h3 className="text-lg font-semibold">Product updates</h3>
                        </div>
                        <p className="mt-1 text-sm text-white/55">Notes from our team as we ship your Nirvana experience.</p>

                        {updatesLoading ? (
                          <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            Loading updates...
                          </div>
                        ) : updates.length === 0 ? (
                          <p className="mt-8 rounded-2xl border border-white/10 bg-nirvana-dark/40 px-4 py-6 text-sm text-white/55">
                            No updates posted yet. Check back soon-we will share production and shipping news here.
                          </p>
                        ) : (
                          <ul className="mt-8 space-y-4">
                            {updates.map((u) => (
                              <li
                                key={u.id}
                                className="rounded-2xl border border-white/10 bg-nirvana-dark/40 px-4 py-5"
                              >
                                <p className="text-xs uppercase tracking-wide text-nirvana-gold/80">
                                  {new Date(u.published_at).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <h4 className="mt-2 text-base font-semibold text-white">{u.title}</h4>
                                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{u.body}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60">
                      <span className="text-white/40">Account</span>
                      <span className="truncate text-white/80">{profile?.email ?? email}</span>
                      <button
                        type="button"
                        onClick={() => void open()}
                        className="ml-auto rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 hover:bg-nirvana-cyan/10"
                      >
                        Wallet &amp; settings
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
