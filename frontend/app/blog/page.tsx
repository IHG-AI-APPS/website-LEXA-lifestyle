'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import { useCms } from '@/hooks/useCms'
import QuickViewModal from '@/components/QuickViewModal'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

export default function BlogPage() {
  const cms = useCms('page_blog_listing', null)

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [quickViewItem, setQuickViewItem] = useState<any>(null)

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
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="blog-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://files.ihgbrands.com/lexa/migrated/df03b88a51125f5f.webp)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Insights & Articles</span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="blog-title">
              Smart Living Insights
            </h1>
            <p className="hero-animate-desc text-sm sm:text-base text-gray-300 max-w-lg mx-auto">
              Expert guides, industry trends, and practical advice for your smart home journey
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white dark:bg-[#0A0A0A] border-b dark:border-zinc-800">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-charcoal text-white'
                      : 'bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-zinc-400 hover:bg-gray-200'
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
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-600 dark:text-zinc-500">Loading articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-zinc-500">No articles found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article: any, index: number) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    data-testid={`article-card-${index}`}
                  >
                    <div className="group h-full border border-gray-200 dark:border-zinc-800 hover:border-charcoal transition-all bg-white dark:bg-[#171717] rounded-lg overflow-hidden">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <Link href={`/blog/${article.slug}`}>
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
                        </Link>
                        {/* Category badge */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent p-4 pointer-events-none">
                          <span className="text-white/90 text-xs font-medium tracking-wider uppercase">{article.category}</span>
                        </div>
                        {/* Quick View button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setQuickViewItem({
                              title: article.title,
                              image: article.featured_image || article.image,
                              description: article.excerpt,
                              category: article.category,
                              features: article.tags?.slice(0, 5),
                              href: `/blog/${article.slug}`
                            })
                          }}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-medium tracking-wider uppercase rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#C9A962] hover:text-white active:bg-[#C9A962] active:text-white z-10"
                          data-testid={`quickview-article-${index}`}
                        >
                          Quick View
                        </button>
                      </div>

                      {/* Content */}
                      <Link href={`/blog/${article.slug}`}>
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

                          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#C9A962] transition-colors line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 dark:text-zinc-500 text-sm mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#171717] rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="text-charcoal font-medium text-sm group-hover:underline">
                            Read More →
                          </div>
                        </div>
                      </Link>
                    </div>
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

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        item={quickViewItem}
      />
    </div>
  )
}
