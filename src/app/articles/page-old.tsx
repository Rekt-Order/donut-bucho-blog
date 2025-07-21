import { client } from '@/lib/sanity'
import { postsQuery, categoriesQuery } from '@/lib/queries'
import { BlogPost, Category } from '@/types/blog'
import DonutHeader from '@/components/DonutHeader'
import DonutFooter from '@/components/DonutFooter'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '読み物 | ドーナツ部長の世界を知る記事コレクション',
  description: 'ドーナツ部長の世界や、ふわふわの秘密について詳しく知ることができる読み物をお楽しみください。',
  openGraph: {
    title: '読み物 | ドーナツ部長の世界を知る記事コレクション',
    description: 'ドーナツ部長の世界や、ふわふわの秘密について詳しく知ることができる読み物をお楽しみください。',
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

export default async function ArticlesPage() {
  const { posts, categories } = await getBlogData()

  return (
    <>
      <DonutHeader />
      <main className="relative min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
                読み物
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                ドーナツ部長の世界や、ふわふわの秘密について<br />
                詳しく知ることができる記事をお楽しみください。
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-black text-pink-600 mb-2">{posts.length}</div>
                  <div className="text-gray-600">記事数</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-black text-orange-500 mb-2">
                    {categories.filter((cat: Category) => cat.title && cat.title.trim()).length}
                  </div>
                  <div className="text-gray-600">カテゴリー</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-black text-red-500 mb-2">∞</div>
                  <div className="text-gray-600">ふわふわ度</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                カテゴリーから探す
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/articles"
                  className="bg-black text-white px-6 py-3 rounded-sm font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  すべて
                </Link>
                {categories
                  .filter((category: Category) => category?.title && category.title.trim())
                  .map((category: Category, index: number) => (
                    <Link
                      key={`${category._id || 'category'}-${index}-${category.title}`}
                      href={`/articles?category=${category.slug?.current || ''}`}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      {category.title}
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            {posts.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    最新の記事
                  </h2>
                  <p className="text-lg text-gray-600">
                    ドーナツ部長の魅力的な世界を探検しましょう 🍩✨
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        <Link href={`/articles/${post.slug.current}`}>
                          {/* Image Section */}
                          <div className="aspect-[16/9] relative overflow-hidden">
                            {post.mainImage ? (
                              <img
                                src={`${post.mainImage.asset?._ref ? `https://cdn.sanity.io/images/project/dataset/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}?w=400&h=225&fit=crop` : '/api/placeholder/400/225'}`}
                                alt={post.mainImage.alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-pink-400/20 to-orange-400/20 flex items-center justify-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-2xl">🍩</span>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.categories
                                ?.filter((category) => category?.title && category.title.trim())
                                .slice(0, 2)
                                .map((category, index) => (
                                  <span
                                    key={`${category._id || 'category'}-${index}-${category.title}`}
                                    className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600"
                                  >
                                    {category.title}
                                  </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-300">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              <time className="text-sm text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </time>
                              
                              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="w-full h-full bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" />
                    <div className="absolute inset-8 bg-white rounded-full opacity-30" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">準備中...</h3>
                  <p className="text-xl text-gray-600">新しい読み物をお楽しみに！</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <DonutFooter />
    </>
  )
}