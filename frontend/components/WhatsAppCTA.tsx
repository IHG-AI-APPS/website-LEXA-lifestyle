'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

interface WhatsAppCTAProps {
  message: string
  source: string
  intent?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
  showIcon?: boolean
}

export default function WhatsAppCTA({
  message,
  source,
  intent = 'general',
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  showIcon = true,
}: WhatsAppCTAProps) {
  const handleClick = () => {
    openWhatsApp(message, source, intent)
  }

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200'
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const variantStyles = {
    primary: 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-green-50 text-green-600 border-2 border-green-500',
    outline: 'bg-transparent hover:bg-green-500/10 text-green-500 border-2 border-green-500',
    floating: 'bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:scale-110',
  }

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      data-testid={`whatsapp-cta-${source}`}
    >
      {showIcon && <MessageCircle size={iconSize[size]} />}
      {children || 'Chat on WhatsApp'}
    </button>
  )
}

// Quick preset buttons for common use cases
export function WhatsAppQuoteButton({ service, location, className }: { service?: string, location?: string, className?: string }) {
  const message = service 
    ? `Hi LEXA! I'd like a quote for ${service}${location ? ` in ${location}` : ''}.\n\nProperty type: ___\nTimeline: ___`
    : `Hi LEXA! I'd like a quote for smart home automation${location ? ` in ${location}` : ''}.\n\nProperty type: ___\nSize: ___ sqm`
  
  return (
    <WhatsAppCTA
      message={message}
      source="quote_button"
      intent="quote_request"
      variant="primary"
      className={className}
    >
      Get WhatsApp Quote
    </WhatsAppCTA>
  )
}

export function WhatsAppConsultButton({ service, className }: { service?: string, className?: string }) {
  const message = `Hi LEXA! I'd like a FREE consultation${service ? ` for ${service}` : ''}.\n\nProperty location: ___\nBest time to call: ___`
  
  return (
    <WhatsAppCTA
      message={message}
      source="consult_button"
      intent="consultation"
      variant="secondary"
      className={className}
    >
      Free WhatsApp Consult
    </WhatsAppCTA>
  )
}

export function WhatsAppEmergencyButton({ className }: { className?: string }) {
  const message = `Hi LEXA! ⚠️ URGENT - I need emergency support.\n\nIssue: ___\nSystem type: ___\nAddress: ___`
  
  return (
    <WhatsAppCTA
      message={message}
      source="emergency_button"
      intent="emergency"
      variant="primary"
      className={`bg-red-500 hover:bg-red-600 ${className}`}
    >
      Emergency Support
    </WhatsAppCTA>
  )
}
