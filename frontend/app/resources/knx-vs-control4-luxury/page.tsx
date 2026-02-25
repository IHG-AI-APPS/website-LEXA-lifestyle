import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, X } from 'lucide-react'
import KNXvsControl4PageCms from './KNXvsControl4PageCms'

export const metadata: Metadata = {
  title: 'KNX vs Control4 for Luxury Homes UAE 2025 | System Comparison',
  description: 'Detailed comparison of KNX and Control4 for Dubai luxury villas. Pros, cons, costs, and best use cases. Expert guidance from CEDIA certified integrators.',
  keywords: 'KNX vs Control4, smart home system comparison, luxury automation dubai, KNX price UAE, Control4 cost',
}

export default function KNXvsControl4Page() {
  return (
    <KNXvsControl4PageCms>
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span>/</span>
              <span>System Comparison</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              KNX vs Control4: Which System for Your Luxury Villa?
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Honest comparison from integrators who install both. Choose the right system for your Dubai home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Compare Pricing
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Get Expert Advice
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
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              <strong>KNX</strong> is the gold standard for large villas (10,000+ sq ft) requiring maximum reliability, scalability, and future-proofing. 
              <strong>Control4</strong> excels in 4,000-10,000 sq ft homes where user experience, AV integration, and value matter most.
            </p>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
              Both are excellent—the right choice depends on your priorities, budget, and property size.
            </p>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">System Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-4 text-left font-bold">Feature</th>
                    <th className="p-4 text-center font-bold">KNX</th>
                    <th className="p-4 text-center font-bold">Control4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">System Architecture</td>
                    <td className="p-4 text-center">Open protocol, wired bus</td>
                    <td className="p-4 text-center">Proprietary, IP-based</td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <td className="p-4 font-semibold">Best For</td>
                    <td className="p-4 text-center">10,000+ sq ft villas</td>
                    <td className="p-4 text-center">4,000-10,000 sq ft homes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Reliability</td>
                    <td className="p-4 text-center">99.9% uptime (wired)</td>
                    <td className="p-4 text-center">98% uptime (network dependent)</td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <td className="p-4 font-semibold">AV Integration</td>
                    <td className="p-4 text-center">Good (requires gateways)</td>
                    <td className="p-4 text-center">Excellent (native)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">User Interface</td>
                    <td className="p-4 text-center">Functional</td>
                    <td className="p-4 text-center">Intuitive, consumer-friendly</td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <td className="p-4 font-semibold">Scalability</td>
                    <td className="p-4 text-center">Unlimited (modular)</td>
                    <td className="p-4 text-center">Very good (200+ devices)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Installation Cost</td>
                    <td className="p-4 text-center">AED 80K - 200K+</td>
                    <td className="p-4 text-center">AED 50K - 120K</td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <td className="p-4 font-semibold">Programming Time</td>
                    <td className="p-4 text-center">3-6 weeks</td>
                    <td className="p-4 text-center">1-3 weeks</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Future-Proofing</td>
                    <td className="p-4 text-center">30+ year lifespan</td>
                    <td className="p-4 text-center">10-15 year lifespan</td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <td className="p-4 font-semibold">Integrator Lock-in</td>
                    <td className="p-4 text-center">No (any KNX partner)</td>
                    <td className="p-4 text-center">Yes (certified dealers only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Detailed System Analysis</h2>
            
            <div className="space-y-12">
              {/* KNX Section */}
              <div>
                <h3 className="text-3xl font-bold mb-6">KNX: The European Standard</h3>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Check className="text-green-600" size={24} />
                    Strengths
                  </h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Rock-solid reliability:</strong> Wired bus topology immune to Wi-Fi issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>True future-proofing:</strong> 30-year backward compatibility guaranteed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>No vendor lock-in:</strong> Any certified integrator can modify your system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Unlimited scalability:</strong> Perfect for palaces and mega-villas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Premium European brands:</strong> Gira, Jung, ABB for luxury aesthetics</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <X className="text-red-600" size={24} />
                    Weaknesses
                  </h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Higher upfront cost:</strong> 30-50% more expensive than Control4</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Steeper learning curve:</strong> Programming requires specialized training</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Less intuitive UI:</strong> Functional but not as consumer-friendly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>AV integration gaps:</strong> Requires third-party gateways for cinema systems</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Control4 Section */}
              <div>
                <h3 className="text-3xl font-bold mb-6">Control4: The Smart Choice</h3>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Check className="text-green-600" size={24} />
                    Strengths
                  </h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Best AV experience:</strong> Native integration with all major cinema brands</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Intuitive interface:</strong> App that homeowners actually enjoy using</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Faster deployment:</strong> 50% shorter programming time vs KNX</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Better value:</strong> More features per dirham for mid-size villas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Regular updates:</strong> Continuous software improvements and new integrations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <X className="text-red-600" size={24} />
                    Weaknesses
                  </h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Network dependent:</strong> Wi-Fi issues = system issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Dealer lock-in:</strong> Only certified integrators can modify programming</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Shorter lifespan:</strong> May need replacement in 10-15 years</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span><strong>Scaling limits:</strong> Struggles with mega-villas beyond 15,000 sq ft</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Choose Your System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Choose KNX If...</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Villa is 10,000+ sq ft</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>You value reliability over all else</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Budget allows for premium investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Planning to own property 15+ years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Want vendor-neutral platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Prefer European design aesthetics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Choose Control4 If...</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Villa is 4,000-10,000 sq ft</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Home cinema is a top priority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>You want the best user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Looking for excellent value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Need faster installation timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Prefer sleek modern interfaces</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Hybrid Approach</h3>
              <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                Many of our luxury villa clients choose <strong>KNX for infrastructure</strong> (lighting, HVAC, shades) and 
                <strong>Control4 for AV</strong>. This gives you KNX&apos;s reliability where it matters plus Control4&apos;s superior cinema experience. 
                Total cost: AED 150K-250K for typical 8,000 sq ft villa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Still Not Sure? Let&apos;s Discuss Your Project
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our team installs both KNX and Control4. We&apos;ll recommend the right system for YOUR needs—not ours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Compare Costs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
