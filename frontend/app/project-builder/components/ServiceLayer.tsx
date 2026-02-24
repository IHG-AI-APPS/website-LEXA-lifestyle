'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Wrench, LifeBuoy, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServiceLayerProps {
  sessionId: string
  projectData: any
  onComplete: (data: any) => void
}

const SERVICES = [
  {
    id: 'design',
    icon: Briefcase,
    name: 'Design & Engineering',
    description: 'Complete system design, CAD drawings, BOQ preparation',
    features: ['3D visualization', 'Technical specifications', 'Equipment schedules', 'Integration diagrams'],
    recommended_for: ['Concept', 'Design']
  },
  {
    id: 'installation',
    icon: Wrench,
    name: 'Installation & Commissioning',
    description: 'Professional installation, testing, and handover',
    features: ['Site supervision', 'Quality control', 'System testing', 'User training'],
    recommended_for: ['Construction', 'Retrofit'],
    mandatory: true
  },
  {
    id: 'amc',
    icon: LifeBuoy,
    name: 'Annual Maintenance Contract',
    description: 'Preventive maintenance, support, and updates',
    features: ['Quarterly inspections', '24/7 support', 'Software updates', 'Priority service'],
    recommended_for: ['all']
  }
]

export default function ServiceLayer({ sessionId, projectData, onComplete }: ServiceLayerProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['installation']) // Installation is mandatory

  const toggleService = (serviceId: string) => {
    // Installation is mandatory, can&apos;t be deselected
    if (serviceId === 'installation') return
    
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const handleContinue = () => {
    onComplete({ selected_services: selectedServices })
  }

  const isRecommended = (service: any) => {
    if (service.recommended_for.includes('all')) return true
    return service.recommended_for.includes(projectData.project_stage)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            Design • Installation • Support
          </p>
          <p className="text-xs text-gray-600">
            Select services to complete your project package
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-6 mb-12">
          {SERVICES.map((service, index) => {
            const isSelected = selectedServices.includes(service.id)
            const recommended = isRecommended(service)
            const ServiceIcon = service.icon
            
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggleService(service.id)}
                disabled={service.mandatory}
                className={`w-full p-8 border text-left transition-all duration-300 relative ${
                  isSelected
                    ? 'border-blue-600 bg-white dark:bg-gray-800 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                } ${service.mandatory ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {service.mandatory && (
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] uppercase tracking-widest font-medium">
                      Mandatory
                    </span>
                  )}
                  {recommended && !service.mandatory && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-medium">
                      Recommended
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`${isSelected ? 'bg-blue-50' : 'bg-gray-50'} p-4 transition-colors`}>
                    <ServiceIcon className={`w-8 h-8 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  <div className="flex-shrink-0">
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle2 className="w-8 h-8 text-blue-600" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{selectedServices.length}</span> service{selectedServices.length > 1 ? 's' : ''} selected:
            <span className="ml-2 text-gray-600">
              {SERVICES.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(', ')}
            </span>
          </div>
        </div>

        {/* Continue */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
          >
            Continue to Summary
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
