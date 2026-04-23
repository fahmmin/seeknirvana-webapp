"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Sparkles, User } from "lucide-react";
import { FadeIn } from "../components/FadeIn";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setIsError(false);

    try {
      const res = await fetch("/api/email/signup-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) {
        setIsError(true);
        return;
      }
      setIsSubscribed(true);
      setEmail("");
      setName("");
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="subscribe" className="relative py-24 overflow-hidden">
      {/* Background with cosmic vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-jade/5 to-navy-950" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/20 to-transparent" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-jade/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 bg-white/5 backdrop-blur-xl">
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
                <span className="text-white">Subscribe to </span>
                <span className="gradient-text">Us</span>
              </h3>

              {/* Description */}
              <p className="text-white/60 max-w-2xl mx-auto mb-10 text-base leading-relaxed sm:text-lg">
                Join our circle for launch updates, sleep wisdom, and early access to the SeekNirvana universe. Calm signals only.
              </p>

              {/* Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-white/30" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-11 pr-5 py-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/40 focus:outline-none focus:border-jade/50 focus:ring-1 focus:ring-jade/50 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-white/30" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                        className="w-full pl-11 pr-5 py-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/40 focus:outline-none focus:border-jade/50 focus:ring-1 focus:ring-jade/50 transition-all"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 rounded-xl bg-jade text-navy-950 font-semibold flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-jade/20"
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
                          <span>Subscribe Now</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {isError && (
                    <p className="text-red-400 text-sm mt-3">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p className="text-white/30 text-xs mt-4">
                    Your privacy is sacred. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-4"
                >
                  <div className="w-20 h-20 rounded-full bg-jade/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-jade" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">You are subscribed to us</h4>
                    <p className="text-white/50 text-base max-w-sm mx-auto">
                      Welcome to the circle. Check your inbox for a confirmation message soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/5">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gold">10K+</p>
                  <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">Dreamers</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gold">Free</p>
                  <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">To Join</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gold">No Spam</p>
                  <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
