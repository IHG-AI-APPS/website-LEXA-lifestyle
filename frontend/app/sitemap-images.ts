import { MetadataRoute } from 'next'

// Image Sitemap for Google Images search
export default async function imageSitemap(): Promise<MetadataRoute.Sitemap> {
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

  const entries: MetadataRoute.Sitemap = []

  // Project images
  projects.filter(p => p.featured_image && p.slug).forEach(project => {
    entries.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Brand logo pages
  brands.filter(b => b.logo && b.slug).forEach(brand => {
    entries.push({
      url: `${baseUrl}/brands/${brand.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Solution images
  solutions.filter(s => s.image && s.slug).forEach(solution => {
    entries.push({
      url: `${baseUrl}/solutions/${solution.slug}`,
      lastModified: solution.updated_at ? new Date(solution.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  })

  return entries
}
