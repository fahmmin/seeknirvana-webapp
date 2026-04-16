import type { Metadata } from "next";
import {
  Activity,
  BrainCircuit,
  Cpu,
  Sparkles,
  Waves,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/sections/Footer";
import FadeIn from "@/components/animations/FadeIn";
import AppScreenshotCarousel from "@/components/technology/AppScreenshotCarousel";
import LocalModelSection from "@/components/technology/LocalModelSection";

const stackCards = [
  {
    icon: Activity,
    title: "Ring sensing layer",
    description:
      "Your smart ring captures HRV, skin temperature, SpO2, sleep stages, and movement across epochs — discrete windows of physiological truth. SeekNirvana reads these epochs to understand your body's rhythm before making any recommendation.",
  },
  {
    icon: BrainCircuit,
    title: "Soul layer — mind & spirit",
    description:
      "A custom-trained 4B language model runs entirely on your device, fine-tuned on contemplative philosophy, therapeutic dialogue, and reflective journaling. It handles emotional processing, spiritual inquiry, and cognitive stress without a single byte leaving your phone.",
  },
  {
    icon: Waves,
    title: "Body layer — yoga & breathwork",
    description:
      "A second on-device model is trained on asana cues, pranayama sequences, anatomy alignment, and somatic regulation. It reads your ring's epoch data to time breathwork suggestions, adjust flow intensity, and correct posture in context.",
  },
  {
    icon: Cpu,
    title: "Orchestration layer",
    description:
      "A lightweight intent router decides which model activates based on what you're doing and what your ring just reported. Only one model runs at a time — preserving battery, preventing OOM, and keeping responses fast.",
  },
];

const appFeatures = [
  "Epoch-based readiness and body state view",
  "Guided yoga flows timed to your ring data",
  "Pranayama breathwork with live breath pacing",
  "Reflective journaling with soul layer responses",
  "Spiritual and philosophical inquiry mode",
  "Private insight history — on-device, always",
];

const platformBadges = [
  { name: "App Store", icon: "" },
  { name: "Google Play", icon: "▶" },
  { name: "Solana dApp Store", icon: "◎" },
];

export const metadata: Metadata = {
  title: "Technology | SeekNirvana",
  description:
    "See how SeekNirvana combines ring sensing, two on-device custom-trained language models, and a private mobile app for sleep and awareness guidance.",
};

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-nirvana-darker to-nirvana-dark" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-4xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-nirvana-cyan">
              The Intelligence Within
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Two minds. One body. Your data, never leaving the device.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/62">
              SeekNirvana runs two custom-trained language models entirely on
              your phone — one that understands your inner world, one that
              reads your body — guided by epoch signals from your smart ring.
              No cloud. No compromise.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stackCards.map((item) => (
              <FadeIn key={item.title} className="h-full">
                <div className="glass-card h-full rounded-3xl p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-nirvana-cyan/10">
                    <item.icon className="h-5 w-5 text-nirvana-cyan" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative flex-1 overflow-hidden rounded-full border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="h-1 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
                    {index === 2 ? (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-nirvana-cyan/10 p-1">
                        <Activity className="h-3.5 w-3.5 text-nirvana-cyan/70" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-white/25">
                Epoch boundary · signal evaluated
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nirvana-cyan/5 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <LocalModelSection />

          <FadeIn delay={0.15}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-nirvana-jade/20 bg-nirvana-jade/10 px-4 py-2 text-sm text-nirvana-jade-light">
                <Sparkles className="h-4 w-4" />
                सहचर अनुप्रयोग
              </span>

              <div className="mt-8">
                <AppScreenshotCarousel />
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-nirvana-gold/20 bg-nirvana-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-nirvana-gold">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-nirvana-gold" />
                    Coming Soon
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {platformBadges.map((platform) => (
                    <div
                      key={platform.name}
                      className="select-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-white/70">{platform.icon}</span>
                        <div className="text-left">
                          <div className="text-[10px] text-white/35">Download on</div>
                          <div className="text-xs font-medium leading-tight text-white/80">
                            {platform.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {appFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72 sm:text-base"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-nirvana-dark/50 p-5">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-5 w-5 text-nirvana-gold" />
                  <h3 className="text-lg font-semibold text-white">
                    Why the app matters
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                  The app is where raw ring data becomes practice. It lets users
                  review epochs, receive yoga and breathwork timing, journal
                  their inner state, and get private Soul and Body layer
                  guidance before those patterns spill deeper into the night.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden pb-24">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-nirvana-gold/10">
                <Waves className="h-6 w-6 text-nirvana-gold" />
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Private intelligence that knows the difference between a tired body and an anxious mind.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
                Most wellness apps send your most sensitive data — how you
                slept, how you felt, what you wrote — to a remote server.
                SeekNirvana keeps two custom-trained models on your device so
                the guidance is personal, the processing is local, and the
                context never leaves your hands.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/preorder"
                  className="inline-flex rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-3 text-sm font-medium text-white"
                >
                  Join the early access list
                </a>
                <a
                  href="/login"
                  className="inline-flex rounded-full border border-nirvana-cyan/30 bg-nirvana-cyan/10 px-6 py-3 text-sm font-medium text-nirvana-cyan transition-colors hover:bg-nirvana-cyan/20"
                >
                  Join Program
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
