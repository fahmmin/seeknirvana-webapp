'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FeaturedVideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-transparent pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden aspect-video relative group"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/tech-featured-poster.webp"
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <span className="text-white/50 text-xs tracking-[0.3em] uppercase block mb-3">
                Feedback Loop
              </span>
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 tracking-tight">
                A Living, Breathing Feedback Loop
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Your body is not static. Neither is our intelligence. Our system continuously processes real-time biosignals to detect patterns in sleep, recovery, and stress. Seek Nirvana creates a closed-loop system between your physiology and AI—so every night becomes a feedback cycle for deeper clarity.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium whitespace-nowrap self-start md:self-auto"
            >
              Explore the Loop
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
