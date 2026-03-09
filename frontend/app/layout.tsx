import type { Metadata } from 'next'
import { Outfit, DM_Sans, Tajawal, Noto_Sans_Arabic } from 'next/font/google'
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
  preload: false,
  weight: ['400', '500', '700'],
  fallback: ['Noto Sans Arabic', 'Arial', 'sans-serif']
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
  weight: ['400', '500', '600', '700'],
  fallback: ['Arial', 'sans-serif']
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${outfit.variable} ${dmSans.variable} ${tajawal.variable} ${notoArabic.variable}`}>
      <head>
        {/* Theme blocking script — runs BEFORE first paint to prevent white flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('lexa-theme');
              if (t === 'light') {
                document.documentElement.classList.remove('dark');
              }
            } catch(e) {}
          })();
        ` }} />
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="https://files.ihgbrands.com/lexa/site/lexa-black.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://files.ihgbrands.com/lexa/site/lexa-black.webp" />
        
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
        <link rel="dns-prefetch" href="https://files.ihgbrands.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BACKEND_URL || ''} crossOrigin="anonymous" />
        
        {/* CRITICAL INLINE CSS - Dark-first: ALWAYS dark bg, never white flash */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background: #050505 !important; color: #fff; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
          html:not(.dark) body { background: #fff !important; color: #111; }
          .sr-only, [class*="sr-only"], a[href="#main-content"] { position: absolute !important; width: 1px !important; height: 1px !important; overflow: hidden !important; clip: rect(0,0,0,0) !important; white-space: nowrap !important; }
          header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(5,5,5,0.95); }
          footer svg { width: 16px !important; height: 16px !important; max-width: 16px !important; max-height: 16px !important; }
          footer a { display: inline-flex; align-items: center; }
          img { max-width: 100%; height: auto; }
          section { overflow: hidden; }
          [data-testid] { visibility: visible; }
          /* Initial loading screen - hides layout until JS hydrates */
          #initial-loader { position: fixed; inset: 0; z-index: 99999; background: #050505; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s ease; }
          #initial-loader.loaded { opacity: 0; pointer-events: none; }
          #initial-loader .spinner { width: 48px; height: 48px; border: 2px solid #C9A962; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        ` }} />
        
        {/* Chunk load error recovery - auto-reload on stale chunks or 429 failures */}
        <script dangerouslySetInnerHTML={{ __html: `
          var retryKey = 'css_retry';
          function checkCSS() {
            var sheets = document.styleSheets;
            var hasCSS = false;
            for (var i = 0; i < sheets.length; i++) {
              if (sheets[i].href && sheets[i].href.includes('/_next/')) { hasCSS = true; break; }
            }
            if (!hasCSS && !sessionStorage.getItem(retryKey)) {
              sessionStorage.setItem(retryKey, '1');
              setTimeout(function() { window.location.reload(); }, 2000);
            } else if (sessionStorage.getItem(retryKey)) {
              sessionStorage.removeItem(retryKey);
            }
          }
          if (document.readyState === 'complete') { checkCSS(); }
          else { window.addEventListener('load', checkCSS); }
          window.addEventListener('error', function(e) {
            if (e.message && (
              e.message.includes("Cannot read properties of undefined (reading 'call')") ||
              e.message.includes('Loading chunk') ||
              e.message.includes('ChunkLoadError') ||
              e.message.includes('Failed to fetch dynamically imported module')
            )) {
              if (!sessionStorage.getItem('chunk_retry')) {
                sessionStorage.setItem('chunk_retry', '1');
                window.location.reload();
              } else {
                sessionStorage.removeItem('chunk_retry');
              }
            }
          });
          if (sessionStorage.getItem('chunk_retry')) sessionStorage.removeItem('chunk_retry');
        ` }} />
        
        {/* Consolidated Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            organizationSchema,
            localBusinessSchema,
            faqSchema,
            serviceSchema,
            reviewsSchema,
            googleBusinessSchema,
          ]) }}
        />
      </head>
      <body className={dmSans.className}>
        {/* Initial loading screen - hidden by JS after hydration */}
        <div id="initial-loader">
          <div className="spinner"></div>
        </div>
        <TrackingPixels />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
