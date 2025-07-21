import { client } from '@/lib/sanity'
import { postsQuery, categoriesQuery } from '@/lib/queries'
import { BlogPost, Category } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import DonutHeader from '@/components/DonutHeader'
import DonutFooter from '@/components/DonutFooter'
import Link from 'next/link'
import { Metadata } from 'next'
import AkiraBackground from '@/components/AkiraBackground'
import AkiraGlitchText from '@/components/AkiraGlitchText'
import AkiraStatusDisplay from '@/components/AkiraStatusDisplay'
import ArticlesFilter from '@/components/ArticlesFilter'

export const metadata: Metadata = {
  title: 'データアーカイブ | ドーナツ部長',
  description: 'AKIRA風サイバーパンクデータベース。デジタル空間に保存された全記録にアクセス。',
  openGraph: {
    title: 'データアーカイブ | ドーナツ部長',
    description: 'AKIRA風サイバーパンクデータベース。デジタル空間に保存された全記録にアクセス。',
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
      <main className="relative min-h-screen bg-black">
        {/* AKIRA-style Background */}
        <AkiraBackground />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              {/* System status */}
              <div className="text-xs text-gray-500 font-mono tracking-wider mb-4">
                [ARCHIVE_SYSTEM_ONLINE]
              </div>
              
              {/* Main title */}
              <AkiraGlitchText className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                データアーカイブ
              </AkiraGlitchText>
              
              <div className="text-2xl md:text-3xl text-gray-300 mb-8 font-light tracking-[0.2em]">
                DATA ARCHIVE
              </div>
              
              {/* System info */}
              <div className="text-lg md:text-xl text-gray-400 mb-8 font-mono tracking-wide">
                &gt; NEURAL_NETWORK_RECORDS.db
              </div>
              
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                デジタル迷宮に保存された全記録へアクセス。<br />
                <span className="text-gray-500">サイバーパンクデータベースシステム v2.025</span>
              </p>

              {/* Status display - AKIRA HUD style */}
              <AkiraStatusDisplay stats={[
                { label: 'RECORDS', value: posts.length, color: 'text-green-400' },
                { label: 'CATEGORIES', value: categories.filter((cat: Category) => cat.title && cat.title.trim()).length, color: 'text-blue-400' },
                { label: 'STATUS', value: 'ACTIVE', color: 'text-yellow-400' }
              ]} />
            </div>
          </div>
        </section>

        {/* Articles Filter Component */}
        <ArticlesFilter posts={posts} categories={categories} />

        {/* System Footer */}
        <section className="py-8 bg-gray-900/50 border-t border-gray-700">
          <div className="container mx-auto px-6 text-center">
            <div className="text-xs text-gray-500 font-mono opacity-50">
              [NEOTOKYO-3] ARCHIVE_SYSTEM_v2.025 &gt; ACCESS_COMPLETE &gt; SESSION_ACTIVE
            </div>
          </div>
        </section>
      </main>
      
      <DonutFooter />
    </>
  )
}