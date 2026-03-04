'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface RelatedItem {
  id: string
  slug: string
  title: string
  name?: string
  image: string
  description?: string
  excerpt?: string
}

interface RelatedItemsCarouselProps {
  items: RelatedItem[]
  title: string
  basePath: string
}

export default function RelatedItemsCarousel({ items, title, basePath }: RelatedItemsCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 4

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(items.length - itemsToShow, startIndex + 1))
  }

  const visibleItems = items.slice(startIndex, startIndex + itemsToShow)
  const canGoPrev = startIndex > 0
  const canGoNext = startIndex < items.length - itemsToShow

  if (items.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-semibold text-black">{title}</h2>
          
          {items.length > itemsToShow && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="p-2 border border-gray-300 dark:border-zinc-700 hover:border-black disabled:opacity-30 disabled:hover:border-gray-300 dark:border-zinc-700 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="p-2 border border-gray-300 dark:border-zinc-700 hover:border-black disabled:opacity-30 disabled:hover:border-gray-300 dark:border-zinc-700 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`${basePath}/${item.slug}`} className="group block">
                <div className="relative h-64 overflow-hidden bg-gray-200 mb-4">
                  <SafeImage
                    src={item.image}
                    alt={item.title || item.name || ''}
                    fill
                    className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold text-black mb-2 group-hover:text-gray-600 dark:text-zinc-500 transition-colors">
                  {item.title || item.name}
                </h3>
                {(item.description || item.excerpt) && (
                  <p className="text-sm text-gray-600 dark:text-zinc-500 line-clamp-2">
                    {item.description || item.excerpt}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
