"use client";
import { motion } from "framer-motion";
import { FadeIn } from "../components/FadeIn";
import { steps } from "../content/homepage";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-navy-850 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-jade/[0.03] via-transparent to-jade/[0.03] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-cyan/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mb-16 text-center md:mb-20">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">
            Simple Operating Model
          </span>
          <h2 className="text-4xl font-medium sm:text-6xl lg:text-7xl">
            <span className="text-white">How </span>
            <span className="italic font-serif text-gradient-jade">Nirvana</span>
            <span className="text-white"> Works</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            A clear three-step system: detect the right dream window, place a cue into the dream, and help you recognize what is happening while it is still unfolding.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.15} className="h-full">
                <motion.div whileHover={{ scale: 1.02 }} className="relative h-full">
                  <div className="relative h-full rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[2rem] sm:p-8">
                    <div className="absolute -top-4 left-6 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-4 py-1 sm:left-8">
                      <span className="text-xs text-white/70">({step.number})</span>
                    </div>

                    <div className="mb-5 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.08] sm:mb-6 sm:h-16 sm:w-16">
                      <step.icon className="h-8 w-8 text-jade" />
                    </div>

                    <h3 className="text-xl font-medium text-white sm:text-2xl">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                      {step.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3 text-sm text-white/45">
                          <div className="h-1.5 w-1.5 rounded-full bg-jade/60" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="absolute bottom-4 right-5 text-5xl font-medium text-white/[0.03] sm:text-6xl">
                      {step.number}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute -right-6 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-white/20 lg:block" />
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.5} className="mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50">
            Detect. Cue. Recognize.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
