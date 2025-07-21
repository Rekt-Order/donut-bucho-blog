import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import { BlogPost } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AkiraBackground from '@/components/AkiraBackground'
import AkiraGlitchText from '@/components/AkiraGlitchText'
import AkiraScanningOverlay from '@/components/AkiraScanningOverlay'
import DonutHeader from '@/components/DonutHeader'
import DonutFooter from '@/components/DonutFooter'

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
      title: 'データレコードが見つかりません | ドーナツ部長',
    }
  }

  return {
    title: `${post.title} | データアーカイブ - ドーナツ部長`,
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
        <div className="my-8 relative">
          <div className="border-2 border-gray-700 bg-black overflow-hidden">
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={value.alt || 'Article image'}
              width={800}
              height={600}
              className="w-full h-auto opacity-80"
            />
            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-mono border border-gray-600">
              [IMAGE_DATA]
            </div>
          </div>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-black text-white mb-4 uppercase tracking-wide border-l-4 border-white pl-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-gray-200 mb-3 uppercase tracking-wide border-l-2 border-gray-500 pl-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold text-gray-300 mb-3 border-l border-gray-600 pl-2">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-400 mb-4 leading-relaxed font-mono text-sm">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-600 pl-4 my-6 bg-gray-900/50 p-4">
        <div className="text-xs text-gray-500 font-mono mb-2">[QUOTE_BLOCK]</div>
        <div className="text-gray-300 font-mono text-sm italic">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none mb-4 space-y-2 border-l border-gray-700 pl-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-none mb-4 space-y-2 border-l border-gray-700 pl-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-400 text-sm font-mono flex items-start">
        <span className="text-white mr-2">▶</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-400 text-sm font-mono flex items-start">
        <span className="text-white mr-2">&gt;</span>
        <span>{children}</span>
      </li>
    ),
  },
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <DonutHeader />
      <main className="relative min-h-screen bg-black">
        {/* AKIRA-style Background */}
        <AkiraBackground />

        {/* Navigation */}
        <section className="relative pt-20 pb-8 border-b border-gray-700">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center space-x-2 text-sm font-mono">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                ROOT
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/articles" className="text-gray-500 hover:text-white transition-colors">
                ARCHIVE
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{slug.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="relative py-16">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* System Info */}
              <div className="text-xs text-gray-500 font-mono mb-4">
                [RECORD_ACCESS_GRANTED]
              </div>
              
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category._id}
                        className="bg-gray-800 text-gray-300 px-3 py-1 text-xs font-mono border border-gray-600 uppercase tracking-wider"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Title */}
              <AkiraGlitchText className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                {post.title}
              </AkiraGlitchText>
              
              {/* Metadata */}
              <div className="flex items-center space-x-6 text-sm font-mono mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">PUBLISHED:</span>
                  <span className="text-gray-300">
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }).replace(/\//g, '.')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse" />
                  <span className="text-gray-500">STATUS: LIVE</span>
                </div>
              </div>
              
              {/* Excerpt */}
              {post.excerpt && (
                <div className="border-l-4 border-gray-600 pl-6 mb-8">
                  <div className="text-xs text-gray-500 font-mono mb-2">
                    [SUMMARY]
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed font-mono">
                    {post.excerpt}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.mainImage && (
          <section className="relative py-8 border-y border-gray-700">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="relative border-2 border-gray-600 bg-black overflow-hidden">
                  <img
                    src={urlFor(post.mainImage).width(1200).height(600).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-auto opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-2 text-xs font-mono border border-gray-500">
                    [MAIN_IMAGE_DATA]
                  </div>
                  
                  {/* Scanning overlay */}
                  <AkiraScanningOverlay />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="relative py-16">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-xs text-gray-500 font-mono mb-8">
                [CONTENT_BLOCK_START]
              </div>
              
              <div className="border border-gray-700 bg-gray-900/20 p-8">
                <div className="prose prose-lg max-w-none relative z-10">
                  <PortableText value={post.body} components={components} />
                </div>
              </div>
              
              <div className="text-xs text-gray-500 font-mono mt-8 text-right">
                [CONTENT_BLOCK_END]
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <section className="relative py-16 border-t border-gray-700">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <Link
                  href="/articles"
                  className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-6 py-3 border border-gray-600 hover:bg-gray-700 hover:border-white hover:text-white transition-all duration-300 font-mono text-sm"
                >
                  <span>&lt;</span>
                  <span>BACK_TO_ARCHIVE</span>
                </Link>
                
                <div className="text-xs text-gray-500 font-mono">
                  [SESSION_END]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Footer */}
        <section className="py-8 bg-gray-900/50 border-t border-gray-700">
          <div className="container mx-auto px-6 text-center">
            <div className="text-xs text-gray-500 font-mono opacity-50">
              [RECORD_ACCESS] {slug.toUpperCase()} &gt; READ_COMPLETE &gt; SYSTEM_STANDBY
            </div>
          </div>
        </section>
      </main>
      
      <DonutFooter />
    </>
  )
}

