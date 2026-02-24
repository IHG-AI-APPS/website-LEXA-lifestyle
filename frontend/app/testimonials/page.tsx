'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Quote, ArrowRight, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Testimonial {
  id?: string
  name: string
  role?: string
  company?: string
  location?: string
  content?: string
  testimonial?: string
  rating?: number
  image?: string
  project_type?: string
}

export default function TestimonialsPage() {
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/testimonials`)
        if (res.ok) {
          const data = await res.json()
          setTestimonials(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" data-testid="testimonials-page">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-[#1A1A1A] text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-8 h-[2px] bg-[#9F8B65] mx-auto mb-6" />
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              {language === 'ar' ? 'آراء العملاء' : 'Client Reviews'}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-outfit" data-testid="testimonials-title">
              {language === 'ar' ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
            </h1>
            <p className="text-lg text-gray-300">
              {language === 'ar'
                ? 'اكتشف لماذا يثق عملاؤنا في ليكسا لتحويل مساحاتهم'
                : 'Discover why our clients trust LEXA to transform their spaces'}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-lg p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4" />
                  <div className="h-20 bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 rounded mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <Quote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === 'ar' ? 'لا توجد شهادات بعد' : 'No testimonials yet'}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((t, idx) => {
                const text = t.content || t.testimonial || ''
                const rating = t.rating || 5
                return (
                  <motion.div
                    key={t.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-lg p-6 sm:p-8 hover:shadow-lg transition-shadow"
                    data-testid={`testimonial-card-${idx}`}
                  >
                    {/* Quote Icon */}
                    <Quote className="h-8 w-8 text-[#9F8B65]/30 absolute top-4 right-4" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? 'fill-[#9F8B65] text-[#9F8B65]' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                      &ldquo;{text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-semibold text-sm">
                        {t.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white dark:text-white text-sm">
                          {t.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          {t.role && <span>{t.role}</span>}
                          {t.company && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600 dark:text-gray-400 dark:text-gray-400">|</span>
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {t.company}
                              </span>
                            </>
                          )}
                          {t.location && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600 dark:text-gray-400 dark:text-gray-400">|</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {t.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Type Badge */}
                    {t.project_type && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 dark:border-gray-700">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 text-gray-600 dark:text-gray-400 dark:text-gray-400">
                          {t.project_type}
                        </span>
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-white mb-3">
            {language === 'ar' ? 'هل أنت مستعد للتحول؟' : 'Ready to Transform Your Space?'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {language === 'ar'
              ? 'انضم إلى عملائنا الراضين واختبر الفرق مع ليكسا'
              : 'Join our satisfied clients and experience the LEXA difference'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#1A1A1A] hover:bg-black text-white">
              <Link href="/consultation" data-testid="testimonials-consultation-btn">
                {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 dark:border-gray-600">
              <Link href="/projects" data-testid="testimonials-projects-btn">
                {language === 'ar' ? 'شاهد مشاريعنا' : 'View Our Projects'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
