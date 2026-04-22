import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  HeartPulse,
  ChevronDown,
  MoonStar,
  NotebookPen,
  Orbit,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";
import { marketingButtonClass } from "@/lib/ui/marketing-button";

const heroBullets = [
  "Live guided sessions across 5 days",
  "Sleep, REM, HRV, and dream-awareness education",
  "AI-supported reflection and dream journaling",
  "Beginner-friendly and safe for newcomers",
];

const problemCards = [
  {
    icon: HeartPulse,
    title: "Poor recovery",
    description:
      "Many people wake tired, wired, or emotionally foggy without understanding what happened overnight.",
  },
  {
    icon: MoonStar,
    title: "Dreams without structure",
    description:
      "Vivid dreams can feel meaningful, but without a process they fade before they can teach anything useful.",
  },
  {
    icon: Activity,
    title: "Data without interpretation",
    description:
      "Wearables collect a lot, but most users never turn sleep data into better rituals, better timing, or better nights.",
  },
  {
    icon: Brain,
    title: "Stress follows people into bed",
    description:
      "Fragmented attention, mental noise, and unprocessed stress often shape sleep long before the head hits the pillow.",
  },
];

const summaryItems = [
  "Duration: 5 days",
  "Format: Live virtual cohort",
  "Session length: 60 to 90 minutes per day",
  "Audience: Beginners, conscious explorers, wearable users",
  "Tools: Smart ring, dream journal, optional AI guidance",
];

const audienceCards = [
  "People who want to improve sleep naturally",
  "People curious about dreams and lucid dreaming",
  "Spiritually conscious users seeking deeper awareness",
  "Wearable users who want more meaning from HRV and REM data",
  "People who want structure, community, and guided practice",
];

const differenceLoop = [
  "Sensor Data",
  "AI Insights",
  "Evening Intention",
  "Sleep & REM",
  "Dream Journal",
  "Reflection",
  "Better Nights",
];

const outcomes = [
  "Better understanding of personal sleep rhythms",
  "A more intentional evening and bedtime habit stack",
  "Improved dream recall and pattern recognition",
  "Safe lucid dreaming foundations for beginners",
  "Clearer connection between emotional state and sleep quality",
  "More meaningful use of ring data and reflections",
  "Less bedtime overthinking through a repeatable protocol",
];

const curriculum = [
  {
    day: "Day 1",
    title: "Sleep Awareness Foundations",
    theme: "Understand sleep, recovery, and nighttime awareness.",
    learn:
      "Why sleep quality matters, how REM and HRV affect recovery, and how intention changes nighttime behavior.",
    practice:
      "Baseline observation, intention setting, and a calm pre-sleep reset.",
    takeaway:
      "Participants begin observing their nights with clarity instead of randomness.",
  },
  {
    day: "Day 2",
    title: "Dreams, Recall, and Pattern Recognition",
    theme: "Learn to remember dreams and identify recurring patterns.",
    learn:
      "Why dream recall matters, how to journal fragments, and how dreams connect with waking stress and emotion.",
    practice:
      "Dream capture method, dream sign noticing, and morning reflection prompts.",
    takeaway:
      "Participants start building a personal dream map instead of losing dream data each morning.",
  },
  {
    day: "Day 3",
    title: "Lucid Dreaming Foundations",
    theme: "Learn the beginner framework for lucidity safely.",
    learn:
      "What lucid dreaming is, what it is not, and how awareness is trained through timing and repetition rather than force.",
    practice:
      "Reality checks, intention training, and stabilization basics.",
    takeaway:
      "Participants understand a grounded beginner path to lucid dreaming.",
  },
  {
    day: "Day 4",
    title: "Data + AI + Meaningful Intention",
    theme: "Use ring data and journal signals to guide better nights.",
    learn:
      "How to read REM and HRV trends simply, and how AI reflections can suggest prompts without replacing intuition.",
    practice:
      "Pattern review, nightly intention setting, and nervous-system-aware sleep preparation.",
    takeaway:
      "Participants learn how data becomes guidance instead of just numbers.",
  },
  {
    day: "Day 5",
    title: "Integration and Personal Sleep Protocol",
    theme: "Turn insights into a repeatable long-term practice.",
    learn:
      "How to review personal patterns, build a custom protocol, and continue sleep and dream work after the cohort ends.",
    practice:
      "Protocol design, next-step planning, and reflection on what worked best.",
    takeaway:
      "Participants leave with a personal plan they can continue beyond the cohort.",
  },
];

const logistics = [
  "Live session each day in a private virtual group",
  "Daily practices between sessions",
  "Dream journal prompts and reflection structure",
  "Smart ring data review prompts",
  "Optional replay access",
  "Optional accountability and community support",
];

const techPoints = [
  "The ring tracks signals such as HRV, sleep stages, SpO2, and REM duration",
  "Users log dreams, sleep reflections, and waking-state observations",
  "AI helps surface patterns, suggest prompts, and support intentional routines",
  "The goal is not to replace intuition, but to enhance self-understanding",
];

