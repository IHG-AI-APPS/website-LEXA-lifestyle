'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ArrowRight, Trash2 } from 'lucide-react'
import { useRecentlyViewed, RecentlyViewedItem } from '@/hooks/useRecentlyViewed'
import { useLanguage } from '@/contexts/LanguageContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Type icons
const typeIcons: Record<string, string> = {
  solution: '💡',
  project: '🏠',
  service: '⚙️',
  package: '📦'
}

// Type labels
const typeLabels: Record<string, { en: string; ar: string }> = {
  solution: { en: 'Solution', ar: 'حل' },
  project: { en: 'Project', ar: 'مشروع' },
  service: { en: 'Service', ar: 'خدمة' },
  package: { en: 'Package', ar: 'باقة' }
}

// Generate href based on type
const getHref = (item: RecentlyViewedItem): string => {
  switch (item.type) {
    case 'solution':
      return `/solutions/${item.slug}`
    case 'project':
      return `/projects/${item.slug}`
    case 'service':
      return `/services/${item.slug}`
    case 'package':
      return `/packages/${item.slug}`
    default:
      return '/'
  }
}

// Get image URL
const getImageUrl = (image?: string): string => {
  if (!image) return '/placeholder-project.jpg'
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return image
  return `${BACKEND_URL}${image}`
}

// Time ago formatter
const getTimeAgo = (timestamp: number, language: string): string => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (language === 'ar') {
    if (minutes < 60) return `قبل ${minutes} دقيقة`
    if (hours < 24) return `قبل ${hours} ساعة`
    return `قبل ${days} يوم`
  }

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

interface RecentlyViewedSectionProps {
  className?: string
  maxItems?: number
  showClearButton?: boolean
  variant?: 'horizontal' | 'grid'
}

export default function RecentlyViewedSection({
  className = '',
  maxItems = 4,
  showClearButton = true,
  variant = 'horizontal'
}: RecentlyViewedSectionProps) {
  const { language } = useLanguage()
  const { items, isLoaded, removeItem, clearAll } = useRecentlyViewed()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [validatedItems, setValidatedItems] = useState<RecentlyViewedItem[]>([])
  const [isValidating, setIsValidating] = useState(true)

  // Validate items against backend to filter out deleted ones
  useEffect(() => {
    if (!isLoaded || items.length === 0) {
      setIsValidating(false)
      return
    }

    const validateItems = async () => {
      try {
        const validItems: RecentlyViewedItem[] = []
        
        for (const item of items) {
          try {
            let endpoint = ''
            switch (item.type) {
              case 'solution':
                endpoint = `${BACKEND_URL}/api/solutions/${item.slug}`
                break
              case 'project':
                endpoint = `${BACKEND_URL}/api/projects/${item.slug}`
                break
              case 'service':
                endpoint = `${BACKEND_URL}/api/services/${item.slug}`
                break
              case 'package':
                endpoint = `${BACKEND_URL}/api/property-packages/${item.slug}`
                break
            }
            
            if (endpoint) {
              const res = await fetch(endpoint, { method: 'HEAD' })
              if (res.ok) {
                validItems.push(item)
              } else {
                // Item doesn't exist anymore, remove from localStorage
                removeItem(item.id, item.type)
              }
            }
          } catch {
            // Keep item if validation fails (network error)
            validItems.push(item)
          }
        }
        
        setValidatedItems(validItems)
      } catch (error) {
        console.error('Error validating recently viewed items:', error)
        setValidatedItems(items) // Fallback to all items on error
      } finally {
        setIsValidating(false)
      }
    }

    validateItems()
  }, [isLoaded, items, removeItem])

  // Don't render if no items or not loaded
  if (!isLoaded || isValidating || validatedItems.length === 0) {
    return null
  }

  const displayItems = validatedItems.slice(0, maxItems)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-8 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8DCC8]/20 dark:bg-[#E8DCC8]/10 rounded-lg">
              <Clock className="h-5 w-5 text-[#1A1A1A] dark:text-[#E8DCC8]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'تمت مشاهدتها مؤخراً' : 'Recently Viewed'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'ar' 
                  ? `${validatedItems.length} عناصر في السجل` 
                  : `${validatedItems.length} items in history`}
              </p>
            </div>
          </div>
          
          {showClearButton && validatedItems.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'ar' ? 'مسح الكل' : 'Clear all'}
              </span>
            </button>
          )}
        </div>

        {/* Items */}
        {variant === 'horizontal' ? (
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence>
              {displayItems.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0 w-64 snap-start"
                >
                  <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        removeItem(item.id, item.type)
                      }}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3.5 w-3.5 text-white" />
                    </button>

                    <Link href={getHref(item)}>
                      {/* Image */}
                      <div className="relative h-36 overflow-hidden">
                        <SafeImage
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Type badge */}
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 dark:text-gray-300">
                          {typeIcons[item.type]} {typeLabels[item.type][language === 'ar' ? 'ar' : 'en']}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1 group-hover:text-[#C9A962] transition-colors">
                          {item.title}
                        </h3>
                        {item.category && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {item.category}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {getTimeAgo(item.timestamp, language)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#C9A962] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {displayItems.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        removeItem(item.id, item.type)
                      }}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3.5 w-3.5 text-white" />
                    </button>

                    <Link href={getHref(item)}>
                      {/* Image */}
                      <div className="relative h-28 md:h-32 overflow-hidden">
                        <SafeImage
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-xs">{typeIcons[item.type]}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {typeLabels[item.type][language === 'ar' ? 'ar' : 'en']}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-[#C9A962] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View all link if there are more items */}
        {validatedItems.length > maxItems && (
          <div className="mt-4 text-center">
            <button className="text-sm text-[#C9A962] hover:text-[#1A1A1A] dark:hover:text-white font-medium transition-colors">
              {language === 'ar' 
                ? `عرض الكل (${items.length})` 
                : `View all (${items.length})`}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  )
}
