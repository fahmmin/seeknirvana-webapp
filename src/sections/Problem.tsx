"use client";
import { motion } from "framer-motion";
import { FadeIn } from "../components/FadeIn";
import { problemCards } from "../content/homepage";

export const Problem = () => {
  return (
    <section id="problem" className="relative overflow-hidden bg-navy-900 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-[42rem] -translate-x-1/2 rounded-full bg-jade/[0.05] blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">
            Why It Matters
          </span>
          <h2 className="text-4xl font-medium text-white sm:text-6xl lg:text-7xl">
            Better nights need more than sleep tracking
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            SeekNirvana combines sleep data, dream cues, and guided practice so the night becomes something you can work with, not just measure.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
          {problemCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[2rem] sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                  <card.icon className="h-5 w-5 text-jade" />
                </div>
                <h3 className="text-xl font-medium text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                  {card.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
