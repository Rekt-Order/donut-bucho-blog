'use client'

import { useState, useMemo } from 'react'
import { BlogPost, Category } from '@/types/blog'
import AkiraArticleCard from './AkiraArticleCard'
import AkiraSpinner from './AkiraSpinner'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticlesFilterProps {
  posts: BlogPost[]
  categories: Category[]
}

export default function ArticlesFilter({ posts, categories }: ArticlesFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filter posts based on selected category (supports multiple categories per post)
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts
    }
    
    return posts.filter(post => {
      // Handle posts without categories
      if (!post.categories || post.categories.length === 0) {
        return false
      }
      
      // Remove duplicate categories first, then check if any match the selected category
      const uniqueCategories = post.categories.filter((category, index, arr) => 
        category.slug?.current && arr.findIndex(c => c.slug?.current === category.slug?.current) === index
      )
      
      return uniqueCategories.some(category => {
        if (!category?.slug?.current) return false
        return category.slug.current === selectedCategory
      })
    })
  }, [posts, selectedCategory])

  // All valid categories from Sanity (show even if no posts)
  const validCategories = categories.filter((category: Category) => 
    category?.title && 
    category.title.trim()
  ).sort((a, b) => {
    // Custom sort order to match the Sanity structure
    const order = [
      'プロダクト紹介',
      'ChatGPTの使用例', 
      '活動報告',
      'MINT部屋',
      'NFTを深く知る',
      'NFT NEWS',
      'ブログ/PV分析'
    ]
    
    // More flexible matching
    const findOrderIndex = (title: string) => {
      return order.findIndex(orderItem => 
        title?.includes(orderItem.replace(' [IR]', '')) ||
        orderItem.includes(title?.replace(' [IR]', '') || '') ||
        title?.toLowerCase().includes(orderItem.toLowerCase()) ||
        orderItem.toLowerCase().includes(title?.toLowerCase() || '')
      )
    }
    
    const aIndex = findOrderIndex(a.title || '')
    const bIndex = findOrderIndex(b.title || '')
    
    console.log('Sorting:', { 
      aTitle: a.title, 
      bTitle: b.title, 
      aIndex, 
      bIndex 
    })
    
    if (aIndex === -1 && bIndex === -1) return a.title!.localeCompare(b.title!)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  // Debug: Log data structure
  console.log('=== DEBUG INFO ===')
  console.log('All categories from Sanity:', categories.map(c => ({ 
    id: c._id, 
    title: c.title, 
    slug: c.slug?.current 
  })))
  console.log('Posts with categories:', posts.map(p => ({ 
    title: p.title, 
    categories: p.categories?.map(c => ({ title: c.title, slug: c.slug?.current })) 
  })))
  console.log('Valid categories after filtering:', validCategories.map(c => ({ 
    title: c.title, 
    slug: c.slug?.current 
  })))
  console.log('Selected category:', selectedCategory)
  console.log('Filtered posts count:', filteredPosts.length)
  console.log('=== END DEBUG ===')
  
  // Check specifically for プロダクト紹介
  const productIntroCategory = categories.find(c => 
    c.title?.includes('プロダクト') || c.title?.includes('紹介')
  )
  console.log('プロダクト紹介 category found:', productIntroCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      {/* Terminal Navigation */}
      <section className="py-8 bg-gray-900/30 border-t border-gray-700 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="text-xs text-gray-500 font-mono mb-4">
            [FILTER_CATEGORIES]
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <motion.button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all duration-300 border-2 ${
                selectedCategory === 'all'
                  ? 'bg-white text-black border-white'
                  : 'border border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-white hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ALL_RECORDS ({posts.length})
            </motion.button>

            {/* Show message if no categories found */}
            {validCategories.length === 0 && (
              <div className="text-xs text-gray-500 font-mono px-4 py-2">
                [NO_CATEGORIES_FOUND] - Check Sanity configuration
              </div>
            )}
            
            {validCategories.map((category: Category, index: number) => {
              // Count posts that belong to this category (excluding duplicates)
              const categoryPostCount = posts.filter(post => {
                if (!post.categories) return false
                
                // Remove duplicate categories first
                const uniqueCategories = post.categories.filter((cat, idx, arr) => 
                  cat.slug?.current && arr.findIndex(c => c.slug?.current === cat.slug?.current) === idx
                )
                
                return uniqueCategories.some(cat => cat.slug?.current === category.slug?.current)
              }).length
              
              return (
                <motion.button
                  key={`${category._id || 'category'}-${index}-${category.title}`}
                  onClick={() => setSelectedCategory(category.slug?.current || '')}
                  className={`relative flex items-center space-x-3 px-4 py-2 font-medium text-xs uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category.slug?.current
                      ? 'bg-white text-black border-2 border-white'
                      : 'border border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-white hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>{category.title.toUpperCase()}</span>
                  <div className="flex items-center space-x-1">
                    {categoryPostCount > 0 && (
                      <span className={`text-xs font-mono ${
                        selectedCategory === category.slug?.current ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        ({categoryPostCount})
                      </span>
                    )}
                    <div className={`w-2 h-2 rounded-full ${
                      categoryPostCount > 0 ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Records Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-xs text-gray-500 font-mono mb-8"
            key={selectedCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            [DISPLAYING_RECORDS: {filteredPosts.length}]
            {selectedCategory !== 'all' && (
              <span className="ml-4 text-gray-400">
                [FILTER: {validCategories.find(cat => cat.slug?.current === selectedCategory)?.title?.toUpperCase()}]
              </span>
            )}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPosts.map((post: BlogPost, index: number) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AkiraArticleCard 
                      post={post}
                      index={index}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <AkiraSpinner />
                  <div className="text-xs text-gray-500 font-mono mb-4">
                    [NO_RECORDS_FOUND]
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">
                    該当データなし
                  </h3>
                  <p className="text-gray-400">
                    選択されたカテゴリにはレコードが存在しません
                  </p>
                  <motion.button
                    onClick={() => setSelectedCategory('all')}
                    className="mt-6 border border-gray-600 text-gray-300 px-6 py-3 font-medium text-sm uppercase tracking-wider hover:bg-gray-700 hover:border-white hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    全記録を表示
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}