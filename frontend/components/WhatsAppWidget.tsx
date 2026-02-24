'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackWhatsAppClick } from '@/components/tracking/TrackingPixels'
import { usePathname } from 'next/navigation'

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const pathname = usePathname()
  
  // Centralized WhatsApp number
  const whatsappNumber = '971521782109'
  
  // Get page context for smarter messaging
  const getPageContext = () => {
    if (pathname?.includes('/services/high-end-audio')) return 'high_end_audio'
    if (pathname?.includes('/services/home-theater')) return 'home_theater'
    if (pathname?.includes('/services/luxury-villa')) return 'luxury_villa'
    if (pathname?.includes('/dubai')) return 'dubai_geo'
    if (pathname?.includes('/abu-dhabi')) return 'abu_dhabi_geo'
    if (pathname?.includes('/saudi-arabia')) return 'saudi_arabia_geo'
    if (pathname?.includes('/partners/architects')) return 'architect_partner'
    if (pathname?.includes('/partners/developers')) return 'developer_partner'
    return 'general'
  }
  
  const quickMessages = {
    en: [
      {
        title: 'Villa Automation Concept',
        message: 'Hi LEXA, I\'m planning a villa project in Dubai.\nType: Villa\nStage: Design\nInterested in: Smart Lighting + Home Cinema',
        intent: 'villa_concept'
      },
      {
        title: 'Experience Centre Visit',
        message: 'Hi LEXA, I would like to schedule a private visit to your Experience Centre.\nPreferred Date: ___\nProject Type: ___',
        intent: 'showroom_visit'
      },
      {
        title: 'Technical Consultation',
        message: 'Hi LEXA, I need technical consultation for my project.\nProperty Size: ___ sqm\nCurrent Stage: ___',
        intent: 'technical_consultation'
      },
      {
        title: 'Project Quote',
        message: 'Hi LEXA, I need a detailed quote for home automation.\nLocation: ___\nProperty Type: Villa/Apartment\nBudget Range: ___',
        intent: 'quote_request'
      },
      {
        title: 'Emergency Support',
        message: 'Hi LEXA, I need emergency support for my smart home system.\nIssue: ___\nSystem Type: ___',
        intent: 'emergency_support'
      }
    ],
    ar: [
      {
        title: 'مفهوم أتمتة الفيلا',
        message: 'مرحباً LEXA، أخطط لمشروع فيلا في دبي.\nالنوع: فيلا\nالمرحلة: تصميم\nمهتم بـ: إضاءة ذكية + سينما منزلية',
        intent: 'villa_concept'
      },
      {
        title: 'زيارة مركز التجربة',
        message: 'مرحباً LEXA، أود تحديد موعد لزيارة خاصة إلى مركز التجربة.\nالتاريخ المفضل: ___\nنوع المشروع: ___',
        intent: 'showroom_visit'
      },
      {
        title: 'استشارة فنية',
        message: 'مرحباً LEXA، أحتاج إلى استشارة فنية لمشروعي.\nحجم العقار: ___ متر مربع\nالمرحلة الحالية: ___',
        intent: 'technical_consultation'
      },
      {
        title: 'عرض سعر للمشروع',
        message: 'مرحباً LEXA، أحتاج إلى عرض سعر تفصيلي لأتمتة المنزل.\nالموقع: ___\nنوع العقار: فيلا/شقة\nنطاق الميزانية: ___',
        intent: 'quote_request'
      },
      {
        title: 'دعم طوارئ',
        message: 'مرحباً LEXA، أحتاج إلى دعم طوارئ لنظام منزلي الذكي.\nالمشكلة: ___\nنوع النظام: ___',
        intent: 'emergency_support'
      }
    ]
  }
  
  const messages = isArabic ? quickMessages.ar : quickMessages.en

  const handleQuickMessage = (message: string, intent: string) => {
    // Track WhatsApp click with intent
    trackWhatsAppClick(intent, 'widget')
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Main WhatsApp Button - Visible on all devices */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-[60] w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="WhatsApp"
      >
        {isOpen ? (
          <X className="text-white w-6 h-6 sm:w-7 sm:h-7" />
        ) : (
          <MessageCircle className="text-white w-6 h-6 sm:w-7 sm:h-7" />
        )}
      </motion.button>

      {/* Quick Message Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-[55] w-[calc(100vw-32px)] sm:w-80 max-w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-green-500 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isArabic ? 'اتصال سريع' : 'Quick Connect'}
                  </h3>
                  <p className="text-sm text-green-100">
                    {isArabic ? 'اختر بداية المحادثة' : 'Choose a conversation starter'}
                  </p>
                </div>
                <button
                  onClick={() => setIsArabic(!isArabic)}
                  className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-xs"
                >
                  <Globe size={14} />
                  {isArabic ? 'EN' : 'عربي'}
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {messages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(msg.message, msg.intent)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 transition-all group"
                >
                  <div className="font-semibold text-sm mb-1 group-hover:text-green-600">
                    {msg.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    {msg.message.substring(0, 50)}...
                  </div>
                </button>
              ))}
              
              <button
                onClick={() => {
                  trackWhatsAppClick('general', 'widget')
                  window.open(`https://wa.me/${whatsappNumber}`, '_blank')
                  setIsOpen(false)
                }}
                className="w-full p-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
              >
                {isArabic ? 'فتح محادثة واتساب' : 'Open WhatsApp Chat'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
