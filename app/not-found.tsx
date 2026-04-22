"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-950" />

        {/* Cosmic particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <motion.div
              className="text-[8rem] sm:text-[12rem] font-bold leading-none tracking-tighter"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-cyan via-gold to-jade bg-clip-text text-transparent">
                404
              </span>
            </motion.div>

            {/* Symbol */}
            <motion.div
              className="devanagari-text mb-6 text-7xl leading-none sm:text-8xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ॐ
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl sm:text-3xl font-semibold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Path Not Found
            </motion.h1>

            {/* Sanskrit Quote */}
            <motion.p
              className="text-lg text-gold/80 mb-2 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              "Asato ma sad gamaya"<br />
              <span className="text-sm text-white/50">
                Lead me from the unreal to the real
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-white/60 mb-8 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Like a dream that fades upon waking, this page exists only in the realm of illusion.
              Let us guide you back to clarity.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] text-white font-medium hover:shadow-lg hover:shadow-jade/20 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Return to Nirvana
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      <Footer />
    </main>
  );
}
