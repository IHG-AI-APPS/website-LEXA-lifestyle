/**
 * Step Progress Indicator
 * Visual stepper showing user's position in the project builder flow
 * Follows luxury monochrome design principles
 */

'use client'

import { motion } from 'framer-motion'
import {
  Home,
  Target,
  Layers,
  Brain,
  FileText,
  Settings,
  DollarSign,
  CheckCircle2,
  Circle
} from 'lucide-react'

interface Step {
  id: string
  label: string
  icon: any
}

const BUILDER_STEPS: Step[] = [
  { id: 'dna', label: 'Project DNA', icon: Home },
  { id: 'objectives', label: 'Objectives', icon: Target },
  { id: 'priorities', label: 'Prioritize', icon: Layers },
  { id: 'intelligence', label: 'AI Analysis', icon: Brain },
  { id: 'proposals', label: 'Proposals', icon: FileText },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'boq', label: 'Summary', icon: DollarSign },
  { id: 'submission', label: 'Complete', icon: CheckCircle2 }
]

interface StepProgressProps {
  currentStep: string
  completedSteps?: string[]
  onStepClick?: (stepId: string) => void
}

export default function StepProgress({
  currentStep,
  completedSteps = [],
  onStepClick
}: StepProgressProps) {
  const currentIndex = BUILDER_STEPS.findIndex(step => step.id === currentStep)

  const getStepState = (stepId: string, index: number) => {
    if (completedSteps.includes(stepId)) return 'completed'
    if (stepId === currentStep) return 'current'
    if (index < currentIndex) return 'completed'
    return 'upcoming'
  }

  return (
    <>
      {/* Desktop Progress Bar - Below main navigation */}
      <div className="hidden lg:block w-full bg-white border-b border-gray-200 shadow-sm sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {BUILDER_STEPS.map((step, index) => {
              const Icon = step.icon
              const state = getStepState(step.id, index)
              const isClickable = state === 'completed' && onStepClick

              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <button
                    onClick={() => isClickable && onStepClick(step.id)}
                    disabled={!isClickable}
                    className={`
                      relative group
                      ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {/* Circle Background */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: state === 'current' ? 1.1 : 1,
                        backgroundColor: 
                          state === 'completed' ? '#000000' :
                          state === 'current' ? '#000000' :
                          '#f3f4f6'
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`
                        w-12 h-12 rounded-full
                        flex items-center justify-center
                        transition-all duration-300
                        ${isClickable ? 'hover:scale-110 elevation-2 hover:elevation-3' : ''}
                        ${state === 'current' ? 'elevation-3 ring-4 ring-gray-200' : ''}
                      `}
                    >
                      {state === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                      ) : (
                        <Icon 
                          className={`
                            w-6 h-6
                            ${state === 'current' ? 'text-white' : 'text-gray-400'}
                          `}
                          strokeWidth={state === 'current' ? 2.5 : 2}
                        />
                      )}
                    </motion.div>

                    {/* Pulse Animation for Current Step */}
                    {state === 'current' && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-black"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    )}

                    {/* Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                      <span
                        className={`
                          text-xs font-medium
                          ${state === 'current' ? 'text-black' : ''}
                          ${state === 'completed' ? 'text-gray-700' : ''}
                          ${state === 'upcoming' ? 'text-gray-400' : ''}
                        `}
                      >
                        {step.label}
                      </span>
                    </div>
                  </button>

                  {/* Connector Line */}
                  {index < BUILDER_STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 bg-gray-200 relative overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          width: index < currentIndex ? '100%' : '0%'
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-y-0 left-0 bg-black"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar - Below main navigation */}
      <div className="lg:hidden w-full bg-white border-b border-gray-200 elevation-2 sticky top-16 z-40">
        <div className="px-4 py-3">
          {/* Current Step Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {(() => {
                const currentStepData = BUILDER_STEPS[currentIndex]
                const Icon = currentStepData.icon
                return (
                  <>
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center elevation-2">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Step {currentIndex + 1} of {BUILDER_STEPS.length}</div>
                      <div className="text-sm font-semibold text-gray-900">{currentStepData.label}</div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                width: `${((currentIndex + 1) / BUILDER_STEPS.length) * 100}%`
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900 to-black rounded-full"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>

          {/* Step Dots */}
          <div className="flex justify-between mt-2 px-1">
            {BUILDER_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`
                  w-1.5 h-1.5 rounded-full transition-colors duration-300
                  ${index <= currentIndex ? 'bg-black' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
