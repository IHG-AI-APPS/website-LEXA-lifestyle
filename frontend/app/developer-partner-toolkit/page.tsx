'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Award,
  FileText, 
  Download, 
  CheckCircle2,
  Building2,
  Users,
  Settings,
  Package,
  Lock,
  Shield
} from 'lucide-react'
import { useCms } from '@/hooks/useCms'

export default function DeveloperPartnerToolkitPage() {
  const cms = useCms('page_developer_partner_toolkit', null)

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessCode, setAccessCode] = useState('')

  const handleUnlock = () => {
    // Simple access code check - in production, this should be a proper auth flow
    if (accessCode.toLowerCase() === 'lexadev2026' || accessCode.toLowerCase() === 'developer') {
      setIsUnlocked(true)
    } else {
      alert('Invalid access code. Please contact sales@lexalifestyle.com for access.')
    }
  }

  const resources = [
    {
      category: 'Technical Specifications',
      icon: FileText,
      items: [
        { name: 'KNX Integration Guide', size: '2.4 MB', format: 'PDF' },
        { name: 'Control4 System Specs', size: '1.8 MB', format: 'PDF' },
        { name: 'Crestron Programming Standards', size: '3.2 MB', format: 'PDF' },
        { name: 'Network Infrastructure Requirements', size: '1.5 MB', format: 'PDF' }
      ]
    },
    {
      category: 'Design Resources',
      icon: Package,
      items: [
        { name: 'Standard Floorplan Layouts', size: '5.6 MB', format: 'DWG' },
        { name: 'MEP Coordination Templates', size: '4.2 MB', format: 'DWG' },
        { name: 'Equipment Room Specifications', size: '2.1 MB', format: 'PDF' },
        { name: 'Wiring Schematics Library', size: '8.3 MB', format: 'ZIP' }
      ]
    },
    {
      category: 'Certification & Compliance',
      icon: Award,
      items: [
        { name: 'CEDIA Certification Badge', size: '0.5 MB', format: 'PNG' },
        { name: 'Dubai Municipality Approvals', size: '1.2 MB', format: 'PDF' },
        { name: 'Manufacturer Partnerships List', size: '0.8 MB', format: 'PDF' },
        { name: 'Warranty & Support Terms', size: '1.1 MB', format: 'PDF' }
      ]
    },
    {
      category: 'Project Management',
      icon: Settings,
      items: [
        { name: 'Standard Project Timeline', size: '0.6 MB', format: 'PDF' },
        { name: 'Milestone Checklist Template', size: '0.4 MB', format: 'XLSX' },
        { name: 'Handover Documentation Kit', size: '2.8 MB', format: 'ZIP' },
        { name: 'Client Training Materials', size: '3.5 MB', format: 'PDF' }
      ]
    }
  ]

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20" data-testid="developer-partner-toolkit-locked">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-28">
          <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Protected Resource</span>
              <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight">
                Developer Partner Toolkit
              </h1>
              <p className="text-base text-gray-300 mb-10 max-w-lg mx-auto">
                Technical resources and project enablement materials for real estate developers and master planners
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-md mx-auto">
                <Lock className="w-10 h-10 mx-auto mb-4 text-[#C9A962]" />
                <h2 className="text-xl font-bold mb-2">Access Required</h2>
                <p className="text-sm text-gray-400 mb-6">
                  This toolkit is exclusively for verified developer partners. Enter your access code to continue.
                </p>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <Button 
                    onClick={handleUnlock}
                    size="lg"
                    className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold"
                  >
                    Unlock Toolkit
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500">
                    Don&apos;t have access? Contact{' '}
                    <a href="mailto:sales@lexalifestyle.com" className="text-[#C9A962] hover:underline">sales@lexalifestyle.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              For Developer Partners
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Technical Resource Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Complete project enablement materials for seamless integration of LEXA smart home systems into your developments.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Award,
              title: 'CEDIA Certified',
              description: 'Industry-leading standards and manufacturer partnerships'
            },
            {
              icon: Users,
              title: 'Dedicated PM',
              description: 'Single point of contact from design to handover'
            },
            {
              icon: CheckCircle2,
              title: 'Turnkey Delivery',
              description: 'Complete system integration with zero developer hassle'
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <benefit.icon className="w-10 h-10 mb-4 text-black" />
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Resources */}
        <div className="space-y-12">
          {resources.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {item.format}
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-black transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Need Custom Integration Support?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Our developer partnerships team can provide project-specific consultations and custom technical documentation.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800">
            Schedule Developer Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
