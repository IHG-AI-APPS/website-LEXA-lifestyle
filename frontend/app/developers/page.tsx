'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  TrendingUp,
  FileText,
  Award,
  Package,
  X,
  Check,
  DollarSign,
  Clock,
  BadgeCheck,
  Building
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const resources = [
  {
    id: 'unit-packages',
    title: 'Sample Unit Packages',
    description: 'Pre-designed automation packages for 1BR, 2BR, 3BR, and penthouse units',
    icon: Package
  },
  {
    id: 'pricing',
    title: 'Per-Unit Pricing Ranges',
    description: 'Transparent cost breakdowns by unit type and automation level',
    icon: DollarSign
  },
  {
    id: 'handover-docs',
    title: 'Handover Documentation',
    description: 'Sample handover packs that delight buyers and reduce support calls',
    icon: FileText
  },
  {
    id: 'brochure-inserts',
    title: 'Sales Brochure Inserts',
    description: 'Professional marketing materials to showcase smart features',
    icon: BadgeCheck
  },
  {
    id: 'smart-certification',
    title: 'Smart-Ready Certification',
    description: 'Official badge to differentiate your development',
    icon: Award
  }
]

const projectScales = [
  { id: 'small', label: '< 50 units' },
  { id: 'medium', label: '50-200 units' },
  { id: 'large', label: '200-500 units' },
  { id: 'mega', label: '500+ units' }
]

const timelines = [
  { id: 'planning', label: 'Planning Phase' },
  { id: 'design', label: 'Design Phase' },
  { id: 'construction', label: 'Under Construction' },
  { id: 'nearing', label: 'Nearing Handover' }
]

export default function DevelopersPage() {
  const cms = useCms('page_developers', null) as any

  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_scale: '',
    units_count: '',
    timeline: '',
    message: ''
  })

  const handleResourceClick = (resourceId: string) => {
    setSelectedResource(resourceId)
    setShowSuccess(false)
  }

  const handleClose = () => {
    setSelectedResource(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      project_scale: '',
      units_count: '',
      timeline: '',
      message: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const resource = resources.find(r => r.id === selectedResource)
      const response = await fetch(`${BACKEND_URL}/api/developers/toolkit-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          units_count: formData.units_count ? parseInt(formData.units_count) : null,
          resource_type: resource?.title || selectedResource
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setShowSuccess(true)
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedResourceData = resources.find(r => r.id === selectedResource)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="developers-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=50" alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">For Developers</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="developers-title">
              Developer Toolkit
            </h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto">
              Speak ROI, not features. Add smart-home value to every unit. Stand out. Sell faster. Command premium.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><TrendingUp size={16} className="text-[#C9A962]" /><span>Sales Premium</span></div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-[#C9A962]" /><span>Faster Handover</span></div>
              <div className="flex items-center gap-2"><Award size={16} className="text-[#C9A962]" /><span>Certification Badge</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 ">Smart Homes = Value-Add, Not Expense</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
              Turn automation into a sales advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200"
            >
              <TrendingUp size={40} className="text-black mb-4" />
              <h3 className="text-2xl font-bold mb-2">10-15% Sales Premium</h3>
              <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                Smart-ready units command higher prices and sell faster
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200"
            >
              <Clock size={40} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Reduce Support Calls</h3>
              <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                Proper documentation = fewer post-handover issues
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#C9A962]/5 to-[#A68B4B]/5 rounded-2xl p-8 border-2 border-[#C9A962]/20"
            >
              <Award size={40} className="text-[#C9A962] mb-4" />
              <h3 className="text-2xl font-bold mb-2">Market Differentiation</h3>
              <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                Smart-Ready badge sets you apart from competition
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 ">Developer Resources</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Everything you need to add smart-home value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <button
                    onClick={() => handleResourceClick(resource.id)}
                    className="w-full bg-white border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-blue-600 hover:shadow-2xl transition-all transform hover:scale-105 text-left"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100">
                      <resource.icon size={32} className="text-blue-600" />
                    </div>

                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>

                    <div className="text-black font-semibold group-hover:underline">
                      Request Access →
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-12 text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 ">
              Ready to Add Value to Your Development?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get sample packages and pricing for your project
            </p>
            <Button
              size="lg"
              onClick={() => setSelectedResource('unit-packages')}
              className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 px-10 py-7 text-lg font-semibold uppercase tracking-widest"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {showSuccess ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                  Our development partnerships team will send you the requested resources and schedule a call to discuss your project.
                </p>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                  Check your email at <strong>{formData.email}</strong>
                </p>
              </div>
            ) : (
              <>
                <div className="p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl font-bold mb-2 ">{selectedResourceData?.title}</h2>
                  <p className="text-gray-300">{selectedResourceData?.description}</p>
                </div>

                <form aria-label="Form" onSubmit={handleSubmit} className="p-8 space-y-6">
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 border-l-4 border-black p-4 rounded">
                    Fill in your details and our partnerships team will send you comprehensive resources tailored to your development.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Company Name *
                      </label>
                      <Input
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your development company"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Project Scale *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {projectScales.map((scale) => (
                        <button
                          key={scale.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, project_scale: scale.label })}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                            formData.project_scale === scale.label
                              ? 'border-black bg-gray-50 text-black'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {scale.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Number of Units (Optional)
                    </label>
                    <Input
                      type="number"
                      value={formData.units_count}
                      onChange={(e) => setFormData({ ...formData, units_count: e.target.value })}
                      placeholder="e.g., 150"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Project Timeline *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: timeline.label })}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                            formData.timeline === timeline.label
                              ? 'border-black bg-gray-50 text-black'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {timeline.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Project Details (Optional)
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your development..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.project_scale || !formData.timeline}
                      className="flex-1 bg-black hover:bg-gray-800 uppercase tracking-widest"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Resources'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
