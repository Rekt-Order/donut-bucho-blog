'use client'

import { motion } from 'framer-motion'

interface AkiraGlitchTextProps {
  children: string
  className?: string
}

export default function AkiraGlitchText({ children, className = "" }: AkiraGlitchTextProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 text-red-500 opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          x: [0, 2, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 6.5
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}