'use client'

import { useEffect } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export default function DynamicFavicon() {
  const { settings } = useSiteSettings()

  useEffect(() => {
    if (!settings?.favicon) return
    
    // Only update if we have a custom favicon from settings
    const faviconUrl = settings.favicon
    if (!faviconUrl || faviconUrl === '/favicon.ico') return

    // Update all favicon links
    const updateFavicon = (selector: string, url: string) => {
      const link = document.querySelector(selector) as HTMLLinkElement
      if (link) {
        link.href = url
      }
    }

    // Update existing favicon links
    updateFavicon('link[rel="icon"][sizes="32x32"]', faviconUrl)
    updateFavicon('link[rel="icon"][type="image/x-icon"]', faviconUrl)
    
    // Also update shortcut icon if exists
    updateFavicon('link[rel="shortcut icon"]', faviconUrl)

  }, [settings?.favicon])

  return null // This component only manages side effects
}
