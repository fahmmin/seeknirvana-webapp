import type { Metadata } from "next";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";
import CohortApplicationForm from "@/components/programs/CohortApplicationForm";

export const metadata: Metadata = {
  title: "Apply For The 5-Day Cohort | SeekNirvana",
  description:
    "Apply for the SeekNirvana 5-day sleep and dream cohort with a detailed intake form covering contact details, sleep goals, and personality type.",
};

export default function CohortApplicationPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-950" />
        <div className="absolute inset-0 mandala-pattern opacity-20" />
        <div className="absolute top-20 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-white/[0.08] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-gold-light">
              5-day sleep and dream cohort
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Apply to join the next cohort
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/64">
              Share your sleep goals, dream experience, preferred rhythm, and
              personality type so the cohort journey can begin with more human
              context.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <CohortApplicationForm />
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
