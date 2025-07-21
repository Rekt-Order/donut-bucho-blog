'use client'

import { motion } from 'framer-motion'

// Predefined particle positions to avoid hydration mismatches
const particles = [
  { left: 10.2, top: 15.6, opacity: 0.3, duration: 0.15, delay: 0.2 },
  { left: 25.8, top: 45.2, opacity: 0.2, duration: 0.25, delay: 0.8 },
  { left: 67.4, top: 22.1, opacity: 0.4, duration: 0.12, delay: 1.2 },
  { left: 85.1, top: 78.3, opacity: 0.35, duration: 0.18, delay: 0.5 },
  { left: 45.6, top: 65.8, opacity: 0.25, duration: 0.22, delay: 1.5 },
  { left: 12.9, top: 88.4, opacity: 0.3, duration: 0.16, delay: 0.9 },
  { left: 78.2, top: 35.7, opacity: 0.4, duration: 0.13, delay: 2.1 },
  { left: 33.5, top: 12.9, opacity: 0.2, duration: 0.28, delay: 0.3 },
  { left: 91.8, top: 52.6, opacity: 0.35, duration: 0.19, delay: 1.8 },
  { left: 58.7, top: 75.2, opacity: 0.25, duration: 0.21, delay: 0.7 },
  { left: 22.4, top: 38.9, opacity: 0.3, duration: 0.17, delay: 1.4 },
  { left: 74.1, top: 14.5, opacity: 0.4, duration: 0.14, delay: 0.6 },
  { left: 39.8, top: 82.7, opacity: 0.2, duration: 0.26, delay: 2.3 },
  { left: 86.3, top: 29.1, opacity: 0.35, duration: 0.18, delay: 1.1 },
  { left: 15.7, top: 61.4, opacity: 0.25, duration: 0.23, delay: 0.4 },
  { left: 62.9, top: 8.8, opacity: 0.3, duration: 0.15, delay: 1.7 },
  { left: 7.2, top: 44.6, opacity: 0.4, duration: 0.12, delay: 0.8 },
  { left: 48.5, top: 91.3, opacity: 0.2, duration: 0.27, delay: 2.0 },
  { left: 81.6, top: 18.2, opacity: 0.35, duration: 0.16, delay: 1.3 },
  { left: 29.3, top: 56.8, opacity: 0.25, duration: 0.24, delay: 0.9 }
]

export default function AkiraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Grid lines - cyberpunk style */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2"
        animate={{ y: [-100, 1000] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Digital noise particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatDelay: particle.delay
            }}
          />
        ))}
      </div>
    </div>
  )
}