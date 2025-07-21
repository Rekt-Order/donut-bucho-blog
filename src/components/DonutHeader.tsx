'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DonutHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isSocialsMenuOpen, setIsSocialsMenuOpen] = useState(false)
  const [isBuyMenuOpen, setIsBuyMenuOpen] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const socialsMenuRef = useRef<HTMLDivElement>(null)
  const buyMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false)
      }
      if (socialsMenuRef.current && !socialsMenuRef.current.contains(event.target as Node)) {
        setIsSocialsMenuOpen(false)
      }
      if (buyMenuRef.current && !buyMenuRef.current.contains(event.target as Node)) {
        setIsBuyMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  }

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  }

  const moreMenuItems = [
    { 
      name: 'COMMUNITIES', 
      href: '/communities',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-2.49 7.5H14v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-4c-.83 0-1.54.5-1.84 1.22L6.5 21h3l1.8-5.4.7.4V22h3v-5zM6.5 10c.83 0 1.5-.67 1.5-1.5S7.33 7 6.5 7 5 7.67 5 8.5 5.67 10 6.5 10zM4 22v-6h2.5L4.96 8.63A1.5 1.5 0 0 0 3.54 8H1c-.8 0-1.54.37-2 1L1.51 16.5H4V22h4z"/>
        </svg>
      )
    },
    { 
      name: 'GALLERY', 
      href: '/gallery',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      )
    },
    { 
      name: 'BLOG', 
      href: '/blog',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    }
  ]

  const socialsMenuItems = [
    { 
      name: 'INSTAGRAM', 
      href: '/instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'X.COM', 
      href: '/x',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'YOUTUBE', 
      href: '/youtube',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: 'TIKTOK', 
      href: '/tiktok',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    { 
      name: 'JOIN DISCORD', 
      href: '/discord',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
      )
    }
  ]

  const buyMenuItems = [
    { 
      name: 'Wearable DONUTS', 
      href: '/shop/wearable-donuts',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: 'BOSS-DONUTS', 
      href: '/shop/boss-donuts',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    { 
      name: 'LINEスタンプ', 
      href: '/shop/line-stamps',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 12c.667 0 1.208-.539 1.208-1.208 0-.667-.541-1.208-1.208-1.208-.669 0-1.208.541-1.208 1.208 0 .669.539 1.208 1.208 1.208zM7.292 12c.667 0 1.208-.539 1.208-1.208 0-.667-.541-1.208-1.208-1.208-.669 0-1.208.541-1.208 1.208 0 .669.539 1.208 1.208 1.208z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.5 11.5c0 1.381-1.119 2.5-2.5 2.5h-6c-1.381 0-2.5-1.119-2.5-2.5v-3c0-1.381 1.119-2.5 2.5-2.5h6c1.381 0 2.5 1.119 2.5 2.5v3z"/>
        </svg>
      )
    },
    { 
      name: 'カプセルトイ', 
      href: '/shop/capsule-toys',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      )
    },
    { 
      name: 'グッズ', 
      href: '/shop/goods',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
      )
    }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* シンプルサークルロゴ */}
              <div className="w-10 h-10 relative">
                {/* 外側のサークル */}
                <div className="w-full h-full border-2 border-white rounded-full"></div>
                
                {/* 中間のサークル */}
                <div className="absolute inset-2 border border-gray-400 rounded-full"></div>
                
                {/* 内側のサークル */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-gray-600 rounded-full"></div>
                
                {/* 回転スキャンライン */}
                <motion.div
                  className="absolute inset-0 border-t-2 border-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="flex flex-col">
                <div className="text-lg font-black text-white tracking-tighter leading-none">
                  DONUT BUCHO V2.0
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: 'ABOUT', href: '/about' },
              { name: 'BUCHO', href: '/bucho' },
              { name: 'MAP', href: '/map' },
              { name: '読み物', href: '/articles' }
            ].map((item) => (
              <motion.div key={item.name} variants={linkVariants} whileHover="hover">
                <Link 
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* MORE Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <motion.button
                variants={linkVariants} 
                whileHover="hover"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase flex items-center space-x-1"
              >
                <span>MORE</span>
                <motion.svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isMoreMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-50"
                  >
                    {moreMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* SOCIALS Dropdown */}
            <div className="relative" ref={socialsMenuRef}>
              <motion.button
                variants={linkVariants} 
                whileHover="hover"
                onClick={() => setIsSocialsMenuOpen(!isSocialsMenuOpen)}
                className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase flex items-center space-x-1"
              >
                <span>SOCIALS</span>
                <motion.svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isSocialsMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isSocialsMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-50"
                  >
                    {socialsMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsSocialsMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* BUY Dropdown */}
            <div className="relative" ref={buyMenuRef}>
              <motion.button
                variants={linkVariants} 
                whileHover="hover"
                onClick={() => setIsBuyMenuOpen(!isBuyMenuOpen)}
                className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase flex items-center space-x-1"
              >
                <span>BUY</span>
                <motion.svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isBuyMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isBuyMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full right-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-50"
                  >
                    {buyMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsBuyMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* GET NFT Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-white text-black px-4 py-2 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300">
                GET NFT
              </button>
            </motion.div>
            
            {/* CONNECT Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="border border-white text-white px-4 py-2 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
                CONNECT
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
              className="w-5 h-0.5 bg-white absolute"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white absolute"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
              className="w-5 h-0.5 bg-white absolute"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-6 mt-4 space-y-4"
              >
                {[
                  { name: 'ABOUT', href: '/about' },
                  { name: 'BUCHO', href: '/bucho' },
                  { name: 'MAP', href: '/map' },
                  { name: '読み物', href: '/articles' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <Link 
                      href={item.href}
                      className="block text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* MORE Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="text-white/50 text-xs font-mono mb-2 tracking-wider">MORE</div>
                  <div className="space-y-2 pl-4">
                    {moreMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      >
                        <Link 
                          href={item.href}
                          className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* SOCIALS Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <div className="text-white/50 text-xs font-mono mb-2 tracking-wider">SOCIALS</div>
                  <div className="space-y-2 pl-4">
                    {socialsMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.9 + (index * 0.1) }}
                      >
                        <Link 
                          href={item.href}
                          className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* BUY Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                >
                  <div className="text-white/50 text-xs font-mono mb-2 tracking-wider">BUY</div>
                  <div className="space-y-2 pl-4">
                    {buyMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.3 + (index * 0.1) }}
                      >
                        <Link 
                          href={item.href}
                          className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                  className="space-y-3"
                >
                  <button className="w-full bg-white text-black px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider">
                    GET NFT
                  </button>
                  <button className="w-full border border-white text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider">
                    CONNECT
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.header>
  )
}