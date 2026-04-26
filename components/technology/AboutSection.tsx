'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-transparent pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-[0.3em] uppercase block mb-8"
        >
          About the Technology
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight max-w-5xl"
        >
          <span className="font-['Instrument_Serif'] italic text-white/60">From data then awareness</span> for <br className="hidden md:block" />
          <span className="font-['Instrument_Serif'] italic text-white/60">minds that then create, build, and inspire.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <p className="text-xl text-white/70 leading-relaxed font-light">
            Most platforms track your body. We help you interpret it. Seek Nirvana transforms raw physiological signals—sleep cycles, HRV, respiration, and neural patterns—into actionable awareness through adaptive AI systems.
          </p>
          <p className="text-xl text-white/40 leading-relaxed font-['Instrument_Serif'] italic">
            Beyond waking life, your inner states hold untapped intelligence. Our systems are designed to gently guide you there. This isn’t just optimization. It’s a new interface between consciousness and computation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
