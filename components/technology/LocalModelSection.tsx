"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

type LayerState = "soul" | "body";

const modelCards = [
  {
    key: "soul",
    mono: "SOUL LAYER",
    monoClass: "text-purple-400/60",
    borderClass: "border-l-2 border-purple-400/40",
    title: "Soul layer — Gemma 4 E4B (cognitive fine-tune)",
    description:
      "Fine-tuned on the Bhagavad Gita, Upanishads, CBT dialogue frameworks, Vipassana and Yoga Nidra scripts, and mindfulness-based stress reduction conversations. When you open the journal or feel overwhelmed, this model meets you — warm, present, and private.",
    badge: "~2.5 GB on-device",
  },
  {
    key: "body",
    mono: "BODY LAYER",
    monoClass: "text-emerald-400/60",
    borderClass: "border-l-2 border-emerald-400/40",
    title: "Body layer — Gemma 4 E4B (somatic fine-tune)",
    description:
      "Fine-tuned on labelled asana datasets, pranayama breath sequences, Sanskrit pose vocabulary, muscle-group alignment cues, and somatic regulation protocols. When your ring signals elevated stress or shallow breathing, this model responds with body-first guidance.",
    badge: "~3.0 GB on-device",
  },
  {
    key: "epoch",
    mono: "EPOCH AWARENESS",
    monoClass: "text-gold/60",
    borderClass: "border-l-2 border-gold/30",
    title: "Epoch-aware recommendations",
    description:
      "Rather than reacting to every sensor tick, SeekNirvana works in epochs — windows of aggregated physiological data. When an epoch closes and signals shift, the orchestration layer decides whether to surface a breathwork cue, a grounding prompt, or nothing at all.",
  },
  {
    key: "orchestration",
    mono: "ORCHESTRATION",
    monoClass: "text-gold/60",
    borderClass: "border-l-2 border-gold/30",
    title: "One model at a time, by design",
    description:
      "Both fine-tuned variants of Gemma 4 live on your device but only one loads into memory at a time. Soul layer: ~2.5 GB. Body layer: ~3 GB. The swap takes seconds and happens at natural session transitions, not mid-sentence. Battery stays protected. Your data stays local.",
  },
];

export default function LocalModelSection() {
  const [activeLayer, setActiveLayer] = useState<LayerState>("soul");
  const soulRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refs = [
      { ref: soulRef, layer: "soul" as const },
      { ref: bodyRef, layer: "body" as const },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const found = refs.find(({ ref }) => ref.current === visible.target);
        if (found) setActiveLayer(found.layer);
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <FadeIn>
      <div className="rounded-3xl glass-card p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_50%)]" />
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/35">
              Local SLM stack
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl text-white tracking-tight">
              Gemma 4 E4B — <span className="gradient-text">two fine-tunes, one device</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/45">
              Both the Soul and Body layers run the same base architecture with
              domain-specific fine-tuning. No cloud dependency.
            </p>
          </div>

          <div className="shrink-0 rounded-full border border-white/[0.1] bg-navy-950/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
            <span className={activeLayer === "soul" ? "text-purple-300" : ""}>
              Soul
            </span>{" "}
            <span className={activeLayer === "soul" ? "text-purple-300" : ""}>
              ●
            </span>
            <span className="text-white/25">○</span>{" "}
            <span className={activeLayer === "body" ? "text-emerald-300" : ""}>
              Body
            </span>
          </div>
        </div>

        {/* Model cards — 2×2 grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {modelCards.map((card) => {
            const ref =
              card.key === "soul" ? soulRef : card.key === "body" ? bodyRef : undefined;

            return (
              <div
                key={card.title}
                ref={ref}
                className={`rounded-3xl border border-white/[0.1] bg-white/[0.04] p-5 ${card.borderClass}`}
              >
                <p className={`font-mono text-[10px] uppercase tracking-[0.32em] ${card.monoClass}`}>
                  {card.mono}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  {card.badge ? (
                    <span className="inline-flex items-center rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-xs text-gold-light">
                      {card.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/58">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
          The core idea is privacy with usefulness. Both Gemma 4 fine-tunes stay
          close to the user while classifying stress states, summarising
          patterns, and shaping personalised coaching without sending biometric
          context or journal entries into a remote inference pipeline.
        </p>

        {/* Dataset callout */}
        <div className="mt-6 rounded-3xl border border-gold/15 bg-gold/5 p-5">
          <h3 className="text-lg font-semibold text-white">
            Exclusive dataset, local-only guidance
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
            The distress-support layer is built on a custom training set focused
            on somatic stress language, bedtime overthinking, sleep disruption,
            reflective journaling patterns, and de-escalation sequences. That
            means guidance feels specific for body-first and mind-first distress
            alike without private data ever leaving the device.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
