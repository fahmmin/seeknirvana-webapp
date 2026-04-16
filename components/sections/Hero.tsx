"use client";

import { motion } from "framer-motion";
import { ChevronDown, MoonStar, Sparkles } from "lucide-react";
import FloatingElement from "../animations/FloatingElement";
import GlowEffect from "../animations/GlowEffect";

const proofPoints = [
  {
    label: "प्रबोध",
    text: "Track REM and readiness",
  },
  {
    label: "संकेत",
    text: "Recognize dreams with subtle cues",
  },
  {
    label: "साधना",
    text: "Follow a guided 5-day program",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden aurora-bg mandala-pattern pt-20"
    >
      {/* Background Glow Effects */}
      <GlowEffect
        color="rgba(0, 212, 255, 0.15)"
        size={600}
        className="top-0 left-1/4"
      />
      <GlowEffect
        color="rgba(124, 58, 237, 0.15)"
        size={500}
        className="bottom-0 right-1/4"
      />
      <GlowEffect
        color="rgba(0, 168, 107, 0.1)"
        size={400}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-nirvana-cyan/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <MoonStar className="w-4 h-4 text-nirvana-gold" />
          <span className="text-sm text-nirvana-gold-light tracking-wide">
            REM-aware lucid dreaming, guided by data
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="block text-white mb-2">Become Aware</span>
          <span className="gradient-text">Inside Your Dreams</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-4xl text-lg sm:text-2xl text-white/78 mb-6 leading-relaxed"
        >
          SeekNirvana helps you sleep better, remember more dreams, and build
          lucid dreaming foundations with a smart ring, subtle REM cues, and a
          guided program.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto max-w-3xl text-base sm:text-lg text-white/58 mb-10 leading-relaxed"
        >
          A calmer, clearer way to work with sleep, dreams, and nighttime awareness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-10 grid max-w-4xl gap-3 text-left sm:grid-cols-3"
        >
          {proofPoints.map((point) => (
            <div
              key={point.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center gap-2 text-nirvana-cyan">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs text-white/45">
                  {point.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/72">{point.text}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 flex-wrap"
        >
          <a
            href="/login"
            className="group relative px-8 py-4 bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark rounded-full font-medium text-white overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">Join Program</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-nirvana-cyan to-nirvana-jade"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </a>
          <a
            href="/preorder"
            className="px-8 py-4 rounded-full font-medium text-white/90 border border-nirvana-gold/35 bg-nirvana-gold/10 hover:border-nirvana-gold/55 hover:bg-nirvana-gold/15 transition-all"
          >
            Pre-order $99
          </a>
          <a
            href="#problem"
            className="px-8 py-4 rounded-full font-medium text-white/80 border border-white/20 hover:border-nirvana-cyan/50 hover:text-nirvana-cyan transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16 text-sm uppercase tracking-[0.3em] text-white/35"
        >
          Ring + app + dream cues + guided cohort
        </motion.p>

        {/* Product Visual */}
        <FloatingElement delay={0} duration={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80"
          >
            {/* Ring Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nirvana-cyan/20 via-nirvana-jade/10 to-nirvana-purple/20 blur-3xl" />

            {/* Ring Representation */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="relative w-40 h-40 sm:w-48 sm:h-48"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-nirvana-cyan/30" />
                <div className="absolute inset-2 rounded-full border border-nirvana-jade/20" />
                <div className="absolute inset-4 rounded-full border border-nirvana-gold/20" />

                {/* Center Logo */}
                <motion.div 
                  className="absolute inset-8 rounded-full overflow-hidden bg-nirvana-dark"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img
                    src="/images/SeekNirvana_Logo.png"
                    alt="Seek Nirvana"
                    className="w-full h-full object-cover scale-125"
                  />
                </motion.div>

                {/* Orbiting Dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-nirvana-cyan"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: -6,
                      marginLeft: -6,
                    }}
                    animate={{
                      rotate: [i * 120, i * 120 + 360],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      style={{
                        transform: `translateX(${80 + i * 10}px)`,
                      }}
                      className={`w-2 h-2 rounded-full ${
                        i === 0
                          ? "bg-nirvana-cyan"
                          : i === 1
                            ? "bg-nirvana-jade"
                            : "bg-nirvana-gold"
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </FloatingElement>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/40"
          >
            <span className="text-xs tracking-widest mb-2">SCROLL</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
