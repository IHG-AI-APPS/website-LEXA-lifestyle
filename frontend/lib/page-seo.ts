import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexalifestyle.com'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  path: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noindex?: boolean
}

/**
 * Generate SEO metadata for individual pages
 * Use this for all pages to ensure consistent SEO
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = 'https://files.ihgbrands.com/lexa/site/og-image.webp',
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'LEXA Lifestyle',
  noindex = false
}: PageSEOProps): Metadata {
  const fullUrl = `${SITE_URL}${path}`
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  
  // Ensure description is under 160 characters
  const truncatedDescription = description.length > 155 
    ? description.substring(0, 152) + '...'
    : description
  
  // Ensure title is under 60 characters
  const fullTitle = title.length > 55 
    ? title.substring(0, 52) + '...'
    : title

  return {
    title: fullTitle,
    description: truncatedDescription,
    keywords: [
      ...keywords,
      'LEXA Lifestyle',
      'smart home Dubai',
      'home automation UAE'
    ],
    authors: [{ name: author, url: SITE_URL }],
    creator: author,
    publisher: 'LEXA Lifestyle',
    robots: noindex ? {
      index: false,
      follow: false
    } : {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-AE': fullUrl,
        'ar-AE': `${fullUrl}${path === '/' ? '' : '/'}ar`,
      }
    },
    openGraph: {
      type: type as any,
      locale: 'en_AE',
      url: fullUrl,
      title: fullTitle,
      description: truncatedDescription,
      siteName: 'LEXA Lifestyle',
      images: [{
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: `${fullTitle} - LEXA Lifestyle Dubai`
      }],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        section: 'Smart Home',
        tags: keywords
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: truncatedDescription,
      images: [fullImageUrl],
      site: '@lexalifestyle',
      creator: '@lexalifestyle'
    }
  }
}

/**
 * Generate BreadcrumbList schema for SEO
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  }
}

/**
 * Generate Product schema for packages/services
 */
export function generateProductSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'AED',
  url
}: {
  name: string
  description: string
  image: string
  price: string
  priceCurrency?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    brand: {
      '@type': 'Brand',
      name: 'LEXA Lifestyle'
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${url}`,
      priceCurrency,
      price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'LEXA Lifestyle'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127'
    }
  }
}

/**
 * Generate Article schema for blog/news
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = 'LEXA Lifestyle',
  url
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/lexa-black.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`
    }
  }
}

/**
 * Generate Service schema
 */
export function generateServiceSchema({
  name,
  description,
  image,
  price,
  url
}: {
  name: string
  description: string
  image: string
  price?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    provider: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle',
      url: SITE_URL
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates'
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'AED'
      }
    }),
    url: `${SITE_URL}${url}`
  }
}
