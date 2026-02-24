'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  name: string
  slug: string
  faqs: FAQ[]
}

export default function FAQPage() {
  const { language } = useLanguage()
  const [categories, setCategories] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Fetch FAQs from solutions and services
        const [solRes, svcRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/solutions`),
          fetch(`${BACKEND_URL}/api/services`)
        ])

        const solutions = solRes.ok ? await solRes.json() : []
        const services = svcRes.ok ? await svcRes.json() : []

        const cats: FAQCategory[] = []

        // General FAQs
        cats.push({
          name: 'General',
          slug: 'general',
          faqs: [
            { question: 'What is LEXA?', answer: 'LEXA is a premium smart home automation company based in Dubai, UAE. We design, install, and support comprehensive home automation systems for luxury residences, commercial spaces, and marine vessels across the GCC region.' },
            { question: 'Which areas does LEXA serve?', answer: 'LEXA primarily serves Dubai, Abu Dhabi, and the wider UAE. We also work across the GCC including Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Select projects are undertaken in MENA and Africa.' },
            { question: 'How do I get started with LEXA?', answer: 'You can start by booking a free consultation through our website, visiting our Experience Centre in Dubai, or contacting us via WhatsApp. Our team will assess your needs and provide a tailored proposal.' },
            { question: 'Does LEXA offer after-sales support?', answer: 'Yes, LEXA provides comprehensive after-sales support including AMC (Annual Maintenance Contracts), 24/7 emergency support, remote diagnostics, and regular system health checks.' },
            { question: 'What brands does LEXA work with?', answer: 'We partner with world-class brands including Control4, Crestron, Savant, Lutron, Sonos, Bowers & Wilkins, McIntosh, JBL Synthesis, Focal, KEF, and many more. Visit our Brands page for the full list.' },
            { question: 'Can LEXA retrofit an existing home?', answer: 'Absolutely. Many of our solutions support retrofit installations with minimal disruption. Our team will assess your property and recommend the most efficient approach, whether wired or wireless.' },
          ]
        })

        // Extract FAQs from services
        const svcArray = Array.isArray(services) ? services : services.services || []
        for (const svc of svcArray) {
          if (svc.faqs && svc.faqs.length > 0) {
            cats.push({
              name: svc.name || svc.title || 'Service',
              slug: svc.slug || '',
              faqs: svc.faqs.slice(0, 6)
            })
          }
        }

        // Extract FAQs from top solutions (limit to prevent overwhelming)
        const solArray = Array.isArray(solutions) ? solutions : solutions.solutions || []
        let solCount = 0
        for (const sol of solArray) {
          if (sol.faqs && sol.faqs.length > 0 && solCount < 10) {
            cats.push({
              name: sol.title || sol.name || 'Solution',
              slug: sol.slug || '',
              faqs: sol.faqs.slice(0, 4)
            })
            solCount++
          }
        }

        setCategories(cats)
      } catch (error) {
        console.error('Failed to load FAQs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Filter FAQs based on search
  const filteredCategories = searchQuery
    ? categories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.faqs.length > 0)
    : categories

  const totalFAQs = filteredCategories.reduce((sum, cat) => sum + cat.faqs.length, 0)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" data-testid="faq-page">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-[#1A1A1A] text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-8 h-[2px] bg-[#9F8B65] mx-auto mb-6" />
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
              {language === 'ar' ? 'مركز المساعدة' : 'Help Centre'}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-outfit" data-testid="faq-title">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {language === 'ar'
                ? 'اعثر على إجابات لأكثر الأسئلة شيوعًا حول حلول المنزل الذكي لدينا'
                : 'Find answers to the most common questions about our smart home solutions'}
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في الأسئلة...' : 'Search questions...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-base"
                data-testid="faq-search"
              />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              {totalFAQs} {language === 'ar' ? 'سؤال متاح' : 'questions available'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
                  <div className="space-y-3">
                    <div className="h-14 bg-gray-100 dark:bg-gray-800 rounded" />
                    <div className="h-14 bg-gray-100 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                {language === 'ar' ? 'جرب كلمات بحث مختلفة' : 'Try different search terms'}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, catIdx) => (
                <motion.div
                  key={category.slug || catIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.05 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#9F8B65] rounded-full" />
                    {category.name}
                  </h2>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
                    {category.faqs.map((faq, faqIdx) => {
                      const key = `${catIdx}-${faqIdx}`
                      const isOpen = openItems[key]
                      return (
                        <div key={faqIdx} data-testid={`faq-item-${catIdx}-${faqIdx}`}>
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            data-testid={`faq-toggle-${catIdx}-${faqIdx}`}
                          >
                            <span className="font-medium text-gray-900 dark:text-white pr-4 text-sm sm:text-base">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4">
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {language === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Didn't find what you're looking for?"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {language === 'ar'
              ? 'فريقنا جاهز لمساعدتك'
              : 'Our team is ready to help you'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#1A1A1A] hover:bg-black text-white">
              <Link href="/contact" data-testid="faq-contact-btn">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600">
              <Link href="/consultation" data-testid="faq-consultation-btn">
                {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
