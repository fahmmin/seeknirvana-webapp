"use client";

import { motion } from "framer-motion";
import { AlarmClockCheck, BookOpenText, BrainCircuit, RefreshCw, Target } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const failurePatterns = [
  {
    icon: BookOpenText,
    title: "Low dream recall",
    description:
      "If you rarely remember dreams, you have no stable material to work with and no way to notice progress.",
  },
  {
    icon: RefreshCw,
    title: "Inconsistent practice",
    description:
      "Lucid dreaming responds to repetition, but most people try a method for two nights and then switch to another one.",
  },
  {
    icon: AlarmClockCheck,
    title: "Poor timing",
    description:
      "The right cue at the wrong sleep stage does very little. Timing matters as much as effort.",
  },
  {
    icon: BrainCircuit,
    title: "Random internet techniques",
    description:
      "Advice is often fragmented: a trick here, a supplement there, but no integrated system connecting body, mind, and timing.",
  },
];

export default function WhyPeopleFail() {
  return (
    <section id="why-people-fail" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-nirvana-purple/5 via-transparent to-gold/5" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold-light">
            Why People Fail
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Most people are not failing. Their system is.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            Lucid dreaming is learnable, but DIY attempts usually rely on bad
            timing, weak recall, scattered methods, and almost no feedback.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4">
            {failurePatterns.map((pattern, index) => (
              <FadeIn key={pattern.title} delay={index * 0.08} className="h-full">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass-card h-full rounded-2xl border border-white/[0.1] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06]">
                      <pattern.icon className="h-5 w-5 text-gold-light" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {pattern.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/58 sm:text-base">
                        {pattern.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-nirvana-purple/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/70">
                  <Target className="h-4 w-4 text-gold" />
                  System, not self-judgment
                </div>
                <p className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                  SeekNirvana reframes the challenge from{" "}
                  <span className="gradient-text-gold">“try harder”</span> to{" "}
                  <span className="text-cyan">“train with timing, cues,
                  and feedback.”</span>
                </p>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/58 sm:text-base">
                  <p>
                    That matters because lucid dreaming is not a single hack. It
                    is a coordination problem between physiology, attention,
                    memory, and repetition.
                  </p>
                  <p>
                    When the process becomes measurable and guided, the practice
                    stops feeling mystical or random and starts feeling trainable.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
