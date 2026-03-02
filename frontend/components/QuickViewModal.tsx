'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { X, MapPin, Calendar, ArrowRight, Layers } from 'lucide-react'

interface QuickViewProps {
  isOpen: boolean
  onClose: () => void
  item: {
    title: string
    slug?: string
    image?: string
    description?: string
    category?: string
    type?: string
    location?: string
    year?: string
    systems?: string[]
    features?: string[]
    href: string
  } | null
}

export default function QuickViewModal({ isOpen, onClose, item }: QuickViewProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            data-testid="quickview-backdrop"
          />

          {/* Modal - slides up on mobile, centers on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-full sm:w-[90vw] sm:max-w-lg max-h-[85vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-2xl"
            data-testid="quickview-modal"
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              data-testid="quickview-close"
            >
              <X size={16} />
            </button>

            {/* Image */}
            {item.image && (
              <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Badges on image */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {(item.type || item.category) && (
                    <span className="px-2.5 py-1 bg-[#C9A962]/90 text-white text-[11px] tracking-wider uppercase rounded-full font-medium">
                      {item.type || item.category}
                    </span>
                  )}
                  {item.year && (
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[11px] tracking-wider rounded-full">
                      {item.year}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[50vh] sm:max-h-[40vh]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" data-testid="quickview-title">
                {item.title}
              </h3>

              {/* Location */}
              {item.location && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin size={14} className="text-[#C9A962]" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              )}

              {/* Systems / Features tags */}
              {(item.systems && item.systems.length > 0) && (
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-2">
                    <Layers size={12} />
                    <span>Systems</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.systems.slice(0, 6).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-white/10">
                        {tag}
                      </span>
                    ))}
                    {item.systems.length > 6 && (
                      <span className="text-xs px-2 py-1 text-[#C9A962]">+{item.systems.length - 6}</span>
                    )}
                  </div>
                </div>
              )}

              {(item.features && item.features.length > 0 && (!item.systems || item.systems.length === 0)) && (
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-2">
                    <Layers size={12} />
                    <span>Features</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.features.slice(0, 5).map((f) => (
                      <span key={f} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-white/10">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href={item.href}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#C9A962] hover:bg-[#B8983F] text-white text-sm font-medium rounded-full transition-colors"
                data-testid="quickview-cta"
              >
                View Full Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
