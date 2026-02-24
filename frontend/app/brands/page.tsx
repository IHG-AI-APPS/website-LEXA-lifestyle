'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Award, ChevronRight, Star } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

// Category icons/colors for visual distinction
const categoryStyles: Record<string, { color: string; bg: string }> = {
  'Audio': { color: 'text-purple-600', bg: 'bg-purple-50' },
  'Automation': { color: 'text-blue-600', bg: 'bg-blue-50' },
  'Lighting': { color: 'text-amber-600', bg: 'bg-amber-50' },
  'Home Cinema': { color: 'text-red-600', bg: 'bg-red-50' },
  'Video': { color: 'text-indigo-600', bg: 'bg-indigo-50' },
  'Security': { color: 'text-green-600', bg: 'bg-green-50' },
  'Control Systems': { color: 'text-cyan-600', bg: 'bg-cyan-50' },
  'Shading': { color: 'text-orange-600', bg: 'bg-orange-50' },
  'Electrical': { color: 'text-slate-600', bg: 'bg-slate-50' },
  'default': { color: 'text-gray-600', bg: 'bg-gray-50' },
}

export default function BrandsPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API}/brands`)
      const data = await response.json()
      setBrands(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching brands:', error)
      setLoading(false)
    }
  }

  const featuredBrands = brands.filter((brand: any) => brand.featured)
  
  // Group brands by primary category
  const brandsByCategory = brands.reduce((acc: Record<string, any[]>, brand) => {
    const primaryCategory = brand.categories?.[0] || 'Other'
    if (!acc[primaryCategory]) {
      acc[primaryCategory] = []
    }
    acc[primaryCategory].push(brand)
    return acc
  }, {})

  // Sort categories by number of brands
  const sortedCategories = Object.entries(brandsByCategory)
    .sort(([, a], [, b]) => (b as any[]).length - (a as any[]).length)
    .map(([category]) => category)

  const getStyle = (category: string) => categoryStyles[category] || categoryStyles['default']

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero - Centered */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 block">
              Our Partners
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Premium <span className="text-gray-400">Brands</span>
            </h1>
            <div className="h-px w-32 bg-[#9F8B65] mb-6 mx-auto" />
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="text-gray-400" size={20} />
                <span className="text-gray-600">Authorized Dealer</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-600">
                <span className="font-semibold text-black">{brands.length}</span> Brands
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands - Compact Row */}
      <section className="py-10 border-b">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-amber-500" size={18} fill="currentColor" />
              <h2 className="text-lg font-semibold">Featured Partners</h2>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {featuredBrands.map((brand, index) => (
                  <motion.div
                    key={brand.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link href={`/brands/${brand.slug}`}>
                      <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all p-4 h-28 flex flex-col items-center justify-center text-center">
                        {brand.logo ? (
                          <div className="relative w-full h-12 mb-2">
                            <SafeImage
                              src={brand.logo}
                              alt={brand.name}
                              fill
                              className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold text-sm text-gray-800 group-hover:text-black">
                            {brand.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 mt-1">{brand.categories?.[0]}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 sticky top-[72px] z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === null
                    ? 'bg-black text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                }`}
              >
                All Categories
              </button>
              {sortedCategories.map((category) => {
                const style = getStyle(category)
                const count = brandsByCategory[category]?.length || 0
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                      activeCategory === category
                        ? 'bg-black text-white'
                        : `${style.bg} ${style.color} hover:opacity-80`
                    }`}
                  >
                    {category}
                    <span className={`text-xs ${activeCategory === category ? 'text-gray-300' : 'opacity-60'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Brands by Category */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-12">
            {(activeCategory ? [activeCategory] : sortedCategories).map((category) => {
              const categoryBrands = brandsByCategory[category] || []
              const style = getStyle(category)
              
              if (categoryBrands.length === 0) return null

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="scroll-mt-40"
                  id={category.toLowerCase().replace(/\s+/g, '-')}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full ${style.bg.replace('bg-', 'bg-').replace('-50', '-500')}`} />
                      <div>
                        <h3 className="text-2xl font-semibold">{category}</h3>
                        <p className="text-sm text-gray-500">{categoryBrands.length} brands</p>
                      </div>
                    </div>
                  </div>

                  {/* Brand Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryBrands.map((brand) => (
                      <Link key={brand.slug} href={`/brands/${brand.slug}`}>
                        <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all p-5 h-full">
                          <div className="flex items-start gap-4">
                            {/* Logo */}
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center p-2">
                              {brand.logo ? (
                                <div className="relative w-full h-full">
                                  <SafeImage
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                  />
                                </div>
                              ) : (
                                <span className="text-xs font-bold text-gray-400">
                                  {brand.name.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-300 truncate">
                                {brand.name}
                              </h4>
                              {brand.tagline && (
                                <p className="text-xs text-gray-400 italic truncate mt-0.5">
                                  {brand.tagline}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {brand.categories?.slice(0, 2).map((cat: string) => (
                                  <span
                                    key={cat}
                                    className={`text-xs px-2 py-0.5 rounded ${getStyle(cat).bg} ${getStyle(cat).color}`}
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Arrow */}
                            <ChevronRight 
                              className="text-gray-300 group-hover:text-gray-600 transition-colors flex-shrink-0" 
                              size={20} 
                            />
                          </div>

                          {/* Description Preview */}
                          {brand.description && (
                            <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                              {brand.description}
                            </p>
                          )}

                          {/* Featured Badge */}
                          {brand.featured && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                              <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                                <Star size={12} fill="currentColor" />
                                Featured Partner
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Need Equipment Recommendations?</h2>
            <p className="text-gray-400 mb-8">
              Our experts will help you select the perfect brands for your project.
            </p>
            <Button 
              size="lg" 
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 px-8" 
              onClick={() => setShowConsultationForm(true)}
            >
              Consult with Experts
            </Button>
          </div>
        </div>
      </section>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
