'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<any>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchArticle = useCallback(async () => {
    try {
      const response = await fetch(`${API}/articles/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching article:', error)
      setLoading(false)
    }
  }, [params.slug])

  const fetchRelatedArticles = useCallback(async () => {
    try {
      const response = await fetch(`${API}/articles`)
      const data = await response.json()
      setRelatedArticles(data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching related articles:', error)
    }
  }, [])

  useEffect(() => {
    fetchArticle()
    fetchRelatedArticles()
  }, [fetchArticle, fetchRelatedArticles])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4"></div>
            <div className="h-80 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Article Not Found</h2>
          <Link href="/blog">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-8 lg:px-16">
        <Breadcrumb 
          items={[
            { label: 'Blog', href: '/blog' },
            { label: article.title }
          ]} 
        />
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">{article.category}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white dark:text-white leading-tight">
                {article.title}
              </h1>
              
              {article.excerpt && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">{article.author}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{new Date(article.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{article.read_time} min read</span>
                </div>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {article.image && (
        <section className="container mx-auto px-4 sm:px-8 lg:px-16 -mt-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
              <SafeImage
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:text-white dark:prose-headings:text-white
                prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 dark:border-gray-700 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 dark:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:text-white dark:prose-strong:text-white prose-strong:font-semibold
                prose-ul:my-4 prose-ul:pl-6
                prose-ol:my-4 prose-ol:pl-6
                prose-li:text-gray-700 dark:text-gray-300 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-table:w-full prose-table:border-collapse
                prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 dark:border-gray-600 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-gray-300 dark:border-gray-600 prose-td:px-4 prose-td:py-2
                prose-img:rounded-lg prose-img:shadow-md
              "
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white dark:text-white">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white dark:text-white border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 pb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white dark:text-white">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 py-3 px-4 my-4 italic text-gray-700 dark:text-gray-300 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => <th className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white dark:text-white">{children}</th>,
                  td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">{children}</td>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white dark:text-white">{children}</strong>,
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 dark:text-gray-100">{children}</code>
                    ) : (
                      <code className={className}>{children}</code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                      {children}
                    </pre>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </motion.article>
            
            {/* Share & Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Share this article:</span>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium">
                <BookmarkPlus className="h-4 w-4" />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white dark:text-white">Continue Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.filter(a => a.slug !== article.slug).slice(0, 3).map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 dark:border-gray-700">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                        {relatedArticle.featured_image && !relatedArticle.featured_image.includes('photo-180') ? (
                          <SafeImage
                            src={relatedArticle.featured_image}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-4xl font-bold text-blue-200">
                              {relatedArticle.category?.charAt(0) || 'A'}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <Badge variant="secondary" className="mb-2 text-xs">{relatedArticle.category}</Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900 dark:text-white dark:text-white">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Let our experts design the perfect smart home solution for you.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoal dark:text-gray-200 px-12">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
