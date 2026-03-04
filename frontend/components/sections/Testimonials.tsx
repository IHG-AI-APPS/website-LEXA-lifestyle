'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Star, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  testimonial?: string
  content?: string
  rating?: number
  image?: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Kris Fade',
    role: 'Radio Host & Entrepreneur',
    testimonial: 'LEXA turned my home into a smart luxury experience. The lighting, the automation — it\'s next-level living.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/81113236aea1d470de7f5dc2060093ba48905134dfadb518d9ea0899ccc1f7c1.png',
    rating: 5
  },
  {
    id: '2',
    name: 'Akash Kanjwani',
    role: 'CEO, Sky View Real Estate',
    testimonial: 'LEXA nailed the design and delivery. Lumibright lighting turned our Harmony villa into a mood you can live in.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/ba0a4f880b7032b40af93c3055859acb1fb26773462280bb5ad5467e3948ff2c.png',
    rating: 5
  },
  {
    id: '3',
    name: 'Vikram Shroff',
    role: 'Executive Director, UPL',
    testimonial: 'They run a very professional high-end business. The quality of their work makes me realize their philosophy of customer satisfaction.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/0f48dc4796cf6b760fd9f06e1e885bdbd444fc6b167916d39b612ed77ab9839d.png',
    rating: 5
  },
  {
    id: '4',
    name: 'Sarah Al Maktoum',
    role: 'Interior Designer',
    testimonial: 'The attention to detail and seamless integration of smart systems into our design vision was exceptional.',
    image: '',
    rating: 5
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return
        const items = Array.isArray(data) ? data : data.testimonials || []
        if (items.length > 0) setTestimonials(items.slice(0, 4))
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-zinc-800/50" data-testid="testimonials-section">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-7xl">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A962] font-semibold">
              Client Feedback
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-1">
              What Our Clients Say
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gray-500 dark:text-zinc-500 hover:text-[#C9A962] dark:hover:text-[#C9A962] transition-colors"
            data-testid="view-all-testimonials"
          >
            View All
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* 4-column compact testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800/50 p-5 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors"
              data-testid={`testimonial-card-${i}`}
            >
              {/* Stars */}
              {t.rating && (
                <div className="flex gap-0.5 mb-3">
                  {[...Array(Math.min(t.rating, 5))].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-[#C9A962] text-[#C9A962]" />
                  ))}
                </div>
              )}

              {/* Quote — truncated to 2 lines */}
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                &ldquo;{t.testimonial || t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {t.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <SafeImage src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-gray-500 dark:text-zinc-600 truncate">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
