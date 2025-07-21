'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const nftCards = [
  {
    id: 1,
    title: "TCG ALPHA STARTER DECK",
    subtitle: "TRADING CARD GAME",
    image: "/api/placeholder/300/400",
    badge: "NEW",
    badgeColor: "bg-red-600"
  },
  {
    id: 2,
    title: "EP.2 - FRACTURED REFLECTIONS",
    subtitle: "MYTHOLOGY SERIES", 
    image: "/api/placeholder/300/400",
    badge: "NEW",
    badgeColor: "bg-red-600"
  },
  {
    id: 3,
    title: "EP.1 - THE WAITING MAN",
    subtitle: "MYTHOLOGY SERIES",
    image: "/api/placeholder/300/400",
    badge: null,
    badgeColor: ""
  },
  {
    id: 4,
    title: "SISTERS",
    subtitle: "STORY COLLECTION",
    image: "/api/placeholder/300/400", 
    badge: null,
    badgeColor: ""
  }
]

export default function NFTGrid() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section className="relative py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {nftCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="group cursor-pointer"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden bg-black border-2 border-gray-300 group-hover:border-black transition-colors duration-300">
                {/* Badge - AKIRA style */}
                {card.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-xs font-bold tracking-wider font-mono border border-white">
                    [{card.badge}]
                  </div>
                )}
                
                {/* Image Container */}
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
                  {/* AKIRA-style geometric donut */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 relative">
                      {/* シンプルサークル */}
                      <div className="w-full h-full border-4 border-white rounded-full"></div>
                      
                      {/* 中間のサークル */}
                      <div className="absolute inset-6 border-2 border-gray-400 rounded-full"></div>
                      
                      {/* 内側のサークル */}
                      <div className="absolute inset-10 border border-gray-600 rounded-full"></div>
                      
                      {/* 中央のサークル */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-gray-500 rounded-full"></div>
                      
                      {/* Scanning lines */}
                      <motion.div
                        className="absolute inset-0 border-t-2 border-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Digital markers */}
                      {[0, 90, 180, 270].map((angle, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Hover scanning effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [-100, 400]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Content - AKIRA style */}
                <div className="p-6 bg-white border-t-2 border-gray-300">
                  <div className="text-xs text-gray-500 font-mono mb-1 tracking-wider">
                    [{(index + 1).toString().padStart(3, '0')}]
                  </div>
                  <h3 className="font-black text-lg text-black mb-2 tracking-tight uppercase">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-mono tracking-wider uppercase">
                    {card.subtitle}
                  </p>
                  
                  {/* Status indicator */}
                  <div className="flex items-center mt-3 space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-600 font-mono">ACTIVE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Slider Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setCurrentSlide(dot)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === dot ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            />
          ))}
          <button className="ml-4 text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}