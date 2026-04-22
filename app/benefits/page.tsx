import type { Metadata } from "next";
import {
  Activity,
  Brain,
  Clock,
  Heart,
  Infinity,
  Leaf,
  MoonStar,
  Sparkles,
  Waves,
} from "lucide-react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";

const benefitPillars = [
  {
    icon: MoonStar,
    title: "Lucid recognition becomes more reachable",
    description:
      "The system is built to improve recall, cue timing, and night-to-night awareness so lucid moments happen with more consistency.",
  },
  {
    icon: Brain,
    title: "Cognitive clarity after sleep",
    description:
      "Better dream recall and more intentional sleep practice can support reflection, creative thinking, and stronger morning insight.",
  },
  {
    icon: Heart,
    title: "Somatic calm and less reactivity",
    description:
      "By paying attention to readiness, HRV, and wind-down rhythm, SeekNirvana helps users build a calmer physiological runway into sleep.",
  },
  {
    icon: Activity,
    title: "A measurable practice instead of guesswork",
    description:
      "Patterns in readiness, cues, recall, and dream journaling make progress easier to interpret and easier to repeat.",
  },
];

const deeperBenefits = [
  {
    title: "Dream recall",
    copy:
      "Most people start with fragments. The practice begins by turning those fragments into stable memories that can be reviewed and learned from.",
  },
  {
    title: "Emotional clarity",
    copy:
      "Dream content often carries unresolved emotional material. Better recall and lucid observation can make patterns easier to notice without forcing them.",
  },
  {
    title: "Creative exploration",
    copy:
      "Lucid dreams can become a space for curiosity, rehearsal, and imagination when awareness is present enough to guide the experience.",
  },
  {
    title: "Self-awareness",
    copy:
      "The deeper promise is not just lucid dreaming. It is learning how to notice your own state more clearly across both sleep and waking life.",
  },
];

const timeline = [
  "Early nights: better wind-down awareness and stronger dream capture",
  "First week: clearer recall, earlier recognition of dream patterns",
  "Ongoing practice: more stable lucid moments and a more intentional relationship with sleep",
];

const classicBenefits = [
  {
    icon: Clock,
    title: "Enhanced Longevity",
    sanskrit: "दीर्घायु",
    stat: "+23%",
    statLabel: "Sleep Quality",
    description:
      "Optimized restorative sleep patterns support cellular repair, immune function, and healthier long-term recovery.",
  },
  {
    icon: Heart,
    title: "Stress Reduction",
    sanskrit: "शांति",
    stat: "-40%",
    statLabel: "Reactivity",
    description:
      "Better nighttime regulation and more intentional dream practice can help reduce anxiety, reactivity, and accumulated stress load.",
  },
  {
    icon: Brain,
    title: "Cognitive Clarity",
    sanskrit: "प्रज्ञा",
    stat: "+35%",
    statLabel: "Mental Focus",
    description:
      "More coherent sleep and clearer dream recall can support memory consolidation, insight, and daytime sharpness.",
  },
  {
    icon: Sparkles,
    title: "Dream Creativity",
    sanskrit: "कल्पना",
    stat: "∞",
    statLabel: "Possibilities",
    description:
      "Lucid and reflective dream work can create space for imagination, problem solving, and inner experimentation.",
  },
  {
    icon: Leaf,
    title: "Mindful Living",
    sanskrit: "स्मृति",
    stat: "24/7",
    statLabel: "Awareness",
    description:
      "The aim is not just better nights. It is carrying more awareness into waking life, choices, and emotional habits.",
  },
  {
    icon: Infinity,
    title: "Holistic Balance",
    sanskrit: "समता",
    stat: "100%",
    statLabel: "Harmony",
    description:
      "SeekNirvana is built to reconnect body data, dream awareness, and reflective practice into a more integrated rhythm.",
  },
];

export const metadata: Metadata = {
  title: "Benefits | SeekNirvana",
  description:
    "Explore the deeper benefits of SeekNirvana, from lucid dream recall and self-awareness to calmer sleep and more intentional recovery.",
};

export default function BenefitsPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-950" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
              Benefits In Detail
            </span>
            <p className="devanagari-text mb-4 text-base tracking-[0.03em] text-gold/85">
              फलम् अभ्यासस्य
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Why the practice matters beyond the first lucid dream
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
              SeekNirvana is designed to do more than trigger a novel dream
              moment. It helps users build a repeatable relationship with sleep,
              awareness, reflection, and recovery.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefitPillars.map((item) => (
              <FadeIn key={item.title} className="h-full">
                <div className="glass-card h-full rounded-3xl p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jade/5 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <span className="devanagari-text inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-base text-jade-light">
                <Sparkles className="h-4 w-4" />
                अन्तर्दृष्टि मण्डल
              </span>
              <p className="mt-4 text-xs tracking-normal text-white/30">
                Outcome map
              </p>
              <div className="mt-8 space-y-6">
                {deeperBenefits.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                  <Waves className="h-5 w-5 text-cyan" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/35">
                    Progress over time
                  </p>
                  <p className="text-lg text-white/82">What users are working toward</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {timeline.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-5 py-4 text-sm text-white/72 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm leading-relaxed text-white/58 sm:text-base">
                Some benefits are immediate, like better dream capture. Others
                accumulate more slowly, especially the ability to carry
                intentional awareness across nights and into waking life.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/preorder"
                  className="inline-flex justify-center rounded-full border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] px-6 py-3 text-sm font-medium text-white"
                >
                  Start the guided system
                </a>
                <a
                  href="/login"
                  className="inline-flex justify-center rounded-full border border-white/[0.15] bg-white/[0.08] px-6 py-3 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20"
                >
                  Join Program
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mandala-pattern opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-gold">
              Benefits Of Intention
            </span>
            <p className="devanagari-text mb-4 text-base tracking-[0.03em] text-gold/85">
              जागरणस्य फलानि
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Broader life benefits
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
              These are the broader life benefits SeekNirvana is meant to
              support once sleep, dream recall, and awareness start becoming a
              repeatable practice.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classicBenefits.map((benefit) => (
              <FadeIn key={benefit.title} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-jade/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08]">
                        <benefit.icon className="h-6 w-6 text-gold" />
                      </div>
                      <div className="text-right">
                        <div className="gradient-text-gold text-3xl font-bold">
                          {benefit.stat}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-white/40">
                          {benefit.statLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                    <p className="devanagari-text mb-3 mt-1 text-base text-gold/80">
                      {benefit.sanskrit}
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
