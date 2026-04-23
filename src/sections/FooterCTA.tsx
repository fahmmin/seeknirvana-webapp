"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Sparkles, Truck, Mail, Send, CheckCircle, User, Phone, Instagram } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { pricingFeatures } from "../content/homepage";

export const FooterCTA = () => {
  // Newsletter State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setIsError(false);
    try {
      const res = await fetch("/api/email/signup-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone, instagram, telegram }),
      });
      if (!res.ok) {
        setIsError(true);
        return;
      }
      setIsSubscribed(true);
      setName("");
      setPhone("");
      setInstagram("");
      setTelegram("");
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta-newsletter" className="relative overflow-hidden bg-navy-950 px-4 py-16 sm:px-6 md:py-24">
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-jade/[0.08] via-cyan/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          
          {/* Left: Pre-order / Pricing */}
          <FadeIn className="h-full">
            <div className="h-full flex flex-col rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-md transition-all hover:border-white/20 sm:p-10">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">Ready To Go Deeper</span>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Pre-order the ring</h2>
                <p className="mt-4 text-sm text-white/55 leading-relaxed">
                  The program above explains the method. This is for the product itself: what the ring includes and the launch pricing for early supporters.
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white sm:text-5xl">$99</span>
                  <span className="text-lg text-white/25 line-through">$199</span>
                  <span className="text-xs font-medium tracking-wide text-jade uppercase bg-jade/10 px-3 py-1 rounded-full ml-auto">Launch Offer</span>
                </div>
                <p className="mt-3 text-xs text-white/50 uppercase tracking-widest">One-time payment • No subscription</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="/preorder" className="flex-1 rounded-xl bg-jade px-6 py-3.5 text-center text-sm font-bold text-navy-950 transition-all hover:brightness-110 glow-jade">Pre-Order Now</a>
                  <a href="/programs/5-day-sleep-cohort" className="flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/[0.1]">Learn More</a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-4">
                  {pricingFeatures.slice(0, 4).map((feature) => (
                    <div key={feature.title} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-jade flex-shrink-0" />
                      <span className="text-[11px] text-white/60 truncate">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Newsletter */}
          <FadeIn delay={0.2} className="h-full">
            <div className="h-full flex flex-col rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-md transition-all hover:border-white/20 sm:p-10">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-cyan font-semibold">Join the Circle</span>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Subscribe to us</h2>
                <p className="mt-4 text-sm text-white/55 leading-relaxed">
                  Join our circle for launch updates, sleep wisdom, and early access. Calm signals only, delivered directly to you.
                </p>
              </div>

              <div className="mt-auto">
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-jade/40 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-jade/40 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone (Optional)"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-jade/40 transition-all"
                        />
                      </div>
                      <div className="relative flex gap-2">
                        <div className="relative flex-1">
                          <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                          <input
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="Instagram"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-jade/40 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <Send className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                      <input
                        type="text"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        placeholder="Telegram ID"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-jade/40 transition-all"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full mt-2 rounded-xl bg-white/10 border border-white/20 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Keep me updated"}
                      {!isSubmitting && <Send className="h-3.5 w-3.5" />}
                    </motion.button>
                  </form>
                ) : (
                  <div className="py-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-jade/20 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-jade" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Welcome to the circle</h4>
                    <p className="text-sm text-white/50">Check your inbox for a confirmation message soon.</p>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/30">
                  <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Secure</span>
                  <span className="flex items-center gap-1.5"><Truck className="h-3 w-3" /> Free Shipping</span>
                  <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> No Spam</span>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
