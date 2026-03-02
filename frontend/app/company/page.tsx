'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Award, Users, Building, Target } from 'lucide-react'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import { useCms } from '@/hooks/useCms'

export default function CompanyPage() {
  const cms = useCms('page_company', null) as any

  const iconMap: Record<string, any> = { Award, Users, Building, Target }
  const values = (cms?.values || [
    { icon: 'Award', title: 'Excellence', description: 'Uncompromising quality in every project' },
    { icon: 'Users', title: 'Partnership', description: 'Long-term relationships built on trust' },
    { icon: 'Building', title: 'Integration', description: 'Holistic approach to smart living' },
    { icon: 'Target', title: 'Innovation', description: 'Leading edge technology solutions' },
  ]).map((v: any) => ({ ...v, icon: iconMap[v.icon] || Award }))

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                  About LEXA
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                  DESIGNED
                  <br />
                  FOR
                  <br />
                  <span className="text-transparent bg-clip-text metallic-gradient">EXCELLENCE</span>
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-platinum to-transparent mb-8" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed mb-6">
                  LEXA Lifestyle is Dubai&apos;s premier smart living integrator since 2005.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                  Over 1,000 projects delivered across the UAE, partnering with Crestron, Lutron, Control4, and Savant.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px]"
              >
                <SafeImage
                  src="/images/premium/hero/hero-1.jpg"
                  alt="LEXA Lifestyle"
                  fill
                  className="object-cover grayscale-[20%]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-semibold mb-16 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <Icon size={32} className="text-charcoal" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-semibold text-white mb-6">Experience Center</h2>
            <p className="text-xl text-gray-400 mb-4">60,000 sq ft showroom in Dubai</p>
            <p className="text-base text-gray-500">Al Quoz 1, Shaikh Zayed Road, Dubai, UAE</p>
          </div>
        </div>
      </section>

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'About LEXA',
            description: 'Discover our story, mission, and the team behind Dubai\'s premier smart living integrator.',
            href: '/about',
            category: 'Company'
          },
          {
            title: 'Our Process',
            description: 'Learn how we transform spaces from initial consultation to lifetime support.',
            href: '/process',
            category: 'How We Work'
          },
          {
            title: 'Experience Centre',
            description: 'Visit our 60,000 sq ft showroom and experience smart living firsthand.',
            href: '/experience-centre',
            category: 'Visit Us'
          },
          {
            title: 'Certification Standards',
            description: 'See our industry certifications, partnerships, and quality standards.',
            href: '/certification-standard',
            category: 'Trust & Quality'
          },
          {
            title: 'Projects Portfolio',
            description: 'Browse our portfolio of 1,000+ luxury smart living installations.',
            href: '/projects',
            category: 'Our Work'
          },
          {
            title: 'Solutions Overview',
            description: 'Explore our complete range of smart home and automation solutions.',
            href: '/solutions',
            category: 'What We Offer'
          }
        ]}
        title="Continue Exploring"
        subtitle="Learn more about LEXA and how we can transform your space"
      />
    </div>
  )
}
