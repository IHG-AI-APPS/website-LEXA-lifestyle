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
    image: 'https://files.ihgbrands.com/lexa/migrated/ec9afb366796afe8.webp',
    rating: 5
  },
  {
    id: '2',
    name: 'Akash Kanjwani',
    role: 'CEO, Sky View Real Estate',
    testimonial: 'LEXA nailed the design and delivery. Lumibright lighting turned our Harmony villa into a mood you can live in.',
    image: 'https://files.ihgbrands.com/lexa/migrated/04cfad6343e74c55.webp',
    rating: 5
  },
  {
    id: '3',
    name: 'Vikram Shroff',
    role: 'Executive Director, UPL',
    testimonial: 'They run a very professional high-end business. The quality of their work makes me realize their philosophy of customer satisfaction.',
    image: 'https://files.ihgbrands.com/lexa/migrated/c53459892ffdeaf4.webp',
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
    <section className="py-24 md:py-32 bg-[#050505]" data-testid="testimonials-section">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#C9A962] mb-4">
              Client Feedback
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              What Our Clients Say
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/60 hover:text-[#C9A962] transition-colors"
            data-testid="view-all-testimonials"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 4-column compact testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#111] border border-white/5 p-6 hover:border-[#C9A962]/20 transition-colors"
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
              <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-4">
                &ldquo;{t.testimonial || t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {t.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <SafeImage src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{t.name}</div>
                  <div className="text-xs text-white/40 truncate">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm text-[#C9A962] hover:text-white transition-colors"
          >
            View All Testimonials
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
