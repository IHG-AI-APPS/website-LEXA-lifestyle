'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

interface Package {
  tier: string
  price_range: string
  features: string[]
  popular?: boolean
}

interface PackageComparisonProps {
  packages: Package[]
  title?: string
}

export default function PackageComparison({ packages, title = "Our Packages" }: PackageComparisonProps) {
  if (!packages || packages.length === 0) return null

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>

        <div className={`grid grid-cols-1 ${packages.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-lg overflow-hidden ${
                pkg.popular 
                  ? 'border-4 border-[#E8DCC8] shadow-2xl scale-105' 
                  : 'border-2 border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-[#E8DCC8] text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              {/* Package Header */}
              <div className={`p-6 ${pkg.popular ? 'bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]' : 'bg-gray-100'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {pkg.tier}
                </h3>
                <div className={`text-3xl font-bold ${pkg.popular ? 'text-[#E8DCC8]' : 'text-[#1A1A1A]'}`}>
                  {pkg.price_range}
                </div>
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                  pkg.popular
                    ? 'bg-[#E8DCC8] text-black hover:bg-[#d4c8b4]'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Get Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
