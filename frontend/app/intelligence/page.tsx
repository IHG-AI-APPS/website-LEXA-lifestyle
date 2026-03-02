'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { 
  Brain, 
  Building2, 
  Zap, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Users,
  Lightbulb,
  Sun,
  Thermometer,
  Lock,
  Wifi,
  Mic,
  Tv,
  Leaf,
  Droplets,
  Home,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface IntelligenceFeature {
  id: string
  title: string
  description: string
  category: string
  image?: string
  price?: number
  slug?: string
}

// Category icons mapping
const categoryIcons: Record<string, any> = {
  lighting: Sun,
  security: Shield,
  climate: Thermometer,
  voice_ai: Mic,
  entertainment: Tv,
  network: Wifi,
  convenience: Home,
  wellness: Leaf,
  water: Droplets,
  outdoor: Building2,
  shading: Sun,
  appliances: Zap,
  pets: Users,
  elderly: Users,
  cleaning: Sparkles
}

// Category display names
const categoryNames: Record<string, { en: string; ar: string }> = {
  lighting: { en: 'Smart Lighting', ar: 'الإضاءة الذكية' },
  security: { en: 'Security & Safety', ar: 'الأمن والسلامة' },
  climate: { en: 'Climate Control', ar: 'التحكم بالمناخ' },
  voice_ai: { en: 'Voice & AI', ar: 'الصوت والذكاء الاصطناعي' },
  entertainment: { en: 'Entertainment', ar: 'الترفيه' },
  network: { en: 'Networking', ar: 'الشبكات' },
  convenience: { en: 'Convenience', ar: 'الراحة' },
  wellness: { en: 'Wellness', ar: 'الصحة' },
  water: { en: 'Water Management', ar: 'إدارة المياه' },
  outdoor: { en: 'Outdoor Living', ar: 'المعيشة الخارجية' },
  shading: { en: 'Shading & Blinds', ar: 'التظليل والستائر' },
  appliances: { en: 'Smart Appliances', ar: 'الأجهزة الذكية' },
  pets: { en: 'Pet Care', ar: 'رعاية الحيوانات' },
  elderly: { en: 'Elderly Care', ar: 'رعاية كبار السن' },
  cleaning: { en: 'Smart Cleaning', ar: 'التنظيف الذكي' }
}

