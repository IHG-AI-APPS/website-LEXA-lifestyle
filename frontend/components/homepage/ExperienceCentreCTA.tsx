'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  ArrowRight, 
  Play,
  X,
  CheckCircle,
  Building2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const ICON_MAP: Record<string, any> = { Building2, Sparkles, Play, MapPin, Calendar, Clock, Phone }

const DEFAULT_TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const DEFAULT_HIGHLIGHTS = [
  { icon: 'Building2', label: '5,000+ sq ft', desc: 'Showroom' },
  { icon: 'Sparkles', label: '32+ Brands', desc: 'Live demos' },
  { icon: 'Play', label: '6 Zones', desc: 'To explore' },
]

const DEFAULT_GALLERY = [
  { src: 'https://files.ihgbrands.com/lexa/migrated/0641eef46c96198d.webp', title: 'Smart Home Showcase', zone: 'Main Hall' },
  { src: 'https://files.ihgbrands.com/lexa/migrated/add489a013a13706.webp', title: 'Home Cinema Experience', zone: 'Theater Zone' },
  { src: 'https://files.ihgbrands.com/lexa/migrated/8e8a1e890ec79775.webp', title: 'Audio Listening Room', zone: 'Hi-Fi Zone' },
  { src: 'https://files.ihgbrands.com/lexa/migrated/c46836f176dba77d.webp', title: 'Lighting Design Studio', zone: 'Lighting Zone' },
  { src: 'https://files.ihgbrands.com/lexa/migrated/f5e4fceb477845f7.webp', title: 'Security Command Center', zone: 'Security Zone' }
]

