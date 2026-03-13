'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import dynamic from 'next/dynamic'
import {
  Film,
  Home,
  Trees,
  Shield,
  Tv,
  Lightbulb,
  Thermometer,
  Music,
  Camera,
  Wifi,
  LucideIcon,
  ArrowRight
} from 'lucide-react'

const SwipeCarousel = dynamic(() => import('@/components/mobile/SwipeCarousel'), { ssr: false })

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Icon map for dynamic resolution
const ICON_MAP: Record<string, LucideIcon> = {
  Film, Home, Trees, Shield, Tv, Lightbulb, Thermometer, Music, Camera, Wifi
}

// Grid class assignments based on position
const GRID_CLASSES = [
  'col-span-1 md:col-span-2 row-span-2 min-h-[400px] md:min-h-[500px]', // Hero - first item
  'col-span-1 md:col-span-2 row-span-1 min-h-[240px]', // Wide
  'col-span-1 row-span-1 min-h-[240px]', // Small
  'col-span-1 row-span-1 min-h-[240px]'  // Small
]

// Fallback data in case API fails
const FALLBACK_SOLUTIONS = [
  {
    title: 'Luxury Home Cinema',
    subtitle: 'Private Theatre Experiences',
    description: 'Dolby Atmos, acoustic design, and bespoke seating.',
    image: 'https://files.ihgbrands.com/lexa/migrated/753cbe457d2b1dcc.webp',
    slug: 'luxury-home-cinema-dubai',
    icon: 'Film',
    theme: 'dark'
  },
  {
    title: 'Smart Residential Living',
    subtitle: 'Complete Home Automation',
    description: 'Lighting, climate, security, and entertainment unified.',
    image: 'https://files.ihgbrands.com/lexa/migrated/5a12821038cb9fa3.webp',
    slug: 'smart-home',
    icon: 'Home',
    theme: 'light'
  },
  {
    title: 'Outdoor Living',
    subtitle: 'Smart Gardens & Pools',
    description: 'Automated outdoor entertainment.',
    image: 'https://files.ihgbrands.com/lexa/migrated/ddf36dbc25c37067.webp',
    slug: 'outdoor-automation',
    icon: 'Trees',
    theme: 'dark'
  },
  {
    title: 'Security & Access',
    subtitle: 'Smart Protection',
    description: 'AI-powered monitoring and access control.',
    image: 'https://files.ihgbrands.com/lexa/migrated/8e7ad27d3a88e7ea.webp',
    slug: 'security',
    icon: 'Shield',
    theme: 'light'
  }
]

interface Solution {
  title: string
  subtitle?: string
  tagline?: string
  short_description?: string
  description?: string
  image?: string
  hero_image?: string
  slug: string
  icon?: string
  theme?: string
  featured?: boolean
}

export default function SolutionsBentoGrid() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedSolutions = async () => {
      try {
        // Fetch featured solutions from mega-menu endpoint
        const response = await fetch(`${BACKEND_URL}/api/solutions/mega-menu`)
        if (response.ok) {
          const data = await response.json()
          // Get featured solutions from categories
          const featured: Solution[] = []
          
          // Extract featured items from each category (categories is an object with arrays as values)
          if (data.categories && typeof data.categories === 'object') {
            Object.values(data.categories).forEach((categoryItems: unknown) => {
              if (Array.isArray(categoryItems)) {
                (categoryItems as Solution[])
                  .filter((item: Solution) => item.featured)
                  .forEach((item: Solution) => featured.push(item))
              }
            })
          }
          
          // If we have featured items, use them; otherwise get first 4 from any category
          if (featured.length >= 4) {
            setSolutions(featured.slice(0, 4))
          } else {
            // Get top solutions from all categories
            const allSolutions: Solution[] = []
            if (data.categories && typeof data.categories === 'object') {
              Object.values(data.categories).forEach((categoryItems: unknown) => {
                if (Array.isArray(categoryItems)) {
                  allSolutions.push(...(categoryItems as Solution[]))
                }
              })
            }
            setSolutions(allSolutions.slice(0, 4))
          }
        } else {
          setSolutions(FALLBACK_SOLUTIONS)
        }
      } catch (error) {
        console.error('Error fetching solutions:', error)
        setSolutions(FALLBACK_SOLUTIONS)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedSolutions()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#0A0A0A] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-[#C9A962] mb-4">Our Solutions</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              Technology That Transforms
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-5 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`${GRID_CLASSES[i]} bg-[#111] border border-white/5 animate-pulse`} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32" data-testid="solutions-grid">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#C9A962] mb-4">Our Solutions</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Technology That Transforms
              </h2>
            </div>
            <Link 
              href="/solutions"
              className="hidden md:flex items-center gap-2 text-white/60 text-sm uppercase tracking-[0.15em] hover:text-[#C9A962] transition-colors"
            >
              All Solutions
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Mobile: Swipeable Carousel */}
        <div className="md:hidden -mx-4" data-testid="solutions-swipe-carousel">
          <SwipeCarousel cardWidth={280} gap={12} showPeek={true}>
            {solutions.map((solution, index) => {
              const iconName = solution.icon || 'Home'
              const Icon = ICON_MAP[iconName] || Home
              const imageUrl = solution.hero_image || solution.image || 'https://files.ihgbrands.com/lexa/migrated/5a12821038cb9fa3.webp'
              
              return (
                <Link
                  key={solution.slug || index}
                  href={`/solutions/${solution.slug}`}
                  className="group relative block h-[280px] overflow-hidden rounded-2xl border border-white/[0.08]"
                  data-testid={`solution-mobile-${index}`}
                >
                  <div className="absolute inset-0">
                    <SafeImage src={imageUrl} alt={solution.title} fill className="object-cover transition-transform duration-500 group-active:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-end p-5 text-center">
                    <Icon className="h-7 w-7 text-[#C9A962] mb-2" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A962] mb-1">
                      {solution.subtitle || solution.tagline || 'Smart Solution'}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1.5">{solution.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                      {solution.short_description || solution.description || ''}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[#C9A962] text-xs font-medium">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </SwipeCarousel>
        </div>

        {/* Desktop: Bento Grid */}
        <div className="hidden md:grid grid-cols-4 auto-rows-fr gap-5 lg:gap-6">
          {solutions.map((solution, index) => {
            const iconName = solution.icon || 'Home'
            const Icon = ICON_MAP[iconName] || Home
            const imageUrl = solution.hero_image || solution.image || 'https://files.ihgbrands.com/lexa/migrated/5a12821038cb9fa3.webp'
            
            return (
              <motion.div
                key={solution.slug || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={GRID_CLASSES[index] || GRID_CLASSES[3]}
              >
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group relative block h-full overflow-hidden border border-white/5 transition-all hover:border-[#C9A962]/30"
                  data-testid={`solution-${index}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <SafeImage
                      src={imageUrl}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <div className="mb-3">
                      <Icon className="h-8 w-8 md:h-10 md:w-10 mb-4 text-[#C9A962]" />
                    </div>
                    
                    <span className="text-xs font-semibold uppercase tracking-wider mb-2 block text-[#C9A962]">
                      {solution.subtitle || solution.tagline || 'Smart Solution'}
                    </span>
                    
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 transition-colors group-hover:text-[#C9A962]">
                      {solution.title}
                    </h3>
                    
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                      {solution.short_description || solution.description || ''}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Link 
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-[#C9A962] hover:text-white transition-colors"
          >
            View All Solutions
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
