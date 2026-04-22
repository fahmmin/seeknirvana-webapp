"use client";

import { motion } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import { Smartphone, Activity, Moon } from "lucide-react";

const galleryItems = [
  {
    src: "/images/products/unvieling-nirvana-ring.png",
    alt: "Nirvana Ring",
    title: "The Ring",
    description: "Pure Ceramic construction. Lightweight, durable, and designed for 24/7 wear.",
    icon: Activity,
  },
  {
    src: "/images/app/ios_app.png",
    alt: "Nirvana App",
    title: "Your Wellness Dashboard",
    description: "Track sleep stages, heart rate, SpO2, and lucid dreaming progress in real-time.",
    icon: Smartphone,
  },
  {
    src: "/images/products/lucid-dream1.png",
    alt: "Sleep Insights",
    title: "Sleep Intelligence",
    description: "AI-powered sleep analysis with personalized recommendations for better rest.",
    icon: Moon,
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest uppercase mb-4 block">
            The Experience
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Hardware Meets </span>
            <span className="gradient-text">Software</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            The Nirvana Ring works seamlessly with our companion app to deliver 
            insights that transform your sleep and wellness journey.
          </p>
        </FadeIn>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <FadeIn key={item.src} delay={index * 0.15}>
              <motion.div
                className="group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card mb-5">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-navy-950/80 backdrop-blur-sm flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
