'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Volume2, VolumeX, Eye, X } from 'lucide-react'

const zones = [
  {
    id: 1,
    title: 'Smart Home Showcase',
    subtitle: 'MAIN HALL',
    description: 'Step into the future of intelligent living. Voice-activated systems, automated lighting scenes, and climate management work in perfect harmony.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/612beb91b87e9b41f962da6eb8b91f5cf254e933d63cb3ef71ace28718b4eefa.png',
    features: ['Voice Control', 'Scene Automation', 'Climate Intelligence'],
    accent: '#C9A962',
    panDirection: 'left' as const,
  },
  {
    id: 2,
    title: 'Home Cinema Experience',
    subtitle: 'THEATER ZONE',
    description: 'Immerse yourself in a private cinema with Dolby Atmos surround sound, 4K laser projection, and acoustic-engineered walls that rival commercial theaters.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/dacc01ae1dc53730f34dd34f41895419010586a0427c0ebf9fc72d8a4b27d191.png',
    features: ['Dolby Atmos 7.2.4', '4K Laser Projection', 'Starlight Ceiling'],
    accent: '#C9A962',
    panDirection: 'right' as const,
  },
  {
    id: 3,
    title: 'Premium Brand Gallery',
    subtitle: 'GALLERY WING',
    description: 'Discover 32+ world-leading brands. Touch and interact with live product demonstrations curated by our technology consultants.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/e50d69f604abca478053403fb12ad5b8026c9ff4bf49192cfaa9c087b4094899.png',
    features: ['32+ Premium Brands', 'Live Demos', 'Expert Guides'],
    accent: '#C9A962',
    panDirection: 'left' as const,
  },
  {
    id: 4,
    title: 'Audio & Multi-Room',
    subtitle: 'HI-FI ZONE',
    description: 'Experience reference-grade audio in an acoustically treated listening room. Multi-room streaming, vinyl playback, and wireless hi-fi systems.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/035579baf2abef1ae0e1155e16b4bf57655af2910a4df976de3b3022006d5f2c.png',
    features: ['Reference Audio', 'Multi-Room Sync', 'Vinyl & Streaming'],
    accent: '#C9A962',
    panDirection: 'right' as const,
  },
  {
    id: 5,
    title: 'Lighting Design Studio',
    subtitle: 'LIGHTING LAB',
    description: 'Witness how intelligent lighting transforms spaces. From warm dinner scenes to energizing morning routines — all controlled by a single touch.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/5da0e02776639111ed41adb48faaffd2c8968eaddda2ce0f3ba1dac514f0b82d.png',
    features: ['Scene Presets', 'Circadian Rhythm', 'Energy Analytics'],
    accent: '#C9A962',
    panDirection: 'left' as const,
  },
  {
    id: 6,
    title: 'Security Command',
    subtitle: 'SECURITY HUB',
    description: 'Advanced facial recognition, biometric access control, and 24/7 AI-powered surveillance — the pinnacle of residential security technology.',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/cb41cf96a1bc018c222eb01f157f17fcd8d38fb84548fa77c8e27fabe2305b7c.png',
    features: ['Facial Recognition', 'Biometric Access', 'AI Monitoring'],
    accent: '#C9A962',
    panDirection: 'right' as const,
  },
]

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C9A962]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15 + Math.random() * 0.3,
          }}
          animate={{
            y: [0, -80 - Math.random() * 120],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0.15 + Math.random() * 0.3, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default function VirtualTour() {
  const [activeZone, setActiveZone] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [visited, setVisited] = useState<Set<number>>(new Set([0]))
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>(undefined)

  const goToZone = useCallback((index: number) => {
    setDirection(index > activeZone ? 1 : -1)
    setActiveZone(index)
    setVisited(prev => { const s = new Set(prev); s.add(index); return s })
  }, [activeZone])

  const nextZone = useCallback(() => {
    const next = (activeZone + 1) % zones.length
    setDirection(1)
    setActiveZone(next)
    setVisited(prev => { const s = new Set(prev); s.add(next); return s })
  }, [activeZone])

  const prevZone = useCallback(() => {
    const p = (activeZone - 1 + zones.length) % zones.length
    setDirection(-1)
    setActiveZone(p)
    setVisited(prev => { const s = new Set(prev); s.add(p); return s })
  }, [activeZone])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextZone()
      else if (e.key === 'ArrowLeft') prevZone()
      else if (e.key === 'Escape') { setIsOpen(false); setIsFullscreen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, nextZone, prevZone])

  // Auto-play
  useEffect(() => {
    if (isAutoPlay && isOpen) {
      autoPlayRef.current = setInterval(nextZone, 5000)
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [isAutoPlay, isOpen, nextZone])

  // Fullscreen API
  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  const zone = zones[activeZone]

  const imageVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.15, x: dir > 0 ? 100 : -100 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, scale: 0.95, x: dir > 0 ? -100 : 100 }),
  }


  if (!isOpen) {
    return (
      <section className="py-16 lg:py-20 bg-[#050505]" data-testid="virtual-tour-cta">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden cursor-pointer group" onClick={() => setIsOpen(true)}>
              {/* Preview image with parallax */}
              <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
                <motion.img
                  src={zones[0].image}
                  alt="Virtual Tour Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: [1, 1.05], x: [0, -15] }}
                  transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* CTA overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/40 text-[#C9A962] text-xs uppercase tracking-[0.2em] mb-4 font-medium">Interactive Experience</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                    Virtual Showroom Tour
                  </h2>
                  <p className="text-gray-400 max-w-lg mb-6 text-sm sm:text-base leading-relaxed">
                    Walk through 6 curated zones of our 5,000+ sq ft Experience Centre. Explore smart home automation, private cinema, lighting design, and more.
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.button
                      className="flex items-center gap-3 px-6 py-3 bg-[#C9A962] text-[#050505] font-semibold text-sm uppercase tracking-wider rounded-lg gold-shimmer-btn"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      data-testid="start-virtual-tour"
                    >
                      <Eye size={18} />
                      Begin Tour
                    </motion.button>
                    <span className="text-zinc-500 text-xs">6 Zones &middot; Use arrow keys to navigate</span>
                  </div>
                </motion.div>
              </div>

              {/* Pulsing ring effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-[#C9A962]/50"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#C9A962]/30"
                  animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                />
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#C9A962]/20 flex items-center justify-center group-hover:bg-[#C9A962]/30 transition-colors">
                  <Eye size={24} className="text-[#C9A962]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      data-testid="virtual-tour-viewer"
    >
      {/* Background image with Ken Burns */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={activeZone}
          className="absolute inset-0"
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.img
            src={zone.image}
            alt={zone.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              scale: [1, 1.12],
              x: zone.panDirection === 'left' ? [0, -30] : [0, 30],
            }}
            transition={{ duration: 15, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />

      {/* Gold particles */}
      <GoldParticles />

      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-30" />

      {/* Zone info panel — glassmorphism */}
      <div className="absolute left-0 top-0 bottom-0 w-full sm:w-[480px] z-20 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="mx-6 sm:mx-10 my-auto"
          >
            {/* Zone number */}
            <motion.div
              className="text-[120px] sm:text-[160px] font-black text-white/[0.04] leading-none absolute -top-10 -left-2 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              0{zone.id}
            </motion.div>

            <div className="relative backdrop-blur-xl bg-black/40 border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Subtitle badge */}
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-[10px] uppercase tracking-[0.25em] font-semibold mb-4">
                {zone.subtitle}
              </span>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                {zone.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                {zone.description}
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {zone.features.map((feat, i) => (
                  <motion.span
                    key={feat}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-300 rounded-full backdrop-blur-sm"
                  >
                    {feat}
                  </motion.span>
                ))}
              </div>

              {/* Zone counter */}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="text-[#C9A962] font-bold">{String(activeZone + 1).padStart(2, '0')}</span>
                <span className="w-8 h-px bg-zinc-700" />
                <span>{String(zones.length).padStart(2, '0')}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls — bottom center */}
      <div className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Prev */}
        <motion.button
          onClick={prevZone}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#C9A962]/20 hover:border-[#C9A962]/40 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          data-testid="tour-prev"
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Zone dots */}
        <div className="flex items-center gap-2.5">
          {zones.map((z, i) => (
            <motion.button
              key={z.id}
              onClick={() => goToZone(i)}
              className="relative group"
              whileHover={{ scale: 1.3 }}
              data-testid={`tour-dot-${i}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                i === activeZone
                  ? 'bg-[#C9A962] shadow-[0_0_12px_rgba(201,169,98,0.5)]'
                  : visited.has(i)
                    ? 'bg-white/40'
                    : 'bg-white/15'
              }`} />
              {i === activeZone && (
                <motion.div
                  className="absolute -inset-1.5 rounded-full border border-[#C9A962]/50"
                  layoutId="activeDot"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-[10px] text-white whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {z.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={nextZone}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#C9A962]/20 hover:border-[#C9A962]/40 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          data-testid="tour-next"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Top bar controls */}
      <div className="absolute top-[7vh] right-6 z-30 flex items-center gap-3">
        {/* Auto-play toggle */}
        <motion.button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
            isAutoPlay ? 'bg-[#C9A962]/20 border-[#C9A962]/40 text-[#C9A962]' : 'bg-white/10 border-white/10 text-white/60'
          }`}
          whileHover={{ scale: 1.1 }}
          title={isAutoPlay ? 'Pause auto-play' : 'Start auto-play'}
          data-testid="tour-autoplay"
        >
          {isAutoPlay ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </motion.button>

        {/* Fullscreen */}
        <motion.button
          onClick={toggleFullscreen}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
          whileHover={{ scale: 1.1 }}
          data-testid="tour-fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </motion.button>

        {/* Close */}
        <motion.button
          onClick={() => { setIsOpen(false); setIsFullscreen(false); document.exitFullscreen?.().catch(() => {}) }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
          whileHover={{ scale: 1.1 }}
          data-testid="tour-close"
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* LEXA branding */}
      <div className="absolute top-[7vh] left-6 z-30">
        <div className="text-white/30 text-xs tracking-[0.3em] uppercase font-medium">LEXA <span className="text-[#C9A962]/50">Virtual Tour</span></div>
      </div>

      {/* Keyboard hint */}
      <motion.div
        className="absolute bottom-[7vh] right-6 z-30 text-zinc-600 text-[10px] tracking-wider uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Arrow Keys to Navigate &middot; ESC to Exit
      </motion.div>
    </div>
  )
}
