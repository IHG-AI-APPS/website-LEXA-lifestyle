'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { Award, ChevronRight, Star, ArrowRight, Search, ExternalLink } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

// Brand feature images from lexalifestyle.com - properly mapped by brand name
const BRAND_FEATURE_IMAGES: Record<string, string> = {
  'aavik': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-aavik.webp',
  'aavik acoustics': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-aavik.webp',
  'ansuz': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-ansuz-1.webp',
  'ansuz acoustics': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-ansuz-1.webp',
  'anthem': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-antem.webp',
  'anthem av': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-antem.webp',
  'artesania': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-artesania-1.webp',
  'artesania audio': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-artesania-1.webp',
  'awol': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-AWOL.webp',
  'awol vision': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-AWOL.webp',
  'axxess': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-AXXESS.webp',
  'borresen': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-borresen.webp',
  'børresen': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-borresen.webp',
  'bowers & wilkins': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-BW.webp',
  'bowers': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-BW.webp',
  'b&w': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-BW.webp',
  'brightluxx': 'https://lexalifestyle.com/wp-content/uploads/2025/10/vagnn5knyysiuycaomfj.webp',
  'chamsys': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-CHAMSYS-2.webp',
  'desroch': 'https://lexalifestyle.com/wp-content/uploads/2025/10/FEATURE-IMAGE-DESROCH-1.webp',
  'eelectron': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-EELECTRON.webp',
  'e-electron': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-EELECTRON.webp',
  'epson': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-EPSON-1.webp',
  'k-array': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-array.webp',
  'kef': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-kef.webp',
  'leica': 'https://lexalifestyle.com/wp-content/uploads/2025/10/Featured-image.webp',
  'lexa': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-lexa.webp',
  'lexa lifestyle': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-lexa.webp',
  'lifesmart': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-LIFE-SMART-1.webp',
  'lumibright': 'https://lexalifestyle.com/wp-content/uploads/2025/09/1.webp',
  'lumitronix': 'https://lexalifestyle.com/wp-content/uploads/2025/10/Feature-image-lumitronix-01-scaled.webp',
  'magna': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-MAGNA.webp',
  'magna audio': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-MAGNA.webp',
  'marantz': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-MARANTZ.webp',
  'milan': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-MILAN-1.webp',
  'milan screen': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-MILAN-1.webp',
  'nakymatone': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-nakymatone.webp',
  'near': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-NEAR.webp',
  'qbus': 'https://lexalifestyle.com/wp-content/uploads/2025/10/Feature-image-qbus.webp',
  'rotel': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-rotel.webp',
  'russound': 'https://lexalifestyle.com/wp-content/uploads/2025/08/FEATURE-IMAGE-RUSSOUND.webp',
  'savant': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-SAVANT-2.webp',
  'sonos': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-sonos.webp',
  'sony': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-SONY.webp',
  'tridonic': 'https://lexalifestyle.com/wp-content/uploads/2025/10/FEATURE-IMAGE-TRIDONIC.webp',
  'valerion': 'https://lexalifestyle.com/wp-content/uploads/2025/10/Feature-image-valerion-01-1-scaled.webp',
  // Additional mappings for common variations
  'bang & olufsen': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-borresen.webp',
  'bang': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-borresen.webp',
  'b&o': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-borresen.webp',
  'control4': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-SAVANT-2.webp',
  'crestron': 'https://lexalifestyle.com/wp-content/uploads/2025/09/FEATURE-IMAGE-SAVANT-2.webp',
  'lutron': 'https://lexalifestyle.com/wp-content/uploads/2025/08/Feature-image-lexa.webp',
}

// Helper to find feature image for a brand
const getFeatureImage = (brand: any): string | null => {
  // First check if brand has hero_image
  if (brand.hero_image && brand.hero_image.trim()) return brand.hero_image
  
  // Check by slug
  const slug = brand.slug?.toLowerCase()
  if (slug && BRAND_FEATURE_IMAGES[slug]) return BRAND_FEATURE_IMAGES[slug]
  
  // Check by partial name match
  const nameLower = brand.name?.toLowerCase() || ''
  for (const [key, url] of Object.entries(BRAND_FEATURE_IMAGES)) {
    if (nameLower.includes(key) || key.includes(nameLower.split(' ')[0])) {
      return url
    }
  }
  
  return null
}

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

