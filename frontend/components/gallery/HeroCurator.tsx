'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroCuratorProps {
  onPersonaClick?: () => void
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const HERO_CLIPS = [
  '/videos/hero-v3/v3_01_dramatic_entrance.mp4',
  '/videos/hero/05_cinema_room.mp4',
]

const FALLBACK_IMAGE = 'https://files.ihgbrands.com/lexa/migrated/9bb2c417db1b83a5.webp'

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
      : 'Where technology meets luxury ')

  const handleFindSolution = () => {
    if (onPersonaClick) onPersonaClick()
  }

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] flex flex-col"
      data-testid="hero-section"
      aria-label="Hero"
    >
      {/* Video / Fallback — fills available space */}
      <div className="relative flex-1">
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

        {/* Quote — centered at bottom of video area */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-10 sm:pb-8 px-6">
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

        {/* Video dots */}
        {!videoFailed && (
          <div className="absolute bottom-3 right-6 z-10 hidden lg:flex gap-1">
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
      </div>

      {/* CTA Band — pinned at bottom of hero viewport */}
      <div className="relative z-20 w-full grid grid-cols-1 sm:grid-cols-2 flex-shrink-0 pb-[76px] lg:pb-0" data-testid="hero-cta-band">
        <button
          onClick={handleFindSolution}
          data-testid="band-find-solution"
          aria-label="Find your perfect smart home solution"
          className="group flex items-center justify-center gap-3 py-3.5 sm:py-4 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-[#050505] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:from-[#D4B872] hover:to-[#F0E0B5] cursor-pointer"
        >
          <Users size={16} strokeWidth={2} />
          Find Your Perfect Solution
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <Link
          href="/projects"
          data-testid="band-view-projects"
          aria-label="View our completed smart home projects"
          className="group flex items-center justify-center gap-3 py-3.5 sm:py-4 bg-gradient-to-r from-[#B89A52] to-[#C9A962] text-[#050505] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:from-[#C9A962] hover:to-[#D4B872] border-l border-[#050505]/10"
        >
          View Projects
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
