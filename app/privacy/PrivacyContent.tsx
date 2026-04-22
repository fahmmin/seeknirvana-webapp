"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Lock,
  UserCheck,
  Server,
  Globe,
  Bell,
  Trash2,
} from "lucide-react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";

const sections = [
  {
    id: "information-we-collect",
    icon: Eye,
    title: "Information We Collect",
    content: [
      "We collect only the essential information needed to provide you with a personalized Nirvana experience:",
      "",
      "**Personal Information:**",
      "• Full Name - To personalize your wellness journey and address you properly in communications",
      "• Email Address - For account access, important updates, and personalized insights",
      "• Wallet Address - For secure blockchain-based features and future token rewards",
      "• Profile Picture (optional) - To customize your profile and community presence",
      "• Region/Location - To provide timezone-appropriate sleep schedules and local wellness insights",
      "• IP Address - For security purposes and to optimize app performance based on your region",
      "• Reown (WalletConnect) AppKit — when you sign in on the website, Reown may process wallet addresses, email used for embedded login, or social login metadata according to their policies",
      "• Transactional email — a welcome message after sign-up may be sent via Resend to the email address on your account",
      "• Google Fit (optional) — if connected, we may process activity summaries such as daily steps, active minutes, and calories to populate dashboard analytics",
      "",
      "**Wellness Data:**",
      "• Sleep patterns and REM cycle data (stored locally on your device by default)",
      "• Heart rate variability readings",
      "• Body temperature variations",
      "• Movement and activity data during sleep",
      "",
      "**Usage Data:**",
      "• App interaction patterns (anonymized)",
      "• Feature preferences and settings",
      "• Device type and operating system for compatibility",
    ].join("\n"),
  },
  {
    id: "how-we-protect-your-data",
    icon: Lock,
    title: "How We Protect Your Data",
    content: [
      "Your privacy is sacred to us. We implement multiple layers of security:",
      "",
      "**Encryption:**",
      "• All data transmission uses TLS 1.3 encryption",
      "• Sensitive data at rest is encrypted using AES-256",
      "• Wallet addresses are hashed and never stored in plain text",
      "• Biometric data never leaves your device unless explicitly synced",
      "",
      "**Security Measures:**",
      "• Regular security audits by third-party firms",
      "• Multi-factor authentication for account access",
      "• Automated threat detection and prevention systems",
      "• Secure data centers with 24/7 monitoring",
      "• Zero-knowledge architecture where possible",
      "",
      "**Blockchain Security:**",
      "• Wallet connections use the Reown (WalletConnect) protocol via AppKit",
      "• No private keys are ever stored or accessed by us",
      "• Smart contract interactions are transparent and verifiable",
    ].join("\n"),
  },
  {
    id: "how-we-use-your-information",
    icon: UserCheck,
    title: "How We Use Your Information",
    content: [
      "Your data serves only to enhance your personal journey toward mindfulness and better sleep:",
      "",
      "**Personalization:**",
      "• Tailoring meditation recommendations to your sleep patterns",
      "• Adjusting lucid dreaming cues based on your REM cycles",
      "• Providing timezone-appropriate sleep schedules",
      "• Customizing the app interface to your preferences",
      "• Sending relevant wellness tips and insights",
      "• Generating activity analytics and trend summaries when you connect Google Fit",
      "",
      "**Service Improvement:**",
      "• Analyzing anonymized usage patterns to improve features",
      "• Detecting and fixing technical issues",
      "• Optimizing app performance for your device",
      "",
      "**Communication:**",
      "• Account-related notifications",
      "• Weekly sleep summary reports (if opted in)",
      "• Important product updates",
      "• Security alerts",
      "",
      "**We NEVER:**",
      "• Sell your data to third parties",
      "• Use your data for advertising targeting",
      "• Share identifiable information with partners",
      "• Access your wallet funds or private keys",
    ].join("\n"),
  },
  {
    id: "program-privacy",
    icon: Shield,
    title: "Program Privacy & Cohort Data Use",
    content: [
      "If you apply to or participate in a SeekNirvana cohort or guided program, we may collect additional information to support program delivery, scheduling, safety, and product improvement.",
      "",
      "**Program Data We May Collect:**",
      "• Cohort application details such as your name, email, timezone, attendance preference, and stated goals",
      "• Wellness-context information you choose to share, such as sleep concerns, dream recall familiarity, current stress patterns, and reflective notes",
      "• Attendance, participation, and submitted journaling or cohort feedback",
      "• Device-linked wellness data that you intentionally connect during the program experience",
      "",
      "**How Program Data May Be Used:**",
      "• To review applications and organize cohort placement",
      "• To personalize cohort guidance, prompts, and support materials",
      "• To improve curriculum design, safety messaging, and product workflows",
      "• To develop or refine custom AI systems using de-identified or aggregated patterns only",
      "",
      "**No PII In Model Training:**",
      "• We do not use directly identifying personal information such as your name, email address, phone number, or precise contact details to train AI models",
      "• We do not intentionally place private cohort applications or raw personal notes into a model training pipeline in identifiable form",
      "• If cohort-derived data is ever used for model improvement, it is first stripped of direct identifiers and handled under controlled internal processes",
      "",
      "**Your Choice Matters:**",
      "• You should avoid sharing information you do not want reviewed for cohort support",
      "• You may request deletion of submitted cohort application information, subject to legal and operational retention needs",
      "• Program participation is optional, and your core legal rights remain governed by this Privacy Policy",
    ].join("\n"),
  },
  {
    id: "data-storage-and-retention",
    icon: Server,
    title: "Data Storage & Retention",
    content: [
      "We believe in data minimization and user control:",
      "",
      "**Storage Locations:**",
      "• Primary servers located in secure, ISO 27001 certified data centers",
      "• Backup data encrypted and distributed across multiple regions",
      "• Biometric data primarily stored on your local device",
      "• Blockchain data is immutable and public per blockchain design",
      "",
      "**Retention Periods:**",
      "• Account data: Retained while account is active, deleted 30 days after account closure",
      "• Sleep data: Stored according to your preferences (default: 1 year, then anonymized)",
      "• Usage logs: Anonymized after 90 days",
      "• IP logs: Retained for 30 days for security, then deleted",
      "• Communication records: Retained for 2 years for legal compliance",
      "",
      "**Your Control:**",
      "• Export all your data at any time",
      "• Request immediate deletion (right to be forgotten)",
      "• Choose local-only storage for sensitive biometric data",
      "• Set custom retention periods for sleep history",
      "• Disconnect Google Fit and revoke sync access at any time from dashboard settings",
    ].join("\n"),
  },
  {
    id: "data-sharing-and-third-parties",
    icon: Globe,
    title: "Data Sharing & Third Parties",
    content: [
      "We maintain strict boundaries around data sharing:",
      "",
      "**What We Don't Share:**",
      "• Your personal information with advertisers",
      "• Your biometric data with any external parties",
      "• Your wallet address with marketing partners",
      "• Individual sleep patterns in identifiable form",
      "",
      "**Limited Sharing Only When:**",
      "• Service Providers: Trusted vendors who help us operate (hosting, analytics, customer support) under strict confidentiality agreements and only with necessary data",
      "• Legal Requirements: When required by law, court order, or to protect our rights and safety",
      "• Business Transfers: In case of merger or acquisition, with notice to users",
      "• With Your Consent: Only when you explicitly authorize sharing",
      "• OAuth Providers: Google may process authentication and authorization metadata during Google Fit sign-in under Google's terms",
      "",
      "**Blockchain Transparency:**",
      "• On-chain transactions are public by nature",
      "• We use privacy-preserving techniques where possible",
      "• You control what data links to your public wallet address",
    ].join("\n"),
  },
  {
    id: "your-privacy-rights",
    icon: Bell,
    title: "Your Privacy Rights",
    content: [
      "You have complete control over your personal information:",
      "",
      "**Access & Portability:**",
      "• Download all your data in standard formats (JSON, CSV)",
      "• View complete logs of data access and processing",
      "• Receive clear explanations of automated decision-making",
      "",
      "**Correction & Deletion:**",
      "• Update your information at any time in account settings",
      "• Request correction of inaccurate data",
      "• Delete your account and all associated data permanently",
      "• Opt-out of data processing where legally applicable",
      "",
      "**Control Options:**",
      "• Adjust privacy settings granularly",
      "• Choose local-only vs cloud storage",
      "• Opt-out of non-essential communications",
      "• Disable specific data collection features",
      "• Manage cookie preferences",
      "",
      "**Regional Rights:**",
      "• GDPR rights for EU residents (access, erasure, portability, objection)",
      "• CCPA rights for California residents (know, delete, opt-out, non-discrimination)",
      "• Similar rights honored for all users globally",
    ].join("\n"),
  },
  {
    id: "account-deletion",
    icon: Trash2,
    title: "Account Deletion",
    content: [
      "When you choose to leave, your data leaves with you:",
      "",
      "**Deletion Process:**",
      "1. Initiate deletion from account settings",
      "2. 7-day grace period to prevent accidental loss",
      "3. Irreversible deletion of personal information",
      "4. Anonymization of sleep data used for research",
      "5. Confirmation email upon completion",
      "",
      "**What Gets Deleted:**",
      "• Profile information and settings",
      "• Email and contact details",
      "• Wallet address associations",
      "• Profile pictures and personal media",
      "• Account activity logs",
      "• Communication history",
      "",
      "**What Remains:**",
      "• Anonymized sleep data patterns (stripped of identifiers)",
      "• Blockchain transaction records (immutable by design)",
      "• Legal compliance records (as required by law)",
      "",
      "**Post-Deletion:**",
      "• 30-day recovery window (then permanent)",
      "• No marketing communications",
      "• Option to return with fresh start",
    ].join("\n"),
  },
];

