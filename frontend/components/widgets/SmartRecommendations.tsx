'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useLanguage } from '@/contexts/LanguageContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Recommendation {
  id: string
  slug: string
  title: string
  description: string
  image: string
  category: string
  reason: string
  confidence: number
}

interface SmartRecommendationsProps {
  className?: string
  maxItems?: number
  variant?: 'horizontal' | 'grid' | 'compact'
}

export default function SmartRecommendations({
  className = '',
  maxItems = 4,
  variant = 'horizontal'
}: SmartRecommendationsProps) {
  const { language } = useLanguage()
  const { items: viewedItems, isLoaded } = useRecentlyViewed()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [interestCluster, setInterestCluster] = useState('')

  useEffect(() => {
    if (!isLoaded || viewedItems.length === 0) return

    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${BACKEND_URL}/api/smart-recommendations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            viewed_items: viewedItems.map(item => ({
              id: item.id,
              type: item.type,
              slug: item.slug,
              title: item.title,
              category: item.category
            })),
            limit: maxItems,
            language
          })
        })

        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.recommendations || [])
          setMessage(data.message || '')
          setInterestCluster(data.interest_cluster || '')
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [isLoaded, viewedItems, maxItems, language])

  // Don't render if no viewed items or no recommendations
  if (!isLoaded || viewedItems.length === 0 || recommendations.length === 0) {
    return null
  }

  // Get image URL
  const getImageUrl = (image?: string): string => {
    if (!image) return '/placeholder-project.jpg'
    if (image.startsWith('http')) return image
    if (image.startsWith('/')) return image
    return `${BACKEND_URL}${image}`
  }

  // Interest cluster icons
  const clusterIcons: Record<string, string> = {
    entertainment: '🎬',
    security: '🛡️',
    comfort: '✨',
    marine: '⛵',
    commercial: '🏢'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-10 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-[#E8DCC8] to-[#C9A962] rounded-xl">
                <Sparkles className="h-5 w-5 text-[#1A1A1A]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A962] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A962]"></span>
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white flex items-center gap-2">
                {language === 'ar' ? 'مُقترح لك' : 'Recommended for You'}
                <span className="text-lg">{clusterIcons[interestCluster] || '💡'}</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {message || (language === 'ar' ? 'بناءً على اهتماماتك' : 'Based on your interests')}
              </p>
            </div>
          </div>
          
          <Link 
            href="/solutions"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#C9A962] hover:text-[#1A1A1A] dark:text-white dark:hover:text-white font-medium transition-colors group"
          >
            {language === 'ar' ? 'عرض الكل' : 'View all'}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recommendations Grid/Carousel */}
        {variant === 'compact' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/solutions/${rec.slug}`}>
                    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:border-gray-700">
                      <div className="relative h-24 overflow-hidden">
                        <SafeImage
                          src={getImageUrl(rec.image)}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-white text-xs font-semibold line-clamp-1">
                            {rec.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : variant === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/solutions/${rec.slug}`}>
                    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:border-gray-700 h-full">
                      {/* Confidence Badge */}
                      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-[#C9A962]/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1A1A1A]">
                        {Math.round(rec.confidence * 100)}% match
                      </div>
                      
                      <div className="relative h-40 overflow-hidden">
                        <SafeImage
                          src={getImageUrl(rec.image)}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="p-4">
                        <span className="text-[10px] uppercase tracking-wider text-[#C9A962] font-semibold">
                          {rec.category}
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white dark:text-white text-sm mt-1 mb-2 group-hover:text-[#C9A962] transition-colors line-clamp-1">
                          {rec.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                          {rec.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <Lightbulb className="h-3.5 w-3.5 text-[#C9A962]" />
                          <span className="line-clamp-1">{rec.reason}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // Horizontal scrollable carousel (default)
          <div 
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 snap-start"
                >
                  <Link href={`/solutions/${rec.slug}`}>
                    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:border-gray-700">
                      {/* AI Badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                        <Sparkles className="h-3 w-3 text-[#C9A962]" />
                        <span className="text-[10px] font-semibold text-white">
                          {Math.round(rec.confidence * 100)}% match
                        </span>
                      </div>
                      
                      <div className="relative h-44 overflow-hidden">
                        <SafeImage
                          src={getImageUrl(rec.image)}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category chip on image */}
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-md text-[10px] font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-300 uppercase tracking-wider">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white dark:text-white text-base mb-2 group-hover:text-[#C9A962] transition-colors line-clamp-1">
                          {rec.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                          {rec.description}
                        </p>
                        
                        {/* Recommendation reason */}
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 dark:border-gray-700">
                          <div className="p-1.5 bg-[#E8DCC8]/20 dark:bg-[#E8DCC8]/10 rounded-md">
                            <Lightbulb className="h-3.5 w-3.5 text-[#C9A962]" />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {rec.reason}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Mobile view all link */}
        <div className="mt-4 text-center sm:hidden">
          <Link 
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-[#C9A962] font-medium"
          >
            {language === 'ar' ? 'استكشف المزيد من الحلول' : 'Explore more solutions'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
