"use client";
import { ArrowRight, BrainCircuit, MoonStar, Waves } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "../components/FadeIn";

export const Technology = () => {
  const techCards = [
    {
      title: "Health sensing",
      description: "Heart, HRV, motion, blood oxygen, and breath rhythm analysis in one ring.",
      icon: MoonStar,
      chips: ["Heart rate", "HRV score", "Sleep stage"],
    },
    {
      title: "Mobile app layer",
      description: "The app runs your journal, cue setup, and nightly review dashboard.",
      icon: Waves,
      chips: ["iOS", "Android", "Early access"],
      showImages: true,
    },
    {
      title: "Local SLM guidance",
      description: "Privacy-first models provide cognitive and somatic support on-device.",
      icon: BrainCircuit,
      chips: ["Soul layer model", "Body layer model", "Zero cloud by default"],
    },
  ] as const;

  return (
    <section id="ai-data-layer" className="relative overflow-hidden bg-navy-850 px-4 py-20 sm:px-6 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan/[0.03] via-transparent to-jade/[0.03] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold">Technology Preview</span>
          <h2 className="text-4xl font-medium text-white sm:text-6xl lg:text-7xl">The deeper tech story now lives on its own page</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/55 sm:text-lg">The homepage stays lighter here, while the dedicated technology story restores the mobile app details and explains the local AI stack in more depth.</p>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="grid gap-4">
            {techCards.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.08} className="h-full">
                <div className="h-full rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[2rem] sm:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08]">
                    <card.icon className="h-4.5 w-4.5 text-jade" />
                  </div>
                  <h3 className="text-base font-medium text-white sm:text-lg">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">{card.description}</p>

                  {"showImages" in card && card.showImages && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { src: "/images/app/ios_app.png", alt: "iOS app screen" },
                        { src: "/images/app/android_app.png", alt: "Android app screen" },
                        { src: "/images/app/app_home.jpeg", alt: "App home screen" },
                      ].map((screen) => (
                        <div key={screen.src} className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]">
                          <Image
                            src={screen.src}
                            alt={screen.alt}
                            width={1080}
                            height={1920}
                            className="h-20 w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/[0.08] bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/60"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-white/[0.06] p-6 backdrop-blur-md sm:rounded-[2rem] sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.06] via-transparent to-jade/[0.04]" />
              <div className="relative">
                <div className="devanagari-text mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm text-white sm:text-base">तन्त्र दर्शन</div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold/40">Technology deep dive</p>

                <div className="mt-6 rounded-[1.75rem] border border-white/[0.06] bg-black/25 p-3 sm:rounded-[2rem] sm:p-4">
                  <div className="overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04]">
                    <Image
                      src="/images/app/ios_app.png"
                      alt="SeekNirvana app dashboard"
                      width={1080}
                      height={1920}
                      className="h-[420px] w-full object-cover object-top sm:h-[560px]"
                    />
                  </div>
                </div>

                <p className="mt-8 text-sm leading-relaxed text-white/55 sm:text-base">Visit the detailed page for the restored mobile app story and the local SLM setup for somatic stress and cognitive stress handling.</p>
                <a href="/technology" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.1] sm:w-auto">
                  Explore technology
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
