'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Tracking configuration interface
interface TrackingConfig {
  ga4_measurement_id?: string
  google_ads_id?: string
  google_ads_conversion_label?: string
  meta_pixel_id?: string
  linkedin_partner_id?: string
  tiktok_pixel_id?: string
  twitter_pixel_id?: string
  snapchat_pixel_id?: string
}

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: (...args: any[]) => void
    _fbq: any
    lintrk: (...args: any[]) => void
    _linkedin_data_partner_ids: string[]
    ttq: any
    twq: (...args: any[]) => void
    snaptr: (...args: any[]) => void
  }
}

// Global config store for tracking functions
let globalConfig: TrackingConfig = {}

// Page view tracker component
function PageViewTracker({ config }: { config: TrackingConfig }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Google Analytics page view
      if (config.ga4_measurement_id && typeof window.gtag !== 'undefined') {
        window.gtag('config', config.ga4_measurement_id, {
          page_path: url,
        })
      }
      
      // Meta Pixel page view
      if (config.meta_pixel_id && typeof window.fbq !== 'undefined') {
        window.fbq('track', 'PageView')
      }
    }
  }, [pathname, searchParams, config])

  return null
}

// Main tracking component
export default function TrackingPixels() {
  const [config, setConfig] = useState<TrackingConfig>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/admin/tracking/public/config`, {
          signal: abortController.signal
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        if (data.config) {
          setConfig(data.config)
          globalConfig = data.config // Store globally for tracking functions
        }
      } catch (error: any) {
        // Silently handle abort errors
        if (error?.name !== 'AbortError') {
          // Tracking config fetch is non-critical, don't log errors
        }
      } finally {
        setLoaded(true)
      }
    }
    
    fetchConfig()
    
    return () => {
      abortController.abort()
    }
  }, [])

  // Don't render anything until config is loaded
  if (!loaded) return null

  const isGAEnabled = !!config.ga4_measurement_id
  const isGoogleAdsEnabled = !!config.google_ads_id
  const isMetaPixelEnabled = !!config.meta_pixel_id
  const isLinkedInEnabled = !!config.linkedin_partner_id
  const isTikTokEnabled = !!config.tiktok_pixel_id
  const isTwitterEnabled = !!config.twitter_pixel_id
  const isSnapchatEnabled = !!config.snapchat_pixel_id

  return (
    <>
      {/* Google Analytics 4 */}
      {isGAEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4_measurement_id}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.ga4_measurement_id}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
              ${isGoogleAdsEnabled ? `gtag('config', '${config.google_ads_id}');` : ''}
            `}
          </Script>
        </>
      )}

      {/* Meta/Facebook Pixel */}
      {isMetaPixelEnabled && (
        <>
          <Script id="meta-pixel" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.meta_pixel_id}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${config.meta_pixel_id}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {isLinkedInEnabled && (
        <>
          <Script id="linkedin-insight" strategy="lazyOnload">
            {`
              _linkedin_partner_id = "${config.linkedin_partner_id}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${config.linkedin_partner_id}&fmt=gif`}
            />
          </noscript>
        </>
      )}

      {/* TikTok Pixel */}
      {isTikTokEnabled && (
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${config.tiktok_pixel_id}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Twitter/X Pixel */}
      {isTwitterEnabled && (
        <Script id="twitter-pixel" strategy="lazyOnload">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','${config.twitter_pixel_id}');
          `}
        </Script>
      )}

      {/* Snapchat Pixel */}
      {isSnapchatEnabled && (
        <Script id="snapchat-pixel" strategy="lazyOnload">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', '${config.snapchat_pixel_id}', {
            'user_email': '__INSERT_USER_EMAIL__'
            });
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      )}

      {/* Page view tracker */}
      <Suspense fallback={null}>
        <PageViewTracker config={config} />
      </Suspense>
    </>
  )
}

// ============================================
// TRACKING UTILITY FUNCTIONS
// Use these to track conversions and events
// ============================================

// Helper to check if tracking is enabled
const isGAEnabled = () => !!globalConfig.ga4_measurement_id
const isGoogleAdsEnabled = () => !!globalConfig.google_ads_id
const isMetaPixelEnabled = () => !!globalConfig.meta_pixel_id
const isLinkedInEnabled = () => !!globalConfig.linkedin_partner_id

// Track a conversion event across all platforms
export function trackConversion(eventName: string, value?: number, currency: string = 'AED') {
  // Google Analytics event
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'conversion',
      value: value,
      currency: currency,
    })
  }

  // Google Ads conversion
  if (isGoogleAdsEnabled() && globalConfig.google_ads_conversion_label && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${globalConfig.google_ads_id}/${globalConfig.google_ads_conversion_label}`,
      value: value,
      currency: currency,
    })
  }

  // Meta Pixel conversion
  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, {
      value: value,
      currency: currency,
    })
  }

  // LinkedIn conversion
  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: eventName })
  }
}

