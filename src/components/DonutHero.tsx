'use client'

import { motion } from 'framer-motion'

export default function DonutHero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* AKIRA-style Background */}
      <div className="absolute inset-0">
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
          {[
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
            { left: 29.3, top: 56.8, opacity: 0.25, duration: 0.24, delay: 0.9 },
            { left: 93.1, top: 67.4, opacity: 0.3, duration: 0.19, delay: 1.6 },
            { left: 17.5, top: 32.8, opacity: 0.4, duration: 0.13, delay: 0.7 },
            { left: 55.9, top: 19.6, opacity: 0.2, duration: 0.25, delay: 2.4 },
            { left: 72.3, top: 84.1, opacity: 0.35, duration: 0.17, delay: 1.0 },
            { left: 38.7, top: 59.3, opacity: 0.25, duration: 0.21, delay: 0.6 },
            { left: 84.2, top: 27.9, opacity: 0.3, duration: 0.16, delay: 1.9 },
            { left: 19.8, top: 73.5, opacity: 0.4, duration: 0.14, delay: 0.4 },
            { left: 66.4, top: 41.2, opacity: 0.2, duration: 0.28, delay: 2.2 },
            { left: 41.6, top: 85.7, opacity: 0.35, duration: 0.18, delay: 1.4 },
            { left: 76.8, top: 53.1, opacity: 0.25, duration: 0.23, delay: 0.8 }
          ].map((particle, i) => (
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
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20" />
      </div>

      {/* AKIRA-style Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Japanese title - AKIRA style */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="text-sm text-gray-400 mb-4 tracking-[0.3em] font-mono">
            PROJECT since 2021
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter relative">
            ドーナツ部長
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
                repeatDelay: 6.8
              }}
            >
              ドーナツ部長
            </motion.div>
          </h1>
          <div className="text-3xl md:text-5xl text-gray-300 mb-8 font-light tracking-[0.2em]">
            DONUT BUCHO
          </div>
        </motion.div>

        {/* Cyberpunk tagline */}
        <motion.div 
          variants={itemVariants}
          className="mb-12"
        >
          <div className="text-xl md:text-2xl text-gray-400 mb-4 font-mono tracking-wide">
            &gt; SYSTEM INITIALIZATION COMPLETE
          </div>
          <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            ドーナツの穴を可視化し、保有する。<br />
            <span className="text-gray-400">部長を所有しよう。</span>
          </p>
        </motion.div>

        {/* Status display - AKIRA HUD style */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
        >
          {[
            { label: 'POWER', value: '100%', color: 'text-green-400' },
            { label: 'STATUS', value: 'ACTIVE', color: 'text-blue-400' },
            { label: 'MISSION', value: 'READY', color: 'text-yellow-400' }
          ].map((stat, index) => (
            <div key={stat.label} className="border border-gray-700 bg-black/50 p-4 relative group">
              <div className="text-xs text-gray-500 font-mono mb-1">{stat.label}</div>
              <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* Action buttons - AKIRA style */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="relative bg-white text-black px-8 py-4 font-bold text-lg tracking-wide hover:bg-gray-200 transition-colors duration-300 group overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">ENTER SYSTEM</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.button>
          
          <motion.button
            className="border-2 border-gray-500 text-gray-300 px-8 py-4 font-bold text-lg tracking-wide hover:border-white hover:text-white transition-colors duration-300 bg-black/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW ARCHIVES
          </motion.button>
        </motion.div>

      </motion.div>

      {/* AKIRA-style lighting */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl" />
      </div>
    </section>
  )
}