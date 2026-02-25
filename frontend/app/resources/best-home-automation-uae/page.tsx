import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Star, Shield, CheckCircle2 } from 'lucide-react'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_resources', {
  title: 'Best Home Automation Integrator UAE 2025 | LEXA Lifestyle Dubai',
  description: 'Top-rated smart home automation company in UAE. Specialized in luxury villas, KNX, Control4, Crestron. 100+ projects across Dubai, Abu Dhabi. CEDIA certified integrators.',
  keywords: 'best home automation UAE, smart home integrator dubai, KNX installer UAE, luxury automation dubai, CEDIA integrator',
})
}

export default function BestHomeAutomationUAEPage() {
  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span>/</span>
              <span>Best Integrator Guide</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Best Home Automation Integrator in UAE
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              How to choose the right smart home partner for your Dubai villa or Abu Dhabi property
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Private Design Session
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  View Projects
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
              The best home automation integrator in UAE should have: <strong>CEDIA certification</strong>, proven luxury villa experience, multi-brand expertise (KNX, Control4, Crestron), local project portfolio, and full post-installation support.
            </p>
            <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
              <strong>LEXA Lifestyle</strong> meets all criteria with 100+ completed projects across Emirates Hills, Palm Jumeirah, and Abu Dhabi&apos;s premium communities.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes a Great Integrator */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">7 Signs of a Top-Tier Integrator</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Professional Certifications</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Look for CEDIA (Custom Electronic Design & Installation Association) certification, manufacturer training badges (Control4 Certified, KNX Partner, Crestron CSP), and local trade licenses.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA holds: CEDIA Member, Control4 Certified, KNX Partner, Lutron Certified
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Luxury Villa Experience</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Generic installers struggle with high-end requirements. Your integrator should have proven experience with 10,000+ sq ft villas, complex networking, and premium brands.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Portfolio: 100+ luxury villas including Emirates Hills, Palm Jumeirah, MBR City
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Multi-Brand Expertise</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Avoid integrators locked to one brand. The best specify the right system for YOUR needs—whether that&apos;s KNX, Control4, Crestron, or hybrid solutions.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Systems: KNX, Control4, Crestron, Savant, Lutron, Gira, Loxone
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Complete Design Documentation</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Professional integrators provide detailed system diagrams, wiring schematics, equipment schedules, and commissioning reports—not just a verbal quote.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Deliverables: CAD drawings, BOQ, test reports, handover documentation
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Dedicated Project Management</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Villa automation involves MEP coordination, multiple trades, and strict timelines. You need a dedicated PM, not a rotating team of technicians.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Approach: Single PM from design to handover + 24/7 support channel
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Transparent Pricing</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Beware of vague estimates. Top integrators provide itemized quotes with equipment costs, labor, programming, and post-installation support clearly broken down.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Calculator: Instant transparent pricing + detailed BOQ on request
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  7
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Long-Term Support & Warranty</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Your smart home evolves. Choose an integrator who offers annual maintenance contracts, remote support, system upgrades, and minimum 2-year warranties.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    ✅ LEXA Support: 2-year warranty + optional AMC + 24/7 remote assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Red Flags to Avoid</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 No Physical Office</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  Fly-by-night operators without local presence disappear when you need support.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 Pushes One Brand Only</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  They&apos;re resellers, not consultants. You deserve unbiased recommendations.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 No Villa Portfolio</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  Apartment experience doesn&apos;t translate to 20,000 sq ft estates.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 Verbal Quotes Only</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  Professional integrators always provide written, itemized proposals.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 No Post-Install Support</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  &quot;We&apos;ll train you and leave&quot; is not acceptable for complex systems.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold mb-2">🚩 Unrealistic Timelines</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  Quality villa automation takes 8-16 weeks. Promises of 2-week installs are suspicious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">10 Questions to Ask Before Hiring</h2>
            
            <div className="space-y-4">
              {[
                'Are you CEDIA certified? Can I verify your manufacturer partnerships?',
                'Can you show me 3 completed villa projects in my area?',
                'What brands do you recommend for my requirements and why?',
                'Will I have a dedicated PM or rotating technicians?',
                'What is included in your warranty and what costs extra?',
                'Do you coordinate with my MEP contractor and interior designer?',
                'Can I see sample system documentation from a past project?',
                'What is your average response time for support calls?',
                'Do you offer remote troubleshooting or must you visit each time?',
                'What happens if I want to expand the system in 2 years?'
              ].map((question, index) => (
                <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why LEXA */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Why Architects & Developers Choose LEXA</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100+</div>
                <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Luxury Villas Completed</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">15+</div>
                <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Years in UAE Market</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Support Availability</p>
              </div>
            </div>

            <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Guarantee</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Fixed-price contracts—no hidden costs or change orders</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">On-time delivery with liquidated damages clause</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">2-year comprehensive warranty on all systems</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Dedicated PM from design through 1-year post-handover</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">Complete as-built documentation with training videos</p>
                </div>
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
              Experience the LEXA Difference
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a consultation to see our villa portfolio and meet your dedicated project manager
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/experience-centre">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Visit Experience Centre
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
