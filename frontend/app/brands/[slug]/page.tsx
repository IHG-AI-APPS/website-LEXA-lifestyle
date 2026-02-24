'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import RelatedItemsCarousel from '@/components/sections/RelatedItemsCarousel'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { ArrowLeft, ExternalLink, MapPin, Calendar, Award, CheckCircle, ShoppingBag, Star } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface Product {
  name: string
  description: string
  image: string
  price_range?: string
}

interface BrandData {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  website?: string
  categories: string[]
  featured: boolean
  country?: string
  year_established?: string
  tagline?: string
  hero_image?: string
  priority?: number
  products?: Product[]
  seo_title?: string
  seo_description?: string
  long_description?: string
  certifications?: string[]
  key_features?: string[]
}

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [brand, setBrand] = useState<BrandData | null>(null)
  const [otherBrands, setOtherBrands] = useState<BrandData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBrand = useCallback(async () => {
    try {
      const response = await fetch(`${API}/brands/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setBrand(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching brand:', error)
      setLoading(false)
    }
  }, [params.slug])

  const fetchOtherBrands = useCallback(async () => {
    try {
      const response = await fetch(`${API}/brands`)
      if (response.ok) {
        const data = await response.json()
        const filtered = data.filter((b: BrandData) => b.slug !== params.slug).slice(0, 4)
        setOtherBrands(filtered)
      }
    } catch (error) {
      console.error('Error fetching other brands:', error)
    }
  }, [params.slug])

  useEffect(() => {
    fetchBrand()
    fetchOtherBrands()
  }, [fetchBrand, fetchOtherBrands])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Brand Not Found</h2>
          <Link href="/brands">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              Back to Brands
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* SEO Meta Tags would be handled by Next.js metadata */}
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <Breadcrumb 
          items={[
            { label: 'Brands', href: '/brands' },
            { label: brand.name }
          ]} 
        />
      </div>

      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <SafeImage
          src={brand.hero_image || brand.logo}
          alt={brand.name}
          fill
          className="object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl mb-6 inline-block">
                <div className="relative w-32 md:w-48 h-16 md:h-24">
                  <SafeImage
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">{brand.name}</h1>
              {brand.tagline && (
                <p className="text-lg md:text-xl text-gray-200 mb-6 italic">{brand.tagline}</p>
              )}
              <div className="flex flex-wrap gap-2 justify-center">
                {brand.featured && (
                  <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm px-4 py-2">
                    ⭐ Featured Partner
                  </Badge>
                )}
                {brand.certifications?.slice(0, 3).map((cert) => (
                  <Badge key={cert} variant="outline" className="border-white text-white text-sm px-3 py-1">
                    {cert}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Info */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
              {brand.country && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 md:p-8 text-center"
                >
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-charcoal" />
                  <div className="text-xs tracking-wider uppercase text-gray-400 mb-1 md:mb-2">Origin</div>
                  <div className="font-semibold text-sm md:text-lg">{brand.country}</div>
                </motion.div>
              )}
              {brand.year_established && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 md:p-8 text-center"
                >
                  <Calendar className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-charcoal" />
                  <div className="text-xs tracking-wider uppercase text-gray-400 mb-1 md:mb-2">Est.</div>
                  <div className="font-semibold text-sm md:text-lg">{brand.year_established}</div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 md:p-8 text-center"
              >
                <Award className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-charcoal" />
                <div className="text-xs tracking-wider uppercase text-gray-400 mb-1 md:mb-2">Status</div>
                <div className="font-semibold text-sm md:text-lg">Authorized</div>
              </motion.div>
              {brand.website && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-4 md:p-8 text-center"
                >
                  <ExternalLink className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-charcoal" />
                  <div className="text-xs tracking-wider uppercase text-gray-400 mb-1 md:mb-2">Website</div>
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm md:text-lg text-charcoal hover:underline"
                  >
                    Visit
                  </a>
                </motion.div>
              )}
            </div>

            {/* Key Features */}
            {brand.key_features && brand.key_features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 md:p-8 mb-8 md:mb-12"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Why Choose {brand.name}?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {brand.key_features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 md:p-12 mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">About {brand.name}</h2>
              <div className="h-px w-24 bg-gradient-to-r from-charcoal to-transparent mb-4 md:mb-6" />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-normal mb-6">
                {brand.description}
              </p>
              {brand.long_description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {brand.long_description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Categories */}
            {brand.categories && brand.categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 md:p-12 mb-8 md:mb-12"
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">Product Categories</h2>
                <div className="h-px w-24 bg-gradient-to-r from-charcoal to-transparent mb-4 md:mb-6" />
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {brand.categories.map((category: string) => (
                    <Link key={category} href={`/products?category=${category}`}>
                      <div className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 dark:border-gray-600 dark:border-gray-600 hover:border-charcoal hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer">
                        <span className="font-medium text-sm md:text-base">{category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Top Selling Products - SEO Rich Section */}
      {brand.products && brand.products.length > 0 && (
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8 md:mb-12"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ShoppingBag className="w-6 h-6 text-charcoal" />
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-500">Top Sellers</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Popular {brand.name} Products
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Discover our best-selling {brand.name} products, trusted by homeowners across the UAE.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {brand.products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    {product.image && (
                      <div className="relative h-48 md:h-56 bg-gray-100 dark:bg-gray-800">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">{product.name}</h3>
                        <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" />
                      </div>
                      {product.description && (
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      {product.price_range && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Price Range</span>
                          <span className="font-semibold text-charcoal">{product.price_range}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8 md:mt-12">
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setShowConsultationForm(true)}
                  className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                >
                  Get {brand.name} Product Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-20 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 md:mb-6">
                Interested in {brand.name}?
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
                Let our certified experts design the perfect {brand.name} solution for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-charcoal dark:text-gray-200 px-8 md:px-12"
                  onClick={() => setShowConsultationForm(true)}
                >
                  Villa Technology Review
                </Button>
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-charcoal px-8 md:px-12 w-full sm:w-auto"
                    >
                      Visit {brand.name}
                      <ExternalLink className="ml-2" size={20} />
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Brands */}
      {otherBrands.length > 0 && (
        <RelatedItemsCarousel
          items={otherBrands.map(b => ({
            id: b.id,
            slug: b.slug,
            title: b.name,
            name: b.name,
            image: b.logo,
            description: b.description
          }))}
          title="Other Premium Brands"
          basePath="/brands"
        />
      )}

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
