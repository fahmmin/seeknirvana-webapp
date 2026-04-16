'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
