/**
 * Spectacular Loading Experience for Project Builder
 * An immersive, engaging loading screen that keeps users excited
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Network,
  Sparkles,
  Zap,
  Target,
  Layers,
  GitBranch,
  CheckCircle2,
  Activity
} from 'lucide-react'

interface LoadingPhase {
  icon: any
  title: string
  subtitle: string
  color: string
  facts: string[]
}

const LOADING_PHASES: LoadingPhase[] = [
  {
    icon: Brain,
    title: 'Analyzing Your Vision',
    subtitle: 'Processing project requirements',
    color: 'from-gray-900 to-gray-800',
    facts: [
      'Scanning 693 smart home features',
      'Matching with your objectives',
      'Analyzing property characteristics'
    ]
  },
  {
    icon: Layers,
    title: 'Intelligent Filtering',
    subtitle: 'AI-powered feature selection',
    color: 'from-gray-800 to-gray-700',
    facts: [
      'Running machine learning algorithms',
      'Comparing 10,000+ real projects',
      'Identifying optimal combinations'
    ]
  },
  {
    icon: GitBranch,
    title: 'Mapping Dependencies',
    subtitle: 'System integration analysis',
    color: 'from-black to-gray-900',
    facts: [
      'Resolving system relationships',
      'Validating compatibility',
      'Ensuring seamless integration'
    ]
  },
  {
    icon: Target,
    title: 'Crafting Proposals',
    subtitle: 'Creating architecture options',
    color: 'from-gray-900 to-gray-800',
    facts: [
      'Generating Value, Balanced & Flagship tiers',
      'Optimizing cost-performance ratio',
      'Calculating project timelines'
    ]
  },
  {
    icon: Sparkles,
    title: 'Final Polish',
    subtitle: 'Preparing your personalized plan',
    color: 'from-gray-800 to-black',
    facts: [
      'Adding AI-powered recommendations',
      'Creating visual system maps',
      'Finalizing proposal documents'
    ]
  }
]

interface SpectacularLoadingProps {
  estimatedTime?: number
  onPhaseChange?: (phaseIndex: number) => void
  onSkip?: () => void
}

export default function SpectacularLoading({
  estimatedTime = 45,
  onPhaseChange,
  onSkip
}: SpectacularLoadingProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showSlowMessage, setShowSlowMessage] = useState(false)

  const currentPhase = LOADING_PHASES[currentPhaseIndex]
  const IconComponent = currentPhase.icon
  const phaseProgress = ((currentPhaseIndex + 1) / LOADING_PHASES.length) * 100

  useEffect(() => {
    // Phase progression - spread evenly across estimated time
    const phaseDuration = (estimatedTime * 1000) / LOADING_PHASES.length
    const phaseTimer = setInterval(() => {
      setCurrentPhaseIndex((prev) => {
        const next = Math.min(prev + 1, LOADING_PHASES.length - 1)
        onPhaseChange?.(next)
        return next
      })
    }, phaseDuration)

    // Smooth progress bar - slower progression
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const targetProgress = ((currentPhaseIndex + 1) / LOADING_PHASES.length) * 100
        if (prev >= 95) return 95 // Cap at 95%
        return Math.min(prev + 0.3, targetProgress) // Slower increment
      })
    }, 150)

    // Rotate facts within each phase
    const factTimer = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % currentPhase.facts.length)
    }, 3000)

    // Track elapsed time
    const timeTracker = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1
        // Show "taking longer" message after 30 seconds
        if (newTime >= 30 && !showSlowMessage) {
          setShowSlowMessage(true)
        }
        return newTime
      })
    }, 1000)

    return () => {
      clearInterval(phaseTimer)
      clearInterval(progressTimer)
      clearInterval(factTimer)
      clearInterval(timeTracker)
    }
  }, [currentPhaseIndex, estimatedTime, currentPhase.facts.length, onPhaseChange, showSlowMessage])

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Animated Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhaseIndex}
            initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 180 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              {/* Pulsing rings */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentPhase.color}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Icon container */}
              <div className={`relative bg-gradient-to-br ${currentPhase.color} p-10 rounded-3xl shadow-2xl`}>
                <IconComponent className="w-20 h-20 text-white" strokeWidth={1.5} />
              </div>

              {/* Orbiting dots */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-600 rounded-full"
                  animate={{
                    x: [0, Math.cos((i * 2 * Math.PI) / 3) * 80],
                    y: [0, Math.sin((i * 2 * Math.PI) / 3) * 80],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Phase Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentPhaseIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {currentPhase.title}
            </h2>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-medium">
              {currentPhase.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Fun Facts Carousel */}
        <div className="h-16 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`fact-${currentPhaseIndex}-${currentFactIndex}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 text-sm md:text-base">
                {currentPhase.facts[currentFactIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900 via-gray-700 to-black rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
            <span className="font-medium">{Math.round(progress)}% Complete</span>
            <span>~{Math.max(0, Math.ceil(estimatedTime * (1 - progress / 100)))}s remaining</span>
          </div>
        </div>

        {/* Phase Indicators */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {LOADING_PHASES.map((phase, index) => {
            const PhaseIcon = phase.icon
            return (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {index === currentPhaseIndex ? (
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full"
                    layoutId="active-phase"
                  >
                    <PhaseIcon className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:inline">
                      {phase.title}
                    </span>
                  </motion.div>
                ) : index < currentPhaseIndex ? (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <PhaseIcon className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Processing message */}
        <motion.p
          className="text-xs text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI intelligence engine processing your custom smart home architecture...
        </motion.p>

        {/* Taking longer message */}
        <AnimatePresence>
          {showSlowMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto"
            >
              <p className="text-sm text-amber-800 text-center">
                <span className="font-medium">Taking longer than usual...</span>
                <br />
                <span className="text-xs">Complex analysis in progress. Please wait while our AI processes your requirements.</span>
              </p>
              <p className="text-xs text-amber-600 mt-2 text-center">
                Elapsed: {elapsedTime}s
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
