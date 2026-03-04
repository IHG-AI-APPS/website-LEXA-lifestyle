'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  Hotel,
  Calculator,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Loader2,
  Package,
  Brain,
  Zap,
  BarChart3 as ChartBar
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface PackagesMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function PackagesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: PackagesMegaMenuProps) {
  const [packages, setPackages] = useState<any[]>([])
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
    
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/packages/property-types`, {
          signal: abortController.signal
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setPackages(data.packages || [])
      } catch (error: any) {
        if (error?.name !== 'AbortError') {
          if (process.env.NODE_ENV === 'development') {
            console.debug('Packages fetch:', error?.message || 'Failed to load')
          }
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchPackages()
    
    return () => {
      abortController.abort()
    }
  }, [])

  const getIconForPackage = (title: string): any => {
    if (title.toLowerCase().includes('villa')) return Home
    if (title.toLowerCase().includes('penthouse')) return Building2
    if (title.toLowerCase().includes('studio')) return Hotel
    if (title.toLowerCase().includes('bedroom')) return Hotel
    return Package
  }

  // Split packages into 3 columns
  const luxuryPackages = packages.filter(p => 
    p.title.includes('Villas') || p.title.includes('Penthouses') || p.title.includes('Luxury Apartments')
  )
  const developerPackages = packages.filter(p => 
    p.title.includes('Studio') || p.title.includes('Bedroom')
  )
  const allOtherPackages = packages.filter(p => 
    !luxuryPackages.includes(p) && !developerPackages.includes(p)
  )

  // Organize into 3 columns
  const column1Packages = luxuryPackages
  const column2Packages = developerPackages
  const column3Packages = allOtherPackages

  if (loading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
                role="menu"
                aria-label="Packages menu"
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8">
                
                {/* Column 1: Luxury Properties */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Luxury Properties
                    </h3>
                    <p className="text-xs text-gray-500">Premium Smart Homes</p>
                  </div>
                  
                  <div className="space-y-1">
                    {column1Packages.slice(0, expandedCol1 ? column1Packages.length : 3).map((pkg) => {
                      const Icon = getIconForPackage(pkg.title)
                      return (
                        <Link
                          key={pkg.slug}
                          href={`/packages/${pkg.slug}`}
                          onClick={onClose}
                          className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                {pkg.title}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {column1Packages.length > 3 && (
                      <button
                        onClick={() => setExpandedCol1(!expandedCol1)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol1 ? 'Show Less' : `Show ${column1Packages.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol1 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    {/* Smart Apartments - Under Luxury */}
                    <Link
                      href="/packages/smart-apartment-packages"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all bg-sky-500/10 border border-sky-400/20 hover:border-sky-400/40 mt-3"
                    >
                      <div className="flex items-start gap-3">
                        <Hotel className="h-5 w-5 text-sky-400 transition-colors group-hover:text-sky-300 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                              Smart Apartments
                            </span>
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-sky-500/30 text-sky-200 rounded">
                              NEW
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">From AED 3,000</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-sky-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Developer Packages */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Developer Packages
                    </h3>
                    <p className="text-xs text-gray-500">Bulk Pricing Solutions</p>
                  </div>
                  
                  <div className="space-y-1">
                    {column2Packages.slice(0, expandedCol2 ? column2Packages.length : 3).map((pkg) => {
                      const Icon = getIconForPackage(pkg.title)
                      return (
                        <Link
                          key={pkg.slug}
                          href={`/packages/${pkg.slug}`}
                          onClick={onClose}
                          className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                {pkg.title}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {column2Packages.length > 3 && (
                      <button
                        onClick={() => setExpandedCol2(!expandedCol2)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol2 ? 'Show Less' : `Show ${column2Packages.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol2 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    {/* Bulk Developer Inquiry - Under Developer */}
                    <Link
                      href="/packages/developer-packages"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all bg-amber-500/10 border border-amber-400/20 hover:border-amber-400/40 mt-3"
                    >
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-amber-400 transition-colors group-hover:text-amber-300 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                              Bulk Inquiry
                            </span>
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-amber-500/30 text-amber-200 rounded">
                              10+ Units
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">Custom pricing</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-amber-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 3: Quick Links */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      Quick Links
                    </h3>
                    <p className="text-xs text-gray-500">Tools & Resources</p>
                  </div>
                  
                  <div className="space-y-1">
                    {/* Smart Project Builder - NEW HIGHLIGHTED */}
                    <Link
                      href="/project-builder"
                      onClick={onClose}
                      className="group block rounded-lg p-4 transition-all bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-400/60 mb-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Brain className="h-6 w-6 text-blue-400 transition-colors group-hover:text-blue-300 flex-shrink-0" />
                          <Zap className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                              Smart Project Builder
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 rounded-full">
                              NEW
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            AI-powered consultant • 650+ features • Instant proposal
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-blue-400 opacity-100 transition-all group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>

                    {/* Package Builder */}
                    <Link
                      href="/package-builder"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                            Package Builder
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>

                    {/* Cost Calculator */}
                    <Link
                      href="/calculator"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <Calculator className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                            Cost Calculator
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>

                    {/* ROI Calculator */}
                    <Link
                      href="/roi-calculator"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <ChartBar className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                            ROI Calculator
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>

                    {/* Specialty Rooms */}
                    <Link
                      href="/specialty-rooms"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                            Specialty Rooms
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>

                    {/* Enterprise Platform */}
                    <Link
                      href="/enterprise-platform"
                      onClick={onClose}
                      className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                            Enterprise Platform
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </Link>
                    
                    {/* View All Link */}
                    <Link
                      href="/packages"
                      onClick={onClose}
                      className="group block rounded-lg p-3 mt-2 transition-all bg-gradient-to-r from-[#E8DCC8]/10 to-transparent border border-[#E8DCC8]/30 hover:border-[#E8DCC8]/50"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-[#E8DCC8]" />
                        <span className="text-sm font-semibold text-[#E8DCC8]">
                          View All Packages
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 4: Smart Project Builder - LIVE */}
                <div className="relative lg:col-span-1">
                  <Link 
                    href="/project-builder"
                    onClick={onClose}
                    className="group block h-full"
                  >
                    <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-blue-500/30">
                      <SafeImage
                        src="https://static.prod-images.emergentagent.com/jobs/41733178-a8fe-49c4-9ba7-b7e286387ff3/images/4e47357100177921752dba2a28d4e110241f2656fd6da5dab8147bc239f44123.png"
                        alt="Smart Luxury Villa Packages"
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="mb-2 inline-block rounded-full bg-blue-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-200">
                          Live Now
                        </span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          Smart Project Builder
                        </h4>
                        <p className="text-xs text-gray-400 mb-4">
                          AI-powered consultant-grade system • Objective-driven • 650+ features
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                          <span>Start Building</span>
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
