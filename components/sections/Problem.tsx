"use client";

import { motion } from "framer-motion";
import { Brain, Clock3, Moon } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const problemCards = [
  {
    icon: Clock3,
    title: "Sleep gets measured, not guided",
    description:
      "Most people only review the night after it is over, with no structure for improving what happens inside it.",
  },
  {
    icon: Brain,
    title: "Dreams fade too fast",
    description:
      "Dream recall, emotional patterns, and lucid moments disappear quickly without a simple system to catch them.",
  },
  {
    icon: Moon,
    title: "The night stays underused",
    description:
      "A third of life passes in sleep, yet few people learn how to turn that time into recovery, reflection, and awareness.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 mandala-pattern opacity-20" />
      <div className="absolute inset-y-0 left-1/2 w-[42rem] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
            Why It Matters
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Better nights need more than sleep tracking
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            SeekNirvana combines sleep data, dream cues, and guided practice so
            the night becomes something you can work with, not just measure.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {problemCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card h-full rounded-2xl border border-white/[0.1] p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06]">
                  <card.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                  {card.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
