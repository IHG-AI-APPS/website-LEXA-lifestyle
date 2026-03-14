import { MetadataRoute } from 'next'

// Video Sitemap for Google Video search and YouTube
export default async function videoSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lexalifestyle.com'
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
  
  // Fetch videos from database
  let videos: any[] = []
  try {
    const response = await fetch(`${backendUrl}/api/videos`, { cache: 'no-store' })
    if (response.ok) {
      videos = await response.json()
    }
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error)
  }

  const entries: MetadataRoute.Sitemap = []

  // Video pages
  videos.filter(v => v.url || v.video_url).forEach(video => {
    entries.push({
      url: `${baseUrl}/videos/${video.slug || video.id}`,
      lastModified: video.updated_at ? new Date(video.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Experience centre (has videos)
  entries.push({
    url: `${baseUrl}/experience-centre`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  })

  // Homepage (hero video)
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  return entries
}
