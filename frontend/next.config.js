/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimization
  compress: true,
  poweredByHeader: false,
  
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
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
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
    ]
  },
};

module.exports = nextConfig;