export default function ExperienceCentreCTA() {
  const [showBooking, setShowBooking] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    website: '' // Honeypot
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [cmsData, setCmsData] = useState<any>(null)
  const { settings } = useSiteSettings()

  // Fetch CMS data
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_experience_cta`)
      .then(r => r.json())
      .then(d => { if (d?.value) setCmsData(d.value) })
      .catch(() => {})
  }, [])

  const galleryImages = cmsData?.gallery_images?.length ? cmsData.gallery_images : DEFAULT_GALLERY
  const highlights = cmsData?.highlights?.length ? cmsData.highlights : DEFAULT_HIGHLIGHTS
  const timeSlots = cmsData?.time_slots?.length ? cmsData.time_slots : DEFAULT_TIME_SLOTS
  const address = cmsData?.address || 'Al Quoz 1, Dubai'
  const addressDetail = cmsData?.address_detail || 'Sheikh Zayed Road, 3rd Interchange'
  const phoneNumber = cmsData?.phone || '+971 42 670 470'

  // Auto-rotate gallery
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextImage = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleQuickBook = async () => {
    if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone) return
    
    setIsSubmitting(true)
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const response = await fetch(`${BACKEND_URL}/api/experience-centre/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          email: '', // Optional for quick booking
          interests: ['General Tour'],
          message: 'Quick booking from homepage'
        })
      })
      if (!response.ok) throw new Error('Failed')
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#111] py-24 md:py-32 overflow-hidden" data-testid="experience-cta">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            
            {/* Left: Experience Centre Preview with Gallery - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 relative"
            >
              {/* Main Image with Gallery */}
              <div 
                className="relative h-[280px] md:h-[340px] overflow-hidden group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <SafeImage
                      src={galleryImages[currentImage].src}
                      alt={galleryImages[currentImage].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Gallery Navigation Arrows - Mobile visible */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                {/* Sneak Peek Badge with Photo Counter - Mobile optimized */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 md:px-3 md:py-1.5">
                    <Camera className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#E8DCC8]" />
                    <span className="text-white text-[10px] md:text-xs uppercase tracking-wider">Sneak Peek</span>
                  </div>
                </div>
                
                {/* Virtual Tour Button - Mobile optimized */}
                <Link 
                  href="/experience-centre"
                  className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1.5 md:px-4 md:py-2 text-white text-[10px] md:text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  <Play className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span className="hidden xs:inline">Virtual Tour</span>
                  <span className="xs:hidden">Tour</span>
                </Link>

                {/* Current Zone Indicator - Positioned below badges on mobile */}
                <motion.div
                  key={`zone-${currentImage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-14 left-3 md:top-4 md:left-1/2 md:-translate-x-1/2 bg-[#E8DCC8] text-[#1A1A1A] px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider"
                >
                  {galleryImages[currentImage].zone}
                </motion.div>

                {/* Content Overlay - Mobile optimized */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="text-[#E8DCC8] text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1.5 md:mb-2">
                    Visit Our Showroom
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-1">
                    LEXA Experience Centre
                  </h2>
                  <motion.p
                    key={`title-${currentImage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/90 text-xs md:text-sm mb-3"
                  >
                    {galleryImages[currentImage].title}
                  </motion.p>
                  
                  {/* Highlights - Mobile grid layout */}
                  <div className="grid grid-cols-3 gap-2 md:flex md:gap-6">
                    {highlights.map((item: any, i: number) => {
                      const IconComp = ICON_MAP[item.icon] || Sparkles
                      return (
                        <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                          <IconComp className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#E8DCC8]" />
                          <div>
                            <div className="text-white text-xs md:text-sm font-medium leading-tight">{item.label}</div>
                            <div className="text-white/50 text-[10px] md:text-xs">{item.desc}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Gallery Dots - Mobile optimized position */}
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex gap-1">
                  {galleryImages.map((_, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setCurrentImage(idx)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage 
                          ? 'bg-[#E8DCC8] w-6' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Location Bar - Mobile optimized */}
              <div className="bg-[#252525] p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 md:gap-3">
                  <MapPin className="h-4 w-4 text-[#E8DCC8] flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{address}</div>
                    <div className="text-white/50 text-[11px] md:text-xs">{addressDetail}</div>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com/?q=Al+Quoz+1+Sheikh+Zayed+Road+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8DCC8] text-[11px] md:text-xs uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1 ml-6 sm:ml-0"
                >
                  Get Directions
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>

            {/* Right: Quick Booking / Contact - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#252525] h-full p-5 md:p-6 flex flex-col">
                {!showBooking ? (
                  <>
                    {/* Default State - Contact Info */}
                    <div className="mb-auto">
                      <h3 className="text-white text-lg font-semibold mb-1">Schedule a Visit</h3>
                      <p className="text-white/60 text-sm mb-6">Book a private tour with our experts</p>
                      
                      {/* Contact Info Compact */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="h-4 w-4 text-[#E8DCC8]" />
                          </div>
                          <div>
                            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-white text-sm hover:text-[#E8DCC8] transition-colors">
                              {phoneNumber}
                            </a>
                            <div className="text-white/40 text-xs">WhatsApp: +971 52 178 2109</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#E8DCC8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="h-4 w-4 text-[#E8DCC8]" />
                          </div>
                          <div>
                            <div className="text-white text-sm">{settings.business_hours_weekday || 'Sat-Thu: 9AM-6PM'}</div>
                            <div className="text-white/40 text-xs">{settings.business_hours_friday || 'Fri: 10AM-4PM'}</div>
                            <div className="text-white/40 text-xs">{settings.business_hours_sunday || 'Sun: Closed'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-4">
                      <Button
                        onClick={() => setShowBooking(true)}
                        className="w-full bg-[#E8DCC8] text-[#1A1A1A] dark:text-white hover:bg-[#E8DCC8]/90 rounded-none py-5 text-xs uppercase tracking-widest font-bold"
                        data-testid="book-visit-btn"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book a Visit
                      </Button>
                      <Link href="/contact" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/10 rounded-none py-5 text-xs uppercase tracking-widest"
                        >
                          Contact Us
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : submitStatus === 'success' ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center h-full text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">Booking Confirmed!</h3>
                    <p className="text-white/60 text-sm mb-4">
                      {bookingData.date} at {bookingData.time}
                    </p>
                    <p className="text-white/40 text-xs mb-6">
                      We&apos;ll call you to confirm your appointment.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowBooking(false)
                        setSubmitStatus('idle')
                        setBookingData({ date: '', time: '', name: '', phone: '', website: '' })
                      }}
                      className="border-white/20 text-white hover:bg-white/10 rounded-none text-xs"
                    >
                      Done
                    </Button>
                  </div>
                ) : (
                  /* Booking Form */
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white text-lg font-semibold">Quick Booking</h3>
                      <button 
                        onClick={() => setShowBooking(false)}
                        className="text-white/50 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                          Your Name *
                        </label>
                        <Input
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          className="bg-[#1A1A1A] border-white/10 text-white rounded-none h-10"
                          placeholder="Full name"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                          Phone *
                        </label>
                        <Input
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="bg-[#1A1A1A] border-white/10 text-white rounded-none h-10"
                          placeholder="+971..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                          Preferred Date *
                        </label>
                        <Input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-[#1A1A1A] border-white/10 text-white rounded-none h-10"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                          Time Slot *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setBookingData({ ...bookingData, time: slot })}
                              className={`py-2 text-xs border transition-colors ${
                                bookingData.time === slot
                                  ? 'border-[#E8DCC8] bg-[#E8DCC8]/10 text-[#E8DCC8]'
                                  : 'border-white/10 text-white/60 hover:border-white/30'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Honeypot */}
                      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <input
                          type="text"
                          tabIndex={-1}
                          value={bookingData.website}
                          onChange={(e) => setBookingData({ ...bookingData, website: e.target.value })}
                        />
                      </div>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-400 text-xs mb-3">Failed to book. Please try again.</p>
                    )}

                    <Button
                      onClick={handleQuickBook}
                      disabled={isSubmitting || !bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone}
                      className="w-full bg-[#E8DCC8] text-[#1A1A1A] dark:text-white hover:bg-[#E8DCC8]/90 rounded-none py-5 text-xs uppercase tracking-widest font-bold mt-4 disabled:opacity-50"
                      data-testid="confirm-booking-btn"
                    >
                      {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
