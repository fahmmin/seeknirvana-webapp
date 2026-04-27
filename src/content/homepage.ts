"use client";
import {
  Activity,
  BellRing,
  BookOpen,
  Brain,
  Clock3,
  Compass,
  Cpu,
  Eye,
  Moon,
  MoonStar,
  Smartphone,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const heroProofPoints = [
  {
    text: "Track REM and readiness.",
  },
  {
    text: "Recognize dreams with subtle cues.",
  },
  {
    text: "Follow a guided 5-day program.",
  },
];

export const problemCards: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Clock3,
    title: "Sleep gets measured, not guided",
    description:
      "Most people only review the night after it is over, with no structure for improving what happens inside it.",
  },
  {
    icon: Brain,
    title: "Dreams fade too fast",
    description:
      "Dream recall, emotional patterns, and lucid moments disappear quickly without a simple system to catch them.",
  },
  {
    icon: Moon,
    title: "The night stays underused",
    description:
      "A third of life passes in sleep, yet few people learn how to turn that time into recovery, reflection, and awareness.",
  },
];

export const steps: Array<{
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  details: string[];
}> = [
  {
    icon: MoonStar,
    number: "01",
    title: "Detect REM Sleep",
    description:
      "The ring tracks sleep signals across the night and identifies when you are most likely to be in a dream state that can support lucid awareness.",
    details: ["Sleep and HRV signals tracked", "Likely REM windows identified", "Best timing selected"],
  },
  {
    icon: BellRing,
    number: "02",
    title: "Deliver Subtle Dream Cues",
    description:
      "At the right moment, SeekNirvana sends a gentle cue designed to enter the dream without fully waking you up.",
    details: ["Cue timing is personalized", "Subtle enough to preserve sleep", "Designed to appear inside the dream"],
  },
  {
    icon: Brain,
    number: "03",
    title: "Recognize the Dream",
    description:
      "You notice the cue, realize you are dreaming, and begin training awareness from inside the experience instead of only remembering it later.",
    details: ["Awareness switches on", "Lucid moments become trainable", "Reflection improves across nights"],
  },
];

export const journeyHighlights: Array<{
  phase: string;
  title: string;
  icon: LucideIcon;
  description: string;
}> = [
  {
    phase: "Recall",
    title: "Remember more of the night",
    icon: BookOpen,
    description:
      "The first win is often simple: more stable dream memory, clearer fragments, and a stronger sense of continuity across nights.",
  },
  {
    phase: "Lucidity",
    title: "Catch the first lucid moments",
    icon: MoonStar,
    description:
      "Cues become easier to notice and awareness can come online for brief but meaningful lucid moments.",
  },
  {
    phase: "Integration",
    title: "Carry insight back into the day",
    icon: Compass,
    description:
      "Sleep starts feeling more intentional and the emotional or reflective value of dreams becomes easier to use.",
  },
];

export const signals: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: "health",
    icon: Activity,
    title: "Health sensing",
    description:
      "Sleep, readiness, HRV, movement, and timing work together to shape when cueing should happen.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile app layer",
    description:
      "The app handles journaling, cue settings, nightly review, guided onboarding, and the missing context behind the ring.",
  },
  {
    id: "slm",
    icon: Cpu,
    title: "Local SLM guidance",
    description:
      "Detailed technology pages explain the on-device Gemma 4 workflows for somatic and cognitive stress support.",
  },
];

export const programDays: Array<{
  day: string;
  title: string;
  icon: LucideIcon;
  description: string;
}> = [
  {
    day: "Day 1",
    title: "Awareness",
    icon: Eye,
    description:
      "Learn the fundamentals of recall, attention, and how to notice the shape of your nights.",
  },
  {
    day: "Day 2",
    title: "Entry",
    icon: MoonStar,
    description:
      "Set up cues, timing, and bedtime preparation so lucid recognition has a real point of entry.",
  },
  {
    day: "Day 3",
    title: "Stabilization",
    icon: Waves,
    description:
      "Practice staying calm and extending awareness once a lucid moment appears.",
  },
  {
    day: "Day 4",
    title: "Exploration",
    icon: Compass,
    description:
      "Use the dream state with more intention for observation, creativity, and inner experimentation.",
  },
  {
    day: "Day 5",
    title: "Integration",
    icon: Sparkles,
    description:
      "Review what worked, connect the insights back to waking life, and prepare for the next cycle.",
  },
];

export const pricingFeatures = [
  {
    title: "Smart Ring Hardware",
    description: "Ring and charger included in the launch bundle.",
  },
  {
    title: "Mobile App Companion",
    description: "Works across iOS and Android.",
  },
  {
    title: "REM Cueing Layer",
    description: "Sleep insight and lucid-dream timing support.",
  },
  {
    title: "5-Day Program",
    description: "A structured program to help you begin well.",
  },
  {
    title: "Lifetime Updates",
    description: "No subscription required.",
  },
  {
    title: "Private Local AI",
    description: "Your data stays with on-device models.",
  },
];

export const footerGroups = {
  explore: [
    { label: "How It Works", href: "/programs/5-day-sleep-cohort#curriculum" },
    { label: "Benefits", href: "/benefits" },
    { label: "Technology", href: "/technology" },
    { label: "Programs", href: "/programs" },
  ],
  support: [
    { label: "Pre-Order", href: "/preorder" },
    { label: "Join Program", href: "/programs/5-day-sleep-cohort/apply" },
    { label: "Contact", href: "mailto:info@seeknirvana.com" },
  ],
};

export const footerSocials = [
  { label: "X", href: "https://x.com/SeekNirvanaHQ" },
  { label: "Instagram", href: "https://instagram.com/seeknirvanaHQ" },
  { label: "GitHub", href: "https://github.com/seekNirvana" },
  { label: "YouTube", href: "https://www.youtube.com/@SeekNirvanaOfficial" },
  { label: "Telegram", href: "https://t.me/SeekNirvanaHQ" },
  { label: "Email", href: "mailto:info@seeknirvana.com" },
];


