import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, DollarSign } from 'lucide-react'
import { generateHowToSchema } from '@/lib/seo'
import { generateCmsMetadata } from '@/lib/cmsMetadata'
import CmsReg from './CmsReg'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_resources', {
    title: 'How to Install Smart Home in Dubai | 8-Step Installation Guide | LEXA',
    description: 'Complete step-by-step guide to installing smart home automation in Dubai. From consultation to commissioning. Timeline, costs, and expert tips from 500+ projects.',
    alternates: {
      canonical: 'https://cms-integration-dev.preview.emergentagent.com/guides/how-to-install-smart-home-dubai'
    }
  })
}

const guideData = {
  name: 'How to Install a Smart Home System in Dubai - 8 Steps',
  description: 'Professional installation guide for smart home automation in Dubai villas and apartments. Covers consultation, design, wiring, installation, programming, and commissioning.',
  totalTime: 'P6W',
  estimatedCost: { min: 80000, max: 400000 },
  steps: [
    {
      name: 'Schedule Free Consultation',
      text: 'Contact LEXA Lifestyle for free on-site consultation in Dubai. Experts assess your property, discuss lifestyle needs, recommend systems (Control4, Crestron, KNX), provide detailed proposal with timeline and budget. Consultation covers: property assessment, system recommendations, preliminary design, cost estimate, project timeline.'
    },
    {
      name: 'Design & System Planning',
      text: 'Engineers create customized system design: electrical drawings, equipment schedules, integration plans. Covers lighting zones, climate control, security placement, AV equipment, network infrastructure. Design approval takes 1-2 weeks. Includes 3D visualizations and detailed specifications.'
    },
    {
      name: 'Pre-Wiring & Infrastructure',
      text: 'For new construction, pre-wiring installed during rough-in phase. Includes cables for lighting control, speakers, cameras, sensors, network. Coordinate with main contractor. Pre-wiring takes 2-3 weeks. Critical for future-proofing your Dubai villa or apartment.'
    },
    {
      name: 'Equipment Installation',
      text: 'Install all smart home equipment: central processor, touch panels, keypads, speakers, cameras, sensors, AV gear. Equipment rack assembly, testing, labeling. Takes 2-4 weeks depending on property size. Includes quality control checks at each phase.'
    },
    {
      name: 'System Programming',
      text: 'Program Control4 or Crestron with your preferences: lighting scenes, climate schedules, security rules, AV configurations, voice commands (English & Arabic). Custom interface design for touch panels and mobile apps. Programming takes 1-2 weeks with multiple iterations based on feedback.'
    },
    {
      name: 'Testing & Commissioning',
      text: 'Comprehensive system testing: all subsystems, integration points, automation scenarios, remote access. Final adjustments and optimization. Commissioning takes 3-5 days with your presence. Ensures everything works perfectly before handover.'
    },
    {
      name: 'User Training & Handover',
      text: 'Detailed training for family/staff on operating smart home system. Covers daily use, voice commands (Arabic/English), mobile app, troubleshooting, emergency procedures. Documentation: system diagrams, user manuals, support contacts. Training takes 2-4 hours, additional sessions available.'
    },
    {
      name: 'Ongoing Support & Maintenance',
      text: 'LEXA provides 24/7 support, remote diagnostics, software updates, annual maintenance. Optional packages from AED 5,000/year. 2-year warranty on installation. Ensures smart home stays updated and operates flawlessly in Dubai climate year-round.'
    }
  ]
}

export default function HowToInstallPage() {
  const schema = generateHowToSchema(guideData)

  return (
    <>
      <CmsReg />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="min-h-screen bg-white dark:bg-[#050505]">
        <header className="bg-gradient-to-br from-black to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E8DCC8] mb-6 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{guideData.name}</h1>
            <p className="text-xl text-gray-300 mb-6">{guideData.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#E8DCC8]" />
                <span>6-8 Weeks Average Timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#E8DCC8]" />
                <span>AED 80,000 - 400,000 Investment</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="space-y-12">
            {guideData.steps.map((step, index) => (
              <div key={index} className="flex gap-6 pb-12 border-b border-gray-200 dark:border-zinc-800 last:border-0">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8DCC8] to-[#c8b89c] text-black font-bold flex items-center justify-center text-xl shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.name}</h2>
                  <p className="text-gray-600 dark:text-zinc-500 leading-relaxed text-lg">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Start Your Smart Home Project Today</h3>
            <p className="text-gray-300 mb-6">
              Contact LEXA Lifestyle for a free consultation and personalized quote for your Dubai property
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-block px-8 py-3 bg-[#E8DCC8] text-black font-semibold rounded-lg hover:bg-[#d4c8b4] transition text-center">
                Book Free Consultation
              </Link>
              <Link href="/calculator" className="inline-block px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition text-center">
                Calculate Your Cost
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
