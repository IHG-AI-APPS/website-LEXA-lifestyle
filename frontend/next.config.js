/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimization
  compress: true,
  poweredByHeader: false,

  // TypeScript - ignore build errors from existing pages
  typescript: {
    ignoreBuildErrors: true,
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
    'cms-seo-live.preview.emergentagent.com',
    'cms-seo-live.cluster-0.preview.emergentcf.cloud',
    'qa-dashboard-13.preview.emergentagent.com',
    'qa-dashboard-13.cluster-5.preview.emergentcf.cloud',
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
      
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 30,
          },
          lucideReact: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-react',
            chunks: 'all',
            priority: 30,
          },
          radixUi: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
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
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
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
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;