// Visual Brand Card Component with Feature Image and Large White Logo
function VisualBrandCard({ brand }: { brand: any }) {
  const featureImage = getFeatureImage(brand)
  const hasLogo = brand.logo && brand.logo.trim() !== ''
  const cat = brand.categories?.[0] || ''
  const style = getStyle(cat)
  
  return (
    <Link href={`/brands/${brand.slug}`} data-testid={`brand-card-${brand.slug}`}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-[#0A0A0A] h-[380px] cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Feature Image Background */}
        {featureImage ? (
          <div className="absolute inset-0">
            <SafeImage
              src={featureImage}
              alt={brand.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay for better logo visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
          </div>
        ) : (
          /* Fallback gradient if no image */
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${style.bg} 0%, #0A0A0A 50%, ${style.bg} 100%)` 
            }}
          />
        )}
        
        {/* Featured Badge */}
        {brand.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C9A962] text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          </div>
        )}
        
        {/* Large Logo - Absolutely Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110">
          {hasLogo ? (
            <div className="w-44 h-36 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl brand-logo-white"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-44 h-36 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/90 tracking-wider drop-shadow-2xl">
                {brand.name.split(' ').map((w: string) => w[0]).join('').substring(0, 3).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          {/* Brand Name */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A962] transition-colors">
            {brand.name}
          </h3>
          
          {/* Tagline */}
          {brand.tagline && (
            <p className="text-sm text-white/80 italic mb-2 line-clamp-1">{brand.tagline}</p>
          )}
          
          {/* Categories - Always visible */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {brand.categories?.slice(0, 3).map((catName: string) => (
              <span
                key={catName}
                className="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide bg-white/10 text-white/90"
              >
                {catName}
              </span>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="flex items-center gap-2 text-[#C9A962] text-xs font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
            <span>View More</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Simple Brand Logo for Featured Section
function BrandLogo({ brand, size = 'md' }: { brand: any; size?: 'sm' | 'md' }) {
  const hasLogo = brand.logo && brand.logo.trim() !== ''
  const dims = size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'
  const cat = brand.categories?.[0] || ''
  const style = getStyle(cat)

  if (hasLogo) {
    return (
      <div className={`${dims} flex-shrink-0 rounded-lg flex items-center justify-center p-1.5 overflow-hidden bg-white dark:bg-white/90`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" loading="lazy" />
      </div>
    )
  }

  const initials = brand.name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
  return (
    <div className={`${dims} flex-shrink-0 rounded-lg flex items-center justify-center`} style={{ background: style.bg, border: `1px solid ${style.accent}` }}>
      <span className={`${textSize} font-bold`} style={{ color: style.accent }}>{initials}</span>
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
    fetch(`${API}/brands?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(r => r.json())
      .then(data => { setBrands(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Specific featured brands list (in order)
  const FEATURED_BRAND_SLUGS = ['savant', 'borresen', 'aavik', 'lexa', 'e-electron', 'artesania', 'sonos', 'sony']
  
  const featuredBrands = FEATURED_BRAND_SLUGS
    .map(slug => brands.find((b: any) => 
      b.slug?.toLowerCase() === slug || 
      b.name?.toLowerCase().includes(slug) ||
      b.id?.toLowerCase() === slug
    ))
    .filter(Boolean)

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
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="brands-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://files.ihgbrands.com/lexa/migrated/a3b546f210cfd4cb.webp)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                Our Partners
              </span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="brands-heading">
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

      {/* Featured Brands Strip - Premium Design */}
      {featuredBrands.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-[#0A0A0A] to-[#050505] border-b border-zinc-800/50" data-testid="featured-brands">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A962]/30" />
                <Star className="text-[#C9A962]" size={16} fill="currentColor" />
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Featured Partners</span>
                <Star className="text-[#C9A962]" size={16} fill="currentColor" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A962]/30" />
              </div>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : (
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {featuredBrands.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} data-testid={`featured-${brand.slug}`}>
                      <motion.div 
                        className="group flex flex-col items-center justify-center p-5 rounded-xl bg-[#111] border border-zinc-800 hover:border-[#C9A962]/50 transition-all aspect-square"
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        {brand.logo ? (
                          <div className="w-16 h-16 flex items-center justify-center p-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain brand-logo-white"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-white/70 group-hover:text-white transition-colors">
                            {brand.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-zinc-500 mt-3 text-center uppercase tracking-wider group-hover:text-[#C9A962] transition-colors">
                          {brand.name}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + Search */}
      <section className="py-5 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-zinc-800 sticky top-[72px] z-30" data-testid="category-filter">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  data-testid="filter-all"
                  className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                    activeCategory === null
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-[#171717] text-gray-600 dark:text-zinc-500 hover:bg-gray-200 dark:hover:bg-[#171717]'
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
                          : 'text-gray-600 dark:text-zinc-500 hover:opacity-80'
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
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C9A962]/50 focus:border-[#C9A962]/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands by Category */}
      <section className="py-12 bg-white dark:bg-[#050505]" data-testid="brands-grid">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-14">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-[#0A0A0A] rounded-2xl h-[320px]" />
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryBrands.map((brand: any) => (
                        <VisualBrandCard key={brand.slug} brand={brand} />
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
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
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
