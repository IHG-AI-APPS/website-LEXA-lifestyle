'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { openWhatsApp, whatsAppMessages } from '@/lib/whatsapp'

interface HeroCuratorProps {
  onPersonaClick?: () => void
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const HERO_CLIPS = [
  '/videos/hero-v3/v3_01_dramatic_entrance.mp4',
  '/videos/hero/05_cinema_room.mp4',
]

const FALLBACK_IMAGE = 'https://static.prod-images.emergentagent.com/jobs/59b913a4-054a-445e-b4e4-478e2f863a3e/images/d79b3f3a9da4d6fe9696db86946af0ec4514d892e8b735a0e2d51fb0f2958d37.png'

const MAX_VIDEO_ERRORS = 3

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export default function HeroCurator({ onPersonaClick }: HeroCuratorProps) {
  const { t, language } = useLanguage()
  const [currentClip, setCurrentClip] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const errorCountRef = useRef(0)
  const [cmsData, setCmsData] = useState<any>(null)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_hero`)
      .then(r => r.json())
      .then(d => { if (d?.value) setCmsData(d.value) })
      .catch(() => {})
  }, [])

  const heroClips = cmsData?.video_clips?.length ? cmsData.video_clips.slice(0, 3) : HERO_CLIPS
  const heading = cmsData ? (language === 'ar' ? cmsData.heading_ar : cmsData.heading_en) : null
  const subheading = cmsData ? (language === 'ar' ? cmsData.subheading_ar : cmsData.subheading_en) : null
  const ctaPrimaryText = cmsData ? (language === 'ar' ? cmsData.cta_primary_text_ar : cmsData.cta_primary_text_en) : null

  const handleVideoEnd = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentClip((prev) => (prev + 1) % heroClips.length)
      setIsFading(false)
    }, 600)
  }, [heroClips.length])

  const handleVideoError = useCallback(() => {
    errorCountRef.current += 1
    if (errorCountRef.current >= MAX_VIDEO_ERRORS) {
      setVideoFailed(true)
      return
    }
    setCurrentClip((prev) => (prev + 1) % heroClips.length)
  }, [heroClips.length])

  useEffect(() => {
    if (videoRef.current && !videoFailed) {
      setIsLoaded(false)
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentClip, videoFailed])

  const isRTL = language === 'ar'

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]"
      data-testid="hero-section"
    >
      {/* ── Video / Fallback Image ── */}
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover transition-opacity duration-700 ${isFading ? 'opacity-0' : isLoaded ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={FALLBACK_IMAGE}
            onLoadedData={() => { setIsLoaded(true); errorCountRef.current = 0 }}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            aria-label="LEXA Smart Home luxury showcase"
          >
            <source src={heroClips[currentClip]} type="video/mp4" />
            <track kind="captions" src="" label="English" srcLang="en" default />
          </video>
        ) : (
          <img
            src={FALLBACK_IMAGE}
            alt="LEXA luxury smart home"
            className="h-full w-full object-cover"
          />
        )}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40" />
        <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? 'from-transparent to-[#050505]/50' : 'from-[#050505]/50 to-transparent'}`} />

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, #050505 100%)' }} />

        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
      </div>

      {/* ── Content ── */}
      <div className={`relative z-10 flex h-full items-end ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={`w-full max-w-2xl px-6 sm:px-10 lg:px-20 pb-24 sm:pb-28 lg:pb-32 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {/* Accent line */}
          <motion.div variants={fadeUp} className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="h-px w-8 bg-[#C9A962]" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A962]/80 font-medium">
              {language === 'ar' ? 'منازل ذكية فاخرة' : 'Luxury Smart Living'}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-white ${isRTL ? 'font-arabic' : ''}`}
            data-testid="hero-heading"
          >
            {heading || (
              language === 'ar' ? (
                <>حياة<br />فاخرة<br />متكاملة</>
              ) : (
                <>Integrated<br />Luxury<br />Living</>
              )
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/60 font-light leading-relaxed max-w-md"
            data-testid="hero-subheading"
          >
            {subheading || (
              language === 'ar'
                ? 'مصمم ومُسلّم من البداية للنهاية. جرّب حلول المنزل الذكي الفاخرة الرائدة في دبي.'
                : "Designed & delivered end-to-end. Dubai's premier smart home experience."
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className={`mt-8 sm:mt-10 flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {/* Primary: Discover */}
            <button
              onClick={onPersonaClick}
              data-testid="hero-find-solution-btn"
              className="group flex items-center gap-2.5 h-12 px-7 bg-white text-[#050505] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#C9A962] hover:text-[#050505]"
            >
              {ctaPrimaryText || (language === 'ar' ? 'اكتشف' : 'Discover')}
              <ArrowRight size={14} className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Secondary: WhatsApp link */}
            <button
              onClick={() => openWhatsApp(whatsAppMessages.homepage.getStarted, 'hero', 'get_started')}
              data-testid="hero-whatsapp-btn"
              className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/50 hover:text-[#C9A962] transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <MessageCircle size={14} />
              {language === 'ar' ? 'تواصل معنا' : 'Concierge'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
        </motion.div>
      </motion.div>

      {/* ── Video progress (subtle) ── */}
      {!videoFailed && (
        <div className="absolute bottom-6 right-6 z-10 hidden lg:flex gap-1">
          {heroClips.map((_: string, index: number) => (
            <div
              key={index}
              className={`h-0.5 rounded-full transition-all duration-700 ${
                index === currentClip ? 'w-5 bg-[#C9A962]/60' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
