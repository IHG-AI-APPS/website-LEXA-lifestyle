'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ProcessStep {
  title: string
  description: string
  duration: string
  deliverables?: string[]
}

interface ProcessWheelProps {
  steps: ProcessStep[]
}

export default function ProcessWheel({ steps }: ProcessWheelProps) {
  const colors = [
    'from-[#E8DCC8] to-[#d4c8b4]',
    'from-[#1A1A1A] to-[#2A2A2A]',
    'from-[#E8DCC8] to-[#d4c8b4]',
    'from-[#1A1A1A] to-[#2A2A2A]',
    'from-[#E8DCC8] to-[#d4c8b4]'
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
              )}

              {/* Step Card */}
              <div className="relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-[#E8DCC8] transition-all hover:shadow-lg z-10">
                {/* Step Number */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>

                {/* Duration Badge */}
                <div className="text-center mb-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {step.duration}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-center mb-3 min-h-[3rem] flex items-center justify-center">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Circular Process Visualization */}
        <div className="relative max-w-2xl mx-auto h-96 hidden md:block">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Circular Progress Track */}
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
              strokeDasharray="5,5"
            />

            {/* Process Steps in Circle */}
            {steps.map((step, index) => {
              const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2
              const x = 200 + 150 * Math.cos(angle)
              const y = 200 + 150 * Math.sin(angle)

              return (
                <g key={index}>
                  {/* Connection Line to Center */}
                  <line
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="#E8DCC8"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity="0.3"
                  />

                  {/* Step Circle */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="25"
                    fill="#1A1A1A"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />

                  {/* Step Number */}
                  <text
                    x={x}
                    y={y + 6}
                    textAnchor="middle"
                    className="text-white font-bold text-sm"
                    fill="white"
                  >
                    {index + 1}
                  </text>
                </g>
              )
            })}

            {/* Center Text */}
            <text
              x="200"
              y="195"
              textAnchor="middle"
              className="text-lg font-bold fill-[#1A1A1A]"
            >
              Our Process
            </text>
            <text
              x="200"
              y="215"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {steps.length} Steps
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
