import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Technology from "@/components/sections/Technology";
import Program from "@/components/sections/Program";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "SeekNirvana Ring | Smart Ring for Lucid Dreaming and REM-Aware Sleep Guidance",
  description:
    "SeekNirvana helps you train lucid dreaming with a smart ring, REM-aware cueing, sleep data, dream journaling, and a guided 5-day program.",
};

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
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
