"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="mx-auto w-fit rounded-[2.5rem] border border-white/20 bg-navy-950/80 p-2 shadow-2xl">
      <div className="mx-auto w-full max-w-[270px] aspect-[9/18.5] overflow-hidden rounded-[2.5rem] border border-white/[0.15] bg-transparent relative">
        {screens.map((screen, index) => (
          <motion.img
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            initial={false}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-top object-cover"
          />
        ))}
      </div>
    </div>
  );
}
