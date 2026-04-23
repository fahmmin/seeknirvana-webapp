"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const navItems = [
  { label: "Why It Matters", href: "/benefits" },
  { label: "How It Works", href: "/programs/5-day-sleep-cohort#curriculum" },
  { label: "Benefits", href: "/benefits" },
  { label: "Technology", href: "/technology" },
  { label: "Programs", href: "/programs" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { address, status } = useAccount();

  // Treat reconnecting sessions as signed in to avoid CTA flicker.
  const isSignedIn = Boolean(address) && (status === "connected" || status === "reconnecting");
  const ctaHref = isSignedIn ? "/dashboard" : "/programs/5-day-sleep-cohort/apply";
  const ctaLabel = isSignedIn ? "Dashboard" : "Join Program";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/85 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 md:py-1.5">
        {/* Brand */}
        <Link href="/" className="group flex items-center">
          <img
            src="/SeekNirvana-logo.png"
            alt="Seek Nirvana"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/preorder"
            className="rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            Pre-order
          </Link>
          <Link
            href={ctaHref}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-jade px-4 py-2 text-sm font-medium text-navy-950 transition-all hover:brightness-110 glow-jade-sm"
          >
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06] text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-navy-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
                <Link
                  href="/preorder"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm text-white/60 border border-white/[0.1] transition-colors hover:text-white"
                >
                  Pre-order
                </Link>
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-jade px-6 py-3 text-sm font-medium text-navy-950 glow-jade-sm"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