export default function IntelligencePage() {
  const cms = useCms('page_intelligence_listing', null)

  const { language } = useLanguage()
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [features, setFeatures] = useState<IntelligenceFeature[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/intelligence/features?limit=100`)
        if (response.ok) {
          const data = await response.json()
          setFeatures(data.features || [])
          
          // Extract unique categories
          const cats = Array.from(new Set(data.features?.map((f: IntelligenceFeature) => f.category) || []))
          setCategories(cats.filter(Boolean) as string[])
        }
      } catch (error) {
        console.error('Failed to load intelligence features:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeatures()
  }, [])

  const filteredFeatures = selectedCategory 
    ? features.filter(f => f.category === selectedCategory)
    : features

  const benefits = [
    { en: 'Real-time operational insights', ar: 'رؤى تشغيلية في الوقت الفعلي' },
    { en: 'Predictive maintenance alerts', ar: 'تنبيهات الصيانة التنبؤية' },
    { en: '30-40% energy cost reduction', ar: 'تخفيض 30-40% في تكاليف الطاقة' },
    { en: 'Enhanced occupant comfort', ar: 'راحة محسنة للسكان' },
    { en: 'Automated compliance reporting', ar: 'تقارير الامتثال الآلية' },
    { en: 'Scalable cloud architecture', ar: 'بنية سحابية قابلة للتوسع' }
  ]

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 sm:py-32">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1696694138288-d3c14bdd35f1?w=1200&q=50" alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Brain className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {language === 'ar' ? 'منصة ذكاء المباني' : 'Building Intelligence Platform'}
                </span>
              </div>
              
              <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-6 leading-tight">
                {language === 'ar' ? 'مبناك.' : 'Your Building.'}<br />
                <span className="text-gray-300">
                  {language === 'ar' ? 'مُنسق بذكاء.' : 'Intelligently Orchestrated.'}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                {language === 'ar' 
                  ? 'حوّل مساحتك إلى نظام بيئي حي ومتعلم. تجمع منصتنا الذكية بين الذكاء الاصطناعي وإنترنت الأشياء والأتمتة لإنشاء مبانٍ تفكر وتتكيف وتحسن نفسها.'
                  : 'Transform your space into a living, learning ecosystem. Our intelligence platform combines AI, IoT, and automation to create buildings that think, adapt, and optimize themselves.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationForm(true)}
                  className="bg-white text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:bg-gray-800 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  {language === 'ar' ? 'جدولة تدقيق ذكي' : 'Schedule Intelligence Audit'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] dark:text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <Link href="/contact">
                    {language === 'ar' ? 'طلب عرض توضيحي' : 'Request Demo'}
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#E8DCC8]">{features.length}+</div>
                  <div className="text-sm text-gray-400">
                    {language === 'ar' ? 'ميزات ذكية' : 'Smart Features'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#E8DCC8]">{categories.length}</div>
                  <div className="text-sm text-gray-400">
                    {language === 'ar' ? 'فئات' : 'Categories'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#E8DCC8]">40%</div>
                  <div className="text-sm text-gray-400">
                    {language === 'ar' ? 'توفير الطاقة' : 'Energy Savings'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter with Previous/Next Navigation */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700 sticky top-16 sm:top-18 md:top-20 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between gap-4">
              {/* Previous Button */}
              <button
                onClick={() => {
                  const currentIndex = selectedCategory ? categories.indexOf(selectedCategory) : -1
                  if (currentIndex > 0) {
                    setSelectedCategory(categories[currentIndex - 1])
                  } else if (currentIndex === 0) {
                    setSelectedCategory(null)
                  }
                }}
                disabled={selectedCategory === null}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 dark:border-gray-600"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span className="hidden sm:inline">{language === 'ar' ? 'السابق' : 'Previous'}</span>
              </button>

              {/* Current Category Display */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] text-white rounded-full">
                  {selectedCategory ? (
                    <>
                      {(() => {
                        const Icon = categoryIcons[selectedCategory] || Brain
                        return <Icon className="h-5 w-5" />
                      })()}
                      <span className="font-medium">
                        {categoryNames[selectedCategory]?.[language === 'ar' ? 'ar' : 'en'] || selectedCategory}
                      </span>
                      <span className="text-xs opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                        {features.filter(f => f.category === selectedCategory).length}
                      </span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5" />
                      <span className="font-medium">{language === 'ar' ? 'جميع الفئات' : 'All Categories'}</span>
                      <span className="text-xs opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                        {features.length}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  const currentIndex = selectedCategory ? categories.indexOf(selectedCategory) : -1
                  if (currentIndex < categories.length - 1) {
                    setSelectedCategory(categories[currentIndex + 1])
                  }
                }}
                disabled={selectedCategory === categories[categories.length - 1]}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 dark:border-gray-600"
              >
                <span className="hidden sm:inline">{language === 'ar' ? 'التالي' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Category Progress Indicator */}
            <div className="flex items-center justify-center gap-1 mt-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedCategory === null ? 'bg-[#1A1A1A] w-4' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={language === 'ar' ? 'الكل' : 'All'}
              />
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedCategory === cat ? 'bg-[#1A1A1A] w-4' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={categoryNames[cat]?.[language === 'ar' ? 'ar' : 'en'] || cat}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white dark:text-white">
                {selectedCategory 
                  ? categoryNames[selectedCategory]?.[language === 'ar' ? 'ar' : 'en'] || selectedCategory
                  : (language === 'ar' ? 'جميع الميزات الذكية' : 'All Intelligence Features')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'ar' 
                  ? 'استكشف مجموعتنا الشاملة من حلول المنزل والمبنى الذكي'
                  : 'Explore our comprehensive collection of smart home and building solutions'}
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(showAll ? filteredFeatures : filteredFeatures.slice(0, 20)).map((feature, index) => {
                  const Icon = categoryIcons[feature.category] || Brain
                  return (
                    <motion.div
                      key={feature.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={`/intelligence/${feature.id || feature.slug || index}`}
                        className="group block h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:border-gray-700"
                      >
                        {/* Image/Icon Header */}
                        <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-xl group-hover:scale-110 transition-transform">
                            <Icon className="h-10 w-10 text-[#1A1A1A] dark:text-white dark:text-[#E8DCC8]" />
                          </div>
                          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded-md text-[10px] text-white font-medium uppercase">
                            {categoryNames[feature.category]?.[language === 'ar' ? 'ar' : 'en'] || feature.category}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-[#1A1A1A] dark:text-white dark:text-white mb-2 line-clamp-2 group-hover:text-[#C9A962] transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 line-clamp-2 mb-3">
                            {feature.description}
                          </p>
                          <div className="flex items-center justify-between">
                            {feature.price && (
                              <span className="text-sm font-semibold text-[#C9A962]">
                                AED {feature.price.toLocaleString()}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#C9A962] group-hover:gap-2 transition-all">
                              {language === 'ar' ? 'المزيد' : 'Learn more'}
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {filteredFeatures.length > 20 && !showAll && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAll(true)}
                  className="border-2 border-[#1A1A1A] dark:border-white text-[#1A1A1A] dark:text-white dark:text-white hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#1A1A1A] dark:text-white dark:text-white"
                >
                  {language === 'ar' ? `عرض الكل (${filteredFeatures.length})` : `View All (${filteredFeatures.length})`}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1A1A1A] dark:text-white dark:text-white">
                  {language === 'ar' ? 'ذكاء يحقق النتائج' : 'Intelligence That Delivers Results'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-8 leading-relaxed">
                  {language === 'ar'
                    ? 'منصتنا لا تقوم بالأتمتة فحسب - بل تتعلم وتتنبأ وتحسن. استمتع بتحسينات قابلة للقياس في الكفاءة التشغيلية واستهلاك الطاقة ورضا السكان.'
                    : "Our platform doesn't just automate—it learns, predicts, and optimizes. Experience measurable improvements in operational efficiency, energy consumption, and occupant satisfaction."}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                        {language === 'ar' ? benefit.ar : benefit.en}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#1A1A1A] to-gray-800 p-8 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-[#E8DCC8] mb-2">40%</div>
                      <div className="text-sm text-gray-300">
                        {language === 'ar' ? 'توفير الطاقة' : 'Energy Savings'}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-[#E8DCC8] mb-2">24/7</div>
                      <div className="text-sm text-gray-300">
                        {language === 'ar' ? 'مراقبة ذكية' : 'Smart Monitoring'}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-[#E8DCC8] mb-2">99%</div>
                      <div className="text-sm text-gray-300">
                        {language === 'ar' ? 'وقت التشغيل' : 'Uptime'}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-[#E8DCC8] mb-2">500+</div>
                      <div className="text-sm text-gray-300">
                        {language === 'ar' ? 'مشاريع مُنجزة' : 'Projects'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {language === 'ar' ? 'هل أنت مستعد لترقية مبناك؟' : 'Ready to Upgrade Your Building?'}
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'دعنا نناقش كيف يمكن لمنصة الذكاء الخاصة بنا أن تحول مساحتك'
                  : "Let's discuss how our intelligence platform can transform your space"}
              </p>
              <Button
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-[#E8DCC8] text-[#1A1A1A] dark:text-white hover:bg-[#E8DCC8]/90 px-8 py-6 text-sm font-semibold uppercase tracking-wider"
              >
                {language === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Consultation Form Modal */}
      {showConsultationForm && (
        <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
      )}
    </>
  )
}
