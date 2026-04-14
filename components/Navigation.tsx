"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const homeNavLinks = [
  { label: "Why It Matters", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "/benefits" },
  { label: "Technology", href: "/technology" },
  { label: "Programs", href: "/programs" },
  { label: "Member hub", href: "/dashboard" },
];

const preorderNavLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Benefits", href: "/benefits" },
  { label: "Technology", href: "/technology" },
  { label: "Programs", href: "/programs" },
  { label: "Member hub", href: "/dashboard" },
];

const detailNavLinks = [
  { label: "Home", href: "/" },
  { label: "Benefits", href: "/benefits" },
  { label: "Technology", href: "/technology" },
  { label: "Programs", href: "/programs" },
  { label: "Member hub", href: "/dashboard" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isConnected, status } = useAccount();
  const isProductPage = pathname?.includes("/product");
  const isProgramPage = pathname?.startsWith("/programs");
  const isSignedIn = isConnected && status === "connected";
  const ctaHref = isSignedIn ? "/dashboard" : "/programs";
  const ctaLabel = isSignedIn ? "Dashboard" : "Join Program";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get the correct links based on current page
  const isPreorderPage = pathname?.includes("/preorder");
  const isDetailPage =
    pathname === "/benefits" ||
    pathname === "/technology" ||
    pathname === "/dashboard" ||
    pathname?.startsWith("/programs");
  const navLinks = isPreorderPage
    ? preorderNavLinks
    : isDetailPage
      ? detailNavLinks
      : homeNavLinks;

  // Logo href - use root path for custom domain
  const getLogoHref = () => {
    return "/";
  };

  // Product page link
  const getProductHref = () => {
    if (isProductPage) return "/";
    return "/product";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-nirvana-dark/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href={getLogoHref()} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-nirvana-dark">
                <img
                  src="/images/SeekNirvana_Logo.png"
                  alt="Seek Nirvana"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                Seek Nirvana
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-nirvana-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {isPreorderPage && (
                <a
                  href="/"
                  className="text-sm text-white/70 hover:text-nirvana-cyan transition-colors"
                >
                  Home
                </a>
              )}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href={ctaHref}
                className="rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-5 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-nirvana-jade/20"
              >
                {ctaLabel}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-nirvana-dark/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl text-white/80 hover:text-nirvana-cyan py-2 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                {isPreorderPage && (
                  <motion.a
                    href="/"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl text-white/80 hover:text-nirvana-cyan py-2 transition-colors"
                  >
                    Home
                  </motion.a>
                )}
                <motion.a
                  href={ctaHref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 rounded-xl bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-6 py-3 text-center font-medium text-white"
                >
                  {ctaLabel}
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
