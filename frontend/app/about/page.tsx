'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import TeamSection from '@/components/sections/TeamSection'
import ConsultationForm from '@/components/forms/ConsultationForm'
import RelatedPagesNav from '@/components/navigation/RelatedPagesNav'
import { Award, Users, Building, Target, MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const values = [
    { 
      icon: Award, 
      title: language === 'ar' ? 'الابتكار بهدف' : 'Innovation with Purpose', 
      description: language === 'ar' 
        ? 'نختار وندمج التقنيات التي تحسّن الراحة والتحكم ونمط الحياة فعلياً – وليس أدوات لمجرد المظهر.'
        : 'We select and integrate technologies that genuinely improve comfort, control, and lifestyle – not gadgets for the sake of it.' 
    },
    { 
      icon: Users, 
      title: language === 'ar' ? 'التفكير المبني على التصميم' : 'Design-Led Thinking', 
      description: language === 'ar'
        ? 'كل حل يحترم العمارة والديكور الداخلي وطريقة عيش عملائنا في مساحاتهم.'
        : 'Every solution respects architecture, interiors, and the way our clients actually live in their spaces.' 
    },
    { 
      icon: Building, 
      title: language === 'ar' ? 'جودة لا تقبل التنازل' : 'Uncompromising Quality', 
      description: language === 'ar'
        ? 'من العلامات التجارية التي نتشارك معها إلى الكابلات خلف الجدران، نصر على الموثوقية والأداء طويل المدى.'
        : 'From brands we partner with to the cables behind the walls, we insist on long-term reliability and performance.' 
    },
    { 
      icon: Target, 
      title: language === 'ar' ? 'التسليم المرتكز على العميل' : 'Client-Centric Delivery', 
      description: language === 'ar'
        ? 'نتواصل بوضوح، ونلتزم بالمواعيد، ونتحمل المسؤولية من الفكرة إلى الإنجاز وما بعده.'
        : 'We communicate clearly, meet timelines, and stay accountable from concept to completion and beyond.' 
    },
  ]

  const milestones = [
    { year: '2005', title: language === 'ar' ? 'التأسيس في دبي' : 'Founded in Dubai', description: language === 'ar' ? 'بدأنا برؤية لرفع مستوى العيش الذكي في الإمارات' : 'Started with a vision to elevate smart living in the UAE' },
    { year: '2010', title: language === 'ar' ? 'مركز التجربة' : 'Experience Center', description: language === 'ar' ? 'افتتحنا صالة عرض بمساحة 60,000 قدم مربع تعرض الأنظمة المتكاملة' : 'Opened 60,000 sq ft showroom showcasing integrated systems' },
    { year: '2015', title: language === 'ar' ? '500 مشروع' : '500 Projects', description: language === 'ar' ? 'إنجاز هام عبر القطاعات السكنية والتجارية' : 'Milestone achievement across residential and commercial sectors' },
    { year: '2020', title: language === 'ar' ? 'التوسع الإقليمي' : 'Regional Expansion', description: language === 'ar' ? 'مددنا خدماتنا عبر أسواق الخليج' : 'Extended services across GCC markets' },
    { year: '2025', title: language === 'ar' ? '+1,000 مشروع' : '1,000+ Projects', description: language === 'ar' ? 'شريك موثوق للتطويرات الفاخرة والمساكن الراقية' : 'Trusted partner for luxury developments and high-end residences' },
  ]

  const partners = [
    'Crestron',
    'Lutron',
    'Control4',
    'Savant',
    'Bang & Olufsen',
    'Sonos',
    'Bowers & Wilkins',
    'Nest'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="section-label mb-6">{language === 'ar' ? 'عن ليكسا' : 'About LEXA'}</div>
                
                <h1 className="display-heading mb-8">
                  {language === 'ar' ? 'مُصمَّم' : 'DESIGNED'}
                  <br />
                  {language === 'ar' ? 'من أجل' : 'FOR'}
                  <br />
                  {language === 'ar' ? 'التميز' : 'EXCELLENCE'}
                </h1>
                
                <div className="h-px w-24 bg-[#E8DCC8] mb-8" />
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {language === 'ar' 
                    ? 'في ليكسا لايف ستايل، نؤمن بأن الفخامة تُعرَّف بالتجارب السلسة والتصميم الذكي والعيش الراقي. ومقرنا في دبي، نتخصص في أنظمة الصوت والصورة الراقية وأتمتة المنزل الذكي وحلول نمط الحياة المخصصة التي تمزج التقنية المتطورة بالأناقة الخالدة.'
                    : 'At Lexa Lifestyle, we believe luxury is defined by seamless experiences, intelligent design, and refined living. Based in Dubai, we specialize in high-end audio-visual systems, smart home automation, and bespoke lifestyle solutions that blend cutting-edge technology with timeless elegance.'
                  }
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language === 'ar'
                    ? 'نحن لا نركّب الأنظمة فحسب – بل ننسّق تجارب ترتقي بالحياة اليومية إلى شيء استثنائي. في ليكسا لايف ستايل، تلتقي التقنية بنمط الحياة، ويصبح نمط الحياة فناً.'
                    : "We don't just install systems—we curate experiences that elevate everyday living into something extraordinary. At Lexa Lifestyle, technology meets lifestyle, and lifestyle becomes art."
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px]"
              >
                <SafeImage
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="LEXA Lifestyle - Modern Luxury Interior"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="h2 mb-6">{language === 'ar' ? 'قيمنا' : 'Our Values'}</h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === 'ar' ? 'المبادئ التي توجه كل قرار ومشروع.' : 'Principles that guide every decision and project.'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <Icon size={32} className="text-charcoal" strokeWidth={1.5} />
                    </div>
                    <h3 className="h3 mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="h2 text-white mb-6">{language === 'ar' ? 'رحلتنا' : 'Our Journey'}</h2>
              <p className="text-base text-gray-400 max-w-2xl">
                {language === 'ar' ? 'عقدان من الابتكار والنمو في تكامل العيش الذكي.' : 'Two decades of innovation and growth in smart living integration.'}
              </p>
            </motion.div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-8 items-start border-b border-gray-800 pb-8"
                >
                  <span className="text-4xl font-semibold text-gray-600 dark:text-gray-400 min-w-[100px]">{milestone.year}</span>
                  <div>
                    <h3 className="h3 text-white mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-6">{language === 'ar' ? 'شركاء العلامات التجارية' : 'Brand Partners'}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-normal max-w-2xl mx-auto">
                {language === 'ar' ? 'مدمجون معتمدون لأبرز علامات المنزل الذكي في العالم.' : "Authorized integrators for the world's leading smart home brands."}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 p-6 flex items-center justify-center text-center"
                >
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-400 dark:text-gray-400">{partner}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Experience Center */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-5xl font-semibold text-white mb-6">
                {language === 'ar' ? 'مركز التجربة' : 'Experience Center'}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {language === 'ar' 
                  ? 'صالة عرض بمساحة 60,000 قدم مربع تضم مساحات معيشة متكاملة بالكامل'
                  : '60,000 sq ft showroom featuring fully integrated living spaces'
                }
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <MapPin size={20} />
                  <span>{language === 'ar' ? 'القوز 1، شارع الشيخ زايد، دبي، الإمارات' : 'Al Quoz 1, Sheikh Zayed Road, Dubai, UAE'}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <Phone size={20} />
                  <span>+971 4 XXX XXXX</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <Mail size={20} />
                  <span>hello@lexalifestyle.ae</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-charcoal dark:text-gray-200 px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                {language === 'ar' ? 'احجز زيارة للصالة' : 'Book Showroom Visit'}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold mb-6">
                {language === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-normal mb-10">
                {language === 'ar' ? 'دعنا نناقش كيف يمكننا تحويل مساحتك.' : "Let's discuss how we can transform your space."}
              </p>
              <Button
                size="lg"
                className="bg-charcoal hover:bg-charcoal-light text-white px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                {language === 'ar' ? 'مراجعة تقنية الفيلا' : 'Villa Technology Review'}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Pages Navigation */}
      <RelatedPagesNav
        pages={[
          {
            title: language === 'ar' ? 'معلومات الشركة' : 'Company Info',
            description: language === 'ar' ? 'تعرف على تاريخ ليكسا وقيمها وفريقها.' : "Learn about LEXA's history, values, and our team.",
            href: '/company',
            category: language === 'ar' ? 'عنا' : 'About Us'
          },
          {
            title: language === 'ar' ? 'عمليتنا' : 'Our Process',
            description: language === 'ar' ? 'شاهد كيف ننفذ المشاريع من التصميم إلى الدعم.' : 'See how we deliver projects from design to support.',
            href: '/process',
            category: language === 'ar' ? 'كيف نعمل' : 'How We Work'
          },
          {
            title: language === 'ar' ? 'الوظائف' : 'Careers',
            description: language === 'ar' ? 'انضم إلى فريقنا المتنامي من خبراء العيش الذكي.' : 'Join our growing team of smart living experts.',
            href: '/careers',
            category: language === 'ar' ? 'انضم إلينا' : 'Join Us'
          }
        ]}
        title={language === 'ar' ? 'اعرف المزيد عن ليكسا' : 'Learn More About LEXA'}
      />

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}
