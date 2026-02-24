'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, CheckCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SocialProofEvent {
  name: string
  location: string
  action: string
  time_ago: string
}

export default function SocialProofWidget() {
  const [events, setEvents] = useState<SocialProofEvent[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the widget recently
    const dismissedUntil = localStorage.getItem('social_proof_dismissed')
    if (dismissedUntil && new Date(dismissedUntil) > new Date()) {
      setIsDismissed(true)
      return
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (events.length === 0 || isDismissed) return

    // Show first notification after 30 seconds (was 5 seconds)
    const initialDelay = setTimeout(() => {
      setIsVisible(true)
      
      // Hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 6000)
    }, 30000)

    // Rotate through events every 60 seconds (was 8 seconds)
    const rotationInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % events.length)
      setIsVisible(true)
      
      // Hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 6000)
    }, 60000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(rotationInterval)
    }
  }, [events.length, isDismissed])

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leads/social-proof`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Failed to fetch social proof:', error)
    }
  }

  const dismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // Dismiss for 1 hour
    const dismissUntil = new Date(Date.now() + 60 * 60 * 1000)
    localStorage.setItem('social_proof_dismissed', dismissUntil.toISOString())
  }

  if (events.length === 0 || isDismissed) return null

  const currentEvent = events[currentIndex]

  return (
    <AnimatePresence>
      {isVisible && currentEvent && (
        <motion.div
          data-testid="social-proof-widget"
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 0 }}
          className="fixed bottom-24 left-4 z-40 max-w-[320px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {currentEvent.name.charAt(0)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 dark:text-gray-100">
                  <span className="font-semibold">{currentEvent.name}</span>
                  {' '}from{' '}
                  <span className="font-medium text-blue-600">{currentEvent.location}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {currentEvent.action}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{currentEvent.time_ago}</span>
                  <CheckCircle className="w-3 h-3 text-green-500 ml-2" />
                  <span className="text-green-600">Verified</span>
                </div>
              </div>

              {/* Close button */}
              <button 
                onClick={dismiss}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-400 p-1 -mt-1 -mr-1"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
