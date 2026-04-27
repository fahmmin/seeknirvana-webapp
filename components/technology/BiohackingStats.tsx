"use client";

import { useEffect, useRef } from "react";
import { useSpring, useInView, motion, useMotionTemplate } from "framer-motion";

type StatItem = {
  stat: string;
  prefix: string;
  suffix: string;
  numericTarget: number;
  label: string;
  color: string;
  glowColor: string;
};

const stats: StatItem[] = [
  {
    stat: "↑ HRV",
    prefix: "↑ ",
    suffix: " HRV",
    numericTarget: 0, // display is static label-based
    label: "Tracked nightly",
    color: "text-jade-light",
    glowColor: "rgba(0,168,107,0.35)",
  },
  {
    stat: "↓ Cortisol",
    prefix: "↓ ",
    suffix: "",
    numericTarget: 0,
    label: "Via breath timing",
    color: "text-cyan",
    glowColor: "rgba(0,212,255,0.3)",
  },
  {
    stat: "REM+",
    prefix: "",
    suffix: "",
    numericTarget: 0,
    label: "Pattern recognition",
    color: "text-gold",
    glowColor: "rgba(201,162,39,0.3)",
  },
];

function AnimatedStat({ item, index }: { item: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const x = useSpring(-48, { damping: 32, stiffness: 180 });
  const opacity = useSpring(0, { damping: 28, stiffness: 160 });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => {
        x.set(0);
        opacity.set(1);
      }, index * 140);
      return () => clearTimeout(t);
    }
  }, [inView, index, x, opacity]);

  const transform = useMotionTemplate`translateX(${x}px)`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, opacity }}
      className="flex items-baseline gap-4"
    >
      <span
        className={`text-4xl font-bold sm:text-5xl ${item.color}`}
        style={{
          textShadow: inView ? `0 0 24px ${item.glowColor}` : "none",
          transition: "text-shadow 0.6s ease",
        }}
      >
        {item.stat}
      </span>
      <span className="text-sm uppercase tracking-widest text-white/40">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function BiohackingStats() {
  return (
    <div className="grid gap-16 lg:grid-cols-[0.6fr_1fr] lg:items-center">
      {/* Left — animated stats */}
      <div>
        <span className="mb-6 block text-sm uppercase tracking-[0.3em] text-gold">
          Biohacking Layer
        </span>
        <div className="space-y-8">
          {stats.map((item, i) => (
            <AnimatedStat key={item.stat} item={item} index={i} />
          ))}
        </div>

        <div className="mt-10 space-y-3">
          {[
            "Real-time biometrics",
            "Behavioral data",
            "Adaptive AI models",
          ].map((line) => (
            <div key={line} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/60" />
              <p className="text-sm text-white/55">{line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — copy */}
      <div>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Precision Without Guesswork
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          Biohacking often relies on intuition. We bring precision. By
          combining real-time biometrics, behavioral data, and adaptive AI
          models, you gain clarity on what actually works for your body.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
          Small changes, measured precisely, compound into transformative
          states.
        </p>
        <p className="mt-10 italic text-2xl text-white/70 sm:text-3xl">
          "No noise. No trends. <span className="gradient-text">Just signal.</span>"
        </p>
      </div>
    </div>
  );
}
