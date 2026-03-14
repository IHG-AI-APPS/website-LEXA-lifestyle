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
        {/* BLOCKING SCRIPT - Must run before any paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            // Force dark mode immediately
            document.documentElement.classList.add('dark');
            document.documentElement.style.background = '#050505';
            // Create a style element to hide ALL content until hydrated (only loader will show)
            var s = document.createElement('style');
            s.id = 'initial-hide';
            s.textContent = '#layout-wrapper:not(.hydrated) { visibility: hidden !important; } body { background: #050505 !important; }';
            document.head.appendChild(s);
          })();
        ` }} />
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
          html { background: #050505 !important; }
          body { background: #050505 !important; color: #fff; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; }
          html:not(.dark) body { background: #fff !important; color: #111; }
          /* Hide ALL content until hydrated - prevents header/footer flash */
          #layout-wrapper { visibility: hidden; }
          #layout-wrapper.hydrated { visibility: visible; }
          /* Initial page loader - shows while content is loading */
          #initial-page-loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #050505;
            gap: 24px;
            pointer-events: all;
          }
          #initial-page-loader .logo {
            font-size: 28px;
            font-weight: 600;
            letter-spacing: 0.35em;
            color: white;
          }
          #initial-page-loader .bar {
            width: 180px;
            height: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            overflow: hidden;
          }
          #initial-page-loader .bar-inner {
            height: 100%;
            width: 40%;
            background: #C9A962;
            animation: loadSlide 1s ease-in-out infinite;
          }
          @keyframes loadSlide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          #initial-page-loader .text {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: rgba(255,255,255,0.4);
          }
          .sr-only, [class*="sr-only"], a[href="#main-content"] { position: absolute !important; width: 1px !important; height: 1px !important; overflow: hidden !important; clip: rect(0,0,0,0) !important; white-space: nowrap !important; }
          header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(5,5,5,0.95); }
          footer svg { width: 16px !important; height: 16px !important; max-width: 16px !important; max-height: 16px !important; }
          footer a { display: inline-flex; align-items: center; }
          img { max-width: 100%; height: auto; }
          section { overflow: hidden; }
          [data-testid] { visibility: visible; }
          /* Ensure main content takes full height */
          main { min-height: 100vh; }
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
        {/* Initial Page Loader - Pure HTML/CSS, shows while React hydrates */}
        <div id="initial-page-loader">
          <div className="logo">LEXA</div>
          <div className="bar"><div className="bar-inner"></div></div>
          <div className="text">Loading</div>
        </div>
        <TrackingPixels />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
