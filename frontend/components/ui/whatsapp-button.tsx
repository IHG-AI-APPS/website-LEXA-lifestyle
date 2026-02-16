'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
}

export default function WhatsAppButton({ 
  phoneNumber = '+971521782109',
  message,
  className = ''
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const quickMessages = [
    {
      title: 'Villa Automation Concept',
      message: 'Hi LEXA, I\'d like a smart home concept for my villa. Property size: ___ sqm'
    },
    {
      title: 'Experience Centre Visit',
      message: 'Hi LEXA, I\'d like to schedule a private visit to your Experience Centre'
    },
    {
      title: 'Technical Consultation',
      message: 'Hi LEXA, I need technical consultation for my project'
    },
    {
      title: 'Project Quote',
      message: 'Hi LEXA, I need a detailed quote for home automation. Location: ___'
    }
  ]

  const handleQuickMessage = (msg: string) => {
    const encodedMessage = encodeURIComponent(msg)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  const handleDirectChat = () => {
    const defaultMessage = message || 'Hi LEXA, I\'m interested in learning more about your smart home solutions.'
    const encodedMessage = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Quick Message Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 md:bottom-28 md:right-8 z-40 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 text-white">
              <h3 className="font-bold text-lg mb-1">Quick Connect</h3>
              <p className="text-sm text-white/90">Choose a conversation starter</p>
            </div>
            
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(msg.message)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#25D366] hover:bg-green-50 transition-all group"
                >
                  <div className="font-semibold text-sm mb-1 group-hover:text-[#25D366]">
                    {msg.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {msg.message.substring(0, 50)}...
                  </div>
                </button>
              ))}
              
              <button
                onClick={handleDirectChat}
                className="w-full p-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-all"
              >
                Open WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <div className="flex items-center justify-center w-16 h-16">
          {isOpen ? (
            <X size={28} strokeWidth={2} />
          ) : (
            <MessageCircle size={28} strokeWidth={2} />
          )}
        </div>
      </button>
    </>
  )
}
