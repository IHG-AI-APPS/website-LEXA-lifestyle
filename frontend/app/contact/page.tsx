'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

export default function ContactPage() {
  const { t, language } = useLanguage()
  const cms = useCms('page_contact', null) as any
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const contextData = { ...formData, pageUrl: typeof window !== 'undefined' ? window.location.href : '', timestamp: new Date().toISOString(), source: 'contact_page' }
      const { submitContact } = await import('@/lib/api')
      await submitContact(contextData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch { setSubmitStatus('error') }
    finally { setIsSubmitting(false) }
  }

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+971 50 326 7227', link: 'tel:+971503267227' },
    { icon: Mail, title: 'Email', value: 'info@lexalifestyle.com', link: 'mailto:info@lexalifestyle.com' },
    { icon: MapPin, title: 'Office', value: 'Al Quoz 1, Sheikh Zayed Road\n3rd Interchange, Dubai, UAE', link: 'https://maps.google.com/?q=Al+Quoz+1+Dubai' },
    { icon: Clock, title: 'Hours', value: 'Sat-Thu: 9AM-6PM\nFri: 10AM-4PM' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=50)"}} className="absolute inset-0 bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-[#0A0A0A]/30" />
        </div>
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Get in Touch</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="contact-title">Contact LEXA</h1>
            <p className="hero-animate-desc text-base text-gray-300 max-w-lg mx-auto">Whether you have a question, need a quote, or want to discuss your project, we&apos;re here to help.</p>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              const content = (
                <div className="flex items-start gap-4">
                  <Icon className="h-5 w-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{info.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{info.value}</p>
                  </div>
                </div>
              )
              return info.link ? <a key={i} href={info.link} className="hover:opacity-80 transition-opacity">{content}</a> : <div key={i}>{content}</div>
            })}
          </div>
        </div>
      </section>

      {/* Contact Form + Quick Links */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Send a Message</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">How Can We Help?</h2>

                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We&apos;ll get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => setSubmitStatus('idle')}>Send Another</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Name</label><Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Your name" required data-testid="contact-name" /></div>
                      <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label><Input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required data-testid="contact-email" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone</label><Input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="+971 50 XXX XXXX" data-testid="contact-phone" /></div>
                      <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Subject</label><Input value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help?" data-testid="contact-subject" /></div>
                    </div>
                    <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Message</label><Textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project..." rows={5} required data-testid="contact-message" /></div>
                    <Button type="submit" size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold w-full sm:w-auto" disabled={isSubmitting} data-testid="contact-submit">
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2" size={16} />
                    </Button>
                    {submitStatus === 'error' && <p className="text-sm text-red-500">Failed to send. Please try again or email us directly.</p>}
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-5">
                  <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Connect</h3>
                    <div className="space-y-4">
                      <a href="https://wa.me/971503267227" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                        <MessageCircle className="h-5 w-5 text-green-400" />
                        <div><p className="text-sm font-medium">WhatsApp</p><p className="text-xs text-gray-400">Chat with us instantly</p></div>
                      </a>
                      <a href="tel:+971503267227" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                        <Phone className="h-5 w-5 text-[#C9A962]" />
                        <div><p className="text-sm font-medium">Call Us</p><p className="text-xs text-gray-400">+971 50 326 7227</p></div>
                      </a>
                    </div>
                  </div>
                  <Link href="/consultation" className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 transition-all group">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#C9A962] transition-colors">Book a Consultation</h3>
                    <p className="text-sm text-gray-500">Free site visit or virtual meeting</p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#C9A962] mt-2">Learn more <ArrowRight size={12} /></span>
                  </Link>
                  <Link href="/experience-centre" className="block p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 transition-all group">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#C9A962] transition-colors">Visit Our Showroom</h3>
                    <p className="text-sm text-gray-500">5,000+ sq ft experience centre</p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#C9A962] mt-2">Book visit <ArrowRight size={12} /></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Prefer to Visit?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">See Our Work in Person</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Visit our Experience Centre for a private demonstration of our smart home solutions.</p>
            <Button size="lg" className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8" asChild>
              <Link href="/experience-centre">Book Showroom Visit <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
