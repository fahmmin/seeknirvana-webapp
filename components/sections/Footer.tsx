"use client";

import { motion } from "framer-motion";
import { Mail, Twitter, Github } from "lucide-react";
import { usePathname } from "next/navigation";

const getLinks = (isHomePage: boolean) => ({
  explore: [
    { label: "How It Works", href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { label: "Benefits", href: "/benefits" },
    { label: "Technology", href: "/technology" },
    { label: "Programs", href: "/programs" },
  ],
  support: [
    { label: "Pre-Order", href: "/preorder" },
    { label: "Member sign-in", href: "/login" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "mailto:support@seeknirvana.com" },
  ],
});

const socials = [
  { icon: Twitter, href: "https://x.com/SeekNirvanaHQ", label: "X" },
  { icon: Github, href: "https://github.com/SeekNirvana", label: "GitHub" },
  { icon: Mail, href: "mailto:info@seeknirvana.com", label: "Email" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/index.html";
  const links = getLinks(isHomePage);

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-navy-950">
                <img
                  src="/images/SeekNirvana_Logo.png"
                  alt="Seek Nirvana"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="text-2xl font-bold text-white">Seek Nirvana</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              The ancient practice of conscious dreaming, now guided by your
              body&apos;s own data.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-cyan hover:border-white/[0.15] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              {links.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2026 Seek Nirvana. All rights reserved.
            </p>
            <p className="text-white/30 text-sm flex items-center gap-2">
              <span className="text-gold">ॐ</span>
              <span>Made with mindfulness</span>
            </p>
          </div>
        </div>

        {/* Sanskrit Quote */}
        <div className="mt-8 text-center">
          <p className="text-gold/30 text-xs tracking-widest">
            तत् त्वम् असि — Thou Art That
          </p>
        </div>
      </div>
    </footer>
  );
}
