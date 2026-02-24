'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { MapPin, Calendar, Mail, Clock, CheckCircle, X, Shield, Star, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'

const facilities = [
  {
    id: 1,
    title: 'Smart Home Showcase',
    description: 'Experience the latest in home automation, lighting control, and intelligent living systems.',
    image: 'https://images.unsplash.com/photo-1740842311434-522bb411af15?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['Voice Control', 'Automated Lighting', 'Climate Management']
  },
  {
    id: 2,
    title: 'Home Cinema Experience',
    description: 'State-of-the-art home theater with premium acoustics and immersive 4K projection.',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['Dolby Atmos', '4K Projection', 'Acoustic Treatment']
  },
  {
    id: 3,
    title: 'Premium Brand Gallery',
    description: 'Explore luxury brands and cutting-edge technology solutions from world-leading manufacturers.',
    image: 'https://images.unsplash.com/photo-1760067537524-a0c0703d9721?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['32+ Brands', 'Live Demos', 'Expert Consultation']
  },
  {
    id: 4,
    title: 'Audio & Multi-Room Systems',
    description: 'High-fidelity audio solutions with multi-room capabilities and wireless streaming.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['Hi-Fi Systems', 'Multi-Room Audio', 'Streaming Integration']
  },
  {
    id: 5,
    title: 'Lighting Design Studio',
    description: 'Sophisticated lighting control systems showcasing ambiance and energy efficiency.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['Scene Control', 'Circadian Lighting', 'Energy Monitoring']
  },
  {
    id: 6,
    title: 'Security & Surveillance',
    description: 'Advanced security systems with facial recognition, access control, and monitoring.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=srgb&fm=jpg&q=85',
    features: ['Facial Recognition', 'Access Control', '24/7 Monitoring']
  },
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function ExperienceCentrePage() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'confirm'>('date')
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    message: '',
    website: '' // Honeypot field - should remain empty
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleBookingSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
      const response = await fetch(`${BACKEND_URL}/api/experience-centre/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      if (!response.ok) throw new Error('Failed to submit booking')

      setSubmitStatus('success')
      setBookingStep('confirm')
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestToggle = (interest: string) => {
    setBookingData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-white">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1735320858258-12fbcefcb3a7?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="LEXA PREMIER Showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full items-end">
          <div className="w-full px-6 pb-20 md:px-12 md:pb-24 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <span className="section-label block mb-4">
                Visit Us
              </span>
              <h1 className="display-heading text-white">
                LEXA
                <br />
                PREMIER
              </h1>
              <p className="mt-6 max-w-2xl text-base text-white/90">
                Visit our 5,000+ sq ft showroom in Dubai and experience luxury smart living first-hand. 
                Touch, feel, and interact with the latest technology solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="bg-white py-16 border-b border-black/10">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-4"
            >
              <MapPin className="h-6 w-6 text-[#9F8B65] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Location</h3>
                <p className="text-[#4A4A4A] text-sm">
                  Al Quoz 1, Sheikh Zayed Road<br />
                  3rd Interchange, Dubai, UAE
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <Calendar className="h-6 w-6 text-[#9F8B65] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Opening Hours</h3>
                <p className="text-[#4A4A4A] text-sm">
                  Saturday - Thursday: 9 AM - 6 PM<br />
                  Friday: 10 AM - 4 PM
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <Mail className="h-6 w-6 text-[#9F8B65] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-2">Book a Visit</h3>
                <p className="text-[#4A4A4A] text-sm mb-3">
                  Schedule a private tour with our experts
                </p>
                <Button 
                  size="sm"
                  className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/90 rounded-none px-6 py-2 text-xs uppercase tracking-widest"
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-[#F9F9F7] dark:bg-gray-900">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="h2 text-[#1A1A1A] mb-6">
                Our Capabilities
              </h2>
              <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">
                The LEXA Experience Centre is more than a showroom—it&apos;s a fully functional smart home environment 
                where you can experience the future of luxury living. With over 5,000 sq ft of space, our centre 
                showcases integrated solutions from the world&apos;s leading brands.
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                From home automation to cinema-grade audio-visual systems, our expert team will guide you through 
                personalized demonstrations tailored to your project requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-white">
        <div className="px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="h2 text-[#1A1A1A] dark:text-white">
              What You&apos;ll Experience
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="relative h-[300px] overflow-hidden mb-6">
                  <SafeImage
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                </div>

                <h3 className="font-heading text-2xl font-normal text-[#1A1A1A] mb-3">
                  {facility.title}
                </h3>
                <p className="text-[#4A4A4A] mb-4 leading-relaxed">
                  {facility.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {facility.features.map((feature) => (
                    <span 
                      key={feature} 
                      className="text-xs text-[#9F8B65] uppercase tracking-wider"
                    >
                      • {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Trust */}
      <section className="py-16 bg-[#F9F9F7] dark:bg-gray-800 border-t border-black/5 dark:border-gray-700">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Award, value: '500+', label: 'Projects Delivered' },
              { icon: Users, value: '15+', label: 'Years in Dubai' },
              { icon: Star, value: '4.9/5', label: 'Client Satisfaction' },
              { icon: Shield, value: '32+', label: 'Premium Brand Partners' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
                data-testid={`trust-stat-${i}`}
              >
                <stat.icon className="w-6 h-6 text-[#9F8B65] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1A1A1A] dark:text-white">{stat.value}</div>
                <div className="text-sm text-[#4A4A4A]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9F8B65] mb-3">What To Expect</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#4A4A4A]">
              {['Private 1-on-1 Tour', 'Live System Demos', 'Expert Consultation', 'No Obligation'].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-4xl font-normal text-white md:text-5xl mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Book a private tour of our Experience Centre and discover how we can transform your space.
            </p>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-none px-12 py-6 text-sm uppercase tracking-widest"
              onClick={() => setShowBookingModal(true)}
            >
              Schedule Your Visit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setShowBookingModal(false)
                setBookingStep('date')
                setSubmitStatus('idle')
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-black z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-12">
              {bookingStep === 'date' && (
                <>
                  <h2 className="text-3xl font-bold text-black mb-2">SELECT DATE & TIME</h2>
                  <p className="text-gray-600 mb-8">Choose your preferred visit date and time slot</p>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Date</label>
                    <Input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Time Slot</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setBookingData({ ...bookingData, time: slot })}
                          className={`p-3 border-2 text-sm font-medium transition-colors ${
                            bookingData.time === slot
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    disabled={!bookingData.date || !bookingData.time}
                    onClick={() => setBookingStep('details')}
                    className="w-full bg-black hover:bg-black/90 text-white py-6"
                  >
                    Continue
                  </Button>
                </>
              )}

              {bookingStep === 'details' && (
                <>
                  <h2 className="text-3xl font-bold text-black mb-2">YOUR DETAILS</h2>
                  <p className="text-gray-600 mb-8">Tell us about yourself and your interests</p>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <Input
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                        <Input
                          required
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Lighting', 'Climate', 'Audio', 'Cinema', 'Security', 'Automation'].map(interest => (
                          <button
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`p-3 border-2 text-sm font-medium transition-colors ${
                              bookingData.interests.includes(interest)
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                      <Textarea
                        value={bookingData.message}
                        onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                        rows={4}
                        placeholder="Tell us about your project or any specific questions..."
                      />
                    </div>
                    
                    {/* Honeypot field - hidden from users, catches bots */}
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={bookingData.website}
                        onChange={(e) => setBookingData({ ...bookingData, website: e.target.value })}
                      />
                    </div>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
                      Failed to submit booking. Please try again.
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setBookingStep('date')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={isSubmitting || !bookingData.name || !bookingData.email || !bookingData.phone}
                      onClick={handleBookingSubmit}
                      className="flex-1 bg-black hover:bg-black/90 text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                    </Button>
                  </div>
                </>
              )}

              {bookingStep === 'confirm' && submitStatus === 'success' && (
                <div className="py-12 text-center">
                  <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-black mb-4">Booking Confirmed!</h3>
                  <div className="bg-gray-50 p-6 rounded mb-6">
                    <p className="text-sm text-gray-600 mb-2">Date & Time:</p>
                    <p className="text-lg font-semibold">{bookingData.date} at {bookingData.time}</p>
                  </div>
                  <p className="text-gray-600 mb-8">
                    We&apos;ve sent a confirmation email to <strong>{bookingData.email}</strong>
                  </p>
                  <Button
                    onClick={() => {
                      setShowBookingModal(false)
                      setBookingStep('date')
                      setBookingData({
                        date: '',
                        time: '',
                        name: '',
                        email: '',
                        phone: '',
                        interests: [],
                        message: '',
                        website: ''
                      })
                      setSubmitStatus('idle')
                    }}
                    className="bg-black hover:bg-black/90 text-white px-12"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: 'Luxury Home Cinema',
            description: 'Discover our flagship private theatre experience for villas.',
            href: '/luxury-home-cinema-dubai',
            category: 'Featured Solution'
          },
          {
            title: 'Solutions Overview',
            description: 'Explore all 15+ smart living solutions we offer.',
            href: '/solutions',
            category: 'Explore'
          },
          {
            title: 'Our Process',
            description: 'Learn how we deliver projects from design to lifetime support.',
            href: '/process',
            category: 'How We Work'
          }
        ]}
        title="After Your Visit"
        subtitle="Continue exploring our solutions and services"
      />
    </div>
  )
}
