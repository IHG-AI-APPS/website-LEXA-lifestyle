'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { 
  Check, CheckCircle2, ArrowRight, Home, Zap, Shield, Tv, 
  Plus, ChevronDown, ChevronUp, Monitor, Volume2, Cpu, Sparkles, Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import RelatedPackages from '../components/RelatedPackages'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const tierColorClasses = {
  essential: { border: 'border-blue-500', bg: 'bg-blue-500', bgHover: 'hover:bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-600', borderHover: 'hover:border-blue-500', textHover: 'hover:text-blue-600', shadow: 'shadow-blue-500/20' },
  enhanced: { border: 'border-[#C9A962]', bg: 'bg-[#C9A962]/50', bgHover: 'hover:bg-[#C9A962]', bgLight: 'bg-[#C9A962]/5', text: 'text-[#C9A962]', borderHover: 'hover:border-[#C9A962]', textHover: 'hover:text-[#C9A962]', shadow: 'shadow-[#C9A962]/20' },
  highend: { border: 'border-amber-500', bg: 'bg-amber-500', bgHover: 'hover:bg-amber-600', bgLight: 'bg-amber-50', text: 'text-amber-600', borderHover: 'hover:border-amber-500', textHover: 'hover:text-amber-600', shadow: 'shadow-amber-500/20' }
}

const formatPrice = (price: number) => `AED ${(price / 1000).toFixed(0)}K`

interface FeatureCard { title: string; description: string; benefits: string[] }