const dailyExperience = [
  "Before bed: set intention and review the night’s focus",
  "During sleep: the ring tracks sleep and REM patterns",
  "After waking: log dreams, fragments, and sleep reflections",
  "Later: receive AI-guided prompts and interpretation support",
  "Live session: learn, reflect, and integrate with the cohort",
];

const faqs = [
  {
    question: "Do I need lucid dreaming experience?",
    answer:
      "No. The cohort is designed for complete beginners and starts with sleep awareness, recall, and safe foundations.",
  },
  {
    question: "Is this program only for spiritual people?",
    answer:
      "No. It is built to support multiple entry points, including sleep improvement, quantified-self curiosity, and inner exploration.",
  },
  {
    question: "Do I need the SeekNirvana ring to join?",
    answer:
      "The program is designed around the full SeekNirvana system, but the page can be adapted later if there is a no-device option.",
  },
  {
    question: "What if I do not remember my dreams yet?",
    answer:
      "That is common. Dream recall is part of the curriculum, and the practices are designed to help build it progressively.",
  },
  {
    question: "Will this help with sleep even if I never lucid dream?",
    answer:
      "The program is designed to help with sleep awareness, nighttime routines, and recovery understanding even before lucid dreaming becomes consistent.",
  },
  {
    question: "Is this a medical sleep treatment?",
    answer:
      "No. This is a guided wellness and awareness program, not a substitute for medical sleep diagnosis or treatment.",
  },
  {
    question: "What if I miss a session?",
    answer:
      "The page is structured to support optional replay access, so this can be turned on when the offer is finalized.",
  },
  {
    question: "How much time do I need each day?",
    answer:
      "Plan for the live session plus a short daily reflection and sleep preparation window.",
  },
];

export const metadata: Metadata = {
  title: "5-Day Sleep Cohort | SeekNirvana",
  description:
    "A 5-day virtual cohort to improve sleep, dream recall, and lucid dreaming foundations using ring biometrics, AI reflections, and dream journaling.",
};

