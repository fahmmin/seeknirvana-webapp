"use client";

import { motion } from "framer-motion";
import { Clock, Heart, Brain, Sparkles, Leaf, Infinity } from "lucide-react";
import FadeIn from "../animations/FadeIn";

const benefits = [
  {
    icon: Clock,
    title: "Enhanced Longevity",
    sanskrit: "दीर्घायु",
    stat: "+23%",
    statLabel: "Sleep Quality",
    description:
      "Optimized restorative sleep patterns support cellular repair, immune function, and healthy aging.",
  },
  {
    icon: Heart,
    title: "Stress Reduction",
    sanskrit: "शांति",
    stat: "-40%",
    statLabel: "Cortisol Levels",
    description:
      "HRV coherence training decouples you from the cortisol spikes social media deliberately triggers. Less reactivity. More response.",
  },
  {
    icon: Brain,
    title: "Cognitive Clarity",
    sanskrit: "प्रज्ञा",
    stat: "+35%",
    statLabel: "Mental Focus",
    description:
      "Better sleep architecture enhances memory consolidation, creativity, and daytime alertness.",
  },
  {
    icon: Sparkles,
    title: "Dream Creativity",
    sanskrit: "कल्पना",
    stat: "∞",
    statLabel: "Possibilities",
    description:
      "Access the infinite canvas of your subconscious. Solve problems, practice skills, explore worlds.",
  },
  {
    icon: Leaf,
    title: "Mindful Living",
    sanskrit: "स्मृति",
    stat: "24/7",
    statLabel: "Awareness",
    description:
      "Intention doesn't end at sunrise. Biofeedback through the day helps you notice when you're running on autopilot — and choose otherwise.",
  },
  {
    icon: Infinity,
    title: "Holistic Balance",
    sanskrit: "समता",
    stat: "100%",
    statLabel: "Harmony",
    description:
      "Nirvana Ring helps you re-integrate — bringing biological coherence between heart, mind, and lived intention.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-nirvana-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <span className="text-nirvana-gold text-sm tracking-widest uppercase mb-4 block">
            Life Beyond the Attention Economy
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Benefits of </span>
            <span className="gradient-text-gold">Intention</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            When you reclaim your attention and live from intention, the downstream effects are measurable — in body, mind, and the quality of your choices.
          </p>
        </FadeIn>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative p-8 rounded-2xl glass-card overflow-hidden h-full"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-nirvana-gold/5 to-nirvana-jade/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative">
                  {/* Icon & Stat Row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-nirvana-gold/10 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-nirvana-gold" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold gradient-text-gold">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-nirvana-gold/60 text-sm mb-3 font-light tracking-wider">
                    {benefit.sanskrit}
                  </p>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-nirvana-gold/5 to-transparent rounded-tl-full" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