export default function PrivacyContent() {
  return (
    <main className="relative min-h-screen bg-navy-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 mandala-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-jade/10 to-transparent blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Shield className="w-4 h-4 text-jade" />
            <span className="text-sm text-jade-light tracking-wide">
              Your Data, Your Sanctuary
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Privacy </span>
            <span className="gradient-text">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="devanagari-text mb-4 text-2xl text-gold/85 tracking-[0.06em]"
          >
            गोपनीयता संरक्षण
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Just as the lotus grows in water but remains untouched by it, we
            process your data while respecting your privacy.
            <br />
            <br />
            Last updated: January 29, 2026
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative py-12 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section, index) => (
            <FadeIn key={section.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                id={section.id}
                className="glass-card rounded-2xl p-8 scroll-mt-28"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-jade" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-white/70 whitespace-pre-line leading-relaxed">
                    {section.content.split("\n").map((line, i) => {
                      if (line.startsWith("**") && line.endsWith(":**")) {
                        return (
                          <h3
                            key={i}
                            className="text-lg font-semibold text-jade-light mt-6 mb-3"
                          >
                            {line.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (line.startsWith("• ")) {
                        return (
                          <li key={i} className="ml-6 text-white/70 mb-2">
                            {line.replace("• ", "")}
                          </li>
                        );
                      }
                      if (line.trim() === "") {
                        return <div key={i} className="h-4" />;
                      }
                      return (
                        <p key={i} className="text-white/70 mb-3">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}

          {/* Contact Section */}
          <FadeIn delay={0.8}>
            <div className="glass-card rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-white/60 mb-6">
                Our Data Protection Officer is here to help with any privacy
                concerns or requests.
              </p>
              <a
                href="mailto:support@seeknirvana.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.08] transition-colors hover:bg-white/[0.12] text-white font-medium hover:shadow-lg hover:shadow-jade/20 transition-shadow"
              >
                Contact support@seeknirvana.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
