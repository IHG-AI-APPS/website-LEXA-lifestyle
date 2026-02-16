'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  published_date: string
  tags: string[]
  featured: boolean
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load news:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-lexa-black pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading news...</div>
      </div>
    )
  }

  const featuredNews = news.find(n => n.featured)
  const otherNews = news.filter(n => !n.featured)

  return (
    <div className="min-h-screen bg-lexa-black pt-20">
      {/* Hero */}
      <section className="py-24 bg-lexa-surface border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 font-bold block mb-6">
              Latest Updates
            </span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight text-white mb-8">
              NEWS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Company announcements, product launches, and industry updates from LEXA Lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="py-16 bg-lexa-black border-b border-white/5">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative h-96 lg:h-[500px] overflow-hidden bg-lexa-surface">
                <SafeImage
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div>
                <div className="inline-block px-3 py-1 mb-6 text-xs tracking-widest uppercase bg-white/10 text-gray-300">
                  Featured
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                  {featuredNews.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Calendar size={16} strokeWidth={1.5} />
                  <time>{new Date(featuredNews.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {featuredNews.excerpt}
                </p>
                <Link
                  href={`/news/${featuredNews.slug}`}
                  className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors uppercase tracking-widest text-sm font-medium"
                >
                  Read More
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href={`/news/${article.slug}`} className="group block">
                  <div className="relative h-64 overflow-hidden bg-lexa-surface mb-6">
                    <SafeImage
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar size={14} strokeWidth={1.5} />
                    <time>{new Date(article.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {article.excerpt}
                  </p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500 border border-white/10 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
