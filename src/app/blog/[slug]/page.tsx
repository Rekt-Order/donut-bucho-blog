import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import type { BlogPost } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import DonutHeader from '@/components/DonutHeader'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(postQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Generate static paths for all posts
export async function generateStaticParams() {
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] { slug }`)
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'ぬるぺでぃあ記事が見つかりません | ドーナツ部長',
    }
  }

  return {
    title: `${post.title} | ぬるぺでぃあ - ドーナツ部長`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [
            {
              url: urlFor(post.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || post.title,
            },
          ]
        : [],
    },
  }
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-medium mt-5 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <DonutHeader />
      <main className="relative min-h-screen pt-20">
        {/* Japanese wave background pattern */}
        <div className="absolute inset-0 wave-pattern opacity-20" />
        
        {/* Floating donut particles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="donut-particle absolute"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + Math.sin(i) * 10}%`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
        
        <article className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center sakura-glass px-6 py-3 rounded-full text-white/80 hover:text-white mb-8 hover:scale-105 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ぬるぺでぃあに戻る
          </Link>

          {/* Header Section */}
          <div className="text-center mb-12">
            {/* ぬるぺでぃあバッジ */}
            <div className="inline-block sakura-glass px-6 py-2 rounded-full mb-6">
              <span className="text-pink-300 font-bold text-sm">📚 ぬるぺでぃあ記事</span>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.categories?.map((category) => (
                <span
                  key={category._id}
                  className="sakura-glass px-4 py-2 rounded-full text-sm font-medium text-pink-300 border border-pink-300/30"
                >
                  {category.title}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black japanese-title mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center justify-center space-x-6 text-white/60">
              <div className="flex items-center sakura-glass px-4 py-2 rounded-full">
                <svg className="w-5 h-5 mr-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center sakura-glass px-4 py-2 rounded-full">
                <span className="text-2xl mr-2">🍩</span>
                ふわふわ読み物
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="mb-12 relative">
              <div className="sakura-glass rounded-3xl overflow-hidden aspect-[21/9] relative donut-glow">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              {/* Sakura glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          )}

          {/* Content */}
          <div className="sakura-glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative donut in corner */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20" />
            <div className="absolute top-6 right-6 w-4 h-4 bg-current rounded-full opacity-10" />
            
            <div className="prose prose-lg prose-invert max-w-none relative z-10">
              <PortableText value={post.body} components={components} />
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="sakura-glass rounded-3xl p-8 max-w-2xl mx-auto relative overflow-hidden">
              {/* Floating steam effects */}
              <div className="steam-effect absolute w-6 h-6 top-4 left-8" />
              <div className="steam-effect absolute w-4 h-4 top-8 right-12" style={{animationDelay: '1s'}} />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black japanese-title mb-4">
                  他のぬるぺでぃあも読んでみませんか？
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  ドーナツ部長の世界には、まだまだたくさんの<br />
                  ふわふわな秘密が隠されています✨
                </p>
                <Link 
                  href="/"
                  className="inline-block sakura-glass px-8 py-4 rounded-full text-white font-bold donut-glow hover:scale-105 transition-transform duration-300"
                >
                  🍩 ぬるぺでぃあ一覧へ
                </Link>
              </div>
            </div>
          </div>
        </article>
        
        {/* Background glow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      </main>
    </>
  )
}

