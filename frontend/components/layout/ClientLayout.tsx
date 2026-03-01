'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileTabBar from '@/components/navigation/MobileTabBar'
import CommandPalette from '@/components/navigation/CommandPalette'
import FloatingContactButton from '@/components/ui/floating-contact'
import WhatsAppEnhanced from '@/components/conversion/WhatsAppEnhanced'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ThemeProvider } from '@/contexts/ThemeContext'
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

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  // Track page views (excluding admin pages)
  useEffect(() => {
    if (!isAdminPage && pathname) {
      trackPageView(pathname)
    }
  }, [pathname, isAdminPage])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          {/* Skip to main content - Accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to main content
          </a>
          {!isAdminPage && <Header />}
          <main id="main-content" role="main" aria-label="Main content" className={isAdminPage ? '' : 'pb-20 lg:pb-0'}>{children}</main>
          {!isAdminPage && <Footer />}
          {!isAdminPage && <MobileTabBar />}
          {!isAdminPage && <CommandPalette />}
          {!isAdminPage && <FloatingContactButton />}
          {!isAdminPage && <WhatsAppEnhanced />}
          {!isAdminPage && <AIChatWidget />}
          {!isAdminPage && <SocialProofWidget />}
          {!isAdminPage && <ExitIntentPopup />}
          {!isAdminPage && <CookieConsent />}
          {!isAdminPage && <LinkPrefetcher />}
          {!isAdminPage && <ScheduleVisitButton />}
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
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
