"use client";

import { useEffect, useRef } from "react";
import { Activity, BrainCircuit, Cpu, Waves } from "lucide-react";

const bentoCards = [
  {
    icon: Activity,
    title: "Ring sensing layer",
    description:
      "Your smart ring captures HRV, skin temperature, SpO2, sleep stages, and movement across epochs — discrete windows of physiological truth.",
    area: "sensing",
    iconColor: "text-cyan",
    accentFrom: "from-cyan/8",
    accentTo: "to-jade/5",
    tag: "Biometric",
  },
  {
    icon: BrainCircuit,
    title: "Soul layer — mind & spirit",
    description:
      "A Gemma 4 fine-tune trained on contemplative philosophy, therapeutic dialogue, and reflective journaling. Handles emotional processing and cognitive stress entirely on-device.",
    area: "soul",
    iconColor: "text-gold",
    accentFrom: "from-gold/8",
    accentTo: "to-jade/5",
    tag: "On-device AI",
  },
  {
    icon: Waves,
    title: "Body layer — yoga & breathwork",
    description:
      "A second Gemma 4 fine-tune trained on asana cues, pranayama sequences, and somatic regulation. Reads epoch data to time breathwork and adjust intensity.",
    area: "body",
    iconColor: "text-jade",
    accentFrom: "from-jade/8",
    accentTo: "to-cyan/5",
    tag: "Somatic",
  },
  {
    icon: Cpu,
    title: "Orchestration layer",
    description:
      "A lightweight intent router decides which model activates based on context. Only one model runs at a time — preserving battery and keeping responses fast.",
    area: "orchestration",
    iconColor: "text-cyan",
    accentFrom: "from-cyan/6",
    accentTo: "to-gold/5",
    tag: "Routing",
  },
];

const signals = ["HRV", "SpO2", "REM cycles", "Respiration", "Skin temp"];

export default function BentoStackCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.animationPlayState = "running";
            el.classList.add("bento-card-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Section header */}
      <div className="mb-10">
        <span className="block text-sm uppercase tracking-[0.3em] text-gold">
          Real-Time Intelligence
        </span>

        <div className="mt-4 flex flex-wrap gap-2">
          {signals.map((sig) => (
            <span
              key={sig}
              className="rounded-full border border-cyan/20 bg-cyan/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan/80"
            >
              {sig}
            </span>
          ))}
        </div>

        <h2 className="mt-6 text-4xl md:text-5xl text-white tracking-tight">
          A Living, <span className="gradient-text">Breathing</span> Feedback Loop
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
          Unlike static dashboards, Seek Nirvana creates a closed-loop system
          between your physiology and AI — so every night becomes a feedback
          cycle for deeper clarity.
        </p>
      </div>

      {/* Detect / Identify / Adapt */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          "Detect patterns across sleep epochs",
          "Identify shifts in readiness and stress",
          "Adapt guidance based on your state",
        ].map((line) => (
          <div
            key={line}
            className="flex items-start gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3"
          >
            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            <p className="text-sm text-white/65">{line}</p>
          </div>
        ))}
      </div>

      {/* ── Bento Grid ──
          Desktop: 2-column layout
          Row 1: sensing (wide) | soul
          Row 2: body          | orchestration (wide)
      */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {bentoCards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`bento-card group relative overflow-hidden rounded-3xl glass-card p-6 sm:p-7`}
            style={{
              animationDelay: `${i * 0.12}s`,
              animationPlayState: "paused",
            }}
          >
            {/* hover glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.accentFrom} ${card.accentTo} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative flex h-full flex-col">
              {/* tag */}
              <span className="mb-3 inline-block self-start rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white/40">
                {card.tag}
              </span>

              {/* icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08]">
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>

              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Epoch signal bar */}
      <div className="mt-6 overflow-hidden rounded-3xl glass-card p-5">
        <div className="flex items-center gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="relative flex-1 overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-2"
            >
              <div className="h-1 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
              {index === 2 ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] p-1">
                  <Activity className="h-3.5 w-3.5 text-cyan/70" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.32em] text-white/25">
          Epoch boundary · signal evaluated
        </p>
      </div>

      <style jsx>{`
        @keyframes bento-card {
          from {
            opacity: 0;
            transform: translate3d(0, 18px, 0) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .bento-card {
          opacity: 0;
        }
        .bento-card-visible {
          animation: bento-card 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
