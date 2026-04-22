"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Brain, FlaskConical, MoonStar } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const trustPoints = [
  {
    icon: MoonStar,
    title: "Lucid dreaming is trainable",
    description:
      "The practice improves with repetition, recall, timing, and better feedback, which is exactly what the system is designed to support.",
  },
  {
    icon: Brain,
    title: "Grounded in known sleep signals",
    description:
      "SeekNirvana uses measurable inputs like sleep rhythm, readiness, and likely REM timing instead of relying on vague guesswork.",
  },
  {
    icon: FlaskConical,
    title: "Built for experimentation",
    description:
      "The product is framed as a wellness and awareness practice, not a medical device or a promise of instant results.",
  },
];

export default function TrustLayer() {
  return (
    <section id="trust" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/72">
                <BadgeCheck className="h-4 w-4 text-gold" />
                Trust layer
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Visionary, but grounded
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
                The promise is not magic. It is a more credible way to practice
                lucid dreaming by pairing measurable timing with guided awareness.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {trustPoints.map((point, index) => (
                <FadeIn key={point.title} delay={index * 0.08} className="h-full">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="h-full rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06]">
                      <point.icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/58">
                      {point.description}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
