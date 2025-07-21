'use client'

import { motion } from 'framer-motion'

export default function AkiraScanningOverlay() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 opacity-0"
      animate={{ 
        y: [-20, 600],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}