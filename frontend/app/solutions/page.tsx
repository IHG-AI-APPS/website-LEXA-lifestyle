'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ArrowUpRight, Eye } from 'lucide-react'
import { getSolutions, type Solution } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import dynamic from 'next/dynamic'
import { useCms } from '@/hooks/useCms'
import { ArrowRight } from 'lucide-react'
import QuickViewModal from '@/components/QuickViewModal'

const SwipeCarousel = dynamic(() => import('@/components/mobile/SwipeCarousel'), { ssr: false })

const RecentlyViewedSection = dynamic(() => import('@/components/widgets/RecentlyViewedSection').catch(() => ({ default: () => null })), {
  ssr: false
})

export default function SolutionsPage() {
  const cms = useCms('page_solutions_listing', null)

  const { language } = useLanguage()
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [quickViewItem, setQuickViewItem] = useState<any>(null)

  useEffect(() => {
    getSolutions()
      .then(data => {
        setSolutions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load solutions:', err)
        setLoading(false)
      })
  }, [])

  // Group solutions by category
  const groupedSolutions = {
    residential: solutions.filter(s => s.mega_menu_category === 'residential'),
    commercial: solutions.filter(s => s.mega_menu_category === 'commercial'),
    specialized: solutions.filter(s => s.mega_menu_category === 'specialized'),
    other: solutions.filter(s => !s.mega_menu_category || s.mega_menu_category === 'uncategorized')
  }

  const categoryConfig = {
    residential: { 
      title: language === 'ar' ? 'الحلول السكنية' : 'Residential Solutions', 
      subtitle: language === 'ar' ? 'العيش الذكي وأتمتة المنزل' : 'Smart Living & Home Automation', 
      color: 'blue' 
    },
    commercial: { 
      title: language === 'ar' ? 'الحلول التجارية' : 'Commercial Solutions', 
      subtitle: language === 'ar' ? 'الأعمال والضيافة' : 'Business & Hospitality', 
      color: 'gold' 
    },
    specialized: { 
      title: language === 'ar' ? 'الحلول المتخصصة' : 'Specialized Solutions', 
      subtitle: language === 'ar' ? 'المشاريع المميزة والمخصصة' : 'Premium & Custom Projects', 
      color: 'orange' 
    },
    other: { 
      title: language === 'ar' ? 'حلول أخرى' : 'Other Solutions', 
      subtitle: language === 'ar' ? 'خدمات إضافية' : 'Additional Services', 
      color: 'gray' 
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading solutions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="solutions-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
              {language === 'ar' ? 'حلولنا' : 'Our Solutions'}
            </span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="solutions-title">
              {language === 'ar' ? 'أنظمة متكاملة' : 'Integrated Systems'}
            </h1>
            <p className="hero-animate-desc text-sm sm:text-base text-gray-300 max-w-lg mx-auto">
              {language === 'ar' 
                ? 'كل حل مصمم للعمل معًا بسلاسة. واجهة واحدة. تحكم كامل.'
                : 'Every solution designed to work together seamlessly. One interface. Total control.'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Residential Solutions */}
          {groupedSolutions.residential.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2 block">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{categoryConfig.residential.title}</h2>
                <p className="text-lg text-gray-600 dark:text-zinc-400">{categoryConfig.residential.subtitle}</p>
              </motion.div>

              <div className="space-y-2">
                {groupedSolutions.residential.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/solutions/${solution.slug}`}>
                      <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-1">
                            <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="lg:col-span-4">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                              {solution.category}
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                              {solution.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-5">
                            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                              {solution.description}
                            </p>
                          </div>
                          <div className="lg:col-span-2 flex items-center justify-end gap-3">
                            <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setQuickViewItem({
                                    title: solution.title,
                                    image: solution.image,
                                    description: solution.description,
                                    category: solution.category,
                                    features: solution.features,
                                    href: `/solutions/${solution.slug}`
                                  })
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-500 hover:bg-[#C9A962] hover:text-white hover:border-[#C9A962] transition-all"
                                data-testid={`quickview-solution-${index}`}
                              >
                                <Eye size={16} />
                              </button>
                              <ArrowUpRight
                              size={28}
                              className="text-black dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C9A962] transition-all duration-300"
                              strokeWidth={2}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Commercial Solutions */}
          {groupedSolutions.commercial.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2 block">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{categoryConfig.commercial.title}</h2>
                <p className="text-lg text-gray-600 dark:text-zinc-400">{categoryConfig.commercial.subtitle}</p>
              </motion.div>

              <div className="space-y-2">
                {groupedSolutions.commercial.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/solutions/${solution.slug}`}>
                      <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-1">
                            <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="lg:col-span-4">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                              {solution.category}
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                              {solution.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-5">
                            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                              {solution.description}
                            </p>
                          </div>
                          <div className="lg:col-span-2 flex items-center justify-end gap-3">
                            <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setQuickViewItem({
                                    title: solution.title,
                                    image: solution.image,
                                    description: solution.description,
                                    category: solution.category,
                                    features: solution.features,
                                    href: `/solutions/${solution.slug}`
                                  })
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-500 hover:bg-[#C9A962] hover:text-white hover:border-[#C9A962] transition-all"
                                data-testid={`quickview-solution-${index}`}
                              >
                                <Eye size={16} />
                              </button>
                              <ArrowUpRight
                              size={28}
                              className="text-black dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C9A962] transition-all duration-300"
                              strokeWidth={2}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Specialized Solutions */}
          {groupedSolutions.specialized.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2 block">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{categoryConfig.specialized.title}</h2>
                <p className="text-lg text-gray-600 dark:text-zinc-400">{categoryConfig.specialized.subtitle}</p>
              </motion.div>

              <div className="space-y-2">
                {groupedSolutions.specialized.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/solutions/${solution.slug}`}>
                      <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-1">
                            <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="lg:col-span-4">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                              {solution.category}
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                              {solution.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-5">
                            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                              {solution.description}
                            </p>
                          </div>
                          <div className="lg:col-span-2 flex items-center justify-end gap-3">
                            <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setQuickViewItem({
                                    title: solution.title,
                                    image: solution.image,
                                    description: solution.description,
                                    category: solution.category,
                                    features: solution.features,
                                    href: `/solutions/${solution.slug}`
                                  })
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-500 hover:bg-[#C9A962] hover:text-white hover:border-[#C9A962] transition-all"
                                data-testid={`quickview-solution-${index}`}
                              >
                                <Eye size={16} />
                              </button>
                              <ArrowUpRight
                              size={28}
                              className="text-black dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C9A962] transition-all duration-300"
                              strokeWidth={2}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Other Solutions (if any) */}
          {groupedSolutions.other.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2 block">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{categoryConfig.other.title}</h2>
                <p className="text-lg text-gray-600 dark:text-zinc-500">{categoryConfig.other.subtitle}</p>
              </motion.div>

              <div className="space-y-2">
                {groupedSolutions.other.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/solutions/${solution.slug}`}>
                      <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-1">
                            <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="lg:col-span-4">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                              {solution.category}
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                              {solution.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-5">
                            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                              {solution.description}
                            </p>
                          </div>
                          <div className="lg:col-span-2 flex items-center justify-end gap-3">
                            <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setQuickViewItem({
                                    title: solution.title,
                                    image: solution.image,
                                    description: solution.description,
                                    category: solution.category,
                                    features: solution.features,
                                    href: `/solutions/${solution.slug}`
                                  })
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-500 hover:bg-[#C9A962] hover:text-white hover:border-[#C9A962] transition-all"
                                data-testid={`quickview-solution-${index}`}
                              >
                                <Eye size={16} />
                              </button>
                              <ArrowUpRight
                              size={28}
                              className="text-black dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C9A962] transition-all duration-300"
                              strokeWidth={2}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Recently Viewed Section */}
      <RecentlyViewedSection 
        maxItems={4} 
        variant="horizontal" 
        className="bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-zinc-800" 
      />

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        item={quickViewItem}
      />
    </div>
  )
}
