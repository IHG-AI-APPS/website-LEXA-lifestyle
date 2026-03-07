'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ConsultationFormProps {
  isOpen: boolean
  onClose: () => void
  defaultPersona?: string
}

export default function ConsultationForm({ isOpen, onClose, defaultPersona }: ConsultationFormProps) {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    persona: defaultPersona || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const contextData = {
        ...formData,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        pageTitle: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      }

      const { submitConsultation } = await import('@/lib/api')
      const { trackFormSubmission } = await import('@/hooks/useAnalytics')
      
      await submitConsultation(contextData)
      await trackFormSubmission('consultation', 'Consultation Booking', true, { persona: formData.persona })

      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
        setFormData({ name: '', email: '', phone: '', message: '', persona: '' })
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      const { trackFormSubmission } = await import('@/hooks/useAnalytics')
      await trackFormSubmission('consultation', 'Consultation Booking', false)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                BOOK A CONSULTATION
              </h2>
              <p className="text-gray-600 mb-6">
                Share your vision, and we&apos;ll create a tailored smart living solution for you.
              </p>

              {submitStatus === 'success' ? (
                <div className="py-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    We&apos;ve received your consultation request. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      data-testid="consultation-name-input"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      data-testid="consultation-email-input"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                      data-testid="consultation-phone-input"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Tell us about your project (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your vision, project type, timeline, or any specific requirements..."
                      data-testid="consultation-message-input"
                      className="w-full min-h-[80px]"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      Failed to submit. Please try again or contact us directly at sales@lexalifestyle.com
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    data-testid="consultation-submit-btn"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
