/**
 * Centralized API utility for LEXA Lifestyle
 * All backend API calls should go through this file
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

// ============= TYPES =============

export interface Solution {
  id: string
  slug: string
  title: string
  category: string
  description: string
  long_description?: string
  meta_description?: string
  image: string
  features: string[]
  brands: string[]
  tags: string[]
  feature_cards?: Array<{
    icon?: string
    title: string
    description: string
    benefits?: string[]
  }>
  benefits?: Array<{
    title: string
    description: string
  }>
  use_cases?: Array<{
    title: string
    description: string
  }>
  technical_specs?: Record<string, string>
  faqs?: Array<{
    question: string
    answer: string
  }>
  additional_sections?: Array<{
    title: string
    content: string
  }>
  gallery_images?: string[]
  related_products?: string[]
  // Mega menu fields
  featured?: boolean
  popular?: boolean
  badge?: string
  mega_menu_category?: string
  mega_menu_order?: number
}

export interface Project {
  id: string
  slug: string
  title: string
  location: string
  type: string
  year: string
  image: string
  images?: string[]
  systems: string[]
  description?: string
  features?: string[]
  category?: string
  video_url?: string
  results?: string[]
  // Case Study fields
  challenge?: string
  solution_details?: string
  outcome?: string
  client_testimonial?: string
  client_name?: string
  client_role?: string
  technical_specs?: string[]
  timeline?: string
  budget_range?: string
  team_size?: number
  gallery?: string[]
  size?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  testimonial: string
  rating: number
  image?: string
}

export interface SiteSettings {
  key: string
  hero_title: string
  hero_subtitle: string
  brands_count: number
  years_experience: number
  projects_count: number
  experience_center_size: number
}

export interface ConsultationData {
  name: string
  email: string
  phone: string
  message?: string
  persona?: string
}

export interface ContactData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface CostCalculatorInput {
  property_type: string
  square_footage: number
  systems: string[]
  budget_range?: string
}

export interface CostCalculatorResult {
  estimated_cost_min: number
  estimated_cost_max: number
  timeline_weeks: number
  recommended_solutions: string[]
}

export interface Article {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  image: string
  author: string
  read_time: number
  published_date: string
  tags: string[]
}

export interface Brand {
  id: string
  slug: string
  name: string
  logo: string
  description: string
  website?: string
  categories?: string[]
  featured?: boolean
}

// ============= HELPER FUNCTIONS =============

/**
 * Ensures array data is always returned as an array with defaults
 */
function ensureArray<T>(data: unknown, defaults?: Partial<T>): T[] {
  if (!Array.isArray(data)) return []
  return data.map((item: any) => ({ ...defaults, ...item }))
}

// ============= API FUNCTIONS =============

/**
 * Get all solutions
 */
export async function getSolutions(): Promise<Solution[]> {
  const response = await fetch(`${BACKEND_URL}/api/solutions`)
  if (!response.ok) {
    throw new Error('Failed to fetch solutions')
  }
  const data = await response.json()
  return ensureArray<Solution>(data, {
    features: [],
    brands: [],
    tags: [],
    feature_cards: [],
    faqs: []
  })
}

/**
 * Get a single solution by slug
 */
export async function getSolution(slug: string): Promise<Solution> {
  const response = await fetch(`${BACKEND_URL}/api/solutions/${slug}`)
  if (!response.ok) {
    throw new Error('Solution not found')
  }
  return response.json()
}

/**
 * Get all projects (optionally filtered by type)
 */
export async function getProjects(type?: string, limit?: number): Promise<Project[]> {
  const params = new URLSearchParams()
  if (type) params.append('type', type)
  if (limit) params.append('limit', limit.toString())
  
  const url = `${BACKEND_URL}/api/projects${params.toString() ? `?${params}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  const data = await response.json()
  return ensureArray<Project>(data, {
    systems: [],
    images: [],
    gallery: [],
    technical_specs: []
  })
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId: string): Promise<Project> {
  const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}`)
  if (!response.ok) {
    throw new Error('Project not found')
  }
  return response.json()
}

/**
 * Get all brands
 */
export async function getBrands(): Promise<Brand[]> {
  const response = await fetch(`${BACKEND_URL}/api/brands`)
  if (!response.ok) {
    throw new Error('Failed to fetch brands')
  }
  const data = await response.json()
  return ensureArray<Brand>(data, {
    categories: []
  })
}

/**
 * Get a single brand by slug
 */
export async function getBrand(slug: string): Promise<Brand> {
  const response = await fetch(`${BACKEND_URL}/api/brands/${slug}`)
  if (!response.ok) {
    throw new Error('Brand not found')
  }
  const data = await response.json()
  return {
    ...data,
    categories: data.categories || []
  }
}

/**
 * Get testimonials
 */
export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const params = new URLSearchParams()
  if (limit) params.append('limit', limit.toString())
  
  const url = `${BACKEND_URL}/api/testimonials${params.toString() ? `?${params}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials')
  }
  const data = await response.json()
  return ensureArray<Testimonial>(data, {})
}

/**
 * Get site settings
 */
export async function getSettings(): Promise<SiteSettings> {
  const response = await fetch(`${BACKEND_URL}/api/settings`)
  if (!response.ok) {
    throw new Error('Failed to fetch settings')
  }
  return response.json()
}

/**
 * Submit consultation booking
 */
export async function submitConsultation(data: ConsultationData): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/consultation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit consultation')
  }
}

/**
 * Submit contact message
 */
export async function submitContact(data: ContactData): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit contact message')
  }
}

/**
 * Calculate cost estimate
 */
export async function calculateCost(input: CostCalculatorInput): Promise<CostCalculatorResult> {
  const response = await fetch(`${BACKEND_URL}/api/calculator/cost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    throw new Error('Failed to calculate cost')
  }
  return response.json()
}

/**
 * Get all articles (optionally filtered by category)
 */
export async function getArticles(category?: string, limit?: number): Promise<Article[]> {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (limit) params.append('limit', limit.toString())
  
  const url = `${BACKEND_URL}/api/articles${params.toString() ? `?${params}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }
  const data = await response.json()
  return ensureArray<Article>(data, {
    tags: []
  })
}

/**
 * Get a single article by slug
 */
export async function getArticle(slug: string): Promise<Article> {
  const response = await fetch(`${BACKEND_URL}/api/articles/${slug}`)
  if (!response.ok) {
    throw new Error('Article not found')
  }
  return response.json()
}

/**
 * Get list of article categories
 */
export async function getArticleCategories(): Promise<string[]> {
  const response = await fetch(`${BACKEND_URL}/api/articles/categories/list`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  const data = await response.json()
  return data.categories
}

// ============= PARTNER FUNNELS =============

export interface DeveloperToolkitRequest {
  name: string
  email: string
  phone: string
  company: string
  project_scale: string
  units_count?: number
  resource_type: string
  timeline: string
  message?: string
}

export interface ArchitectResourceRequest {
  name: string
  email: string
  phone: string
  company?: string
  resource_type: string
  message?: string
}

/**
 * Submit developer toolkit request
 */
export async function submitDeveloperToolkitRequest(data: DeveloperToolkitRequest): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/developers/toolkit-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit developer toolkit request')
  }
}

/**
 * Submit architect resource request
 */
export async function submitArchitectResourceRequest(data: ArchitectResourceRequest): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/architects/resource-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to submit architect resource request')
  }
}
