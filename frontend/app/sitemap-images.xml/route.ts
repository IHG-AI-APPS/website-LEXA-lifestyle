import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://lexalifestyle.com'
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
  
  // Fetch projects with images
  let projects: any[] = []
  try {
    const response = await fetch(`${backendUrl}/api/projects`, { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      projects = Array.isArray(data) ? data : (data.projects || [])
    }
  } catch (error) {
    console.error('Error fetching projects for image sitemap:', error)
  }

  // Fetch brands with logos
  let brands: any[] = []
  try {
    const response = await fetch(`${backendUrl}/api/brands`, { cache: 'no-store' })
    if (response.ok) {
      brands = await response.json()
    }
  } catch (error) {
    console.error('Error fetching brands for image sitemap:', error)
  }

  // Fetch solutions with images
  let solutions: any[] = []
  try {
    const response = await fetch(`${backendUrl}/api/solutions`, { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      solutions = Array.isArray(data) ? data : (data.solutions || [])
    }
  } catch (error) {
    console.error('Error fetching solutions for image sitemap:', error)
  }

  // Build image sitemap XML
  let urls = ''
  
  // Project images
  projects.filter(p => p.featured_image && p.slug).forEach(project => {
    const lastmod = project.updated_at ? new Date(project.updated_at).toISOString() : new Date().toISOString()
    urls += `
  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <image:image>
      <image:loc>${project.featured_image}</image:loc>
      <image:title>${project.title || project.name || ''}</image:title>
    </image:image>
  </url>`
  })

  // Brand logos
  brands.filter(b => b.logo && b.slug).forEach(brand => {
    urls += `
  <url>
    <loc>${baseUrl}/brands/${brand.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <image:image>
      <image:loc>${brand.logo}</image:loc>
      <image:title>${brand.name || ''}</image:title>
    </image:image>
  </url>`
  })

  // Solution images
  solutions.filter(s => s.image && s.slug).forEach(solution => {
    const lastmod = solution.updated_at ? new Date(solution.updated_at).toISOString() : new Date().toISOString()
    urls += `
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <image:image>
      <image:loc>${solution.image}</image:loc>
      <image:title>${solution.title || solution.name || ''}</image:title>
    </image:image>
  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
