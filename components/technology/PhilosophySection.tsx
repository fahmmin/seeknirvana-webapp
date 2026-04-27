'use client'

import { motion } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
import LazyVideo from '../animations/LazyVideo'

export default function PhilosophySection() {
  return (
    <section className="bg-transparent py-16 md:py-24 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24">
            Intelligence <span className="gradient-text">with</span> Privacy
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <div className="flex flex-col gap-12 order-2 md:order-1">
            <FadeIn delay={0.2} direction="left">
              <div className="space-y-6">
                <span className="text-gold text-xs tracking-[0.3em] uppercase block">
                  AI Layer
                </span>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Meet the Soul and Body layers—powered by custom-trained Gemma 4 models. They interpret your data, adapt to your patterns, and help you navigate internal states with precision. Seek Nirvana is evolving into an open intelligence layer where your consciousness isn't one-dimensional, and your AI shouldn't be either.
                </p>
              </div>
            </FadeIn>

            <div className="w-full h-px bg-white/10" />

            <FadeIn delay={0.4} direction="left">
              <div className="space-y-6">
                <span className="text-gold text-xs tracking-[0.3em] uppercase block">
                  Infrastructure of Trust
                </span>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Privacy is the foundation, not a feature. Our architecture is designed with on-device processing, end-to-end encrypted flows, and user-controlled data permissions. We don't just protect your data; we ensure you remain in absolute control of your inner world.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="right" className="rounded-3xl overflow-hidden aspect-[4/3] order-1 md:order-2 shadow-2xl shadow-cyan-900/10 border border-white/10">
            <LazyVideo
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              poster="/images/tech-philosophy-poster.webp"
              className="w-full h-full object-cover bg-black"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
