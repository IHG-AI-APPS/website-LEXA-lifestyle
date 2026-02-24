'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Download, FileText, Layers, Calculator, Wrench, ArrowRight, X, CheckCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ArchitectResourcePortalPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [selectedResource, setSelectedResource] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    resource_type: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleResourceRequest = (resourceType: string) => {
    setSelectedResource(resourceType)
    setFormData({ ...formData, resource_type: resourceType })
    setShowResourceForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${BACKEND_URL}/api/architects/resource-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to submit request')

      setSubmitStatus('success')
      setTimeout(() => {
        setShowResourceForm(false)
        setFormData({ name: '', email: '', phone: '', company: '', resource_type: '', message: '' })
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resources = [
    {
      icon: FileText,
      title: 'CAD Blocks Library',
      description: 'AutoCAD and Revit families for all LEXA systems. Accurate dimensions, electrical loads, and mounting specs.',
      resourceType: 'cad_blocks',
      fileCount: '500+ blocks'
    },
    {
      icon: Layers,
      title: 'Technical Spec Sheets',
      description: 'Detailed specifications for lighting, audio, video, climate, and security systems with UAE compliance.',
      resourceType: 'spec_sheets',
      fileCount: '200+ specs'
    },
    {
      icon: Calculator,
      title: 'System Sizing Calculator',
      description: 'Interactive tool to calculate equipment requirements based on room dimensions and client needs.',
      resourceType: 'sizing_calculator',
      fileCount: 'Online tool'
    },
    {
      icon: Wrench,
      title: 'Installation Guidelines',
      description: 'Best practices for coordination with MEP, AV rough-in checklists, and handover procedures.',
      resourceType: 'installation_guide',
      fileCount: '50+ guides'
    }
  ]

  const partnerTiers = [
    { tier: 'Registered', discount: '5%', requirements: '1+ project', benefits: ['Resource access', 'Email support'] },
    { tier: 'Silver Partner', discount: '10%', requirements: '3+ projects', benefits: ['Priority support', 'Co-marketing'] },
    { tier: 'Gold Partner', discount: '15%', requirements: '10+ projects', benefits: ['Dedicated account manager', 'Joint presentations', 'Project listing'] },
  ]

  const benefits = [
    'Early coordination prevents costly redesigns',
    'Pre-approved systems simplify specification',
    'Client confidence with turnkey technology partner',
    'Post-occupancy support reduces callbacks'
  ]

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920"
            alt="Architecture workspace"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60' 
              : 'bg-gradient-to-t from-white via-white/80 to-white/40'
          }`} />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`inline-block mb-6 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] ${
              isDark 
                ? 'bg-[#C9A962]/20 text-[#C9A962]' 
                : 'bg-[#C9A962] text-white'
            }`}>
              For Architects & Design Studios
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Technical Resources
              <br />
              <span className="text-[#C9A962]">For Smart Design</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              CAD blocks, spec sheets, and coordination tools to seamlessly integrate automation into your architectural projects.
            </p>
            <Button
              size="lg"
              className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-10 py-6 text-sm font-semibold uppercase tracking-wider rounded-xl"
              onClick={() => handleResourceRequest('general_inquiry')}
            >
              Request Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* AVAILABLE RESOURCES */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-[#C9A962]">Technical Resources</span> Library
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Everything you need to design, specify, and coordinate LEXA systems in your architectural projects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-8 rounded-2xl border transition-all hover:shadow-lg ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 hover:border-[#C9A962]' 
                        : 'bg-white border-gray-200 hover:border-[#C9A962]'
                    }`}
                  >
                    <Icon size={40} className="text-[#C9A962] mb-4" strokeWidth={1.5} />
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{resource.title}</h3>
                    <p className={`leading-relaxed mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{resource.description}</p>
                    <p className="text-sm text-[#C9A962] font-medium mb-4">{resource.fileCount}</p>
                    <Button
                      variant="outline"
                      className="border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-white rounded-lg"
                      onClick={() => handleResourceRequest(resource.resourceType)}
                    >
                      <Download className="mr-2" size={18} />
                      Request Access
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHY COORDINATE WITH LEXA */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Why Architects <span className="text-[#C9A962]">Partner with LEXA</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-5 rounded-xl ${
                    isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                  }`}
                >
                  <CheckCircle size={24} className="text-[#C9A962] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER TIERS */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/30' : 'bg-[#C9A962]/5'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-[#C9A962]">Partner Program</span> Tiers
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Unlock exclusive benefits as you grow with LEXA
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {partnerTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl border text-center ${
                    index === 2 
                      ? 'bg-[#C9A962] border-[#C9A962] text-white' 
                      : isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${
                    index === 2 ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                  }`}>{tier.tier}</h3>
                  <div className={`text-4xl font-bold mb-2 ${
                    index === 2 ? 'text-white' : 'text-[#C9A962]'
                  }`}>{tier.discount}</div>
                  <p className={`text-sm mb-4 ${
                    index === 2 ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>Partner discount</p>
                  <p className={`text-sm mb-6 ${
                    index === 2 ? 'text-white/70' : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>Requirement: {tier.requirements}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className={`text-sm flex items-center gap-2 justify-center ${
                        index === 2 ? 'text-white/90' : isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <CheckCircle size={16} className={index === 2 ? 'text-white' : 'text-[#C9A962]'} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL COORDINATION CTA */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-10 md:p-14 text-center ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200'
              }`}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-5 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Need <span className="text-[#C9A962]">Technical Coordination</span>?
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Our engineering team can review your drawings, suggest optimal system placement, and coordinate with MEP consultants.
              </p>
              <Button
                size="lg"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-10 py-6 text-sm font-semibold uppercase tracking-wider rounded-xl"
                onClick={() => handleResourceRequest('technical_coordination')}
              >
                Request Technical Review
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Projects Designed with <span className="text-[#C9A962]">LEXA Integration</span>
              </h2>
              <p className={`text-lg max-w-3xl mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Collaborations with leading architectural firms across the UAE.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Palm Jumeirah Villa', firm: 'Studio X Architects', systems: '12 integrated systems', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
                { name: 'Emirates Hills Estate', firm: 'Design Atelier', systems: '15 integrated systems', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
                { name: 'Downtown Penthouse', firm: 'Modern Design Co.', systems: '9 integrated systems', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' }
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl overflow-hidden border transition-all hover:shadow-lg ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <SafeImage
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className={`text-lg font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{project.name}</h3>
                    <p className={`text-sm mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{project.firm}</p>
                    <p className="text-sm text-[#C9A962] font-medium">{project.systems}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCE REQUEST MODAL */}
      {showResourceForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowResourceForm(false)} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <button
              onClick={() => setShowResourceForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-2"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Architect Resources
              </h2>
              <p className="text-gray-600 mb-8">
                Fill in your details and we&apos;ll send the requested resources to your email within 24 hours.
              </p>

              {submitStatus === 'success' ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We&apos;ll send your requested resources within 24 hours. Check your email inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Firm/Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-lg"
                        placeholder="Architecture firm name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resource Needed *</label>
                    <select
                      required
                      value={formData.resource_type}
                      onChange={(e) => setFormData({ ...formData, resource_type: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#C9A962] focus:border-[#C9A962]"
                    >
                      <option value="">Select resource...</option>
                      <option value="cad_blocks">CAD Blocks Library</option>
                      <option value="spec_sheets">Technical Spec Sheets</option>
                      <option value="sizing_calculator">System Sizing Calculator</option>
                      <option value="installation_guide">Installation Guidelines</option>
                      <option value="technical_coordination">Technical Coordination Request</option>
                      <option value="general_inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Details (Optional)</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your project and specific requirements..."
                      className="w-full rounded-lg"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                      Failed to submit request. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C9A962] hover:bg-[#B8994D] text-white py-6 text-sm font-semibold uppercase tracking-wider rounded-xl"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
