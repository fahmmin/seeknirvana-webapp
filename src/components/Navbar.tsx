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
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className={`glass-card rounded-full px-6 py-2.5 flex items-center justify-between border-white/10 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl' : ''}`}>
          {/* Brand */}
          <Link href="/" className="flex items-center group">
            <img
              src="/SeekNirvana-logo.png"
              alt="Seek Nirvana"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[13px] font-medium transition-colors ${
                  pathname === item.href ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/login"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href={ctaHref}
              className="glass-card rounded-full px-6 py-2.5 text-white text-sm font-medium hover:bg-jade/20 transition-all border-jade/30 bg-jade/10 flex items-center gap-2 group shadow-[0_0_20px_rgba(0,168,107,0.1)]"
            >
              <span className="text-jade-light font-bold tracking-tight">{ctaLabel}</span>
              <ArrowRight className="h-4 w-4 text-jade-light transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/80 hover:text-white p-1"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Dark Vignette Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] pointer-events-auto lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-4 lg:hidden"
              >
                <div className="glass-card rounded-3xl p-5 border-white/10 flex flex-col gap-5">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-white/70 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="h-px bg-white/5 w-full" />
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-white/60 text-center py-2"
                    >
                      Login
                    </Link>
                    <Link
                      href={ctaHref}
                      onClick={() => setMobileOpen(false)}
                      className="glass-card rounded-full py-3 text-center text-jade-light font-bold border-jade/30 bg-jade/10"
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
