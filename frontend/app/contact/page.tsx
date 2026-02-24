'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { 
  Phone, Mail, MapPin, Clock, 
  MessageCircle, Send, ExternalLink,
  Facebook, Instagram, Linkedin, Youtube
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const contextData = {
        ...formData,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        pageTitle: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        source: 'contact_page'
      }

      const { submitContact } = await import('@/lib/api')
      const { trackFormSubmission } = await import('@/hooks/useAnalytics')
      
      await submitContact(contextData)
      await trackFormSubmission('contact', 'Contact Page Form', true, { source: 'contact_page' })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      const { trackFormSubmission } = await import('@/hooks/useAnalytics')
      await trackFormSubmission('contact', 'Contact Page Form', false)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Google Maps coordinates for Al Quoz, Dubai
  const mapLocation = {
    lat: 25.1416,
    lng: 55.2204,
    address: "Al Quoz 1, Sheikh Zayed Road, 3rd Interchange, Dubai, UAE"
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation.address)}`
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5!2d55.2204!3d25.1416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAl%20Quoz%201!5e0!3m2!1sen!2sae!4v1234567890`

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/lexalifestyle.ae/', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/lexalifestyle.ae/', color: 'hover:text-blue-600' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/lexalifestyle/', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@lexalifestyle', color: 'hover:text-red-600' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section - Centered */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 block">
              {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {language === 'ar' ? 'لنبدأ مشروعك' : "Let's Start"} <span className="text-gray-400">{language === 'ar' ? '' : 'Your Project'}</span>
            </h1>
            <div className="h-px w-32 bg-[#9F8B65] mb-6 mx-auto" />
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'هل أنت مستعد لتحويل مساحتك؟ فريقنا هنا لمساعدتك في إنشاء تجربة المنزل الذكي المثالية.'
                : 'Ready to transform your space? Our team is here to help you create the perfect smart home experience.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="tel:+97142670470" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
              </a>
              <a 
                href="https://wa.me/971521782109" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                {language === 'ar' ? 'واتساب' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Form - Takes 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {language === 'ar' 
                      ? 'املأ النموذج أدناه وسنرد عليك خلال 24 ساعة.'
                      : "Fill out the form below and we'll get back to you within 24 hours."
                    }
                  </p>

                  {submitStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'ar' ? 'تم إرسال الرسالة!' : 'Message Sent!'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ar' 
                          ? 'شكراً لتواصلك معنا. سنتصل بك قريباً.'
                          : "Thank you for reaching out. We'll contact you shortly."
                        }
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                          </label>
                          <Input
                            name="name"
                            data-testid="contact-name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={language === 'ar' ? 'محمد أحمد' : 'John Smith'}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                          </label>
                          <Input
                            name="phone"
                            data-testid="contact-phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+971 50 123 4567"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {language === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                        </label>
                        <Input
                          name="email"
                          data-testid="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={language === 'ar' ? 'example@email.com' : 'john@example.com'}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {language === 'ar' ? 'الموضوع *' : 'Subject *'}
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-3 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent"
                        >
                          <option value="">{language === 'ar' ? 'اختر موضوعاً...' : 'Select a subject...'}</option>
                          <option value="New Project Inquiry">{language === 'ar' ? 'استفسار عن مشروع جديد' : 'New Project Inquiry'}</option>
                          <option value="Product Information">{language === 'ar' ? 'معلومات عن المنتج' : 'Product Information'}</option>
                          <option value="Schedule Consultation">{language === 'ar' ? 'جدولة استشارة' : 'Schedule Consultation'}</option>
                          <option value="Technical Support">{language === 'ar' ? 'الدعم الفني' : 'Technical Support'}</option>
                          <option value="Partnership Opportunity">{language === 'ar' ? 'فرصة شراكة' : 'Partnership Opportunity'}</option>
                          <option value="Other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {language === 'ar' ? 'الرسالة *' : 'Message *'}
                        </label>
                        <Textarea
                          name="message"
                          data-testid="contact-message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={language === 'ar' ? 'أخبرنا عن مشروعك أو استفسارك...' : 'Tell us about your project or inquiry...'}
                          className="min-h-[120px] resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
                        data-testid="contact-submit"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                          </span>
                        )}
                      </Button>

                      {submitStatus === 'error' && (
                        <p className="text-red-600 text-sm text-center">
                          {language === 'ar' 
                            ? 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.'
                            : 'Something went wrong. Please try again or contact us directly.'
                          }
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Contact */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                  </h3>
                  
                  <div className="space-y-5">
                    <a href="tel:+97142670470" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          {language === 'ar' ? 'الهاتف' : 'Phone'}
                        </p>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">+971 42 670 470</p>
                      </div>
                    </a>

                    <a href="https://wa.me/971521782109" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                        </p>
                        <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">+971 52 178 2109</p>
                      </div>
                    </a>

                    <a href="mailto:sales@lexalifestyle.com" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </p>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">sales@lexalifestyle.com</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {language === 'ar' ? 'ساعات العمل' : 'Business Hours'}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'ar' ? 'السبت - الخميس' : 'Saturday - Thursday'}
                      </span>
                      <span className="font-medium">
                        {language === 'ar' ? '٩:٠٠ ص - ٦:٠٠ م' : '9:00 AM - 6:00 PM'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'ar' ? 'الجمعة' : 'Friday'}
                      </span>
                      <span className="font-medium">
                        {language === 'ar' ? '١٠:٠٠ ص - ٤:٠٠ م' : '10:00 AM - 4:00 PM'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'تابعنا' : 'Follow Us'}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href="https://www.instagram.com/lexalifestyle.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
                      title="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61565723780513"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                      title="Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/lexa-lifestyle-llc/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-400 transition-colors"
                      title="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@lexalifestyle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors"
                      title="YouTube"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Address Card */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? 'زُر صالة العرض' : 'Visit Our Showroom'}
                  </h2>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>LEXA Lifestyle LLC</strong><br />
                    <span className="text-sm text-gray-500">
                      {language === 'ar' ? 'صالة عرض ليكسا بريمير' : 'LEXA PREMIER Showroom'}
                    </span><br /><br />
                    {language === 'ar' ? (
                      <>
                        القوز 1، شارع الشيخ زايد<br />
                        التقاطع الثالث<br />
                        دبي، الإمارات العربية المتحدة
                      </>
                    ) : (
                      <>
                        Al Quoz 1, Sheikh Zayed Road<br />
                        3rd Interchange<br />
                        Dubai, United Arab Emirates
                      </>
                    )}
                  </p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {language === 'ar' ? 'احصل على الاتجاهات' : 'Get Directions'}
                  </a>
                </div>

                {/* Experience Centre CTA */}
                <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'ليكسا بريمير' : 'LEXA PREMIER'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'ar' 
                      ? 'زُر صالة العرض المتطورة لدينا لتجربة تقنية المنزل الذكي عن قرب.'
                      : 'Visit our state-of-the-art showroom to experience smart home technology firsthand.'
                    }
                  </p>
                  <Link 
                    href="/experience-centre"
                    className="text-sm font-medium text-amber-700 hover:text-amber-800"
                  >
                    {language === 'ar' ? 'احجز زيارة ←' : 'Book a Visit →'}
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.6614635837277!2d55.2226452759589!3d25.14713373372549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bc640af2289%3A0xb82b68390913e17a!2sLexa%20Lifestyle%20LLC!5e0!3m2!1sen!2sae!4v1771051862873!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Map Overlay Click */}
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-red-500" />
                  {language === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 border-t">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/calculator" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <p className="font-medium text-gray-900">{language === 'ar' ? 'حاسبة التكلفة' : 'Cost Calculator'}</p>
                <p className="text-sm text-gray-500">{language === 'ar' ? 'قدّر مشروعك' : 'Estimate your project'}</p>
              </Link>
              <Link href="/smart-home-quiz" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <p className="font-medium text-gray-900">{language === 'ar' ? 'اختبار الذكاء الاصطناعي' : 'AI Quiz'}</p>
                <p className="text-sm text-gray-500">{language === 'ar' ? 'احصل على توصيات' : 'Get recommendations'}</p>
              </Link>
              <Link href="/projects" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <p className="font-medium text-gray-900">{language === 'ar' ? 'مشاريعنا' : 'Our Projects'}</p>
                <p className="text-sm text-gray-500">{language === 'ar' ? 'عرض المعرض' : 'View portfolio'}</p>
              </Link>
              <Link href="/packages" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                <p className="font-medium text-gray-900">{language === 'ar' ? 'الباقات' : 'Packages'}</p>
                <p className="text-sm text-gray-500">{language === 'ar' ? 'تصفح الخيارات' : 'Browse options'}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
