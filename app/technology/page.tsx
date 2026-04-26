'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Instagram,
  Twitter,
  ArrowUpRight,
  Smartphone,
  Github,
  Youtube,
  Send,
  Mail
} from 'lucide-react'
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import Link from 'next/link'
import AboutSection from '@/components/technology/AboutSection'
import AppScreenshotCarousel from "@/components/technology/AppScreenshotCarousel";
import FeaturedVideoSection from '@/components/technology/FeaturedVideoSection'
import PhilosophySection from '@/components/technology/PhilosophySection'
import ServicesSection from '@/components/technology/ServicesSection'
import GlowEffect from '@/components/animations/GlowEffect'

export default function TechnologyPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Simplified video logic - remove opacity fade that causes blank screen
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(e => console.log("Auto-play blocked", e))

    const handleEnded = () => {
      video.currentTime = 0
      video.play()
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [])

  return (
    <div className="aurora-bg mandala-pattern min-h-screen text-white selection:bg-white/20 relative overflow-x-hidden">
      {/* Global Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GlowEffect
          color="rgba(0, 168, 107, 0.12)"
          size={800}
          className="top-[-10%] left-[-10%] opacity-40"
        />
        <GlowEffect
          color="rgba(201, 162, 39, 0.08)"
          size={600}
          className="top-[20%] right-[-5%] opacity-30"
        />
        <GlowEffect
          color="rgba(0, 212, 255, 0.1)"
          size={700}
          className="bottom-[10%] left-[5%] opacity-30"
        />
        <GlowEffect
          color="rgba(0, 168, 107, 0.15)"
          size={900}
          className="bottom-[-10%] right-[-10%] opacity-40"
        />
      </div>

      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          preload="auto"
          poster="/images/tech-hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" type="video/mp4" />
        </video>

        {/* Hero Content - Adjusted for Right Alignment of Video focus */}
        <div className="relative z-10 flex-1 flex flex-col items-center lg:items-start justify-center px-6 text-center lg:text-left pt-20 pb-24 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >

            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight font-['Instrument_Serif'] max-w-5xl leading-[0.95] pt-6">
              Technology that understands your <em className="italic gradient-text pr-2">inner</em> world.
            </h1>

            <p className="text-white text-lg md:text-xl leading-relaxed max-w-2xl lg:max-w-xl mx-auto lg:ml-0 font-light">
              Seek Nirvana combines real-time biometrics, privacy-first AI, and adaptive intelligence to help you understand, optimize, and evolve your state of being.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-6">
              <Link href="/preorder" className="liquid-glass rounded-full px-10 py-4 text-white text-sm font-medium hover:bg-white/5 transition-all border-white/5">
                Get Early Access
              </Link>
              <Link href="/programs/5-day-sleep-cohort" className="text-white/60 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                View Programs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Social Icons Footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[
            { Icon: Twitter, href: "https://x.com/SeekNirvanaHQ" },
            { Icon: Github, href: "https://github.com/seekNirvana" },
            { Icon: Youtube, href: "https://www.youtube.com/@SeekNirvanaOfficial" },
            { Icon: Send, href: "https://t.me/SeekNirvanaHQ" },
            { Icon: Mail, href: "mailto:info@seeknirvana.com" },
            { Icon: Instagram, href: "#" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + (i * 0.1) }}
              className="liquid-glass rounded-full p-4 text-white/60 hover:text-white hover:bg-white/5 hover:-translate-y-1 transition-all border-white/5 flex items-center justify-center"
            >
              <social.Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── SECTIONS 2-5 ── */}
      <AboutSection />
      <FeaturedVideoSection />

      {/* ── SECTION 3.5: MOBILE ECOSYSTEM ── */}
      <section className="bg-transparent py-28 md:py-40 px-6 overflow-hidden relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase block">
                Mobile Ecosystem
              </span>
              <h2 className="text-4xl md:text-6xl text-white font-['Instrument_Serif'] tracking-tight">
                Your world, <em className="italic text-white/60">visualized.</em>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                The app is where raw ring data becomes practice. It lets users review epochs, receive yoga and breathwork timing, journal their inner state, and get private Soul and Body layer guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Epoch-based readiness and body state view",
                "Guided yoga flows timed to your ring data",
                "Pranayama breathwork with live breath pacing",
                "Reflective journaling with soul layer responses",
                "Spiritual and philosophical inquiry mode",
                "Private insight history — on-device, always"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70 bg-white/[0.03] rounded-2xl px-5 py-4 border border-white/5">
                  <Smartphone className="h-4 w-4 text-white/40" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 opacity-40">
              {[
                { name: "App Store", icon: "" },
                { name: "Google Play", icon: "▶" },
                { name: "Solana dApp Store", icon: "◎" }
              ].map((badge) => (
                <div key={badge.name} className="liquid-glass rounded-xl px-4 py-2 flex items-center gap-2 border-white/10">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-[10px] uppercase tracking-widest">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="liquid-glass rounded-[40px] p-4 border-white/10">
              <AppScreenshotCarousel />
            </div>
          </div>
        </div>
      </section>

      <PhilosophySection />
      <ServicesSection />

      {/* ── FINAL FOOTER ── */}
      <Footer />
    </div>
  )
}
