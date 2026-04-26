'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-transparent py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
        >
          Intelligence <span className="font-['Instrument_Serif'] italic text-white/40">with </span> Privacy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            <div className="space-y-6">
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase block">
                AI Layer
              </span>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Meet the Soul and Body layers—powered by custom-trained Gemma 4 models. They interpret your data, adapt to your patterns, and help you navigate internal states with precision. Seek Nirvana is evolving into an open intelligence layer where your consciousness isn't one-dimensional, and your AI shouldn't be either.
              </p>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="space-y-6">
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase block">
                Infrastructure of Trust
              </span>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Privacy is the foundation, not a feature. Our architecture is designed with on-device processing, end-to-end encrypted flows, and user-controlled data permissions. We don't just protect your data; we ensure you remain in absolute control of your inner world.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
