'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DonutFooter() {
  const footerLinks = {
    'ABOUT US': [
      { name: 'PROJECTS', href: '/projects' },
      { name: 'TEAM', href: '/team' },
      { name: 'CAREERS', href: '/careers' },
      { name: 'BLOG', href: '/blog' },
      { name: 'COMMUNITIES', href: '/communities' }
    ],
    'WORLD': [
      { name: 'LORE', href: '/lore' },
      { name: 'GARDEN', href: '/garden' }
    ],
    'DONUT': [
      { name: 'COLLECTION', href: '/collection' },
      { name: 'TRAITS', href: '/traits' }
    ],
    'OTHER': [
      { name: 'DONUTS', href: '/donuts' },
      { name: 'LICENSE', href: '/license' },
      { name: 'TERMS & CONDITIONS', href: '/terms' },
      { name: 'HELP', href: '/help' }
    ],
    'TECHNOLOGY': [
      { name: 'API', href: '/api' },
      { name: 'ART', href: '/art' },
      { name: 'METADATA', href: '/metadata' }
    ]
  }

  const socialIcons = [
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'TikTok', icon: '🎵', href: '#' }
  ]

  return (
    <footer className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Left Side - Logo and Character */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              {/* シンプルサークルロゴ */}
              <div className="w-12 h-12 relative">
                {/* 外側のサークル */}
                <div className="w-full h-full border-2 border-white rounded-full"></div>
                
                {/* 中間のサークル */}
                <div className="absolute inset-2 border border-gray-400 rounded-full"></div>
                
                {/* 内側のサークル */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-gray-600 rounded-full"></div>
                
                {/* 回転スキャンライン */}
                <motion.div
                  className="absolute inset-0 border-t-2 border-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-black text-white">DONUT BUCHO V2.0</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Built for the building list.
            </p>

            {/* シンプルサークルイラストレーション */}
            <div className="relative w-32 h-32 mx-auto lg:mx-0">
              <motion.div
                className="w-full h-full relative"
                animate={{ 
                  rotate: [0, 1, -1, 0],
                  scale: [1, 1.005, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* 外側のサークル */}
                <div className="w-full h-full border-4 border-white rounded-full"></div>
                
                {/* 中間のサークル */}
                <div className="absolute inset-4 border-2 border-gray-400 rounded-full"></div>
                
                {/* 内側のサークル */}
                <div className="absolute inset-8 border border-gray-600 rounded-full"></div>
                
                {/* 中央のサークル */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-gray-500 rounded-full"></div>
                
                {/* 回転スキャンライン */}
                <motion.div
                  className="absolute inset-0 border-t-4 border-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                
                {/* パルス効果 */}
                <motion.div
                  className="absolute inset-0 border border-white/20 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.05, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-sm tracking-wider mb-4 text-gray-300">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm font-medium">DONUTS</span>
              <div className="flex space-x-4">
                {socialIcons.map((social) => (
                  <Link 
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2021 BOSS-DONUT. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* AKIRA風背景装飾 */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <div className="w-full h-full border border-white/20 rounded-full">
          <div className="absolute inset-8 border border-white/10 rounded-full" />
          <div className="absolute inset-16 border border-white/5 rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 pointer-events-none">
        <div className="w-full h-full border border-white/20 rounded-full">
          <div className="absolute inset-6 border border-white/10 rounded-full" />
          <div className="absolute inset-12 border border-white/5 rounded-full" />
        </div>
      </div>
    </footer>
  )
}