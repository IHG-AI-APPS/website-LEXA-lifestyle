'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle } from 'lucide-react'

interface LeadCaptureFormProps {
  calculatorData: {
    propertyType: string
    squareFootage: number
    systems: string[]
    estimatedCost: string
    timeline: string
  }
  onSubmit: (data: any) => void
  onSkip?: () => void
}

export default function LeadCaptureForm({ calculatorData, onSubmit, onSkip }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    timeline: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const leadData = {
        ...formData,
        ...calculatorData,
        source: 'Cost Calculator',
        timestamp: new Date().toISOString()
      }

      // Submit to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      })

      if (response.ok) {
        setSubmitted(true)
        onSubmit(leadData)
      }
    } catch (error) {
      console.error('Lead submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-2xl font-heading font-semibold mb-3">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          We&apos;ve received your information. Our team will contact you within 24 hours to discuss your project.
        </p>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          className="border-gray-300"
        >
          Return to Homepage
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-semibold mb-2">Get Your Detailed Quote</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share your details and we&apos;ll send you a personalized proposal with exact pricing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+971 XX XXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">When to Start?</label>
            <select
              value={formData.timeline}
              onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediately</option>
              <option value="1-3months">1-3 Months</option>
              <option value="3-6months">3-6 Months</option>
              <option value="6+months">6+ Months</option>
              <option value="researching">Just Researching</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
          <div className="flex gap-4">
            {['email', 'phone', 'whatsapp'].map(method => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={formData.preferredContact === method}
                  onChange={e => setFormData(prev => ({ ...prev, preferredContact: e.target.value }))}
                  className="w-4 h-4"
                />
                <span className="text-sm capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <Textarea
            value={formData.message}
            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Tell us more about your project requirements..."
            rows={4}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-black hover:bg-gray-800 text-white"
          >
            {loading ? 'SENDING...' : 'GET DETAILED QUOTE'}
          </Button>
          {onSkip && (
            <Button
              type="button"
              onClick={onSkip}
              variant="outline"
              className="border-gray-300"
            >
              Skip
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your information is secure. We respect your privacy and won&apos;t spam you.
        </p>
      </form>
    </div>
  )
}
