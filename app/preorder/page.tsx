"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Shield,
  Truck,
  RefreshCw,
  Package,
  Clock,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";

const includedItems = [
  "Nirvana Ring (Ceramic)",
  "USB-C Charging Cable",
  "Premium Carrying Case",
  "Meditation Audio Pack",
  "Quick Start Guide",
  "1-Year Warranty",
];

const productImages = [
  {
    id: "ring",
    src: "/images/products/unveiling-nirvana-ring.png",
    alt: "Nirvana Ring",
  },
  {
    id: "desc",
    src: "/images/products/product-desc1.png",
    alt: "Product Details",
  },
];

const colors = [
  {
    id: "silver",
    name: "Ceramic White",
    bg: "bg-gradient-to-br from-gray-300 to-gray-500",
  },
  {
    id: "gold",
    name: "Vedic Gold",
    bg: "bg-gradient-to-br from-gold to-amber-600",
  },
  {
    id: "black",
    name: "Obsidian Black",
    bg: "bg-gradient-to-br from-gray-700 to-black",
  },
];

const sizes = [7, 8, 9, 10, 11, 12];

export default function PreorderPage() {
  const [selectedColor, setSelectedColor] = useState("silver");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentImage = productImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handlePreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          address,
          color: colors.find((c) => c.id === selectedColor)?.name || selectedColor,
          size: selectedSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-950" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold-light tracking-wide">
                Limited Pre-Order
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Pre-Order </span>
              <span className="gradient-text">Nirvana Ring</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Be among the first to experience the future of wellness. Ships Q2
              2026.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Product Image Carousel */}
            <FadeIn delay={0.2}>
              {/* Product Image with Carousel */}
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card mb-6">
                {/* Background Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-cyan/20 via-jade/10 to-gold/10" />
                </div>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={currentImage.src}
                    alt={currentImage.alt}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Carousel Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Carousel Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Color Badge */}
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full z-10">
                  <span className="text-white/80 text-sm">
                    {colors.find((c) => c.id === selectedColor)?.name}
                  </span>
                </div>
              </div>

              {/* What's Included */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {includedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <Check className="w-4 h-4 text-jade flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: "Privacy First" },
                  { icon: Truck, text: "Free Shipping" },
                  { icon: RefreshCw, text: "Active Rewards" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-lg p-3 text-center"
                  >
                    <badge.icon className="w-5 h-5 text-cyan mx-auto mb-1" />
                    <span className="text-white/70 text-xs">{badge.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right - Order Form */}
            <FadeIn delay={0.3}>
              <div className="glass-card rounded-2xl p-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-jade/20 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-jade" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-white/70 mb-2">
                      Your pre-order is confirmed.
                    </p>
                    <p className="text-cyan">{email}</p>
                    <p className="text-white/50 text-sm mt-4">Ships Q2 2026</p>
                  </div>
                ) : (
                  <form onSubmit={handlePreorder}>
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-white mb-2">Reserve Your Ring</h3>
                      <p className="text-white/50 text-sm">Fill in your details to secure your early access spot.</p>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-3 block">
                        Color
                      </label>
                      <div className="flex gap-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => setSelectedColor(color.id)}
                            className={`w-12 h-12 rounded-lg ${color.bg} transition-all ${
                              selectedColor === color.id
                                ? "ring-2 ring-cyan ring-offset-2 ring-offset-navy-950"
                                : "opacity-70 hover:opacity-100"
                            }`}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-3 block">
                        Ring Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`w-11 h-11 rounded-lg font-medium text-sm transition-all ${
                              selectedSize === size
                                ? "border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] text-white"
                                : "glass-card text-white/70 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-white/40 mt-2">
                        Free sizing kit here
                      </p>
                    </div>

                    {/* Name */}
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-2 block">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-cyan/50"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-2 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-cyan/50"
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-6">
                      <label className="text-white/70 text-sm mb-2 block">
                        Shipping Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-white/30" />
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Street, City, State, ZIP, Country"
                          rows={3}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-cyan/50 resize-none"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm mb-4 text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                        {error}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="py-4 border-t border-white/[0.1] mb-6">
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !selectedSize}
                      className="w-full py-4 rounded-xl border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <>
                          <Package className="w-5 h-5" />
                          Reserve My Pre-Order
                        </>
                      )}
                    </motion.button>

                    {!selectedSize && (
                      <p className="text-center text-gold/70 text-sm mt-3">
                        Select a ring size to continue
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Ships Q2 2026 • Secure checkout</span>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
