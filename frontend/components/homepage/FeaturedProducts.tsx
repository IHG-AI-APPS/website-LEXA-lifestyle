'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  image: string
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/catalog/featured?limit=8`)
      .then(r => r.json())
      .then(d => setProducts(d.products || []))
      .catch(() => {})
  }, [])

  if (products.length === 0) return null

  const resolveImg = (img: string) => img?.startsWith('http') ? img : `${BACKEND_URL}${img}`

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="featured-products-section">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A962] font-semibold">Curated Selection</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">Featured Products</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1 max-w-md">
                Premium equipment from the world&apos;s most prestigious smart home brands.
              </p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm text-[#C9A962] hover:underline font-medium" data-testid="view-all-products-link">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5" data-testid="featured-products-grid">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link href={`/products/${product.slug}`} data-testid={`featured-product-${i}`}>
                  <div className="group">
                    <div className="relative aspect-square bg-gray-50 dark:bg-[#0A0A0A] rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 group-hover:border-[#C9A962]/40 transition-colors">
                      {product.image ? (
                        <SafeImage
                          src={resolveImg(product.image)}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700 text-xs">No Image</div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="px-1.5 py-0.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-[9px] font-medium text-gray-500 dark:text-zinc-400 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <p className="text-[10px] text-[#C9A962] font-medium tracking-wide uppercase">{product.brand}</p>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mt-0.5 line-clamp-2 group-hover:text-[#C9A962] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-[#C9A962] font-medium">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
