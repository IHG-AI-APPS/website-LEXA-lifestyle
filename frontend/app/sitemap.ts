import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lexalifestyle.com'
  
  // Fetch solutions from database dynamically
  let solutions: any[] = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const solutionsResponse = await fetch(`${backendUrl}/api/solutions`, {
      cache: 'no-store'
    })
    if (solutionsResponse.ok) {
      const solutionsData = await solutionsResponse.json()
      solutions = Array.isArray(solutionsData) ? solutionsData : (solutionsData.solutions || [])
    }
  } catch (error) {
    console.error('Error fetching solutions for sitemap:', error)
  }
  
  // Fetch services from database dynamically
  let services: any[] = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const servicesResponse = await fetch(`${backendUrl}/api/services`, {
      cache: 'no-store'
    })
    if (servicesResponse.ok) {
      const servicesData = await servicesResponse.json()
      services = Array.isArray(servicesData) ? servicesData : (servicesData.services || [])
    }
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }
  
  // Fetch Arabic pages from API
  let arabicPages: any[] = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const response = await fetch(`${backendUrl}/api/admin/arabic-pages/public/list/all`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      arabicPages = data.data || []
    }
  } catch (error) {
    console.error('Error fetching Arabic pages for sitemap:', error)
  }
  
  // Fetch Geo Pages from API (dynamic UAE location pages)
  let geoPages: any[] = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const response = await fetch(`${backendUrl}/api/geo-pages`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      geoPages = data.geo_pages || []
    }
  } catch (error) {
    console.error('Error fetching geo pages for sitemap:', error)
  }
  
  // Fetch Projects from API (dynamic)
  let projects: any[] = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
    const response = await fetch(`${backendUrl}/api/projects`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      projects = Array.isArray(data) ? data : (data.projects || [])
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
    '/solutions',
    '/projects',
    '/brands',
    '/experience-centre',
    '/calculator',
    '/why-lexa',
    '/blog',
    '/careers',
    '/terms',
    '/privacy',
    '/warranty',
    '/glossary',
    '/case-studies',
    '/home-intelligence-builder',
    '/partner-with-us'
  ]

  // B2B and SEO Service pages
  const b2bPages = [
    { path: '/partner-with-us', priority: 0.85 },
    { path: '/vendor-supplier', priority: 0.85 },
    { path: '/work-with-us', priority: 0.80 },
    { path: '/services/high-end-audio', priority: 0.80 },
    { path: '/services/home-theater', priority: 0.80 },
    { path: '/services/home-cinema', priority: 0.80 },
    { path: '/services/luxury-villa-automation', priority: 0.80 },
    { path: '/services/multi-room-audio', priority: 0.80 },
    { path: '/services/outdoor-audio', priority: 0.75 },
    { path: '/services/smart-lighting', priority: 0.75 }
  ]

  // Intelligence Builder pages
  const intelligencePages = [
    { path: '/home-intelligence-builder', priority: 0.95 },
    { path: '/home-intelligence-builder/features', priority: 0.90 },
    { path: '/home-intelligence-builder/score', priority: 0.85 },
    { path: '/home-intelligence-builder/systems', priority: 0.85 },
    { path: '/home-intelligence-builder/report', priority: 0.85 }
  ]

  // Location pages
  const locations = [
    'emirates-hills-smart-home',
    'downtown-dubai-smart-home',
    'palm-jumeirah-smart-home'
  ]

  // Personas
  const personas = [
    'homeowner',
    'architect',
    'developer',
    'commercial'
  ]

  // Partner pages
  const partnerPages = [
    '/partners/developers',
    '/partners/architects'
  ]

  // UAE Emirates pages
  const uaeEmirates = [
    { slug: 'dubai', priority: 0.95 },
    { slug: 'abu-dhabi', priority: 0.90 },
    { slug: 'sharjah', priority: 0.85 },
    { slug: 'ajman', priority: 0.80 }
  ]

  // SEO content pages
  const guides = [
    'how-to-install-smart-home-dubai'
  ]

  const blogPosts = [
    'smart-home-guide-dubai-2025'
  ]

  return [
    ...staticPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1.0 : page === '/why-lexa' ? 0.9 : page === '/home-intelligence-builder' ? 0.95 : page === '/partner-with-us' ? 0.85 : 0.8
    })),
    ...b2bPages.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority
    })),
    ...intelligencePages.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority
    })),
    ...partnerPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })),
    ...locations.map(slug => ({
      url: `${baseUrl}/locations/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    })),
    ...solutions.map(solution => ({
      url: `${baseUrl}/solutions/${solution.slug}`,
      lastModified: solution.updated_at ? new Date(solution.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: solution.featured ? 0.85 : 0.75
    })),
    ...services.map(service => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: service.featured ? 0.85 : 0.75
    })),
    ...personas.map(slug => ({
      url: `${baseUrl}/persona/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })),
    ...uaeEmirates.map(({ slug, priority }) => ({
      url: `${baseUrl}/uae/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority
    })),
    ...guides.map(slug => ({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85
    })),
    ...blogPosts.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    })),
    // Arabic SEO pages (dynamic from database)
    ...arabicPages.map(page => ({
      url: `${baseUrl}/ar-seo/${page.slug}`,
      lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
      changeFrequency: page.page_type === 'blog' ? 'monthly' as const : 'weekly' as const,
      priority: page.priority || 0.8,
    })),
    // Geo-targeted UAE pages (dynamic from database)
    ...geoPages.filter(page => page.active).map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: page.region === 'dubai' || page.region === 'abu-dhabi' ? 0.85 : 0.80,
    })),
    // Projects (dynamic from database)
    ...projects.filter(p => p.slug).map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.80 : 0.70,
    }))
  ]
}
