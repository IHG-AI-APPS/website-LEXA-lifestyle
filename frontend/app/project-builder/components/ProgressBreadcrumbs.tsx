/**
 * Progress Breadcrumbs Component
 * Shows user's progress through the project builder flow
 */

import { Check } from 'lucide-react'

interface BreadcrumbsProps {
  currentStep: number
  completedSteps: number[]
}

const steps = [
  { number: 1, name: 'Project DNA', shortName: 'DNA' },
  { number: 2, name: 'Objectives', shortName: 'Goals' },
  { number: 3, name: 'Analysis', shortName: 'Analysis' },
  { number: 4, name: 'Proposals', shortName: 'Options' },
  { number: 5, name: 'BOQ', shortName: 'BOQ' }
]

export default function ProgressBreadcrumbs({ currentStep, completedSteps }: BreadcrumbsProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 dark:border-gray-700 py-4 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number)
            const isCurrent = step.number === currentStep
            const isUpcoming = step.number > currentStep

            return (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                      transition-all duration-300
                      ${isCompleted ? 'bg-green-600 text-white' : ''}
                      ${isCurrent ? 'bg-[#C9A962] text-white ring-4 ring-[#C9A962]' : ''}
                      ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`
                      mt-2 text-xs font-medium hidden sm:block
                      ${isCurrent ? 'text-[#C9A962]' : ''}
                      ${isCompleted ? 'text-green-600' : ''}
                      ${isUpcoming ? 'text-gray-500' : ''}
                    `}
                  >
                    {step.name}
                  </span>
                  <span
                    className={`
                      mt-2 text-xs font-medium sm:hidden
                      ${isCurrent ? 'text-[#C9A962]' : ''}
                      ${isCompleted ? 'text-green-600' : ''}
                      ${isUpcoming ? 'text-gray-500' : ''}
                    `}
                  >
                    {step.shortName}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-1 mx-2 rounded transition-all duration-300
                      ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
