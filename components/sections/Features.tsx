'use client'

import { motion } from 'framer-motion'
import { Brain, Moon, Heart, Sparkles, Zap, Shield } from 'lucide-react'
import FadeIn from '../animations/FadeIn'

const features = [
  {
    icon: Moon,
    title: 'Lucid Dreaming',
    sanskrit: 'स्वप्न जाग्रत',
    description: 'Advanced REM detection triggers subtle cues—flashing lights, sacred sounds, gentle vibrations—to awaken consciousness within your dreams.',
    color: 'from-nirvana-purple to-cyan',
  },
  {
    icon: Heart,
    title: 'Vitality Tracking',
    sanskrit: 'प्राण मापन',
    description: 'HRV is your body\'s report card on coherence. Real-time tracking reveals whether you\'re living from intention or reacting to the world\'s demands.',
    color: 'from-jade to-cyan',
  },
  {
    icon: Brain,
    title: 'Mindful AI',
    sanskrit: 'बुद्धिमत्ता',
    description: 'Your HRV patterns reveal when noise has captured your mind. Nirvana AI surfaces those moments — so you can choose stillness over scroll.',
    color: 'from-cyan to-jade',
  },
  {
    icon: Sparkles,
    title: 'Sleep Alchemy',
    sanskrit: 'निद्रा रसायन',
    description: 'Restorative sleep is where intention is forged. Optimise your cycles and wake as the author of your day — not a product of your feed.',
    color: 'from-gold to-nirvana-amber',
  },
  {
    icon: Zap,
    title: 'Energy Flow',
    sanskrit: 'शक्ति प्रवाह',
    description: 'Understand your circadian rhythms and energy patterns. Align your activities with your body\'s natural wisdom.',
    color: 'from-nirvana-amber to-gold',
  },
  {
    icon: Shield,
    title: 'Sacred Privacy',
    sanskrit: 'गोपनीयता',
    description: 'Your biometric data is encrypted and yours alone. No subscriptions, no data selling—just pure, private wellness.',
    color: 'from-jade-dark to-jade',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 mandala-pattern opacity-50" />
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-nirvana-purple/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <span className="text-gold text-sm tracking-widest uppercase mb-4 block">
            Tools for the Intention Economy
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Intention </span>
            <span className="gradient-text">Technology</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            In an era of engineered distraction, every feature is a counterweight — steering you from reactive attention toward deliberate intention.
          </p>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                <div className="relative h-full p-8 rounded-2xl glass-card glow-border overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-xl bg-navy-950 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-gold/60 text-sm mb-3 font-light tracking-wider">{feature.sanskrit}</p>
                  <p className="text-white/60 leading-relaxed text-sm">{feature.description}</p>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/[0.1] rounded-tr-lg" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.6} className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="/preorder"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan to-cyan/80 text-white font-medium hover:shadow-lg hover:shadow-cyan/20 transition-shadow"
          >
            Pre-Order Now — $99
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.06] text-white/90 font-medium hover:border-cyan/35 hover:bg-white/10 transition-colors"
          >
            Join Program — member hub
          </motion.a>
        </FadeIn>
      </div>
    </section>
  )
}
