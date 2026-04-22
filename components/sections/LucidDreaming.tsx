"use client";

import { motion } from "framer-motion";
import { Eye, MoonStar, Orbit, Sparkles } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const pillars = [
  {
    icon: Eye,
    title: "You realize you are dreaming",
    description:
      "Lucid dreaming begins the moment awareness switches on inside the dream instead of waiting until morning.",
  },
  {
    icon: Orbit,
    title: "You become observer and participant",
    description:
      "You can notice what is happening, respond with intention, and stay present in the scene rather than being carried by it.",
  },
  {
    icon: MoonStar,
    title: "The dream becomes a practice space",
    description:
      "People use lucid dreams for reflection, creativity, rehearsal, curiosity, and learning to stay calm inside intense inner states.",
  },
];

export default function LucidDreaming() {
  return (
    <section id="lucid-dreaming" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-cyan">
            What Is Lucid Dreaming
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Awareness inside the dream
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            Lucid dreaming means realizing you are dreaming while the dream is
            still happening. You are asleep, but some part of awareness is awake.
          </p>
        </FadeIn>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn className="h-full">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-nirvana-purple/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-4 py-2 text-sm text-cyan">
                  <Sparkles className="h-4 w-4" />
                  Simple mental model
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/[0.1] bg-navy-950/60 p-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                      Regular dream
                    </p>
                    <p className="mt-2 text-lg text-white/72">
                      The story happens to you.
                    </p>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                    className="flex justify-center"
                  >
                    <div className="h-10 w-px bg-gradient-to-b from-transparent via-cyan to-transparent" />
                  </motion.div>
                  <div className="rounded-2xl border border-cyan/20 bg-white/[0.08] p-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan">
                      Lucid dream
                    </p>
                    <p className="mt-2 text-lg text-white/86">
                      You notice the story while living inside it.
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-white/55 sm:text-base">
                  That shift is what SeekNirvana helps train: not forcing dreams,
                  but recognizing the moment awareness can come online.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-4">
            {pillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card h-full rounded-2xl border border-white/[0.1] p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06]">
                    <pillar.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                    {pillar.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
