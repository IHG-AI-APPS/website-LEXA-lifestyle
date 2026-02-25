'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { useParams } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Calendar, Tag } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

interface NewsArticle {
  id: string
  slug: string
  title: string
  content: string
  image: string
  published_date: string
  author: string
  tags: string[]
}

export default function NewsDetailPage() {
  const cms = useCms('page_news_detail', null)

  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${params.slug}`)
        .then(res => res.json())
        .then(data => {
          setArticle(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to load news article:', err)
          setLoading(false)
        })
    }
  }, [params?.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-lexa-black pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-80 bg-gray-800 rounded-xl mb-8"></div>
            <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-lexa-black pt-20 flex items-center justify-center">
        <div className="text-gray-400">Article not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lexa-black pt-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Breadcrumb
          dark={true}
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: article.title },
          ]}
        />
      </div>

      <article className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white mb-8">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-12 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar size={16} strokeWidth={1.5} />
                <time>{new Date(article.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              </div>
              <div>By {article.author}</div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={16} strokeWidth={1.5} />
                  {article.tags.join(', ')}
                </div>
              )}
            </div>

            <div className="relative h-96 md:h-[500px] overflow-hidden bg-lexa-surface mb-12">
              <SafeImage
                src={article.image}
                alt={article.title}
                fill
                className="object-cover grayscale"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  )
}
