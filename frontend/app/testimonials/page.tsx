'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Quote, ArrowRight, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Testimonial { id?: string; name: string; role?: string; company?: string; location?: string; content?: string; testimonial?: string; rating?: number; image?: string; project_type?: string }

export default function TestimonialsPage() {
  const cms = useCms('page_testimonials_listing', null) as any
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/testimonials`).then(res => res.ok ? res.json() : []).then(data => setTestimonials(Array.isArray(data) ? data : [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="testimonials-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=50)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Client Reviews</span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="testimonials-title">What Our Clients Say</h1>
            <p className="text-base text-gray-300">Discover why our clients trust LEXA to transform their spaces</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="testimonials-grid">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-6xl">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">{[1, 2, 3, 4].map(i => (<div key={i} className="animate-pulse border border-gray-200 dark:border-gray-800 rounded-xl p-6"><div className="h-4 bg-gray-200 rounded w-24 mb-4" /><div className="h-20 bg-gray-100 rounded mb-4" /><div className="h-4 bg-gray-200 rounded w-32" /></div>))}</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <Quote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No testimonials yet</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t, idx) => {
                const text = t.content || t.testimonial || ''
                const rating = t.rating || 5
                return (
                  <motion.div key={t.id || idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow" data-testid={`testimonial-card-${idx}`}>
                    <Quote className="h-8 w-8 text-[#C9A962]/20 absolute top-4 right-4" />
                    <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-[#C9A962] text-[#C9A962]' : 'text-gray-300'}`} />))}</div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">&ldquo;{text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center text-white dark:text-gray-900 font-semibold text-sm">{t.name?.charAt(0) || '?'}</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {t.role && <span>{t.role}</span>}
                          {t.company && <><span className="text-gray-300">|</span><span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{t.company}</span></>}
                          {t.location && <><span className="text-gray-300">|</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.location}</span></>}
                        </div>
                      </div>
                    </div>
                    {t.project_type && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#C9A962]/10 text-[#C9A962]">{t.project_type}</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Join Our Clients</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Ready to Transform Your Space?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join our satisfied clients and experience the LEXA difference.</p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
                <Link href="/consultation" data-testid="testimonials-consultation-btn">Book Free Consultation <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link href="/projects" data-testid="testimonials-projects-btn">View Our Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
