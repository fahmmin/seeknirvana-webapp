import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3, MoonStar, Sparkles, Users } from "lucide-react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";
import { marketingButtonClass } from "@/lib/ui/marketing-button";

const programs = [
  {
    title: "5-Day Sleep and Dream Cohort",
    href: "/programs/5-day-sleep-cohort",
    status: "Open Program",
    format: "Live virtual program",
    duration: "5 days",
    audience: "Beginners, dream explorers, wearable users",
    description:
      "A guided program for better sleep, stronger dream recall, lucid dreaming foundations, and more intentional use of SeekNirvana ring data.",
  },
];

export const metadata: Metadata = {
  title: "Programs | SeekNirvana",
  description:
    "Explore SeekNirvana programs and cohorts, including the current 5-day sleep and dream cohort.",
};

export default function ProgramsPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-950" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-jade-light">
              Programs
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Guided Programs built around better sleep
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
              Explore the growing library of SeekNirvana cohorts and guided
              experiences. Begin with the live program available now, with more
              pathways for sleep, recovery, and dream practice to follow.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden pb-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {programs.map((program) => (
              <FadeIn key={program.title}>
                <div className="rounded-3xl border border-white/[0.1] bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 py-2 text-sm text-jade-light">
                        <Sparkles className="h-4 w-4" />
                        {program.status}
                      </span>
                      <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                        {program.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg">
                        {program.description}
                      </p>

                      <a href={program.href} className={`mt-8 ${marketingButtonClass({ variant: "primary" })}`}>
                        View program
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-4 w-4 text-cyan" />
                          <span className="text-sm text-white/75">{program.format}</span>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Clock3 className="h-4 w-4 text-cyan" />
                          <span className="text-sm text-white/75">{program.duration}</span>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-cyan" />
                          <span className="text-sm text-white/75">{program.audience}</span>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <MoonStar className="h-4 w-4 text-cyan" />
                          <span className="text-sm text-white/75">
                            More guided journeys will unfold here
                          </span>
                        </div>
                      </div>
                    </div>
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
