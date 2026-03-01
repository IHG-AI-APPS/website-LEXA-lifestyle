'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Truck,
  Clock,
  FileText,
  Users,
  Wrench,
  DollarSign,
  Check,
  X,
  Zap,
  Shield,
  Home,
  Lightbulb,
  Camera,
  Music,
  Wind,
  Lock
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const systems = [
  { id: 'lighting', label: 'Smart Lighting', icon: Lightbulb },
  { id: 'security', label: 'Security Systems', icon: Shield },
  { id: 'audio', label: 'Multi-Room Audio', icon: Music },
  { id: 'surveillance', label: 'CCTV & Surveillance', icon: Camera },
  { id: 'hvac', label: 'Climate Control', icon: Wind },
  { id: 'access', label: 'Access Control', icon: Lock },
  { id: 'automation', label: 'Full Automation', icon: Home },
  { id: 'networking', label: 'Networking & IT', icon: Zap }
]

const projectTypes = [
  { id: 'residential', label: 'Residential Villa' },
  { id: 'apartment', label: 'Apartment Complex' },
  { id: 'commercial', label: 'Commercial Office' },
  { id: 'retail', label: 'Retail / Hospitality' },
  { id: 'other', label: 'Other' }
]

const timelines = [
  { id: 'immediate', label: 'Immediate (0-2 weeks)' },
  { id: 'short', label: 'Short-term (2-4 weeks)' },
  { id: 'medium', label: 'Medium-term (1-3 months)' },
  { id: 'long', label: 'Long-term (3+ months)' }
]

export default function ContractorsPage() {
  const cms = useCms('page_contractors', null) as any

  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    systems_needed: [] as string[],
    project_timeline: '',
    message: ''
  })

  const toggleSystem = (systemId: string) => {
    setFormData(prev => ({
      ...prev,
      systems_needed: prev.systems_needed.includes(systemId)
        ? prev.systems_needed.filter(s => s !== systemId)
        : [...prev.systems_needed, systemId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${BACKEND_URL}/api/contractors/project-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setShowSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setShowForm(false)
    setShowSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      project_type: '',
      systems_needed: [],
      project_timeline: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="contractors-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">For Contractors</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="contractors-title">
              Contractor Project Desk
            </h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto">
              We coordinate MEP + Automation. Fast BOQ turnaround. Dedicated PM assigned. Zero headache.
            </p>
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 px-8 font-semibold mb-6"
            >
              Start Your Project
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Check size={16} className="text-[#C9A962]" /><span>Fast BOQ Turnaround</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-[#C9A962]" /><span>MEP Coordination</span></div>
              <div className="flex items-center gap-2"><Check size={16} className="text-[#C9A962]" /><span>Dedicated PM</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contractors Choose LEXA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 ">Speed + Simplicity + Support</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                We make automation easy for contractors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Clock size={32} className="text-gallery-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Response</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  BOQ and scope within 24-48 hours
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <FileText size={32} className="text-gallery-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Clear Scope</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Detailed breakdown, no hidden costs
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Users size={32} className="text-gallery-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">Dedicated PM</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Single point of contact throughout
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Wrench size={32} className="text-gallery-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">MEP Coordination</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We handle all MEP + automation coordination
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 ">What We Deliver</h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign size={24} className="text-gallery-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Comprehensive BOQ</h3>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Detailed Bill of Quantities with material specs, labor, and timelines
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-gallery-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Coordinated Scope</h3>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Clear scope with MEP coordination points and installation sequence
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-gallery-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Project Management</h3>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Dedicated PM from start to handover with regular updates
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wrench size={24} className="text-gallery-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Professional Installation</h3>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    Certified technicians with proper commissioning and testing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-12 text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 ">
              Ready to Simplify Your Next Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get your coordinated scope and BOQ within 48 hours
            </p>
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 px-10 py-7 text-lg font-semibold uppercase tracking-widest"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full my-8"
          >
            {showSuccess ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Project Request Received!</h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                  Your dedicated Project Manager will contact you within 24 hours with a comprehensive BOQ and project timeline.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Check your email at <strong>{formData.email}</strong>
                </p>
                <Button onClick={handleClose} className="bg-black hover:bg-gray-800 uppercase tracking-widest">
                  Close
                </Button>
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
                  <h2 className="text-3xl font-bold mb-2 ">Start Your Project</h2>
                  <p className="text-gray-300">Fill in the details and get your BOQ within 48 hours</p>
                </div>

                <form aria-label="Form" onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
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
                        placeholder="Your contracting company"
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
                      Project Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, project_type: type.label })}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                            formData.project_type === type.label
                              ? 'border-black bg-gray-50 text-black'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Systems Needed * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {systems.map((system) => (
                        <button
                          key={system.id}
                          type="button"
                          onClick={() => toggleSystem(system.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            formData.systems_needed.includes(system.id)
                              ? 'border-black bg-gray-50'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <system.icon size={24} className={formData.systems_needed.includes(system.id) ? 'text-black mb-2' : 'text-gray-400 mb-2'} />
                          <p className="text-xs font-medium">{system.label}</p>
                        </button>
                      ))}
                    </div>
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
                          onClick={() => setFormData({ ...formData, project_timeline: timeline.label })}
                          className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                            formData.project_timeline === timeline.label
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
                      Additional Details
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
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
                      disabled={isSubmitting || formData.systems_needed.length === 0 || !formData.project_type || !formData.project_timeline}
                      className="flex-1 bg-black hover:bg-gray-800 uppercase tracking-widest"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Project Request'}
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
