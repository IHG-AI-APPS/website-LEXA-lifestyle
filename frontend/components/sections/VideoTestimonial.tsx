'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Quote, Play } from 'lucide-react'
import { useState } from 'react'

const testimonial = {
  name: 'Kris Fade',
  role: 'Radio Host | Entrepreneur | TV Personality',
  quote: 'LEXA turned my home into a smart luxury experience. The lighting, the automation — it\'s next-level living. Smooth process, amazing team. They nailed it!',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop',
  videoUrl: '#' // Placeholder for actual video
}

export default function VideoTestimonial() {
  const [playingVideo, setPlayingVideo] = useState(false)

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] overflow-hidden group cursor-pointer">
              <SafeImage
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={32} className="text-black ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Quote className="w-16 h-16 text-gray-200" strokeWidth={1} />
            
            <p className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-gray-200 leading-relaxed">
              {testimonial.quote}
            </p>

            <div className="pt-8 border-t border-gray-200 dark:border-gray-700 dark:border-gray-700">
              <div className="text-xl font-semibold text-black mb-1">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-500">
                {testimonial.role}
              </div>
            </div>

            {/* Stats inline */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-2xl font-heading font-bold mb-1">32+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Brands</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-bold mb-1">15+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Years</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-bold mb-1">1000+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
