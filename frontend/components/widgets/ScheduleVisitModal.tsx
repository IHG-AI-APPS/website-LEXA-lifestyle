'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import Modal from '@/components/ui/Modal'

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

  const getTitle = () => {
    if (isSuccess) return language === 'ar' ? 'تم الحجز بنجاح!' : 'Visit Scheduled!'
    return language === 'ar' ? 'حجز زيارة' : 'Schedule a Visit'
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={getTitle()}
      size="sm"
    >
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
          <Calendar className="h-4 w-4" />
          <span>{language === 'ar' ? 'مركز تجربة LEXA' : 'LEXA Experience Centre'}</span>
        </div>
      </div>

      {isSuccess ? (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-gray-600 dark:text-zinc-400 mb-4 text-sm">
            {language === 'ar' 
              ? 'تم إرسال تأكيد إلى بريدك الإلكتروني'
              : 'Confirmation sent to your email'}
          </p>
          
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 mb-4 text-left">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-zinc-400 mb-1">
              <Calendar className="h-3 w-3" />
              <span>{formData.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-zinc-400">
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
            className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] text-xs"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </Button>
        </motion.div>
      ) : step === 1 ? (
        /* Step 1: Select Date & Time */
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-2">
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
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
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
              <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-2">
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
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
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
            className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] disabled:opacity-50 text-xs"
          >
            {language === 'ar' ? 'التالي' : 'Continue'}
          </Button>
        </div>
      ) : (
        /* Step 2: Contact Details */
        <div className="space-y-3">
          <button 
            onClick={() => setStep(1)}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-1"
          >
            ← {language === 'ar' ? 'تغيير' : 'Change'}
          </button>
          
          <div className="bg-[#E8DCC8]/20 dark:bg-zinc-800 rounded-lg p-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#1A1A1A] dark:text-[#E8DCC8]" />
            <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">
              {formData.date} at {formData.time}
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">
              {language === 'ar' ? 'الاسم' : 'Name'} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#E8DCC8]"
              placeholder={language === 'ar' ? 'أدخل اسمك' : 'Your name'}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">
              {language === 'ar' ? 'البريد' : 'Email'} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#E8DCC8]"
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1">
              {language === 'ar' ? 'الهاتف' : 'Phone'} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#E8DCC8]"
              placeholder="+971 50 123 4567"
              required
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
            size="sm"
            className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] text-white dark:text-[#1A1A1A] disabled:opacity-50 text-xs"
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
    </Modal>
  )
}
