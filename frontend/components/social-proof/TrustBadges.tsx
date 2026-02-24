'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, Users, Star, CheckCircle, Building2 } from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'

const stats = [
  { icon: Building2, value: '500+', label: 'Projects Completed' },
  { icon: Users, value: '15+', label: 'Years Experience' },
  { icon: Star, value: '4.9', label: 'Client Rating' },
  { icon: Award, value: '32+', label: 'Premium Brands' },
]

const certifications = [
  { name: 'Control4 Certified', logo: '/images/brands/control4.png' },
  { name: 'Crestron Certified', logo: '/images/brands/crestron.png' },
  { name: 'Lutron HomeWorks', logo: '/images/brands/lutron.png' },
  { name: 'Sonos Partner', logo: '/images/brands/sonos.png' },
]

const clientLogos = [
  'Emaar', 'DAMAC', 'Nakheel', 'Meraas', 'Dubai Properties', 'Aldar'
]

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact'
  showCertifications?: boolean
  showClients?: boolean
  className?: string
}

export default function TrustBadges({ 
  variant = 'horizontal',
  showCertifications = true,
  showClients = false,
  className = ''
}: TrustBadgesProps) {
  
  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-6 py-4 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          <Shield className="w-4 h-4 text-green-600" />
          <span>15+ Years</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>500+ Projects</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>4.9 Rating</span>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-12 bg-gray-50 dark:bg-gray-900/50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-[#C9A962] mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {showCertifications && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
              Certified Partners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="w-24 h-12 relative grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                >
                  <SafeImage
                    src={cert.logo}
                    alt={cert.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Logos */}
        {showClients && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
              Trusted By Leading Developers
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {clientLogos.map((client, index) => (
                <span 
                  key={index}
                  className="text-gray-400 dark:text-gray-500 font-semibold text-lg"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
