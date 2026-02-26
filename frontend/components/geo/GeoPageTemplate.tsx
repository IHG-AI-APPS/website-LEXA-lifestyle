'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { MapPin, ArrowRight, Phone, CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Community {
  name: string
  type: string
  price?: string
  projects?: string
}

interface Service {
  icon: string
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface Stat {
  value: string
  label: string
}

export interface GeoPageData {
  locationName: string
  region: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroImage?: string
  stats: Stat[]
  communities: Community[]
  communityTitle?: string
  communitySubtitle?: string
  services?: Service[]
  servicesTitle?: string
  servicesSubtitle?: string
  faqs?: FAQ[]
  ctaTitle: string
  ctaSubtitle?: string
  phone?: string
  whatsappMessage?: string
  schemaData?: Record<string, unknown>
}

const ICON_MAP: Record<string, React.FC<{ className?: string; size?: number }>> = {}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        data-testid={`faq-toggle-${index}`}
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
        <ChevronDown className={`h-5 w-5 text-[#C9A962] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </motion.div>
  )
}

export default function GeoPageTemplate({ data }: { data: GeoPageData }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero Section — Split layout matching benchmark */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                <MapPin size={12} /> {data.region}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight">
                {data.heroTitle}
                <br />
                <span className="text-[#C9A962]">{data.heroHighlight}</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                {data.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold"
                  asChild
                  data-testid="hero-cta-quote"
                >
                  <a
                    href={`https://wa.me/${data.phone || '971501234567'}?text=${encodeURIComponent(data.whatsappMessage || `Hi LEXA, I'm interested in smart home automation for my property in ${data.locationName}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Free Quote <ArrowRight className="ml-2" size={18} />
                  </a>
                </Button>
                <Link href="/experience-centre">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Visit Showroom
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              {data.stats.length > 0 && (
                <div className="flex flex-wrap gap-8 mt-12">
                  {data.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl sm:text-3xl font-bold text-[#C9A962]">{stat.value}</div>
                      <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right side image */}
          <div className="relative min-h-[300px] lg:min-h-full">
            {data.heroImage ? (
              <SafeImage src={data.heroImage} alt={data.locationName} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Communities Section */}
      {data.communities.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Areas We Serve</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                  {data.communityTitle || `${data.locationName} Communities`}
                </h2>
                {data.communitySubtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">{data.communitySubtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.communities.map((community, i) => (
                  <motion.div
                    key={community.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-colors group"
                    data-testid={`community-card-${i}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#C9A962] transition-colors">{community.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{community.type}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#C9A962] whitespace-nowrap">
                        {community.price || community.projects || ''}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {data.services && data.services.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Expertise</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                  {data.servicesTitle || `Smart Solutions for ${data.locationName}`}
                </h2>
                {data.servicesSubtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">{data.servicesSubtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.services.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group"
                    data-testid={`service-card-${i}`}
                  >
                    <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                    <div className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-4 group-hover:bg-[#C9A962] transition-colors">
                        <CheckCircle2 className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={18} />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why LEXA Section */}
      <section className={`py-16 lg:py-20 ${data.services && data.services.length > 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'}`}>
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why Choose LEXA</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                  Trusted Smart Home Partner in {data.locationName}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  LEXA Lifestyle brings over a decade of smart home expertise to {data.locationName}. Our certified engineers
                  design, install, and maintain premium automation systems tailored to each property&apos;s unique requirements.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Certified Control4 & Crestron dealer',
                    'Dedicated project manager per property',
                    'Same-day emergency support',
                    'Marine & coastal-grade equipment',
                    'Complete AMC & maintenance packages',
                    'Free initial consultation & design'
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                    >
                      <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">LEXA at a Glance</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Experience', desc: '10+ years in UAE & Middle East' },
                        { label: 'Portfolio', desc: '500+ residential projects completed' },
                        { label: 'Brands', desc: 'Control4, Crestron, Lutron, Sonos & more' },
                        { label: 'Support', desc: '24/7 priority response for AMC clients' }
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
                  <Button
                    size="lg"
                    className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold"
                    asChild
                    data-testid="sidebar-cta"
                  >
                    <Link href="/consultation">Request Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                  {data.locationName} Smart Home FAQs
                </h2>
              </div>
              <div className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} index={i} />
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
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              {data.ctaTitle}
            </h2>
            {data.ctaSubtitle && (
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">{data.ctaSubtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8"
                asChild
                data-testid="cta-call"
              >
                <a href={`tel:+${data.phone || '97142670470'}`}>
                  <Phone className="mr-2" size={18} /> Call +971 4 267 0470
                </a>
              </Button>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      {data.schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schemaData) }}
        />
      )}
    </div>
  )
}
