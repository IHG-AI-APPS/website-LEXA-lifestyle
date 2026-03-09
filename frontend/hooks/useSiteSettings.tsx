'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

export interface SiteSettings {
  // Logos
  header_logo_light: string
  header_logo_dark: string
  footer_logo_light: string
  footer_logo_dark: string
  favicon: string
  // Social Media
  social_facebook: string
  social_instagram: string
  social_twitter: string
  social_linkedin: string
  social_youtube: string
  social_tiktok: string
  social_whatsapp: string
  // Contact - Company
  contact_email: string
  contact_phone: string
  contact_address: string
  // Contact - HR/Careers
  hr_email: string
  // Homepage Hero
  hero_title: string
  hero_subtitle: string
  hero_video_url: string
  hero_image: string
  hero_cta_text: string
  hero_cta_link: string
  // SEO
  site_name: string
  site_description: string
  // Homepage Sections
  featured_projects_title: string
  featured_projects_subtitle: string
  about_section_title: string
  about_section_content: string
  about_section_image: string
}

const defaultSettings: SiteSettings = {
  header_logo_light: 'https://files.ihgbrands.com/lexa/site/lexa-white.webp',
  header_logo_dark: 'https://files.ihgbrands.com/lexa/site/lexa-black.webp',
  footer_logo_light: 'https://files.ihgbrands.com/lexa/site/lexa-white.webp',
  footer_logo_dark: 'https://files.ihgbrands.com/lexa/site/lexa-black.webp',
  favicon: '/favicon.ico',
  social_facebook: '',
  social_instagram: 'https://www.instagram.com/lexalifestyle.me/',
  social_twitter: '',
  social_linkedin: 'https://www.linkedin.com/company/lexa-lifestyle-llc/',
  social_youtube: 'https://www.youtube.com/@lexalifestyle',
  social_tiktok: '',
  social_whatsapp: '',
  contact_email: 'info@lexalifestyle.com',
  contact_phone: '+971 50 326 7228',
  contact_address: 'Dubai, UAE',
  hr_email: 'careers@lexalifestyle.com',
  hero_title: 'Transform Your Space Into an Intelligent Sanctuary',
  hero_subtitle: 'Experience the future of luxury living with LEXA cutting-edge smart home solutions.',
  hero_video_url: '',
  hero_image: '',
  hero_cta_text: 'Explore Solutions',
  hero_cta_link: '/solutions',
  site_name: 'LEXA Lifestyle',
  site_description: 'Premium Smart Home Automation Solutions',
  featured_projects_title: 'Our Portfolio',
  featured_projects_subtitle: 'Explore our latest smart home transformations',
  about_section_title: 'About LEXA',
  about_section_content: '',
  about_section_image: ''
}

interface SiteSettingsContextType {
  settings: SiteSettings
  loading: boolean
  refresh: () => Promise<void>
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refresh: async () => {}
})

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/site-settings`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...defaultSettings, ...data })
      }
    } catch (error) {
      console.error('Failed to fetch site settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
