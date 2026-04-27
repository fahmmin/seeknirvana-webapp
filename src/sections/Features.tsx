"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "../components/WordsPullUpMultiStyle";
import LazyVideo from "@/components/animations/LazyVideo";

const CardEntrance = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const InfoCard = ({ icon, title, number, items, delay }: { icon: string, title: string, number: string, items: string[], delay: number }) => (
  <CardEntrance delay={delay}>
    <div className="bg-[#212121] h-full rounded-2xl md:rounded-[2rem] p-6 flex flex-col justify-between">
      <div>
        <img src={icon} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-xl font-medium text-primary leading-tight">{title}</h3>
          <span className="text-xs text-primary/40">({number})</span>
        </div>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href="/technology" className="flex items-center gap-2 text-primary font-medium text-sm mt-8 group/link">
        Learn more
        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 -rotate-45" />
      </a>
    </div>
  </CardEntrance>
);

export const Features = () => {
  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators.", className: "text-primary" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500" }
  ];

  return (
    <section className="relative min-h-screen bg-black py-24 md:py-32 px-6 overflow-hidden">
      {/* Subtle background noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 h-auto lg:h-[480px]">
          {/* Card 1 - Video Card */}
          <CardEntrance delay={0}>
            <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden group">
              <LazyVideo
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-[#E1E0CC] font-medium">Your creative canvas.</p>
              </div>
            </div>
          </CardEntrance>

          {/* Card 2 */}
          <InfoCard
            delay={0.15}
            number="01"
            title="Project Storyboard."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            items={[
              "AI-assisted scene planning",
              "Dynamic frame sequencing",
              "Collaborative moodboards",
              "Asset library integration"
            ]}
          />

          {/* Card 3 */}
          <InfoCard
            delay={0.3}
            number="02"
            title="Smart Critiques."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            items={[
              "Intelligent color analysis",
              "Narrative pacing checks",
              "External tool syncing"
            ]}
          />

          {/* Card 4 */}
          <InfoCard
            delay={0.45}
            number="03"
            title="Immersion Capsule."
            icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            items={[
              "Distraction-free focus",
              "Ambient creative sound",
              "Schedule-linked silence"
            ]}
          />
        </div>
      </div>
    </section>
  );
};
