'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

export default function AnthologySection() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative py-20 bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Anthology Series */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="mb-4">
              <div className="text-xs text-gray-500 font-mono tracking-wider mb-2">
                [PROJECT_ID: 001]
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter uppercase">
                ANTHOLOGY<br />SERIES
              </h2>
            </div>
            <div className="border-l-4 border-black pl-6 mb-8">
              <p className="text-lg text-gray-800 mb-4 leading-relaxed max-w-md font-mono">
                &gt; ENTER_THE_GARDEN.exe
              </p>
              <p className="text-base text-gray-700 leading-relaxed max-w-md">
                オンラインアンソロジーシリーズ。電脳空間に構築された<br />
                デジタル庭園への扉が今、開かれる。
              </p>
            </div>
            <Link 
              href="/anthology"
              className="inline-flex items-center text-gray-900 font-medium hover:text-pink-600 transition-colors duration-300"
            >
              LEARN MORE
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-black border-2 border-gray-400 relative overflow-hidden">
              {/* AKIRA-style technical diagram */}
              <div className="absolute inset-0">
                {/* Grid background */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                />
                
                {/* Central geometric donut */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Main ring structure */}
                    <motion.div
                      className="w-48 h-48 border-4 border-white relative"
                      style={{ borderRadius: '50%' }}
                      animate={{ 
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute inset-12 border-2 border-gray-300" style={{ borderRadius: '50%' }} />
                      <div className="absolute inset-16 border border-gray-500" style={{ borderRadius: '50%' }} />
                    </motion.div>
                    
                    {/* Coordinate markers */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-8 bg-white"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '50% 100px',
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                    
                    {/* Data points */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-mono text-xs">
                      DATA_CORE
                    </div>
                  </div>
                </div>
                
                {/* Technical readouts */}
                <div className="absolute top-4 left-4 text-white font-mono text-xs">
                  [SCAN_ACTIVE]
                </div>
                <div className="absolute bottom-4 right-4 text-white font-mono text-xs">
                  STATUS: OK
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - World of Azuki equivalent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-32">
          {/* Left Side - Image */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square bg-black border-2 border-gray-400 relative overflow-hidden">
              {/* AKIRA cityscape representation */}
              <div className="absolute inset-0">
                {/* Digital city grid */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Geometric city structures */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Building blocks */}
                    {[
                      { width: 19.2, height: 64.6, left: 20, bottom: 20, duration: 3.2 },
                      { width: 19.1, height: 75.8, left: 45, bottom: 20, duration: 2.8 },
                      { width: 22.2, height: 34.3, left: 70, bottom: 20, duration: 3.6 },
                      { width: 16.0, height: 89.4, left: 95, bottom: 20, duration: 2.4 },
                      { width: 10.4, height: 50.5, left: 20, bottom: 50, duration: 3.1 },
                      { width: 23.1, height: 88.7, left: 45, bottom: 50, duration: 2.9 },
                      { width: 13.6, height: 32.5, left: 70, bottom: 50, duration: 3.4 },
                      { width: 17.1, height: 58.7, left: 95, bottom: 50, duration: 2.7 },
                      { width: 29.2, height: 60.0, left: 20, bottom: 80, duration: 3.3 },
                      { width: 25.9, height: 58.0, left: 45, bottom: 80, duration: 2.6 },
                      { width: 19.3, height: 40.9, left: 70, bottom: 80, duration: 3.5 },
                      { width: 18.8, height: 75.3, left: 95, bottom: 80, duration: 2.5 }
                    ].map((building, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-white"
                        style={{
                          width: `${building.width}px`,
                          height: `${building.height}px`,
                          left: `${building.left}%`,
                          bottom: `${building.bottom}%`
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: building.duration,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                    
                    {/* Central tower - representing Donut Bucho HQ */}
                    <motion.div
                      className="absolute left-1/2 bottom-1/3 transform -translate-x-1/2 w-8 h-24 bg-white border-2 border-gray-300"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(255,255,255,0.3)',
                          '0 0 30px rgba(255,255,255,0.8)',
                          '0 0 10px rgba(255,255,255,0.3)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Status displays */}
                <div className="absolute top-4 left-4 text-white font-mono text-xs">
                  [MAP_RENDER]
                </div>
                <div className="absolute bottom-4 right-4 text-white font-mono text-xs">
                  ZOOM: 100%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <div className="mb-4">
              <div className="text-xs text-gray-500 font-mono tracking-wider mb-2">
                [WORLD_MAP: ACTIVE]
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter uppercase">
                WORLD OF<br />DONUT BUCHO
              </h2>
            </div>
            <div className="border-l-4 border-black pl-6 mb-8">
              <p className="text-lg text-gray-800 mb-4 leading-relaxed max-w-md font-mono">
                &gt; NEURAL_NETWORK_ONLINE
              </p>
              <p className="text-base text-gray-700 leading-relaxed max-w-md">
                デジタル迷宮から現実世界まで。<br />
                相互接続されたドーナツ部長の多次元宇宙を探索せよ。
              </p>
            </div>
            <Link 
              href="/world"
              className="inline-flex items-center text-gray-900 font-medium hover:text-pink-600 transition-colors duration-300"
            >
              EXPLORE
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}