"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const screens = [
  {
    src: "/images/app/app_home.jpeg",
    alt: "SeekNirvana app home screen",
    label: "Home",
  },
  {
    src: "/images/app/ios_app.png",
    alt: "SeekNirvana iOS app screen",
    label: "iOS",
  },
  {
    src: "/images/app/android_app.png",
    alt: "SeekNirvana Android app screen",
    label: "Android",
  },
];

export default function AppScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % screens.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  const activeScreen = screens[activeIndex];

  return (
    <div className="rounded-[1.75rem] border border-white/[0.1] bg-navy-950/80 p-3">
      <div className="mb-3 flex items-center justify-between px-2 pt-1">
        <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">
          {activeScreen.label}
        </span>
        <span className="h-1.5 w-10 rounded-full bg-white/10" />
      </div>

      <div className="mx-auto w-full max-w-[170px] overflow-hidden rounded-[1.4rem] border border-white/[0.1]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeScreen.src}
            src={activeScreen.src}
            alt={activeScreen.alt}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35 }}
            className="w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {screens.map((screen, index) => (
          <button
            key={screen.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "w-6 bg-cyan" : "w-2 bg-white/25"
            }`}
            aria-label={`Show ${screen.label} screenshot`}
          />
        ))}
      </div>
    </div>
  );
}
