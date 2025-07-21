import { client } from '@/lib/sanity'
import { postsQuery, categoriesQuery } from '@/lib/queries'
import { BlogPost, Category } from '@/types/blog'
import BlogCard from '@/components/BlogCard'
import DonutHeader from '@/components/DonutHeader'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ぬるぺでぃあ | ドーナツ部長の世界を知る記事一覧',
  description: 'ドーナツ部長の世界や、ふわふわの秘密について詳しく知ることができる記事をお楽しみください。',
  openGraph: {
    title: 'ぬるぺでぃあ | ドーナツ部長の世界を知る記事一覧',
    description: 'ドーナツ部長の世界や、ふわふわの秘密について詳しく知ることができる記事をお楽しみください。',
    type: 'website',
  },
}

async function getBlogData() {
  try {
    const [posts, categories] = await Promise.all([
      client.fetch(postsQuery),
      client.fetch(categoriesQuery)
    ])
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return { posts: [], categories: [] }
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getBlogData()

  return (
    <>
      <DonutHeader />
      <main className="relative min-h-screen pt-20">
        {/* Background pattern */}
        <div className="absolute inset-0 wave-pattern opacity-20" />
        
        {/* Floating donut particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="donut-particle absolute"
            style={{
              left: `${5 + i * 20}%`,
              top: `${10 + Math.sin(i) * 15}%`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="mb-8">
              <span className="inline-block sakura-glass px-6 py-3 rounded-full text-pink-300 font-bold mb-6">
                📚 Nurumepedia
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black japanese-title mb-8 leading-tight">
              ぬるぺでぃあ
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
              ドーナツ部長の世界や、ふわふわの秘密について<br />
              詳しく知ることができる記事をお楽しみください。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
              <div className="sakura-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black japanese-title mb-2">{posts.length}</div>
                <div className="text-white/70">記事数</div>
              </div>
              <div className="sakura-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black japanese-title mb-2">
                  {categories.filter((cat: Category) => cat.title && cat.title.trim()).length}
                </div>
                <div className="text-white/70">カテゴリー</div>
              </div>
              <div className="sakura-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black japanese-title mb-2">∞</div>
                <div className="text-white/70">ふわふわ度</div>
              </div>
            </div>
          </section>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold japanese-title text-center mb-8">
                カテゴリーから探す
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/blog"
                  className="sakura-glass px-6 py-3 rounded-full text-white font-medium hover:scale-105 transition-all duration-300 donut-glow"
                >
                  すべて
                </Link>
                {categories
                  .filter((category: Category) => category?.title && category.title.trim())
                  .map((category: Category, index: number) => (
                    <Link
                      key={`${category._id || 'category'}-${index}-${category.title}`}
                      href={`/blog?category=${category.slug?.current || ''}`}
                      className="sakura-glass px-6 py-3 rounded-full text-pink-300 font-medium hover:text-white hover:scale-105 transition-all duration-300 border border-pink-300/30"
                    >
                      {category.title}
                    </Link>
                  ))}
              </div>
            </section>
          )}

          {/* Articles Grid */}
          <section>
            {posts.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold japanese-title mb-4">
                    最新の記事
                  </h2>
                  <p className="text-lg text-white/70">
                    ドーナツ部長の魅力的な世界を探検しましょう 🍩✨
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post: BlogPost, index: number) => (
                    <div
                      key={post._id}
                      className="animate-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationDuration: '0.6s',
                        animationFillMode: 'both'
                      }}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="sakura-glass rounded-3xl p-12 max-w-md mx-auto">
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="w-full h-full bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" />
                    <div className="absolute inset-8 bg-current rounded-full opacity-20" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 japanese-title">準備中...</h3>
                  <p className="text-xl text-white/70 mb-4">
                    新しいぬるぺでぃあ記事を準備中です
                  </p>
                  <p className="text-white/50">
                    ドーナツ部長の秘密がもうすぐ明かされます！
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          <section className="mt-20">
            <div className="sakura-glass rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* Steam effects */}
              <div className="steam-effect absolute w-8 h-8 top-6 left-12" />
              <div className="steam-effect absolute w-6 h-6 top-12 right-16" style={{animationDelay: '2s'}} />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black japanese-title mb-6">
                  最新のぬるぺでぃあをお届け
                </h3>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  ドーナツ部長の新しい冒険や、ふわふわの秘密を<br />
                  いち早くお手元にお届けします 🍩💕
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="メールアドレスを入力"
                    className="flex-1 sakura-glass px-6 py-3 rounded-full text-white placeholder-white/50 border border-pink-300/30 focus:border-pink-400 focus:outline-none transition-colors duration-300"
                  />
                  <button className="sakura-glass px-8 py-3 rounded-full text-white font-bold donut-glow hover:scale-105 transition-transform duration-300">
                    購読する
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Background glow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      </main>
    </>
  )
}