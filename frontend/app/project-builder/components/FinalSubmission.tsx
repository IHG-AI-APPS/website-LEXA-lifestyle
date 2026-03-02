'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

interface FinalSubmissionProps {
  sessionId: string
  projectData: any
  onComplete: () => void
}

export default function FinalSubmission({ sessionId, projectData, onComplete }: FinalSubmissionProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    timeline: '',
    budget_band: '',
    notes: ''
  })

  const handleSubmit = async () => {
    if (!formData.contact_name || !formData.contact_email || !formData.contact_phone) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/project-builder/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          ...formData
        })
      })

      const data = await response.json()
      setSubmitted(true)
      setTimeout(() => onComplete(), 2000)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">Submitted</span>
        </h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Intelligence Analysis Complete</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Our team will contact you within 24 hours</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#C9A962]/5 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#C9A962]" />
            <span className="text-xs uppercase tracking-widest text-[#8B7340] font-medium">
              Final Step
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">Connect</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            Expert Consultation
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Our specialists will review your project and create a detailed proposal
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-12">
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Full Name *</label>
              <Input
                type="text"
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                placeholder="John Smith"
                className="border-gray-200 dark:border-gray-700 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Email Address *</label>
              <Input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                placeholder="john@example.com"
                className="border-gray-200 dark:border-gray-700 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Phone Number *</label>
              <Input
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                placeholder="+971 50 123 4567"
                className="border-gray-200 dark:border-gray-700 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Preferred Timeline</label>
              <Input
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                placeholder="e.g., 3-6 months"
                className="border-gray-200 dark:border-gray-700 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Budget Range (Optional)</label>
              <Input
                type="text"
                value={formData.budget_band}
                onChange={(e) => setFormData({ ...formData, budget_band: e.target.value })}
                placeholder="e.g., AED 200,000 - 500,000"
                className="border-gray-200 dark:border-gray-700 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any specific requirements or questions..."
                rows={4}
                className="w-full border border-gray-200 dark:border-gray-700 focus:border-[#C9A962] outline-none text-gray-900 dark:text-white placeholder-gray-400 py-3 px-4 text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto"
          >
            {loading ? 'Submitting...' : 'Submit Project for Review'}
          </Button>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
            Your project information is secure and will only be used for consultation purposes
          </p>
        </div>
      </motion.div>
    </div>
  )
}
