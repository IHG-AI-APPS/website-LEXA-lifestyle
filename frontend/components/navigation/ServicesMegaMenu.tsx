'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings,
  Lightbulb,
  Speaker,
  Thermometer,
  Shield,
  Wifi,
  Wrench,
  HeadphonesIcon,
  ChevronRight,
  ChevronDown,
  Cog
} from 'lucide-react'

interface ServicesMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

// Hardcoded services menu structure with 3 columns
const SERVICES_STRUCTURE = {
  column1: {
    title: 'DESIGN & PLANNING',
    subtitle: 'Consultation',
    items: [
      { label: 'Consultation & Design', path: '/services/consultation-design', icon: Settings },
      { label: 'Engineering & Integration', path: '/services/system-engineering-integration', icon: Wrench }
    ]
  },
  column2: {
    title: 'CORE SYSTEMS',
    subtitle: 'Installation',
    items: [
      { label: 'Wiring & Infrastructure', path: '/services/wiring', icon: Lightbulb },
      { label: 'Home Cinema & AV', path: '/services/home-cinema-multi-room-av', icon: Speaker },
      { label: 'Security Systems', path: '/services/security-surveillance-systems', icon: Shield },
      { label: 'Network Infrastructure', path: '/services/network-infrastructure-it', icon: Wifi },
      { label: 'Voice & App Control', path: '/services/voice-app-control-integration', icon: HeadphonesIcon }
    ]
  },
  column3: {
    title: 'SUPPORT',
    subtitle: 'Ongoing Care',
    items: [
      { label: 'Project Management', path: '/services/project-management', icon: Cog },
      { label: 'Commissioning & Support', path: '/services/commissioning-support', icon: Wrench }
    ]
  }
}

export default function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) {
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
                
                {/* Column 1: Design & Planning */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      {SERVICES_STRUCTURE.column1.title}
                    </h3>
                    <p className="text-xs text-gray-500">{SERVICES_STRUCTURE.column1.subtitle}</p>
                  </div>
                  
                  <div className="space-y-1">
                    {SERVICES_STRUCTURE.column1.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={onClose}
                          className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Column 2: Core Systems */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      {SERVICES_STRUCTURE.column2.title}
                    </h3>
                    <p className="text-xs text-gray-500">{SERVICES_STRUCTURE.column2.subtitle}</p>
                  </div>
                  
                  <div className="space-y-1">
                    {SERVICES_STRUCTURE.column2.items.slice(0, expandedCol2 ? SERVICES_STRUCTURE.column2.items.length : 3).map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={onClose}
                          className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {SERVICES_STRUCTURE.column2.items.length > 3 && (
                      <button
                        onClick={() => setExpandedCol2(!expandedCol2)}
                        className="w-full group flex items-center justify-center gap-2 rounded-lg p-3 transition-all hover:bg-white/5 border border-white/5 hover:border-white/10 mt-2"
                      >
                        <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E8DCC8]">
                          {expandedCol2 ? 'Show Less' : `Show ${SERVICES_STRUCTURE.column2.items.length - 3} More`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-[#E8DCC8] transition-transform ${expandedCol2 ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Column 3: Support */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8DCC8] mb-1">
                      {SERVICES_STRUCTURE.column3.title}
                    </h3>
                    <p className="text-xs text-gray-500">{SERVICES_STRUCTURE.column3.subtitle}</p>
                  </div>
                  
                  <div className="space-y-1">
                    {SERVICES_STRUCTURE.column3.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={onClose}
                          className="group block rounded-lg p-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#E8DCC8] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors truncate block">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                    
                    {/* View All Link */}
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="group block rounded-lg p-3 mt-2 transition-all bg-gradient-to-r from-[#E8DCC8]/10 to-transparent border border-[#E8DCC8]/30 hover:border-[#E8DCC8]/50"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-[#E8DCC8]" />
                        <span className="text-sm font-semibold text-[#E8DCC8]">
                          View All Services
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 4: Featured Service Visual */}
                <div className="relative lg:col-span-1">
                  <Link 
                    href="/services"
                    onClick={onClose}
                    className="group block h-full"
                  >
                    <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10">
                      <SafeImage
                        src="https://static.prod-images.emergentagent.com/jobs/41733178-a8fe-49c4-9ba7-b7e286387ff3/images/2ae21f07105d45e9d12dce5f8ccec66a2fa34244232263f2cf1d0ed508aeebb5.png"
                        alt="Full-Service Smart Home Integration"
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="mb-2 inline-block rounded-full bg-[#E8DCC8]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E8DCC8]">
                          Featured
                        </span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#E8DCC8] transition-colors">
                          Full-Service Integration
                        </h4>
                        <p className="text-xs text-gray-400 mb-4">
                          Design • Install • Maintain • Support
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#E8DCC8] transition-colors">
                          <span>Explore Services</span>
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
