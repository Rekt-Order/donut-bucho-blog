'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
// import Image from 'next/image' // Using img tag for better performance in this carousel
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/lib/sanity'

interface HorizontalArticleGridProps {
  posts: BlogPost[]
}

export default function HorizontalArticleGrid({ posts }: HorizontalArticleGridProps) {
  // Create multiple rows with different scroll speeds for parallax effect
  const chunkedPosts = []
  const chunkSize = Math.max(6, Math.ceil(posts.length / 2)) // Minimum 6 items per row
  
  for (let i = 0; i < posts.length; i += chunkSize) {
    chunkedPosts.push(posts.slice(i, i + chunkSize))
  }
  
  // Ensure we have at least 2 rows for visual effect
  if (chunkedPosts.length === 1 && posts.length > 3) {
    const midPoint = Math.ceil(posts.length / 2)
    chunkedPosts[0] = posts.slice(0, midPoint)
    chunkedPosts.push(posts.slice(midPoint))
  }

  const ArticleCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
      className="flex-shrink-0 w-80 h-60 relative group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/articles/${post.slug.current}`}>
        <div className="relative w-full h-full overflow-hidden bg-black border-2 border-gray-600 group-hover:border-white transition-colors duration-300">
          {/* AKIRA-style background */}
          <div className="absolute inset-0">
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Scanning line effect */}
            <motion.div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                y: [-10, 250]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Background Image */}
          {post.mainImage ? (
            <img
              src={urlFor(post.mainImage).width(400).height(300).url()}
              alt={post.mainImage.alt || post.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 relative">
                  {/* シンプルサークル */}
                  <div className="w-full h-full border-2 border-white rounded-full"></div>
                  
                  {/* 中間のサークル */}
                  <div className="absolute inset-3 border border-gray-400 rounded-full"></div>
                  
                  {/* 内側のサークル */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-gray-600 rounded-full"></div>
                  
                  {/* スキャンライン */}
                  <motion.div
                    className="absolute inset-0 border-t-2 border-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Record ID */}
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-mono border border-gray-500">
            [{(index + 1).toString().padStart(3, '0')}]
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-2">
                <span className="inline-block bg-gray-800 text-gray-300 px-2 py-1 text-xs font-mono border border-gray-600 uppercase tracking-wider">
                  {post.categories[0].title}
                </span>
              </div>
            )}
            
            {/* Title */}
            <h3 className="text-white font-black text-base mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-tight leading-tight">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-gray-400 text-xs line-clamp-2 mb-2 font-mono leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Metadata */}
            <div className="flex items-center justify-between text-xs">
              <time className="text-gray-500 font-mono">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\//g, '.')}
              </time>
              
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="text-gray-500 font-mono">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  if (posts.length === 0) {
    return (
      <section className="py-20 bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="w-full h-full border-4 border-white rounded-full relative">
                <div className="absolute inset-4 border-2 border-gray-400 rounded-full" />
              </div>
              <motion.div
                className="absolute inset-0 border-t-4 border-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="text-xs text-gray-500 font-mono mb-4">
              [NO_RECORDS_FOUND]
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">システム準備中</h3>
            <p className="text-gray-400">新しいデータレコードをお楽しみに</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-900 border-t border-gray-700 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="text-xs text-gray-500 font-mono tracking-wider mb-4">
            [ARCHIVE_SYSTEM_ONLINE]
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            DATA ARCHIVE
          </h2>
          <div className="border-t border-gray-600 w-32 mx-auto mb-6" />
          <p className="text-lg text-gray-400 mb-8 font-mono">
            &gt; NEURAL_NETWORK_RECORDS.db
          </p>
          <Link 
            href="/articles"
            className="inline-flex items-center bg-white text-black px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300 border-2 border-white"
          >
            ACCESS_ALL_RECORDS
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="space-y-8">
        {chunkedPosts.map((chunk, rowIndex) => (
          <div key={rowIndex} className="relative">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: rowIndex % 2 === 0 ? [-20, -2000] : [-2000, -20]
              }}
              transition={{
                duration: chunk.length * 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: 'max-content'
              }}
            >
              {/* Duplicate the content for seamless loop */}
              {[...chunk, ...chunk].map((post, index) => (
                <ArticleCard 
                  key={`${post._id}-${index}`} 
                  post={post} 
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* VIEW ALL ARTICLES button */}
      <div className="text-center mt-16">
        <Link 
          href="/articles"
          className="inline-flex items-center bg-white text-black px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300 border-2 border-white"
        >
          VIEW ALL ARTICLES
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}