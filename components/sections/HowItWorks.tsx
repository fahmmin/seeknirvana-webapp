'use client'

import { motion } from 'framer-motion'
import { BellRing, Brain, MoonStar } from 'lucide-react'
import FadeIn from '../animations/FadeIn'

const steps = [
  {
    icon: MoonStar,
    number: '01',
    title: 'Detect REM Sleep',
    description: 'The ring tracks sleep signals across the night and identifies when you are most likely to be in a dream state that can support lucid awareness.',
    details: ['Sleep and HRV signals tracked', 'Likely REM windows identified', 'Best timing selected'],
  },
  {
    icon: BellRing,
    number: '02',
    title: 'Deliver Subtle Dream Cues',
    description: 'At the right moment, SeekNirvana sends a gentle cue designed to enter the dream without fully waking you up.',
    details: ['Cue timing is personalized', 'Subtle enough to preserve sleep', 'Designed to appear inside the dream'],
  },
  {
    icon: Brain,
    number: '03',
    title: 'Recognize the Dream',
    description: 'You notice the cue, realize you are dreaming, and begin training awareness from inside the experience instead of only remembering it later.',
    details: ['Awareness switches on', 'Lucid moments become trainable', 'Reflection improves across nights'],
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jade/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <span className="text-jade-light text-sm tracking-widest uppercase mb-4 block">
            Simple Operating Model
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">How </span>
            <span className="gradient-text">Nirvana</span>
            <span className="text-white"> Works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            A clear three-step system: detect the right dream window, place a
            cue into the dream, and help you recognize what is happening while
            it is still unfolding.
          </p>
        </FadeIn>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.2} className="h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-full"
                >
                  {/* Card */}
                  <div className="relative p-8 rounded-2xl glass-card h-full">
                    {/* Number Badge */}
                    <div className="absolute -top-4 left-8 px-4 py-1 rounded-full border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12]">
                      <span className="text-white font-mono text-sm">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-6 mt-2">
                      <step.icon className="w-8 h-8 text-jade-light" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-6">{step.description}</p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-jade/60" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Decorative */}
                    <div className="absolute bottom-4 right-4 opacity-20">
                      <div className="text-6xl font-bold text-white/10">{step.number}</div>
                    </div>
                  </div>

                  {/* Connector Dot */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-jade/50 transform -translate-y-1/2" />
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <FadeIn delay={0.6} className="mt-24 flex flex-col items-center">
          <p className="text-white/40 text-sm tracking-widest uppercase">Detect. Cue. Recognize.</p>
        </FadeIn>
      </div>
    </section>
  )
}
