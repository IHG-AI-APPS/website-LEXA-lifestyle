'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { MapPin, Calendar, Mail, Clock, CheckCircle2, X, Shield, Star, Users, Award, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const facilities = [
  { id: 1, title: 'Smart Home Showcase', description: 'Experience the latest in home automation, lighting control, and intelligent living systems.', image: 'https://images.unsplash.com/photo-1740842311434-522bb411af15?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['Voice Control', 'Automated Lighting', 'Climate Management'] },
  { id: 2, title: 'Home Cinema Experience', description: 'State-of-the-art home theater with premium acoustics and immersive 4K projection.', image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['Dolby Atmos', '4K Projection', 'Acoustic Treatment'] },
  { id: 3, title: 'Premium Brand Gallery', description: 'Explore luxury brands and cutting-edge technology solutions from world-leading manufacturers.', image: 'https://images.unsplash.com/photo-1760067537524-a0c0703d9721?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['32+ Brands', 'Live Demos', 'Expert Consultation'] },
  { id: 4, title: 'Audio & Multi-Room Systems', description: 'High-fidelity audio solutions with multi-room capabilities and wireless streaming.', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['Hi-Fi Systems', 'Multi-Room Audio', 'Streaming Integration'] },
  { id: 5, title: 'Lighting Design Studio', description: 'Sophisticated lighting control systems showcasing ambiance and energy efficiency.', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['Scene Control', 'Circadian Lighting', 'Energy Monitoring'] },
  { id: 6, title: 'Security & Surveillance', description: 'Advanced security systems with facial recognition, access control, and monitoring.', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?crop=entropy&cs=srgb&fm=jpg&q=85', features: ['Facial Recognition', 'Access Control', '24/7 Monitoring'] },
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export default function ExperienceCentrePage() {
  const cms = useCms('page_experience_centre', null) as any
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'confirm'>('date')
  const [bookingData, setBookingData] = useState({ date: '', time: '', name: '', email: '', phone: '', interests: [] as string[], message: '', website: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleBookingSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const response = await fetch(`${BACKEND_URL}/api/experience-centre/booking`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookingData) })
      if (!response.ok) throw new Error('Failed')
      setSubmitStatus('success')
      setBookingStep('confirm')
    } catch { setSubmitStatus('error') }
    finally { setIsSubmitting(false) }
  }

  const handleInterestToggle = (interest: string) => {
    setBookingData(prev => ({ ...prev, interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest] }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20" data-testid="experience-centre-page">
      {/* Hero — Center Aligned with Background Image */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white pt-12 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SafeImage src="https://images.unsplash.com/photo-1735320858258-12fbcefcb3a7?crop=entropy&cs=srgb&fm=jpg&q=85" alt="LEXA Experience Centre" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>

        <div className="container relative z-10 mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5" data-testid="experience-badge">Visit Us</span>
              <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight leading-tight" data-testid="experience-title">
                LEXA EXPERIENCE CENTRE
              </h1>
              <p className="text-base text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
                Visit our 5,000+ sq ft showroom in Dubai and experience luxury smart living first-hand. Touch, feel, and interact with the latest technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setShowBookingModal(true)} data-testid="hero-book-visit">
                  Book a Private Tour <ArrowRight className="ml-2" size={18} />
                </Button>
                <a href="tel:+971503267227">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10"><Phone className="mr-2" size={16} /> Call Us</Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Info Bar */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-[#C9A962] flex-shrink-0 mt-0.5" />
              <div><h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Location</h3><p className="text-sm text-gray-600 dark:text-gray-400">Al Quoz 1, Sheikh Zayed Road<br />3rd Interchange, Dubai, UAE</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-[#C9A962] flex-shrink-0 mt-0.5" />
              <div><h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Opening Hours</h3><p className="text-sm text-gray-600 dark:text-gray-400">Sat - Thu: 9 AM - 6 PM<br />Friday: 10 AM - 4 PM</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-[#C9A962] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Book a Visit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Schedule a private tour with our experts</p>
                <Button size="sm" className="bg-gray-900 dark:bg-[#C9A962] text-white dark:text-gray-900 hover:bg-gray-800 text-xs uppercase tracking-widest" onClick={() => setShowBookingModal(true)}>Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Centre */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Our Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">More Than a Showroom</h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The LEXA Experience Centre is a fully functional smart home environment where you can experience the future of luxury living. With over 5,000 sq ft of space, our centre showcases integrated solutions from the world&apos;s leading brands.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              From home automation to cinema-grade audio-visual systems, our expert team will guide you through personalized demonstrations tailored to your project requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="facilities-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Explore</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What You&apos;ll Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, i) => (
                <motion.div key={facility.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage src={facility.image} alt={facility.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{facility.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{facility.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feat) => (
                        <span key={feat} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">{feat}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[{ value: '500+', label: 'Projects Delivered' }, { value: '15+', label: 'Years in Dubai' }, { value: '4.9/5', label: 'Client Satisfaction' }, { value: '32+', label: 'Premium Brands' }].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                <p className="text-3xl font-bold text-[#C9A962] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">What To Expect</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-10 text-gray-900 dark:text-white">Your Visit Experience</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[{ icon: Users, label: 'Private 1-on-1 Tour' }, { icon: Star, label: 'Live System Demos' }, { icon: Shield, label: 'Expert Consultation' }, { icon: Award, label: 'No Obligation' }].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex flex-col items-center p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-3"><Icon className="text-white dark:text-gray-900" size={20} /></div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">{item.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Visit?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Experience the Future of Smart Living</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Book a private tour of our Experience Centre and discover how we can transform your space.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" onClick={() => setShowBookingModal(true)} data-testid="cta-book-visit">
              Schedule Your Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBookingModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Book Your Visit</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X size={20} /></button>
            </div>

            {bookingStep === 'date' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Preferred Date</label>
                  <Input type="date" value={bookingData.date} onChange={e => setBookingData(p => ({ ...p, date: e.target.value }))} className="w-full" data-testid="booking-date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Preferred Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button key={slot} onClick={() => setBookingData(p => ({ ...p, time: slot }))}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors ${bookingData.time === slot ? 'bg-[#C9A962] text-gray-900 border-[#C9A962]' : 'border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/50'}`}>{slot}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {['Automation', 'Cinema', 'Audio', 'Lighting', 'Security', 'Climate'].map(interest => (
                      <button key={interest} onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${bookingData.interests.includes(interest) ? 'bg-[#C9A962] text-gray-900 border-[#C9A962]' : 'border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/50'}`}>{interest}</button>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={() => setBookingStep('details')} disabled={!bookingData.date || !bookingData.time}>Continue</Button>
              </div>
            )}

            {bookingStep === 'details' && (
              <div className="space-y-4">
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label><Input value={bookingData.name} onChange={e => setBookingData(p => ({ ...p, name: e.target.value }))} placeholder="Your name" data-testid="booking-name" /></div>
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label><Input type="email" value={bookingData.email} onChange={e => setBookingData(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" data-testid="booking-email" /></div>
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone</label><Input type="tel" value={bookingData.phone} onChange={e => setBookingData(p => ({ ...p, phone: e.target.value }))} placeholder="+971 50 XXX XXXX" data-testid="booking-phone" /></div>
                <div className="hidden"><Input type="text" value={bookingData.website} onChange={e => setBookingData(p => ({ ...p, website: e.target.value }))} tabIndex={-1} /></div>
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Message (Optional)</label><Textarea value={bookingData.message} onChange={e => setBookingData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project..." rows={3} /></div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setBookingStep('date')} className="flex-1">Back</Button>
                  <Button className="flex-1 bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold" onClick={handleBookingSubmit} disabled={isSubmitting || !bookingData.name || !bookingData.email}>
                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                  </Button>
                </div>
                {submitStatus === 'error' && <p className="text-sm text-red-500 text-center">Something went wrong. Please try again.</p>}
              </div>
            )}

            {bookingStep === 'confirm' && (
              <div className="text-center py-6">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit Booked!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">We&apos;ll confirm your appointment via email at {bookingData.email}.</p>
                <p className="text-sm text-gray-500 mb-6">{bookingData.date} at {bookingData.time}</p>
                <Button onClick={() => { setShowBookingModal(false); setBookingStep('date'); setSubmitStatus('idle') }} className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90">Close</Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
