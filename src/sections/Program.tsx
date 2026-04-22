"use client";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { programDays } from "../content/homepage";

export const Program = () => {
  return (
    <section id="program" className="relative overflow-hidden bg-navy-900 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-[40rem] -translate-x-1/2 rounded-full bg-cyan/[0.03] blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">Programs</span>
          <h2 className="text-4xl font-medium text-white sm:text-6xl lg:text-7xl">Start with the current cohort</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">SeekNirvana programs now have a dedicated home. The current listing is the live 5-day cohort, with more guided experiences ready to fit into the same structure later.</p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-16">
          <a href="/programs/5-day-sleep-cohort" className="group block rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[2rem] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div>
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs text-white sm:text-sm">
                  <Sparkles className="h-4 w-4 text-jade" />
                  Current program
                </span>
                <h3 className="mt-6 text-2xl font-medium text-white sm:text-4xl">5-Day Sleep and Dream Cohort</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">A guided virtual cohort for better sleep, stronger dream recall, lucid foundations, and more intentional use of SeekNirvana ring data.</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-jade">
                  View cohort details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] px-5 py-4 text-sm text-white/65">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-jade" />
                    <span>Live virtual cohort</span>
                  </div>
                </div>
                {programDays.slice(0, 3).map((item) => (
                  <div key={item.day} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] px-5 py-4 transition-colors group-hover:bg-white/[0.06]">
                    <div className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 text-jade" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-gold/50">{item.day}</p>
                        <p className="mt-1 text-sm text-white/70">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10">
          <div className="rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 text-center backdrop-blur-md sm:rounded-[2rem] sm:p-10">
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">Browse the current homepage flow first, then enter the cohort that fits.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.12] sm:w-auto">Return to overview</a>
              <a href="/preorder" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/[0.08] sm:w-auto">
                View launch pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
