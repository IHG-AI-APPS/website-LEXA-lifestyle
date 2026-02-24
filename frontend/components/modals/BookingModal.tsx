'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, Phone, Mail, User, MessageSquare, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  submissionId?: string
  customerName?: string
  customerEmail?: string
}

export default function BookingModal({ isOpen, onClose, submissionId, customerName, customerEmail }: BookingModalProps) {
  const [bookingType, setBookingType] = useState<'site-visit' | 'experience-center' | 'video-call'>('site-visit')
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: customerName || '',
    email: customerEmail || '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const bookingTypeLabels = {
    'site-visit': 'Free Site Visit',
    'experience-center': 'Experience Center Tour',
    'video-call': 'Video Consultation'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookingType,
          submissionId,
          source: 'booking_modal'
        })
      })
      
      if (response.ok) {
        setStep('success')
      } else {
        alert('Submission failed. Please try again or call us directly.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Connection error. Please try again or call us at +971 4 123 4567.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetModal = () => {
    setStep('select')
    setFormData({
      name: customerName || '',
      email: customerEmail || '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 flex items-center justify-between sticky top-0">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {step === 'success' ? 'Booking Confirmed!' : 'Schedule Your Visit'}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {step === 'select' ? 'Choose your preferred booking type' : 
                     step === 'form' ? `Booking: ${bookingTypeLabels[bookingType]}` :
                     'We will contact you shortly'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'select' && (
                  <>
                    {/* Booking Type Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <button
                        onClick={() => setBookingType('site-visit')}
                        className={`p-5 border-2 rounded-lg transition-all text-left ${
                          bookingType === 'site-visit'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <MapPin className={`mb-3 ${bookingType === 'site-visit' ? 'text-green-600' : 'text-gray-400'}`} size={28} />
                        <h3 className="font-bold mb-1">Free Site Visit</h3>
                        <p className="text-xs text-gray-600">Our team visits your property</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock size={12} /> 60-90 min
                        </p>
                      </button>

                      <button
                        onClick={() => setBookingType('experience-center')}
                        className={`p-5 border-2 rounded-lg transition-all text-left ${
                          bookingType === 'experience-center'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <Calendar className={`mb-3 ${bookingType === 'experience-center' ? 'text-green-600' : 'text-gray-400'}`} size={28} />
                        <h3 className="font-bold mb-1">Experience Center</h3>
                        <p className="text-xs text-gray-600">See smart home systems live</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock size={12} /> 45-60 min
                        </p>
                      </button>

                      <button
                        onClick={() => setBookingType('video-call')}
                        className={`p-5 border-2 rounded-lg transition-all text-left ${
                          bookingType === 'video-call'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <Video className={`mb-3 ${bookingType === 'video-call' ? 'text-green-600' : 'text-gray-400'}`} size={28} />
                        <h3 className="font-bold mb-1">Video Call</h3>
                        <p className="text-xs text-gray-600">Virtual meeting with experts</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock size={12} /> 30 min
                        </p>
                      </button>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setStep('form')}
                    >
                      Continue to Book
                    </Button>
                  </>
                )}

                {step === 'form' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="+971 50 123 4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Preferred Date *</label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Preferred Time *</label>
                        <select
                          required
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Select time slot</option>
                          <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                          <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                          <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                          <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                          <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                          <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                          <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Additional Notes</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[80px]"
                          placeholder="Any specific requirements or questions..."
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep('select')}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" size={18} />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2" size={18} />
                            Submit Booking Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}

                {step === 'success' && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-green-600" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Booking Request Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest. Our team will contact you within 2 hours to confirm your {bookingTypeLabels[bookingType].toLowerCase()} appointment.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <p className="text-sm"><strong>Type:</strong> {bookingTypeLabels[bookingType]}</p>
                      <p className="text-sm"><strong>Date:</strong> {formData.preferredDate}</p>
                      <p className="text-sm"><strong>Time:</strong> {formData.preferredTime}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      Need immediate assistance? Call us at <a href="tel:+97141234567" className="text-green-600 font-semibold">+971 4 123 4567</a>
                    </p>
                    <Button onClick={handleClose} className="bg-black hover:bg-gray-800">
                      Close
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
