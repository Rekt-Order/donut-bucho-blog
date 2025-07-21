import { client } from '@/lib/sanity'
import { postsQuery, categoriesQuery } from '@/lib/queries'
import { BlogPost } from '@/types/blog'
import DonutHeader from '@/components/DonutHeader'
import DonutHero from '@/components/DonutHero'
import NFTGrid from '@/components/NFTGrid'
import AnthologySection from '@/components/AnthologySection'
import ProjectGrid from '@/components/ProjectGrid'
import HorizontalArticleGrid from '@/components/HorizontalArticleGrid'
import DonutFooter from '@/components/DonutFooter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ドーナツ部長 | 世界を救うのは、ふわふわの意志。',
  description: '甘くて温かい心で、みんなを笑顔にする。ドーナツ部長の世界へようこそ。',
  openGraph: {
    title: 'ドーナツ部長 | 世界を救うのは、ふわふわの意志。',
    description: '甘くて温かい心で、みんなを笑顔にする。ドーナツ部長の世界へようこそ。',
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

export default async function Home() {
  const { posts } = await getBlogData()

  return (
    <>
      <DonutHeader />
      <main className="relative">
        {/* Hero Section */}
        <DonutHero />
        
        {/* NFT Cards Grid */}
        <NFTGrid />
        
        {/* Horizontal Article Grid */}
        <HorizontalArticleGrid posts={posts} />
        
        {/* Anthology & World Sections */}
        <AnthologySection />
        
        {/* Project Grid */}
        <ProjectGrid />
      </main>
      
      {/* Footer */}
      <DonutFooter />
    </>
  )
}
