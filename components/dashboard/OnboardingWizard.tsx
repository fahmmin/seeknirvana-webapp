"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useDashboard } from "@/components/dashboard/DashboardContext";
import { useAppKitAccount } from "@reown/appkit/react";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-nirvana-dark/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-nirvana-cyan/40";

const DRAFT_KEY = "seeknirvana-onboarding-draft-v1";

type Draft = {
  fullName: string;
  email: string;
  phone: string;
  timezone: string;
  date_of_birth: string;
  bio: string;
};

const emptyDraft = (): Draft => ({
  fullName: "",
  email: "",
  phone: "",
  timezone: "",
  date_of_birth: "",
  bio: "",
});

export default function OnboardingWizard() {
  const { address } = useAccount();
  const { embeddedWalletInfo } = useAppKitAccount();
  const embeddedEmail = embeddedWalletInfo?.user?.email?.trim() ?? "";
  const { loadProfile, setSubmitError } = useDashboard();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [honeypot, setHoneypot] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!embeddedEmail) {
      return;
    }
    setDraft((d) => ({ ...d, email: d.email ? d.email : embeddedEmail }));
  }, [embeddedEmail]);

  useEffect(() => {
    if (typeof window === "undefined" || !address) {
      return;
    }
    try {
      const raw = window.localStorage.getItem(`${DRAFT_KEY}:${address}`);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Partial<Draft>;
      setDraft((d) => ({
        ...d,
        fullName: parsed.fullName ?? d.fullName,
        email: parsed.email ?? d.email,
        phone: parsed.phone ?? d.phone,
        timezone: parsed.timezone ?? d.timezone,
        date_of_birth: parsed.date_of_birth ?? d.date_of_birth,
        bio: parsed.bio ?? d.bio,
      }));
    } catch {
      // ignore
    }
  }, [address]);

  useEffect(() => {
    if (typeof window === "undefined" || !address) {
      return;
    }
    window.localStorage.setItem(`${DRAFT_KEY}:${address}`, JSON.stringify(draft));
  }, [address, draft]);

  const canNext = useCallback(() => {
    if (step === 0) {
      return draft.fullName.trim().length >= 1;
    }
    if (step === 1) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim());
    }
    if (step === 2) {
      return draft.phone.trim().length >= 1;
    }
    return true;
  }, [step, draft]);

  async function handleSubmit() {
    if (!address || honeypot) {
      return;
    }
    setSaving(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: address,
          full_name: draft.fullName.trim(),
          email: draft.email.trim(),
          phone: draft.phone.trim(),
          timezone: draft.timezone.trim() || undefined,
          date_of_birth: draft.date_of_birth.trim() || undefined,
          bio: draft.bio.trim() || undefined,
          website: "",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        if (json.error === "validation_error") {
          setSubmitError("Please check your details.");
        } else if (json.error === "database_not_configured") {
          setSubmitError("Member hub is temporarily unavailable.");
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
        return;
      }
      if (typeof window !== "undefined" && address) {
        window.localStorage.removeItem(`${DRAFT_KEY}:${address}`);
      }
      await loadProfile();
    } finally {
      setSaving(false);
    }
  }

  const steps = [
    {
      title: "Your name",
      subtitle: "How should we address you?",
      body: (
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-white/50">Full name</span>
          <input
            className={`${inputClassName} mt-2`}
            value={draft.fullName}
            onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
            autoComplete="name"
            maxLength={200}
          />
        </label>
      ),
    },
    {
      title: "Email",
      subtitle: "For preorder updates and member hub notifications.",
      body: (
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-white/50">Email</span>
          <input
            type="email"
            className={`${inputClassName} mt-2`}
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
            autoComplete="email"
            maxLength={320}
          />
        </label>
      ),
    },
    {
      title: "Phone",
      subtitle: "Required for account recovery and important shipping updates.",
      body: (
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-white/50">Phone number</span>
          <input
            type="tel"
            className={`${inputClassName} mt-2`}
            value={draft.phone}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
            autoComplete="tel"
            maxLength={40}
          />
        </label>
      ),
    },
    {
      title: "A little more (optional)",
      subtitle: "You can skip and add these later in settings.",
      body: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Timezone</span>
            <input
              className={`${inputClassName} mt-2`}
              value={draft.timezone}
              onChange={(e) => setDraft((d) => ({ ...d, timezone: e.target.value }))}
              placeholder="e.g. America/New_York"
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Date of birth</span>
            <input
              type="date"
              className={`${inputClassName} mt-2`}
              value={draft.date_of_birth}
              onChange={(e) => setDraft((d) => ({ ...d, date_of_birth: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Short bio</span>
            <textarea
              className={`${inputClassName} mt-2 min-h-[100px] resize-y`}
              value={draft.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              maxLength={2000}
            />
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 max-w-[4rem] rounded-full transition-colors ${i <= step ? "bg-nirvana-cyan" : "bg-white/15"}`}
          />
        ))}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-nirvana-cyan/30 bg-nirvana-cyan/10">
            <Sparkles className="h-5 w-5 text-nirvana-cyan" aria-hidden />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-nirvana-gold/90">Onboarding</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mt-2 text-xl font-semibold text-white">{steps[step]?.title}</h2>
                <p className="mt-1 text-sm text-white/55">{steps[step]?.subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-8"
          >
            {steps[step]?.body}
          </motion.div>
        </AnimatePresence>

        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 transition hover:opacity-95 disabled:opacity-40"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={saving || !canNext()}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 transition hover:opacity-95 disabled:opacity-40"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Saving…
                  </>
                ) : (
                  "Finish & enter hub"
                )}
              </button>
            </div>
          )}
        </div>

        {step === steps.length - 1 ? (
          <button
            type="button"
            onClick={() => void handleSubmit()}
            className="mt-4 w-full text-center text-sm text-nirvana-cyan/90 underline-offset-4 hover:underline"
          >
            Skip optional fields and finish
          </button>
        ) : null}
      </div>
    </div>
  );
}
