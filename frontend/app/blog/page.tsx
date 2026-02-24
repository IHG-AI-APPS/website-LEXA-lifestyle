'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

export default function BlogPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Smart Home', 'Installation', 'Audio Systems', 'Automation', 'Lighting', 'Security']

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API}/articles`)
      const data = await response.json()
      setArticles(data.sort((a: any, b: any) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setLoading(false)
    }
  }

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter((article: any) => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero - Centered */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 block">
                Insights & Articles
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Smart Living <span className="text-gray-400">Insights</span>
              </h1>
              <div className="h-px w-32 bg-[#9F8B65] mb-6 mx-auto" />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Expert insights, guides, and trends in smart home technology, automation, and luxury living from the Middle East&apos;s leading integrator.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-charcoal text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400 dark:text-gray-400">Loading articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400 dark:text-gray-400">No articles found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article: any, index: number) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/blog/${article.slug}`}>
                      <div className="group h-full border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-charcoal transition-all bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          {(article.featured_image || article.image) ? (
                            <SafeImage
                              src={article.featured_image || article.image}
                              alt={article.title}
                              fill
                              className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          ) : null}
                          {/* Fallback gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-4">
                            <span className="text-white/80 text-sm font-medium">{article.category}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span>{new Date(article.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{article.read_time} min read</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-600 dark:text-gray-400 transition-colors line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-charcoal font-medium text-sm group-hover:underline">
                            Read More →
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'Solutions Overview',
            description: 'Explore our complete range of smart home solutions.',
            href: '/solutions',
            category: 'Explore'
          },
          {
            title: 'Calculator',
            description: 'Get an instant estimate for your smart home project.',
            href: '/calculator',
            category: 'Tools'
          },
          {
            title: 'Projects Portfolio',
            description: 'See our work in luxury homes across Dubai.',
            href: '/projects',
            category: 'Our Work'
          }
        ]}
        title="Ready to Start?"
        subtitle="Transform your ideas into reality"
      />
    </div>
  )
}
