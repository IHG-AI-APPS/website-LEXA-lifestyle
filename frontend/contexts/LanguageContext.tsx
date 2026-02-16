'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<string, Record<Language, string>> = {
  // Header
  'header.cta': {
    en: 'Private Design Session',
    ar: 'جلسة تصميم خاصة'
  },
  
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.solutions': { en: 'Solutions', ar: 'الحلول' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.brands': { en: 'Brands', ar: 'العلامات التجارية' },
  'nav.projects': { en: 'Projects', ar: 'المشاريع' },
  'nav.experience': { en: 'Experience', ar: 'التجربة' },
  'nav.media': { en: 'Media', ar: 'الإعلام' },
  'nav.blog': { en: 'Blog', ar: 'المدونة' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.builder': { en: 'Project Builder', ar: 'منشئ المشاريع' },
  'nav.dashboard': { en: 'My Projects', ar: 'مشاريعي' },
  'nav.about': { en: 'About', ar: 'حول' },
  'nav.calculator': { en: 'Calculator', ar: 'الحاسبة' },
  
  // Homepage Hero
  'hero.title1': { en: 'INTEGRATED', ar: 'متكامل' },
  'hero.title2': { en: 'LUXURY', ar: 'فاخر' },
  'hero.title3': { en: 'LIVING', ar: 'العيش' },
  'hero.subtitle': { en: 'Smart home automation for the discerning few', ar: 'أتمتة المنزل الذكي للمميزين' },
  'hero.cta.primary': { en: 'Discover Our Solutions', ar: 'اكتشف حلولنا' },
  'hero.cta.secondary': { en: 'Book Consultation', ar: 'احجز استشارة' },
  
  // Homepage Sections
  'home.solutions.title': { en: 'Smart Solutions', ar: 'الحلول الذكية' },
  'home.solutions.subtitle': { en: 'Elevate your living experience', ar: 'ارتقِ بتجربة معيشتك' },
  'home.projects.title': { en: 'Featured Projects', ar: 'المشاريع المميزة' },
  'home.projects.subtitle': { en: 'Excellence in every detail', ar: 'التميز في كل التفاصيل' },
  'home.testimonials.title': { en: 'Client Stories', ar: 'قصص العملاء' },
  'home.testimonials.subtitle': { en: 'What our clients say', ar: 'ماذا يقول عملاؤنا' },
  
  // Services Page
  'services.title': { en: 'Our Services', ar: 'خدماتنا' },
  'services.subtitle': { en: 'Comprehensive smart home solutions', ar: 'حلول منزلية ذكية شاملة' },
  'services.design.title': { en: 'Design', ar: 'التصميم' },
  'services.integration.title': { en: 'Integration', ar: 'التكامل' },
  'services.commissioning.title': { en: 'Commissioning', ar: 'التشغيل' },
  'services.support.title': { en: 'Support', ar: 'الدعم' },
  'services.other.title': { en: 'Other Services', ar: 'خدمات أخرى' },
  
  // Solutions Page
  'solutions.title': { en: 'Smart Home Solutions', ar: 'حلول المنزل الذكي' },
  'solutions.subtitle': { en: 'Technology that enhances your lifestyle', ar: 'تقنية تعزز نمط حياتك' },
  'solutions.lighting': { en: 'Lighting Control', ar: 'التحكم في الإضاءة' },
  'solutions.climate': { en: 'Climate Control', ar: 'التحكم في المناخ' },
  'solutions.security': { en: 'Security Systems', ar: 'أنظمة الأمان' },
  'solutions.entertainment': { en: 'Entertainment', ar: 'الترفيه' },
  'solutions.shading': { en: 'Shading & Blinds', ar: 'الستائر والتظليل' },
  
  // Projects Page
  'projects.title': { en: 'Our Projects', ar: 'مشاريعنا' },
  'projects.subtitle': { en: 'Exceptional homes, exceptional technology', ar: 'منازل استثنائية، تقنية استثنائية' },
  'projects.filter.all': { en: 'All', ar: 'الكل' },
  'projects.filter.villa': { en: 'Villas', ar: 'الفلل' },
  'projects.filter.apartment': { en: 'Apartments', ar: 'الشقق' },
  'projects.filter.penthouse': { en: 'Penthouses', ar: 'البنتهاوس' },
  'projects.viewProject': { en: 'View Project', ar: 'عرض المشروع' },
  
  // Contact Page
  'contact.title': { en: 'Contact Us', ar: 'اتصل بنا' },
  'contact.subtitle': { en: 'Get in touch with our team', ar: 'تواصل مع فريقنا' },
  'contact.name': { en: 'Your Name', ar: 'اسمك' },
  'contact.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'contact.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'contact.subject': { en: 'Subject', ar: 'الموضوع' },
  'contact.message': { en: 'Message', ar: 'الرسالة' },
  'contact.send': { en: 'Send Message', ar: 'إرسال الرسالة' },
  'contact.address': { en: 'Address', ar: 'العنوان' },
  'contact.hours': { en: 'Business Hours', ar: 'ساعات العمل' },
  'contact.followUs': { en: 'Follow Us', ar: 'تابعنا' },
  
  // About Page
  'about.title': { en: 'About LEXA', ar: 'عن ليكسا' },
  'about.subtitle': { en: 'Redefining luxury living through technology', ar: 'إعادة تعريف العيش الفاخر من خلال التقنية' },
  'about.mission.title': { en: 'Our Mission', ar: 'مهمتنا' },
  'about.vision.title': { en: 'Our Vision', ar: 'رؤيتنا' },
  'about.values.title': { en: 'Our Values', ar: 'قيمنا' },
  'about.team.title': { en: 'Our Team', ar: 'فريقنا' },
  
  // Experience Centre
  'experience.title': { en: 'Experience Centre', ar: 'مركز التجربة' },
  'experience.subtitle': { en: 'See, touch, and experience smart living', ar: 'شاهد، المس، وجرّب العيش الذكي' },
  'experience.bookVisit': { en: 'Book a Visit', ar: 'احجز زيارة' },
  'experience.virtualTour': { en: 'Virtual Tour', ar: 'جولة افتراضية' },
  'experience.location': { en: 'Location', ar: 'الموقع' },
  'experience.openingHours': { en: 'Opening Hours', ar: 'ساعات العمل' },
  
  // Calculator
  'calculator.title': { en: 'Smart Home Calculator', ar: 'حاسبة المنزل الذكي' },
  'calculator.subtitle': { en: 'Get an instant estimate for your project', ar: 'احصل على تقدير فوري لمشروعك' },
  'calculator.step': { en: 'Step', ar: 'الخطوة' },
  'calculator.next': { en: 'Next', ar: 'التالي' },
  'calculator.previous': { en: 'Previous', ar: 'السابق' },
  'calculator.submit': { en: 'Get Quote', ar: 'احصل على عرض سعر' },
  'calculator.result': { en: 'Your Estimate', ar: 'تقديرك' },
  'calculator.downloadPdf': { en: 'Download PDF', ar: 'تحميل PDF' },
  
  // Footer
  'footer.newsletter': { en: 'Subscribe to our newsletter', ar: 'اشترك في نشرتنا الإخبارية' },
  'footer.emailPlaceholder': { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
  'footer.subscribe': { en: 'Subscribe', ar: 'اشترك' },
  'footer.quickLinks': { en: 'Quick Links', ar: 'روابط سريعة' },
  'footer.legal': { en: 'Legal', ar: 'قانوني' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'footer.copyright': { en: 'All rights reserved', ar: 'جميع الحقوق محفوظة' },
  
  // Project Builder
  'builder.title': { en: 'Smart Project Builder', ar: 'منشئ المشاريع الذكي' },
  'builder.subtitle': { en: 'Build your smart home project', ar: 'أنشئ مشروع منزلك الذكي' },
  'builder.step.dna': { en: 'Project DNA', ar: 'بيانات المشروع' },
  'builder.step.objectives': { en: 'Objectives', ar: 'الأهداف' },
  'builder.step.priorities': { en: 'Priorities', ar: 'الأولويات' },
  'builder.step.intelligence': { en: 'AI Analysis', ar: 'تحليل الذكاء الاصطناعي' },
  'builder.step.proposals': { en: 'Proposals', ar: 'المقترحات' },
  'builder.step.services': { en: 'Services', ar: 'الخدمات' },
  'builder.step.summary': { en: 'Summary', ar: 'الملخص' },
  'builder.step.complete': { en: 'Complete', ar: 'مكتمل' },
  
  // Builder Form
  'builder.segment': { en: 'Segment', ar: 'القطاع' },
  'builder.segment.residential': { en: 'Residential', ar: 'سكني' },
  'builder.segment.commercial': { en: 'Commercial', ar: 'تجاري' },
  'builder.segment.hospitality': { en: 'Hospitality', ar: 'ضيافة' },
  'builder.propertyType': { en: 'Property Type', ar: 'نوع العقار' },
  'builder.propertyType.villa': { en: 'Villa/House', ar: 'فيلا/منزل' },
  'builder.propertyType.apartment': { en: 'Apartment/Flat', ar: 'شقة' },
  'builder.propertyType.penthouse': { en: 'Penthouse', ar: 'بنتهاوس' },
  'builder.propertyType.estate': { en: 'Estate/Mansion', ar: 'قصر/عقار' },
  'builder.area': { en: 'Area (sqft)', ar: 'المساحة (قدم مربع)' },
  'builder.floors': { en: 'Number of Floors', ar: 'عدد الطوابق' },
  'builder.rooms': { en: 'Number of Rooms', ar: 'عدد الغرف' },
  
  // Actions
  'action.continue': { en: 'Continue', ar: 'متابعة' },
  'action.back': { en: 'Back', ar: 'رجوع' },
  'action.submit': { en: 'Submit', ar: 'إرسال' },
  'action.download': { en: 'Download PDF', ar: 'تحميل PDF' },
  'action.email': { en: 'Email Proposal', ar: 'إرسال بالبريد الإلكتروني' },
  'action.save': { en: 'Save Progress', ar: 'حفظ التقدم' },
  'action.startNew': { en: 'Start New Project', ar: 'بدء مشروع جديد' },
  'action.viewAll': { en: 'View All', ar: 'عرض الكل' },
  'action.readMore': { en: 'Read More', ar: 'اقرأ المزيد' },
  
  // Dashboard
  'dashboard.title': { en: 'My Projects', ar: 'مشاريعي' },
  'dashboard.subtitle': { en: 'Track and manage your smart home projects', ar: 'تتبع وإدارة مشاريع منزلك الذكي' },
  'dashboard.noProjects': { en: 'No Projects Yet', ar: 'لا توجد مشاريع بعد' },
  'dashboard.totalProjects': { en: 'Total Projects', ar: 'إجمالي المشاريع' },
  'dashboard.inProgress': { en: 'In Progress', ar: 'قيد التنفيذ' },
  'dashboard.completed': { en: 'Completed', ar: 'مكتملة' },
  
  // WhatsApp
  'whatsapp.quickConnect': { en: 'Quick Connect', ar: 'اتصال سريع' },
  'whatsapp.chooseStarter': { en: 'Choose a conversation starter', ar: 'اختر بداية المحادثة' },
  'whatsapp.openChat': { en: 'Open WhatsApp Chat', ar: 'فتح محادثة واتساب' },
  
  'whatsapp.villa.title': { en: 'Villa Automation Concept', ar: 'مفهوم أتمتة الفيلا' },
  'whatsapp.villa.message': { 
    en: 'Hi LEXA, I would like a smart home concept for my villa. Property size: ___ sqm',
    ar: 'مرحباً LEXA، أود الحصول على مفهوم منزل ذكي لفيلتي. حجم العقار: ___ متر مربع'
  },
  
  'whatsapp.visit.title': { en: 'Experience Centre Visit', ar: 'زيارة مركز التجربة' },
  'whatsapp.visit.message': { 
    en: 'Hi LEXA, I would like to schedule a private visit to your Experience Centre',
    ar: 'مرحباً LEXA، أود تحديد موعد لزيارة خاصة إلى مركز التجربة الخاص بكم'
  },
  
  'whatsapp.tech.title': { en: 'Technical Consultation', ar: 'استشارة فنية' },
  'whatsapp.tech.message': { 
    en: 'Hi LEXA, I need technical consultation for my project',
    ar: 'مرحباً LEXA، أحتاج إلى استشارة فنية لمشروعي'
  },
  
  'whatsapp.quote.title': { en: 'Project Quote', ar: 'عرض سعر للمشروع' },
  'whatsapp.quote.message': { 
    en: 'Hi LEXA, I need a detailed quote for home automation. Location: ___',
    ar: 'مرحباً LEXA، أحتاج إلى عرض سعر تفصيلي لأتمتة المنزل. الموقع: ___'
  },
  
  'whatsapp.emergency.title': { en: 'Emergency Support', ar: 'دعم طوارئ' },
  'whatsapp.emergency.message': { 
    en: 'Hi LEXA, I need emergency support for my smart home system',
    ar: 'مرحباً LEXA، أحتاج إلى دعم طوارئ لنظام منزلي الذكي'
  },
  
  // Common
  'common.getStarted': { en: 'Get Started', ar: 'ابدأ الآن' },
  'common.learnMore': { en: 'Learn More', ar: 'اعرف المزيد' },
  'common.viewProjects': { en: 'View Projects', ar: 'عرض المشاريع' },
  'common.getQuote': { en: 'Get Quote', ar: 'احصل على عرض سعر' },
  'common.search': { en: 'Search...', ar: 'بحث...' },
  'common.loading': { en: 'Loading...', ar: 'جارٍ التحميل...' },
  'common.error': { en: 'An error occurred', ar: 'حدث خطأ' },
  'common.success': { en: 'Success', ar: 'نجاح' },
  'common.free': { en: 'Free', ar: 'مجاني' },
  'common.new': { en: 'New', ar: 'جديد' },
  'common.featured': { en: 'Featured', ar: 'مميز' },
  'common.popular': { en: 'Popular', ar: 'شائع' },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('lexa-language') as Language
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved)
      // Update document direction
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('lexa-language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
