'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Star, Quote, ArrowRight } from 'lucide-react'
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
  image?: string | null
  project_type?: string | null
  featured?: boolean
}

const HERO_IMG = 'https://files.ihgbrands.com/lexa/migrated/ff63df2cbb04eccb.webp'

const fallbackTestimonials: Testimonial[] = [
  {
    id: 'f-1',
    name: 'Kris Fade',
    role: 'Radio Host & Entrepreneur',
    testimonial: 'LEXA turned my home into a smart luxury experience. The lighting, the automation — it\'s next-level living. Every room has its own personality now, and I can control everything from my phone.',
    image: 'https://files.ihgbrands.com/lexa/migrated/ec9afb366796afe8.webp',
    rating: 5,
    featured: true,
  },
  {
    id: 'f-2',
    name: 'Akash Kanjwani',
    role: 'CEO, Sky View Real Estate',
    testimonial: 'LEXA nailed the design and delivery. Lumibright lighting turned our Harmony villa into a mood you can live in. The team understood our vision from day one and delivered beyond expectations.',
    image: 'https://files.ihgbrands.com/lexa/migrated/04cfad6343e74c55.webp',
    rating: 5,
    featured: true,
  },
  {
    id: 'f-3',
    name: 'Vikram Shroff',
    role: 'Executive Director, UPL',
    testimonial: 'They run a very professional high-end business. The quality of their work makes me realize their philosophy of customer satisfaction. From consultation to final handover, everything was seamless.',
    image: 'https://files.ihgbrands.com/lexa/migrated/c53459892ffdeaf4.webp',
    rating: 5,
    featured: true,
  },
  {
    id: 'f-4',
    name: 'Sarah Al Maktoum',
    role: 'Interior Designer',
    testimonial: 'The attention to detail and seamless integration of smart systems into our design vision was exceptional. LEXA doesn\'t just install technology — they make it invisible within the architecture.',
    rating: 5,
  },
  {
    id: 'f-5',
    name: 'James Morrison',
    role: 'Founder, Morrison Properties',
    testimonial: 'We\'ve partnered with LEXA across three villa projects now. Their consistency, reliability, and after-sales support are what keep us coming back. They make us look good to our buyers.',
    rating: 5,
  },
  {
    id: 'f-6',
    name: 'Fatima Hassan',
    role: 'Homeowner, Palm Jumeirah',
    testimonial: 'Our home cinema and lighting system are incredible. Friends always ask who did it. The whole family loves using voice control — even my kids can set movie night scenes effortlessly.',
    rating: 5,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return
        const apiItems: Testimonial[] = Array.isArray(data) ? data : data.testimonials || []
        if (apiItems.length > 0) {
          const apiIds = new Set(apiItems.map(t => t.id))
          const merged = [
            ...apiItems,
            ...fallbackTestimonials.filter(f => !apiIds.has(f.id)),
          ]
          setTestimonials(merged)
        }
      })
      .catch(() => {})
  }, [])

  const featured = testimonials.filter(t => t.featured || t.image)
  const rest = testimonials.filter(t => !t.featured && !t.image)

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="testimonials-page">
      {/* Hero */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Client testimonials" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
        </div>
        <div className="relative z-10 flex h-full items-end px-6 sm:px-10 lg:px-20 pb-12 lg:pb-16">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A962]" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A962]/80 font-medium">Client Stories</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white" data-testid="testimonials-heading">
              What Our<br />Clients Say
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Featured testimonials — large cards with images */}
      {featured.length > 0 && (
        <section className="py-16 lg:py-20 px-6 sm:px-10 lg:px-20" data-testid="featured-testimonials">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#0A0A0A] border border-zinc-800/50 hover:border-[#C9A962]/20 transition-colors overflow-hidden"
                data-testid={`featured-testimonial-${i}`}
              >
                {t.image && (
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] z-10" />
                    <SafeImage src={t.image} alt={t.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}

                <div className={`p-6 ${t.image ? '-mt-8 relative z-10' : ''}`}>
                  <Quote size={20} className="text-[#C9A962]/30 mb-4" />

                  {t.rating && (
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(Math.min(t.rating, 5))].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-[#C9A962] text-[#C9A962]" />
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    &ldquo;{t.testimonial || t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
                    {t.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#C9A962]/20">
                        <SafeImage src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All other testimonials — compact grid */}
      {rest.length > 0 && (
        <section className="pb-16 lg:pb-20 px-6 sm:px-10 lg:px-20" data-testid="all-testimonials">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-6 bg-[#C9A962]/40" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-medium">More Reviews</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="bg-[#0A0A0A] border border-zinc-800/50 p-6 hover:border-zinc-700 transition-colors"
                  data-testid={`testimonial-item-${i}`}
                >
                  {t.rating && (
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(Math.min(t.rating, 5))].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-[#C9A962] text-[#C9A962]" />
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    &ldquo;{t.testimonial || t.content}&rdquo;
                  </p>
                  <div>
                    <div className="text-xs font-semibold text-white">{t.name}</div>
                    <div className="text-[10px] text-zinc-600">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="max-w-2xl mx-auto text-center px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Experience It Yourself
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-sm text-zinc-500">
              Visit our Experience Centre or schedule a private design consultation.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/experience-centre"
                data-testid="testimonials-cta-experience"
                className="group flex items-center gap-2 h-11 px-7 bg-[#C9A962] text-[#050505] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4B872] transition-colors"
              >
                Visit Showroom
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects" className="text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-[#C9A962] transition-colors">
                View Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
