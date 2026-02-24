'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import BookingModal from '@/components/modals/BookingModal'
import TrustBadges from '@/components/social-proof/TrustBadges'
import ProofBar from '@/components/sections/ProofBar'
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Home, 
  FileText, 
  Wrench,
  Headphones,
  Shield,
  Award,
  Phone,
  MapPin,
  Video
} from 'lucide-react'

export default function ConsultationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const consultationTypes = [
    {
      icon: MapPin,
      title: 'Free Site Visit',
      duration: '60-90 minutes',
      description: 'Our expert team visits your property for a comprehensive survey',
      features: [
        'Property assessment',
        'Technical recommendations',
        'Budget discussion',
        'Timeline planning'
      ],
      cta: 'Schedule Site Visit',
      popular: true
    },
    {
      icon: Home,
      title: 'Experience Center Tour',
      duration: '45-60 minutes',
      description: 'Visit our showroom to see smart home systems in action',
      features: [
        'Live product demonstrations',
        'Touch and feel devices',
        'Compare solutions',
        'Q&A with specialists'
      ],
      cta: 'Book Center Visit',
      popular: false
    },
    {
      icon: Video,
      title: 'Video Consultation',
      duration: '30 minutes',
      description: 'Virtual meeting with our smart home experts',
      features: [
        'Screen share capabilities',
        'Discuss your project',
        'Get preliminary quotes',
        'Q&A session'
      ],
      cta: 'Schedule Video Call',
      popular: false
    }
  ]

  const processSteps = [
    {
      number: '01',
      icon: Calendar,
      title: 'Private Design Session',
      description: 'Choose your preferred consultation type and select a convenient time slot'
    },
    {
      number: '02',
      icon: FileText,
      title: 'Discover & Design',
      description: 'We assess your needs, discuss solutions, and create a tailored proposal'
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Installation',
      description: 'Professional installation by certified technicians with minimal disruption'
    },
    {
      number: '04',
      icon: Headphones,
      title: 'Ongoing Support',
      description: 'Lifetime support, warranty coverage, and system optimization'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white/10 backdrop-blur-sm rounded-full">
                <Calendar size={36} strokeWidth={2} />
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                FREE SMART HOME
                <br />
                CONSULTATION
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Expert guidance, personalized solutions, no obligations. Book your consultation today and discover how smart technology can transform your space.
              </p>

              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg font-semibold"
                onClick={() => setShowBookingModal(true)}
              >
                <Calendar className="mr-3" size={24} />
                Book Free Consultation
              </Button>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span>No Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span>Free Quote</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span>Expert Advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span>Same Day Response</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges variant="compact" showCertifications={false} className="bg-white border-b border-gray-100" />

      {/* Consultation Types */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Consultation Type</h2>
              <p className="text-xl text-gray-600">
                Select the option that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {consultationTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                    type.popular ? 'ring-4 ring-green-500' : ''
                  }`}
                >
                  {type.popular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full ${
                      type.popular ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <type.icon size={32} className={type.popular ? 'text-green-600' : 'text-gray-600'} />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock size={16} />
                      <span className="text-sm">{type.duration}</span>
                    </div>

                    <p className="text-gray-600 mb-6">{type.description}</p>

                    <div className="space-y-3 mb-8">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      className={`w-full ${
                        type.popular
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-black hover:bg-gray-800 text-white'
                      }`}
                      onClick={() => setShowBookingModal(true)}
                    >
                      {type.cta}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Consultation Process</h2>
              <p className="text-xl text-gray-600">
                From first contact to smart home perfection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10" />
                  )}

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all">
                    <div className="text-6xl font-bold text-gray-200 mb-4">{step.number}</div>
                    
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-black rounded-full">
                      <step.icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What to Expect</h2>
              <p className="text-xl text-gray-600">
                Your consultation will be informative, pressure-free, and tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Shield className="text-blue-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">No Pressure, Just Guidance</h3>
                <p className="text-gray-600 text-sm">
                  We&apos;re here to educate and advise. No pushy sales tactics, just honest recommendations.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Award className="text-purple-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Expert Knowledge</h3>
                <p className="text-gray-600 text-sm">
                  Our team has 15+ years of experience in luxury smart home installations across the UAE.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <FileText className="text-green-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Detailed Proposal</h3>
                <p className="text-gray-600 text-sm">
                  Receive a comprehensive quote with cost breakdowns, timelines, and product specifications.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Phone className="text-orange-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Ongoing Support</h3>
                <p className="text-gray-600 text-sm">
                  We&apos;re available before, during, and after your project. Your success is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Is the consultation really free?',
                  a: 'Yes! There are absolutely no charges or obligations. We provide expert advice and detailed quotes at no cost.'
                },
                {
                  q: 'How long does a consultation take?',
                  a: 'Site visits typically take 60-90 minutes, experience center tours 45-60 minutes, and video calls 30 minutes.'
                },
                {
                  q: 'What should I prepare for the consultation?',
                  a: 'Just your questions and ideas! For site visits, having floor plans is helpful but not required.'
                },
                {
                  q: 'Do you cover all of UAE?',
                  a: 'Yes, we provide services across all seven emirates including Dubai, Abu Dhabi, Sharjah, and more.'
                },
                {
                  q: 'Can I get a quote during the consultation?',
                  a: 'Yes! We provide preliminary quotes during consultations and detailed proposals within 24-48 hours.'
                },
                {
                  q: 'What if I need to reschedule?',
                  a: 'No problem! You can reschedule or cancel anytime through your confirmation email.'
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden group"
                >
                  <summary className="px-6 py-4 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                    {faq.q}
                    <span className="text-2xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <ProofBar />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-green-100 mb-10">
              Book your free consultation now and take the first step towards your smart home dream
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg font-semibold"
                onClick={() => setShowBookingModal(true)}
              >
                <Calendar className="mr-2" size={24} />
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-7 text-lg font-semibold"
                onClick={() => window.location.href = '/calculator'}
              >
                Get Instant Quote
              </Button>
            </div>

            <p className="text-sm text-green-200 mt-6">
              Average response time: &lt;2 hours | Available 7 days a week
            </p>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}
