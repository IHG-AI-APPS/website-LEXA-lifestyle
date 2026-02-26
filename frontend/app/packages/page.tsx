'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  Building2, 
  Hotel, 
  ChevronRight,
  Sparkles,
  Smartphone,
  Users,
  Crown,
  Zap,
  Calculator,
  TrendingUp,
  Brain
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

export default function PackagesPage() {
  const cms = useCms('page_packages_listing', null)

  const [propertyPackages, setPropertyPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/packages/property-types`)
      const data = await response.json()
      setPropertyPackages(data.packages || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to load packages:', error)
      setLoading(false)
    }
  }

  // Apartment tiers data
  const apartmentTiers = [
    { name: 'Basic', price: '3,000', color: 'bg-blue-500' },
    { name: 'Advanced', price: '4,400', color: 'bg-orange-500' },
    { name: 'Gold', price: '7,000', color: 'bg-amber-500', popular: true },
    { name: 'Platinum', price: '11,000', color: 'bg-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="packages-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Smart Home Solutions</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="packages-title">
              All Packages
            </h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto mb-8">
              Pre-configured smart home packages tailored for every property type and budget
            </p>
            <Link
              href="/package-builder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-gray-900 font-semibold rounded-lg hover:bg-[#C9A962]/90 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              Build Custom Package
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tools Bar */}
      <section className="py-4 border-b bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">Tools:</span>
              <Link href="/smart-home-quiz" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors">
                <Brain className="h-3.5 w-3.5" />
                AI Quiz
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors">
                <Calculator className="h-3.5 w-3.5" />
                Cost Calculator
              </Link>
              <Link href="/roi-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors">
                <TrendingUp className="h-3.5 w-3.5" />
                ROI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Packages Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Property Type Packages */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Home className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold">By Property Type</h2>
              </div>
              
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {propertyPackages.map((pkg) => (
                    <Link key={pkg.slug} href={`/packages/${pkg.slug}`}>
                      <div className="group h-full border border-gray-200 dark:border-gray-700 hover:border-gray-400 hover:shadow-md rounded-lg p-5 transition-all bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Home className="h-5 w-5 text-gray-600 dark:text-gray-400 dark:text-gray-400" />
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-600 dark:text-gray-400 transition-colors" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-black">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {pkg.subtitle || pkg.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Apartment Packages */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  <h2 className="text-xl font-semibold">Smart Apartment Packages</h2>
                </div>
                <Link href="/packages/smart-apartment-packages" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {apartmentTiers.map((tier) => (
                  <Link key={tier.name} href="/packages/smart-apartment-packages">
                    <div className={`relative border-2 rounded-lg p-4 transition-all hover:shadow-md ${tier.popular ? 'border-amber-400 bg-amber-50' : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-400'}`}>
                      {tier.popular && (
                        <span className="absolute -top-2 right-3 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                          Popular
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${tier.color} mb-3`} />
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">{tier.name}</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">AED {tier.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Developer Packages */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-semibold">Developer & Bulk Packages</h2>
                </div>
                <Link href="/packages/developer-packages" className="text-sm text-amber-600 hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <Link href="/packages/developer-packages">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 text-white hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Multi-Unit Project Pricing</h3>
                      <p className="text-sm text-gray-300">Special rates for 10+ units • Dedicated project management • Custom solutions</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-400">15-25%</div>
                        <div className="text-xs text-gray-400">Volume Discount</div>
                      </div>
                      <ChevronRight className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Package Tiers Explanation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Crown className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Package Tiers</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white dark:text-white">Essential</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Core automation features for smart living. Perfect for those starting their smart home journey.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gradient-to-br from-amber-50 to-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold text-gray-900 dark:text-white dark:text-white">Enhanced</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Advanced features with extended coverage. Ideal for comprehensive home automation.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-gradient-to-br from-purple-50 to-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold text-gray-900 dark:text-white dark:text-white">High-End</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Premium orchestration with cutting-edge technology. For discerning homeowners.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Not sure which package is right for you?</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Take our AI quiz or consult with our experts for personalized recommendations.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/smart-home-quiz"
                  className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Take AI Quiz
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:border-gray-400 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
