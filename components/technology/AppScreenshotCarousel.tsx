"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const screens = [
  {
    src: "/images/app/photo_2026-04-27_14-33-38.jpg",
    alt: "SeekNirvana app screen 1",
    label: "Soul",
  },
  {
    src: "/images/app/photo_2026-04-27_14-33-39.jpg",
    alt: "SeekNirvana app screen 2",
    label: "Body",
  },
  {
    src: "/images/app/photo_2026-04-27_14-33-39 (2).jpg",
    alt: "SeekNirvana app screen 3",
    label: "Mind",
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
    <div className="mx-auto w-fit rounded-[2.5rem] border border-white/20 bg-navy-950/80 p-2 shadow-2xl">
      <div className="mx-auto w-full max-w-[270px] aspect-[9/18.5] overflow-hidden rounded-[2.5rem] border border-white/[0.15] bg-transparent">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeScreen.src}
            src={activeScreen.src}
            alt={activeScreen.alt}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-top object-cover"
          />
        </AnimatePresence>
      </div>


    </div>
  );
}
