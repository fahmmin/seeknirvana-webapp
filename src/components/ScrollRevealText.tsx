"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface AnimatedLetterProps {
  character: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedLetter = ({ character, progress, range }: AnimatedLetterProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {character}
    </motion.span>
  );
};

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export const ScrollRevealText = ({ text, className = "" }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = text.split("");
  const totalChars = characters.length;

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, i) => {
        const charProgress = i / totalChars;
        const range: [number, number] = [charProgress - 0.1, charProgress + 0.05];
        return (
          <AnimatedLetter
            key={i}
            character={char === " " ? "\u00A0" : char}
            progress={scrollYProgress}
            range={range}
          />
        );
      })}
    </p>
  );
};
