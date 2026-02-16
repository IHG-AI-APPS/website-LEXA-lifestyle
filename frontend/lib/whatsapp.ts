'use client'

// WhatsApp utility for context-specific pre-filled messages
// Use this across the site for optimized conversion

// Use environment variable with fallback
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971521782109'

export interface WhatsAppMessage {
  text: string
  source: string
  intent: string
}

// Context-specific message templates
export const whatsAppMessages = {
  // Homepage CTAs
  homepage: {
    getStarted: "Hi LEXA! 👋 I'm interested in smart home automation for my property in Dubai. Can we discuss my requirements?",
    freeConsultation: "Hi LEXA! I'd like to schedule a FREE consultation for my smart home project.\n\nProperty Type: ___\nLocation: ___\nBest time to call: ___",
  },
  
  // Service Pages
  services: {
    highEndAudio: "Hi LEXA! 🎵 I'm interested in a high-end audio system.\n\nBrands I like: Bowers & Wilkins / McIntosh / Focal\nRoom size: ___ sqm\nBudget range: ___",
    homeTheater: "Hi LEXA! 🎬 I want to build a home theater.\n\nRoom size: ___ sqm\nSeats needed: ___\nDolby Atmos: Yes/No\nBudget range: ___",
    luxuryVilla: "Hi LEXA! 🏠 I need villa automation.\n\nVilla location: ___\nBedrooms: ___\nNew build or retrofit: ___\nPriority systems: Lighting / AV / Security / Climate",
    multiRoomAudio: "Hi LEXA! 🔊 I'm interested in multi-room audio.\n\nNumber of zones: ___\nOutdoor areas: Yes/No\nPreferred brand: Sonos / Sonance / Other",
    outdoorAudio: "Hi LEXA! ☀️ I need outdoor audio for my property.\n\nAreas: Pool / Garden / Terrace / Rooftop\nProperty location: ___",
    smartLighting: "Hi LEXA! 💡 I'm interested in smart lighting.\n\nProperty size: ___ sqm\nAutomated blinds: Yes/No\nPreferred brand: Lutron / Ketra / Other",
    homeCinema: "Hi LEXA! 🎥 I want a private cinema room.\n\nRoom size: ___ sqm\nSeats: ___\nProjector or LED wall: ___",
  },
  
  // Geo Pages
  geo: {
    dubai: "Hi LEXA! I'm looking for smart home automation in Dubai.\n\nArea: Palm Jumeirah / Emirates Hills / Dubai Hills / Other: ___\nProperty type: Villa / Apartment / Penthouse",
    abuDhabi: "Hi LEXA! I need smart home services in Abu Dhabi.\n\nArea: Saadiyat / Yas Island / Al Reem / Other: ___\nProperty type: ___",
    riyadh: "Hi LEXA! 🇸🇦 I'm interested in smart home automation in Riyadh.\n\nArea: Al Malqa / Hittin / KAFD / Other: ___\nProperty type: ___",
    jeddah: "Hi LEXA! I need home automation in Jeddah.\n\nArea: Obhur / Al Shati / Other: ___",
    doha: "Hi LEXA! 🇶🇦 I'm looking for smart home services in Doha.\n\nArea: The Pearl / West Bay / Lusail / Other: ___",
    general: (city: string) => `Hi LEXA! I'm interested in smart home automation in ${city}.\n\nProperty type: ___\nServices needed: ___`,
  },
  
  // Partner Portals
  partners: {
    architect: "Hi LEXA! 👷 I'm an architect interested in partnering.\n\nFirm name: ___\nProjects per year: ___\nCurrent project: ___",
    developer: "Hi LEXA! 🏗️ I'm a developer interested in bulk smart home solutions.\n\nCompany: ___\nProject name: ___\nNumber of units: ___",
  },
  
  // Support & Emergency
  support: {
    general: "Hi LEXA! I need support for my existing smart home system.\n\nSystem type: Control4 / Crestron / Lutron / Other\nIssue: ___",
    emergency: "Hi LEXA! ⚠️ URGENT - I have an emergency with my smart home system.\n\nIssue: ___\nSystem not responding / Power issue / Other\nAddress: ___",
  },
  
  // Quote Requests
  quote: {
    general: "Hi LEXA! I'd like a quote for smart home automation.\n\nProperty: Villa / Apartment / Penthouse\nLocation: ___\nSize: ___ sqm\nBudget range: ___",
    specific: (service: string) => `Hi LEXA! I'd like a quote for ${service}.\n\nProperty location: ___\nTimeline: ___\nBudget range: ___`,
  },
  
  // Experience Centre
  showroom: {
    visit: "Hi LEXA! I'd like to visit your Experience Centre.\n\nPreferred date: ___\nPreferred time: ___\nNumber of visitors: ___\nInterested in: Audio / Home Theater / Lighting / Full tour",
  },
}

// Generate WhatsApp URL with pre-filled message
export function getWhatsAppUrl(message: string, source?: string): string {
  const encodedMessage = encodeURIComponent(message)
  const trackingParam = source ? `&source=${source}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}${trackingParam}`
}

// Open WhatsApp with tracking
export function openWhatsApp(message: string, source: string = 'unknown', intent: string = 'general'): void {
  // Track the click (if tracking is available)
  if (typeof window !== 'undefined') {
    // Send to analytics
    try {
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: intent,
          source: source,
        })
      }
      // @ts-ignore
      if (window.fbq) {
        // @ts-ignore
        window.fbq('track', 'Contact', { method: 'whatsapp', intent: intent })
      }
    } catch (e) {
      console.log('Tracking not available')
    }
  }
  
  window.open(getWhatsAppUrl(message, source), '_blank')
}

// React hook for WhatsApp
export function useWhatsApp() {
  const openChat = (message: string, source: string, intent: string) => {
    openWhatsApp(message, source, intent)
  }
  
  return {
    openChat,
    getUrl: getWhatsAppUrl,
    messages: whatsAppMessages,
    number: WHATSAPP_NUMBER,
  }
}

export default useWhatsApp
