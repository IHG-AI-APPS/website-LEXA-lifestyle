'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Accessories',
    description: 'High-performance audio connections and cables',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/d4a06b14ba10ef421f1f4c282b07290dee0bc4495e38d732649645ac4946c654.png',
    slug: 'accessories',
  },
  {
    name: 'Audio',
    description: 'Premium sound systems and speakers',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/a34df6800fc727f21ac8daf75ce38a646c03e449c4e74a7208957b6fa11757b1.png',
    slug: 'audio',
  },
  {
    name: 'Automation',
    description: 'Smart home control systems',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/782e08f37de617d7a1529cb98ade2a63e9b92108dada79f13465bcfcf4b24542.png',
    slug: 'automation',
  },
  {
    name: 'Electrical',
    description: 'Power and lighting control solutions',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/a4899322770290e7751d250c93b8dcc48784b442ab4960817861ea6299d45133.png',
    slug: 'electrical',
  },
  {
    name: 'Furniture',
    description: 'Premium home theater recliners',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/72f312637f81abaf5e5c706b51c2987387d2ce444ea2add0881091aa8f55ebc2.png',
    slug: 'furniture',
  },
  {
    name: 'Home Cinema',
    description: 'World-class entertainment hubs',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/c78267654b79970d676e474a40f62efa045795f7fea71dae51916edcbedbb6ee.png',
    slug: 'home-cinema',
  },
  {
    name: 'Lighting',
    description: 'Advanced smart lighting solutions',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/ea7befdbfb1960ad42be252a13ecf297bec6cbc11ec2402163650879ae681e7b.png',
    slug: 'lighting',
  },
  {
    name: 'Video',
    description: 'Advanced video and display systems',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/faf2cbd60068c43c392712835616cca9a40ca83c2b73f01dd80464b976ed6593.png',
    slug: 'video',
  },
]

export default function ProductCategories() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16">
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-zinc-500 font-bold block mb-6">
            Product Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black mb-6">
            CATEGORIES
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-zinc-500 max-w-2xl">
            Browse by equipment type to find the perfect components for your system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/products?category=${category.slug}`} className="group block">
                <div className="relative h-64 overflow-hidden mb-4 bg-gray-100 dark:bg-[#171717]">
                  <SafeImage
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-heading font-semibold text-white mb-1">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-zinc-500 group-hover:text-black transition-colors">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            View All Products
            <ArrowRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  )
}
