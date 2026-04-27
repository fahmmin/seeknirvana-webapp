'use client'

import { motion } from 'framer-motion'
import FadeIn from '../animations/FadeIn'
import { ArrowUpRight } from 'lucide-react'
import LazyVideo from '../animations/LazyVideo'

const services = [
  {
    tag: "Beyond Sleep",
    title: "Dream Layer",
    description: "Sleep is access. Seek Nirvana integrates dream journaling, REM pattern recognition, and AI-guided intention setting to create a bridge between waking awareness and deeper cognitive layers.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    poster: "/images/tech-dream-poster.webp"
  },
  {
    tag: "Precision",
    title: "Biohacking Layer",
    description: "No noise. No trends. Just signal. By combining real-time biometrics with adaptive AI models, you gain absolute clarity on what actually works for your unique physiology.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    poster: "/images/tech-biohack-poster.webp"
  }
]

export default function ServicesSection() {
  return (
    <section className="bg-transparent py-16 md:py-24 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn className="flex items-end justify-between mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            How we <span className="gradient-text">guide</span>
          </h2>
          <span className="text-gold text-sm hidden md:block uppercase tracking-widest">
            Specialized Layers
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <FadeIn
              key={i}
              delay={0.2 * (i + 1)}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                  <LazyVideo
                    src={service.video}
                    poster={service.poster}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-black"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="uppercase tracking-[0.3em] text-white/40 text-[10px] md:text-xs">
                    {service.tag}
                  </span>
                  <div className="glass-card rounded-full p-2 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
