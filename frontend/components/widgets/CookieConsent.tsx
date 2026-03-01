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
        className="fixed bottom-20 lg:bottom-4 left-4 z-[45] p-2.5 bg-black/80 backdrop-blur-xl text-[#C9A962] rounded-full shadow-lg border border-white/[0.08] hover:bg-black/90 transition-colors"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[45] p-3 pb-[84px] lg:pb-4 animate-slide-up pointer-events-none">
      <div className="max-w-sm mx-auto lg:mx-0 lg:ml-4 pointer-events-auto bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A962]" />
            <span className="text-white font-medium text-sm">Privacy & Cookies</span>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-white/40 hover:text-white transition-colors"
            aria-label="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-white/60 text-xs leading-relaxed mb-3">
            We use cookies to enhance your experience.{' '}
            <Link href="/privacy-policy" className="text-[#C9A962] hover:underline font-medium">
              Learn more
            </Link>
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={acceptAll}
              data-testid="cookie-accept-all"
              className="flex-1 px-3 py-2.5 bg-[#C9A962] text-black font-semibold text-xs rounded-lg hover:bg-[#d4b46e] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={acceptEssential}
              data-testid="cookie-essential-only"
              className="flex-1 px-3 py-2.5 bg-white/10 text-white/80 font-medium text-xs rounded-lg hover:bg-white/15 transition-colors border border-white/[0.08]"
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
