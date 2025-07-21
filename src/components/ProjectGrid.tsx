'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  { id: 1, title: "BEANZ Official", color: "from-blue-400 to-blue-600" },
  { id: 2, title: "Garden Stories", color: "from-green-400 to-green-600" },
  { id: 3, title: "Donut Chronicles", color: "from-yellow-400 to-orange-500" },
  { id: 4, title: "Night Mode", color: "from-purple-500 to-indigo-600" },
  { id: 5, title: "Community Art", color: "from-pink-400 to-red-500" },
  { id: 6, title: "DONUT BUCHO", color: "from-red-500 to-pink-600" },
  { id: 7, title: "Collaborations", color: "from-teal-400 to-cyan-500" },
  { id: 8, title: "BEANZ Universe", color: "from-indigo-400 to-purple-600" },
  { id: 9, title: "Future Projects", color: "from-gray-400 to-gray-600" }
]

export default function ProjectGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="relative py-20 bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-6">
        {/* Header - AKIRA style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs text-gray-500 font-mono tracking-wider mb-4">
            [DATABASE_ACCESS_GRANTED]
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            ALL PROJECTS
          </h2>
          <div className="border-t border-gray-600 w-32 mx-auto mb-4" />
          <p className="text-gray-400 text-lg font-mono">
            &gt; EXPANDING_DIGITAL_UNIVERSE.exe
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-square border-2 border-gray-600 bg-black overflow-hidden group-hover:border-white transition-colors duration-300">
                {/* AKIRA-style background */}
                <div className="absolute inset-0">
                  {/* Grid pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '15px 15px'
                    }}
                  />
                  
                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [-10, 200]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {/* Project ID */}
                  <div className="text-xs text-gray-400 font-mono">
                    [{(index + 1).toString().padStart(3, '0')}]
                  </div>
                  
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-white font-black text-xs md:text-sm lg:text-base uppercase tracking-wide leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-400 font-mono">LIVE</span>
                    </div>
                    {index % 3 === 0 && (
                      <motion.div
                        className="w-4 h-4 border border-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ borderRadius: '50%' }}
                      >
                        <div className="absolute inset-1 border border-gray-400" style={{ borderRadius: '50%' }} />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/projects"
            className="inline-flex items-center text-white border border-white/30 px-8 py-3 rounded-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            VIEW ALL PROJECTS
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}