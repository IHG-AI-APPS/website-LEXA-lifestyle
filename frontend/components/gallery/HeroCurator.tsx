'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

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

export default function HeroCurator({ onPersonaClick }: HeroCuratorProps) {
  const { language } = useLanguage()
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

  const quote = cmsData?.quote
    ? (language === 'ar' ? cmsData.quote_ar : cmsData.quote_en)
    : (language === 'ar'
      ? 'حيث تلتقي التكنولوجيا بالفخامة'
      : 'Where technology meets luxury')

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]"
      data-testid="hero-section"
    >
      {/* Video / Fallback */}
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
          <img src={FALLBACK_IMAGE} alt="LEXA luxury smart home" className="h-full w-full object-cover" />
        )}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, #050505 100%)' }} />
      </div>

      {/* Quote — centered, minimal */}
      <div className="relative z-10 flex h-full items-end justify-center pb-24 sm:pb-28 lg:pb-32 px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className={`text-sm sm:text-base tracking-[0.25em] uppercase text-white/50 font-light ${language === 'ar' ? 'font-arabic' : ''}`}
          data-testid="hero-quote"
        >
          {quote}
        </motion.p>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
        </motion.div>
      </motion.div>

      {/* Video dots */}
      {!videoFailed && (
        <div className="absolute bottom-6 right-6 z-10 hidden lg:flex gap-1">
          {heroClips.map((_: string, i: number) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-700 ${
                i === currentClip ? 'w-5 bg-[#C9A962]/60' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
