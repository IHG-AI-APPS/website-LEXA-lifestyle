'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { CheckCircle2, Phone, ArrowRight, Monitor, Volume2, Cpu, Sparkles, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProcessWheel from '@/components/ProcessWheel'
import PackageComparison from '@/components/PackageComparison'
import RelatedServices from '../components/RelatedServices'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useCms } from '@/hooks/useCms'

interface FeatureCard {
  title: string
  description: string
  benefits: string[]
}

interface Service {
  id: string
  slug: string
  title: string
  category: string
  description: string
  long_description?: string
  image: string
  features?: string[]
  process_steps?: Array<{ title: string; description: string; duration: string; deliverables?: string[] }>
  deliverables?: string[]
  why_choose?: Array<{ title: string; description: string }>
  case_studies?: Array<{ title: string; challenge?: string; solution?: string; result?: string }>
  pricing_guide?: { starting_from?: string; typical_range?: string; price_range?: string; factors?: string[]; includes?: string; timeline?: string }
  home_cinema_packages?: Array<{ tier: string; features: string[]; price_range: string }>
  security_packages?: Array<{ tier: string; cameras?: string; smart_locks?: string; features: string[]; price_range: string }>
  network_packages?: Array<{ tier: string; aps?: string; coverage?: string; features: string[]; price_range: string }>
  support_tiers?: Array<{ tier: string; description: string; price: string }>
  faq?: Array<{ question: string; answer: string }>
  faqs?: Array<{ question: string; answer: string }>
  brands?: string[]
  gallery_images?: string[]
  feature_cards?: FeatureCard[]
  related_products?: string[]
  icon?: string
  tags?: string[]
}

interface SolutionItem {
  slug: string
  title: string
  image: string
  category?: string
}

