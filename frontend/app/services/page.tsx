'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

interface Service {
  id: string
  slug: string
  title: string
  category: string
  description: string
  features?: string[]
}

export default function ServicesPage() {
  const cms = useCms('page_services_listing', null)

  const { t, language } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`)
        const data = await response.json()
        // Ensure all services have proper defaults for safe rendering
        const servicesWithDefaults = (Array.isArray(data) ? data : []).map((s: any) => ({
          ...s,
          name: s.name || s.title || '',
          title: s.title || s.name || '',
          description: s.description || '',
          category: s.category || 'Other',
          slug: s.slug || '',
          icon: s.icon || '',
          image: s.image || '',
          features: s.features || s.key_features || []
        }))
        setServices(servicesWithDefaults)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load services:', error)
        setServices([])
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  // Define category groupings for 4-phase service model
  const categoryGroups: Record<string, { title: string; titleAr: string; subtitle: string; subtitleAr: string; categories: string[] }> = {
    design: {
      title: 'Design',
      titleAr: 'التصميم',
      subtitle: 'Architectural integration, consultation, and system design',
      subtitleAr: 'التكامل المعماري والاستشارات وتصميم الأنظمة',
      categories: ['Planning & Strategy', 'Technical Implementation']
    },
    integration: {
      title: 'Integration',
      titleAr: 'التكامل',
      subtitle: 'Seamless deployment, installation, and infrastructure',
      subtitleAr: 'النشر السلس والتركيب والبنية التحتية',
      categories: ['Infrastructure', 'Entertainment', 'Security', 'Connectivity', 'User Interface', 'Commercial Solutions']
    },
    commissioning: {
      title: 'Commissioning',
      titleAr: 'التشغيل',
      subtitle: 'Precision calibration, testing, and optimization',
      subtitleAr: 'المعايرة الدقيقة والاختبار والتحسين',
      categories: ['Activation & Maintenance']
    },
    support: {
      title: 'Support (White-Glove)',
      titleAr: 'الدعم (خدمة متميزة)',
      subtitle: 'Proactive monitoring, 24/7 concierge, and continuous optimization',
      subtitleAr: 'المراقبة الاستباقية وخدمة الكونسيرج على مدار الساعة والتحسين المستمر',
      categories: ['Execution & Delivery']
    }
  }

  // Group services by the defined category groups
  const groupedServices: Record<string, Service[]> = {}
  Object.keys(categoryGroups).forEach(key => {
    groupedServices[key] = services.filter(s => 
      categoryGroups[key].categories.includes(s.category)
    )
  })
  
  // Also track uncategorized services (new services added via admin without a category)
  const uncategorizedServices = services.filter(s => 
    !s.category || !Object.values(categoryGroups).some(g => g.categories.includes(s.category))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-40 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-40 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="services-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://files.ihgbrands.com/lexa/migrated/66a7f9649e0c76be.webp)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="services-title">
              {language === 'ar' ? 'خدمة متكاملة' : 'Full-Service Integration'}
            </h1>
            <p className="hero-animate-desc text-sm sm:text-base text-gray-300 max-w-lg mx-auto">
              {language === 'ar' ? (
                <>التصميم. التكامل. التشغيل. الدعم. أربع مراحل من التميز لتقديم الفخامة المنسقة.</>
              ) : (
                <>Design. Integrate. Commission. Support. Four phases of excellence delivering luxury, orchestrated.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Services by Category Groups */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {Object.entries(categoryGroups).map(([groupKey, groupConfig]) => {
            const groupServices = groupedServices[groupKey]
            
            if (!groupServices || groupServices.length === 0) return null

            return (
              <div key={groupKey} className="mb-20">
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                    {language === 'ar' ? groupConfig.titleAr : groupConfig.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-zinc-400">
                    {language === 'ar' ? groupConfig.subtitleAr : groupConfig.subtitle}
                  </p>
                </motion.div>

                <div className="space-y-2">
                  {groupServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/services/${service.slug}`}>
                        <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-1">
                              <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <div className="lg:col-span-4">
                              <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                                {service.category}
                              </div>
                              <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                                {service.title}
                              </h3>
                            </div>
                            <div className="lg:col-span-5">
                              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                            <div className="lg:col-span-2 flex justify-end">
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
            )
          })}
          
          {/* Uncategorized/Other Services */}
          {uncategorizedServices.length > 0 && (
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
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {language === 'ar' ? 'خدمات أخرى' : 'Other Services'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-zinc-400">
                  {language === 'ar' ? 'خدمات متخصصة إضافية نقدمها' : 'Additional specialized services we offer'}
                </p>
              </motion.div>

              <div className="space-y-2">
                {uncategorizedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="group py-8 border-b border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-1">
                            <span className="text-4xl font-semibold text-gray-300 dark:text-zinc-600 group-hover:text-black dark:group-hover:text-[#C9A962] transition-colors">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="lg:col-span-4">
                            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-zinc-500 mb-2">
                              {service.category || 'New Service'}
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                              {service.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-5">
                            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <div className="lg:col-span-2 flex justify-end">
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

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: language === 'ar' ? 'عمليتنا' : 'Our Process',
            description: language === 'ar' ? 'شاهد كيف ننفذ المشاريع من الاستشارة إلى الدعم مدى الحياة.' : 'See how we deliver projects from consultation to lifetime support.',
            href: '/process',
            category: language === 'ar' ? 'كيف نعمل' : 'How We Work'
          },
          {
            title: language === 'ar' ? 'نظرة عامة على الحلول' : 'Solutions Overview',
            description: language === 'ar' ? 'استكشف الحلول التقنية التي ندمجها.' : 'Explore the technology solutions we integrate.',
            href: '/solutions',
            category: language === 'ar' ? 'ما نركبه' : 'What We Install'
          },
          {
            title: language === 'ar' ? 'معرض المشاريع' : 'Projects Portfolio',
            description: language === 'ar' ? 'شاهد التركيبات المنجزة في جميع أنحاء الإمارات.' : 'View completed installations across the UAE.',
            href: '/projects',
            category: language === 'ar' ? 'أعمالنا' : 'Our Work'
          }
        ]}
        title={language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
        subtitle={language === 'ar' ? 'اكتشف كيف يمكننا المساعدة في تحويل مساحتك' : 'Discover how we can help transform your space'}
      />
    </div>
  )
}
