'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { useTheme } from '@/contexts/ThemeContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Default fallback data
const DEFAULT_DATA = {
  technology_partners: [
    { name: 'Control4', logo: '/partners/control4.png', type: 'Official Dealer' },
    { name: 'Crestron', logo: '/partners/crestron.png', type: 'Certified Integrator' },
    { name: 'Lutron', logo: '/partners/lutron.png', type: 'Authorized Partner' },
    { name: 'Sonos', logo: '/partners/sonos.png', type: 'Installation Partner' },
    { name: 'Samsung', logo: '/partners/samsung.png', type: 'Pro Partner' },
    { name: 'Sony', logo: '/partners/sony.png', type: 'AV Partner' },
  ],
  trusted_by: [
    { name: 'Emaar Properties', type: 'Developer' },
    { name: 'Nakheel', type: 'Developer' },
    { name: 'DAMAC', type: 'Developer' },
    { name: 'Sobha Realty', type: 'Developer' },
    { name: 'Meraas', type: 'Developer' },
    { name: 'Dubai Holding', type: 'Developer' },
  ],
  certifications: [
    { name: 'Control4 Diamond Dealer', year: '2024' },
    { name: 'Crestron Certified Programmer', year: '2024' },
    { name: 'CEDIA Member', year: 'Since 2018' },
    { name: 'KNX Partner', year: 'Certified' },
  ],
  stats: [
    { number: '500+', label: 'Villas Automated' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Developer Projects' },
    { number: '98%', label: 'Client Satisfaction' },
  ]
}

interface TrustedInUAEProps {
  variant?: 'full' | 'compact' | 'logos-only'
  showStats?: boolean
  className?: string
}

export default function TrustedInUAE({ 
  variant = 'full', 
  showStats = true,
  className = '' 
}: TrustedInUAEProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [partnerData, setPartnerData] = useState(DEFAULT_DATA)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_trusted_uae`)
      .then(r => r.json())
      .then(d => { if (d?.value) setPartnerData({ ...DEFAULT_DATA, ...d.value }) })
      .catch(() => {})
  }, [])

  if (variant === 'logos-only') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <p className={`text-center text-sm uppercase tracking-widest mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Official Partners & Certifications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerData.technologyPartners.slice(0, 4).map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`text-center ${isDark ? 'opacity-70 hover:opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`}
              >
                <span className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <section className={`py-12 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className={`text-sm uppercase tracking-widest ${isDark ? 'text-[#C9A962]' : 'text-[#C9A962]'}`}>
              Trusted Across UAE
            </p>
            <h3 className={`text-2xl md:text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              500+ Luxury Homes Automated
            </h3>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {partnerData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-[#C9A962]' : 'text-[#C9A962]'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {partnerData.technologyPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'} shadow-sm`}
              >
                <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {partner.name}
                </span>
                <span className={`block text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {partner.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full variant
  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-sm uppercase tracking-widest ${isDark ? 'text-[#C9A962]' : 'text-[#C9A962]'}`}
          >
            Why Dubai Trusts LEXA
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            The UAE&apos;s Premier Smart Home Partner
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Trusted by leading developers, architects, and homeowners across Dubai, Abu Dhabi, and the GCC.
          </motion.p>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {partnerData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
              >
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E8DCC8] bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className={`text-sm mt-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Technology Partners */}
        <div className="mb-12">
          <h3 className={`text-center text-sm uppercase tracking-widest mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Official Technology Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerData.technologyPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl text-center ${
                  isDark 
                    ? 'bg-gray-800/70 hover:bg-gray-800 border border-gray-700/50' 
                    : 'bg-gray-50 hover:bg-white dark:bg-gray-800 border border-gray-200'
                } transition-all hover:shadow-lg`}
              >
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {partner.name}
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-[#C9A962]' : 'text-[#C9A962]'}`}>
                  {partner.type}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted By Developers */}
        <div className="mb-12">
          <h3 className={`text-center text-sm uppercase tracking-widest mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Trusted by Leading UAE Developers
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partnerData.trustedBy.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-full ${
                  isDark 
                    ? 'bg-gray-800/50 border border-gray-700/50 text-gray-300' 
                    : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700'
                }`}
              >
                <span className="font-medium">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-800/50' : 'bg-gradient-to-r from-gray-100 to-gray-50'}`}>
          <h3 className={`text-center text-sm uppercase tracking-widest mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Industry Certifications & Accreditations
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {partnerData.certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {cert.name}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  ({cert.year})
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
