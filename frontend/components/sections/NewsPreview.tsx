'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { ArrowRight, Calendar } from 'lucide-react'

interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  published_date: string
}

export default function NewsPreview() {
  const [news, setNews] = useState<NewsArticle[]>([])

  useEffect(() => {
    // Fetch news articles
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news?limit=3`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error('Failed to load news:', err))
  }, [])

  if (news.length === 0) return null

  return (
    <section className="py-24 md:py-32 bg-lexa-black">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-400 font-bold block mb-6">
              Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-white">
              NEWS
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            View All
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/news/${article.slug}`} className="group block">
                <div className="relative h-64 overflow-hidden bg-lexa-surface mb-6">
                  <Image
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
