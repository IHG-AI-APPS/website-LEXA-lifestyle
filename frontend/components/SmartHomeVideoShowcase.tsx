'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Smart Home Automation Video Clips - V2
const SMART_HOME_CLIPS = [
  {
    src: '/videos/hero-v2/v2_01_lights_on.mp4',
    title: 'Intelligent Lighting',
    description: 'Elegant ceiling lights activating in sequence'
  },
  {
    src: '/videos/hero-v2/v2_02_shades_open.mp4',
    title: 'Automated Shades',
    description: 'Motorized blinds welcoming morning light'
  },
  {
    src: '/videos/hero-v2/v2_03_display_screen.mp4',
    title: 'Entertainment Display',
    description: 'Premium display with ambient lighting'
  },
  {
    src: '/videos/hero-v2/v2_04_speaker_system.mp4',
    title: 'Audio Excellence',
    description: 'High-end speaker system in music room'
  },
  {
    src: '/videos/hero-v2/v2_05_cinema_experience.mp4',
    title: 'Home Cinema',
    description: 'Private theater transforming for movie night'
  },
  {
    src: '/videos/hero-v2/v2_06_control_interface.mp4',
    title: 'Smart Control',
    description: 'Intuitive touch panel interface'
  },
  {
    src: '/videos/hero-v2/v2_07_pool_area.mp4',
    title: 'Outdoor Living',
    description: 'Pool area with elegant landscape lighting'
  }
]

interface VideoShowcaseProps {
  className?: string
  autoPlay?: boolean
}

export default function SmartHomeVideoShowcase({ className = '', autoPlay = true }: VideoShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentClip = SMART_HOME_CLIPS[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SMART_HOME_CLIPS.length) % SMART_HOME_CLIPS.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SMART_HOME_CLIPS.length)
  }

  const handleVideoEnd = () => {
    handleNext()
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      if (isPlaying) {
        videoRef.current.play().catch(() => {})
      }
    }
  }, [currentIndex])

  return (
    <section className={`py-20 bg-black ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Experience Intelligent Living
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See how LEXA transforms ordinary spaces into extraordinary smart environments
          </p>
        </motion.div>

        {/* Video Container */}
        <div className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden bg-gray-900">
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src={currentClip.src} type="video/mp4" />
          </video>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Video Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <h3 className="text-2xl font-bold text-white mb-1">{currentClip.title}</h3>
              <p className="text-white/80">{currentClip.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="bg-black/30 hover:bg-black/50 text-white rounded-full"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="bg-black/30 hover:bg-black/50 text-white rounded-full"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-4">
          {SMART_HOME_CLIPS.map((clip, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-[#C19A2E] scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <video
                className="w-full h-full object-cover"
                src={clip.src}
                muted
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/30" />
            </button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {SMART_HOME_CLIPS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#C19A2E] w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
