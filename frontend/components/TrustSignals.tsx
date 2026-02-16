'use client'

import { motion } from 'framer-motion'
import { Building2, Award, Shield, Star } from 'lucide-react'

export default function TrustSignals() {
  const authorities = [
    'DEWA',
    'Dubai Municipality', 
    'Trakhees',
    'Civil Defense'
  ]

  const developers = [
    'Emaar',
    'Sobha Realty',
    'Nakheel',
    'Damac',
    'Meraas'
  ]

  const locations = [
    'Emirates Hills',
    'Palm Jumeirah',
    'Downtown Dubai',
    'MBR City',
    'Jumeirah Golf Estates'
  ]

  return (
    <section className="py-10 md:py-12 lg:py-14 bg-gallery-base">
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
              Trusted in the UAE
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Partnering with Dubai&apos;s leading developers and premium communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Government & Authorities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-5 md:mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Approved & Certified</h3>
              </div>
              <div className="space-y-2.5 md:space-y-3">
                {authorities.map((auth, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-sm md:text-base">{auth}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Developers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-5 md:mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="text-white" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Developer Partners</h3>
              </div>
              <div className="space-y-2.5 md:space-y-3">
                {developers.map((dev, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-sm md:text-base">{dev}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-5 md:mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Premium Communities</h3>
              </div>
              <div className="space-y-2.5 md:space-y-3">
                {locations.map((loc, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-sm md:text-base">{loc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2">100+</div>
              <div className="text-sm md:text-base text-gray-600">Luxury Villas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2">15+</div>
              <div className="text-sm md:text-base text-gray-600">Years in UAE</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2">CEDIA</div>
              <div className="text-sm md:text-base text-gray-600">Certified Team</div>
            </div>
          </motion.div>

          {/* UAE-Based Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 md:mt-12 text-center"
          >
            <div className="inline-block bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                UAE-Based · Project-First · Luxury System Integrator · One Partner From Design to Lifetime Support
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
