import type { Metadata } from 'next'
import { Outfit, DM_Sans, Tajawal } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'
import TrackingPixels from '@/components/tracking/TrackingPixels'
import { defaultMetadata, organizationSchema, localBusinessSchema, faqSchema, serviceSchema, reviewsSchema, googleBusinessSchema } from '@/lib/seo'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial']
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial']
})

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'],
  fallback: ['Noto Sans Arabic', 'Arial', 'sans-serif']
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${tajawal.variable}`}>
      <head>
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/lexa-black.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/lexa-black.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C9A962" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="LEXA" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="en-AE" href="https://lexalifestyle.com" />
        <link rel="alternate" hrefLang="ar-AE" href="https://lexalifestyle.com/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://lexalifestyle.com" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://static.prod-images.emergentagent.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BACKEND_URL || ''} crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link rel="preload" as="font" type="font/woff2" href="/_next/static/media/outfit-variable.woff2" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(googleBusinessSchema) }}
        />
      </head>
      <body className={dmSans.className} suppressHydrationWarning>
        <TrackingPixels />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
