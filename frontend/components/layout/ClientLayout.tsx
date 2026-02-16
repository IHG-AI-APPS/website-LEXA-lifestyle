'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
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

// Dynamically import widgets to avoid SSR issues
const AIChatWidget = dynamic(() => import('@/components/widgets/AIChatWidget'), { ssr: false })
const SocialProofWidget = dynamic(() => import('@/components/widgets/SocialProofWidget'), { ssr: false })
const ExitIntentPopup = dynamic(() => import('@/components/widgets/ExitIntentPopup'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/widgets/CookieConsent'), { ssr: false })
const LinkPrefetcher = dynamic(() => import('@/components/performance/LinkPrefetcher'), { ssr: false })
const ScheduleVisitButton = dynamic(() => import('@/components/widgets/ScheduleVisitButton'), { ssr: false })

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
          {!isAdminPage && <Header />}
          <main className={isAdminPage ? '' : 'pb-20 lg:pb-0'}>{children}</main>
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
