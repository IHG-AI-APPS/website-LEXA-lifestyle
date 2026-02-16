'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Phone, Clock, Award, Users, Target, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProcessWheel from '@/components/ProcessWheel'
import StatsGrid from '@/components/StatsGrid'
import PackageComparison from '@/components/PackageComparison'
import RelatedServices from '../components/RelatedServices'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

interface Service {
  id: string
  slug: string
  title: string
  category: string
  description: string
  long_description?: string
  image: string
  features?: string[]
  process_steps?: Array<{
    title: string
    description: string
    duration: string
    deliverables?: string[]
  }>
  deliverables?: string[]
  why_choose?: Array<{
    title: string
    description: string
  }>
  case_studies?: Array<{
    title: string
    challenge?: string
    solution?: string
    result?: string
  }>
  pricing_guide?: {
    starting_from?: string
    typical_range?: string
    price_range?: string
    factors?: string[]
    includes?: string
    timeline?: string
  }
  home_cinema_packages?: Array<{
    tier: string
    features: string[]
    price_range: string
  }>
  security_packages?: Array<{
    tier: string
    cameras?: string
    smart_locks?: string
    features: string[]
    price_range: string
  }>
  network_packages?: Array<{
    tier: string
    aps?: string
    coverage?: string
    features: string[]
    price_range: string
  }>
  support_tiers?: Array<{
    tier: string
    description: string
    price: string
  }>
  faq?: Array<{
    question: string
    answer: string
  }>
  icon?: string
  tags?: string[]
}

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addItem } = useRecentlyViewed()

  useEffect(() => {
    async function fetchService() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
        const response = await fetch(`${apiUrl}/api/services/${params.slug}`)
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setService(data)
        
        // Track this service as recently viewed
        addItem({
          id: data.id || data.slug,
          type: 'service',
          slug: data.slug,
          title: data.title,
          image: data.image,
          category: data.category
        })
        
        // Fetch related services
        try {
          const servicesResponse = await fetch(`${apiUrl}/api/services`)
          if (servicesResponse.ok) {
            const servicesData = await servicesResponse.json()
            const servicesArray = Array.isArray(servicesData) ? servicesData : servicesData.services || []
            setRelatedServices(servicesArray)
          }
        } catch (err) {
          console.error('Failed to load related services:', err)
        }
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchService()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/services">
          <Button variant="outline">View All Services</Button>
        </Link>
      </div>
    )
  }

  // Prepare stats from service data
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Expert Engineers' }
  ]

  // Prepare packages for comparison
  let packages: any[] = []
  if (service.home_cinema_packages && service.home_cinema_packages.length > 0) {
    packages = service.home_cinema_packages.map(pkg => ({
      tier: pkg.tier,
      price_range: pkg.price_range,
      features: pkg.features,
      popular: pkg.tier.toLowerCase().includes('premium')
    }))
  } else if (service.security_packages && service.security_packages.length > 0) {
    packages = service.security_packages.map(pkg => ({
      tier: pkg.tier,
      price_range: pkg.price_range,
      features: pkg.features,
      popular: pkg.tier.toLowerCase().includes('comprehensive')
    }))
  } else if (service.network_packages && service.network_packages.length > 0) {
    packages = service.network_packages.map(pkg => ({
      tier: pkg.tier,
      price_range: pkg.price_range,
      features: pkg.features,
      popular: pkg.tier.toLowerCase().includes('smart villa')
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <SafeImage
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK TO SERVICES
              </Link>

              <div className="text-xs tracking-[0.3em] uppercase text-[#E8DCC8] mb-4">
                {service.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      {/* Overview Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed">
                  {service.long_description || service.description}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-3">
                {(service.features || []).map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#E8DCC8] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Process</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              We follow a structured approach to ensure excellent results
            </p>
          </div>
          <ProcessWheel steps={service.process_steps} />
        </section>
      )}

      {/* Packages Section */}
      {packages.length > 0 && (
        <PackageComparison packages={packages} title="Choose Your Package" />
      )}

      {/* Support Tiers */}
      {service.support_tiers && service.support_tiers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Support Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {service.support_tiers.map((tier, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#E8DCC8] transition">
                  <h3 className="text-xl font-bold mb-3">{tier.tier}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-2xl font-bold text-[#E8DCC8]">{tier.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      {service.why_choose && service.why_choose.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose LEXA</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.why_choose.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#E8DCC8] flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#1A1A1A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-gray-300">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Receive</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <FileText className="w-5 h-5 text-[#E8DCC8] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {service.case_studies && service.case_studies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
            <div className="space-y-8">
              {service.case_studies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg border-2 border-gray-200"
                >
                  <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                  {study.challenge && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                  )}
                  {study.solution && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                  )}
                  {study.result && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Result:</h4>
                      <p className="text-gray-700 font-medium">{study.result}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {service.pricing_guide && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Investment & Timeline</h2>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                {(service.pricing_guide.starting_from || service.pricing_guide.typical_range || service.pricing_guide.price_range) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#E8DCC8]" />
                      Pricing Range
                    </h3>
                    {service.pricing_guide.starting_from && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Starting from:</span> {service.pricing_guide.starting_from}
                      </p>
                    )}
                    {service.pricing_guide.typical_range && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Typical range:</span> {service.pricing_guide.typical_range}
                      </p>
                    )}
                    {service.pricing_guide.price_range && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Range:</span> {service.pricing_guide.price_range}
                      </p>
                    )}
                  </div>
                )}
                {service.pricing_guide.timeline && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#E8DCC8]" />
                      Timeline
                    </h3>
                    <p className="text-gray-700">{service.pricing_guide.timeline}</p>
                  </div>
                )}
              </div>
              {service.pricing_guide.includes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-2">What&apos;s Included:</h4>
                  <p className="text-gray-700 text-sm">{service.pricing_guide.includes}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Use faqs (primary) or faq (legacy) */}
      {((service.faqs && service.faqs.length > 0) || (service.faq && service.faq.length > 0)) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {(service.faqs || service.faq || []).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg border border-gray-200"
                >
                  <h3 className="font-bold text-lg mb-3">{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our team for a free consultation and detailed quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#E8DCC8] text-black hover:bg-[#d4c8b4] text-lg px-8">
                Book Consultation
              </Button>
            </Link>
            <a href="tel:+971426704270">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call: +971 42 670 4270
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <RelatedServices services={relatedServices} currentSlug={service.slug} />
      )}
    </div>
  )
}
