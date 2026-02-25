import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Shield, Wrench, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_support', {
    title: '24/7 Smart Home Support UAE | Emergency Automation Service Dubai',
    description: '24/7 emergency smart home support across UAE.',
    keywords: '24/7 smart home support UAE, emergency automation Dubai',
  })
}

export default function EmergencySupportPage() {
  const emergencyScenarios = [
    { icon: AlertCircle, issue: 'Gate or door automation failure', response: 'Within 2 hours' },
    { icon: Shield, issue: 'Security system alerts', response: 'Immediate dispatch' },
    { icon: Wrench, issue: 'Home cinema not working', response: 'Same day visit' },
    { icon: AlertCircle, issue: 'Lighting system offline', response: 'Within 4 hours' },
    { icon: Wrench, issue: 'AC automation malfunction', response: 'Priority response' },
    { icon: Shield, issue: 'Wi-Fi or network down', response: 'Remote assist 30 min' },
  ]

  const amcBenefits = [
    'Preventive maintenance visits (quarterly)', 'Priority emergency response', 'Discounted service rates',
    'System health monitoring', 'Software updates included', 'Free remote troubleshooting',
    'Annual system optimization', '24/7 dedicated hotline',
  ]

  return (
    <>
      <CmsReg />
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="support-page">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest mb-5">24/7 Support</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="support-title">24/7 Smart Home Support</h1>
              <p className="text-base text-gray-300 mb-8 max-w-lg mx-auto">Immediate assistance for any smart home emergency. Our certified technicians are always on standby.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 font-semibold" asChild>
                  <a href="tel:+971503267227"><Phone className="mr-2" size={18} /> Emergency: +971 50 326 7227</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="https://wa.me/971503267227" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Scenarios */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="scenarios-section">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Common Issues</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Emergency Response Times</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyScenarios.map((scenario, i) => {
                  const Icon = scenario.icon
                  return (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                      <Icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{scenario.issue}</h3>
                        <p className="text-xs text-[#C9A962] font-medium flex items-center gap-1"><Clock size={12} />{scenario.response}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Support Levels */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">AMC Benefits</span>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Annual Maintenance Coverage</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amcBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                        <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="sticky top-28 space-y-5">
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Need Help Now?</h3>
                      <div className="space-y-3">
                        <a href="tel:+971503267227" className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                          <Phone className="h-5 w-5 text-red-400" />
                          <div><p className="text-sm font-medium">Emergency Line</p><p className="text-xs text-gray-400">+971 50 326 7227</p></div>
                        </a>
                        <a href="mailto:support@lexalifestyle.com" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                          <Wrench className="h-5 w-5 text-[#C9A962]" />
                          <div><p className="text-sm font-medium">Support Email</p><p className="text-xs text-gray-400">support@lexalifestyle.com</p></div>
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
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Protect Your Investment</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Get an AMC Plan Today</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Prevent issues before they happen with our annual maintenance contracts.</p>
              <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
                <Link href="/amc-packages">Explore AMC Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
