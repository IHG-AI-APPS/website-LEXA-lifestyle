'use client'

import { Zap, MapPin, HardHat } from 'lucide-react'
import { motion } from 'framer-motion'

interface TrustBarProps {
  variant?: 'sticky' | 'inline'
  onWhatsAppClick?: () => void
  onExperienceCentreClick?: () => void
  onSiteVisitClick?: () => void
}

export default function TrustBar({ 
  variant = 'inline',
  onWhatsAppClick,
  onExperienceCentreClick,
  onSiteVisitClick 
}: TrustBarProps) {
  const items = [
    {
      icon: Zap,
      text: 'Concept in 24 Hours',
      action: onWhatsAppClick || (() => window.open(`https://wa.me/971501234567?text=${encodeURIComponent('Hi LEXA, I need a concept within 24 hours for my project.')}`, '_blank'))
    },
    {
      icon: MapPin,
      text: 'Visit Experience Centre',
      action: onExperienceCentreClick || (() => window.location.href = '/experience-centre')
    },
    {
      icon: HardHat,
      text: 'Site Visit Available',
      action: onSiteVisitClick || (() => window.open(`https://wa.me/971501234567?text=${encodeURIComponent('Hi LEXA, I would like to schedule a site visit for my property.')}`, '_blank'))
    }
  ]

  const containerClass = variant === 'sticky'
    ? 'fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-lg border-t-2 border-[#E8DCC8]'
    : 'bg-gradient-to-r from-black via-gray-900 to-black border-y-2 border-[#E8DCC8]/30'

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === 'sticky' ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClass}
    >
      <div className="container mx-auto px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                onClick={item.action}
                className="group flex items-center gap-3 text-left transition-all hover:text-[#E8DCC8]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DCC8]/20 transition-all group-hover:bg-[#E8DCC8]/30">
                  <Icon className="h-5 w-5 text-[#E8DCC8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-[#E8DCC8] transition-colors">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500">Click to proceed</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
