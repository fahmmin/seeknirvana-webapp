"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Eraser, Loader2, Send, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import { z } from "zod";

import { projectId } from "@/config/reown-wagmi";
import {
  hasSentSignupWelcome,
  markSignupWelcomeSent,
  sendSignupWelcomeEmail,
} from "@/lib/auth/signup-welcome-client";

type ApplicationFormState = {
  fullName: string;
  email: string;
  phone: string;
  ageRange: string;
  location: string;
  timezone: string;
  personalityType: string;
  occupation: string;
  dreamExperience: string;
  wearableExperience: string;
  preferredSessionWindow: string;
  sleepGoal: string;
  currentChallenge: string;
  intentions: string;
  notes: string;
  acceptProgramTerms: boolean;
};

const INITIAL_FORM: ApplicationFormState = {
  fullName: "",
  email: "",
  phone: "",
  ageRange: "",
  location: "",
  timezone: "",
  personalityType: "",
  occupation: "",
  dreamExperience: "",
  wearableExperience: "",
  preferredSessionWindow: "",
  sleepGoal: "",
  currentChallenge: "",
  intentions: "",
  notes: "",
  acceptProgramTerms: false,
};

const personalityOptions = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
  "Unsure / still exploring",
];

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-nirvana-dark/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-nirvana-cyan/40";

const textareaClassName =
  "min-h-[120px] w-full rounded-2xl border border-white/10 bg-nirvana-dark/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-nirvana-cyan/40";

const requiredText = z.string().trim().min(1, "Oops you forgot to put this.");

const cohortFormClientSchema = z.object({
  fullName: requiredText.max(200),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  phone: z.string().trim().max(80),
  ageRange: requiredText.max(40),
  location: requiredText.max(200),
  timezone: requiredText.max(120),
  personalityType: requiredText.max(80),
  occupation: requiredText.max(200),
  dreamExperience: requiredText.max(200),
  wearableExperience: requiredText.max(200),
  preferredSessionWindow: requiredText.max(120),
  sleepGoal: requiredText.max(4000),
  currentChallenge: requiredText.max(4000),
  intentions: requiredText.max(4000),
  notes: z.string().trim().max(4000),
  acceptProgramTerms: z.boolean().refine((value) => value === true, {
    message: "Oops you forgot to put this.",
  }),
});