export default function PropertyPackageDetailPage() {
  const cms = useCms('page_packages_detail', null)
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [packageData, setPackageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedTier, setExpandedTier] = useState<string | null>(null)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const handleSelectTier = (tierLevel: string) => {
    router.push(`/package-builder?property=${slug}&tier=${tierLevel}`)
  }

  useEffect(() => {
    if (!slug) return
    fetch(`${BACKEND_URL}/api/packages/property-types/${slug}`)
      .then(res => res.json())
      .then(data => { setPackageData(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="h-[480px] bg-gray-200" />
          <div className="container mx-auto px-8 py-12">
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!packageData || packageData.detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4" data-testid="not-found-title">Package Not Found</h1>
        <p className="text-gray-600 mb-8">The package you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/packages"><Button variant="outline">View All Packages</Button></Link>
      </div>
    )
  }

  const featureCards = (packageData.feature_cards || []) as FeatureCard[]
  const featureCardIcons = [Monitor, Volume2, Cpu]
  const allFaqs = packageData.faqs || []
  const galleryImages = packageData.gallery_images || []
  const brands = packageData.brands || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="package-detail-page">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="package-subtitle">
                {packageData.subtitle}
              </span>
              <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="package-title">
                {packageData.title}
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">{packageData.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta-quote">
                  Get a Free Quote <ArrowRight className="ml-2" size={18} />
                </Button>
                <Link href="/package-builder">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Sparkles className="mr-2" size={16} /> Build Custom
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={packageData.image || packageData.hero_image} alt={packageData.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Property Specs */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <Home className="h-7 w-7 mx-auto mb-2 text-[#C9A962]" />
              <p className="text-xs text-gray-500 uppercase tracking-wider">Property Size</p>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{packageData.typical_size_range}</p>
            </div>
            {packageData.typical_features?.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="text-center">
                <CheckCircle2 className="h-7 w-7 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Sidebar */}
      {packageData.long_description && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Package Overview</span>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                    Smart Home Solutions for {packageData.title}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{packageData.long_description}</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="sticky top-28 space-y-5">
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Why Choose LEXA?</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Tailored Design', desc: 'Every package customized for your property' },
                          { label: 'Premium Brands', desc: `${brands.length}+ certified technology partners` },
                          { label: 'Full Integration', desc: 'AV, lighting, climate, security — one system' },
                          { label: 'UAE Expertise', desc: '10+ years in Dubai & Abu Dhabi' }
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
      )}

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
                                <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                                {benefit}
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

      {/* Package Tiers */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950" data-testid="tiers-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Choose Your Level</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Package Tiers</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Select the automation level that fits your lifestyle. Each tier builds on the previous.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            {packageData.tiers?.map((tier: any) => {
              const colors = tierColorClasses[tier.tier_level as keyof typeof tierColorClasses] || tierColorClasses.essential
              const isExpanded = expandedTier === tier.tier_level
              const isRecommended = tier.recommended

              return (
                <motion.div key={tier.tier_level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                  className={`relative rounded-2xl border-2 ${isRecommended ? `${colors.border} shadow-xl lg:scale-105` : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} transition-all duration-300 bg-white dark:bg-gray-900 self-start`}>
                  {isRecommended && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ${colors.bg} text-white text-sm font-bold rounded-full z-10`} data-testid="recommended-badge">
                      {tier.badge}
                    </div>
                  )}
                  <div className="p-6 lg:p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.tier_name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{tier.tier_subtitle}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatPrice(tier.base_price_aed)}</span>
                        <span className="text-gray-600 dark:text-gray-400">+</span>
                      </div>
                      <p className="text-sm text-gray-500">{tier.typical_rooms_count}</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <FeatureSection icon={Zap} title="Lighting" count={tier.lighting_features?.length || 0} colors={colors} />
                      <FeatureSection icon={Home} title="Climate" count={tier.climate_features?.length || 0} colors={colors} />
                      <FeatureSection icon={Shield} title="Security" count={tier.security_features?.length || 0} colors={colors} />
                      <FeatureSection icon={Tv} title="Entertainment" count={tier.entertainment_features?.length || 0} colors={colors} />
                    </div>
                    <button onClick={() => setExpandedTier(isExpanded ? null : tier.tier_level)} data-testid={`toggle-tier-${tier.tier_level}`}
                      className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition-colors mb-4 flex items-center justify-center gap-2 ${isRecommended ? `${colors.bg} text-white ${colors.bgHover} ${colors.border}` : `border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 ${colors.borderHover} ${colors.textHover}`}`}>
                      {isExpanded ? 'Hide Details' : 'View Full Features'}
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    <button onClick={() => handleSelectTier(tier.tier_level)} data-testid={`select-tier-${tier.tier_level}`}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${isRecommended ? `${colors.bg} text-white ${colors.bgHover} shadow-lg hover:shadow-xl` : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200'}`}>
                      Select {tier.tier_name} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-gray-200 dark:border-gray-700 p-6 lg:p-8 bg-gray-50 dark:bg-gray-800">
                      <DetailedFeatureList title="Lighting Features" features={tier.lighting_features || []} />
                      <DetailedFeatureList title="Climate Features" features={tier.climate_features || []} />
                      <DetailedFeatureList title="Security Features" features={tier.security_features || []} />
                      <DetailedFeatureList title="Entertainment Features" features={tier.entertainment_features || []} />
                      <DetailedFeatureList title="Additional Features" features={tier.additional_features || []} />
                      {tier.included_specialty_count > 0 && (
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <p className="font-bold text-amber-900 dark:text-amber-300 mb-2"><Plus className="inline h-5 w-5 mr-2" />Choose {tier.included_specialty_count} Specialty Rooms</p>
                          <p className="text-sm text-amber-800 dark:text-amber-400">Wine Room, Vault, Game Room, Home Bar, Spa, Gym, and more</p>
                        </div>
                      )}
                      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Support Level:</p>
                        <p>{tier.support_level}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brands We Partner With */}
      {brands.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="brands-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Certified Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Brands We Integrate</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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

      {/* Inspirations Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="gallery-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Design Ideas</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Inspirations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((img: string, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                      <SafeImage src={typeof img === 'string' ? img : ''} alt={`${packageData.title} inspiration ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
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
                {allFaqs.map((faq: any, i: number) => (
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

      {/* Related Packages */}
      <RelatedPackages currentSlug={slug} currentTitle={packageData.title} />

      {/* CTA Section */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Let&apos;s Design Your {packageData.title} System
            </h2>
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

      <PricingDisclaimer variant="light" />

      {showConsultationForm && <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />}
    </div>
  )
}

function FeatureSection({ icon: Icon, title, count, colors }: any) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className={`p-2 rounded-lg ${colors.bgLight}`}><Icon className={`h-4 w-4 ${colors.text}`} /></div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-gray-500">{count} features</p>
      </div>
    </div>
  )
}

function DetailedFeatureList({ title, features }: { title: string; features: string[] }) {
  if (!features.length) return null
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /><span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
