'use client'

import { motion } from 'framer-motion'

interface BreathingCircleProps {
  size?: number
  className?: string
}

export default function BreathingCircle({
  size = 200,
  className = '',
}: BreathingCircleProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0, 212, 255, 0.2)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2.67,
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan/10 to-jade/10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
