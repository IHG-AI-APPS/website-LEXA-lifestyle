'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  solutionTitle?: string
  solutionSlug?: string
}

export default function QuoteModal({ isOpen, onClose, solutionTitle, solutionSlug }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '' // Honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.website) return
    
    if (!formData.name || !formData.email || !formData.phone) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Quote Request: ${solutionTitle || 'General Inquiry'}`,
          source: 'quote_modal',
          solution: solutionSlug || '',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '', website: '' })
        // Auto close after 3 seconds on success
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Don't render anything on server side
  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            data-testid="quote-modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[101]"
            data-testid="quote-modal"
            onClick={onClose}
          >
            <div 
              className="w-full max-w-md bg-white dark:bg-[#111] rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#0A0A0A] dark:bg-[#0A0A0A] px-6 py-5 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                  data-testid="quote-modal-close"
                >
                  <X size={20} />
                </button>
                <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">
                  Free Consultation
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {solutionTitle ? `Get a Quote for ${solutionTitle}` : 'Get a Free Quote'}
                </h2>
              </div>

              {/* Form */}
              <div className="p-6">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                      Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot - hidden from users */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-zinc-800"
                        data-testid="quote-name-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-zinc-800"
                        data-testid="quote-email-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 000 0000"
                        required
                        className="bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-zinc-800"
                        data-testid="quote-phone-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5">
                        Message (Optional)
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirements..."
                        rows={3}
                        className="bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-zinc-800 resize-none"
                        data-testid="quote-message-input"
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold h-11"
                      data-testid="quote-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-zinc-500">
                      We&apos;ll respond within 24 hours. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body)
}