// Track lead submission
export function trackLead(leadType: string, value?: number) {
  // Google Analytics
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'generate_lead', {
      event_category: 'lead',
      event_label: leadType,
      value: value,
    })
  }

  // Meta Pixel - Lead event
  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: leadType,
      value: value,
      currency: 'AED',
    })
  }

  // LinkedIn
  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'lead_generated' })
  }
}

// Track form submission
export function trackFormSubmission(formName: string) {
  // Google Analytics
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submission', {
      event_category: 'engagement',
      event_label: formName,
    })
  }

  // Meta Pixel - Complete Registration
  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'CompleteRegistration', {
      content_name: formName,
    })
  }
}

// Track consultation booking
export function trackConsultationBooking(value?: number) {
  // Google Analytics
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'schedule_consultation', {
      event_category: 'conversion',
      value: value || 2500,
      currency: 'AED',
    })
  }

  // Google Ads conversion
  if (isGoogleAdsEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${globalConfig.google_ads_id}/${globalConfig.google_ads_conversion_label}`,
      value: value || 2500,
      currency: 'AED',
    })
  }

  // Meta Pixel - Schedule event
  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Schedule', {
      content_name: 'Consultation Booking',
      value: value || 2500,
      currency: 'AED',
    })
  }

  // LinkedIn
  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'consultation_booked' })
  }
}

// Track calculator quote
export function trackQuoteGenerated(value: number, projectType: string) {
  // Google Analytics
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'quote_generated', {
      event_category: 'conversion',
      event_label: projectType,
      value: value,
      currency: 'AED',
    })
  }

  // Google Ads conversion
  if (isGoogleAdsEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${globalConfig.google_ads_id}/${globalConfig.google_ads_conversion_label}`,
      value: value,
      currency: 'AED',
    })
  }

  // Meta Pixel
  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: projectType,
      value: value,
      currency: 'AED',
    })
  }

  // LinkedIn
  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'quote_generated' })
  }
}

// Track experience centre visit booking
export function trackExperienceCentreBooking() {
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'experience_centre_booking', {
      event_category: 'conversion',
    })
  }

  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Schedule', {
      content_name: 'Experience Centre Visit',
    })
  }

  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'showroom_visit' })
  }
}

// Track contact form submission
export function trackContactSubmission() {
  if (isGAEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'contact_submit', {
      event_category: 'conversion',
    })
  }

  if (isMetaPixelEnabled() && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact')
  }

  if (isLinkedInEnabled() && typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'contact_submitted' })
  }
}

// Track project builder start
export function trackProjectBuilderStart(propertyType?: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'project_builder_start', {
      event_category: 'engagement',
      property_type: propertyType,
    })
  }

  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', {
      content_name: 'Project Builder',
      content_category: propertyType,
    })
  }
}

// Track project builder submission
export function trackProjectBuilderSubmit(data: {
  propertyType?: string
  budget?: number
  leadScore?: number
  tier?: string
}) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'project_builder_submit', {
      event_category: 'conversion',
      property_type: data.propertyType,
      value: data.budget,
      currency: 'AED',
      lead_score: data.leadScore,
      lead_tier: data.tier,
    })
  }

  if (isGoogleAdsEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${globalConfig.google_ads_id}/${globalConfig.google_ads_conversion_label}`,
      value: data.budget,
      currency: 'AED',
    })
  }

  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: 'Project Builder Submission',
      content_category: data.propertyType,
      value: data.budget,
      currency: 'AED',
    })
  }

  if (typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'project_builder_submit' })
  }
}

// Track WhatsApp click with intent data
export function trackWhatsAppClick(intent?: string, source?: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: intent || 'general',
      source: source || 'widget',
    })
  }

  if (isGoogleAdsEnabled() && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${globalConfig.google_ads_id}/${globalConfig.google_ads_conversion_label}`,
    })
  }

  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Click',
      content_category: intent,
    })
  }

  if (typeof window.lintrk !== 'undefined') {
    window.lintrk('track', { conversion_id: 'whatsapp_click' })
  }
}

// Track page view with custom parameters
export function trackPageView(pageName: string, pageType?: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_type: pageType,
    })
  }
}

// Track scroll depth
export function trackScrollDepth(depth: number, pageName: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      percent_scrolled: depth,
      page_title: pageName,
    })
  }
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, location: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      cta_name: ctaName,
      cta_location: location,
    })
  }
}
