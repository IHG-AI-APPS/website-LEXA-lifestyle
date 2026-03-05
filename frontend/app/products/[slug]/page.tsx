'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { ArrowLeft, ArrowRight, Tag, Layers, ChevronLeft, ChevronRight } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  sub_category?: string
  description: string
  image: string
  images: string[]
  specifications: string[]
  features: string[]
  related_solutions: string[]
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [crossCategoryRecs, setCrossCategoryRecs] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const resolveImageUrl = (img: string) => {
    if (!img) return ''
    if (img.startsWith('http')) return img
    return `${BACKEND_URL}${img}`
  }

  // Combine primary image + gallery images into one array
  const allImages = useMemo(() => {
    if (!product) return []
    const imgs: string[] = []
    if (product.image) imgs.push(product.image)
    if (product.images?.length) {
      product.images.forEach(img => {
        if (img && !imgs.includes(img)) imgs.push(img)
      })
    }
    return imgs
  }, [product])

  const fetchProduct = useCallback(async () => {
    try {
      const resp = await fetch(`${API}/catalog/products/${params.slug}`)
      if (resp.ok) {
        const data = await resp.json()
        setProduct(data)

        // Fetch smart recommendations
        const recResp = await fetch(`${API}/catalog/recommendations/${params.slug}?limit=8`)
        if (recResp.ok) {
          const recData = await recResp.json()
          const recs = recData.recommendations || []
          // Split: first 4 = "You May Also Like" (same series/brand), rest = cross-category
          const sameBrand = recs.filter((r: any) => r.brand === data.brand).slice(0, 4)
          const crossCat = recs.filter((r: any) => r.brand !== data.brand).slice(0, 4)
          setRelatedProducts(sameBrand.length > 0 ? sameBrand : recs.slice(0, 4))
          setCrossCategoryRecs(crossCat)
        }
      }
    } catch (e) {
      console.error('Error fetching product:', e)
    }
    setLoading(false)
  }, [params.slug])

  useEffect(() => { fetchProduct() }, [fetchProduct])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20 flex items-center justify-center">
        <div className="text-center" data-testid="product-not-found">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <Link href="/products">
            <Button variant="outline" data-testid="back-to-products-btn">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pt-2">
        <Breadcrumb
          items={[
            { label: 'Products', href: '/products' },
            { label: product.brand, href: `/products?brand=${encodeURIComponent(product.brand)}` },
            { label: product.name }
          ]}
        />
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-50 dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800" data-testid="product-main-image">
                  {allImages.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <SafeImage
                          src={resolveImageUrl(allImages[activeImageIndex])}
                          alt={product.name}
                          fill
                          className="object-contain p-8"
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700">No Image</div>
                  )}
                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex(i => (i - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 rounded-full shadow hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                        data-testid="gallery-prev"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
                      </button>
                      <button
                        onClick={() => setActiveImageIndex(i => (i + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 rounded-full shadow hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                        data-testid="gallery-next"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-zinc-500 bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded-full">
                        {activeImageIndex + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1" data-testid="gallery-thumbnails">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        data-testid={`gallery-thumb-${index}`}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          index === activeImageIndex
                            ? 'border-[#C9A962] ring-1 ring-[#C9A962]/30'
                            : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <SafeImage
                          src={resolveImageUrl(img)}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                {/* Brand */}
                <Link
                  href={`/products?brand=${encodeURIComponent(product.brand)}`}
                  className="inline-flex items-center gap-1.5 text-[#C9A962] text-xs tracking-[0.2em] uppercase font-semibold hover:underline mb-3"
                  data-testid="product-brand-link"
                >
                  {product.brand}
                </Link>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4" data-testid="product-name">
                  {product.name}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs text-gray-600 dark:text-zinc-400">
                    <Tag className="w-3 h-3" /> {product.category}
                  </span>
                  {product.sub_category && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs text-gray-600 dark:text-zinc-400">
                      <Layers className="w-3 h-3" /> {product.sub_category}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-6" data-testid="product-description">
                    {product.description}
                  </p>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6" data-testid="product-features">
                    <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-gray-500 dark:text-zinc-400 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-zinc-400">
                          <div className="w-1.5 h-1.5 bg-[#C9A962] rounded-full mt-1.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-6" data-testid="product-specifications">
                    <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-gray-500 dark:text-zinc-400 mb-3">Specifications</h3>
                    <div className="border border-gray-100 dark:border-zinc-800 rounded-lg overflow-hidden">
                      {product.specifications.map((spec, i) => {
                        const parts = spec.split(':')
                        const hasLabel = parts.length > 1 && parts[0].length < 40
                        return (
                          <div key={i} className={`flex text-sm ${i > 0 ? 'border-t border-gray-100 dark:border-zinc-800' : ''}`}>
                            {hasLabel ? (
                              <>
                                <span className="w-2/5 px-3 py-2 bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-zinc-500 font-medium flex-shrink-0">{parts[0].trim()}</span>
                                <span className="flex-1 px-3 py-2 text-gray-700 dark:text-zinc-300">{parts.slice(1).join(':').trim()}</span>
                              </>
                            ) : (
                              <span className="flex-1 px-3 py-2 text-gray-700 dark:text-zinc-300">{spec}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button
                    className="bg-[#C9A962] hover:bg-[#b8994f] text-white px-8"
                    size="lg"
                    onClick={() => setShowConsultationForm(true)}
                    data-testid="product-inquiry-btn"
                  >
                    Enquire About This Product
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="browse-more-btn">
                      Browse More Products
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t border-gray-100 dark:border-zinc-800/50">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A962] font-semibold">Recommended</span>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-1" data-testid="related-products-title">
                    You May Also Like
                  </h2>
                </div>
                <Link href={`/products?brand=${encodeURIComponent(product.brand)}`} className="text-sm text-[#C9A962] hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((rp, index) => (
                  <Link key={rp.id} href={`/products/${rp.slug}`} data-testid={`related-product-${index}`}>
                    <div className="group">
                      <div className="relative aspect-square bg-gray-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 group-hover:border-[#C9A962]/30 transition-colors">
                        {rp.image ? (
                          <SafeImage src={resolveImageUrl(rp.image)} alt={rp.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700 text-xs">No Image</div>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <p className="text-[10px] text-[#C9A962] font-medium tracking-wide uppercase">{rp.brand}</p>
                        <h3 className="text-xs font-medium text-gray-900 dark:text-white mt-0.5 line-clamp-2 group-hover:text-[#C9A962] transition-colors">{rp.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Explore Other Categories */}
      {crossCategoryRecs.length > 0 && (
        <section className="py-12 border-t border-gray-100 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/20">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 font-semibold">Discover</span>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-1" data-testid="cross-category-title">
                    Explore Other Brands
                  </h2>
                </div>
                <Link href="/products" className="text-sm text-[#C9A962] hover:underline flex items-center gap-1">
                  Browse All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {crossCategoryRecs.map((rp, index) => (
                  <Link key={rp.id} href={`/products/${rp.slug}`} data-testid={`cross-rec-${index}`}>
                    <div className="group">
                      <div className="relative aspect-square bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 group-hover:border-[#C9A962]/30 transition-colors">
                        {rp.image ? (
                          <SafeImage src={resolveImageUrl(rp.image)} alt={rp.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700 text-xs">No Image</div>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <p className="text-[10px] text-[#C9A962] font-medium tracking-wide uppercase">{rp.brand}</p>
                        <h3 className="text-xs font-medium text-gray-900 dark:text-white mt-0.5 line-clamp-2 group-hover:text-[#C9A962] transition-colors">{rp.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Need Product Recommendations?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Our experts will specify the ideal equipment for your requirements and budget.
          </p>
          <Button
            className="bg-[#C9A962] hover:bg-[#b8994f] text-white px-10"
            size="lg"
            onClick={() => setShowConsultationForm(true)}
            data-testid="cta-consultation-btn"
          >
            Get Expert Recommendation
          </Button>
        </div>
      </section>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
