"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false }: WordsPullUpProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const easing = [0.16, 1, 0.3, 1] as const;

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block mr-[0.2em] relative"
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
             <span className="absolute top-[-0.05em] -right-[0.3em] text-[0.35em] align-top">
               *
             </span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};
