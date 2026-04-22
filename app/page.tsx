import type { Metadata } from "next";
import { Navbar } from "@/src/components/Navbar";
import { Hero } from "@/src/sections/Hero";
import { Problem } from "@/src/sections/Problem";
import { HowItWorks } from "@/src/sections/HowItWorks";
import { Benefits } from "@/src/sections/Benefits";
import { Technology } from "@/src/sections/Technology";
import { Program } from "@/src/sections/Program";
import { Pricing } from "@/src/sections/Pricing";
import { Footer } from "@/src/sections/Footer";

export const metadata: Metadata = {
  title: "SeekNirvana Ring | Smart Ring for Lucid Dreaming and REM-Aware Sleep Guidance",
  description:
    "SeekNirvana helps you train lucid dreaming with a smart ring, REM-aware cueing, sleep data, dream journaling, and a guided 5-day program.",
};

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Technology />
      <Program />
      <Pricing />
      <Footer />
    </main>
  );
}
