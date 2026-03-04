'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Quote, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

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

// Fallback testimonials if API fails
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Kris Fade',
    role: 'Radio Host | Entrepreneur | TV Personality',
    testimonial: 'LEXA turned my home into a smart luxury experience. The lighting, the automation — it\'s next-level living. Smooth process, amazing team. They nailed it!',
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
    role: 'Executive Director - United Phosphorus Ltd',
    testimonial: 'They run a very professional high-end business. The quality of their work and staff makes me realize their philosophy of customer satisfaction. I wish them all the very best.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/0f48dc4796cf6b760fd9f06e1e885bdbd444fc6b167916d39b612ed77ab9839d.png',
    rating: 5
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/testimonials`)
        if (response.ok) {
          const data = await response.json()
          const items = Array.isArray(data) ? data : data.testimonials || []
          if (items.length > 0) {
            setTestimonials(items.slice(0, 6)) // Show max 6 testimonials
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        // Keep fallback testimonials
      } finally {
        setLoading(false)
      }
    }
    
    fetchTestimonials()
  }, [])
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#0a0f1a]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16">
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-zinc-500 font-bold block mb-6">
            Client Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black dark:text-white">
            TESTIMONIALS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-[#171717]/50 border border-gray-200 dark:border-zinc-800 p-8 group hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-gray-300 dark:text-gray-600 dark:text-zinc-500 mb-6" strokeWidth={1.5} />
              
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-zinc-400 text-base leading-relaxed mb-8">
                {testimonial.testimonial || testimonial.content}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-zinc-800">
                {testimonial.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <SafeImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                )}
                <div>
                  <div className="text-black dark:text-white font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-gray-600 dark:text-zinc-500">
                    {testimonial.company ? `${testimonial.role} at ${testimonial.company}` : testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
