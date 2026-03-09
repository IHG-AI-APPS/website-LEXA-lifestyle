'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { useCms } from '@/hooks/useCms'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: string
  description?: string
  experience_level?: string
  is_active: boolean
}

export default function CareersContent() {
  const cms = useCms('page_careers', null) as any
  const { settings } = useSiteSettings()
  const [positions, setPositions] = useState<JobPosition[]>([])
  const [loading, setLoading] = useState(true)

  // Dynamic contact info from settings
  const hrEmail = settings.hr_email || 'careers@lexalifestyle.com'
  const companyPhone = settings.contact_phone || '+971 50 326 7228'
  const companyAddress = settings.contact_address || 'Al Quoz 1, Sheikh Zayed Road, 3rd Interchange, Dubai, UAE'

  const fallback = {
    hero_title: 'Join Our Team',
    hero_description: "Be part of a team that's redefining smart luxury living across the Middle East. We're looking for passionate individuals to shape the future of home automation and AV integration.",
    benefits: [
      { title: 'Innovation & Excellence', description: 'Work with cutting-edge technologies from world-leading brands like Savant, Crestron, Bowers & Wilkins, and Sony.' },
      { title: 'Growth & Learning', description: 'Continuous training, certifications, and career development opportunities in smart home and AV technologies.' },
      { title: 'Prestigious Projects', description: 'Work on high-end residential villas, luxury hotels, and commercial projects across Dubai and the UAE.' },
    ],
    how_to_apply_intro: "Interested in joining our team? We'd love to hear from you.",
    how_to_apply_steps: [
      'Review the open positions above',
      'Prepare your CV/resume and portfolio (if applicable)',
      `Send your application to ${hrEmail}`,
      'Include the position title in your email subject line',
    ],
  }

  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await fetch(`${API_URL}/api/careers`)
        if (response.ok) {
          const data = await response.json()
          setPositions(data)
        }
      } catch (error) {
        console.error('Error fetching positions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPositions()
  }, [])

  const heroTitle = cms?.hero_title || fallback.hero_title
  const heroDesc = cms?.hero_description || fallback.hero_description
  const benefits = cms?.benefits?.length ? cms.benefits : fallback.benefits
  const applyIntro = cms?.how_to_apply_intro || fallback.how_to_apply_intro
  const applySteps = [
    'Review the open positions above',
    'Prepare your CV/resume and portfolio (if applicable)',
    `Send your application to ${hrEmail}`,
    'Include the position title in your email subject line',
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="careers-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Careers</span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="careers-title">{heroTitle}</h1>
            <p className="hero-animate-desc text-sm sm:text-base text-gray-300 max-w-lg mx-auto">{heroDesc}</p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why LEXA Lifestyle?</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Benefits of Joining</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {benefits.map((b: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-500">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]" data-testid="positions-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Open Positions</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#C9A962]" />
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#050505] rounded-xl border border-gray-100 dark:border-zinc-800">
                <Briefcase className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-zinc-400">No open positions at the moment.</p>
                <p className="text-sm text-gray-500 dark:text-zinc-500 mt-2">Please check back later or send your CV to <a href={`mailto:${hrEmail}`} className="text-[#C9A962] hover:underline">{hrEmail}</a></p>
              </div>
            ) : (
              <div className="space-y-4">
                {positions.map((job, i) => (
                  <div key={job.id} className="bg-white dark:bg-[#050505] p-5 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-[#C9A962]/40 transition-colors" data-testid={`position-${i}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Briefcase size={14} />{job.department}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={14} />{job.type}</span>
                          {job.experience_level && (
                            <span className="px-2 py-0.5 bg-[#C9A962]/10 text-[#C9A962] rounded-full">{job.experience_level}</span>
                          )}
                        </div>
                      </div>
                      <Link href={`/contact?position=${encodeURIComponent(job.title)}`}>
                        <Button size="sm" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold">
                          Apply Now <ArrowRight className="ml-1" size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Application</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">How to Apply</h2>
            <p className="text-sm text-gray-600 dark:text-zinc-500 mb-6">{applyIntro}</p>
            <ol className="space-y-3 mb-8">
              {applySteps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-zinc-400">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A962]/15 text-[#C9A962] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="bg-gray-50 dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-500 mb-1"><strong>Email:</strong> <a href={`mailto:${hrEmail}`} className="text-[#C9A962] hover:underline">{hrEmail}</a></p>
              <p className="text-sm text-gray-600 dark:text-zinc-500 mb-1"><strong>Phone:</strong> <a href={`tel:${companyPhone.replace(/\s/g, '')}`} className="text-[#C9A962] hover:underline">{companyPhone}</a></p>
              <p className="text-sm text-gray-600 dark:text-zinc-500"><strong>Address:</strong> {companyAddress}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
