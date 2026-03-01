'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, CalendarDays, X, Sparkles } from 'lucide-react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'

const ACTIONS = [
  {
    id: 'consultation',
    label: 'Book Consultation',
    icon: CalendarDays,
    color: '#C9A962',
    bg: 'bg-[#C9A962]/15',
    ring: 'ring-[#C9A962]/30',
  },
  {
    id: 'call',
    label: 'Call Us',
    icon: Phone,
    color: '#60A5FA',
    bg: 'bg-blue-500/15',
    ring: 'ring-blue-400/30',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
    bg: 'bg-green-500/15',
    ring: 'ring-green-400/30',
  },
]

interface MobileQuickActionsProps {
  onBookConsultation?: () => void
}

export default function MobileQuickActions({ onBookConsultation }: MobileQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: TouchEvent | MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('touchstart', handler, { passive: true })
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('touchstart', handler)
      document.removeEventListener('mousedown', handler)
    }
  }, [isOpen])

  const handleAction = (id: string) => {
    setIsOpen(false)
    switch (id) {
      case 'whatsapp':
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi LEXA, I'm interested in your smart home solutions.")}`, '_blank')
        break
      case 'call':
        window.location.href = `tel:+${WHATSAPP_NUMBER}`
        break
      case 'consultation':
        onBookConsultation?.()
        break
    }
  }

  return (
    <div ref={containerRef} className="fixed bottom-[84px] right-4 z-40 lg:hidden" data-testid="mobile-quick-actions">
      {/* Expanded Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 flex flex-col gap-2 items-end mb-2"
          >
            {ACTIONS.map((action, i) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.id}
                  data-testid={`quick-action-${action.id}`}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => handleAction(action.id)}
                  className="flex items-center gap-3 pl-4 pr-3 py-2.5 bg-[#0A0A0A]/95 backdrop-blur-xl rounded-full border border-white/[0.08] shadow-lg active:scale-95 transition-transform"
                >
                  <span className="text-xs font-semibold text-white/90 tracking-wide whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className={`w-9 h-9 rounded-full ${action.bg} ring-1 ${action.ring} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger */}
      <motion.button
        data-testid="quick-actions-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-white/10 backdrop-blur-xl border border-white/20'
            : 'bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white/80" />
          ) : (
            <Sparkles className="w-5 h-5 text-[#C9A962]" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
