'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PersonaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PersonaModal({ isOpen, onClose }: PersonaModalProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const personas = [
    {
      title: 'HOMEOWNER',
      description: 'Design or upgrade a luxury home with seamless control',
      image: '/images/premium/hero/hero-1.jpg',
      href: '/persona/homeowner',
    },
    {
      title: 'ARCHITECT / DESIGNER',
      description: 'Integrate smart systems into your architectural vision',
      image: '/images/premium/solutions/penthouse-2.jpg',
      href: '/persona/architect',
    },
    {
      title: 'DEVELOPER',
      description: 'Build or upgrade luxury properties with smart technology',
      image: '/images/premium/solutions/penthouse-3.jpg',
      href: '/persona/developer',
    },
    {
      title: 'COMMERCIAL',
      description: 'Transform hotels, retail, and corporate spaces',
      image: '/images/premium/hero/hero-3.jpg',
      href: '/persona/commercial',
    },
  ]

  const handlePersonaClick = (href: string) => {
    router.push(href)
    onClose()
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" data-testid="persona-modal">
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
            className="relative bg-[#0A0A0A] border border-zinc-800 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-[#C9A962] transition-colors z-10"
              aria-label="Close modal"
              data-testid="persona-modal-close"
            >
              <X size={28} />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
                HOW CAN WE HELP YOU?
              </h2>
              <p className="text-zinc-400 text-center mb-10 text-base">
                Choose the option that best describes you, or explore everything we offer
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {personas.map((persona, index) => (
                  <motion.div
                    key={persona.title}
                    className="group relative h-64 cursor-pointer overflow-hidden rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePersonaClick(persona.href)}
                    data-testid={`persona-card-${index}`}
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
                        className="w-fit bg-transparent text-white border-white hover:bg-[#C9A962] hover:text-[#050505] hover:border-[#C9A962]"
                      >
                        EXPLORE
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skip Option */}
              <div className="text-center pt-4 border-t border-zinc-800">
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-white text-sm transition-colors underline decoration-dotted underline-offset-4"
                  data-testid="persona-skip"
                >
                  Skip for now, I&apos;ll explore on my own
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
