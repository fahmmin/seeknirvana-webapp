"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Compass, MoonStar, Sparkles } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const journeyHighlights = [
  {
    phase: "Recall",
    title: "Remember more of the night",
    icon: BookOpen,
    description:
      "The first win is often simple: more stable dream memory, clearer fragments, and a stronger sense of continuity across nights.",
  },
  {
    phase: "Lucidity",
    title: "Catch the first lucid moments",
    icon: MoonStar,
    description:
      "Cues become easier to notice and awareness can come online for brief but meaningful lucid moments.",
  },
  {
    phase: "Integration",
    title: "Carry insight back into the day",
    icon: Compass,
    description:
      "Sleep starts feeling more intentional and the emotional or reflective value of dreams becomes easier to use.",
  },
];

export default function Benefits() {
  return (
    <section id="journey" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
            Benefits Preview
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            What changes when the system starts working
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            The deeper benefits deserve more room than the homepage can give
            them, so this section now highlights the arc and links to the full
            breakdown.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4">
            {journeyHighlights.map((stage, index) => (
              <FadeIn key={stage.phase} delay={index * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card h-full rounded-2xl border border-white/[0.1] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                      <stage.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                        {stage.phase}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-jade/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.08] px-4 py-2 text-sm text-gold-light">
                  <Sparkles className="h-4 w-4" />
                  फलम् अभ्यासस्य
                </div>
                <p className="text-xs tracking-normal text-white/30">
                  Fruits of practice
                </p>
                <p className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                  Explore the full benefits story, including recall, emotional
                  clarity, calmer sleep, and what progress can look like over
                  time.
                </p>

                <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
                  This keeps the homepage lighter while preserving the richer
                  explanation for visitors who want to go deeper.
                </p>

                <a
                  href="/benefits"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.08] px-6 py-3 text-sm font-medium text-gold-light transition-colors hover:bg-gold/20"
                >
                  Read all benefits
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
