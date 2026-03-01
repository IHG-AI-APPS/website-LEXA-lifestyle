'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Clock, ArrowRight, Search } from 'lucide-react'
import { getArticles, getArticleCategories, type Article } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

export default function ResourcesPage() {
  const cms = useCms('page_resources_listing', null)

  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          getArticles(),
          getArticleCategories()
        ])
        setArticles(articlesData)
        setFilteredArticles(articlesData)
        setCategories(['All', ...categoriesData])
        setLoading(false)
      } catch (err) {
        console.error('Failed to load resources:', err)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredArticles(articles)
    } else {
      setFilteredArticles(articles.filter(article => article.category === category))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading resources...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="resources-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Knowledge Hub</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="resources-title">
              Resources
            </h1>
            <p className="hero-animate-desc text-base text-gray-300 max-w-lg mx-auto">
              Guides, insights, and expertise to help you make informed decisions about smart living
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-charcoal text-white'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-charcoal'
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
          <div className="max-w-6xl mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">No articles found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Link href={`/resources/${article.slug}`}>
                      <div className="group h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden mb-6">
                          <SafeImage
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal text-white text-xs tracking-wider uppercase">
                            {article.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-2xl font-semibold mb-3 group-hover:text-gray-600 dark:text-gray-400 transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock size={16} />
                              <span>{article.read_time} min read</span>
                            </div>
                            <div className="flex items-center gap-2 text-charcoal group-hover:gap-3 transition-all">
                              <span className="font-medium">Read More</span>
                              <ArrowRight size={16} />
                            </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold mb-6">
                Need Expert Guidance?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Our team is ready to help you design the perfect smart living solution
              </p>
              <Button
                size="lg"
                className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-7"
                onClick={() => window.location.href = '/contact'}
              >
                Book Free Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
