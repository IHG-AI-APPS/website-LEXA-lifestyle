'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, CheckCircle2, Brain, Shield, Sun, Thermometer, Mic, Tv, Wifi, Home,
  Leaf, Droplets, Building2, Zap, Users, Sparkles, Monitor, Volume2, Cpu, Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface IntelligenceFeature {
  id: string; title: string; description?: string; detailed_description?: string; short_description?: string
  category: string; category_name?: string; image?: string; price?: number; slug?: string
  features?: string[]; benefits?: string[]; scenarios?: Array<{ room: string; scenario: string }>
  feature_cards?: Array<{ title: string; description: string; benefits: string[] }>
  faqs?: Array<{ question: string; answer: string }>
  related_solutions?: string[]; iq_points?: number; is_premium?: boolean
}

const categoryIcons: Record<string, any> = {
  lighting: Sun, security: Shield, climate: Thermometer, voice_ai: Mic, entertainment: Tv,
  network: Wifi, convenience: Home, wellness: Leaf, water: Droplets, outdoor: Building2,
  shading: Sun, appliances: Zap, pets: Users, elderly: Users, cleaning: Sparkles
}

const categoryNames: Record<string, string> = {
  lighting: 'Smart Lighting', security: 'Security & Safety', climate: 'Climate Control',
  voice_ai: 'Voice & AI', entertainment: 'Entertainment', network: 'Networking',
  convenience: 'Convenience', wellness: 'Wellness', water: 'Water Management',
  outdoor: 'Outdoor Living', shading: 'Shading & Blinds', appliances: 'Smart Appliances',
  pets: 'Pet Care', elderly: 'Elderly Care', cleaning: 'Smart Cleaning'
}

export default function IntelligenceDetailPage() {
  const cms = useCms('page_intelligence_detail', null)
  const params = useParams()
  const featureId = params.id as string
  const { language } = useLanguage()
  const { addItem } = useRecentlyViewed()
  
  const [feature, setFeature] = useState<IntelligenceFeature | null>(null)
  const [relatedFeatures, setRelatedFeatures] = useState<IntelligenceFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  useEffect(() => {
    if (!featureId) return
    const fetchFeature = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/intelligence/features?limit=200`)
        if (!response.ok) return
        const data = await response.json()
        const allFeatures = data.features || []
        const found = allFeatures.find((f: IntelligenceFeature) => f.id === featureId || f.slug === featureId || String(allFeatures.indexOf(f)) === featureId)
        if (found) {
          setFeature(found)
          addItem({ id: found.id || featureId, type: 'service', slug: found.slug || featureId, title: found.title, image: found.image, category: found.category })
          setRelatedFeatures(allFeatures.filter((f: IntelligenceFeature) => f.category === found.category && f.id !== found.id && f.title !== found.title).slice(0, 6))
        }
      } catch (error) { console.error('Failed to load intelligence feature:', error) }
      finally { setLoading(false) }
    }
    fetchFeature()
  }, [featureId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="h-[480px] bg-gray-200" />
          <div className="container mx-auto px-8 py-12"><div className="h-10 bg-gray-200 rounded w-1/2 mb-4" /></div>
        </div>
      </div>
    )
  }

  if (!feature) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <Brain className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-4xl font-bold mb-4" data-testid="not-found-title">Feature Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find this intelligence feature.</p>
        <Link href="/intelligence"><Button variant="outline">Back to Intelligence</Button></Link>
      </div>
    )
  }

  const Icon = categoryIcons[feature.category] || Brain
  const categoryName = categoryNames[feature.category] || feature.category_name || feature.category
  const description = feature.detailed_description || feature.description || feature.short_description || ''
  const featureCards = feature.feature_cards || []
  const featureCardIcons = [Monitor, Volume2, Cpu]
  const allFaqs = feature.faqs || []
  const scenarios = feature.scenarios || []
  const benefits = feature.benefits || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="intelligence-detail-page">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="feature-category">
                {categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight" data-testid="feature-title">
                {feature.title}
              </h1>
              <p className="text-base text-gray-300 mb-6 max-w-lg leading-relaxed">{description}</p>
              {feature.iq_points && (
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <Sparkles className="h-4 w-4 text-[#C9A962]" />
                  <span className="text-sm font-semibold">{feature.iq_points} IQ Points</span>
                  {feature.is_premium && <span className="text-xs bg-[#C9A962] text-gray-900 px-2 py-0.5 rounded-full font-bold">Premium</span>}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta-quote">
                  Get a Free Quote <ArrowRight className="ml-2" size={18} />
                </Button>
                <a href="tel:+971503267227">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10"><Phone className="mr-2" size={16} /> Call Us</Button>
                </a>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="p-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Icon className="h-32 w-32 text-[#C9A962]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits + Scenarios — Content Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">What This Delivers</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                  Intelligent {feature.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{description}</p>
                
                {benefits.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {benefits.map((benefit, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-colors">
                        <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  {scenarios.length > 0 && (
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Smart Scenarios</h3>
                      <div className="space-y-4">
                        {scenarios.slice(0, 4).map((s, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-[#C9A962] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{s.room}</p>
                              <p className="text-xs text-gray-400">{s.scenario}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button size="lg" className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="sidebar-cta">
                    Request Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards — What You Get */}
      {featureCards.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="feature-cards-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">System Categories</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What You Get</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureCards.map((card, i) => {
                  const IconComp = featureCardIcons[i] || Sparkles
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                      <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                      <div className="p-7">
                        <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                          <IconComp className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{card.description}</p>
                        {card.benefits?.length > 0 && (
                          <ul className="space-y-2">
                            {card.benefits.map((benefit, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />{benefit}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Features */}
      {relatedFeatures.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="related-features-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Explore More</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Related {categoryName} Features</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relatedFeatures.map((related, i) => {
                  const RelIcon = categoryIcons[related.category] || Brain
                  return (
                    <motion.div key={related.id || i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                      <Link href={`/intelligence/${related.id || i}`}
                        className="group block relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 hover:shadow-xl transition-all p-6 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-gray-800 flex items-center justify-center group-hover:bg-[#C9A962] transition-colors">
                            <RelIcon className="text-white group-hover:text-gray-900 transition-colors" size={18} />
                          </div>
                          {related.is_premium && <span className="text-[10px] bg-[#C9A962] text-gray-900 px-2 py-0.5 rounded-full font-bold uppercase">Premium</span>}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#C9A962] transition-colors text-sm">{related.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{related.short_description || related.description}</p>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {allFaqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="faq-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {allFaqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Upgrade Your Space with {feature.title}</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get a bespoke proposal from our engineering team. Free consultation with no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-get-quote">
                Get a Free Quote
              </Button>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">Book Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}
