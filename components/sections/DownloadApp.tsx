"use client";

import { motion } from "framer-motion";
import { Smartphone, Brain, Heart, Sparkles } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const appFeatures = [
  {
    icon: Brain,
    title: "Sleep Intelligence",
    description: "AI-powered insights into your sleep cycles, REM phases, and recovery patterns.",
  },
  {
    icon: Heart,
    title: "Mindful Moments",
    description: "Guided breathing exercises and meditation timers synced with your biometric data.",
  },
  {
    icon: Sparkles,
    title: "Dream Journal",
    description: "Record and analyze your dreams. Track lucid dreaming progress over time.",
  },
];

const platforms = [
  { name: "App Store", sub: "iOS", icon: "" },
  { name: "Google Play", sub: "Android", icon: "▶" },
  { name: "Solana dApp Store", sub: "Web3", icon: "◎" },
];

export default function DownloadApp() {
  return (
    <section id="app" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-cyan/5 to-navy-950" />
      <div className="absolute inset-0 mandala-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - App Preview */}
          <FadeIn>
            <div className="relative flex justify-center">
              {/* Phone Frame with App Screenshot */}
              <div className="relative w-72 sm:w-80 rounded-[2.5rem] bg-navy-950 border-4 border-white/[0.1] p-3 shadow-2xl shadow-cyan/10">
                {/* Front Camera */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-navy-950 rounded-full flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-navy-950 ring-2 ring-white/20">
                    <div className="w-full h-full rounded-full bg-cyan/30" />
                  </div>
                </div>
                <div className="w-full rounded-[2rem] overflow-hidden">
                  <img
                    src="/images/app/app_home.jpeg"
                    alt="Nirvana App"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -right-4 sm:right-8 top-20 glass-card px-4 py-2 rounded-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-jade" />
                  <span className="text-white text-sm">REM Detected</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-4 sm:left-8 bottom-20 glass-card px-4 py-2 rounded-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-cyan" />
                  <span className="text-white text-sm">HRV Optimized</span>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right - Content */}
          <FadeIn delay={0.2}>
            <div>
              <span className="text-cyan text-sm tracking-widest uppercase mb-4 block">
                Your Wellness Companion
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-white">Download the </span>
                <span className="gradient-text">Nirvana App</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Transform raw data into wisdom. The Nirvana App translates your 
                body&apos;s signals into actionable insights for better sleep, 
                deeper mindfulness, and conscious living.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-10">
                {appFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                      <p className="text-white/50 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Buttons — Coming Soon */}
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-gold/20 text-gold text-xs tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block" />
                  Coming Soon
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl glass-card opacity-50 cursor-not-allowed select-none"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <div className="text-left">
                      <div className="text-white/40 text-xs">Download on</div>
                      <div className="text-white text-sm font-medium">{platform.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-white/30 text-xs">
                Free download. Premium features unlock with Nirvana Ring.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
