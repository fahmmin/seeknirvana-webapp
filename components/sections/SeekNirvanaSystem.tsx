"use client";

import { motion } from "framer-motion";
import { Activity, Bot, Brain, ChevronRight, Moon, NotebookPen } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const layers = [
  {
    icon: Activity,
    title: "Body",
    description: "The ring tracks HRV, sleep structure, and likely REM windows so the system knows when awareness has a real opening.",
    accent: "text-jade-light",
  },
  {
    icon: Brain,
    title: "Mind",
    description: "You build intention through cues, recall, reflection, and dream journaling so the practice becomes more than a one-night experiment.",
    accent: "text-gold-light",
  },
  {
    icon: Bot,
    title: "Intelligence",
    description: "AI organizes patterns across nights, highlights what is working, and personalizes the guidance instead of leaving you to guess.",
    accent: "text-cyan",
  },
];

const loop = [
  { icon: Activity, label: "Data" },
  { icon: Brain, label: "Awareness" },
  { icon: Moon, label: "Dream" },
  { icon: NotebookPen, label: "Insight" },
  { icon: ChevronRight, label: "Action" },
];

export default function SeekNirvanaSystem() {
  return (
    <section id="system" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-jade/5 via-transparent to-cyan/5" />
      <div className="absolute inset-0 mandala-pattern opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-jade-light">
            The SeekNirvana System
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            A consciousness feedback system
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            SeekNirvana is not just a sleep tracker with a dream feature. It is
            a loop that connects physiology, awareness practice, dream-state
            recognition, and real-world integration.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn className="h-full">
            <div className="glass-card h-full rounded-3xl border border-white/[0.1] p-8 sm:p-10">
              <div className="grid gap-4">
                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.06] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950/70">
                        <layer.icon className={`h-5 w-5 ${layer.accent}`} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                          Layer {index + 1}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-white">
                          {layer.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/58 sm:text-base">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-cyan/15 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-jade/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-4 py-2 text-sm text-cyan">
                  <Bot className="h-4 w-4" />
                  The loop
                </div>

                <div className="space-y-4">
                  {loop.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-navy-950/70">
                        <item.icon
                          className={`h-5 w-5 ${
                            item.label === "Action"
                              ? "text-gold"
                              : "text-cyan"
                          }`}
                        />
                      </div>
                      <div className="text-lg font-medium text-white">{item.label}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
                  Data becomes awareness. Awareness improves dream recognition.
                  Dreams create insight. Insight changes how you sleep, reflect,
                  and train the next night.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
