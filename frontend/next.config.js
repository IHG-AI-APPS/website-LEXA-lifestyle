/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Note: NOT using standalone output as deployment uses 'npx next start'
  // output: 'standalone',
  
  // Performance optimization
  compress: true,
  poweredByHeader: false,

  // TypeScript - strict checking enabled
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint - ignore during build (warnings only)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Production optimizations - CSS/JS minification is enabled by default in production
  // swcMinify is enabled by default in Next.js 13+
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow images from any HTTPS source for dynamic content
    // This prevents "unconfigured host" errors for user-uploaded images
    remotePatterns: [
      // Stock photo services
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // CDN services
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      // Production domain
      {
        protocol: 'https',
        hostname: 'lexalifestyle.com',
      },
      {
        protocol: 'https',
        hostname: '**.lexalifestyle.com',
      },
      // Emergent platform - covers all preview/staging environments
      {
        protocol: 'https',
        hostname: '**.emergentagent.com',
      },
      {
        protocol: 'https',
        hostname: '**.preview.emergentagent.com',
      },
      {
        protocol: 'https',
        hostname: '**.stage-preview.emergentagent.com',
      },
      // Catch-all for any other HTTPS images (user uploads, external sources)
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
  },
  
  // Source maps disabled in production for faster loading
  productionBrowserSourceMaps: false,

  // Allow dev origins for preview environment
  allowedDevOrigins: [
    'dynamic-content-hub-3.preview.emergentagent.com',
    'dynamic-content-hub-3.cluster-0.preview.emergentcf.cloud',
  ],
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      '@radix-ui/react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'date-fns',
      'recharts'
    ],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
      
      // Merge chunks to reduce parallel request count (prevents 429 rate limiting)
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 80000,     // Merge chunks under 80KB
        maxSize: 500000,    // Allow chunks up to 500KB before splitting
        maxInitialRequests: 12, // Limit initial parallel requests
        maxAsyncRequests: 15,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Merge all vendor libs into fewer chunks
          vendorBundle: {
            test: /[\\/]node_modules[\\/](framer-motion|lucide-react|@radix-ui)[\\/]/,
            name: 'vendor-ui',
            chunks: 'all',
            priority: 30,
          },
        },
      }
    }
    return config
  },
  
  // Redirects for moved pages (SEO preservation)
  async redirects() {
    return [
      {
        source: '/solutions/smart-apartment-packages',
        destination: '/packages/smart-apartment-packages',
        permanent: true, // 301 redirect
      },
      {
        source: '/solutions/developer-packages',
        destination: '/packages/developer-packages',
        permanent: true, // 301 redirect
      },
    ]
  },

  // Headers for caching, security, and performance
  async headers() {
    return [
      // Service Worker must never be cached
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      // Cache static assets
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security and SEO headers for all pages
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(self)'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://snap.licdn.com https://static.hotjar.com https://script.hotjar.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: http:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https: wss:; media-src 'self' https: blob:; frame-src 'self' https://www.youtube.com https://www.google.com https://player.vimeo.com; object-src 'none'; base-uri 'self'; form-action 'self' https:; frame-ancestors 'self'; upgrade-insecure-requests"
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;