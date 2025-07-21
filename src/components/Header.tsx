'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass backdrop-blur-md bg-opacity-80' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="text-3xl font-black gradient-text hover:scale-105 transition-transform duration-300">
              ぬるぺでぃあ
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10">ホーム</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link 
              href="/about" 
              className="relative text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            
            {/* CTA Button */}
            <div className="relative">
              <button className="glass px-6 py-2 rounded-full text-white font-medium hover-lift pulse-glow group">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center glass rounded-lg"
          >
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></div>
            <div className={`w-5 h-0.5 bg-white absolute transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}></div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass rounded-2xl p-6 space-y-4">
            <Link 
              href="/" 
              className="block text-white hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <button className="w-full glass px-6 py-3 rounded-full text-white font-medium hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-purple-600/20 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Header glow effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
    </header>
  )
}