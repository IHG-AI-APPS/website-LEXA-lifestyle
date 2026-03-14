'use client'

import Script from 'next/script'

interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl?: string
  embedUrl?: string
  duration?: string
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration = 'PT2M30S'
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle',
      logo: {
        '@type': 'ImageObject',
        url: 'https://files.ihgbrands.com/lexa/site/lexa-white.webp'
      }
    }
  }

  return (
    <Script
      id={`video-schema-${name.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Homepage hero video schema
export function HomepageVideoSchema() {
  return (
    <VideoSchema
      name="LEXA Lifestyle Smart Home Automation Dubai"
      description="Experience luxury smart home automation in Dubai. LEXA Lifestyle transforms homes with intelligent lighting, home theaters, multi-room audio, and complete automation solutions."
      thumbnailUrl="https://files.ihgbrands.com/lexa/site/hero-thumbnail.jpg"
      uploadDate="2024-01-01"
      contentUrl="https://files.ihgbrands.com/lexa/videos/hero-video.mp4"
      duration="PT1M30S"
    />
  )
}

// Image schema for project galleries
export function ImageGallerySchema({ images }: { images: { url: string; caption: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'LEXA Lifestyle Smart Home Projects',
    description: 'Gallery of luxury smart home automation projects in Dubai and UAE',
    image: images.map(img => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      caption: img.caption,
      creator: {
        '@type': 'Organization',
        name: 'LEXA Lifestyle'
      }
    }))
  }

  return (
    <Script
      id="image-gallery-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
