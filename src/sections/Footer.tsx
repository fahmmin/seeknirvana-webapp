"use client";
import { motion } from "framer-motion";
import { footerGroups, footerSocials } from "../content/homepage";

export const Footer = () => {
  return (
    <footer id="footer" className="relative overflow-hidden bg-navy-950 px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="devanagari-text flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-xl leading-none text-white">
                ॐ
              </div>
              <span className="text-xl font-medium text-white sm:text-2xl">Seek Nirvana</span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/45">
              The ancient practice of conscious dreaming, now guided by your body&apos;s own data.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {footerSocials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm text-white/50 backdrop-blur-md transition-colors hover:text-white hover:bg-white/[0.08] hover:border-white/20"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Explore</h4>
            <ul className="space-y-3">
              {footerGroups.explore.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/45 transition-colors hover:text-white">
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
                  <a href={link.href} className="text-sm text-white/45 transition-colors hover:text-white">
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
              <span className="devanagari-text text-jade">ॐ</span>
              <span>Made with mindfulness</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="devanagari-text text-sm tracking-[0.04em] text-gold/45 sm:text-base">
            तत् त्वम् असि — Thou Art That
          </p>
        </div>
      </div>
    </footer>
  );
};
