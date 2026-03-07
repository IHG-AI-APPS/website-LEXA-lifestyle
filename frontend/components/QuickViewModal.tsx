'use client'

import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { X, MapPin, Calendar, ArrowRight, Layers, Link2, Check } from 'lucide-react'

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
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  const getFullUrl = () => {
    if (typeof window === 'undefined' || !item) return ''
    return `${window.location.origin}${item.href}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback for older browsers */ }
  }

  const handleWhatsAppShare = () => {
    if (!item) return
    const text = `${item.title} — ${getFullUrl()}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

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

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-end sm:items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            data-testid="quickview-backdrop"
          />

          {/* Modal - slides up on mobile, centers on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:w-[90vw] sm:max-w-lg max-h-[85vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-2xl sm:m-4"
            data-testid="quickview-modal"
            onClick={(e) => e.stopPropagation()}
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
              <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-[#171717]">
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
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-500 mb-3">
                  <MapPin size={14} className="text-[#C9A962]" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-zinc-500 leading-relaxed mb-4 line-clamp-3">
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
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-500 rounded-full border border-gray-200 dark:border-white/10">
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
                      <span key={f} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-500 rounded-full border border-gray-200 dark:border-white/10">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-medium rounded-full border border-[#25D366]/20 transition-colors"
                  data-testid="quickview-share-whatsapp"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-full border transition-all ${
                    copied
                      ? 'bg-[#C9A962]/10 text-[#C9A962] border-[#C9A962]/30'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-500 border-gray-200 dark:border-white/10 hover:border-[#C9A962]/50 hover:text-[#C9A962]'
                  }`}
                  data-testid="quickview-copy-link"
                >
                  {copied ? <Check size={14} /> : <Link2 size={14} />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

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
        </div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
