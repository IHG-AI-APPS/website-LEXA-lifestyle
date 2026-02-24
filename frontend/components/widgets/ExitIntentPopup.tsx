'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, CheckCircle, ArrowRight, Percent, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface ABTestVariant {
  id: string
  name?: string
  headline: string
  subheadline: string
  offer_badge: string
  benefits: string[]
  cta_text: string
  success_message: string
}

// Default variant (control)
const DEFAULT_VARIANT: ABTestVariant = {
  id: 'control',
  headline: "Wait! Don't Leave Empty-Handed",
  subheadline: "Get a FREE Smart Home Consultation",
  offer_badge: "Worth AED 2,500 — Yours FREE!",
  benefits: [
    "Personalized smart home design recommendations",
    "Expert advice from certified consultants",
    "Custom budget estimate for your property",
    "No obligation - 100% FREE"
  ],
  cta_text: "Claim My FREE Consultation",
  success_message: "Your FREE consultation has been reserved. Our team will contact you within 24 hours."
}

// Icon mapping based on variant ID
const getVariantIcon = (variantId: string) => {
  switch (variantId) {
    case 'variant_b':
      return Percent
    case 'variant_c':
      return BookOpen
    default:
      return Gift
  }
}

// Gradient mapping based on variant ID
const getVariantGradient = (variantId: string) => {
  switch (variantId) {
    case 'variant_b':
      return 'from-orange-500 to-red-600'
    case 'variant_c':
      return 'from-emerald-500 to-teal-600'
    default:
      return 'from-purple-600 to-blue-600'
  }
}

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [variant, setVariant] = useState<ABTestVariant>(DEFAULT_VARIANT)

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem('exit_intent_shown')
    const hasSubmitted = localStorage.getItem('exit_intent_submitted')
    
    if (hasShown || hasSubmitted) {
      setHasTriggered(true)
      return
    }

    const handleMouseLeave = async (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of page (exit intent)
      // Must be moving upward (negative movementY or clientY very close to 0)
      if (e.clientY <= 5 && !hasTriggered) {
        await fetchVariantAndShow()
      }
    }

    // Mobile-only fallback: trigger after 90 seconds of inactivity
    // Only on mobile devices (no mouse)
    let timeoutTrigger: NodeJS.Timeout | null = null
    let lastInteraction = Date.now()
    
    const isMobile = typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    const resetInactivityTimer = () => {
      lastInteraction = Date.now()
    }
    
    if (isMobile) {
      // On mobile, show after 90 seconds of no interaction (scroll/touch)
      timeoutTrigger = setTimeout(async () => {
        const inactiveTime = Date.now() - lastInteraction
        if (!hasTriggered && !sessionStorage.getItem('exit_intent_shown') && inactiveTime > 30000) {
          await fetchVariantAndShow()
        }
      }, 90000)
      
      // Track user interaction
      document.addEventListener('scroll', resetInactivityTimer, { passive: true })
      document.addEventListener('touchstart', resetInactivityTimer, { passive: true })
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (timeoutTrigger) clearTimeout(timeoutTrigger)
      if (isMobile) {
        document.removeEventListener('scroll', resetInactivityTimer)
        document.removeEventListener('touchstart', resetInactivityTimer)
      }
    }
  }, [hasTriggered])

  const fetchVariantAndShow = async () => {
    try {
      // Fetch A/B test variant from backend
      const response = await fetch(`${API_URL}/api/leads/ab-test/variant`)
      if (response.ok) {
        const data = await response.json()
        setVariant(data)
      }
    } catch (error) {
      console.error('Failed to fetch A/B variant:', error)
      // Use default variant on error
    }
    
    setIsVisible(true)
    setHasTriggered(true)
    sessionStorage.setItem('exit_intent_shown', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/leads/exit-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source_page: typeof window !== 'undefined' ? window.location.pathname : '/',
          offer_type: variant.id === 'variant_b' ? 'discount' : variant.id === 'variant_c' ? 'guide' : 'consultation',
          variant_id: variant.id
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        localStorage.setItem('exit_intent_submitted', 'true')
        
        // Close after showing success
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Exit intent submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const close = () => {
    setIsVisible(false)
  }

  const IconComponent = getVariantIcon(variant.id)
  const gradientClass = getVariantGradient(variant.id)

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            data-testid="exit-intent-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md mx-auto my-auto relative">
              {/* Close button */}
              <button
                onClick={close}
                data-testid="exit-popup-close"
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header - Compact */}
                  <div className={`bg-gradient-to-r ${gradientClass} px-4 py-4 sm:py-5 text-white text-center`}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold mb-1">{variant.headline}</h2>
                    <p className="text-white/90 text-xs sm:text-sm">{variant.subheadline}</p>
                    <div className="mt-2 inline-block px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {variant.offer_badge}
                    </div>
                  </div>

                  {/* Content - Compact */}
                  <div className="p-3 sm:p-4">
                    <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      {variant.benefits.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-testid="exit-popup-email"
                        className="h-9 sm:h-10 text-sm"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        data-testid="exit-popup-submit"
                        className={`w-full h-9 sm:h-10 bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white font-semibold text-xs sm:text-sm`}
                      >
                        {isSubmitting ? 'Submitting...' : (
                          <>{variant.cta_text}<ArrowRight className="w-3 h-3 ml-1" /></>
                        )}
                      </Button>
                    </form>

                    <p className="text-center text-[10px] text-gray-400 mt-2">
                      No spam, ever.
                    </p>
                  </div>
                </>
              ) : (
                /* Success State - Compact */
                <div className="p-4 sm:p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1">You're All Set!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{variant.success_message}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
