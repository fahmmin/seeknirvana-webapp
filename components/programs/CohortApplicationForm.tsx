"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Eraser, Loader2, Send, Sparkles } from "lucide-react";

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

export default function CohortApplicationForm() {
  const { open } = useAppKit();
  const { isConnected, status, embeddedWalletInfo } = useAppKitAccount();
  const signupWelcomeInFlight = useRef(false);
  const embeddedEmail = embeddedWalletInfo?.user?.email?.trim() ?? "";

  const [form, setForm] = useState<ApplicationFormState>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isSaving, setIsSaving] = useState(false);
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
    if (!isConnected || status !== "connected" || !embeddedEmail) {
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
  }, [embeddedEmail, isConnected, status]);

  const summary = useMemo(
    () => [
      form.fullName,
      form.email,
      form.personalityType,
      form.preferredSessionWindow,
    ].filter(Boolean),
    [form],
  );

  /** After Reown session is active, show cohort intake; until then, only the sign-in surface. */
  const showIntakeForm = isConnected;

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot.trim()) {
      return;
    }
    setSubmitError(null);
    setIsSaving(true);
    try {
      const payload = {
        ...form,
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
              <button
                type="button"
                onClick={() => void open()}
                className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-full border border-white/12 bg-white/[0.08] px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:border-nirvana-jade/40 hover:bg-nirvana-jade/15 hover:text-white"
              >
                Sign in or connect
              </button>
            )}
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
                  className={inputClassName}
                  placeholder="Your full name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Email address</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={inputClassName}
                  placeholder="you@example.com"
                />
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
                  className={inputClassName}
                  placeholder="Founder, designer, student, therapist..."
                />
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
