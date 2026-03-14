'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Star, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface VideoTestimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
  project_type?: string
  is_video: boolean
  video_url?: string
  video_thumbnail?: string
  video_duration?: string
  location?: string
}

interface VideoTestimonialsProps {
  title?: string
  subtitle?: string
  showAll?: boolean
  limit?: number
}

export default function VideoTestimonials({
  title = "Client Stories",
  subtitle = "Hear from homeowners who transformed their living spaces with LEXA",
  showAll = false,
  limit = 3
}: VideoTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<VideoTestimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`)
        const data = await response.json()
        // Filter to only video testimonials
        const videoTestimonials = data.filter((t: VideoTestimonial) => t.is_video)
        setTestimonials(showAll ? videoTestimonials : videoTestimonials.slice(0, limit))
      } catch (error) {
        console.error('Error fetching video testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [showAll, limit])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <div className="py-20 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-[#151515] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-20 bg-[#0A0A0A]" data-testid="video-testimonials">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {/* Video Thumbnail */}
                <div 
                  className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer mb-4"
                  onClick={() => setActiveVideo(testimonial)}
                >
                  <img
                    src={testimonial.video_thumbnail || testimonial.image || '/placeholder-video.jpg'}
                    alt={`${testimonial.name} video testimonial`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#C9A962] flex items-center justify-center transform transition-transform group-hover:scale-110">
                      <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {testimonial.video_duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {testimonial.video_duration}
                    </div>
                  )}

                  {/* Project Type Badge */}
                  {testimonial.project_type && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#C9A962] rounded-full text-xs text-black font-medium">
                      {testimonial.project_type}
                    </div>
                  )}
                </div>

                {/* Testimonial Info */}
                <div className="px-1">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#C9A962]" fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 text-sm line-clamp-2 mb-3">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-zinc-500">
                        {testimonial.role}
                        {testimonial.location && (
                          <span className="flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          {!showAll && testimonials.length >= limit && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <a
                href="/testimonials"
                className="inline-flex items-center gap-2 text-[#C9A962] hover:text-white transition-colors text-sm font-medium"
              >
                View All Client Stories
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Player / Placeholder */}
              <div className="relative aspect-video bg-[#111] rounded-2xl overflow-hidden">
                {activeVideo.video_url ? (
                  // If video URL exists, show video player
                  activeVideo.video_url.includes('youtube') ? (
                    <iframe
                      src={activeVideo.video_url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : activeVideo.video_url.includes('vimeo') ? (
                    <iframe
                      src={activeVideo.video_url.replace('vimeo.com/', 'player.vimeo.com/video/')}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={activeVideo.video_url}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  )
                ) : (
                  // Placeholder when no video URL
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                    <img
                      src={activeVideo.video_thumbnail || activeVideo.image}
                      alt={activeVideo.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-[#C9A962]/20 flex items-center justify-center mb-6 mx-auto">
                        <Play className="w-10 h-10 text-[#C9A962]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Video Coming Soon</h3>
                      <p className="text-zinc-400 max-w-md">
                        {activeVideo.name}'s video testimonial is being prepared. 
                        Check back soon to hear their story.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info Below */}
              <div className="mt-4 flex items-center gap-4">
                {activeVideo.image && (
                  <img
                    src={activeVideo.image}
                    alt={activeVideo.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-white">{activeVideo.name}</div>
                  <div className="text-sm text-zinc-400">
                    {activeVideo.role} • {activeVideo.location || activeVideo.company}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {Array.from({ length: activeVideo.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C9A962]" fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
