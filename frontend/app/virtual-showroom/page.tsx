'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { MapPin, Phone, Clock, X } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const showcaseAreas = [
  {
    id: 1,
    title: 'Main Showroom',
    category: 'Overview',
    image: '/images/premium/hero/hero-1.jpg',
    description: '60,000 sq ft state-of-the-art experience center showcasing fully integrated smart living solutions.'
  },
  {
    id: 2,
    title: 'Lighting Control Studio',
    category: 'Lighting',
    image: '/images/premium/solutions/penthouse-1.jpg',
    description: 'Experience Lutron, Crestron, and KNX lighting systems with dynamic scenes and circadian rhythm automation.'
  },
  {
    id: 3,
    title: 'Home Theater Experience',
    category: 'Entertainment',
    image: '/images/premium/hero/hero-2.jpg',
    description: 'Premium home cinema with Dolby Atmos, 4K projection, and acoustic treatments by leading brands.'
  },
  {
    id: 4,
    title: 'Smart Kitchen',
    category: 'Living Spaces',
    image: '/images/premium/hero/hero-3.jpg',
    description: 'Connected appliances, automated shading, climate control, and integrated entertainment systems.'
  },
  {
    id: 5,
    title: 'Security & Access Control',
    category: 'Security',
    image: '/images/premium/solutions/penthouse-3.jpg',
    description: 'Biometric access, IP surveillance, intercoms, and integrated security monitoring solutions.'
  },
  {
    id: 6,
    title: 'Climate Control Zone',
    category: 'Climate',
    image: '/images/premium/solutions/penthouse-2.jpg',
    description: 'Smart HVAC systems with zone control, energy management, and air quality monitoring.'
  },
  {
    id: 7,
    title: 'Multi-Room Audio',
    category: 'Entertainment',
    image: '/images/premium/projects/project-1.jpg',
    description: 'Sonos, Bang & Olufsen, and custom audio solutions for whole-home entertainment.'
  },
  {
    id: 8,
    title: 'Automated Shading',
    category: 'Comfort',
    image: '/images/premium/projects/project-2.jpg',
    description: 'Motorized blinds and curtains with solar tracking and scene integration.'
  },
  {
    id: 9,
    title: 'Control Interfaces',
    category: 'Technology',
    image: '/images/premium/projects/project-3.jpg',
    description: 'Touchpanels, keypads, voice control, and mobile apps for seamless system management.'
  }
]

const categories = ['All', 'Overview', 'Lighting', 'Entertainment', 'Living Spaces', 'Security', 'Climate', 'Comfort', 'Technology']

export default function VirtualShowroomPage() {
  const cms = useCms('page_virtual_showroom', null)

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof showcaseAreas[0] | null>(null)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  const filteredAreas = selectedCategory === 'All' 
    ? showcaseAreas 
    : showcaseAreas.filter(area => area.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                Experience Center
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-8">
                VIRTUAL
                <br />
                <span className="text-transparent bg-clip-text metallic-gradient">SHOWROOM</span>
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8 mx-auto" />
              <p className="text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-3xl mx-auto mb-12">
                Explore our 60,000 sq ft experience center featuring fully integrated smart living solutions. See, touch, and experience the future of home automation.
              </p>

              {/* Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="text-charcoal" size={32} strokeWidth={1.5} />
                  <div>
                    <div className="font-medium">Al Quoz 1, Dubai</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Sheikh Zayed Road</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Clock className="text-charcoal" size={32} strokeWidth={1.5} />
                  <div>
                    <div className="font-medium">Open Daily</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">9 AM - 7 PM</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Phone className="text-charcoal" size={32} strokeWidth={1.5} />
                  <div>
                    <div className="font-medium">+971 4 XXX XXXX</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Book a visit</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700 dark:border-gray-700">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-charcoal text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(area)}
                >
                  <div className="relative h-[400px] overflow-hidden mb-4">
                    <SafeImage
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 text-xs font-medium">
                        {area.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 dark:text-gray-400 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold text-white mb-6">Visit Our Experience Center</h2>
              <p className="text-xl text-gray-400 font-normal mb-10">
                Book a personalized tour and experience smart living firsthand.
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 dark:bg-gray-800 text-charcoal px-12"
                onClick={() => setShowConsultationForm(true)}
              >
                Schedule Visit
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] mb-6">
              <SafeImage
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center text-white">
              <div className="inline-block px-4 py-1 bg-white/10 text-sm mb-4">
                {selectedImage.category}
              </div>
              <h3 className="text-3xl font-semibold mb-4">{selectedImage.title}</h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </div>
  )
}
