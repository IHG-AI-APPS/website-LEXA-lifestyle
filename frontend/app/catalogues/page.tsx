'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { BookOpen, FileText, Award, Building2, ArrowRight } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface Catalogue {
  id: string
  slug: string
  title: string
  description: string
  category: string
  pdf_url: string
  thumbnail: string
  page_count: number
  brand_slug?: string
  featured: boolean
}

const CATEGORIES = [
  { key: 'company-profile', label: 'Company Profile', icon: Building2, desc: 'About LEXA and our capabilities' },
  { key: 'pre-qualification', label: 'Pre-Qualification', icon: Award, desc: 'Certifications and credentials' },
  { key: 'brand-catalogues', label: 'Brand Catalogues', icon: BookOpen, desc: 'Product catalogues from our partners' },
]

const getCategoryInfo = (key: string) => CATEGORIES.find(c => c.key === key) || { key, label: key, icon: FileText, desc: '' }

export default function CataloguesPage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API}/catalogues`)
      .then(r => r.json())
      .then(data => { setCatalogues(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const grouped = catalogues.reduce((acc: Record<string, Catalogue[]>, cat) => {
    const key = cat.category || 'other'
    if (!acc[key]) acc[key] = []
    acc[key].push(cat)
    return acc
  }, {})

  const categories = Object.keys(grouped)
  const filteredCategories = activeCategory ? [activeCategory] : categories

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="catalogues-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-8 lg:px-16 py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                Resources
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="catalogues-heading">
                Our <span className="text-[#C9A962]">Catalogues</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                Browse our company profile, pre-qualification documents, and brand catalogues in an interactive flipbook viewer.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-[#C9A962]" size={18} />
                  <span className="text-gray-400">Interactive Viewer</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="text-gray-400">
                  <span className="font-semibold text-white">{catalogues.length}</span> Documents
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-5 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-[72px] z-30">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              data-testid="filter-all"
              className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                activeCategory === null
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All ({catalogues.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = grouped[cat.key]?.length || 0
              if (count === 0) return null
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  data-testid={`filter-${cat.key}`}
                  className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                    activeCategory === cat.key
                      ? 'bg-[#C9A962] text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-12 bg-white dark:bg-gray-950" data-testid="catalogues-grid">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-14">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-900 rounded-xl h-72" />
                ))}
              </div>
            ) : catalogues.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen size={48} className="text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No catalogues available yet</p>
                <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Check back soon for our latest documents</p>
              </div>
            ) : (
              filteredCategories.map(catKey => {
                const items = grouped[catKey] || []
                if (items.length === 0) return null
                const info = getCategoryInfo(catKey)
                const Icon = info.icon

                return (
                  <motion.div
                    key={catKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-[#C9A962]/10 flex items-center justify-center">
                        <Icon size={20} className="text-[#C9A962]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{info.label}</h2>
                        {info.desc && <p className="text-xs text-gray-500">{info.desc}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/catalogues/${cat.slug}`}
                          target="_blank"
                          data-testid={`catalogue-card-${cat.slug}`}
                        >
                          <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/50 hover:shadow-lg transition-all overflow-hidden h-full">
                            {/* Thumbnail */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                              {cat.thumbnail ? (
                                <SafeImage
                                  src={cat.thumbnail}
                                  alt={cat.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <FileText size={40} className="text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                                    <span className="text-xs text-gray-400 font-medium">PDF Document</span>
                                  </div>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#C9A962] text-gray-900 text-xs font-semibold">
                                  View <ArrowRight size={12} />
                                </span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#C9A962] transition-colors">
                                {cat.title}
                              </h3>
                              {cat.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{cat.description}</p>
                              )}
                              <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400 uppercase tracking-wider">
                                <span>{info.label}</span>
                                {cat.page_count > 0 && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span>{cat.page_count} pages</span>
                                  </>
                                )}
                              </div>
                            </div>
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
    </div>
  )
}
