'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface PersonaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PersonaModal({ isOpen, onClose }: PersonaModalProps) {
  const router = useRouter()

  const personas = [
    {
      title: 'HOMEOWNER',
      description: 'Design or upgrade a luxury home with seamless control',
      image: '/images/solutions/luxury-apartment-1.jpg',
      href: '/persona/homeowner',
    },
    {
      title: 'ARCHITECT / DESIGNER',
      description: 'Integrate smart systems into your architectural vision',
      image: '/images/solutions/modern-penthouse-1.jpg',
      href: '/persona/architect',
    },
    {
      title: 'DEVELOPER',
      description: 'Build or upgrade luxury properties with smart technology',
      image: '/images/solutions/dubai-villa-luxury-2.jpg',
      href: '/persona/developer',
    },
    {
      title: 'COMMERCIAL',
      description: 'Transform hotels, retail, and corporate spaces',
      image: '/images/projects/luxury-apartment-2.jpg',
      href: '/persona/commercial',
    },
  ]

  const handlePersonaClick = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-lexa-black border border-gray-800 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-lexa-gold transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
                TELL US WHO YOU ARE
              </h2>
              <p className="text-lexa-gold text-center mb-10">
                We'll guide you faster to the right solutions
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {personas.map((persona, index) => (
                  <motion.div
                    key={persona.title}
                    className="group relative h-64 cursor-pointer overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePersonaClick(persona.href)}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${persona.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{persona.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{persona.description}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-fit bg-transparent text-white border-white hover:bg-lexa-gold hover:text-lexa-black hover:border-lexa-gold"
                      >
                        EXPLORE
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}