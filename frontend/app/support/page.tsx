import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Shield, Wrench, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '24/7 Smart Home Support UAE | Emergency Automation Service Dubai',
  description: '24/7 emergency smart home support across UAE. Immediate response for villa automation issues. Annual maintenance contracts available.',
  keywords: '24/7 smart home support UAE, emergency automation Dubai, AMC smart home, villa automation support',
}

export default function EmergencySupportPage() {
  const emergencyScenarios = [
    { icon: '🚪', issue: 'Gate or door automation failure', response: 'Within 2 hours' },
    { icon: '📡', issue: 'Wi-Fi or network down', response: 'Remote assist within 30 min' },
    { icon: '🎬', issue: 'Home cinema not working', response: 'Same day visit' },
    { icon: '💡', issue: 'Lighting system offline', response: 'Within 4 hours' },
    { icon: '❄️', issue: 'AC automation malfunction', response: 'Priority response' },
    { icon: '🔒', issue: 'Security system alerts', response: 'Immediate dispatch' }
  ]

  const amcBenefits = [
    'Preventive maintenance visits (quarterly)',
    'Priority emergency response',
    'Discounted service rates',
    'System health monitoring',
    'Software updates included',
    'Free remote troubleshooting',
    'Annual system optimization',
    '24/7 dedicated hotline'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-red-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Phone size={36} strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              24/7 Smart Home Support UAE
            </h1>
            
            <p className="text-xl text-red-100 mb-8">
              Emergency response across Dubai, Abu Dhabi, and Sharjah. Because your smart home should never stop working.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'}?text=Emergency%20Support%20Request`}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 dark:bg-gray-800 text-lg font-bold">
                  <Phone className="mr-2" size={20} />
                  Emergency WhatsApp
                </Button>
              </a>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 text-lg font-bold">
                  <Shield className="mr-2" size={20} />
                  AMC Plans
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span>UAE-Wide Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench size={20} />
                <span>Certified Technicians</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Emergencies */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                We Fix It Fast
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Common smart home emergencies we handle daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyScenarios.map((scenario, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-red-500 transition-all">
                  <div className="text-4xl mb-4">{scenario.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{scenario.issue}</h3>
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <Clock size={16} />
                    <span className="text-sm">{scenario.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              How Emergency Support Works
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    WhatsApp, phone, or emergency hotline. Available 24/7 including public holidays.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Remote Diagnosis</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    Our team attempts remote troubleshooting first. Many issues resolved within minutes over video call.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Technician Dispatch</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    If site visit needed, certified technician dispatched immediately. ETA communicated upfront.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Issue Resolved</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    Problem fixed on-site. Follow-up check within 48 hours to ensure stability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Annual Maintenance Contracts
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Proactive care. Priority support. Peace of mind.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-bold mb-8">What&apos;s Included in AMC</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amcBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle size={28} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Why AMC Matters</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    Smart homes are complex systems. Without regular maintenance, small issues become expensive emergencies. 
                    Our AMC clients experience <strong>85% fewer emergency calls</strong> and <strong>longer system lifespan</strong>.
                  </p>
                </div>
              </div>
              
              <Link href="/consultation">
                <Button size="lg" className="w-full bg-black hover:bg-gray-800 uppercase tracking-widest">
                  Get AMC Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-red-600 via-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Need Help Right Now?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Our support team is standing by 24/7 to assist you
            </p>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567'}?text=Emergency%20Support%20Request`}>
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 dark:bg-gray-800 text-lg font-bold px-12 py-8">
                <Phone className="mr-2" size={24} />
                Contact Emergency Support
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
