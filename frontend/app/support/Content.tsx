'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Shield, Wrench, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { useCms } from '@/hooks/useCms'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const ICON_MAP: Record<string, any> = { alert: AlertCircle, shield: Shield, wrench: Wrench }

const fallback = {
  hero_badge: '24/7 Support',
  hero_title: '24/7 Smart Home Support',
  hero_description: 'Immediate assistance for any smart home emergency. Our certified technicians are always on standby.',
  emergency_phone: '+971 50 326 7227',
  whatsapp_number: '971503267227',
  support_email: 'support@lexalifestyle.com',
  emergency_scenarios: [
    { issue: 'Gate or door automation failure', response: 'Within 2 hours', icon: 'alert' },
    { issue: 'Security system alerts', response: 'Immediate dispatch', icon: 'shield' },
    { issue: 'Home cinema not working', response: 'Same day visit', icon: 'wrench' },
    { issue: 'Lighting system offline', response: 'Within 4 hours', icon: 'alert' },
    { issue: 'AC automation malfunction', response: 'Priority response', icon: 'wrench' },
    { issue: 'Wi-Fi or network down', response: 'Remote assist 30 min', icon: 'shield' },
  ],
  amc_benefits: [
    'Preventive maintenance visits (quarterly)', 'Priority emergency response', 'Discounted service rates',
    'System health monitoring', 'Software updates included', 'Free remote troubleshooting',
    'Annual system optimization', '24/7 dedicated hotline',
  ],
  cta_badge: 'Protect Your Investment',
  cta_title: 'Get an AMC Plan Today',
  cta_description: 'Prevent issues before they happen with our annual maintenance contracts.',
}

export default function SupportContent() {
  const cms = useCms('page_support', fallback)
  const { settings: siteSettings } = useSiteSettings()

  const badge = cms?.hero_badge || fallback.hero_badge
  const title = cms?.hero_title || fallback.hero_title
  const desc = cms?.hero_description || fallback.hero_description
  // Use site settings for contact info, with CMS fallback
  const emergencyPhone = siteSettings.contact_phone || cms?.emergency_phone || fallback.emergency_phone
  const whatsapp = siteSettings.social_whatsapp?.replace(/[^0-9]/g, '') || cms?.whatsapp_number || fallback.whatsapp_number
  const supportEmail = siteSettings.contact_email || cms?.support_email || fallback.support_email
  const scenarios = cms?.emergency_scenarios?.length ? cms.emergency_scenarios : fallback.emergency_scenarios
  const benefits = cms?.amc_benefits?.length ? cms.amc_benefits : fallback.amc_benefits
  const ctaBadge = cms?.cta_badge || fallback.cta_badge
  const ctaTitle = cms?.cta_title || fallback.cta_title
  const ctaDesc = cms?.cta_description || fallback.cta_description

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="support-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-16 lg:py-24">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest mb-5">{badge}</span>
            <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight" data-testid="support-title">{title}</h1>
            <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto">{desc}</p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 font-semibold" asChild>
                <a href={`tel:${emergencyPhone.replace(/\s/g, '')}`}><Phone className="mr-2" size={18} /> Emergency: {emergencyPhone}</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#050505]" data-testid="scenarios-section">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Common Issues</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Emergency Response Times</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((s: any, i: number) => {
                const Icon = ICON_MAP[s.icon] || AlertCircle
                return (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800">
                    <Icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{s.issue}</h3>
                      <p className="text-xs text-[#C9A962] font-medium flex items-center gap-1"><Clock size={12} />{s.response}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Support Levels */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">AMC Benefits</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Annual Maintenance Coverage</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((b: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-[#050505] border border-gray-100 dark:border-zinc-800">
                      <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-zinc-400">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  <div className="bg-gray-900 dark:bg-[#171717] text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Need Help Now?</h3>
                    <div className="space-y-3">
                      <a href={`tel:${emergencyPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Phone className="h-5 w-5 text-red-400" />
                        <div><p className="text-sm font-medium">Emergency Line</p><p className="text-xs text-gray-400">{emergencyPhone}</p></div>
                      </a>
                      <a href={`mailto:${supportEmail}`} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                        <Wrench className="h-5 w-5 text-[#C9A962]" />
                        <div><p className="text-sm font-medium">Support Email</p><p className="text-xs text-gray-400">{supportEmail}</p></div>
                      </a>
                    </div>
                  </div>
                  <Button size="lg" className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" asChild>
                    <Link href="/amc-packages">View AMC Packages <ArrowRight className="ml-2" size={16} /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">{ctaBadge}</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">{ctaTitle}</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{ctaDesc}</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
              <Link href="/amc-packages">Explore AMC Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
