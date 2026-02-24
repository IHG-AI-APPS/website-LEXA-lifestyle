/**
 * Related Solutions Navigator
 * Cross-solution navigation with engaging visuals
 */

'use client'

import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Building2, Home, Sparkles, Film, Shield } from 'lucide-react'

interface Solution {
  slug: string
  title: string
  description: string
  category: string
  image?: string
  tags?: string[]
}

interface RelatedSolutionsProps {
  solutions: Solution[]
  currentSlug: string
}

const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase()
  if (lower.includes('residential')) return Home
  if (lower.includes('commercial')) return Building2
  if (lower.includes('cinema') || lower.includes('theater')) return Film
  if (lower.includes('security')) return Shield
  return Sparkles
}

export default function RelatedSolutions({ solutions, currentSlug }: RelatedSolutionsProps) {
  // Filter and limit to 3 solutions
  const relatedSolutions = solutions
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3)

  if (relatedSolutions.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
              Explore More
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Related Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover complementary automation solutions for your space
            </p>
          </motion.div>
        </div>

        {/* Related Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedSolutions.map((solution, index) => {
            const Icon = getCategoryIcon(solution.category)
            
            return (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image Poster */}
                    <div className="relative h-64 overflow-hidden">
                      {solution.image ? (
                        <SafeImage
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                          <Icon className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-semibold text-gray-900">
                            {solution.category}
                          </span>
                        </div>
                      </div>

                      {/* Title at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {solution.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {solution.description}
                      </p>

                      {/* Tags Preview */}
                      {solution.tags && solution.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {solution.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                          Explore Solution
                        </span>
                        <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>View All Solutions</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
