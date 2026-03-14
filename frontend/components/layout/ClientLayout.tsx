'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileTabBar from '@/components/navigation/MobileTabBar'
import CommandPalette from '@/components/navigation/CommandPalette'
import FloatingContactButton from '@/components/ui/floating-contact'
import WhatsAppEnhanced from '@/components/conversion/WhatsAppEnhanced'
import { SmoothScrollProvider, useSmoothScroll } from '@/components/providers/SmoothScrollProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SiteSettingsProvider } from '@/hooks/useSiteSettings'
import { Toaster } from 'sonner'
import dynamic from 'next/dynamic'
import { trackPageView } from '@/hooks/useAnalytics'

// Dynamically import widgets to avoid SSR issues - with error recovery
const Noop = () => null
const AIChatWidget = dynamic(() => import('@/components/widgets/AIChatWidget').catch(() => ({ default: Noop })), { ssr: false })
const SocialProofWidget = dynamic(() => import('@/components/widgets/SocialProofWidget').catch(() => ({ default: Noop })), { ssr: false })
const ExitIntentPopup = dynamic(() => import('@/components/widgets/ExitIntentPopup').catch(() => ({ default: Noop })), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/widgets/CookieConsent').catch(() => ({ default: Noop })), { ssr: false })
const LinkPrefetcher = dynamic(() => import('@/components/performance/LinkPrefetcher').catch(() => ({ default: Noop })), { ssr: false })
const ScheduleVisitButton = dynamic(() => import('@/components/widgets/ScheduleVisitButton').catch(() => ({ default: Noop })), { ssr: false })
const PullToRefresh = dynamic(() => import('@/components/mobile/PullToRefresh'), { ssr: false })
const ConsultationFormLazy = dynamic(() => import('@/components/forms/ConsultationForm').catch(() => ({ default: Noop })), { ssr: false })
const MobileQuickActions = dynamic(() => import('@/components/mobile/MobileQuickActions'), { ssr: false })

// Inner component that uses the scroll context
function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollToTop } = useSmoothScroll()
  const isAdminPage = pathname?.startsWith('/admin')
  const isCatalogueViewer = pathname?.startsWith('/catalogues/') && pathname !== '/catalogues'
  const hideMainLayout = isAdminPage || isCatalogueViewer
  const [showConsultation, setShowConsultation] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  // Mark as hydrated after initial render
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Wait for content to be ready before hiding loader
  useEffect(() => {
    if (!isHydrated) return
    
    // Small delay to ensure dynamic imports and content are rendered
    const timer = setTimeout(() => {
      setContentReady(true)
      
      // Remove the initial hide style
      const initialHide = document.getElementById('initial-hide')
      if (initialHide) {
        initialHide.remove()
      }
      
      // Fade out and remove the initial loader
      const loader = document.getElementById('initial-page-loader')
      if (loader) {
        loader.style.opacity = '0'
        loader.style.transition = 'opacity 0.3s ease-out'
        setTimeout(() => loader.remove(), 300)
      }
    }, 300) // Wait 300ms for dynamic content to load
    
    return () => clearTimeout(timer)
  }, [isHydrated])

  // Track page views and scroll to top on route change (excluding admin pages)
  useEffect(() => {
    if (!isAdminPage && pathname) {
      trackPageView(pathname)
      // Scroll to top on route change - using both methods for reliability
      scrollToTop()
      // Also use native scroll as fallback
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, isAdminPage, scrollToTop])

  // Register service worker with forced update
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
        .then((reg) => {
          // Force check for updated SW immediately
          reg.update()
          // If a new SW is waiting, tell it to activate
          if (reg.waiting) {
            reg.waiting.postMessage('skipWaiting')
          }
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing
            if (newSW) {
              newSW.addEventListener('statechange', () => {
                if (newSW.state === 'activated') {
                  // New SW activated — reload for fresh content
                  window.location.reload()
                }
              })
            }
          })
        })
        .catch(() => {})
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    router.refresh()
    await new Promise(resolve => setTimeout(resolve, 800))
  }, [router])

  return (
    <div id="layout-wrapper" className={contentReady ? 'hydrated' : ''}>
      {/* Skip to main content - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[#C9A962] focus:text-[#050505] focus:px-6 focus:py-3 focus:text-xs focus:font-bold focus:tracking-[0.15em] focus:uppercase focus:outline-none focus:shadow-lg"
        data-testid="skip-to-content"
      >
        Skip to main content
      </a>
      {!hideMainLayout && <Header />}
      {!hideMainLayout ? (
        <PullToRefresh onRefresh={handleRefresh}>
          <main id="main-content" role="main" aria-label="Main content" className="pb-20 lg:pb-0" style={{ minHeight: '100vh' }}>{children}</main>
        </PullToRefresh>
      ) : (
        <main id="main-content" role="main" aria-label="Main content">{children}</main>
      )}
      {!hideMainLayout && <Footer />}
      {!hideMainLayout && <MobileTabBar />}
      {!hideMainLayout && <CommandPalette />}
      {!hideMainLayout && <FloatingContactButton />}
      {!hideMainLayout && <WhatsAppEnhanced />}
      {!hideMainLayout && <AIChatWidget />}
      {!hideMainLayout && <MobileQuickActions onBookConsultation={() => setShowConsultation(true)} />}
      {!hideMainLayout && <SocialProofWidget />}
      {!hideMainLayout && <ExitIntentPopup />}
      {!hideMainLayout && <CookieConsent />}
      {!hideMainLayout && <LinkPrefetcher />}
      {!hideMainLayout && <ScheduleVisitButton />}
      {showConsultation && <ConsultationFormLazy isOpen={showConsultation} onClose={() => setShowConsultation(false)} />}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
      />
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SiteSettingsProvider>
        <LanguageProvider>
          <SmoothScrollProvider>
            <ClientLayoutInner>{children}</ClientLayoutInner>
          </SmoothScrollProvider>
        </LanguageProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  )
}
