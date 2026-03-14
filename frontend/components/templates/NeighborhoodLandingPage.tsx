'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Home, Phone, CheckCircle, Star, Clock, Shield, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TrustBadges } from '@/components/trust/TrustBadges'
import Script from 'next/script'

interface NeighborhoodLandingPageProps {
  name: string
  slug: string
  title: string
  description: string
  heroImage: string
  features: string[]
  stats: {
    projects: number
    avgSize: string
    avgBudget: string
  }
  testimonial: {
    quote: string
    author: string
    role: string
  }
  keywords: string[]
}

export default function NeighborhoodLandingPage({
  name,
  slug,
  title,
  description,
  heroImage,
  features,
  stats,
  testimonial,
  keywords
}: NeighborhoodLandingPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'villa',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: `area_page_${slug}`,
          area: name
        })
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi LEXA, I'm interested in smart home automation for my property in ${name}.\n\nProperty Type: ___\nSize: ___ sqft\nBudget Range: ___`
  )

  // LocalBusiness + Service schema for this area
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://lexalifestyle.com/areas/${slug}`,
    name: `LEXA Lifestyle - ${name} Smart Home Automation`,
    description: description,
    image: heroImage,
    url: `https://lexalifestyle.com/areas/${slug}`,
    telephone: '+971-4-333-0522',
    email: 'info@lexalifestyle.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Al Quoz 1',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE'
    },
    areaServed: {
      '@type': 'Place',
      name: name + ', Dubai, UAE'
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 25.2048,
        longitude: 55.2708
      },
      geoRadius: '50000'
    },
    priceRange: stats.avgBudget,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: stats.projects
    }
  }

  return (
    <>
      <Script
        id={`area-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-[#0A0A0A]">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>
          
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-[#C9A962] mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest">{name}, Dubai</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Home Automation<br />
                <span className="text-[#C9A962]">{name}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-[#C9A962] hover:bg-[#B8894D] text-black font-semibold px-8"
                  onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href={`https://wa.me/971521782109?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#111] border-y border-zinc-800/50 py-8">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#C9A962]">{stats.projects}+</div>
                <div className="text-sm text-zinc-400 mt-1">Projects in {name}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">{stats.avgSize}</div>
                <div className="text-sm text-zinc-400 mt-1">Average Property Size</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">{stats.avgBudget}</div>
                <div className="text-sm text-zinc-400 mt-1">Average Investment</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Smart Home Solutions for {name}
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Tailored automation solutions designed specifically for {name} properties and lifestyle.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 hover:border-[#C9A962]/30 transition-colors"
                >
                  <CheckCircle className="w-8 h-8 text-[#C9A962] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                  <p className="text-sm text-zinc-500">
                    Professional installation and configuration for {name} properties.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-6 md:px-12 bg-[#111]">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Our Services in {name}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Home Theater & Cinema', desc: 'Immersive entertainment systems', icon: '🎬' },
                { title: 'Smart Lighting Control', desc: 'Intelligent lighting scenes', icon: '💡' },
                { title: 'Multi-Room Audio', desc: 'Whole-home music systems', icon: '🔊' },
                { title: 'Climate Control', desc: 'Automated HVAC management', icon: '❄️' },
                { title: 'Security Systems', desc: 'Smart locks & surveillance', icon: '🔒' },
                { title: 'Motorized Shades', desc: 'Automated window treatments', icon: '🪟' },
              ].map((service, index) => (
                <Link 
                  key={index}
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-[#0A0A0A] rounded-xl p-6 border border-zinc-800/50 hover:border-[#C9A962]/50 transition-all group"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#C9A962] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <Star className="w-8 h-8 text-[#C9A962] mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div className="text-[#C9A962] font-semibold">{testimonial.author}</div>
            <div className="text-zinc-500 text-sm">{testimonial.role}</div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges variant="horizontal" />

        {/* Consultation Form */}
        <section id="consultation-form" className="py-20 px-6 md:px-12 bg-[#111]">
          <div className="max-w-[600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Your Free {name} Consultation
              </h2>
              <p className="text-zinc-400">
                Speak with our {name} smart home specialists
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#C9A962]/10 border border-[#C9A962]/30 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-12 h-12 text-[#C9A962] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Request Received!</h3>
                <p className="text-zinc-400">
                  Our {name} specialist will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#0A0A0A] rounded-2xl p-8 border border-zinc-800/50">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Full Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-[#151515] border-zinc-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Phone</label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 XX XXX XXXX"
                        className="bg-[#151515] border-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Email</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-[#151515] border-zinc-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full p-3 rounded-lg bg-[#151515] border border-zinc-800 text-white"
                    >
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Tell us about your project</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Property size, current stage, specific requirements..."
                      rows={4}
                      className="w-full p-3 rounded-lg bg-[#151515] border border-zinc-800 text-white resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C9A962] hover:bg-[#B8894D] text-black font-semibold py-6"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Other Areas */}
        <section className="py-16 px-6 md:px-12 border-t border-zinc-800/50">
          <div className="max-w-[1400px] mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              We Also Serve
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Palm Jumeirah', 'Emirates Hills', 'Dubai Marina', 'Downtown Dubai', 'Arabian Ranches', 'Jumeirah', 'Business Bay', 'Al Barari']
                .filter(area => area !== name)
                .map((area, index) => (
                  <Link
                    key={index}
                    href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-[#151515] rounded-full text-sm text-zinc-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
                  >
                    {area}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
