'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/lib/sanity'

interface AkiraArticleCardProps {
  post: BlogPost
  index: number
}

export default function AkiraArticleCard({ post, index }: AkiraArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/articles/${post.slug.current}`}>
        <div className="relative overflow-hidden bg-black border-2 border-gray-700 group-hover:border-white transition-colors duration-300">
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

          {/* Image area */}
          <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
            {post.mainImage ? (
              <img
                src={urlFor(post.mainImage).width(400).height(225).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
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
            )}
            
            {/* Record ID */}
            <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-mono border border-gray-600">
              [{(index + 1).toString().padStart(3, '0')}]
            </div>
          </div>
          
          {/* Content - AKIRA style */}
          <div className="p-4 bg-black border-t-2 border-gray-700">
            <div className="text-xs text-gray-500 font-mono mb-2 tracking-wider">
              [RECORD_TYPE: ARTICLE]
            </div>
            
            {/* Categories Display */}
            {post.categories && post.categories.length > 0 && (() => {
              // Remove duplicate categories by title
              const uniqueCategories = post.categories.filter((category, index, arr) => 
                category.title && arr.findIndex(c => c.title === category.title) === index
              )
              
              return (
                <div className="flex flex-wrap gap-1 mb-3">
                  {uniqueCategories.slice(0, 3).map((category, catIndex) => (
                    <span
                      key={`${category._id || 'cat'}-${catIndex}`}
                      className="text-xs text-gray-400 border border-gray-600 px-2 py-1 font-mono tracking-wider bg-gray-800/50"
                    >
                      {category.title?.toUpperCase()}
                    </span>
                  ))}
                  {uniqueCategories.length > 3 && (
                    <span className="text-xs text-gray-500 font-mono">
                      +{uniqueCategories.length - 3}
                    </span>
                  )}
                </div>
              )
            })()}
            
            <h3 className="font-black text-base text-white mb-3 tracking-tight uppercase leading-tight line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {post.title}
            </h3>
            
            <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Metadata */}
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-500 font-mono">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\//g, '.')}
              </div>
              
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
}