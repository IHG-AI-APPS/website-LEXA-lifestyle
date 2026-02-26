'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const fallback = {
  hero_title: 'Join Our Team',
  hero_description: "Be part of a team that's redefining smart luxury living across the Middle East. We're looking for passionate individuals to shape the future of home automation and AV integration.",
  benefits: [
    { title: 'Innovation & Excellence', description: 'Work with cutting-edge technologies from world-leading brands like Savant, Crestron, Bowers & Wilkins, and Sony.' },
    { title: 'Growth & Learning', description: 'Continuous training, certifications, and career development opportunities in smart home and AV technologies.' },
    { title: 'Prestigious Projects', description: 'Work on high-end residential villas, luxury hotels, and commercial projects across Dubai and the UAE.' },
  ],
  positions: [
    { title: 'Smart Home Systems Engineer', department: 'Engineering', location: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Audio-Visual Integration Specialist', department: 'Technical', location: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Project Manager - Smart Living', department: 'Operations', location: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Sales Consultant - Luxury Automation', department: 'Sales', location: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Home Cinema Design Specialist', department: 'Design', location: 'Dubai, UAE', type: 'Full-time' },
  ],
  how_to_apply_intro: "Interested in joining our team? We'd love to hear from you.",
  how_to_apply_steps: [
    'Review the open positions above',
    'Prepare your CV/resume and portfolio (if applicable)',
    'Send your application to careers@lexalifestyle.com',
    'Include the position title in your email subject line',
  ],
  contact_email: 'careers@lexalifestyle.com',
  contact_phone: '+971 42 670 470',
  contact_address: 'Al Quoz 1, Sheikh Zayed Road, 3rd Interchange, Dubai, UAE',
}

export default function CareersContent() {
  const cms = useCms('page_careers', fallback)

  const heroTitle = cms?.hero_title || fallback.hero_title
  const heroDesc = cms?.hero_description || fallback.hero_description
  const benefits = cms?.benefits?.length ? cms.benefits : fallback.benefits
  const positions = cms?.positions?.length ? cms.positions : fallback.positions
  const applyIntro = cms?.how_to_apply_intro || fallback.how_to_apply_intro
  const applySteps = cms?.how_to_apply_steps?.length ? cms.how_to_apply_steps : fallback.how_to_apply_steps
  const email = cms?.contact_email || fallback.contact_email
  const phone = cms?.contact_phone || fallback.contact_phone
  const address = cms?.contact_address || fallback.contact_address

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="careers-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Careers</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="careers-title">{heroTitle}</h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto">{heroDesc}</p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Why LEXA Lifestyle?</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Benefits of Joining</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {benefits.map((b: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="positions-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8 text-gray-900 dark:text-white">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((job: any, i: number) => (
                <div key={i} className="bg-white dark:bg-gray-950 p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-colors" data-testid={`position-${i}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Briefcase size={14} />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} />{job.type}</span>
                      </div>
                    </div>
                    <Link href="/contact">
                      <Button size="sm" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold">
                        Apply Now <ArrowRight className="ml-1" size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Application</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">How to Apply</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{applyIntro}</p>
            <ol className="space-y-3 mb-8">
              {applySteps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A962]/15 text-[#C9A962] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1"><strong>Email:</strong> <a href={`mailto:${email}`} className="text-[#C9A962] hover:underline">{email}</a></p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1"><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#C9A962] hover:underline">{phone}</a></p>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Address:</strong> {address}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
