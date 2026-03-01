'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, FileText, Package, Award, CheckCircle2, Lock, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const ICON_MAP: Record<string, any> = { Award, FileText, Package, Download, Lock }

const fallback = {
  hero_title: 'Developer Partner Toolkit',
  hero_description: 'Exclusive resources to sell smart-ready units faster. Turn automation into a sales advantage.',
  access_label: 'PRIVATE ACCESS FOR DEVELOPER PARTNERS',
  benefits: [
    'Differentiate your development with Smart-Ready certification',
    'Increase unit values by 10-15% with automation packages',
    'Reduce post-handover support calls',
    'Accelerate sales cycle with ready-to-use materials',
    'Technical support for your sales team',
    'Co-branded marketing opportunities',
  ],
  toolkit_resources: [
    { title: 'Smart-Ready Certification Badge', description: 'Official LEXA Smart-Ready badge for your marketing materials and unit specifications', formats: ['PNG', 'SVG', 'EPS'], color: 'from-yellow-500 to-orange-500' },
    { title: 'Sample Floorplan Automation Layouts', description: 'Standard automation layouts for 1BR, 2BR, 3BR, and penthouse units with device placement', formats: ['DWG', 'PDF'], color: 'from-blue-500 to-cyan-500' },
    { title: 'Marketing Brochure Inserts', description: 'Professional insert pages showcasing smart home features for your sales brochures', formats: ['PDF', 'InDesign'], color: 'from-[#C9A962] to-[#A68B4B]' },
    { title: 'Sales Team Talking Points', description: 'Key benefits, FAQs, and objection handling for your sales representatives', formats: ['PDF', 'PPT'], color: 'from-green-500 to-teal-500' },
    { title: 'Unit Upgrade Options Sheet', description: 'Tiered automation packages (Silver/Gold/Platinum) with pricing for buyer upgrades', formats: ['PDF', 'XLSX'], color: 'from-red-500 to-pink-500' },
    { title: 'Client Presentation PDF', description: 'Professional presentation deck explaining automation value proposition', formats: ['PDF', 'PPT'], color: 'from-slate-500 to-zinc-600' },
  ],
  partnership_steps: [
    { num: '1', title: 'Initial Meeting', description: 'Schedule a developer partnership consultation. We review your project, unit types, and target market.' },
    { num: '2', title: 'Package Design', description: 'We create tiered automation packages (Silver/Gold/Platinum) tailored to your units and price points.' },
    { num: '3', title: 'Toolkit Access', description: 'Receive full access to marketing materials, technical docs, and Smart-Ready certification for your project.' },
    { num: '4', title: 'Sales Enablement', description: 'We train your sales team on automation value proposition and handle technical queries from buyers.' },
    { num: '5', title: 'Installation & Handover', description: 'We handle all installations, commissioning, and buyer handover documentation. Post-sale support included.' },
  ],
  access_requirements: [
    'Active real estate development license in UAE',
    'Minimum 50 units under development or planned',
    'Valid trade license and developer credentials',
  ],
}

export default function DeveloperToolkitContent() {
  const cms = useCms('page_developer_toolkit', fallback)

  const heroTitle = cms?.hero_title || fallback.hero_title
  const heroDesc = cms?.hero_description || fallback.hero_description
  const accessLabel = cms?.access_label || fallback.access_label
  const benefits = cms?.benefits?.length ? cms.benefits : fallback.benefits
  const resources = cms?.toolkit_resources?.length ? cms.toolkit_resources : fallback.toolkit_resources
  const steps = cms?.partnership_steps?.length ? cms.partnership_steps : fallback.partnership_steps
  const requirements = cms?.access_requirements?.length ? cms.access_requirements : fallback.access_requirements

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="developer-toolkit-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Lock size={28} strokeWidth={2} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="toolkit-title">{heroTitle}</h1>
            <p className="text-base text-gray-300 mb-6 max-w-lg mx-auto">{heroDesc}</p>
            <span className="inline-block bg-[#C9A962] text-gray-900 px-5 py-2 rounded-full font-bold text-xs tracking-wider">{accessLabel}</span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Advantages</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Why Developers Partner With LEXA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="text-[#C9A962] flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit Resources */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Resources</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What&apos;s In The Toolkit</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r: any, i: number) => (
                <div key={i} className="bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${r.color || 'from-gray-500 to-gray-600'}`}>
                    <FileText size={24} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{r.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(r.formats || []).map((f: string) => (
                      <span key={f} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><Download size={14} /><span>Request access</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Steps */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Process</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">How The Partnership Works</h2>
            </div>
            <div className="space-y-6">
              {steps.map((s: any, i: number) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-900 dark:bg-[#C9A962] text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold text-base">{s.num}</div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Access Request CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Get Started</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Request Toolkit Access</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">Available to verified real estate developers with active projects in UAE</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6 text-left max-w-md mx-auto">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Lock size={16} /> Access Requirements</h3>
              <ul className="space-y-2 text-gray-300 text-xs">
                {requirements.map((r: string, i: number) => (<li key={i}>- {r}</li>))}
              </ul>
            </div>
            <Link href="/developers">
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8">
                Request Toolkit Access <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <p className="text-xs text-gray-500 mt-4">Our partnerships team will review your request within 24 hours</p>
          </div>
        </div>
      </section>
    </div>
  )
}
