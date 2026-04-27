'use client'

import { motion } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
import LazyVideo from '../animations/LazyVideo'

export default function FeaturedVideoSection() {
  return (
    <section className="bg-transparent pt-4 md:pt-6 pb-12 md:pb-16 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up" duration={1}>
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-video relative group border border-white/10">
            <LazyVideo
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              poster="/images/tech-featured-poster.webp"
              className="w-full h-full object-cover bg-black"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="glass-card rounded-3xl p-4 md:p-8 max-w-md">
                <span className="text-white/50 text-xs tracking-[0.3em] uppercase block mb-3">
                  Feedback Loop
                </span>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 tracking-tight">
                  Biosignal Awareness
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Your body is not static. Neither is our intelligence. Our system continuously processes real-time biosignals to detect patterns in sleep, recovery, and stress. Seek Nirvana creates a closed-loop system between your physiology and AI—so every night becomes a feedback cycle for deeper clarity.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