export default function CohortApplicationForm() {
  const { open } = useAppKit();
  const { isConnected: appKitConnected, status: appKitStatus, embeddedWalletInfo } = useAppKitAccount();
  const { address, isConnected: walletConnected, status: walletStatus } = useAccount();
  const signupWelcomeInFlight = useRef(false);
  const embeddedEmail = embeddedWalletInfo?.user?.email?.trim() ?? "";

  const [form, setForm] = useState<ApplicationFormState>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ApplicationFormState, string>>>({});
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const [hasDashboardProfile, setHasDashboardProfile] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!embeddedEmail) {
      return;
    }
    setForm((current) => ({
      ...current,
      email: current.email ? current.email : embeddedEmail,
    }));
  }, [embeddedEmail]);

  useEffect(() => {
    if (!appKitConnected || appKitStatus !== "connected" || !embeddedEmail) {
      return;
    }
    if (hasSentSignupWelcome(embeddedEmail) || signupWelcomeInFlight.current) {
      return;
    }
    signupWelcomeInFlight.current = true;
    void (async () => {
      const ok = await sendSignupWelcomeEmail(embeddedEmail);
      if (ok) {
        markSignupWelcomeSent(embeddedEmail);
      }
      signupWelcomeInFlight.current = false;
    })();
  }, [appKitConnected, appKitStatus, embeddedEmail]);

  const summary = useMemo(
    () => [
      form.fullName,
      form.email,
      form.personalityType,
      form.preferredSessionWindow,
    ].filter(Boolean),
    [form],
  );
  const occupationShoutout = useMemo(() => {
    const text = form.occupation.toLowerCase();
    if (text.includes("founder")) {
      return "Wow you are a founder, I respect you.";
    }
    if (text.includes("innovator")) {
      return "You are an innovator? We need you.";
    }
    return "";
  }, [form.occupation]);

  /** Prefer wagmi connection state to persist wallet session across refreshes. */
  const showIntakeForm = walletConnected && walletStatus === "connected";

  useEffect(() => {
    if (!showIntakeForm || !address) {
      setIsCheckingProfile(false);
      setHasDashboardProfile(false);
      return;
    }
    let cancelled = false;
    setIsCheckingProfile(true);
    setSubmitError(null);
    void (async () => {
      try {
        const res = await fetch(
          `/api/dashboard/profile?address=${encodeURIComponent(address)}`,
          { method: "GET" },
        );
        const json = (await res.json().catch(() => null)) as
          | { onboarded?: boolean; profile?: { email?: string; full_name?: string | null } | null; error?: string }
          | null;
        if (cancelled) {
          return;
        }
        if (!res.ok) {
          setHasDashboardProfile(false);
          if (json?.error === "database_not_configured") {
            setSubmitError("Member hub is temporarily unavailable.");
          }
          return;
        }
        const onboarded = Boolean(json?.onboarded && json?.profile);
        setHasDashboardProfile(onboarded);
      } finally {
        if (!cancelled) {
          setIsCheckingProfile(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address, showIntakeForm]);

  const handleChange =
    (field: keyof ApplicationFormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const nextValue =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((current) => ({
        ...current,
        [field]: nextValue,
      }));
      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }
        const next = { ...current };
        delete next[field];
        return next;
      });
      if (isSubmitted) {
        setIsSubmitted(false);
      }
    };

  const clearForm = () => {
    setForm(INITIAL_FORM);
    setIsSubmitted(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("seeknirvana-cohort-application");
    }
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot.trim()) {
      return;
    }
    if (!address) {
      setSubmitError("Wallet address missing. Reconnect and try again.");
      return;
    }
    const validated = cohortFormClientSchema.safeParse(form);
    if (!validated.success) {
      const nextErrors: Partial<Record<keyof ApplicationFormState, string>> = {};
      for (const issue of validated.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key in form && !nextErrors[key as keyof ApplicationFormState]) {
          nextErrors[key as keyof ApplicationFormState] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      setSubmitError(Object.values(nextErrors)[0] ?? "Please check your form and try again.");
      return;
    }
    setSubmitError(null);
    setFieldErrors({});
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        walletAddress: address,
        website: honeypot,
      };
      const res = await fetch("/api/programs/cohort-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(data?.error === "validation_error" ? "Please check the highlighted fields." : "Something went wrong. Try again.");
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "seeknirvana-cohort-application",
          JSON.stringify({
            ...form,
            submittedAt: new Date().toISOString(),
          }),
        );
      }
      setIsSubmitted(true);
      setHasDashboardProfile(true);
      if (typeof window !== "undefined") {
        window.location.assign("/dashboard");
      }
    } catch {
      setSubmitError("Network error. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-nirvana-gold/20 bg-nirvana-gold/10 px-4 py-2 text-sm text-nirvana-gold-light">
            <Sparkles className="h-4 w-4" />
            Cohort intake
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Tell us about your sleep, your rhythm, and how you tend to move through the world.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/62">
            This application is designed to understand the person behind the
            metrics, including sleep goals, dream experience, preferred session
            timing, and personality type.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">What we ask for</h3>
          <div className="mt-5 space-y-3">
            {[
              "Contact details and location",
              "Sleep goals, challenges, and dream familiarity",
              "Preferred cohort timing and wearable experience",
              "Personality type for a more human intake",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-nirvana-dark/55 px-4 py-3 text-sm text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-nirvana-jade/20 bg-nirvana-jade/10 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-nirvana-jade/20">
                <CheckCircle2 className="h-5 w-5 text-nirvana-jade-light" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Application received
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Thank you — your intake is submitted. We will follow up using the details you shared.
                </p>
                {summary.length > 0 && (
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/40">
                    {summary.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        {!showIntakeForm ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-cyan">Account</p>
            <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Sign in to apply</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              Use email, a social account, or your wallet. Once you are signed in, the cohort intake form appears here
              and we can pre-fill your email when available.
            </p>
            {!projectId ? (
              <p className="mt-6 text-xs text-nirvana-gold-light/90">
                Set <span className="font-mono text-nirvana-cyan">NEXT_PUBLIC_REOWN_PROJECT_ID</span> in your environment
                to enable sign-in.
              </p>
            ) : (
              <div className="mt-8 flex w-full max-w-md flex-col gap-3">
                <button
                  type="button"
                  onClick={() => void open()}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.08] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:border-nirvana-jade/40 hover:bg-nirvana-jade/15 hover:text-white"
                >
                  Sign in or connect
                </button>
                <a
                  href="/login"
                  className="text-center text-sm text-nirvana-cyan/90 underline-offset-2 hover:underline"
                >
                  Open full sign-in page
                </a>
              </div>
            )}
          </div>
        ) : isCheckingProfile ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-cyan">Account</p>
            <h3 className="mt-4 flex items-center gap-2 text-2xl font-semibold text-white sm:text-3xl">
              <Loader2 className="h-5 w-5 animate-spin text-nirvana-cyan" />
              Loading your profile
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              Checking whether your cohort application is already linked to this wallet.
            </p>
          </div>
        ) : hasDashboardProfile ? (
          <div className="rounded-[2rem] border border-nirvana-jade/25 bg-nirvana-jade/10 p-8 backdrop-blur-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-jade-light">You are already onboarded</p>
            <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Your member hub is ready</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              We already have your personal details on file for this connected wallet, so the intake form is hidden.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-8 py-4 text-base font-medium text-white shadow-sm transition-opacity hover:opacity-95 sm:w-auto"
              >
                Take me to the dashboard
              </a>
              <button
                type="button"
                onClick={() => void open()}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-medium text-white/90 transition-colors hover:border-nirvana-jade/35 hover:bg-nirvana-jade/15 hover:text-white sm:w-auto"
              >
                Wallet & account
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-nirvana-cyan">Account</p>
              <h3 className="mt-3 text-lg font-semibold text-white">You are signed in</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {embeddedEmail
                  ? "Your email is pre-filled below where possible. Open account settings to switch wallet or sign-in method."
                  : "Complete the intake below. Use account settings if you need to add email or change wallet."}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-white/75">
                  {embeddedEmail ? embeddedEmail : "Connected"}
                </p>
                <button
                  type="button"
                  onClick={() => void open()}
                  className="inline-flex w-full shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/90 shadow-sm transition-colors hover:border-nirvana-jade/35 hover:bg-nirvana-jade/15 hover:text-white sm:w-auto"
                >
                  Wallet & account
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
        <form onSubmit={handleSubmit} className="relative space-y-8">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          {submitError && (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {submitError}
            </p>
          )}
          {Object.keys(fieldErrors).length > 0 && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              <p className="font-medium">Please fix these fields:</p>
              <p className="mt-1 text-red-100/90">
                {Object.keys(fieldErrors)
                  .slice(0, 4)
                  .join(", ")}
                {Object.keys(fieldErrors).length > 4 ? ", ..." : ""}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-cyan">
              Personal details
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Full name</span>
                <input
                  required
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  className={`${inputClassName} ${fieldErrors.fullName ? "border-red-400/60 focus:border-red-300" : ""}`}
                  placeholder="Your full name"
                />
                {fieldErrors.fullName && <p className="mt-2 text-xs text-red-300">{fieldErrors.fullName}</p>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email address</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={`${inputClassName} ${fieldErrors.email ? "border-red-400/60 focus:border-red-300" : ""}`}
                  placeholder="you@example.com"
                />
                {fieldErrors.email && <p className="mt-2 text-xs text-red-300">{fieldErrors.email}</p>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Phone or WhatsApp</span>
                <input
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className={inputClassName}
                  placeholder="+1 ..."
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Age range</span>
                <select
                  required
                  value={form.ageRange}
                  onChange={handleChange("ageRange")}
                  className={inputClassName}
                >
                  <option value="">Select age range</option>
                  <option>18-24</option>
                  <option>25-34</option>
                  <option>35-44</option>
                  <option>45-54</option>
                  <option>55-64</option>
                  <option>65+</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">City and country</span>
                <input
                  required
                  value={form.location}
                  onChange={handleChange("location")}
                  className={inputClassName}
                  placeholder="Bangkok, Thailand"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Time zone</span>
                <input
                  required
                  value={form.timezone}
                  onChange={handleChange("timezone")}
                  className={inputClassName}
                  placeholder="UTC+7"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-white/70">Occupation or current focus</span>
                <input
                  value={form.occupation}
                  onChange={handleChange("occupation")}
                  className={`${inputClassName} ${fieldErrors.occupation ? "border-red-400/60 focus:border-red-300" : ""}`}
                  placeholder="Founder, designer, student, therapist..."
                />
                {fieldErrors.occupation && <p className="mt-2 text-xs text-red-300">{fieldErrors.occupation}</p>}
                {occupationShoutout && <p className="mt-2 text-xs text-nirvana-jade-light">{occupationShoutout}</p>}
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-gold-light">
              Personality and rhythm
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Personality type</span>
                <select
                  required
                  value={form.personalityType}
                  onChange={handleChange("personalityType")}
                  className={inputClassName}
                >
                  <option value="">Select personality type</option>
                  {personalityOptions.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Preferred live-session window</span>
                <select
                  required
                  value={form.preferredSessionWindow}
                  onChange={handleChange("preferredSessionWindow")}
                  className={inputClassName}
                >
                  <option value="">Choose a time preference</option>
                  <option>Early morning</option>
                  <option>Midday</option>
                  <option>Evening</option>
                  <option>Late night</option>
                  <option>Flexible</option>
                </select>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-nirvana-jade-light">
              Sleep and dream profile
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Dream recall experience</span>
                <select
                  required
                  value={form.dreamExperience}
                  onChange={handleChange("dreamExperience")}
                  className={inputClassName}
                >
                  <option value="">Select current level</option>
                  <option>Rarely remember dreams</option>
                  <option>Remember fragments sometimes</option>
                  <option>Often remember dreams</option>
                  <option>Already practicing lucid dreaming</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Wearable or ring experience</span>
                <select
                  required
                  value={form.wearableExperience}
                  onChange={handleChange("wearableExperience")}
                  className={inputClassName}
                >
                  <option value="">Select familiarity</option>
                  <option>New to wearables</option>
                  <option>Use a smartwatch regularly</option>
                  <option>Use a smart ring already</option>
                  <option>Comfortable with multiple sleep trackers</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-white/70">Primary sleep goal</span>
                <textarea
                  required
                  value={form.sleepGoal}
                  onChange={handleChange("sleepGoal")}
                  className={textareaClassName}
                  placeholder="What do you most want to improve over the 5-day cohort?"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm text-white/70">Current challenge</span>
                <textarea
                  required
                  value={form.currentChallenge}
                  onChange={handleChange("currentChallenge")}
                  className={textareaClassName}
                  placeholder="Bedtime overthinking, irregular sleep, low dream recall, stress, or anything else..."
                />
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/50">
              Intention
            </p>
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Why do you want to join this cohort now?</span>
                <textarea
                  required
                  value={form.intentions}
                  onChange={handleChange("intentions")}
                  className={textareaClassName}
                  placeholder="Tell us what is calling you toward sleep, dreams, recovery, or lucid awareness at this moment."
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Anything else we should know?</span>
                <textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  className={textareaClassName}
                  placeholder="Relevant context, constraints, hopes, or questions."
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-nirvana-dark/45 p-5">
            <label className="flex items-start gap-3">
              <input
                required
                type="checkbox"
                checked={form.acceptProgramTerms}
                onChange={handleChange("acceptProgramTerms")}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-nirvana-jade focus:ring-nirvana-jade/40"
              />
              <span className="text-sm leading-relaxed text-white/70">
                I agree to the{" "}
                <a
                  href="/privacy#program-privacy"
                  className="text-nirvana-cyan underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms#program-terms"
                  className="text-nirvana-gold-light underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  Terms of Service
                </a>
                .
              </span>
            </label>
            {fieldErrors.acceptProgramTerms && (
              <p className="mt-2 text-xs text-red-300">{fieldErrors.acceptProgramTerms}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <button
              type="submit"
              disabled={!form.acceptProgramTerms || isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-7 py-3.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSaving ? "Submitting…" : "Submit application"}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-medium text-white/78 transition-colors hover:border-white/25 hover:text-white"
            >
              <Eraser className="h-4 w-4" />
              Clear form
            </button>
          </div>
        </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
