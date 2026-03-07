'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X, Clock, User, Mail, Phone, MessageSquare, Download, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Available time slots
const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

// Get next 14 days (excluding Fridays and Saturdays for UAE)
const getAvailableDates = (): Date[] => {
  const dates: Date[] = []
  const today = new Date()
  let count = 0
  
  while (dates.length < 14) {
    const date = new Date(today)
    date.setDate(today.getDate() + count)
    const day = date.getDay()
    
    // Exclude Friday (5) and Saturday (6) - UAE weekend
    if (day !== 5 && day !== 6) {
      dates.push(date)
    }
    count++
  }
  
  return dates
}

interface FormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

export default function ScheduleVisitModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const { language } = useLanguage()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [icsUrl, setIcsUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  })

  const availableDates = getAvailableDates()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/schedule-visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setIsSuccess(true)
        if (data.ics_url) {
          setIcsUrl(data.ics_url)
        }
      } else {
        alert(data.detail || 'Failed to schedule visit. Please try again.')
      }
    } catch (error) {
      console.error('Error scheduling visit:', error)
      alert('Failed to schedule visit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setIsSuccess(false)
    setIcsUrl(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    })
    onClose()
  }

  const downloadIcs = () => {
    if (icsUrl) {
      window.open(icsUrl, '_blank')
    }
  }

  // Mount check for portal
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - fixed to viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={handleClose}
          />
          
          {/* Modal - fixed to viewport center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm sm:max-w-md bg-white dark:bg-[#0A0A0A] rounded-xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
            style={{ zIndex: 9999 }}
          >
            {/* Header - Compact */}
            <div className="relative bg-gradient-to-r from-[#1A1A1A] to-[#2a2a2a] dark:from-[#E8DCC8] dark:to-[#d4c4a8] p-4 text-white dark:text-[#1A1A1A]">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/10 dark:bg-black/10 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold">
                    {language === 'ar' ? 'حجز زيارة' : 'Schedule a Visit'}
                  </h2>
                  <p className="text-xs opacity-80">
                    {language === 'ar' ? 'مركز تجربة LEXA' : 'LEXA Experience Centre'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {isSuccess ? (
                /* Success State - Compact */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {language === 'ar' ? 'تم الحجز بنجاح!' : 'Visit Scheduled!'}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-500 mb-4 text-sm">
                    {language === 'ar' 
                      ? 'تم إرسال تأكيد إلى بريدك الإلكتروني'
                      : 'Confirmation sent to your email'}
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-[#171717]/50 rounded-lg p-3 mb-4 text-left">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-zinc-500 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formData.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-zinc-500">
                      <Clock className="h-3 w-3" />
                      <span>{formData.time}</span>
                    </div>
                  </div>

                  {icsUrl && (
                    <Button
                      onClick={downloadIcs}
                      variant="outline"
                      size="sm"
                      className="w-full mb-2 text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'إضافة إلى التقويم' : 'Add to Calendar'}
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleClose}
                    size="sm"
                    className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] dark:text-white text-xs"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </Button>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Select Date & Time - Compact */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-400 mb-2">
                      {language === 'ar' ? 'اختر التاريخ' : 'Select Date'}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {availableDates.slice(0, 8).map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setFormData({ ...formData, date: formatDate(date) })}
                          className={`p-2 rounded-lg text-center transition-all ${
                            formData.date === formatDate(date)
                              ? 'bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A]'
                              : 'bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-zinc-400 hover:bg-gray-200'
                          }`}
                        >
                          <div className="text-[10px] opacity-70">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div className="font-bold text-sm">{date.getDate()}</div>
                          <div className="text-[10px] opacity-70">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.date && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-xs font-medium text-gray-700 dark:text-zinc-400 mb-2">
                        {language === 'ar' ? 'اختر الوقت' : 'Select Time'}
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, time })}
                            className={`p-1.5 rounded-lg text-xs transition-all ${
                              formData.time === time
                                ? 'bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A]'
                                : 'bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-zinc-400 hover:bg-gray-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.date || !formData.time}
                    size="sm"
                    className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] dark:text-white disabled:opacity-50 text-xs"
                  >
                    {language === 'ar' ? 'التالي' : 'Continue'}
                  </Button>
                </div>
              ) : (
                /* Step 2: Contact Details - Compact */
                <div className="space-y-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-zinc-400 flex items-center gap-1"
                  >
                    ← {language === 'ar' ? 'تغيير' : 'Change'}
                  </button>
                  
                  <div className="bg-[#E8DCC8]/20 rounded-lg p-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#1A1A1A] dark:text-white dark:text-[#E8DCC8]" />
                    <span className="text-xs font-medium text-gray-700 dark:text-zinc-400">
                      {formData.date} at {formData.time}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-400 mb-1">
                      {language === 'ar' ? 'الاسم' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#171717] text-sm focus:ring-2 focus:ring-[#E8DCC8]"
                      placeholder={language === 'ar' ? 'أدخل اسمك' : 'Your name'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-400 mb-1">
                      {language === 'ar' ? 'البريد' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#171717] text-sm focus:ring-2 focus:ring-[#E8DCC8]"
                      placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-zinc-400 mb-1">
                      {language === 'ar' ? 'الهاتف' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#171717] text-sm focus:ring-2 focus:ring-[#E8DCC8]"
                      placeholder="+971 50 123 4567"
                      required
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                    size="sm"
                    className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] dark:text-white disabled:opacity-50 text-xs"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'ar' ? 'جاري...' : 'Scheduling...'}
                      </span>
                    ) : (
                      language === 'ar' ? 'تأكيد' : 'Confirm Booking'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Use portal to render at document body
  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
