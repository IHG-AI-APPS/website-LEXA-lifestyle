'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Clock, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { getArticle, getArticles, type Article } from '@/lib/api'

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const articleData = await getArticle(slug)
        setArticle(articleData)
        
        // Load related articles (same category, different article)
        const allArticles = await getArticles(articleData.category, 4)
        const related = allArticles.filter(a => a.id !== articleData.id).slice(0, 3)
        setRelatedArticles(related)
        
        setLoading(false)
      } catch (err) {
        console.error('Failed to load article:', err)
        setError('Article not found')
        setLoading(false)
      }
    }
    
    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading article...</div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/resources">
            <Button>View All Resources</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Format the published date
  const publishedDate = new Date(article.published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <section className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <Link href="/resources" className="flex items-center gap-2 text-gray-600 hover:text-charcoal transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm">Back to Resources</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Category */}
              <div className="inline-block px-4 py-1 bg-charcoal text-white text-xs tracking-[0.3em] uppercase mb-6">
                {article.category}
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.02em] leading-tight mb-6">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.read_time} min read</span>
                </div>
                <div>{publishedDate}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-0">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] overflow-hidden"
            >
              <SafeImage
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                quality={95}
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg prose-gray max-w-none"
            >
              {/* Render content with proper formatting */}
              <div className="article-content">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // Check if it&apos;s a heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-3xl font-semibold mt-12 mb-6">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  // Check if it&apos;s a list item
                  if (paragraph.match(/^\d+\./)) {
                    const items = paragraph.split('\n').filter(line => line.trim())
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-3 my-6">
                        {items.map((item, idx) => (
                          <li key={idx} className="text-gray-700 leading-relaxed">
                            {item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                          </li>
                        ))}
                      </ol>
                    )
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="text-xl text-gray-700 leading-relaxed mb-6"
                       dangerouslySetInnerHTML={{
                         __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                       }}
                    />
                  )
                })}
              </div>
            </motion.div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium tracking-wide uppercase text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let&apos;s discuss how we can bring these solutions to your space
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-charcoal hover:bg-charcoal-light text-white px-10 py-6"
                  onClick={() => window.location.href = '/contact'}
                >
                  Private Design Session
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 px-10 py-6"
                  onClick={() => window.location.href = '/calculator'}
                >
                  Calculate Cost
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-semibold mb-4">Related Articles</h2>
                <p className="text-xl text-gray-600">Continue exploring</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/resources/${relatedArticle.slug}`}>
                      <div className="group">
                        <div className="relative h-48 overflow-hidden mb-4">
                          <SafeImage
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{relatedArticle.read_time} min read</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
