'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Download, 
  Boxes,
  Cable,
  Lightbulb,
  FileSpreadsheet,
  FileCode,
  Zap,
  X,
  Check,
  Building2
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const resources = [
  {
    id: 'wiring-diagrams',
    title: 'Typical Wiring Diagrams',
    description: 'Standard wiring layouts for KNX, Control4, and hybrid systems',
    icon: Cable,
    color: 'from-blue-500 to-cyan-500',
    formats: ['DWG', 'PDF', 'Visio']
  },
  {
    id: 'shop-drawings',
    title: 'Sample Shop Drawings',
    description: 'Detailed installation drawings with dimensions and specifications',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
    formats: ['DWG', 'PDF', 'Revit']
  },
  {
    id: 'lighting-layouts',
    title: 'Lighting Control Layouts',
    description: 'DALI, DMX, and smart lighting control schematics',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    formats: ['DWG', 'PDF']
  },
  {
    id: 'boq-templates',
    title: 'BOQ Templates',
    description: 'Bill of Quantities templates for automation projects',
    icon: FileSpreadsheet,
    color: 'from-green-500 to-teal-500',
    formats: ['XLSX', 'CSV']
  },
  {
    id: 'spec-blocks',
    title: 'Specification Text Blocks',
    description: 'Ready-to-use technical specifications for drawings',
    icon: FileCode,
    color: 'from-red-500 to-pink-500',
    formats: ['DOCX', 'TXT']
  },
  {
    id: 'cad-symbols',
    title: 'Revit / CAD Symbols',
    description: 'Device symbols and families for all major systems',
    icon: Boxes,
    color: 'from-indigo-500 to-purple-500',
    formats: ['RFA', 'DWG', 'DXF']
  }
]

export default function ArchitectsPage() {
  const cms = useCms('page_architects', null)

  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
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
      message: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const resource = resources.find(r => r.id === selectedResource)
      const response = await fetch(`${BACKEND_URL}/api/architects/resource-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white/10 backdrop-blur-sm rounded-full">
                <Building2 size={36} strokeWidth={2} />
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 ">
                Architect Resource Portal
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Technical resources designed by engineers, for architects. Get the drawings, specs, and details you need for seamless automation integration.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-green-400" />
                  <span>No Gated Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-green-400" />
                  <span>Industry Standard Formats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-green-400" />
                  <span>Professional Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 ">Technical Resources</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Click on any resource to request instant access
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
                    className="w-full bg-white border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-black hover:shadow-2xl transition-all transform hover:scale-105 text-left"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${resource.color}`}>
                      <resource.icon size={32} className="text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {resource.formats.map((format) => (
                        <span
                          key={format}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full"
                        >
                          {format}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center text-black font-semibold group-hover:underline">
                      <span>Request Access</span>
                      <Download size={20} className="ml-2" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose LEXA */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 ">Why Architects Trust LEXA</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                We speak your language - technical, precise, reliable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Turnaround</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get resources within hours, not days
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                  <FileText size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Detailed Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete specs with all technical details
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                  <Building2 size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Project Support</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Dedicated engineer for technical queries
                </p>
              </div>
            </div>
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
                  Our project engineer will send you the resources within the next few hours.
                </p>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                  Check your email at <strong>{formData.email}</strong>
                </p>
              </div>
            ) : (
              <>
                <div className={`p-8 bg-gradient-to-r ${selectedResourceData?.color} text-white relative`}>
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl font-bold mb-2 ">{selectedResourceData?.title}</h2>
                  <p className="text-white/90">{selectedResourceData?.description}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <p className="text-gray-700 dark:text-gray-300 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    Fill in your details and our project engineer will send you the requested resources along with technical support.
                  </p>

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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your design firm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Project Details (Optional)
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project requirements..."
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
                      disabled={isSubmitting}
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
