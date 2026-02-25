'use client'

import { useState, useEffect, useRef } from 'react'

interface HeroVideoProps {
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}

// All 7 cinematic clips in sequence
const HERO_CLIPS = [
  { src: '/videos/hero/01_arrival.mp4', name: 'Arrival' },
  { src: '/videos/hero/02_interior_reveal.mp4', name: 'Interior Reveal' },
  { src: '/videos/hero/03_details.mp4', name: 'Details' },
  { src: '/videos/hero/04_living_tech.mp4', name: 'Living Tech' },
  { src: '/videos/hero/05_cinema_room.mp4', name: 'Cinema Room' },
  { src: '/videos/hero/06_silhouette.mp4', name: 'Silhouette' },
  { src: '/videos/hero/07_villa_night.mp4', name: 'Villa Night' },
]

export default function HeroVideo({ 
  autoPlay = true, 
  muted = true, 
  loop = true,
  className = ''
}: HeroVideoProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle video end - transition to next clip
  const handleVideoEnd = () => {
    setIsFading(true)
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_CLIPS.length)
      setIsFading(false)
    }, 500) // 500ms fade transition
  }

  // Reset video when clip changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      })
    }
  }, [currentIndex])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
        autoPlay={autoPlay}
        muted={muted}
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        onEnded={handleVideoEnd}
        aria-label={`LEXA Smart Home showcase - ${HERO_CLIPS[currentIndex].name}`}
      >
        <source src={HERO_CLIPS[currentIndex].src} type="video/mp4" />
        <track kind="captions" src="" label="English" srcLang="en" default />
      </video>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Optional: Clip Indicator (can be removed for cleaner look) */}
      {/* 
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_CLIPS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      */}
    </div>
  )
}
