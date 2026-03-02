'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface FAQ { question: string; answer: string }
interface FAQCategory { name: string; slug: string; faqs: FAQ[] }

export default function FAQPage() {
  const cms = useCms('page_faq', null) as any
  const { language } = useLanguage()
  const [categories, setCategories] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const [solRes, svcRes] = await Promise.all([fetch(`${BACKEND_URL}/api/solutions`), fetch(`${BACKEND_URL}/api/services`)])
        const solutions = solRes.ok ? await solRes.json() : []
        const services = svcRes.ok ? await svcRes.json() : []
        const cats: FAQCategory[] = []
        cats.push({
          name: 'General', slug: 'general',
          faqs: [
            { question: 'What is LEXA?', answer: 'LEXA is a premium smart home automation company based in Dubai, UAE. We design, install, and support comprehensive home automation systems for luxury residences, commercial spaces, and marine vessels across the GCC region.' },
            { question: 'Which areas does LEXA serve?', answer: 'LEXA primarily serves Dubai, Abu Dhabi, and the wider UAE. We also work across the GCC including Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.' },
            { question: 'How do I get started with LEXA?', answer: 'You can start by booking a free consultation through our website, visiting our Experience Centre in Dubai, or contacting us via WhatsApp.' },
            { question: 'Does LEXA offer after-sales support?', answer: 'Yes, LEXA provides comprehensive after-sales support including AMC (Annual Maintenance Contracts), 24/7 emergency support, remote diagnostics, and regular system health checks.' },
            { question: 'What brands does LEXA work with?', answer: 'We partner with world-class brands including Control4, Crestron, Savant, Lutron, Sonos, Bowers & Wilkins, McIntosh, JBL Synthesis, Focal, KEF, and many more.' },
            { question: 'Can LEXA retrofit an existing home?', answer: 'Absolutely. Many of our solutions support retrofit installations with minimal disruption. Our team will assess your property and recommend the most efficient approach.' },
          ]
        })
        const svcArray = Array.isArray(services) ? services : services.services || []
        for (const svc of svcArray) { if (svc.faqs?.length > 0) cats.push({ name: svc.name || svc.title, slug: svc.slug || '', faqs: svc.faqs.slice(0, 6) }) }
        const solArray = Array.isArray(solutions) ? solutions : solutions.solutions || []
        let solCount = 0
        for (const sol of solArray) { if (sol.faqs?.length > 0 && solCount < 10) { cats.push({ name: sol.title || sol.name, slug: sol.slug || '', faqs: sol.faqs.slice(0, 4) }); solCount++ } }
        setCategories(cats)
      } catch (error) { console.error('Failed to load FAQs:', error) }
      finally { setLoading(false) }
    }
    fetchFAQs()
  }, [])

  const toggleItem = (key: string) => { setOpenItems(prev => ({ ...prev, [key]: !prev[key] })) }

  const filteredCategories = searchQuery
    ? categories.map(cat => ({ ...cat, faqs: cat.faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) })).filter(cat => cat.faqs.length > 0)
    : categories
  const totalFAQs = filteredCategories.reduce((sum, cat) => sum + cat.faqs.length, 0)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="faq-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1640357960494-9242650846d3?w=1200&q=50)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-[#0A0A0A]/30" />
        </div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Help Centre</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="faq-title">Frequently Asked Questions</h1>
            <p className="text-base text-gray-300 mb-8">Find answers to the most common questions about our smart home solutions</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="text" placeholder="Search questions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-base rounded-xl" data-testid="faq-search" />
            </div>
            <p className="text-sm text-gray-400 mt-4">{totalFAQs} questions available</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
          {loading ? (
            <div className="space-y-6">{[1, 2, 3].map(i => (<div key={i} className="animate-pulse"><div className="h-6 bg-gray-200 rounded w-48 mb-4" /><div className="h-14 bg-gray-100 rounded mb-3" /><div className="h-14 bg-gray-100 rounded" /></div>))}</div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No results found</p>
              <p className="text-gray-400 mt-2">Try different search terms</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredCategories.map((category, catIdx) => (
                <motion.div key={category.slug || catIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.03 }}>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#C9A962] rounded-full" />
                    {category.name}
                  </h2>
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
                    {category.faqs.map((faq, faqIdx) => {
                      const key = `${catIdx}-${faqIdx}`
                      const isOpen = openItems[key]
                      return (
                        <div key={faqIdx} data-testid={`faq-item-${catIdx}-${faqIdx}`}>
                          <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" data-testid={`faq-toggle-${catIdx}-${faqIdx}`}>
                            <span className="font-medium text-gray-900 dark:text-white pr-4 text-sm">{faq.question}</span>
                            <ChevronDown className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4">
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
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
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Need More Help?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Didn&apos;t Find Your Answer?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our team is ready to help you with any questions about smart home automation.</p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
                <Link href="/contact" data-testid="faq-contact-btn">Contact Us <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link href="/consultation" data-testid="faq-consultation-btn">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
