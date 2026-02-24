'use client'

import { Facebook, Twitter, Linkedin, Link2, Check, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  url?: string
  title: string
  description?: string
  hashtags?: string[]
  variant?: 'horizontal' | 'vertical' | 'floating'
  showLabels?: boolean
  className?: string
}

export default function SocialShare({
  url,
  title,
  description = '',
  hashtags = ['LEXA', 'SmartHome', 'Dubai', 'HomeAutomation'],
  variant = 'horizontal',
  showLabels = false,
  className = ''
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.join(',')

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const buttonBaseClass = `
    flex items-center justify-center gap-2 rounded-full transition-all duration-300
    hover:scale-110 hover:shadow-lg active:scale-95
  `

  const getButtonSize = () => {
    if (variant === 'floating') return 'w-12 h-12'
    return showLabels ? 'px-4 py-2' : 'w-10 h-10'
  }

  const containerClass = {
    horizontal: 'flex items-center gap-2 flex-wrap',
    vertical: 'flex flex-col gap-2',
    floating: 'fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40'
  }

  return (
    <div className={`${containerClass[variant]} ${className}`}>
      {/* WhatsApp - Most important for UAE */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} ${getButtonSize()} bg-[#25D366] text-white hover:bg-[#128C7E]`}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">WhatsApp</span>}
      </a>

      {/* LinkedIn - Important for B2B */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} ${getButtonSize()} bg-[#0A66C2] text-white hover:bg-[#004182]`}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">LinkedIn</span>}
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} ${getButtonSize()} bg-[#1877F2] text-white hover:bg-[#0D65D9]`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">Facebook</span>}
      </a>

      {/* Twitter/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} ${getButtonSize()} bg-[#1DA1F2] text-white hover:bg-[#0C85D0]`}
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">Twitter</span>}
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`${buttonBaseClass} ${getButtonSize()} ${
          copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        title={copied ? 'Copied!' : 'Copy Link'}
        aria-label="Copy link to clipboard"
      >
        {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        {showLabels && <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>}
      </button>
    </div>
  )
}

// Floating share button that can be added to any page
export function FloatingShareButton({ title, description }: { title: string; description?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-24 z-40 lg:bottom-8">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 animate-fade-in">
          <p className="text-xs text-gray-500 mb-3 font-medium">Share this page</p>
          <SocialShare 
            title={title} 
            description={description}
            variant="vertical"
          />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-800 text-white rotate-45' : 'bg-[#C9A962] text-white hover:bg-[#B8893D]'
        }`}
        aria-label="Share"
      >
        <Link2 className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
