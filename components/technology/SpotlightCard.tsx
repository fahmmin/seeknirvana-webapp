"use client";

import { useEffect, useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card relative overflow-hidden rounded-3xl ${className}`}
      style={
        {
          "--spotlight-x": "-9999px",
          "--spotlight-y": "-9999px",
        } as React.CSSProperties
      }
    >
      {children}

      <style jsx>{`
        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            480px circle at var(--spotlight-x) var(--spotlight-y),
            rgba(0, 212, 255, 0.07) 0%,
            rgba(0, 168, 107, 0.04) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.2s ease;
        }
        .spotlight-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(
            320px circle at var(--spotlight-x) var(--spotlight-y),
            rgba(0, 212, 255, 0.18) 0%,
            transparent 60%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          padding: 1px;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