export default function FiveDaySleepCohortPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-950" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />
        <div className="absolute top-16 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.08] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <FadeIn>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-gold-light">
                <Sparkles className="h-4 w-4 text-gold" />
                Guided virtual cohort
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                A 5-Day Virtual Cohort to Improve Sleep, Dreams, and Nighttime Awareness
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/66 sm:text-xl">
                Join SeekNirvana&apos;s live 5-day virtual cohort combining smart
                ring biometrics, AI-guided reflections, and dream journaling to
                help you improve sleep and build lucid dreaming foundations.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan/25 bg-white/[0.08] px-4 py-3 text-sm text-white/80 sm:px-5">
                <a href="/login" className="font-semibold text-cyan hover:underline">
                  Sign in
                </a>{" "}
                first for member hub access and a smoother application flow.
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/programs/5-day-sleep-cohort/apply"
                  className={marketingButtonClass({ variant: "primary", size: "lg", fullWidth: true })}
                >
                  Join the Next Cohort
                </a>
                <a
                  href="#curriculum"
                  className={marketingButtonClass({ variant: "secondary", size: "lg", fullWidth: true })}
                >
                  View Program Details
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {heroBullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-4 text-sm text-white/72 backdrop-blur-xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-nirvana-purple/10" />
                <div className="relative space-y-4">
                  <div className="rounded-2xl border border-white/[0.1] bg-navy-950/70 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Night view</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-white/82">HRV readiness</span>
                      <span className="text-jade-light">Balanced</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-jade to-cyan" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.1] bg-navy-950/70 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/35">REM window</p>
                      <p className="mt-3 text-2xl font-semibold text-white">2:40 AM</p>
                      <p className="mt-2 text-sm text-white/55">Cue opportunity detected</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.1] bg-navy-950/70 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/35">Dream note</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/72">
                        “Ocean, staircase, returning room. Strong recall after calm wind-down.”
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/[0.1] bg-navy-950/70 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">AI reflection</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">
                      Your calmer nights appear when intention is set earlier and
                      journaling happens immediately after waking.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
              Why This Matters
            </span>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              You already spend nearly a third of life asleep
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
              Most people never learn how to work with that time intentionally.
              Sleep tracking alone is not enough, dream experience is usually
              ignored, and stress often shapes the night before it even begins.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {problemCards.map((card) => (
              <FadeIn key={card.title} className="h-full">
                <div className="glass-card h-full rounded-3xl p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                    <card.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                    {card.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jade/5 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-sm text-jade-light">
                <CalendarDays className="h-4 w-4" />
                What this cohort is
              </span>
              <p className="mt-6 text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                A live 5-day virtual sleep and dream awareness program with guided practice, reflection, wearable-informed insight, and cohort support.
              </p>
              <div className="mt-8 space-y-3">
                {summaryItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.1] bg-navy-950/60 px-5 py-4 text-sm text-white/72 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-4 py-2 text-sm text-cyan">
                <Users className="h-4 w-4" />
                Who it is for
              </span>
              <div className="mt-8 grid gap-3">
                {audienceCards.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-4 text-sm text-white/72 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-gold/15 bg-gold/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-gold-light">
                  Not for
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/62 sm:text-base">
                  This is not a substitute for medical sleep treatment, and it
                  is not framed as a promise of instant lucid dreaming mastery.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-cyan">
              The SeekNirvana Difference
            </span>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Most sleep programs focus only on rest. Most dream programs ignore physiology.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/62">
              SeekNirvana bridges body data, inner awareness, and guided
              practice into one system.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-14">
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="grid gap-4 md:grid-cols-7">
                {differenceLoop.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 md:flex-col md:text-center">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-cyan">
                      {index + 1}
                    </div>
                    <div className="text-sm text-white/75">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
              Program Outcomes
            </span>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Designed to help you leave with a repeatable practice
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {outcomes.map((item) => (
              <FadeIn key={item} className="h-full">
                <div className="glass-card h-full rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-jade/20">
                      <Check className="h-3.5 w-3.5 text-jade" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/72 sm:text-base">{item}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="relative scroll-mt-28 overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-jade-light">
              5-Day Curriculum
            </span>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Enough detail to trust the transformation
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-5">
            {curriculum.map((day, index) => (
              <FadeIn key={day.day} delay={index * 0.06}>
                <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
                  <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-gold-light">
                        {day.day}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{day.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                        {day.theme}
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                        <p className="text-sm uppercase tracking-[0.28em] text-white/35">Learn</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/72">{day.learn}</p>
                      </div>
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                        <p className="text-sm uppercase tracking-[0.28em] text-white/35">Practice</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/72">{day.practice}</p>
                      </div>
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                        <p className="text-sm uppercase tracking-[0.28em] text-white/35">Takeaway</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/72">{day.takeaway}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/[0.08] px-4 py-2 text-sm text-cyan">
                <Clock3 className="h-4 w-4" />
                How the cohort works
              </span>
              <div className="mt-8 grid gap-3">
                {logistics.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-sm text-white/72 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.08] px-4 py-2 text-sm text-gold-light">
                <Bot className="h-4 w-4" />
                Where sleep data meets inner awareness
              </span>
              <div className="mt-8 space-y-3">
                {techPoints.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-5 py-4 text-sm text-white/72 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
                Here, AI is framed as a reflective assistant and pattern
                interpreter, not a mystical authority. It supports the human
                process rather than replacing it.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <FadeIn>
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/72">
                  <Orbit className="h-4 w-4 text-cyan" />
                  Sample daily experience
                </span>
                <div className="mt-8 space-y-3">
                  {dailyExperience.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-sm text-white/72 sm:text-base">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/72">
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  Trust and human guidance
                </span>
                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                    <h3 className="text-xl font-semibold text-white">Founder note</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/62 sm:text-base">
                      SeekNirvana exists because sleep, dreams, and awareness
                      belong together. This is designed as a guided experience
                      built with care, not hype.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                    <h3 className="text-xl font-semibold text-white">Pilot cohort placeholder</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/62 sm:text-base">
                      This section is intentionally ready for testimonials,
                      founder notes, or pilot-cohort insights as they become
                      available.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jade/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <div className="rounded-3xl border border-white/[0.15] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-sm text-jade-light">
                  <BookOpen className="h-4 w-4" />
                  Enrollment
                </span>
                <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                  Join the next virtual cohort
                </h2>
                <div className="mt-8 space-y-3">
                  {[
                    "5 live cohort sessions",
                    "Structured daily practices",
                    "Dream journaling framework",
                    "Sleep and REM education",
                    "AI-guided reflection support",
                    "Cohort access and replays",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-jade/20">
                        <Check className="h-3 w-3 text-jade" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/programs/5-day-sleep-cohort/apply"
                  className={`mt-8 ${marketingButtonClass({ variant: "primary" })}`}
                >
                  Reserve a Seat
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/72">
                  <NotebookPen className="h-4 w-4 text-cyan" />
                  FAQ
                </span>
                <div className="mt-8 space-y-4">
                  {faqs.map((item, index) => (
                    <details
                      key={item.question}
                      open={index === 0}
                      className="group rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                        <h3 className="text-left text-lg font-semibold text-white">
                          {item.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 shrink-0 text-white/45 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 pr-8 text-sm leading-relaxed text-white/62 sm:text-base">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-24">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 text-center backdrop-blur-xl sm:p-12">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.08]">
                <Waves className="h-6 w-6 text-gold" />
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Your nights can become a source of recovery, clarity, and insight.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
                Join the next 5-day SeekNirvana cohort and learn how to work
                with sleep, dreams, and awareness more intentionally.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/programs/5-day-sleep-cohort/apply"
                  className={marketingButtonClass({ variant: "primary", size: "lg", fullWidth: true })}
                >
                  Join the Next Cohort
                </a>
                <a
                  href="/technology"
                  className={marketingButtonClass({ variant: "secondary", size: "lg", fullWidth: true })}
                >
                  Explore the Technology
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
