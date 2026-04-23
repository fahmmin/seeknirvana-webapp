"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";
import { WordsPullUp } from "../components/WordsPullUp";
import { heroProofPoints } from "../content/homepage";

export const Hero = () => {
  const customEase = [0.16, 1, 0.3, 1] as const;
  const { address, status } = useAccount();
  const isSignedIn = Boolean(address) && (status === "connected" || status === "reconnecting");
  const primaryHref = isSignedIn ? "/dashboard" : "/programs/5-day-sleep-cohort/apply";
  const primaryLabel = isSignedIn ? "Dashboard" : "Join Program";

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-navy-950" aria-label="Seek Nirvana hero">
      {/* Background Video - Desktop */}
      <div className="absolute inset-0 h-full w-full hidden md:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/nirvana-video1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background Video - Mobile */}
      <div className="absolute inset-0 h-full w-full md:hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/Nirvana_mobile-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays — tinted with deep purple instead of pure black */}
      <div className="absolute inset-0 bg-navy-950/20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-[0.35] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/70 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-navy-950/60 via-navy-950/20 to-transparent pointer-events-none md:w-2/3 md:from-navy-950/50 md:via-navy-950/10" />

      {/* Subtle green glow at bottom left */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-jade/[0.06] blur-[100px] pointer-events-none" />
      {/* Subtle gold glow at top right */}
      <div className="absolute -top-20 -right-20 h-[350px] w-[350px] rounded-full bg-gold/[0.05] blur-[120px] pointer-events-none" />
      {/* Cyan hint at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-cyan/[0.03] blur-[100px] pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-6 sm:p-6 sm:pb-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="mb-4 inline-flex max-w-full rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-white/70 backdrop-blur sm:mb-6 sm:px-4 sm:text-[10px] sm:tracking-[0.3em]"
            >
              REM-aware lucid dreaming, guided by data
            </motion.span>

            <WordsPullUp
              text="Seek Nirvana"
              className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] 2xl:text-[14vw] font-medium leading-[0.82] tracking-[-0.08em] text-white"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:col-span-4 lg:pb-6">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: customEase }}
              className="max-w-sm text-sm leading-[1.35] text-white/80 sm:text-base md:text-lg"
            >
              SeekNirvana helps you sleep better, remember more dreams, and build lucid dreaming foundations with a smart ring, subtle REM cues, and a guided program.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8, ease: customEase }}
              className="hidden gap-2.5 sm:grid sm:gap-3"
            >
              {heroProofPoints.map((point) => (
                <div
                  key={point.text}
                  className="rounded-2xl border border-white/[0.1] bg-white/[0.06] p-3 backdrop-blur-md sm:p-4"
                >
                  <p className="text-xs leading-relaxed text-white/75 sm:text-sm">{point.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8, ease: customEase }}
              className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
            >
              <a
                href={primaryHref}
                className="group/btn flex w-full items-center justify-between gap-2 rounded-full bg-jade px-1.5 py-1.5 pl-4 pr-1.5 transition-all duration-300 hover:gap-3 hover:brightness-110 glow-jade sm:w-fit sm:justify-start sm:pr-4"
              >
                <span className="text-sm font-medium text-navy-950">{primaryLabel}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 transition-transform group-hover/btn:scale-110">
                  <ArrowRight className="h-4 w-4 text-jade" />
                </div>
              </a>

              <a
                href="/preorder"
                className="w-full rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-center text-sm text-white/80 backdrop-blur transition-colors hover:border-white/30 hover:text-white sm:w-auto"
              >
                Pre-order $99
              </a>

              <a
                href="/programs/5-day-sleep-cohort#curriculum"
                className="w-full rounded-full border border-white/[0.1] px-5 py-2.5 text-center text-sm text-white/55 transition-colors hover:border-white/20 hover:text-white sm:w-auto"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: customEase }}
              className="text-[9px] uppercase tracking-[0.24em] text-white/30 sm:text-xs sm:tracking-[0.3em]"
            >
              Ring + app + dream cues + guided cohort
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