export default function ServiceDetailPage() {
  const cms = useCms('page_services_detail', null)
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [productSolutions, setProductSolutions] = useState<SolutionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addItem } = useRecentlyViewed()

  useEffect(() => {
    async function fetchService() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
        const response = await fetch(`${apiUrl}/api/services/${params.slug}`)
        if (!response.ok) { setError(true); return }
        const data = await response.json()
        setService(data)

        addItem({ id: data.id || data.slug, type: 'service', slug: data.slug, title: data.title, image: data.image, category: data.category })

        // Fetch related services
        try {
          const servicesRes = await fetch(`${apiUrl}/api/services`)
          if (servicesRes.ok) {
            const servicesData = await servicesRes.json()
            setRelatedServices(Array.isArray(servicesData) ? servicesData : servicesData.services || [])
          }
        } catch (err) { console.error('Failed to load related services:', err) }

        // Fetch product solutions from related_products slugs
        if (data.related_products && data.related_products.length > 0) {
          try {
            const solRes = await fetch(`${apiUrl}/api/solutions`)
            if (solRes.ok) {
              const solData = await solRes.json()
              const allSols = Array.isArray(solData) ? solData : solData.solutions || []
              const matched = data.related_products
                .map((slug: string) => allSols.find((s: SolutionItem) => s.slug === slug))
                .filter(Boolean)
              setProductSolutions(matched)
            }
          } catch (err) { console.error('Failed to load solutions:', err) }
        }
      } catch (err) { setError(true) } finally { setLoading(false) }
    }
    if (params.slug) fetchService()
  }, [params.slug])

  // Schema.org structured data
  useEffect(() => {
    if (!service) return
    const faqs = service.faqs || service.faq || []
    const schemas: any[] = []
    if (faqs.length > 0) {
      schemas.push({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) })
    }
    schemas.push({ "@context": "https://schema.org", "@type": "Service", "serviceType": service.title, "name": `${service.title} - LEXA Lifestyle`, "description": service.description, "provider": { "@type": "Organization", "name": "LEXA Lifestyle", "url": "https://lexalifestyle.com" }, "areaServed": { "@type": "Country", "name": "United Arab Emirates" }, "image": service.image })

    document.querySelectorAll('script[data-schema="service-page"]').forEach(el => el.remove())
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'service-page')
    script.textContent = JSON.stringify(schemas)
    document.head.appendChild(script)
    return () => { document.querySelectorAll('script[data-schema="service-page"]').forEach(el => el.remove()) }
  }, [service])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8" />
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-8" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-600 dark:text-zinc-500 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/services"><Button variant="outline">View All Services</Button></Link>
      </div>
    )
  }

  // Prepare packages
  let packages: any[] = []
  if (service.home_cinema_packages?.length) packages = service.home_cinema_packages.map(p => ({ ...p, popular: p.tier.toLowerCase().includes('premium') }))
  else if (service.security_packages?.length) packages = service.security_packages.map(p => ({ ...p, popular: p.tier.toLowerCase().includes('comprehensive') }))
  else if (service.network_packages?.length) packages = service.network_packages.map(p => ({ ...p, popular: p.tier.toLowerCase().includes('smart villa') }))

  const galleryImages = service.gallery_images || []
  const featureCards = (service.feature_cards || []) as FeatureCard[]
  const featureCardIcons = [Monitor, Volume2, Cpu]
  const allFaqs = service.faqs || service.faq || []

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
      {/* Hero — Split Layout */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="service-category">
                {service.category}
              </span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="service-title">
                {service.title}
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" data-testid="hero-cta">
                    Book Consultation <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <a href="tel:+971426704270">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Phone className="mr-2" size={16} /> Call Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={service.image} alt={service.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Service Overview — Content + Features */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Service Overview</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-zinc-400 leading-relaxed mb-8">
                  {service.long_description || service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800 hover:border-[#C9A962]/40 transition-colors">
                        <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-zinc-400">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  <div className="bg-gray-900 dark:bg-[#171717] text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Why Choose LEXA?</h3>
                    <div className="space-y-4">
                      {(service.why_choose || [
                        { title: 'Expert Team', description: '50+ certified engineers & technicians' },
                        { title: 'Proven Track Record', description: '500+ projects delivered in UAE' },
                        { title: 'Full Service', description: 'Design through to ongoing support' },
                        { title: 'UAE Specialist', description: '15+ years in Dubai & Abu Dhabi' }
                      ]).slice(0, 4).map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#C9A962] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {service.pricing_guide && (service.pricing_guide.starting_from || service.pricing_guide.typical_range) && (
                    <div className="bg-[#C9A962]/10 border border-[#C9A962]/30 rounded-xl p-5">
                      <p className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-2">Investment</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {service.pricing_guide.starting_from || service.pricing_guide.typical_range || service.pricing_guide.price_range}
                      </p>
                      {service.pricing_guide.timeline && (
                        <p className="text-xs text-gray-500 mt-1">Timeline: {service.pricing_guide.timeline}</p>
                      )}
                    </div>
                  )}
                  <Link href="/contact">
                    <Button size="lg" className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" data-testid="sidebar-cta">
                      Request a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards — What You Get */}
      {featureCards.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]" data-testid="feature-cards-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Service Breakdown</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What You Get</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureCards.map((card, i) => {
                  const IconComp = featureCardIcons[i] || Sparkles
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="bg-white dark:bg-[#050505] rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow group">
                      <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                      <div className="p-7">
                        <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                          <IconComp className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-zinc-500 mb-5 leading-relaxed">{card.description}</p>
                        {card.benefits?.length > 0 && (
                          <ul className="space-y-2">
                            {card.benefits.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-zinc-400">
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

      {/* Process Section */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="bg-white dark:bg-[#050505] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">How We Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Our Process</h2>
            </div>
          </div>
          <ProcessWheel steps={service.process_steps} />
        </section>
      )}

      {/* Packages */}
      {packages.length > 0 && <PackageComparison packages={packages} title="Choose Your Package" />}

      {/* Solutions We Deploy — Image-based clickable cards */}
      {productSolutions.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="solutions-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Solutions & Systems</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Solutions We Deploy</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-500 mt-2 max-w-2xl mx-auto">
                  Explore the smart systems and technologies we integrate as part of this service
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productSolutions.map((sol, i) => (
                  <motion.div key={sol.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <Link href={`/solutions/${sol.slug}`} className="group block relative rounded-xl overflow-hidden bg-gray-100 dark:bg-[#171717] border border-gray-200 dark:border-zinc-800 hover:border-[#C9A962]/60 hover:shadow-xl transition-all" data-testid={`solution-card-${sol.slug}`}>
                      <div className="relative aspect-[4/3]">
                        <SafeImage src={sol.image} alt={sol.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm leading-tight">{sol.title}</h3>
                          <span className="text-[#C9A962] text-xs mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore <ExternalLink size={10} />
                          </span>
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

      {/* Brands */}
      {service.brands && service.brands.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]" data-testid="brands-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Certified Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Brands We Work With</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {service.brands.map((brand, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.04 }}>
                    <Link href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex flex-col items-center justify-center p-5 h-24 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-zinc-800 hover:border-[#C9A962]/60 hover:shadow-md transition-all">
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
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="inspirations-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Work</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Inspirations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((img, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                      <SafeImage src={typeof img === 'string' ? img : ''} alt={`${service.title} inspiration ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Deliverables</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What You Receive</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {service.deliverables.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-[#050505] rounded-lg border border-gray-100 dark:border-zinc-800 hover:border-[#C9A962]/40 transition-colors">
                    <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-zinc-400">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {service.case_studies && service.case_studies.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Results</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Success Stories</h2>
              </div>
              <div className="space-y-6">
                {service.case_studies.map((study, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-[#0A0A0A] p-7 rounded-xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{study.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {study.challenge && (
                        <div><p className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-1">Challenge</p><p className="text-sm text-gray-600 dark:text-zinc-500">{study.challenge}</p></div>
                      )}
                      {study.solution && (
                        <div><p className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-1">Solution</p><p className="text-sm text-gray-600 dark:text-zinc-500">{study.solution}</p></div>
                      )}
                      {study.result && (
                        <div><p className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold mb-1">Result</p><p className="text-sm text-gray-700 dark:text-zinc-400 font-medium">{study.result}</p></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {allFaqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {allFaqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-[#050505] p-6 rounded-xl border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-500 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Let&apos;s Discuss Your {service.title} Needs
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get a bespoke proposal from our engineering team. Free consultation with no obligation.
            </p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" data-testid="cta-book">
                  Book Consultation
                </Button>
              </Link>
              <a href="tel:+971426704270">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  <Phone className="mr-2" size={16} /> +971 42 670 4270
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <RelatedServices services={relatedServices} currentSlug={service.slug} />
      )}
    </div>
  )
}
