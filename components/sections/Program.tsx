"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Compass, Eye, MoonStar, Sparkles, Waves } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const days = [
  { day: "Day 1", title: "Awareness", icon: Eye, description: "Learn the fundamentals of recall, attention, and how to notice the shape of your nights." },
  { day: "Day 2", title: "Entry", icon: MoonStar, description: "Set up cues, timing, and bedtime preparation so lucid recognition has a real point of entry." },
  { day: "Day 3", title: "Stabilization", icon: Waves, description: "Practice staying calm and extending awareness once a lucid moment appears." },
  { day: "Day 4", title: "Exploration", icon: Compass, description: "Use the dream state with more intention for observation, creativity, and inner experimentation." },
  { day: "Day 5", title: "Integration", icon: Sparkles, description: "Review what worked, connect the insights back to waking life, and prepare for the next cycle." },
];

export default function Program() {
  return (
    <section id="program" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 mandala-pattern opacity-20" />
      <div className="absolute inset-y-0 left-1/2 w-[40rem] -translate-x-1/2 rounded-full bg-jade/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-jade-light">
            Programs
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Start with the current cohort
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            SeekNirvana programs now have a dedicated home. The current listing
            is the live 5-day cohort, with more guided experiences ready to fit
            into the same structure later.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-16">
          <a
            href="/programs/5-day-sleep-cohort"
            className="group block rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl transition-transform hover:-translate-y-1 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-sm text-jade-light">
                  <Sparkles className="h-4 w-4" />
                  Current program
                </span>
                <h3 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                  5-Day Sleep and Dream Cohort
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg">
                  A guided virtual cohort for better sleep, stronger dream
                  recall, lucid foundations, and more intentional use of
                  SeekNirvana ring data.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-jade-light">
                  View cohort details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-sm text-white/72">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-cyan" />
                    <span>Live virtual cohort</span>
                  </div>
                </div>
                {days.slice(0, 3).map((item) => (
                  <div
                    key={item.day}
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 text-cyan" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                          {item.day}
                        </p>
                        <p className="mt-1 text-sm text-white/75">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10">
          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 text-center backdrop-blur-xl sm:p-10">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/70">
              Browse all programs first, then enter the cohort that fits.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-6 py-3 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20"
              >
                Sign in to continue
              </a>
              <a
                href="/programs"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-6 py-3 text-sm font-medium text-jade-light transition-colors hover:bg-jade/20"
              >
                View all programs
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
