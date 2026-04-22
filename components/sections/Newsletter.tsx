'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react'
import FadeIn from '../animations/FadeIn'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setIsError(false)

    try {
      const res = await fetch('/api/email/signup-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        setIsError(true)
        return
      }
      setIsSubscribed(true)
      setEmail('')
    } catch {
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-jade/5 to-navy-950" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/30 to-transparent" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-jade/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-jade/10">
            <div className="text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-jade/20 to-cyan/20 mb-6"
              >
                <Mail className="w-8 h-8 text-jade" />
              </motion.div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                <span className="text-white">Join the </span>
                <span className="gradient-text">Launch Circle</span>
              </h3>

              {/* Description */}
              <p className="text-white/60 max-w-2xl mx-auto mb-8 text-base leading-relaxed sm:text-lg">
                Get launch updates, lucid dreaming practice notes, and early
                access announcements for the SeekNirvana ring and 5-day guided
                program. Calm signal only.
              </p>

              {/* Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/40 focus:outline-none focus:border-jade/50 focus:ring-1 focus:ring-jade/50 transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 rounded-xl border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-jade/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:min-w-[180px]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {isError && (
                    <p className="text-red-400 text-xs mt-3">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p className="text-white/30 text-xs mt-4">
                    We respect your privacy. Unsubscribe any time.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-jade/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-jade" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium text-lg">Your intention is set</p>
                    <p className="text-white/50 text-sm">Check your email to confirm your spot in the launch circle</p>
                  </div>
                </motion.div>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold">10K+</p>
                  <p className="text-white/40 text-xs">Interested visitors</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold">Early</p>
                  <p className="text-white/40 text-xs">Launch updates</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold">100%</p>
                  <p className="text-white/40 text-xs">Free to join</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
