'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Building2,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Loader2,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface IntelligenceMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function IntelligenceMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: IntelligenceMegaMenuProps) {
  const [menuData, setMenuData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedCol1, setExpandedCol1] = useState(false)
  const [expandedCol2, setExpandedCol2] = useState(false)
  const [expandedCol3, setExpandedCol3] = useState(false)

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
        if (error?.name !== 'AbortError') {
          if (process.env.NODE_ENV === 'development') {
            console.debug('Intelligence menu fetch:', error?.message || 'Failed to load')
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

  const getIconForSolution = (solution: any): any => {
    // Map intelligence-specific icons
    if (solution.slug?.includes('intelligence-loop')) return Brain
    if (solution.slug?.includes('smart-office')) return Building2
    if (solution.slug?.includes('bms')) return Zap
    if (solution.slug?.includes('security')) return Shield
    if (solution.slug?.includes('analytics')) return BarChart3
    if (solution.slug?.includes('roi')) return TrendingUp
    return Brain // Default
  }

  if (loading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
                role="menu"
                aria-label="Intelligence menu"
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

  // Filter for intelligence/commercial solutions
  const intelligenceSolutions = menuData?.categories?.commercial || []
  
  // Split solutions into 3 columns
  const itemsPerColumn = 4
  const column1Solutions = intelligenceSolutions.slice(0, itemsPerColumn)
  const column2Solutions = intelligenceSolutions.slice(itemsPerColumn, itemsPerColumn * 2)
  const column3Solutions = intelligenceSolutions.slice(itemsPerColumn * 2)

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
                {/* Column 1: Core Intelligence */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Core Intelligence
                    </h3>
                    <p className="text-xs text-gray-500">Foundation Systems</p>
                  </div>
                  
                  <div className="space-y-1">
                    {column1Solutions.slice(0, expandedCol1 ? column1Solutions.length : 3).map((solution: any) => {
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
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {column1Solutions.length > 3 && (
                      <button
                        onClick={() => setExpandedCol1(!expandedCol1)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol1 ? 'Show Less' : `Show ${column1Solutions.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol1 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Column 2: Advanced Solutions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Advanced Systems
                    </h3>
                    <p className="text-xs text-gray-500">Enhanced Features</p>
                  </div>
                  
                  <div className="space-y-1">
                    {column2Solutions.slice(0, expandedCol2 ? column2Solutions.length : 3).map((solution: any) => {
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
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {column2Solutions.length > 3 && (
                      <button
                        onClick={() => setExpandedCol2(!expandedCol2)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol2 ? 'Show Less' : `Show ${column2Solutions.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol2 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Column 3: Enterprise Solutions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Enterprise
                    </h3>
                    <p className="text-xs text-gray-500">Large Scale Systems</p>
                  </div>
                  
                  <div className="space-y-1">
                    {column3Solutions.slice(0, expandedCol3 ? column3Solutions.length : 3).map((solution: any) => {
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
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {column3Solutions.length > 3 && (
                      <button
                        onClick={() => setExpandedCol3(!expandedCol3)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol3 ? 'Show Less' : `Show ${column3Solutions.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol3 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    {/* View All Link */}
                    <Link
                      href="/intelligence"
                      onClick={onClose}
                      className="group block rounded-lg p-3 mt-2 transition-all bg-gradient-to-r from-[#E8DCC8]/10 to-transparent border border-[#E8DCC8]/30 hover:border-[#E8DCC8]/50"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-[#E8DCC8]" />
                        <span className="text-sm font-semibold text-[#E8DCC8]">
                          View All Intelligence
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 4: Featured Intelligence Visual */}
                <div className="relative lg:col-span-1">
                  <Link 
                    href="/intelligence"
                    onClick={onClose}
                    className="group block h-full"
                  >
                    <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10">
                      <SafeImage
                        src="https://static.prod-images.emergentagent.com/jobs/41733178-a8fe-49c4-9ba7-b7e286387ff3/images/17b4faffd2a04800e723195293e85edcef2995893a936d192034cabd003c7b89.png"
                        alt="Building Intelligence & AI Analytics"
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
                          Building Intelligence
                        </h4>
                        <p className="text-xs text-gray-400 mb-4">
                          AI-Powered • Real-Time Analytics • Predictive Insights
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors">
                          <span>Explore Intelligence</span>
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
