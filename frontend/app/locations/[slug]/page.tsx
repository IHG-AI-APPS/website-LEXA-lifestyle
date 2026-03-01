'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, MapPin, Monitor, Volume2, Cpu, Sparkles, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface FeatureCard { title: string; description: string; benefits: string[] }

export default function LocationPage() {
  const cms = useCms('page_locations_detail', null)
  const params = useParams()
  const slug = params?.slug as string

  const [location, setLocation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`${BACKEND_URL}/api/locations/${slug}`)
      .then(res => { if (!res.ok) throw new Error('Not found'); return res.json() })
      .then(data => { setLocation(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
        <div className="animate-pulse">
          <div className="h-[480px] bg-gray-200" />
          <div className="container mx-auto px-8 py-12"><div className="h-10 bg-gray-200 rounded w-1/2 mb-4" /></div>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <MapPin className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-4xl font-bold mb-4" data-testid="not-found-title">Location Not Found</h1>
        <p className="text-gray-600 mb-8">The location you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/solutions"><Button variant="outline">View Our Solutions</Button></Link>
      </div>
    )
  }

  const featureCards = (location.feature_cards || []) as FeatureCard[]
  const featureCardIcons = [Monitor, Volume2, Cpu]
  const allFaqs = location.faqs || []
  const brands = location.brands || []
  const features = location.features || []
  const relatedSolutions = location.related_solutions || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="location-detail-page">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-[#C9A962]" />
                <span className="text-sm text-gray-400">{location.region || location.name}</span>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="location-region">
                Smart Home Automation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="location-title">
                {location.title || location.name}
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">{location.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta-quote">
                  Private Design Session <ArrowRight className="ml-2" size={18} />
                </Button>
                <Link href="/calculator">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Get Pricing</Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={location.hero_image} alt={location.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Content — Location Details + Sidebar */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">{location.name} Expertise</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                  Smart Home Solutions for {location.name}
                </h2>
                {location.long_description && (
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{location.long_description}</p>
                )}
                {features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature: string, i: number) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-colors">
                        <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Why Choose LEXA?</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Local Expertise', desc: `Dedicated ${location.name} service team` },
                        { label: 'Premium Brands', desc: `${brands.length}+ certified technology partners` },
                        { label: 'Full Integration', desc: 'AV, lighting, climate, security — one system' },
                        { label: 'Fast Support', desc: 'Same-day response across the UAE' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#C9A962] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Capabilities</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What We Deliver in {location.name}</h2>
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

      {/* Related Solutions */}
      {relatedSolutions.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="related-solutions-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Popular in {location.name}</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Solutions We Deploy</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relatedSolutions.map((sol: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <Link href={`/solutions/${sol}`}
                      className="group block p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 hover:shadow-lg transition-all h-full">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#C9A962] transition-colors capitalize">
                        {sol.replace(/-/g, ' ')}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-2 group-hover:text-[#C9A962] transition-colors">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brands We Partner With */}
      {brands.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="brands-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Certified Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Brands We Integrate</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {brands.map((brand: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.04 }} className="group">
                    <Link href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex flex-col items-center justify-center p-5 h-24 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 hover:shadow-md transition-all">
                      <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#C9A962] transition-colors tracking-wide">{brand}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Partner</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {allFaqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="faq-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {allFaqs.map((faq: any, i: number) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
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
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Ready to Automate Your {location.name} Home?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Book a private design session for your property. Free consultation with no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-get-quote">
                Villa Technology Review
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
