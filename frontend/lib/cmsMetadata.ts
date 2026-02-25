import type { Metadata } from 'next'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexalifestyle.com'

interface CmsSeoData {
  title?: string
  description?: string
  keywords?: string
  og_title?: string
  og_description?: string
  og_image?: string
  og_type?: string
  canonical_url?: string
  robots?: string
  site_name?: string
  canonical_domain?: string
  default_og_image?: string
  twitter_handle?: string
}

// Server-side fetch of CMS SEO data (with revalidation cache)
async function fetchSeoData(key: string): Promise<CmsSeoData | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/cms/sections/${key}`, {
      next: { revalidate: 120 }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.value || null
  } catch {
    return null
  }
}

// Generate metadata for any page with CMS SEO override
export async function generateCmsMetadata(
  seoKey: string,
  fallback: Metadata
): Promise<Metadata> {
  const [seo, globalSeo] = await Promise.all([
    fetchSeoData(seoKey),
    fetchSeoData('seo_global')
  ])

  if (!seo && !globalSeo) return fallback

  const siteName = globalSeo?.site_name || 'LEXA Dubai'
  const defaultOgImage = globalSeo?.default_og_image || '/images/og-default.jpg'
  const twitterHandle = globalSeo?.twitter_handle || '@lexasmarthome'

  // CMS SEO data overrides fallback
  const title = seo?.title || (typeof fallback.title === 'string' ? fallback.title : undefined)
  const description = seo?.description || (typeof fallback.description === 'string' ? fallback.description : undefined)
  const keywords = seo?.keywords
    ? seo.keywords.split(',').map((k: string) => k.trim())
    : (Array.isArray(fallback.keywords) ? fallback.keywords : undefined)
  const ogImage = seo?.og_image || defaultOgImage
  const robots = seo?.robots || undefined

  return {
    ...fallback,
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && { keywords }),
    ...(seo?.canonical_url && {
      alternates: { ...fallback.alternates, canonical: seo.canonical_url }
    }),
    ...(robots && {
      robots: robots.includes('noindex')
        ? { index: false, follow: robots.includes('follow') }
        : { index: true, follow: !robots.includes('nofollow') }
    }),
    openGraph: {
      ...(fallback.openGraph || {}),
      title: seo?.og_title || title || (fallback.openGraph as any)?.title,
      description: seo?.og_description || description || (fallback.openGraph as any)?.description,
      images: ogImage ? [{ url: ogImage }] : (fallback.openGraph as any)?.images,
      siteName,
      type: (seo?.og_type || (fallback.openGraph as any)?.type || 'website') as any,
    },
    twitter: {
      ...(fallback.twitter || {}),
      card: 'summary_large_image',
      site: twitterHandle,
      title: seo?.og_title || title || (fallback.twitter as any)?.title,
      description: seo?.og_description || description || (fallback.twitter as any)?.description,
      images: ogImage ? [ogImage] : (fallback.twitter as any)?.images,
    },
  }
}
