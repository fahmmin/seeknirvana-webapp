"use client";

import { motion } from "framer-motion";
import {
  Scale,
  FileText,
  ShieldAlert,
  HeartPulse,
  Ban,
  Gavel,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { Navbar as Navigation } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { FadeIn } from "@/src/components/FadeIn";

const sections = [
  {
    id: "agreement-to-terms",
    icon: FileText,
    title: "Agreement to Terms",
    content: [
      'Welcome to Nirvana. By accessing or using our website, mobile application, products, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.',
      "",
      'These Terms constitute a legally binding agreement between you and Seek Nirvana, Inc. ("we," "us," "our," or "Nirvana") regarding your use of the Services.',
      "",
      "**Important Notice:**",
      "• You must be at least 18 years old to use our Services",
      "• By using our Services, you represent that you have the legal capacity to enter into this agreement",
      "• If you are using our Services on behalf of an organization, you represent that you have authority to bind that organization",
      "• These Terms may be updated from time to time; continued use constitutes acceptance of changes",
      "",
    ].join("\n"),
  },
  {
    id: "use-of-services",
    icon: Scale,
    title: "Use of Services",
    content: [
      "**Permitted Use:**",
      "You may use our Services for personal, non-commercial purposes to:",
      "• Track and improve your sleep quality",
      "• Practice lucid dreaming techniques",
      "• Access meditation and mindfulness content",
      "• Monitor your biometric data for wellness purposes",
      "• Connect your compatible devices and wearables",
      "• Participate in community features where available",
      "",
      "**Prohibited Conduct:**",
      "You agree NOT to:",
      "• Use the Services for any illegal purpose or in violation of any laws",
      "• Attempt to reverse engineer, decompile, or hack our software or hardware",
      "• Interfere with or disrupt the integrity or performance of the Services",
      "• Use automated systems (bots, scrapers) to access the Services",
      "• Share account credentials or allow unauthorized access to your account",
      "• Upload malicious code, viruses, or harmful content",
      "• Impersonate others or provide false information",
      "• Harass, abuse, or harm other users",
      "• Use the Services to provide medical advice to others",
      "• Resell, sublicense, or commercially exploit the Services without authorization",
      "",
      "**Account Responsibilities:**",
      "• Maintain accurate and complete account information",
      "• Keep your password and wallet credentials secure",
      "• Immediately notify us of unauthorized access",
      "• Take responsibility for all activity under your account",
    ].join("\n"),
  },
  {
    id: "health-and-medical-disclaimer",
    icon: HeartPulse,
    title: "Health & Medical Disclaimer",
    content: [
      "**Not Medical Advice:**",
      "Nirvana Ring and our Services are wellness products intended to promote better sleep and mindfulness. They are NOT medical devices and should not be used as substitutes for professional medical advice, diagnosis, or treatment.",
      "",
      "**Important Limitations:**",
      "• Our products have not been evaluated by the FDA or equivalent regulatory bodies",
      "• Biometric data provided is for informational purposes only",
      "• Sleep stage detection has inherent limitations and may not be 100% accurate",
      "• Lucid dreaming techniques may not work for all individuals",
      "• Results may vary based on individual physiology and practice",
      "",
      "**Consult Your Doctor:**",
      "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding:",
      "• Sleep disorders or chronic insomnia",
      "• Heart conditions or cardiovascular concerns",
      "• Mental health conditions",
      "• Whether lucid dreaming practices are appropriate for you",
      "• Any medical condition before starting a new wellness routine",
      "",
      "**Emergency Situations:**",
      "If you think you may have a medical emergency, call your doctor or emergency services immediately. Never disregard professional medical advice because of information you read on our Services.",
      "",
      "**User Responsibility:**",
      "You acknowledge that you use our Services at your own risk and that you are responsible for determining whether the Services are appropriate for your individual circumstances.",
    ].join("\n"),
  },
  {
    id: "data-and-privacy",
    icon: ShieldAlert,
    title: "Data & Privacy",
    content: [
      "**Your Data Rights:**",
      "Your privacy is sacred to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.",
      "",
      "**Data You Provide:**",
      "By using our Services, you consent to our collection of:",
      "• Name and email address for account management",
      "• Wallet address or Reown AppKit sign-in identifiers for blockchain and web sign-in features",
      "• Transactional email via Resend for account sign-up welcome messages",
      "• Optional profile information (photo, region)",
      "• IP address for security and optimization",
      "• Sleep and biometric data from your Nirvana Ring",
      "• Google Fit activity summaries (steps, active minutes, calories) when you explicitly authorize OAuth access",
      "",
      "**Data Security:**",
      "While we implement industry-standard security measures, you acknowledge that:",
      "• No internet transmission is completely secure",
      "• You are responsible for maintaining the confidentiality of your credentials",
      "• Blockchain transactions are public and immutable by design",
      "• You should back up your important data regularly",
      "",
      "**Data Ownership:**",
      "• You retain ownership of your personal data",
      "• You grant us a license to use your data to provide and improve our Services",
      "• You may disconnect Google Fit access at any time from dashboard settings",
      "• Anonymized data may be used for research and product development",
      "• You can request data deletion as outlined in our Privacy Policy",
      "",
      "**International Data:**",
      "Your data may be processed in countries other than your own. By using our Services, you consent to such transfers.",
    ].join("\n"),
  },
  {
    id: "program-terms",
    icon: Scale,
    title: "Program Participation, Waiver & Indemnity",
    content: [
      "The SeekNirvana 5-day cohort and future guided programs are optional wellness experiences. By applying for or participating in a program, you agree to the following program-specific conditions in addition to the rest of these Terms.",
      "",
      "**Program Participation Commitments:**",
      "• You agree to provide accurate application details and not impersonate another person",
      "• You understand the program is structured around live participation across five days, and you should join only if you can make a good-faith effort to attend",
      "• You remain responsible for your own physical, emotional, and scheduling boundaries during any session, reflection, movement, breathwork, or sleep-related practice",
      "",
      "**Program Data & AI Notice:**",
      "• Program applications, session feedback, reflective entries, and cohort interactions may be collected to operate the program and improve the experience",
      "• SeekNirvana may use de-identified and non-PII program data to improve internal systems, including custom model development",
      "• SeekNirvana does not use your directly identifying personal information as training data for AI models",
      "",
      "**Waiver of Liability:**",
      "• You understand that the program is educational and wellness-oriented, not medical or psychological treatment",
      "• You voluntarily participate at your own risk and are responsible for deciding what practices are appropriate for you",
      "• You agree not to participate in ways that are unsafe for your medical, mental-health, or sleep circumstances",
      "",
      "**Indemnity:**",
      "• To the maximum extent permitted by law, you agree to indemnify, defend, and hold harmless SeekNirvana, its team, contractors, and affiliates from claims, losses, damages, liabilities, and expenses arising from your misuse of the program, your breach of these Terms, or your violation of another person's rights",
      "",
      "**No Guarantee Of Outcome:**",
      "• We do not guarantee attendance results, lucid dreams, sleep improvements, emotional outcomes, or any specific transformation from cohort participation",
      "• Missed sessions, personal readiness, life stress, and health factors can materially affect outcomes",
    ].join("\n"),
  },
  {
    id: "intellectual-property",
    icon: Ban,
    title: "Intellectual Property",
    content: [
      "**Our Content:**",
      "All content, features, and functionality of our Services—including but not limited to text, graphics, logos, icons, images, audio clips, software, and algorithms—are owned by Nirvana or our licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.",
      "",
      "**Your License:**",
      "Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:",
      "• Access and use our Services for personal, non-commercial purposes",
      "• Download one copy of any materials for personal, non-commercial use",
      "• Use our mobile application on devices you own or control",
      "",
      "**Restrictions:**",
      "You may NOT:",
      "• Copy, modify, create derivative works from, or distribute our content",
      "• Reverse engineer or attempt to extract source code from our software",
      "• Remove copyright, trademark, or other proprietary notices",
      "• Use our trademarks without prior written consent",
      "• Frame or mirror any part of our Services without authorization",
      "",
      "**User Content:**",
      "By submitting content to our Services (reviews, forum posts, etc.), you:",
      "• Grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content",
      "• Represent that you own or have rights to the content you submit",
      "• Agree not to submit content that is illegal, offensive, or infringing",
      "",
      "**Feedback:**",
      "Any feedback or suggestions you provide may be used by us without restriction or compensation to you.",
    ].join("\n"),
  },
  {
    id: "purchases-returns-and-warranty",
    icon: Gavel,
    title: "Purchases, Returns & Warranty",
    content: [
      "**Pricing & Payment:**",
      "• All prices are in US dollars unless otherwise stated",
      "• We reserve the right to change prices at any time",
      "• Payment is required in full at time of purchase",
      "• We accept major credit cards, cryptocurrency, and other specified payment methods",
      "• You represent that you have legal right to use the payment method provided",
      "",
      "**Pre-Orders:**",
      "• Pre-order dates are estimates and subject to change",
      "• You may cancel pre-orders before shipment for a full refund",
      "• Pre-order pricing is locked at the time of order",
      "",
      "**Shipping:**",
      "• Risk of loss passes to you upon delivery to carrier",
      "• Shipping times are estimates, not guarantees",
      "• You are responsible for providing accurate shipping information",
      "• International orders may be subject to customs fees and import duties",
      "",
      "**Return Policy:**",
      "• All sales are final upon shipment",
      "• Products may be exchangeable if defective upon arrival",
      "• Contact support@seeknirvana.com for product concerns",
      "• We reserve the right to evaluate each request individually",
      "",
      "**Warranty:**",
      "• Nirvana Ring comes with a 1-year limited warranty against manufacturing defects",
      "• Warranty covers hardware failures under normal use",
      "• Warranty does NOT cover: accidental damage, water damage beyond IP rating, unauthorized modifications, normal wear and tear",
      "• To make a warranty claim, contact support@seeknirvana.com",
      "",
      "**Limitation of Liability:**",
      "Our total liability for any claim shall not exceed the amount you paid for the product or service giving rise to the claim.",
    ].join("\n"),
  },
  {
    id: "limitations-of-liability-and-indemnification",
    icon: AlertTriangle,
    title: "Limitations of Liability & Indemnification",
    content: [
      "**Disclaimer of Warranties:**",
      'OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
      "",
      "WE DO NOT WARRANT THAT:",
      "• Our Services will be uninterrupted, timely, secure, or error-free",
      "• The results from using our Services will be accurate or reliable",
      "• Any errors in the Service will be corrected",
      "• Lucid dreaming will occur or be safe for all users",
      "• Biometric data will be medically accurate",
      "",
      "**Limitation of Liability:**",
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, NIRVANA AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR:",
      "• Indirect, incidental, special, consequential, or punitive damages",
      "• Loss of profits, revenue, data, goodwill, or other intangible losses",
      "• Damages resulting from your access to or use of (or inability to access or use) our Services",
      "• Any conduct or content of any third party on our Services",
      "• Unauthorized access, use, or alteration of your transmissions or content",
      "• Personal injury or property damage from using our products",
      "",
      "**Maximum Liability:**",
      "IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF:",
      "• The amount you paid to us in the 12 months prior to the claim",
      "• One hundred US dollars ($100)",
      "",
      "**Indemnification:**",
      "You agree to defend, indemnify, and hold harmless Nirvana and our affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:",
      "• Your use of our Services",
      "• Your violation of these Terms",
      "• Your violation of any rights of another party",
      "• Your conduct in connection with our Services",
      "",
      "**Force Majeure:**",
      "We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.",
    ].join("\n"),
  },
  {
    id: "governing-law-and-dispute-resolution",
    icon: Mail,
    title: "Governing Law & Dispute Resolution",
    content: [
      "**Governing Law:**",
      "These Terms and your use of our Services shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.",
      "",
      "**Dispute Resolution:**",
      "We encourage you to contact us first to seek resolution:",
      "• Email: support@seeknirvana.com",
      "• We will attempt to resolve disputes informally within 30 days",
      "",
      "**Arbitration Agreement:**",
      "Any dispute arising from these Terms or our Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association:",
      "• Arbitration shall be conducted in San Francisco, California",
      "• You may opt out of arbitration within 30 days of accepting these Terms",
      "• Small claims court claims are exempt from arbitration",
      "• Class action lawsuits are waived to the extent permitted by law",
      "",
      "**Class Action Waiver:**",
      "YOU AGREE THAT ANY PROCEEDINGS, WHETHER IN ARBITRATION OR COURT, WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS ACTION, REPRESENTATIVE ACTION, OR CONSOLIDATED ACTION.",
      "",
      "**Statute of Limitations:**",
      "You agree that any claim must be brought within one (1) year after the cause of action arises, or such claim is permanently barred.",
      "",
      "**Severability:**",
      "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.",
      "",
      "**Entire Agreement:**",
      "These Terms, together with our Privacy Policy and any other legal notices published on our Services, constitute the entire agreement between you and Nirvana concerning our Services.",
      "",
      "**Waiver:**",
      "Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights.",
      "",
      "**Assignment:**",
      "You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.",
      "",
      "**Contact Information:**",
      "For legal notices or questions about these Terms:",
      "• Email: legal@seeknirvana.com",
      "• Address: Seek Nirvana, Inc., Legal Department, San Francisco, CA 94102",
      "",
      "**Effective Date:**",
      "These Terms are effective as of January 29, 2026.",
    ].join("\n"),
  },
];

export default function TermsContent() {
  return (
    <main className="relative min-h-screen bg-navy-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 mandala-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-gold/10 to-transparent blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Scale className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold-light tracking-wide">
              Sacred Agreement
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Terms of </span>
            <span className="gradient-text-gold">Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="devanagari-text mb-4 text-2xl text-gold/85 tracking-[0.06em]"
          >
            नियम व धारणा
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            As the wheel of Dharma turns, so do our responsibilities to one
            another. Please read these terms carefully before embarking on your
            journey.
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
                    <section.icon className="w-6 h-6 text-gold" />
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
                            className="text-lg font-semibold text-gold-light mt-6 mb-3"
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

          {/* Acceptance Section */}
          <FadeIn delay={0.8}>
            <div className="glass-card rounded-2xl p-8 text-center border border-gold/20">
              <div className="text-4xl text-gold mb-4">🙏</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-white/60 mb-6">
                By continuing to use Nirvana&apos;s Services, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms of Service and our Privacy Policy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@seeknirvana.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-nirvana-amber text-navy-950 font-medium hover:shadow-lg hover:shadow-gold/20 transition-shadow"
                >
                  Contact Support Team
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 hover:border-gold/50 hover:text-gold transition-all"
                >
                  View Privacy Policy
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
