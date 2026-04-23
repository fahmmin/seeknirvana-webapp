"use client";
import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaYoutube, FaEnvelope, FaTelegram } from "react-icons/fa6";
import { GiRing } from "react-icons/gi";
import { footerGroups, footerSocials } from "../content/homepage";

const iconMap: Record<string, any> = {
  X: FaXTwitter,
  GitHub: FaGithub,
  YouTube: FaYoutube,
  Telegram: FaTelegram,
  Email: FaEnvelope,
};

export const Footer = () => {
  return (
    <footer id="footer" className="relative overflow-hidden bg-navy-950 px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <div className="mb-4">
              <img 
                src="/SeekNirvana-logo.png" 
                alt="Seek Nirvana" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/45">
              The ancient practice of conscious dreaming, now guided by your body&apos;s own data. Experience the intersection of ancient wisdom and cutting-edge technology.
            </p>
            <div className="flex items-center gap-4">
              {footerSocials.map((social) => {
                const Icon = iconMap[social.label];
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full glass-card text-white/50 transition-all duration-300 hover:text-cyan hover:border-cyan/30"
                    aria-label={social.label}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Explore</h4>
            <ul className="space-y-3">
              {footerGroups.explore.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/45 transition-colors hover:text-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Support</h4>
            <ul className="space-y-3">
              {footerGroups.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/45 transition-colors hover:text-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/25">
              © 2026 Seek Nirvana. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-sm text-white/25">
              <GiRing className="h-4 w-4 text-gold/50" />
              <span>Made with mindfulness</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs uppercase tracking-widest text-gold/30">
            तत् त्वम् असि — Thou Art That
          </p>
        </div>
      </div>
    </footer>
  );
};
