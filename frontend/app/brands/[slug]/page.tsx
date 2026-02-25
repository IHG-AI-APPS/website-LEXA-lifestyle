'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, MapPin, Calendar, Award, ExternalLink, Monitor, Volume2, Cpu, Sparkles, ShoppingBag } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useCms } from '@/hooks/useCms'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface Product {
  name: string
  description: string
  image: string
  price_range?: string
}

interface FeatureCard {
  title: string
  description: string
  benefits: string[]
}

interface SolutionItem {
  slug: string
  title: string
  image: string
  category?: string
}

interface BrandData {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  website?: string
  categories: string[]
  featured: boolean
  country?: string
  year_established?: string
  tagline?: string
  hero_image?: string
  priority?: number
  products?: Product[]
  seo_title?: string
  seo_description?: string
  long_description?: string
  certifications?: string[]
  key_features?: string[]
  gallery_images?: string[]
  feature_cards?: FeatureCard[]
  related_solutions?: string[]
}

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const cms = useCms('page_brands_detail', null)
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [brand, setBrand] = useState<BrandData | null>(null)
  const [otherBrands, setOtherBrands] = useState<BrandData[]>([])
  const [relatedSolutions, setRelatedSolutions] = useState<SolutionItem[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useRecentlyViewed()

  const fetchBrand = useCallback(async () => {
    try {
      const response = await fetch(`${API}/brands/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setBrand(data)
        addItem({ id: data.id || data.slug, type: 'brand', slug: data.slug, title: data.name, image: data.logo, category: data.categories?.[0] })

        // Fetch related solutions
        if (data.related_solutions?.length > 0) {
          try {
            const solRes = await fetch(`${API}/solutions`)
            if (solRes.ok) {
              const solData = await solRes.json()
              const allSols = Array.isArray(solData) ? solData : solData.solutions || []
              setRelatedSolutions(data.related_solutions.map((slug: string) => allSols.find((s: SolutionItem) => s.slug === slug)).filter(Boolean))
            }
          } catch (err) { /* silent */ }
        }
      }
      setLoading(false)
    } catch (error) { setLoading(false) }
  }, [params.slug])

  const fetchOtherBrands = useCallback(async () => {
    try {
      const response = await fetch(`${API}/brands`)
      if (response.ok) {
        const data = await response.json()
        setOtherBrands(data.filter((b: BrandData) => b.slug !== params.slug).slice(0, 8))
      }
    } catch (error) { /* silent */ }
  }, [params.slug])

  useEffect(() => { fetchBrand(); fetchOtherBrands() }, [fetchBrand, fetchOtherBrands])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse"><div className="h-64 bg-gray-200 rounded-xl mb-8" /><div className="h-10 bg-gray-200 rounded w-1/3 mb-4" /><div className="h-4 bg-gray-100 rounded w-2/3 mb-8" /></div>
        </div>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">Brand Not Found</h1>
        <Link href="/brands"><Button variant="outline">Back to Brands</Button></Link>
      </div>
    )
  }

  const galleryImages = brand.gallery_images || []
  const featureCards = (brand.feature_cards || []) as FeatureCard[]
  const featureCardIcons = [Monitor, Volume2, Cpu]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white p-3 rounded-lg">
                  <div className="relative w-24 h-10">
                    <SafeImage src={brand.logo} alt={brand.name} fill className="object-contain" />
                  </div>
                </div>
                {brand.featured && (
                  <span className="px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest">
                    Featured Partner
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-tight" data-testid="brand-title">
                {brand.name}
              </h1>
              {brand.tagline && <p className="text-lg text-[#C9A962] italic mb-4">{brand.tagline}</p>}
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">{brand.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="hero-cta">
                  Get {brand.name} Quote <ArrowRight className="ml-2" size={18} />
                </Button>
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Visit {brand.name} <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={brand.hero_image || brand.logo} alt={brand.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Brand Info + Key Features */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">About {brand.name}</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Brand Overview</h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{brand.long_description || brand.description}</p>

                {brand.key_features && brand.key_features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brand.key_features.map((feature, i) => (
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
                    <h3 className="text-lg font-semibold mb-4">Brand Details</h3>
                    <div className="space-y-4">
                      {brand.country && (
                        <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0"><MapPin size={14} className="text-[#C9A962]" /></div><div><p className="text-sm font-medium">Origin</p><p className="text-xs text-gray-400">{brand.country}</p></div></div>
                      )}
                      {brand.year_established && (
                        <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0"><Calendar size={14} className="text-[#C9A962]" /></div><div><p className="text-sm font-medium">Est. {brand.year_established}</p><p className="text-xs text-gray-400">{new Date().getFullYear() - parseInt(brand.year_established)}+ years</p></div></div>
                      )}
                      {brand.categories?.length > 0 && (
                        <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0"><Award size={14} className="text-[#C9A962]" /></div><div><p className="text-sm font-medium">Categories</p><p className="text-xs text-gray-400">{brand.categories.join(', ')}</p></div></div>
                      )}
                      {brand.certifications && brand.certifications.length > 0 && (
                        <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0"><CheckCircle2 size={14} className="text-[#C9A962]" /></div><div><p className="text-sm font-medium">Certifications</p><p className="text-xs text-gray-400">{brand.certifications.join(', ')}</p></div></div>
                      )}
                    </div>
                  </div>
                  <Button size="lg" className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowConsultationForm(true)} data-testid="sidebar-cta">
                    Request {brand.name} Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      {featureCards.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="feature-cards-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">{brand.name} Ecosystem</span>
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
                            {card.benefits.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" /> {b}
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

      {/* Products */}
      {brand.products && brand.products.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="products-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Top Products</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">{brand.name} Products</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brand.products.map((product, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                    <div className="relative aspect-[4/3]">
                      <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold mb-1 text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{product.description}</p>
                      {product.price_range && (
                        <p className="text-sm font-semibold text-[#C9A962]"><ShoppingBag size={14} className="inline mr-1" />{product.price_range}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Solutions */}
      {relatedSolutions.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="solutions-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Where We Use {brand.name}</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Solutions We Deploy</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedSolutions.map((sol, i) => (
                  <motion.div key={sol.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <Link href={`/solutions/${sol.slug}`} className="group block relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/60 hover:shadow-xl transition-all" data-testid={`sol-card-${sol.slug}`}>
                      <div className="relative aspect-[4/3]">
                        <SafeImage src={sol.image} alt={sol.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm leading-tight">{sol.title}</h3>
                          <span className="text-[#C9A962] text-xs mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ExternalLink size={10} /></span>
                        </div>
                      </div>
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
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="inspirations-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">{brand.name} Installations</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Inspirations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((img, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                      <SafeImage src={typeof img === 'string' ? img : ''} alt={`${brand.name} inspiration ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Authorized Dealer</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Get {brand.name} Installed by LEXA
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              As a certified {brand.name} dealer in the UAE, we provide expert consultation, professional installation, and ongoing support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowConsultationForm(true)} data-testid="cta-quote">
                Request a Quote
              </Button>
              <Link href="/brands">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  View All Brands
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Brands */}
      {otherBrands.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">More Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Explore More Brands</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {otherBrands.map((b, i) => (
                  <Link key={b.slug} href={`/brands/${b.slug}`} className="group flex flex-col items-center justify-center p-5 h-24 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 hover:shadow-md transition-all">
                    <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#C9A962] transition-colors tracking-wide">{b.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{b.categories?.[0] || 'Partner'}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showConsultationForm && <ConsultationForm onClose={() => setShowConsultationForm(false)} initialContext={`Brand Inquiry: ${brand.name}`} />}
    </div>
  )
}
