'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import ConsultationForm from '@/components/forms/ConsultationForm'
import RelatedItemsCarousel from '@/components/sections/RelatedItemsCarousel'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const API = `${BACKEND_URL}/api`

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const cms = useCms('page_products_detail', null)

  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [otherProducts, setOtherProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`${API}/products/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }, [params.slug])

  const fetchOtherProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API}/products`)
      if (response.ok) {
        const data = await response.json()
        const filtered = data.filter((p: any) => p.slug !== params.slug).slice(0, 4)
        setOtherProducts(filtered)
      }
    } catch (error) {
      console.error('Error fetching other products:', error)
    }
  }, [params.slug])

  useEffect(() => {
    fetchProduct()
    fetchOtherProducts()
  }, [fetchProduct, fetchOtherProducts])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Product Category Not Found</h2>
          <Link href="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-8 lg:px-16">
        <Breadcrumb 
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name }
          ]} 
        />
      </div>

      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {product.icon && (
                <div className="text-7xl mb-6">{product.icon}</div>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{product.name}</h1>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                {product.description}
              </p>
              {product.featured && (
                <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-base px-4 py-2">
                  ⭐ Featured Category
                </Badge>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content - Specifications */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="border border-gray-200 dark:border-gray-700 p-12 mb-8"
                >
                  <h2 className="text-4xl font-semibold mb-6">Key Specifications</h2>
                  <div className="h-px w-24 bg-gradient-to-r from-charcoal to-transparent mb-8" />
                  <div className="space-y-4">
                    {product.specifications.map((spec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={24} className="text-charcoal mt-1 flex-shrink-0" strokeWidth={1.5} />
                        <p className="text-lg text-gray-700 dark:text-gray-300">{spec}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Related Solutions */}
                {product.related_solutions && product.related_solutions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border border-gray-200 dark:border-gray-700 p-12"
                  >
                    <h2 className="text-4xl font-semibold mb-6">Related Solutions</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-charcoal to-transparent mb-8" />
                    <div className="flex flex-wrap gap-3">
                      {product.related_solutions.map((solution: string) => (
                        <Link key={solution} href={`/solutions/${solution}`}>
                          <div className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-charcoal hover:bg-gray-50 transition-all cursor-pointer">
                            <span className="font-medium capitalize">{solution.replace(/-/g, ' ')}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - Brands */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 p-8 sticky top-24"
                >
                  <h3 className="text-2xl font-semibold mb-4">Available Brands</h3>
                  <div className="h-px w-16 bg-gradient-to-r from-charcoal to-transparent mb-6" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    We carry {product.brands.length} premium brands in this category
                  </p>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {product.brands.map((brand: string) => (
                      <div
                        key={brand}
                        className="p-4 border border-gray-200 dark:border-gray-700 hover:border-charcoal hover:bg-gray-50 transition-all"
                      >
                        <p className="font-medium">{brand}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link href="/brands">
                      <Button variant="outline" className="w-full" size="lg">
                        View All Brands
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold text-white mb-6">
                Need {product.name}?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Let our experts recommend the perfect products for your requirements.
              </p>
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 dark:bg-gray-800 text-charcoal px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                Get Product Recommendation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <RelatedItemsCarousel
          items={otherProducts.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.name,
            name: p.name,
            image: p.image,
            description: p.description
          }))}
          title="Other Products"
          basePath="/products"
        />
      )}

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
    </div>
  )
}
