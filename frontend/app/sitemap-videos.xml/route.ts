import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://lexalifestyle.com'
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
  
  // Fetch videos
  let videos: any[] = []
  try {
    const response = await fetch(`${backendUrl}/api/videos`, { cache: 'no-store' })
    if (response.ok) {
      videos = await response.json()
    }
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error)
  }

  // Build video sitemap XML
  let urls = ''
  
  videos.filter(v => v.url || v.video_url).forEach(video => {
    const videoUrl = video.url || video.video_url
    const thumbnailUrl = video.thumbnail || video.thumbnail_url || `${baseUrl}/images/video-thumbnail.jpg`
    const title = video.title || 'LEXA Lifestyle Video'
    const description = video.description || 'Smart home automation video by LEXA Lifestyle'
    const lastmod = video.updated_at ? new Date(video.updated_at).toISOString() : new Date().toISOString()
    
    urls += `
  <url>
    <loc>${baseUrl}/videos</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:content_loc>${videoUrl}</video:content_loc>
      <video:publication_date>${lastmod}</video:publication_date>
    </video:video>
  </url>`
  })

  // If no videos, return empty but valid sitemap
  if (urls === '') {
    urls = `
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
