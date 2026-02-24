/**
 * Related Services Navigator
 * Cross-service navigation with engaging visuals
 */

'use client'

import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { ArrowRight, Settings, Wrench, Headphones, Shield, Zap, Sparkles } from 'lucide-react'

interface Service {
  slug: string
  title: string
  description: string
  category: string
  image?: string
  tags?: string[]
}

interface RelatedServicesProps {
  services: Service[]
  currentSlug: string
}

const getServiceIcon = (title: string) => {
  const lower = title.toLowerCase()
  if (lower.includes('design') || lower.includes('engineer')) return Settings
  if (lower.includes('install') || lower.includes('commission')) return Wrench
  if (lower.includes('support') || lower.includes('maintenance')) return Headphones
  if (lower.includes('security')) return Shield
  return Sparkles
}

export default function RelatedServices({ services, currentSlug }: RelatedServicesProps) {
  // Filter and limit to 3 services
  const relatedServices = services
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3)

  if (relatedServices.length === 0) {
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
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2 block">
              Complete Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Related Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              End-to-end support for your smart home journey
            </p>
          </motion.div>
        </div>

        {/* Related Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service, index) => {
            const Icon = getServiceIcon(service.title)
            
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full card-lift"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white elevation-2 hover:elevation-4 transition-all duration-300">
                    {/* Image Poster */}
                    <div className="relative h-64 overflow-hidden">
                      {service.image ? (
                        <SafeImage
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                          <Icon className="h-5 w-5 text-gray-900 dark:text-white dark:text-white" />
                        </div>
                      </div>

                      {/* Category */}
                      {service.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900 dark:text-white dark:text-white">
                            {service.category}
                          </span>
                        </div>
                      )}

                      {/* Title at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Tags Preview */}
                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-black transition-colors">
                          Learn More
                        </span>
                        <ArrowRight className="h-5 w-5 text-gray-700 group-hover:translate-x-2 transition-transform" />
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
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-full btn-magnetic elevation-3"
          >
            <span>View All Services</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
