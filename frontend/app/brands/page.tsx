'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Award, ChevronRight, Star, ArrowRight, Search } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

const categoryStyles: Record<string, { accent: string; bg: string }> = {
  'Audio': { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  'Automation': { accent: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  'Lighting': { accent: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  'Home Cinema': { accent: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  'Video': { accent: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  'Security': { accent: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  'Control Systems': { accent: '#06B6D4', bg: 'rgba(6,182,212,0.1)' },
  'Shading': { accent: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  'Electrical': { accent: '#64748B', bg: 'rgba(100,116,139,0.1)' },
  'Accessories': { accent: '#C9A962', bg: 'rgba(201,169,98,0.1)' },
  'Furniture': { accent: '#A16207', bg: 'rgba(161,98,7,0.1)' },
  'TV': { accent: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
  'Speakers': { accent: '#D946EF', bg: 'rgba(217,70,239,0.1)' },
  'Premium': { accent: '#C9A962', bg: 'rgba(201,169,98,0.1)' },
  'AV Distribution': { accent: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
}

const getStyle = (category: string) => categoryStyles[category] || { accent: '#C9A962', bg: 'rgba(201,169,98,0.1)' }

function BrandLogo({ brand, size = 'md' }: { brand: any; size?: 'sm' | 'md' }) {
  const hasLogo = brand.logo && brand.logo.trim() !== ''
  const dims = size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  if (hasLogo) {
    return (
      <div className={`${dims} flex-shrink-0 bg-white rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1.5 overflow-hidden`}>
        <div className="relative w-full h-full">
          <SafeImage src={brand.logo} alt={brand.name} fill className="object-contain" />
        </div>
      </div>
    )
  }

  const initials = brand.name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
  const cat = brand.categories?.[0] || ''
  const style = getStyle(cat)

  return (
    <div
      className={`${dims} flex-shrink-0 rounded-lg flex items-center justify-center`}
      style={{ background: style.bg, border: `1px solid ${style.accent}30` }}
    >
      <span className={`${textSize} font-bold tracking-wide`} style={{ color: style.accent }}>
        {initials}
      </span>
    </div>
  )
}

export default function BrandsPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch(`${API}/brands`)
      .then(r => r.json())
      .then(data => { setBrands(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const featuredBrands = brands.filter((b: any) => b.featured)

  const brandsByCategory = brands.reduce((acc: Record<string, any[]>, brand) => {
    const cat = brand.categories?.[0] || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(brand)
    return acc
  }, {})

  const sortedCategories = Object.entries(brandsByCategory)
    .sort(([, a], [, b]) => (b as any[]).length - (a as any[]).length)
    .map(([category]) => category)

  const filteredCategories = activeCategory ? [activeCategory] : sortedCategories
  const searchLower = searchQuery.toLowerCase()
  const hasSearch = searchQuery.trim().length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="brands-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1765766601532-90e9b96320c8?w=1200&q=50" alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-8 lg:px-16 py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                Our Partners
              </span>
              <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="brands-heading">
                Premium Technology <span className="text-[#C9A962]">Brands</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
                We partner with the world's finest audio, visual, and automation brands to deliver uncompromising smart home experiences.
              </p>
              <div className="flex items-center gap-6 text-sm justify-center">
                <div className="flex items-center gap-2">
                  <Award className="text-[#C9A962]" size={18} />
                  <span className="text-gray-400">Authorized Dealer</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{brands.length}</span> Premium Brands
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{sortedCategories.length}</span> Categories
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Brands Strip */}
      {featuredBrands.length > 0 && (
        <section className="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" data-testid="featured-brands">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-[#C9A962]" size={16} fill="currentColor" />
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Featured Partners</span>
              </div>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
                  {featuredBrands.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} data-testid={`featured-${brand.slug}`}>
                      <div className="group flex flex-col items-center justify-center text-center p-4 h-24 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/50 hover:shadow-md transition-all">
                        <BrandLogo brand={brand} size="sm" />
                        <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300 mt-2 truncate w-full group-hover:text-[#C9A962] transition-colors">
                          {brand.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + Search */}
      <section className="py-5 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-[72px] z-30" data-testid="category-filter">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  data-testid="filter-all"
                  className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                    activeCategory === null
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All ({brands.length})
                </button>
                {sortedCategories.map((category) => {
                  const count = brandsByCategory[category]?.length || 0
                  const style = getStyle(category)
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                        activeCategory === category
                          ? 'text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:opacity-80'
                      }`}
                      style={
                        activeCategory === category
                          ? { backgroundColor: style.accent }
                          : { backgroundColor: style.bg, color: style.accent }
                      }
                    >
                      {category} ({count})
                    </button>
                  )
                })}
              </div>
              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="brand-search"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/50 focus:border-[#C9A962]/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands by Category */}
      <section className="py-12 bg-white dark:bg-gray-950" data-testid="brands-grid">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-14">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-900 rounded-xl h-36" />
                ))}
              </div>
            ) : (
              filteredCategories.map((category) => {
                let categoryBrands = brandsByCategory[category] || []
                if (hasSearch) {
                  categoryBrands = categoryBrands.filter((b: any) =>
                    b.name.toLowerCase().includes(searchLower) ||
                    b.description?.toLowerCase().includes(searchLower)
                  )
                }
                if (categoryBrands.length === 0) return null
                const style = getStyle(category)

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="scroll-mt-40"
                    id={category.toLowerCase().replace(/\s+/g, '-')}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: style.accent }} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category}</h3>
                        <p className="text-xs text-gray-500">{categoryBrands.length} brand{categoryBrands.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categoryBrands.map((brand: any) => (
                        <Link key={brand.slug} href={`/brands/${brand.slug}`} data-testid={`brand-card-${brand.slug}`}>
                          <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/50 hover:shadow-lg transition-all p-5 h-full">
                            <div className="flex items-start gap-4">
                              <BrandLogo brand={brand} />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#C9A962] transition-colors truncate text-sm">
                                  {brand.name}
                                </h4>
                                {brand.tagline && (
                                  <p className="text-xs text-gray-400 italic truncate mt-0.5">{brand.tagline}</p>
                                )}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {brand.categories?.slice(0, 2).map((cat: string) => {
                                    const catStyle = getStyle(cat)
                                    return (
                                      <span
                                        key={cat}
                                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                        style={{ background: catStyle.bg, color: catStyle.accent }}
                                      >
                                        {cat}
                                      </span>
                                    )
                                  })}
                                </div>
                              </div>
                              <ChevronRight
                                className="text-gray-300 dark:text-gray-600 group-hover:text-[#C9A962] transition-colors flex-shrink-0 mt-1"
                                size={18}
                              />
                            </div>

                            {brand.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                                {brand.description}
                              </p>
                            )}

                            {brand.featured && (
                              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#C9A962]">
                                  <Star size={10} fill="currentColor" />
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
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Expert Consultation</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Need Equipment Recommendations?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Our experts will help you select the perfect brands and products for your unique smart home project.
            </p>
            <Button
              size="lg"
              className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8"
              onClick={() => setShowConsultationForm(true)}
              data-testid="cta-consult"
            >
              Consult with Experts <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
