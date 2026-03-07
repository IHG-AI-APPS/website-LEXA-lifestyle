'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ConsultationFormProps {
  isOpen: boolean
  onClose: () => void
  defaultPersona?: string
}

export default function ConsultationForm({ isOpen, onClose, defaultPersona }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    persona: defaultPersona || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="BOOK A CONSULTATION"
      size="md"
    >
      <p className="text-gray-600 dark:text-zinc-400 mb-6">
        Share your vision, and we&apos;ll create a tailored smart living solution for you.
      </p>

      {submitStatus === 'success' ? (
        <div className="py-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Thank You!</h3>
          <p className="text-gray-600 dark:text-zinc-400">
            We&apos;ve received your consultation request. Our team will contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
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
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-sm">
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

          <p className="text-xs text-gray-500 dark:text-zinc-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      )}
    </Modal>
  )
}
