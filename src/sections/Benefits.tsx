"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { journeyHighlights } from "../content/homepage";

export const Benefits = () => {
  return (
    <section id="journey" className="relative overflow-hidden bg-navy-900 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {/* Subtle purple/magenta radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-jade/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">
            Benefits Preview
          </span>
          <h2 className="text-4xl font-medium text-white sm:text-6xl lg:text-7xl">
            What changes when the system starts working
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            The deeper benefits deserve more room than the homepage can give them, so this section highlights the arc and keeps the larger story in view.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4">
            {journeyHighlights.map((stage, index) => (
              <FadeIn key={stage.phase} delay={index * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[2rem] sm:p-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                      <stage.icon className="h-5 w-5 text-jade" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-gold/60">
                        {stage.phase}
                      </p>
                      <h3 className="mt-1 text-xl font-medium text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-md sm:rounded-[2rem] sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-jade/[0.03]" />
              <div className="relative">
                <div className="devanagari-text mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm text-gold-light sm:text-base">
                  <Sparkles className="h-4 w-4 text-gold" />
                  फलम् अभ्यासस्य
                </div>
                <p className="text-xs tracking-normal text-gold/40">
                  Fruits of practice
                </p>
                <p className="mt-3 text-xl font-medium leading-relaxed text-white sm:text-3xl">
                  Explore the full benefits story, including recall, emotional clarity, calmer sleep, and what progress can look like over time.
                </p>

                <p className="mt-8 text-sm leading-relaxed text-white/55 sm:text-base">
                  This keeps the homepage lighter while preserving the richer explanation for visitors who want to go deeper.
                </p>

                <a
                  href="/benefits"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.1] sm:w-auto"
                >
                  Read all benefits
                  <ArrowRight className="h-4 w-4 text-jade" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
