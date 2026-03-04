'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Hotel, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

interface ProjectDNACaptureProps {
  onComplete: (data: any) => void
}

const SEGMENTS = [
  { id: 'Residential', label: 'Residential', icon: Home, desc: 'Luxury homes, villas, apartments' },
  { id: 'Commercial', label: 'Commercial', icon: Building2, desc: 'Offices, workspaces, retail' },
  { id: 'Hospitality', label: 'Hospitality', icon: Hotel, desc: 'Hotels, resorts, serviced apartments' }
]

const PROPERTY_TYPES: Record<string, any[]> = {
  Residential: [
    { id: 'Villa', label: 'Villa / House' },
    { id: 'Apartment', label: 'Apartment / Flat' },
    { id: 'Penthouse', label: 'Penthouse' },
    { id: 'Estate', label: 'Estate / Mansion' }
  ],
  Commercial: [
    { id: 'Office', label: 'Office Building' },
    { id: 'Retail', label: 'Retail Space' },
    { id: 'Showroom', label: 'Showroom' }
  ],
  Hospitality: [
    { id: 'Hotel', label: 'Hotel / Resort' },
    { id: 'Serviced Apartment', label: 'Serviced Apartment' }
  ]
}

const STAGES = [
  { id: 'Concept', label: 'Concept / Planning' },
  { id: 'Design', label: 'Design Phase' },
  { id: 'Construction', label: 'Under Construction' },
  { id: 'Retrofit', label: 'Retrofit / Upgrade' }
]

export default function ProjectDNACapture({ onComplete }: ProjectDNACaptureProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    segment: '',
    property_type: '',
    project_stage: '',
    area_sqft: '',
    location: '',
    num_floors: '',
    num_rooms: ''
  })

  const handleSubmit = async () => {
    if (!formData.segment || !formData.property_type || !formData.project_stage || !formData.area_sqft) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/project-builder/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          segment: formData.segment,
          property_type: formData.property_type,
          project_stage: formData.project_stage,
          area_sqft: parseInt(formData.area_sqft),
          location: formData.location || 'Dubai',
          num_floors: formData.num_floors ? parseInt(formData.num_floors) : 1,
          num_rooms: formData.num_rooms ? parseInt(formData.num_rooms) : 3
        })
      })

      const data = await response.json()
      onComplete(data)
    } catch (error) {
      console.error('DNA capture error:', error)
      alert('Failed to initialize project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">DNA</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Define Your Project Parameters
          </p>
        </div>

        {/* Segment Selection */}
        <div className="mb-8">
          <label className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Segment</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SEGMENTS.map((segment) => (
              <button
                key={segment.id}
                onClick={() => setFormData({ ...formData, segment: segment.id, property_type: '' })}
                className={`bg-white dark:bg-[#171717] border p-6 text-left transition-all duration-300 hover:shadow-lg group ${
                  formData.segment === segment.id
                    ? 'border-[#C9A962] shadow-md'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                }`}
              >
                <segment.icon className={`w-6 h-6 mb-3 transition-colors ${
                  formData.segment === segment.id ? 'text-[#C9A962]' : 'text-gray-400 group-hover:text-[#C9A962]'
                }`} />
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{segment.label}</div>
                <div className="text-xs text-gray-600 dark:text-zinc-500">{segment.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        {formData.segment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Property Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROPERTY_TYPES[formData.segment]?.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, property_type: type.id })}
                  className={`bg-white dark:bg-[#171717] border p-4 text-sm transition-all duration-300 ${
                    formData.property_type === type.id
                      ? 'border-[#C9A962] text-[#C9A962] shadow-md'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300 dark:border-zinc-700 hover:shadow-sm'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Stage */}
        {formData.property_type && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Project Stage</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setFormData({ ...formData, project_stage: stage.id })}
                  className={`bg-white dark:bg-[#171717] border p-4 text-sm transition-all duration-300 ${
                    formData.project_stage === stage.id
                      ? 'border-[#C9A962] text-[#C9A962] shadow-md'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300 dark:border-zinc-700 hover:shadow-sm'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Dimensions */}
        {formData.project_stage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Dimensions</label>
            
            {/* Area with Quick Presets */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Area (sqft) *</label>
              <div className="flex gap-2 mb-2">
                {['1000', '2000', '3500', '5000', '10000'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setFormData({ ...formData, area_sqft: preset })}
                    className={`px-3 py-1 text-xs border transition-all ${
                      formData.area_sqft === preset
                        ? 'border-[#C9A962] bg-[#C9A962]/5 text-[#C9A962]'
                        : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300'
                    }`}
                  >
                    {parseInt(preset).toLocaleString()}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={formData.area_sqft}
                onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                placeholder="Or enter custom size"
                className="border-gray-200 dark:border-zinc-800 focus:border-[#C9A962] text-gray-900 dark:text-white"
              />
              {formData.area_sqft && (
                <p className="text-xs text-gray-500 mt-1">
                  {parseInt(formData.area_sqft) < 1500 && '💡 Compact property - Essential tier recommended'}
                  {parseInt(formData.area_sqft) >= 1500 && parseInt(formData.area_sqft) < 4000 && '💡 Medium property - Balanced tier recommended'}
                  {parseInt(formData.area_sqft) >= 4000 && '💡 Large property - Flagship tier recommended'}
                </p>
              )}
            </div>

            {/* Floors & Rooms Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Floors</label>
                <div className="flex gap-2 mb-2">
                  {['1', '2', '3', '4+'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setFormData({ ...formData, num_floors: preset === '4+' ? '4' : preset })}
                      className={`flex-1 px-3 py-2 text-sm border transition-all ${
                        formData.num_floors === (preset === '4+' ? '4' : preset)
                          ? 'border-[#C9A962] bg-[#C9A962]/5 text-[#C9A962]'
                          : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Rooms</label>
                <div className="flex gap-2 mb-2">
                  {['2', '3', '4', '5', '6+'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setFormData({ ...formData, num_rooms: preset === '6+' ? '6' : preset })}
                      className={`flex-1 px-3 py-2 text-sm border transition-all ${
                        formData.num_rooms === (preset === '6+' ? '6' : preset)
                          ? 'border-[#C9A962] bg-[#C9A962]/5 text-[#C9A962]'
                          : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Location */}
        {formData.area_sqft && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12"
          >
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Location (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Other'].map((city) => (
                <button
                  key={city}
                  onClick={() => setFormData({ ...formData, location: city === 'Other' ? '' : city })}
                  className={`bg-white dark:bg-[#171717] border p-3 text-xs transition-all duration-300 ${
                    formData.location === city || (city === 'Other' && !['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(formData.location))
                      ? 'border-[#C9A962] text-[#C9A962] shadow-md'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-500 hover:border-gray-300 dark:border-zinc-700 hover:shadow-sm'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
            {formData.location && !['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(formData.location) && (
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter custom location"
                className="border-gray-200 dark:border-zinc-800 focus:border-[#C9A962] text-gray-900 dark:text-white mt-3"
              />
            )}
          </motion.div>
        )}

        {/* Continue Button */}
        {formData.area_sqft && (
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
            >
              {loading ? 'Initializing...' : 'Analyze Project DNA'}
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
