'use client'

import { motion } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
import GlowEffect from '../animations/GlowEffect'

export default function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <GlowEffect
        color="rgba(0, 212, 255, 0.05)"
        size={600}
        className="top-0 left-0"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="mb-8">
          <span className="text-gold text-sm tracking-[0.3em] uppercase block">
            About the Technology
          </span>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight max-w-5xl">
            From data to <span className="gradient-text">awareness</span> for <br className="hidden md:block" />
            minds that <span className="text-gold">create, build, and inspire.</span>
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={0.4}>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Most platforms track your body. We help you interpret it. Seek Nirvana transforms raw physiological signals—sleep cycles, HRV, respiration, and neural patterns—into actionable awareness through adaptive AI systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-xl text-white/50 leading-relaxed italic">
              Beyond waking life, your inner states hold untapped intelligence. Our systems are designed to gently guide you there. This isn’t just optimization. It’s a new interface between consciousness and computation.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
