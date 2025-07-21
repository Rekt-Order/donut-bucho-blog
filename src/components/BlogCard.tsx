import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/lib/sanity'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="glass rounded-3xl overflow-hidden hover-lift group relative">
      <Link href={`/blog/${post.slug.current}`}>
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5">
          <div className="glass rounded-3xl w-full h-full"></div>
        </div>
        
        <div className="relative z-10">
          {/* Image Section */}
          <div className="aspect-[16/9] relative overflow-hidden rounded-t-3xl">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(600).height(338).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                <div className="relative z-10 text-white/60 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm">Coming Soon</span>
                </div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="p-6 relative">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories
                ?.filter((category) => category?.title && category.title.trim())
                .map((category, index) => (
                  <span
                    key={`${category._id || 'category'}-${index}-${category.title}`}
                    className="inline-block glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400 border border-cyan-400/30"
                  >
                    {category.title}
                  </span>
                ))}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <time className="text-sm text-white/50 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.publishedAt)}
              </time>
              
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
      </Link>
    </article>
  )
}