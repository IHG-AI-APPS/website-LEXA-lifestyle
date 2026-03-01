'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Monitor, Cpu, Wifi, Code, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'
import dynamic from 'next/dynamic'

const SwipeCarousel = dynamic(() => import('@/components/mobile/SwipeCarousel'), { ssr: false })

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

export default function ProductsPage() {
  const cms = useCms('page_products_listing', null)

  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                Product Catalog
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                PREMIUM
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">EQUIPMENT</span>
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8" />
              <p className="text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                Explore our comprehensive product catalog featuring equipment from the world&apos;s most prestigious smart home brands.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-5xl font-semibold mb-6">Product Categories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-normal max-w-2xl mx-auto">
                Browse by equipment type to find the perfect components for your system.
              </p>
            </motion.div>

            {/* Mobile: Swipeable Carousel */}
            <div className="md:hidden -mx-4" data-testid="products-swipe-carousel">
              {loading ? (
                <div className="text-center py-12 text-gray-600">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-gray-600">No products available.</div>
              ) : (
                <SwipeCarousel cardWidth={300} gap={14}>
                  {products.map((category: any, index: number) => (
                    <Link key={category.slug} href={`/products/${category.slug}`} data-testid={`product-mobile-${index}`}>
                      <div className="group h-[360px] bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="relative h-[200px] overflow-hidden">
                          <SafeImage src={category.image} alt={category.name} fill className="object-cover group-active:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-medium rounded-full border border-white/10">
                              {category.brands?.length || 0} Brands
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">{category.description}</p>
                          <div className="mt-3 flex items-center gap-1.5 text-[#C9A962] text-xs font-medium">
                            Browse <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </SwipeCarousel>
              )}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-2 gap-8">
              {loading ? (
                <div className="col-span-2 text-center py-12 text-gray-600 dark:text-gray-400 dark:text-gray-400">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-gray-600 dark:text-gray-400 dark:text-gray-400">No products available.</div>
              ) : (
                products.map((category: any, index: number) => (
                  <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/products/${category.slug}`}>
                      <div className="group h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-charcoal transition-all">
                        {/* Image */}
                        <div className="relative h-[250px] overflow-hidden">
                          <SafeImage
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-white/90 text-xs font-medium">
                              {category.brands.length} Brands
                            </span>
                          </div>
                          {category.icon && (
                            <div className="absolute top-4 left-4 text-4xl">
                              {category.icon}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <h3 className="text-2xl font-semibold group-hover:text-gray-600 dark:text-gray-400 transition-colors mb-4">
                            {category.name}
                          </h3>

                          <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            {category.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {category.specifications.length} Features
                            </span>
                            <div className="flex items-center text-charcoal font-medium group-hover:underline">
                              Browse Category
                              <ArrowRight className="ml-2" size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">Need Product Recommendations?</h2>
              <p className="text-xl text-gray-400 mb-10">
                Our experts will specify the ideal equipment for your requirements and budget.
              </p>
              <Button size="lg" className="bg-white hover:bg-gray-100 dark:bg-gray-800 text-charcoal px-12" onClick={() => setShowConsultationForm(true)}>
                Get Equipment Specification
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
