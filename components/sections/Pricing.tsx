"use client";

import { motion } from "framer-motion";
import { Check, Shield, Sparkles, Truck } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const features = [
  {
    title: "Smart Ring Hardware",
    description: "Ring and charger included in the launch bundle.",
  },
  {
    title: "Mobile App Companion",
    description: "Works across iOS and Android.",
  },
  {
    title: "REM Cueing Layer",
    description: "Sleep insight and lucid-dream timing support.",
  },
  {
    title: "5-Day Program",
    description: "A structured program to help you begin well.",
  },
  {
    title: "Lifetime Updates",
    description: "No subscription required.",
  },
  {
    title: "Private Local AI",
    description: "Your data stays with on-device models.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-nirvana-jade/10 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-nirvana-jade-light">
            Ready To Go Deeper
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Pre-order the ring
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/62">
            The program above explains the method. This section is for the
            product itself: what the ring includes, what ships with it, and the
            launch pricing for early supporters.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-nirvana-jade via-nirvana-cyan to-nirvana-jade blur opacity-20" />

            <div className="relative rounded-3xl border border-nirvana-jade/20 glass-card p-8 sm:p-12">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-2">
                <span className="text-sm font-medium tracking-wide text-white">
                  Launch Offer
                </span>
              </div>

              <div className="grid gap-10 pt-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                    One-time payment
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white sm:text-6xl">$99</span>
                    <span className="text-xl text-white/40 line-through">$199</span>
                  </div>
                  <p className="mt-3 text-nirvana-jade-light">
                    No subscription. One device, one app, one guided path into
                    better sleep and health.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <a
                      href="/preorder"
                      className="block rounded-xl bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-4 text-center text-lg font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-nirvana-jade/20"
                    >
                      Pre-Order
                    </a>

                    <a
                      href="/login"
                      className="block rounded-xl border border-nirvana-cyan/30 bg-nirvana-cyan/10 px-6 py-4 text-center font-medium text-nirvana-cyan transition-colors hover:border-nirvana-cyan/50 hover:bg-nirvana-cyan/15"
                    >
                      Join Program
                    </a>

                    <a
                      href="/programs/5-day-sleep-cohort"
                      className="block rounded-xl border border-white/10 px-6 py-4 text-center font-medium text-white/78 transition-colors hover:border-nirvana-cyan/40 hover:text-nirvana-cyan"
                    >
                      View Program
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                    What you get
                  </p>
                  <div className="mt-6 grid gap-3.5 md:grid-cols-2">
                    {features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex min-h-[112px] items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:px-5"
                      >
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-nirvana-jade/20">
                          <Check className="h-3 w-3 text-nirvana-jade" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/90 sm:text-base">
                            {feature.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-white/48 sm:text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Sparkles className="h-4 w-4" />
                  <span>Premium launch build</span>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
