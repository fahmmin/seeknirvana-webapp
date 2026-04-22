'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  {
    text: "Watch your thoughts, they become your words; watch your words, they become your actions; watch your actions, they become your habits; watch your habits, they become your character; watch your character, it becomes your destiny.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
  },
  {
    text: "Recognize the nature of your mind in the dream, and you will recognize the nature of your mind in death.",
    author: "Milarepa",
    source: "Tibetan Dream Yoga",
  },
  {
    text: "We are what our thoughts have made us; so take care about what you think. Words are secondary. Thoughts live; they travel far.",
    author: "Swami Vivekananda",
    source: "Upanishads Interpretation",
  },
  {
    text: "Let go or be dragged. In sleep, the body rests; in dreams, the soul awakens.",
    author: "Zen Proverb",
    source: "",
  },
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor—even in dreams.",
    author: "Thich Nhat Hanh",
    source: "Vietnamese Zen Master",
  },
  {
    text: "With our thoughts we make the world. With our sleep we heal it. With our dreams we explore it.",
    author: "Buddhist Teaching",
    source: "",
  },
  {
    text: "The breezes at dawn have secrets to tell you. Don't go back to sleep. You must ask for what you really want. Don't go back to sleep.",
    author: "Rumi",
    source: "Sufi Mystic",
  },
  {
    text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need. When sleep is deep, life is long.",
    author: "Ayurvedic Wisdom",
    source: "",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop. The night is long, but the awakened mind travels far.",
    author: "Confucius",
    source: "",
  },
  {
    text: "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind. It is eternal, all-pervading, unchanging, immovable.",
    author: "Bhagavad Gita",
    source: "",
  },
  {
    text: "Be careful what you wish for — not because you won't get it, but because you'll be turned into the thing that can get it.",
    author: "Jed McKenna",
    source: "Spiritual Autolysis",
  },
  {
    text: "The first stage of the transition is technology that makes the connection between consciousness and reality more tangible — moving from the parasitic attention economy to the intention economy.",
    author: "Dr Julia Mossbridge",
    source: "IONS — Institute of Noetic Sciences",
  },
]

// Calculate display duration based on word count
const getDisplayDuration = (text: string): number => {
  const wordCount = text.split(' ').length
  return Math.max(4000, 2500 + wordCount * 350)
}

export default function QuoteCarousel() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentQuote = quotes[currentIndex]
  const displayDuration = getDisplayDuration(currentQuote.text)

  const nextQuote = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
    setProgress(0)
    progressRef.current = 0
  }, [])

  const goToQuote = (index: number) => {
    setCurrentIndex(index)
    setProgress(0)
    progressRef.current = 0
  }

  // Auto-advance timer
  useEffect(() => {
    if (!mounted || isPaused) return

    const progressInterval = 50
    const progressStep = (progressInterval / displayDuration) * 100

    const timer = setInterval(() => {
      progressRef.current += progressStep
      setProgress(progressRef.current)

      if (progressRef.current >= 100) {
        nextQuote()
        progressRef.current = 0
      }
    }, progressInterval)

    return () => clearInterval(timer)
  }, [mounted, currentIndex, isPaused, displayDuration, nextQuote])

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold/60 text-sm tracking-widest uppercase mb-2">
              Wisdom on Intention
            </p>
            <h3 className="text-3xl sm:text-4xl font-light text-white/90">
              Voices on Self-Mastery
            </h3>
          </div>
          <div className="min-h-[300px]" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-950" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold/60 text-sm tracking-widest uppercase mb-2">
            Wisdom on Intention
          </p>
          <h3 className="text-3xl sm:text-4xl font-light text-white/90">
            Voices on Self-Mastery
          </h3>
        </motion.div>

        {/* Quote Display */}
        <div
          className="relative min-h-[300px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glass Card */}
          <div className="w-full glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/5 hover:border-gold/10 transition-colors duration-500">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-center"
              >
                {/* Quote Mark */}
                <div className="text-gold/20 text-6xl sm:text-8xl font-serif leading-none mb-4">
                  &ldquo;
                </div>

                {/* Quote Text */}
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-light italic leading-relaxed mb-8 max-w-4xl mx-auto">
                  {currentQuote.text}
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
                  <div className="text-center">
                    <p className="text-gold font-medium">{currentQuote.author}</p>
                    {currentQuote.source && (
                      <p className="text-white/40 text-sm">{currentQuote.source}</p>
                    )}
                  </div>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-8 right-8 sm:left-12 sm:right-12 lg:left-16 lg:right-16">
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-jade transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Pause Indicator */}
            <AnimatePresence>
              {isPaused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/[0.06] text-white/40 text-xs"
                >
                  Paused
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuote(index)}
              className={`group relative w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gold w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />
              )}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <p className="text-center text-white/30 text-xs mt-6 tracking-wider">
          Hover to pause • Click dots to navigate
        </p>
      </div>
    </section>
  )
}
