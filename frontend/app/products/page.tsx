'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal, X, ChevronDown, ArrowRight, Grid3X3, LayoutList } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface FilterData {
  name: string
  count: number
}

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  sub_category?: string
  image: string
  description: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A - Z' },
  { value: 'name_desc', label: 'Name Z - A' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
]

function FilterSection({ title, items, selected, onSelect, isOpen, onToggle }: {
  title: string
  items: FilterData[]
  selected: string | null
  onSelect: (val: string | null) => void
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3"
        data-testid={`filter-toggle-${title.toLowerCase().replace(/\s/g, '-')}`}
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 dark:text-zinc-400">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSelect(selected === item.name ? null : item.name)}
                  data-testid={`filter-${title.toLowerCase()}-${item.name.toLowerCase().replace(/[\s&]/g, '-')}`}
                  className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded text-sm transition-all ${
                    selected === item.name
                      ? 'bg-[#C9A962]/10 text-[#C9A962] font-medium'
                      : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  <span className="text-xs text-gray-400 dark:text-zinc-600 ml-2 flex-shrink-0">{item.count}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductCatalogContent />
    </Suspense>
  )
}

function ProductCatalogContent() {
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const initialBrand = searchParams.get('brand')
  const initialCategory = searchParams.get('category')
  const initialSearch = searchParams.get('search')
  
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState(initialSearch || '')
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch || '')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand)
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [sort, setSort] = useState('name_asc')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const [categories, setCategories] = useState<FilterData[]>([])
  const [brands, setBrands] = useState<FilterData[]>([])
  const [series, setSeries] = useState<FilterData[]>([])

  const [catOpen, setCatOpen] = useState(true)
  const [brandOpen, setBrandOpen] = useState(true)
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const sortRef = useRef<HTMLDivElement>(null)
  const PAGE_SIZE = 24

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  // Fetch filter data
  useEffect(() => {
    Promise.all([
      fetch(`${API}/catalog/categories`).then(r => r.json()),
      fetch(`${API}/catalog/brands`).then(r => r.json()),
      fetch(`${API}/catalog/series`).then(r => r.json()),
    ]).then(([cats, brnds, srs]) => {
      setCategories(cats)
      setBrands(brnds)
      setSeries(srs)
    }).catch(console.error)
  }, [])

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: PAGE_SIZE.toString(),
      sort,
    })
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedBrand) params.set('brand', selectedBrand)
    if (selectedSeries) params.set('sub_category', selectedSeries)

    try {
      const resp = await fetch(`${API}/catalog/products?${params}`)
      const data: ProductsResponse = await resp.json()
      setProducts(data.products)
      setTotal(data.total)
      setTotalPages(data.total_pages)
    } catch (e) {
      console.error('Error fetching products:', e)
    }
    setLoading(false)
  }, [page, sort, debouncedSearch, selectedCategory, selectedBrand, selectedSeries])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [debouncedSearch, selectedCategory, selectedBrand, selectedSeries, sort])

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSortDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const hasFilters = !!selectedCategory || !!selectedBrand || !!selectedSeries || !!debouncedSearch
  const clearAll = () => {
    setSelectedCategory(null)
    setSelectedBrand(null)
    setSelectedSeries(null)
    setSearch('')
    setDebouncedSearch('')
    setSort('name_asc')
  }

  const activeFilterCount = [selectedCategory, selectedBrand, selectedSeries].filter(Boolean).length

  const resolveImageUrl = (img: string) => {
    if (!img) return ''
    if (img.startsWith('http')) return img
    return `${BACKEND_URL}${img}`
  }

  const FiltersContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs tracking-[0.3em] uppercase font-semibold text-gray-900 dark:text-white">Filter</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-[#C9A962] hover:underline" data-testid="clear-all-filters">
            Clear all
          </button>
        )}
      </div>
      <FilterSection title="Main Category" items={categories} selected={selectedCategory} onSelect={setSelectedCategory} isOpen={catOpen} onToggle={() => setCatOpen(!catOpen)} />
      <FilterSection title="Brands" items={brands} selected={selectedBrand} onSelect={setSelectedBrand} isOpen={brandOpen} onToggle={() => setBrandOpen(!brandOpen)} />
      <FilterSection title="Series" items={series} selected={selectedSeries} onSelect={setSelectedSeries} isOpen={seriesOpen} onToggle={() => setSeriesOpen(!seriesOpen)} />
    </>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <section className="py-12 md:py-16 border-b border-gray-100 dark:border-zinc-800/50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white" data-testid="catalog-title">
                Products
              </h1>
              <div className="h-px w-20 bg-[#C9A962] mt-4 mb-4" />
              <p className="text-base text-gray-500 dark:text-zinc-500 max-w-xl">
                Explore our comprehensive catalog of premium smart home equipment from the world&apos;s most prestigious brands.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Controls Bar */}
      <section className="sticky top-[64px] z-30 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800/50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto py-3 flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="product-search-input"
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C9A962] focus:border-[#C9A962] text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-600 dark:text-zinc-400"
              data-testid="mobile-filter-toggle"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 flex items-center justify-center bg-[#C9A962] text-white text-xs rounded-full">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-600 dark:text-zinc-400 hover:border-[#C9A962] transition-colors"
                data-testid="sort-button"
              >
                {SORT_OPTIONS.find(o => o.value === sort)?.label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg z-40 overflow-hidden"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setShowSortDropdown(false) }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sort === opt.value ? 'bg-[#C9A962]/10 text-[#C9A962]' : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Count */}
            <span className="hidden md:block text-xs text-gray-400 dark:text-zinc-600 whitespace-nowrap" data-testid="product-count">
              {total} products
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto py-8 flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[140px]">
              <FiltersContent />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6" data-testid="active-filters">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs text-gray-700 dark:text-zinc-300">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs text-gray-700 dark:text-zinc-300">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedSeries && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs text-gray-700 dark:text-zinc-300">
                    {selectedSeries}
                    <button onClick={() => setSelectedSeries(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-100 dark:bg-zinc-800 rounded-lg" />
                    <div className="mt-3 h-3 bg-gray-100 dark:bg-zinc-800 rounded w-1/3" />
                    <div className="mt-2 h-4 bg-gray-100 dark:bg-zinc-800 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20" data-testid="no-products">
                <p className="text-gray-500 dark:text-zinc-500 text-lg mb-4">No products match your selected filters.</p>
                <Button onClick={clearAll} variant="outline" data-testid="reset-filters-btn">Reset All Filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" data-testid="products-grid">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                    >
                      <Link href={`/products/${product.slug}`} data-testid={`product-card-${index}`}>
                        <div className="group">
                          {/* Image */}
                          <div className="relative aspect-square bg-gray-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 group-hover:border-[#C9A962]/30 transition-colors">
                            {product.image ? (
                              <SafeImage
                                src={resolveImageUrl(product.image)}
                                alt={product.name}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700 text-xs">No Image</div>
                            )}
                            {/* Category badge */}
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-[10px] font-medium text-gray-600 dark:text-zinc-400 rounded">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          {/* Info */}
                          <div className="mt-3">
                            <p className="text-[11px] text-[#C9A962] font-medium tracking-wide uppercase">{product.brand}</p>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mt-0.5 line-clamp-2 group-hover:text-[#C9A962] transition-colors">
                              {product.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2" data-testid="pagination">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="text-xs"
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                        let pageNum: number
                        if (totalPages <= 7) {
                          pageNum = i + 1
                        } else if (page <= 4) {
                          pageNum = i + 1
                        } else if (page >= totalPages - 3) {
                          pageNum = totalPages - 6 + i
                        } else {
                          pageNum = page - 3 + i
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                              page === pageNum
                                ? 'bg-[#C9A962] text-white'
                                : 'text-gray-500 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="text-xs"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0A0A0A] z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} data-testid="close-mobile-filters">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <FiltersContent />
              <Button
                className="w-full mt-6 bg-[#C9A962] hover:bg-[#b8994f] text-white"
                onClick={() => setMobileFiltersOpen(false)}
                data-testid="apply-mobile-filters"
              >
                Apply Filters ({total} products)
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C9A96240; border-radius: 4px; }
      `}</style>
    </div>
  )
}
