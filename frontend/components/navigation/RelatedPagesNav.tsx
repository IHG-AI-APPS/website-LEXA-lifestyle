'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface RelatedPage {
  title: string
  description: string
  href: string
  category?: string
}

interface RelatedPagesNavProps {
  pages: RelatedPage[]
  title?: string
  subtitle?: string
}

export default function RelatedPagesNav({ 
  pages, 
  title = "Continue Exploring",
  subtitle = "Learn more about LEXA"
}: RelatedPagesNavProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200 dark:border-gray-700">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{subtitle}</p>
          </motion.div>

          {/* Related Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {pages.map((page, index) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={page.href}
                  className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#E8DCC8] hover:shadow-lg transition-all duration-300 h-full"
                >
                  {page.category && (
                    <span className="inline-block text-xs uppercase tracking-wider text-[#E8DCC8] font-semibold mb-3">
                      {page.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#E8DCC8] transition-colors flex items-center justify-between">
                    {page.title}
                    <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {page.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#E8DCC8] transition-colors group"
            >
              Ready to Start Your Project?
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
