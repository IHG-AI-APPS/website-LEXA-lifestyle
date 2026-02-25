'use client'

import { motion } from 'framer-motion'
import { Check, Award, Users, Shield, Clock, Star, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { useCms } from '@/hooks/useCms'

export default function WhyLexaPage() {
  const cms = useCms('page_why_lexa', null)

  const advantages = [
    {
      icon: Award,
      title: 'Authorized Premium Dealer',
      description: 'Official Control4, Crestron, and Lutron partner - one of few UAE companies with dual platform certification.'
    },
    {
      icon: Users,
      title: '15+ Years UAE Experience',
      description: '500+ completed luxury villa projects across Emirates Hills, Palm Jumeirah, Downtown Dubai, and Abu Dhabi.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Warranty',
      description: '5-year warranty on installation workmanship, manufacturer warranties on all equipment, lifetime support.'
    },
    {
      icon: Clock,
      title: '24/7 Support Guarantee',
      description: 'Dedicated support team with guaranteed response times. Emergency callouts available across UAE.'
    },
    {
      icon: Star,
      title: 'Experience Centre',
      description: 'Live demonstration showroom in Dubai - test Control4, Crestron, Lutron systems before purchasing.'
    },
    {
      icon: TrendingUp,
      title: 'Proven ROI',
      description: 'Our systems deliver 25-35% energy savings and 15-20% property value increase. Avg. payback: 3-5 years.'
    },
    {
      icon: Zap,
      title: 'Future-Proof Technology',
      description: 'Open protocols, regular updates, scalable infrastructure. Your system stays current for decades.'
    },
    {
      icon: Users,
      title: 'Single Accountability',
      description: 'One company for design, installation, programming, training, and support. No finger-pointing.'
    }
  ]

  const comparisons = [
    {
      feature: 'Control4 Certification',
      lexa: true,
      competitors: 'Some'
    },
    {
      feature: 'Crestron Certification',
      lexa: true,
      competitors: 'Rare'
    },
    {
      feature: 'Physical Showroom',
      lexa: true,
      competitors: 'Few'
    },
    {
      feature: 'Premium Brands (Lutron, Sonos, KEF)',
      lexa: true,
      competitors: 'Most'
    },
    {
      feature: '500+ Villa Projects',
      lexa: true,
      competitors: 'Few'
    },
    {
      feature: '24/7 Support',
      lexa: true,
      competitors: 'Some'
    },
    {
      feature: '5-Year Warranty',
      lexa: true,
      competitors: '1-2 Years'
    },
    {
      feature: 'Full Training Included',
      lexa: true,
      competitors: 'Basic'
    },
    {
      feature: 'GCC Coverage',
      lexa: true,
      competitors: 'Limited'
    }
  ]

  const testimonials = [
    {
      name: 'Ahmed Al-Mansoori',
      location: 'Emirates Hills Villa',
      text: 'LEXA transformed our 10,000 sq ft villa with Crestron automation. The cinema room rivals commercial theaters, and energy savings covered 40% of investment in first 2 years.',
      project: 'AED 850,000 - Full Villa Integration'
    },
    {
      name: 'Sarah Thompson',
      location: 'Downtown Dubai Penthouse',
      text: 'After visiting their Experience Centre, the choice was obvious. Control4 system is intuitive - even my kids control everything. Support team responds within hours.',
      project: 'AED 280,000 - Penthouse Automation'
    },
    {
      name: 'Khalid Al-Rashid',
      location: 'Palm Jumeirah Villa',
      text: 'We compared 5 companies. LEXA was the only one who understood our vision and delivered exactly what was promised. Three years later, system still runs perfectly.',
      project: 'AED 520,000 - Villa + Theater'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                Why LEXA Lifestyle
              </span>
              <h1 className="h1 uppercase mb-6">
                DUBAI&apos;S #1 CHOICE FOR LUXURY SMART HOMES
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                When UAE&apos;s most discerning homeowners need premium automation, they choose LEXA Lifestyle. Here&apos;s why we&apos;re different.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/contact" className="bg-white text-gray-900 dark:text-white px-8 py-4 font-semibold hover:bg-gray-100 dark:bg-gray-800 transition-colors">
                  Schedule Consultation
                </Link>
                <Link href="/experience-centre" className="border-2 border-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 dark:text-white transition-colors">
                  Visit Experience Centre
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="h2 uppercase mb-4">WHAT SETS LEXA APART</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">8 reasons we&apos;re Dubai&apos;s preferred luxury automation partner</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="h2 uppercase mb-4">LEXA VS. OTHER DUBAI INTEGRATORS</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">See how we compare to competitors</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-center">LEXA Lifestyle</th>
                    <th className="px-6 py-4 text-center">Most Competitors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {item.lexa === true ? (
                          <Check className="inline-block text-green-600" size={24} />
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{item.lexa}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                        {item.competitors}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="h2 uppercase mb-4">WHAT OUR CLIENTS SAY</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">Real feedback from luxury homeowners across Dubai</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{testimonial.location}</p>
                    <p className="text-xs text-gray-500 mt-2">{testimonial.project}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="h2 uppercase mb-16">LEXA BY THE NUMBERS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-gray-400">Luxury Villas Completed</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">15+</div>
                <div className="text-gray-400">Years in UAE</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">4.9</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">EXPERIENCE THE LEXA DIFFERENCE</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Visit our Dubai Experience Centre to see Control4, Crestron, and Lutron systems in action. Compare before you commit.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="bg-gray-900 text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition-colors">
              Schedule Consultation
            </Link>
            <Link href="/case-studies" className="border-2 border-gray-900 px-8 py-4 text-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              View Our Projects
            </Link>
            <Link href="/blog/top-smart-home-companies-dubai-2026-comparison" className="border-2 border-gray-900 px-8 py-4 text-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              Compare All Companies
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            Call +971 42 670 470 | Available Saturday-Thursday 9AM-6PM
          </p>
        </div>
      </section>
    </div>
  )
}
