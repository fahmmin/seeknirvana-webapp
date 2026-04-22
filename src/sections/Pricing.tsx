"use client";
import { motion } from "framer-motion";
import { Check, Shield, Sparkles, Truck } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { pricingFeatures } from "../content/homepage";

export const Pricing = () => {
  return (
    <section id="pricing" className="relative overflow-hidden bg-navy-950 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-jade/[0.08] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">Ready To Go Deeper</span>
          <h2 className="text-4xl font-medium text-white sm:text-6xl lg:text-7xl">Pre-order the ring</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/55 sm:text-lg">The program above explains the method. This section is for the product itself: what the ring includes, what ships with it, and the launch pricing for early supporters.</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div whileHover={{ scale: 1.01 }} className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-1 rounded-[2rem] bg-cyan/20 blur-xl opacity-20" />

            <div className="relative rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-md sm:rounded-[2rem] sm:p-12">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-navy-950 px-4 py-2 sm:px-6">
                <span className="text-xs font-medium tracking-wide text-white sm:text-sm">Launch Offer</span>
              </div>

              <div className="grid gap-10 pt-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gold/50">One-time payment</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-medium text-white sm:text-6xl">$99</span>
                    <span className="text-lg text-white/25 line-through sm:text-xl">$199</span>
                  </div>
                  <p className="mt-3 text-white/65">No subscription. One device, one app, one guided path into better sleep and health.</p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <a href="/preorder" className="block rounded-xl bg-jade px-6 py-4 text-center text-base font-semibold text-navy-950 transition-all hover:brightness-110 glow-jade sm:text-lg">Pre-Order</a>
                    <a href="/programs/5-day-sleep-cohort/apply" className="block rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-center font-medium text-white transition-colors hover:bg-white/[0.1]">Join Program</a>
                    <a href="/programs/5-day-sleep-cohort" className="block rounded-xl border border-white/[0.1] px-6 py-4 text-center font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white">View Program</a>
                  </div>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gold/50">What you get</p>
                  <div className="mt-6 grid gap-3.5 md:grid-cols-2">
                    {pricingFeatures.map((feature) => (
                      <div key={feature.title} className="flex min-h-[96px] items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-4 sm:min-h-[112px] sm:px-5 hover:bg-white/[0.06] transition-colors">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08]">
                          <Check className="h-3 w-3 text-jade" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white sm:text-base">{feature.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-white/40 sm:text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/[0.06] pt-6">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
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
};
