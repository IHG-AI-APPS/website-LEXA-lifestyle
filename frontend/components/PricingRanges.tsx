'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building, Home, Hotel, ArrowRight } from 'lucide-react'

export default function PricingRanges() {
  const projectTypes = [
    {
      icon: Building,
      title: 'Apartments & Penthouses',
      range: 'AED 50,000 - 150,000',
      subtitle: '2-4 bedroom units',
      description: 'Essential smart living with premium finishes',
      features: ['Centralized lighting control', 'Climate & AC automation', 'Video door entry', 'Smart locks & access', 'Single app control']
    },
    {
      icon: Home,
      title: 'Villas (4,000 - 10,000 sq ft)',
      range: 'AED 150,000 - 300,000',
      subtitle: 'Family villas & townhouses',
      description: 'Comprehensive automation for modern family living',
      features: ['Full KNX/Control4 integration', 'Multi-room audio/video', 'Motorized curtains & shades', 'Advanced CCTV & security', 'Scene programming & schedules']
    },
    {
      icon: Hotel,
      title: 'Luxury Estates (10,000+ sq ft)',
      range: 'AED 300,000+',
      subtitle: 'Ultra-luxury & palatial homes',
      description: 'Bespoke systems with concierge-level support',
      features: ['Crestron/KNX premium systems', 'Private cinema & whole-home audio', 'Complete outdoor automation', 'Integrated security & BMS', '24/7 dedicated support']
    }
  ]

  return (
    <section className="py-10 md:py-12 lg:py-14 bg-white">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="h2 mb-3 md:mb-4">
              Typical Project Ranges
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Transparent pricing to help you plan your investment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {projectTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gallery-base rounded-xl p-6 sm:p-8 border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mb-5 sm:mb-6">
                  <type.icon size={28} className="text-white sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2">{type.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{type.subtitle}</p>
                
                <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">{type.range}</div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">{type.description}</p>

                <div className="space-y-2 mb-5 sm:mb-6">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
