"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export const WordsPullUpMultiStyle = ({ segments, className = "" }: WordsPullUpMultiStyleProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const easing = [0.16, 1, 0.3, 1] as const;

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
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wordIdx) => (
          <motion.span
            key={`${segIdx}-${wordIdx}`}
            variants={itemVariants}
            className={`inline-block mr-[0.2em] ${segment.className || ""}`}
          >
            {word}
          </motion.span>
        ));
      })}
    </motion.div>
  );
};
