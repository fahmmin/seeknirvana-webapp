'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Cpu,
  MoonStar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Waves,
} from 'lucide-react'
import FadeIn from '../animations/FadeIn'

const signals = [
  {
    id: 'health',
    icon: Activity,
    title: 'Health sensing',
    description: 'Sleep, readiness, HRV, movement, and timing work together to shape when cueing should happen.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile app layer',
    description: 'The app handles journaling, cue settings, nightly review, guided onboarding, and the missing context behind the ring.',
  },
  {
    id: 'slm',
    icon: Cpu,
    title: 'Local SLM guidance',
    description: 'Detailed technology pages explain the on-device Gemma 4 workflows for somatic and cognitive stress support.',
  },
]

function SignalIllustration({ id }: { id: string }) {
  if (id === 'health') {
    return (
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-cyan/10 via-white/5 to-jade/10 p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_55%)]" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
              <Activity className="h-3.5 w-3.5 text-cyan" />
              HRV stable
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
              <MoonStar className="h-3.5 w-3.5 text-gold" />
              REM window
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
              <Waves className="h-3.5 w-3.5 text-jade" />
              SpO2 + motion
            </div>
          </div>

          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan/20" />
            <div className="absolute inset-2 rounded-full border border-white/[0.15]" />
            <div className="absolute inset-4 rounded-full border border-gold/20" />
            <div className="absolute inset-7 rounded-full bg-gradient-to-br from-cyan/20 to-jade/20 blur-sm" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-navy-950/80">
              <Activity className="h-4 w-4 text-cyan" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'mobile') {
    return (
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-gold/10 via-white/5 to-nirvana-purple/10 p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.14),transparent_48%)]" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="rounded-[2rem] border border-white/[0.1] bg-navy-950/80 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="h-28 w-16 overflow-hidden rounded-[1.4rem] border border-white/[0.1] bg-black">
              <img
                src="/images/app/app_home.jpeg"
                alt="SeekNirvana companion app"
                className="h-full w-full object-cover object-top opacity-90"
              />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                सहचर अनुप्रयोग
              </p>
              <p className="mt-1 text-sm text-white/75">Journal, cue setup, nightly review</p>
            </div>
            <div className="flex gap-2">
              {['iOS', 'Android', 'Early access'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-nirvana-purple/10 via-white/5 to-cyan/10 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.16),transparent_45%)]" />
      <div className="relative grid gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-purple-400/20 bg-purple-400/10">
            <BrainCircuit className="h-5 w-5 text-purple-300" />
          </div>
          <div className="flex-1 rounded-3xl border border-white/[0.1] bg-white/[0.06] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.24em] text-purple-300/70">Soul layer</p>
            <p className="text-sm text-white/75">Gemma-guided cognitive support</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10">
            <Waves className="h-5 w-5 text-emerald-300" />
          </div>
          <div className="flex-1 rounded-3xl border border-white/[0.1] bg-white/[0.06] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">Body layer</p>
            <p className="text-sm text-white/75">Gemma-guided somatic regulation</p>
          </div>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-[11px] text-white/65">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          On-device, private, epoch-aware
        </div>
      </div>
    </div>
  )
}

export default function Technology() {
  return (
    <section id="ai-data-layer" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-nirvana-purple/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-cyan">
            Technology Preview
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            The deeper tech story now lives on its own page
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/62">
            The homepage stays lighter here, while the dedicated technology page
            restores the mobile app details and explains the local AI stack in
            more depth.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-4">
            {signals.map((signal, index) => (
              <FadeIn key={signal.title} delay={index * 0.08} className="h-full">
                <motion.div whileHover={{ y: -4 }} className="group h-full rounded-3xl glass-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-white/[0.08]">
                    <signal.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                    {signal.description}
                  </p>
                  <SignalIllustration id={signal.id} />
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-cyan/15 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-jade/10" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-4 py-2 text-sm text-cyan">
                  <Sparkles className="h-4 w-4" />
                  तन्त्र दर्शन
                </div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/30">
                  Technology deep dive
                </p>

                <div className="rounded-3xl border border-white/[0.1] bg-navy-950/60 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white/[0.06]">
                      <MoonStar className="h-5 w-5 text-cyan" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                        Included in the deep dive
                      </p>
                      <p className="text-white/82">Ring + app + local model architecture</p>
                    </div>
                  </div>
                  <img
                    src="/images/app/app_home.jpeg"
                    alt="SeekNirvana mobile app preview"
                    className="w-full rounded-3xl border border-white/[0.1] object-cover"
                  />
                </div>

                <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
                  Visit the detailed page for the restored mobile app story and
                  the local SLM setup for somatic stress and cognitive stress
                  handling.
                </p>

                <a
                  href="/technology"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-6 py-3 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20"
                >
                  Explore technology
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
