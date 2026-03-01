'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

interface HeroCuratorProps {
  onPersonaClick?: () => void
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Fallback clips if CMS data not yet loaded
const DEFAULT_CLIPS = [
  '/videos/hero-v3/v3_01_dramatic_entrance.mp4',
  '/videos/hero/01_arrival.mp4',
  '/videos/hero/02_interior_reveal.mp4',
  '/videos/hero/04_living_tech.mp4',
  '/videos/hero/05_cinema_room.mp4',
  '/videos/hero/07_villa_night.mp4',
]

export default function HeroCurator({ onPersonaClick }: HeroCuratorProps) {
  const { t, language } = useLanguage()
  const [currentClip, setCurrentClip] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cmsData, setCmsData] = useState<any>(null)

  // Fetch CMS hero data
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_hero`)
      .then(r => r.json())
      .then(d => { if (d?.value) setCmsData(d.value) })
      .catch(() => {})
  }, [])

  const heroClips = cmsData?.video_clips?.length ? cmsData.video_clips : DEFAULT_CLIPS
  const heading = cmsData ? (language === 'ar' ? cmsData.heading_ar : cmsData.heading_en) : null
  const subheading = cmsData ? (language === 'ar' ? cmsData.subheading_ar : cmsData.subheading_en) : null
  const ctaPrimaryText = cmsData ? (language === 'ar' ? cmsData.cta_primary_text_ar : cmsData.cta_primary_text_en) : null

  // Handle video end - smooth transition to next clip
  const handleVideoEnd = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentClip((prev) => (prev + 1) % heroClips.length)
      setIsFading(false)
    }, 400)
  }

  // Load and play new clip when index changes
  useEffect(() => {
    if (videoRef.current) {
      setIsLoaded(false)
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentClip])
  
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onEnded={handleVideoEnd}
          onError={() => {
            // Skip to next clip on error
            setCurrentClip((prev) => (prev + 1) % heroClips.length)
          }}
          aria-label="LEXA Smart Home luxury showcase"
        >
          <source src={heroClips[currentClip]} type="video/mp4" />
          <track kind="captions" src="" label="English" srcLang="en" default />
        </video>
        
        {/* Dark Luxury Overlay - Stronger on mobile for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 md:from-black md:via-black/30 md:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 md:from-black/40" />
      </div>

      {/* Content — Centered on mobile/tablet, bottom-aligned on desktop */}
      <div className="relative z-10 flex h-full min-h-[100dvh] items-center lg:items-end pt-20 pb-28 lg:pb-32">
        <div className="w-full px-6 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-5xl"
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase text-white leading-[0.95] ${language === 'ar' ? 'font-arabic' : ''}`}>
              {heading || (<>{t('hero.title1')}<br />{t('hero.title2')}<br />{t('hero.title3')}</>)}
            </h1>
            
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-white/80 md:text-lg leading-relaxed">
              {subheading || (language === 'ar' 
                ? 'مصمم ومُسلّم من البداية للنهاية. جرّب حلول المنزل الذكي الفاخرة الرائدة في دبي.'
                : "Designed & delivered end-to-end. Experience Dubai's premier luxury smart home solutions."
              )}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* PRIMARY CTA: Persona Selection */}
              <Button 
                size="lg"
                onClick={onPersonaClick}
                className="bg-gradient-to-r from-[#E8DCC8] to-[#C19A2E] text-black uppercase tracking-widest hover:from-[#C19A2E] hover:to-[#E8DCC8] rounded-none px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-medium transition-all shadow-lg"
              >
                <Users className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
                {ctaPrimaryText || (language === 'ar' ? 'ابحث عن الحل المثالي' : 'Find Your Perfect Solution')}
                <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-3 w-3 sm:h-4 sm:w-4`} />
              </Button>
              
              {/* WhatsApp CTA - Direct conversion */}
              <Button 
                size="lg"
                onClick={() => openWhatsApp(whatsAppMessages.homepage.getStarted, 'hero', 'get_started')}
                className="bg-green-500 hover:bg-green-600 text-white uppercase tracking-widest rounded-none px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-medium transition-all shadow-lg"
              >
                <MessageCircle className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
                {language === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
              </Button>
              
              <Link href="/projects">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white uppercase tracking-widest hover:bg-white hover:text-black rounded-none px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-medium transition-all backdrop-blur-sm w-full sm:w-auto"
                >
                  {t('common.viewProjects')}
                </Button>
              </Link>
            </div>

            {/* Helper Text - Softer */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/60"
            >
              {language === 'ar' 
                ? 'نخدم: أصحاب المنازل • المهندسين المعماريين • المطورين • الشركات'
                : 'We serve: Homeowners • Architects • Developers • Businesses'
              }
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/70">
            {language === 'ar' ? 'مرر للأسفل' : 'Scroll'}
          </span>
          <div className="h-8 w-[1px] bg-white/40" />
        </motion.div>
      </motion.div>

      {/* Subtle Video Progress Dots — hidden on mobile */}
      <div className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 hidden md:flex gap-1.5">
        {heroClips.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentClip 
                ? 'w-6 bg-[#C19A2E]' 
                : 'w-1 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
