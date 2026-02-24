/**
 * Related Packages Navigator
 * Cross-package navigation with engaging posters
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Building2, Hotel, Sparkles } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface RelatedPackagesProps {
  currentSlug: string
  currentTitle?: string
}

const getIconForPackage = (title: string) => {
  if (title.toLowerCase().includes('villa')) return Home
  if (title.toLowerCase().includes('penthouse')) return Building2
  if (title.toLowerCase().includes('studio') || title.toLowerCase().includes('bedroom')) return Hotel
  return Sparkles
}

export default function RelatedPackages({ currentSlug, currentTitle }: RelatedPackagesProps) {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug])

  const fetchPackages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/packages/property-types`)
      const data = await response.json()
      // Filter out current package and get 3 related ones
      const relatedPackages = (data.packages || [])
        .filter((pkg: any) => pkg.slug !== currentSlug)
        .slice(0, 3)
      setPackages(relatedPackages)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load related packages:', error)
      setLoading(false)
    }
  }

  if (loading || packages.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
              Explore More
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Other Smart Home Packages
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the perfect solution for every property type and lifestyle
            </p>
          </motion.div>
        </div>

        {/* Related Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const Icon = getIconForPackage(pkg.title)
            
            return (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image Poster */}
                    <div className="relative h-64 overflow-hidden">
                      {pkg.image_url ? (
                        <SafeImage
                          src={pkg.image_url}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                          <Icon className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-semibold text-gray-900 dark:text-white dark:text-white">
                            {pkg.property_count || '3'} Tiers
                          </span>
                        </div>
                      </div>

                      {/* Title at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {pkg.subtitle || 'Complete smart home automation packages'}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {pkg.description || `Intelligent automation designed specifically for ${pkg.title.toLowerCase()}`}
                      </p>

                      {/* Features Preview */}
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                          <span>AI-Powered</span>
                        </div>
                        <div className="h-1 w-1 bg-gray-300 rounded-full" />
                        <div className="flex items-center gap-1">
                          <span>From</span>
                          <span className="font-semibold text-gray-900 dark:text-white dark:text-white">
                            {pkg.starting_price ? `AED ${(pkg.starting_price / 1000).toFixed(0)}K` : 'Contact'}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
                        <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                          Explore Package
                        </span>
                        <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
