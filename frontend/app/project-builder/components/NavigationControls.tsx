/**
 * Navigation Controls
 * Back/Forward buttons for project builder flow
 * Includes keyboard shortcuts and smooth animations
 */

'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationControlsProps {
  onBack: () => void
  onForward: () => void
  canGoBack: boolean
  canGoForward: boolean
  backLabel?: string
  forwardLabel?: string
  isLoading?: boolean
}

export default function NavigationControls({
  onBack,
  onForward,
  canGoBack,
  canGoForward,
  backLabel = 'Back',
  forwardLabel = 'Continue',
  isLoading = false
}: NavigationControlsProps) {
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Left Arrow = Back
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft' && canGoBack) {
        e.preventDefault()
        onBack()
      }
      
      // Ctrl/Cmd + Right Arrow = Forward
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight' && canGoForward) {
        e.preventDefault()
        onForward()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [canGoBack, canGoForward, onBack, onForward])

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed bottom-8 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-full px-6 py-4 elevation-6 flex items-center justify-between"
          >
            {/* Back Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              disabled={!canGoBack}
              className={`
                btn-magnetic
                ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {backLabel}
            </Button>

            {/* Keyboard Hint */}
            <div className="hidden xl:flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">⌘</kbd>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">←</kbd>
                <span>Back</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">⌘</kbd>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">→</kbd>
                <span>Forward</span>
              </div>
            </div>

            {/* Forward Button - Only show if canGoForward is true */}
            {canGoForward && (
              <Button
                size="lg"
                onClick={onForward}
                disabled={!canGoForward || isLoading}
                className={`
                  bg-black hover:bg-gray-800 text-white btn-magnetic
                  ${!canGoForward || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    {forwardLabel}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 px-4 pb-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 elevation-6"
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={onBack}
              disabled={!canGoBack}
              className={`
                ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>

            {/* Forward Button - Only show if canGoForward is true */}
            {canGoForward && (
              <Button
                onClick={onForward}
                disabled={!canGoForward || isLoading}
                className={`
                  bg-black hover:bg-gray-800 text-white
                  ${!canGoForward || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Loading...
                  </>
                ) : (
                  <>
                    {forwardLabel}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
