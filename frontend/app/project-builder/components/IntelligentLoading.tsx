/**
 * Project Builder - Enhanced Loading Component
 * Displays intelligent loading states during AI analysis
 */

'use client'

import { motion } from 'framer-motion'
import { Brain, Network, Zap, Target, Sparkles } from 'lucide-react'

interface LoadingState {
  icon: any
  text: string
  subtext?: string
}

const LOADING_STATES: LoadingState[] = [
  {
    icon: Brain,
    text: 'Analyzing 693 Features',
    subtext: 'Running AI recommendation engine'
  },
  {
    icon: Network,
    text: 'Resolving Dependencies',
    subtext: 'Mapping system relationships'
  },
  {
    icon: Zap,
    text: 'Applying Smart Filters',
    subtext: 'Matching your objectives'
  },
  {
    icon: Target,
    text: 'Generating Proposals',
    subtext: 'Creating architecture options'
  },
  {
    icon: Sparkles,
    text: 'Finalizing Intelligence',
    subtext: 'Preparing recommendations'
  }
]

interface IntelligentLoadingProps {
  estimatedTime?: number // in seconds
}

export default function IntelligentLoading({ estimatedTime = 30 }: IntelligentLoadingProps) {
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  
  React.useEffect(() => {
    // Cycle through states
    const stateInterval = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % LOADING_STATES.length)
    }, estimatedTime * 1000 / LOADING_STATES.length)
    
    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95 // Cap at 95% until complete
        return prev + (100 / (estimatedTime * 10))
      })
    }, 100)
    
    return () => {
      clearInterval(stateInterval)
      clearInterval(progressInterval)
    }
  }, [estimatedTime])
  
  const currentState = LOADING_STATES[currentStateIndex]
  const IconComponent = currentState.icon
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      {/* Animated Icon */}
      <motion.div
        key={currentStateIndex}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-[#C9A962]/5 to-[#A68B4B]/5 p-8 rounded-full">
            <IconComponent className="w-16 h-16 text-blue-600" />
          </div>
        </div>
      </motion.div>
      
      {/* Text */}
      <motion.div
        key={`text-${currentStateIndex}`}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {currentState.text}
        </h3>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          {currentState.subtext}
        </p>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C9A962] to-[#A68B4B]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Processing...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* State Indicators */}
      <div className="flex items-center gap-2 mt-8">
        {LOADING_STATES.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentStateIndex
                ? 'w-8 bg-blue-600'
                : index < currentStateIndex
                ? 'w-1.5 bg-blue-400'
                : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Estimated Time */}
      <p className="text-xs text-gray-400 mt-6">
        Estimated time: {estimatedTime} seconds • AI analysis in progress
      </p>
    </div>
  )
}

// Add React import at top
import React from 'react'
