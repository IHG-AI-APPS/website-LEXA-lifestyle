'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Brain, 
  Shield, 
  Sun, 
  Thermometer, 
  Mic, 
  Tv, 
  Wifi, 
  Home,
  Leaf,
  Droplets,
  Building2,
  Zap,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface IntelligenceFeature {
  id: string
  title: string
  description: string
  category: string
  image?: string
  price?: number
  slug?: string
  features?: string[]
  benefits?: string[]
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

export default function IntelligenceDetailPage() {
  const params = useParams()
  const featureId = params.id as string
  const { language } = useLanguage()
  const { addItem } = useRecentlyViewed()
  
  const [feature, setFeature] = useState<IntelligenceFeature | null>(null)
  const [relatedFeatures, setRelatedFeatures] = useState<IntelligenceFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        // Fetch all features and find the one we need
        const response = await fetch(`${BACKEND_URL}/api/intelligence/features?limit=200`)
        if (response.ok) {
          const data = await response.json()
          const allFeatures = data.features || []
          
          // Find the specific feature
          const foundFeature = allFeatures.find(
            (f: IntelligenceFeature) => f.id === featureId || String(allFeatures.indexOf(f)) === featureId
          )
          
          if (foundFeature) {
            setFeature(foundFeature)
            
            // Track as recently viewed
            addItem({
              id: foundFeature.id || featureId,
              type: 'service', // Using 'service' type for intelligence features
              slug: foundFeature.slug || featureId,
              title: foundFeature.title,
              image: foundFeature.image,
              category: foundFeature.category
            })
            
            // Get related features from the same category
            const related = allFeatures.filter(
              (f: IntelligenceFeature) => 
                f.category === foundFeature.category && 
                f.id !== foundFeature.id &&
                f.title !== foundFeature.title
            ).slice(0, 6)
            setRelatedFeatures(related)
          }
        }
      } catch (error) {
        console.error('Failed to load intelligence feature:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (featureId) {
      fetchFeature()
    }
  }, [featureId, addItem])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A962]"></div>
      </div>
    )
  }

  if (!feature) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Brain className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">
          {language === 'ar' ? 'الميزة غير موجودة' : 'Feature Not Found'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-6">
          {language === 'ar' ? 'لم نتمكن من العثور على هذه الميزة الذكية' : "We couldn't find this intelligence feature"}
        </p>
        <Button asChild>
          <Link href="/intelligence">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة إلى الذكاء' : 'Back to Intelligence'}
          </Link>
        </Button>
      </div>
    )
  }

  const Icon = categoryIcons[feature.category] || Brain
  const categoryName = categoryNames[feature.category]?.[language === 'ar' ? 'ar' : 'en'] || feature.category

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-[#1A1A1A] text-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Back Link */}
            <Link 
              href="/intelligence"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === 'ar' ? 'العودة إلى الذكاء' : 'Back to Intelligence'}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6 rounded-full">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {categoryName}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  {feature.title}
                </h1>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.price && (
                  <div className="mb-8">
                    <span className="text-sm text-gray-400 block mb-1">
                      {language === 'ar' ? 'السعر يبدأ من' : 'Starting from'}
                    </span>
                    <span className="text-3xl font-bold text-[#E8DCC8]">
                      AED {feature.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => setShowConsultationForm(true)}
                    className="bg-[#E8DCC8] text-[#1A1A1A] hover:bg-[#E8DCC8]/90 px-8"
                  >
                    {language === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] dark:text-white"
                  >
                    <a href="tel:+971503267227">
                      <Phone className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-12 flex items-center justify-center">
                  <Icon className="h-32 w-32 text-[#E8DCC8]" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features/Benefits Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-6">
                  {language === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
                </h2>
                <div className="space-y-4">
                  {[
                    language === 'ar' ? 'تكامل سلس مع الأنظمة الموجودة' : 'Seamless integration with existing systems',
                    language === 'ar' ? 'التحكم عن بعد عبر التطبيق' : 'Remote control via mobile app',
                    language === 'ar' ? 'جدولة وأتمتة ذكية' : 'Smart scheduling and automation',
                    language === 'ar' ? 'مراقبة الطاقة في الوقت الفعلي' : 'Real-time energy monitoring',
                    language === 'ar' ? 'تقارير وتحليلات مخصصة' : 'Custom reports and analytics'
                  ].map((feat, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-6">
                  {language === 'ar' ? 'الفوائد' : 'Benefits'}
                </h2>
                <div className="space-y-4">
                  {[
                    language === 'ar' ? 'توفير يصل إلى 40% في تكاليف الطاقة' : 'Up to 40% energy cost savings',
                    language === 'ar' ? 'تحسين راحة وإنتاجية السكان' : 'Improved occupant comfort & productivity',
                    language === 'ar' ? 'صيانة تنبؤية تقلل وقت التوقف' : 'Predictive maintenance reduces downtime',
                    language === 'ar' ? 'أمان وسلامة معززة' : 'Enhanced security and safety',
                    language === 'ar' ? 'زيادة قيمة العقار' : 'Increased property value'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-1 bg-[#E8DCC8]/20 rounded">
                        <Sparkles className="h-4 w-4 text-[#C9A962]" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Features Section */}
        {relatedFeatures.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                    {language === 'ar' ? 'ميزات ذكية ذات صلة' : 'Related Intelligence Features'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
                    {language === 'ar' 
                      ? `المزيد من حلول ${categoryName}`
                      : `More ${categoryName} solutions`}
                  </p>
                </div>
                <Link 
                  href={`/intelligence?category=${feature.category}`}
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#C9A962] hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
                >
                  {language === 'ar' ? 'عرض الكل' : 'View all'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedFeatures.map((related, index) => {
                  const RelatedIcon = categoryIcons[related.category] || Brain
                  return (
                    <motion.div
                      key={related.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={`/intelligence/${related.id || index}`}
                        className="group block h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-xl group-hover:scale-110 transition-transform">
                            <RelatedIcon className="h-8 w-8 text-[#1A1A1A] dark:text-[#E8DCC8]" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#1A1A1A] dark:text-white mb-2 line-clamp-2 group-hover:text-[#C9A962] transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 line-clamp-2">
                            {related.description}
                          </p>
                          {related.price && (
                            <div className="mt-3 text-sm font-semibold text-[#C9A962]">
                              AED {related.price.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {language === 'ar' ? 'مهتم بهذا الحل؟' : 'Interested in this solution?'}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تحدث مع خبرائنا للحصول على حل مخصص يناسب احتياجاتك'
                : 'Talk to our experts to get a customized solution that fits your needs'}
            </p>
            <Button
              size="lg"
              onClick={() => setShowConsultationForm(true)}
              className="bg-[#E8DCC8] text-[#1A1A1A] hover:bg-[#E8DCC8]/90"
            >
              {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
            </Button>
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
