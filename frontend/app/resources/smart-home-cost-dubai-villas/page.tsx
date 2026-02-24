import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, DollarSign, Home, Calculator, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Smart Home Automation Cost in Dubai Villas 2025 | LEXA Lifestyle',
  description: 'Complete cost breakdown for smart home automation in Dubai villas. From basic systems (AED 50K) to ultra-luxury (AED 500K+). Get accurate pricing for KNX, Control4, Crestron systems.',
  keywords: 'smart home cost dubai, villa automation price, home automation dubai cost, KNX price UAE, Control4 cost dubai',
}

export default function SmartHomeCostDubaiPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span>/</span>
              <span>Smart Home Cost Guide</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              How Much Does Smart Home Automation Cost in Dubai Villas?
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete 2025 pricing guide with real project costs from basic systems to ultra-luxury installations
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                  <Calculator className="mr-2" size={20} />
                  Calculate Your Cost
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-l-4 border-black">
            <h2 className="text-2xl font-bold mb-4">Quick Answer</h2>
            <p className="text-lg text-gray-700 mb-4">
              Smart home automation for a Dubai villa typically costs between <strong>AED 50,000 to AED 500,000+</strong> depending on property size, systems chosen, and automation level.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Basic Package</p>
                <p className="text-2xl font-bold">AED 50K - 150K</p>
                <p className="text-sm text-gray-600 mt-1">3-4 systems</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Premium Package</p>
                <p className="text-2xl font-bold">AED 150K - 300K</p>
                <p className="text-sm text-gray-600 mt-1">6-8 systems</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Ultra-Luxury</p>
                <p className="text-2xl font-bold">AED 300K - 500K+</p>
                <p className="text-sm text-gray-600 mt-1">Full integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown by System */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Cost Breakdown by System</h2>
            
            <div className="space-y-8">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Smart Lighting Control</h3>
                <p className="text-gray-700 mb-4">
                  Automated lighting with scenes, schedules, and dimming control throughout the villa.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Basic (Wireless)</p>
                    <p className="text-xl font-bold">AED 15,000 - 30,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium (KNX/DALI)</p>
                    <p className="text-xl font-bold">AED 40,000 - 80,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Climate Control Integration</h3>
                <p className="text-gray-700 mb-4">
                  HVAC automation with zone control, scheduling, and energy optimization.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Basic Integration</p>
                    <p className="text-xl font-bold">AED 10,000 - 20,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Zoning</p>
                    <p className="text-xl font-bold">AED 25,000 - 50,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Security & Access Control</h3>
                <p className="text-gray-700 mb-4">
                  CCTV, alarm systems, smart locks, video intercoms, and perimeter security.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Standard Security</p>
                    <p className="text-xl font-bold">AED 20,000 - 40,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium Security</p>
                    <p className="text-xl font-bold">AED 60,000 - 120,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Multi-Room Audio/Video</h3>
                <p className="text-gray-700 mb-4">
                  Distributed audio, home cinema, and centralized media control.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Basic Audio</p>
                    <p className="text-xl font-bold">AED 25,000 - 50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium Cinema</p>
                    <p className="text-xl font-bold">AED 80,000 - 200,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Motorized Shades & Curtains</h3>
                <p className="text-gray-700 mb-4">
                  Automated window treatments with scheduling and light sensors.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Standard Motors</p>
                    <p className="text-xl font-bold">AED 15,000 - 30,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium Silent Motors</p>
                    <p className="text-xl font-bold">AED 35,000 - 60,000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Central Control System</h3>
                <p className="text-gray-700 mb-4">
                  KNX, Control4, Crestron, or Savant – the brain of your smart home.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Control4</p>
                    <p className="text-xl font-bold">AED 30,000 - 60,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">KNX / Crestron</p>
                    <p className="text-xl font-bold">AED 50,000 - 100,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Project Costs */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Real Dubai Villa Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-600 mb-2">4BR Villa, Arabian Ranches</div>
                <div className="text-3xl font-bold mb-4">AED 85,000</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Smart lighting (KNX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Climate control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Security system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Basic audio</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-black">
                <div className="text-sm text-gray-600 mb-2">6BR Villa, Emirates Hills</div>
                <div className="text-3xl font-bold mb-4">AED 225,000</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Full KNX lighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Premium security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Home cinema</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Multi-room audio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Motorized shades</span>
                  </li>
                </ul>
                <div className="mt-4 bg-black text-white text-xs px-3 py-1 rounded-full inline-block">
                  MOST POPULAR
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-600 mb-2">8BR Palace, Palm Jumeirah</div>
                <div className="text-3xl font-bold mb-4">AED 480,000</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Crestron full integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Premium Dolby Atmos cinema</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Advanced security suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Distributed AV</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Pool & garden automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Affecting Cost */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">What Affects Smart Home Cost?</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-3">1. Villa Size</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Larger villas require more devices, wiring, and labor. A 10,000 sq ft villa typically costs 2-3x more than a 5,000 sq ft property.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">2. Construction Stage</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Pre-construction installation saves 20-30% vs. retrofit. Wiring and infrastructure are much easier during build phase.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">3. System Choice</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  KNX and Crestron cost more upfront but offer superior scalability. Control4 provides excellent value for mid-range projects.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">4. Brand Preferences</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Premium brands (Lutron, Gira, Bang & Olufsen) command 30-50% premium over standard brands.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3">5. Customization Level</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Custom programming, unique interfaces, and bespoke solutions add 15-25% to base system costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Get Your Accurate Quote
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Use our calculator for instant pricing or book a free consultation for a detailed proposal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                  <Calculator className="mr-2" size={20} />
                  Calculate Cost
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
