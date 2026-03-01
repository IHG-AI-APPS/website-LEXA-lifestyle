'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScheduleVisitModal from './ScheduleVisitModal'

export default function ScheduleVisitButton() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed right-4 bottom-24 lg:bottom-8 z-40 group hidden lg:block"
            data-testid="schedule-visit-btn"
          >
            {/* Pulse animation ring */}
            <span className="absolute inset-0 rounded-full bg-[#E8DCC8] animate-ping opacity-25" />
            
            {/* Button */}
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-[#1A1A1A] to-[#2a2a2a] dark:from-[#E8DCC8] dark:to-[#d4c4a8] text-white dark:text-[#1A1A1A] dark:text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CalendarDays className="h-5 w-5" />
              <span className="font-medium text-sm whitespace-nowrap hidden sm:inline">
                {language === 'ar' ? 'حجز زيارة' : 'Schedule Visit'}
              </span>
            </div>
            
            {/* Tooltip for mobile */}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 dark:text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none sm:hidden">
              {language === 'ar' ? 'حجز زيارة' : 'Schedule Visit'}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <ScheduleVisitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
