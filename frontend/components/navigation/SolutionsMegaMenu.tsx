'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Film,
  Speaker,
  Smartphone,
  Sun,
  Users,
  Building,
  BarChart3,
  Moon,
  Mic,
  Anchor,
  Hotel,
  ChevronRight,
  ChevronDown,
  Loader2
} from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface SolutionsMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function SolutionsMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: SolutionsMegaMenuProps) {
  const [menuData, setMenuData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Close menu on scroll for better UX
  const handleScroll = useCallback(() => {
    if (isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, handleScroll])

  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchMegaMenuData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/solutions/mega-menu`, {
          signal: abortController.signal
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setMenuData(data)
      } catch (error: any) {
        // Silently handle abort errors (from React Strict Mode or unmount)
        if (error?.name !== 'AbortError') {
          // Only log non-abort errors in development
          if (process.env.NODE_ENV === 'development') {
            console.debug('Mega menu fetch:', error?.message || 'Failed to load')
          }
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchMegaMenuData()
    
    return () => {
      abortController.abort()
    }
  }, [])

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, { title: string; subtitle: string; icon: any }> = {
      residential: { title: 'Residential', subtitle: 'Smart Living', icon: Smartphone },
      commercial: { title: 'Commercial', subtitle: 'Business & Hospitality', icon: Building },
      specialized: { title: 'Specialized', subtitle: 'Premium Solutions', icon: Anchor }
    }
    return configs[category] || configs.residential
  }

  const getIconForSolution = (solution: any): any => {
    if (solution.slug.includes('cinema') || solution.slug.includes('theatre')) return Film
    if (solution.slug.includes('audio') || solution.slug.includes('entertainment')) return Speaker
    if (solution.slug.includes('yacht') || solution.slug.includes('marine')) return Anchor
    if (solution.slug.includes('hospitality') || solution.slug.includes('hotel')) return Hotel
    if (solution.slug.includes('commercial') || solution.slug.includes('collaboration')) return Users
    if (solution.slug.includes('security')) return BarChart3
    if (solution.slug.includes('energy') || solution.slug.includes('outdoor')) return Sun
    if (solution.slug.includes('mirror') || solution.slug.includes('video-wall')) return Moon
    if (solution.slug.includes('boardroom') || solution.slug.includes('auditorium')) return Mic
    return Smartphone
  }

  // Define popular items (most searched/requested)
  const popularItems: Record<string, number> = {
    residential: 4,
    commercial: 3,
    specialized: 3
  }

  if (loading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
                role="menu"
                aria-label="Solutions menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (!menuData || !menuData.categories) {
    return null
  }

  const { categories, featured_solution } = menuData

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Mega Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="fixed left-0 right-0 top-20 z-50 mx-auto max-w-7xl max-h-[calc(100vh-120px)]"
          >
            <div className="mx-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8">
                {/* Columns 1-3: Solution Categories */}
                {Object.entries(categories).map(([categoryKey, solutions]: [string, any]) => {
                  const config = getCategoryConfig(categoryKey)
                  const showCount = popularItems[categoryKey] || 4
                  const isExpanded = expandedCategories[categoryKey]
                  const visibleSolutions = isExpanded ? solutions : solutions.slice(0, showCount)
                  const hasMore = solutions.length > showCount
                  
                  if (!solutions || solutions.length === 0) return null

                  return (
                    <div key={categoryKey} className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                          {config.title}
                        </h3>
                        <p className="text-xs text-gray-500">{config.subtitle}</p>
                      </div>
                      
                      <div className="space-y-1">
                        {/* Visible solutions */}
                        {visibleSolutions.map((solution: any) => {
                          const Icon = getIconForSolution(solution)
                          
                          return (
                            <Link
                              key={solution.slug}
                              href={`/solutions/${solution.slug}`}
                              onClick={onClose}
                              className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                            >
                              <div className="flex items-start gap-3">
                                <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                    {solution.title}
                                  </span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                              </div>
                            </Link>
                          )
                        })}
                        
                        {/* Show More/Less button */}
                        {hasMore && (
                          <button
                            onClick={() => toggleCategory(categoryKey)}
                            className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                          >
                            <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                              {isExpanded ? 'Show Less' : `Show ${solutions.length - showCount} More`}
                            </span>
                            <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                        
                        {/* View All for last column */}
                        {categoryKey === 'specialized' && (
                          <Link
                            href="/solutions"
                            onClick={onClose}
                            className="group block rounded-lg p-3 mt-2 transition-all bg-gradient-to-r from-[#E8DCC8]/10 to-transparent border border-[#E8DCC8]/30 hover:border-[#E8DCC8]/50"
                          >
                            <div className="flex items-center gap-3">
                              <ChevronRight className="h-5 w-5 text-[#E8DCC8]" />
                              <span className="text-sm font-semibold text-[#E8DCC8]">
                                View All Solutions
                              </span>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })}
                
                {/* Column 4: Luxury Home Cinema Visual */}
                <div className="relative lg:col-span-1">
                  <Link 
                    href="/luxury-home-cinema-dubai"
                    onClick={onClose}
                    className="group block h-full"
                  >
                    <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10">
                      <SafeImage
                        src="https://files.ihgbrands.com/lexa/migrated/49cf42c34c789dba.webp"
                        alt="Luxury Home Cinema"
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="mb-2 inline-block rounded-full bg-[#E8DCC8]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E8DCC8]">
                          Featured
                        </span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#E8DCC8] transition-colors">
                          Luxury Home Cinema
                        </h4>
                        <p className="text-xs text-gray-400 mb-4">
                          Dolby Atmos • Acoustic Design • Theatre Seating
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors">
                          <span>Explore Cinema Solutions</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
