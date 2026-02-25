import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, FileText, Package, Award, CheckCircle2, Lock } from 'lucide-react'
import CmsReg from './CmsReg'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_developer_toolkit', {
  title: 'Developer Partner Toolkit | LEXA Lifestyle',
  description: 'Exclusive resources for real estate developers. Smart-ready certification, marketing materials, and technical documentation.',
})
}

export default function DeveloperToolkitPage() {
  const toolkitResources = [
    {
      title: 'Smart-Ready Certification Badge',
      description: 'Official LEXA Smart-Ready badge for your marketing materials and unit specifications',
      formats: ['PNG', 'SVG', 'EPS'],
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Sample Floorplan Automation Layouts',
      description: 'Standard automation layouts for 1BR, 2BR, 3BR, and penthouse units with device placement',
      formats: ['DWG', 'PDF'],
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Marketing Brochure Inserts',
      description: 'Professional insert pages showcasing smart home features for your sales brochures',
      formats: ['PDF', 'InDesign'],
      icon: Package,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Sales Team Talking Points',
      description: 'Key benefits, FAQs, and objection handling for your sales representatives',
      formats: ['PDF', 'PPT'],
      icon: FileText,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Unit Upgrade Options Sheet',
      description: 'Tiered automation packages (Silver/Gold/Platinum) with pricing for buyer upgrades',
      formats: ['PDF', 'XLSX'],
      icon: Package,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Client Presentation PDF',
      description: 'Professional presentation deck explaining automation value proposition',
      formats: ['PDF', 'PPT'],
      icon: FileText,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const benefits = [
    'Differentiate your development with Smart-Ready certification',
    'Increase unit values by 10-15% with automation packages',
    'Reduce post-handover support calls',
    'Accelerate sales cycle with ready-to-use materials',
    'Technical support for your sales team',
    'Co-branded marketing opportunities'
  ]

  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Lock size={36} strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Developer Partner Toolkit
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Exclusive resources to sell smart-ready units faster. Turn automation into a sales advantage.
            </p>

            <div className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-sm mb-8">
              🔒 PRIVATE ACCESS FOR DEVELOPER PARTNERS
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              Why Developers Partner With LEXA
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-gallery-base p-4 rounded-lg">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit Resources */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              What&apos;s In The Toolkit
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolkitResources.map((resource, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-black transition-all">
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${resource.color}`}>
                    <resource.icon size={32} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{resource.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.formats.map((format) => (
                      <span
                        key={format}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full"
import { generateCmsMetadata } from '@/lib/cmsMetadata'
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Download size={16} />
                    <span>Request access</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
              How The Partnership Works
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Initial Meeting</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    Schedule a developer partnership consultation. We review your project, unit types, and target market.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Package Design</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    We create tiered automation packages (Silver/Gold/Platinum) tailored to your units and price points.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Toolkit Access</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    Receive full access to marketing materials, technical docs, and Smart-Ready certification for your project.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Sales Enablement</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    We train your sales team on automation value proposition and handle technical queries from buyers.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Installation & Handover</h3>
                  <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                    We handle all installations, commissioning, and buyer handover documentation. Post-sale support included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Request */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Request Toolkit Access
              </h2>
              <p className="text-xl text-gray-300">
                Available to verified real estate developers with active projects in UAE
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Lock size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Access Requirements</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Active real estate development license in UAE</li>
                      <li>• Minimum 50 units under development or planned</li>
                      <li>• Valid trade license and developer credentials</li>
                    </ul>
                  </div>
                </div>

                <Link href="/developers">
                  <Button size="lg" className="w-full bg-white text-black hover:bg-gray-100 dark:bg-gray-800 uppercase tracking-widest">
                    Request Toolkit Access
                  </Button>
                </Link>

                <p className="text-center text-sm text-gray-400">
                  Our partnerships team will review your request within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
