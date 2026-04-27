'use client'

import { motion } from 'framer-motion'

interface GlowEffectProps {
  color?: string
  size?: number
  className?: string
}

export default function GlowEffect({
  color = 'rgba(0, 212, 255, 0.3)',
  size = 300,
  className = '',
}: GlowEffectProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
