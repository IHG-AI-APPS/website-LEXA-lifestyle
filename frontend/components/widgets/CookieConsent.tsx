'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  if (!isVisible) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-[#1A1A1A] text-white rounded-full shadow-lg hover:bg-[#2D2D2D] transition-colors"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 animate-slide-up">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header - Very compact */}
        <div className="bg-[#1A1A1A] px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A962]" />
            <span className="text-white font-medium text-sm">Privacy & Cookies</span>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Compact */}
        <div className="p-3">
          <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-3">
            We use cookies to enhance your experience.{' '}
            <Link href="/privacy-policy" className="text-[#C9A962] hover:underline font-medium">
              Learn more
            </Link>
          </p>

          {/* Actions - Side by side buttons */}
          <div className="flex gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 px-3 py-2 bg-[#1A1A1A] text-white font-medium text-xs rounded-lg hover:bg-[#2D2D2D] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={acceptEssential}
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  )
}
