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

// Curated Dark Luxury Video Sequence - Maximum Impact
const HERO_CLIPS = [
  '/videos/hero-v3/v3_01_dramatic_entrance.mp4',  // Hook: Dramatic chandelier entrance
  '/videos/hero/01_arrival.mp4',                   // Architectural villa exterior
  '/videos/hero-v2/v2_01_lights_on.mp4',          // Dramatic lighting sequence
  '/videos/hero-v2/v2_04_speaker_system.mp4',     // Luxury audiophile room
  '/videos/hero/05_cinema_room.mp4',              // Home cinema experience
  '/videos/hero-v2/v2_06_control_interface.mp4', // Smart control panel
  '/videos/hero-v2/v2_07_pool_area.mp4',         // Outdoor living with pool
]

export default function HeroCurator({ onPersonaClick }: HeroCuratorProps) {
  const { t, language } = useLanguage()
  const [currentClip, setCurrentClip] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle video end - smooth transition to next clip
  const handleVideoEnd = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentClip((prev) => (prev + 1) % HERO_CLIPS.length)
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
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
          autoPlay
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onEnded={handleVideoEnd}
        >
          <source src={HERO_CLIPS[currentClip]} type="video/mp4" />
        </video>
        
        {/* Dark Luxury Overlay - Enhanced for dramatic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[100svh] items-end pt-20 md:pt-24">
        <div className="w-full px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-24 lg:px-16 lg:pb-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-5xl"
          >
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase text-white leading-[0.95] ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.title1')}
              <br />
              {t('hero.title2')}
              <br />
              {t('hero.title3')}
            </h1>
            
            <p className="mt-6 max-w-xl text-sm sm:text-base text-white/90 md:text-lg leading-relaxed">
              {language === 'ar' 
                ? 'مصمم ومُسلّم من البداية للنهاية. جرّب حلول المنزل الذكي الفاخرة الرائدة في دبي.'
                : "Designed & delivered end-to-end. Experience Dubai's premier luxury smart home solutions."
              }
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* PRIMARY CTA: Persona Selection */}
              <Button 
                size="lg"
                onClick={onPersonaClick}
                className="bg-gradient-to-r from-[#E8DCC8] to-[#C19A2E] text-black uppercase tracking-widest hover:from-[#C19A2E] hover:to-[#E8DCC8] rounded-none px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-medium transition-all shadow-lg"
              >
                <Users className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
                {language === 'ar' ? 'ابحث عن الحل المثالي' : 'Find Your Perfect Solution'}
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
    </section>
  )
}
