'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Award, 
  Shield, 
  FileCheck, 
  CheckCircle2, 
  Download,
  GraduationCap,
  ClipboardCheck,
  Settings,
  BookOpen,
  Wrench,
  Users,
  Star,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function CertificationStandardPage() {
  const standards = [
    {
      icon: FileCheck,
      title: 'Installation Standards',
      description: 'Rigorous 47-point installation protocol ensuring consistent quality across all projects',
      items: [
        'Pre-installation site verification',
        'Cable management to TIA/EIA-568 standards',
        'Equipment mounting per manufacturer specs',
        'System integration testing protocols',
        'Final quality inspection checklist'
      ]
    },
    {
      icon: ClipboardCheck,
      title: 'QA Checklist',
      description: 'Multi-stage quality assurance with documented verification at each phase',
      items: [
        'Pre-installation equipment inspection',
        'In-progress milestone reviews',
        'Functional testing at 50% completion',
        'Full system commissioning tests',
        'Post-installation performance audit'
      ]
    },
    {
      icon: Settings,
      title: 'AMC Framework',
      description: 'Comprehensive Annual Maintenance Contract with proactive system care',
      items: [
        'Quarterly preventive maintenance visits',
        'Software updates and security patches',
        'Performance optimization & tuning',
        'Priority support with 4-hour response',
        'Annual system health report'
      ]
    },
    {
      icon: BookOpen,
      title: 'Documentation Standard',
      description: 'Complete technical documentation for every installation',
      items: [
        'As-built CAD drawings',
        'Network topology diagrams',
        'Equipment specifications & warranties',
        'Programming logic & scenes',
        'Maintenance schedules & procedures'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Training Process',
      description: 'Comprehensive user training ensuring confidence and competence',
      items: [
        'On-site system walkthrough (2-3 hours)',
        'User interface training for all residents',
        'Common scenarios practice sessions',
        'Emergency procedures & troubleshooting',
        'Training video library access'
      ]
    },
    {
      icon: Users,
      title: 'Handover Process',
      description: 'Structured 5-phase handover ensuring seamless transition',
      items: [
        'System demonstration & acceptance',
        'Documentation package delivery',
        'Warranty registration & activation',
        'Support team introduction',
        '30-day follow-up optimization visit'
      ]
    }
  ]

  const certifications = [
    { name: 'Control4 Certified Professional', level: 'Platinum', logo: '🏆' },
    { name: 'Crestron Diamond Dealer', level: 'Diamond', logo: '💎' },
    { name: 'Lutron Palladiom Certified', level: 'Elite', logo: '⭐' },
    { name: 'Savant Authorized Dealer', level: 'Premier', logo: '🌟' },
    { name: 'KNX Certified Partner', level: 'Professional', logo: '🎖️' },
    { name: 'CEDIA Member', level: 'Member Since 2015', logo: '🔷' },
  ]

  const qaMetrics = [
    { metric: 'Installation Quality Score', value: '99.2%', trend: '+2.1%' },
    { metric: 'First-Time Acceptance Rate', value: '97.8%', trend: '+1.5%' },
    { metric: 'Customer Satisfaction (NPS)', value: '94/100', trend: '+3.2%' },
    { metric: 'On-Time Completion', value: '96.5%', trend: '+1.8%' },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full">
                <Award size={48} strokeWidth={2} />
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                LEXA CERTIFIED
                <br />
                INTEGRATION STANDARD
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The UAE&apos;s only smart home integrator with documented engineering standards, 
                manufacturer certifications, and quality-assured processes.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-green-400" />
                  <span>ISO 9001 Processes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-yellow-400" />
                  <span>6 Manufacturer Certifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-blue-400" />
                  <span>500+ Projects Delivered</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Standards Matter */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Why LEXA ≠ Random AV Guy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The difference between a professional integration firm and an installer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-red-500">
                <h3 className="text-2xl font-bold mb-4 text-red-600">Random Installer</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">×</span>
                    <span className="text-sm">No documented standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">×</span>
                    <span className="text-sm">Minimal or no training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">×</span>
                    <span className="text-sm">Poor documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">×</span>
                    <span className="text-sm">Limited support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-xl">×</span>
                    <span className="text-sm">No quality assurance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-2xl border-t-4 border-green-600 transform scale-105">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-green-600" size={32} />
                  <h3 className="text-2xl font-bold text-green-900">LEXA Certified</h3>
                </div>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-semibold">Documented 47-point standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-semibold">Factory-certified technicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-semibold">Complete as-built drawings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-semibold">24/7 lifetime support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-semibold">5-stage QA process</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-gray-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">Typical Contractor</h3>
                <ul className="space-y-3 text-gray-500">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 text-xl">○</span>
                    <span className="text-sm">Basic installation only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 text-xl">○</span>
                    <span className="text-sm">Limited certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 text-xl">○</span>
                    <span className="text-sm">Basic documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 text-xl">○</span>
                    <span className="text-sm">Business hours support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 text-xl">○</span>
                    <span className="text-sm">Basic testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Detail */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Our Integration Standards
              </h2>
              <p className="text-xl text-gray-600">
                Engineering excellence in every installation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {standards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-black transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-black rounded-full">
                    <standard.icon size={28} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{standard.title}</h3>
                  <p className="text-gray-600 mb-6">{standard.description}</p>

                  <ul className="space-y-3">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Quality by the Numbers
              </h2>
              <p className="text-xl text-gray-400">
                Measurable excellence across every metric
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qaMetrics.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold mb-2">{item.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{item.metric}</div>
                  <div className="text-xs text-green-400 flex items-center justify-center gap-1">
                    <TrendingUp size={14} />
                    {item.trend} YoY
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Manufacturer Certifications
              </h2>
              <p className="text-xl text-gray-600">
                Authorized, trained, and certified by the industry&apos;s leading brands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-500 hover:shadow-xl transition-all"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{cert.logo}</div>
                    <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                    <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                      {cert.level}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                One of only 3 companies in the UAE with multi-platform premium certifications
              </p>
              <Button variant="outline" size="lg" className="border-2">
                <Download className="mr-2" size={20} />
                Download Certification Portfolio (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Documentation */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Documentation Samples
              </h2>
              <p className="text-xl text-gray-600">
                Every project includes comprehensive technical documentation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Installation Standard', pages: '47-Point Protocol', icon: Wrench },
                { title: 'QA Checklist', pages: '5-Stage Process', icon: ClipboardCheck },
                { title: 'AMC Framework', pages: 'Annual Contract', icon: Settings },
                { title: 'Handover Process', pages: '5-Phase Transition', icon: Users }
              ].map((doc, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-6 hover:shadow-2xl transition-all group cursor-pointer">
                  <doc.icon className="mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{doc.pages}</p>
                  <div className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                    Click to download sample →
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <FileCheck className="text-blue-600 flex-shrink-0" size={32} />
                <div>
                  <h3 className="font-bold text-xl mb-2 text-blue-900">Complete Documentation Package</h3>
                  <p className="text-blue-800 mb-4">
                    Every installation includes a comprehensive documentation package with as-built drawings, 
                    system diagrams, equipment specifications, programming documentation, and maintenance procedures.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2" size={18} />
                    Request Sample Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Stakeholders */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Benefits for Every Stakeholder
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">For Developers</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li>✓ Predictable quality across all units</li>
                  <li>✓ On-time completion guarantees</li>
                  <li>✓ Complete handover documentation</li>
                  <li>✓ Reduced post-handover issues</li>
                  <li>✓ Higher property values</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">For Architects</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li>✓ Design integration from day one</li>
                  <li>✓ Technical specs for documentation</li>
                  <li>✓ CAD drawings and coordination</li>
                  <li>✓ Aesthetic cable management</li>
                  <li>✓ Design intent preservation</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-400">For Homeowners</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li>✓ Peace of mind with standards</li>
                  <li>✓ Comprehensive training included</li>
                  <li>✓ Complete documentation package</li>
                  <li>✓ Lifetime support guarantee</li>
                  <li>✓ Future-proof installations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">What is the LEXA Certified Integration Standard?</h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                The LEXA Certified Integration Standard (LCIS) is the UAE&apos;s first documented smart home integration 
                methodology combining international best practices, manufacturer requirements, and 15+ years of 
                field experience. Unlike typical installers who follow ad-hoc processes, LEXA integrators follow a 
                rigorous 47-point protocol ensuring consistent, high-quality results.
              </p>

              <h3 className="text-2xl font-bold mb-4">Why Documentation Matters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Professional documentation is the difference between a sophisticated installation and expensive 
                equipment. Our as-built drawings, network diagrams, and system documentation enable:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Future system expansions without reverse-engineering</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Rapid troubleshooting and support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Property value protection and enhancement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Transfer of knowledge to new property owners</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Quality Assurance Process</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every LEXA installation undergoes a 5-stage quality assurance process:
              </p>
              <ol className="space-y-3 mb-8 list-decimal list-inside">
                <li><strong>Pre-Installation Audit</strong> - Equipment verification and site readiness assessment</li>
                <li><strong>50% Milestone Review</strong> - Infrastructure and cabling inspection</li>
                <li><strong>System Commissioning</strong> - Complete functional testing of all integrated systems</li>
                <li><strong>Performance Validation</strong> - Speed, reliability, and integration quality checks</li>
                <li><strong>Final Acceptance</strong> - Client walkthrough and documentation handover</li>
              </ol>

              <h3 className="text-2xl font-bold mb-4">Annual Maintenance Contract (AMC)</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our AMC framework ensures your smart home remains optimized and up-to-date:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-3">
                  <Star className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Quarterly Visits:</strong> Preventive maintenance, software updates, performance tuning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Priority Support:</strong> 4-hour response time, 24/7 emergency service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>System Optimization:</strong> New feature integration, automation refinements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Annual Health Report:</strong> System performance analysis and recommendations</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Training & Knowledge Transfer</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every project includes comprehensive training ensuring you can confidently operate your smart home:
              </p>
              <ul className="space-y-2">
                <li>• On-site walkthrough with all system features (2-3 hours)</li>
                <li>• Training for all household members and staff</li>
                <li>• Common use scenarios and automation tips</li>
                <li>• Emergency procedures and basic troubleshooting</li>
                <li>• Access to video training library</li>
                <li>• 30-day optimization follow-up included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Experience the LEXA Standard
            </h2>
            <p className="text-xl text-green-100 mb-10">
              See why developers, architects, and homeowners choose certified excellence over random installation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg font-semibold">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-7 text-lg font-semibold">
                  Get Detailed Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
