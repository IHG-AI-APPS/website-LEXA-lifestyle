'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronDown,
  ChevronRight,
  Loader2
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface MobileMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  type: 'solutions' | 'services' | 'intelligence' | 'packages'
}

// Static menu data for each type
const SERVICES_DATA = {
  categories: {
    'design': [
      { title: 'Smart Home Design', slug: 'engineering', description: 'System design & consultation' },
      { title: 'Engineering & Integration', slug: 'engineering', description: 'Technical planning & setup' }
    ],
    'core': [
      { title: 'Lighting Control', slug: 'lighting-control', description: 'Automated lighting systems' },
      { title: 'Audio & Entertainment', slug: 'audio-video-integration', description: 'Multi-room AV solutions' },
      { title: 'Climate Control', slug: 'climate-control', description: 'Smart HVAC automation' },
      { title: 'Security Systems', slug: 'security-surveillance', description: 'Cameras & access control' },
      { title: 'Home Networking', slug: 'networking', description: 'WiFi 6 & structured cabling' }
    ],
    'support': [
      { title: 'Maintenance & Support', slug: 'maintenance', description: '24/7 technical assistance' },
      { title: 'System Upgrades', slug: 'upgrades', description: 'Future-proofing & expansion' }
    ]
  }
}

const INTELLIGENCE_DATA = {
  categories: {
    'insights': [
      { title: 'Smart Home Blog', slug: 'blog', description: 'Latest trends & insights' },
      { title: 'Case Studies', slug: 'case-studies', description: 'Real project showcases' },
      { title: 'Technology Guides', slug: 'guides', description: 'In-depth tech explanations' }
    ],
    'tools': [
      { title: 'Cost Calculator', slug: '/calculator', description: 'Estimate your project cost', isFullPath: true },
      { title: 'Project Builder', slug: '/project-builder/smart', description: 'Build your smart home', isFullPath: true },
      { title: 'ROI Calculator', slug: '/roi-calculator', description: 'Calculate your savings', isFullPath: true }
    ],
    'resources': [
      { title: 'FAQ', slug: 'faq', description: 'Frequently asked questions' },
      { title: 'Glossary', slug: 'glossary', description: 'Smart home terminology' }
    ]
  }
}

const PACKAGES_DATA = {
  categories: {
    'residential': [
      { title: 'Villa Packages', slug: 'villa-packages', description: 'Complete villa automation' },
      { title: 'Apartment Packages', slug: 'apartment-packages', description: 'Smart apartment solutions' },
      { title: 'Penthouse Packages', slug: 'penthouse-packages', description: 'Luxury penthouse automation' }
    ],
    'bundles': [
      { title: 'Essential Package', slug: 'essential', description: 'Core smart home features' },
      { title: 'Premium Package', slug: 'premium', description: 'Enhanced automation suite' },
      { title: 'Ultimate Package', slug: 'ultimate', description: 'Complete luxury experience' }
    ],
    'special': [
      { title: 'AMC Packages', slug: '/amc-packages', description: 'Annual maintenance contracts', isFullPath: true },
      { title: 'Retrofit Solutions', slug: 'retrofit', description: 'Upgrade existing homes' }
    ]
  }
}

export default function MobileMegaMenu({ isOpen, onClose, type }: MobileMegaMenuProps) {
  const [menuData, setMenuData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const getMenuTitle = () => {
    const titles: Record<string, string> = {
      solutions: 'Solutions',
      services: 'Services',
      intelligence: 'Intelligence',
      packages: 'Packages'
    }
    return titles[type] || type
  }

  const fetchMenuData = useCallback(async () => {
    try {
      if (type === 'solutions') {
        const response = await fetch(`${BACKEND_URL}/api/solutions/mega-menu`)
        const data = await response.json()
        setMenuData(data)
      } else if (type === 'services') {
        setMenuData(SERVICES_DATA)
      } else if (type === 'intelligence') {
        setMenuData(INTELLIGENCE_DATA)
      } else if (type === 'packages') {
        setMenuData(PACKAGES_DATA)
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to load mobile menu:', error)
      setLoading(false)
    }
  }, [type])

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setExpandedCategory(null)
      fetchMenuData()
    }
  }, [isOpen, fetchMenuData])

  const getCategoryTitle = (key: string) => {
    const titles: Record<string, string> = {
      // Solutions
      residential: 'Residential',
      commercial: 'Commercial',
      specialized: 'Specialized',
      // Services
      design: 'Design & Planning',
      core: 'Core Systems',
      support: 'Support',
      // Intelligence
      insights: 'Insights',
      tools: 'Tools',
      resources: 'Resources',
      // Packages
      bundles: 'Package Tiers',
      special: 'Special Offers'
    }
    return titles[key] || key.charAt(0).toUpperCase() + key.slice(1)
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getItemHref = (item: any) => {
    if (item.isFullPath) {
      return item.slug
    }
    return `/${type}/${item.slug}`
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          />
          
          {/* Mobile Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-gradient-to-br from-black via-gray-900 to-black z-50 overflow-y-auto lg:hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                {getMenuTitle()}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 text-[#E8DCC8] animate-spin" />
                </div>
              ) : menuData?.categories ? (
                <div className="space-y-2">
                  {Object.entries(menuData.categories).map(([categoryKey, items]: [string, any]) => {
                    if (!items || items.length === 0) return null
                    
                    const isExpanded = expandedCategory === categoryKey
                    
                    return (
                      <div key={categoryKey} className="border border-white/10 rounded-lg overflow-hidden">
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(categoryKey)}
                          className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="text-left">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8DCC8]">
                              {getCategoryTitle(categoryKey)}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {items.length} {getMenuTitle()}
                            </p>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Category Items */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 space-y-1 bg-black/20">
                                {items.map((item: any) => (
                                  <Link
                                    key={item.slug}
                                    href={getItemHref(item)}
                                    onClick={onClose}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors">
                                          {item.title}
                                        </span>
                                        {item.badge && (
                                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#E8DCC8]/20 text-[#E8DCC8]">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-500 line-clamp-1">
                                        {item.description}
                                      </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}

                  {/* View All Link */}
                  <Link
                    href={`/${type}`}
                    onClick={onClose}
                    className="block mt-4 p-4 rounded-lg bg-gradient-to-r from-[#E8DCC8]/20 to-[#E8DCC8]/5 border border-[#E8DCC8]/30 hover:border-[#E8DCC8]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-[#E8DCC8]">
                          View All {getMenuTitle()}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Browse complete catalog
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#E8DCC8]" />
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No {getMenuTitle().toLowerCase()} available
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 border-t border-white/10 bg-black/90 backdrop-blur-md p-4">
              <Link
                href="/consultation"
                onClick={onClose}
                className="block w-full bg-[#E8DCC8] hover:bg-[#B5952F] text-white text-center py-3 px-6 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
