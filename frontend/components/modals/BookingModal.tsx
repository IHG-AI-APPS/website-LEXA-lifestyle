'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, Video } from 'lucide-react'
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

  // Calendly URLs - Update these with your actual Calendly links
  const calendlyUrls = {
    'site-visit': 'https://calendly.com/lexalifestyle/site-visit',
    'experience-center': 'https://calendly.com/lexalifestyle/experience-center-tour',
    'video-call': 'https://calendly.com/lexalifestyle/consultation'
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
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Schedule Your Visit</h2>
                  <p className="text-gray-300 text-sm">Choose your preferred booking type</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Booking Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setBookingType('site-visit')}
                    className={`p-6 border-2 rounded-lg transition-all text-left ${
                      bookingType === 'site-visit'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <MapPin className={`mb-3 ${bookingType === 'site-visit' ? 'text-black' : 'text-gray-400'}`} size={32} />
                    <h3 className="font-bold text-lg mb-2">Free Site Visit</h3>
                    <p className="text-sm text-gray-600">Our team visits your property for a detailed survey</p>
                    <p className="text-xs text-gray-500 mt-2">Duration: 60-90 min</p>
                  </button>

                  <button
                    onClick={() => setBookingType('experience-center')}
                    className={`p-6 border-2 rounded-lg transition-all text-left ${
                      bookingType === 'experience-center'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Calendar className={`mb-3 ${bookingType === 'experience-center' ? 'text-black' : 'text-gray-400'}`} size={32} />
                    <h3 className="font-bold text-lg mb-2">Experience Center</h3>
                    <p className="text-sm text-gray-600">See our smart home systems in action</p>
                    <p className="text-xs text-gray-500 mt-2">Duration: 45-60 min</p>
                  </button>

                  <button
                    onClick={() => setBookingType('video-call')}
                    className={`p-6 border-2 rounded-lg transition-all text-left ${
                      bookingType === 'video-call'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Video className={`mb-3 ${bookingType === 'video-call' ? 'text-black' : 'text-gray-400'}`} size={32} />
                    <h3 className="font-bold text-lg mb-2">Video Consultation</h3>
                    <p className="text-sm text-gray-600">Virtual meeting with our experts</p>
                    <p className="text-xs text-gray-500 mt-2">Duration: 30 min</p>
                  </button>
                </div>

                {/* Calendly Embed */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="bg-white rounded-lg overflow-hidden" style={{ height: '600px' }}>
                    <iframe
                      src={`${calendlyUrls[bookingType]}?hide_event_type_details=1&hide_gdpr_banner=1${customerName ? `&name=${encodeURIComponent(customerName)}` : ''}${customerEmail ? `&email=${encodeURIComponent(customerEmail)}` : ''}${submissionId ? `&a1=${submissionId}` : ''}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="Schedule Appointment"
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Powered by Calendly • All times shown in UAE timezone
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
