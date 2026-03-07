/**
 * Admin API utility for authenticated requests
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Token management
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token')
  }
  return null
}

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token)
  }
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
  }
}

const getAuthHeaders = () => {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Admin Authentication
export async function adminLogin(username: string, password: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  const data = await response.json()
  setToken(data.access_token)
  return data
}

export async function verifyToken() {
  const response = await fetch(`${BACKEND_URL}/api/admin/verify`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) {
    removeToken()
    return false
  }
  return true
}

export function logout() {
  removeToken()
  window.location.href = '/admin/login'
}

// Dashboard Stats
export async function getAdminStats() {
  const response = await fetch(`${BACKEND_URL}/api/admin/stats`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json()
}

// Solutions Management
export async function createSolution(solution: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(solution)
  })
  if (!response.ok) throw new Error('Failed to create solution')
  return response.json()
}

export async function updateSolution(id: string, solution: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(solution)
  })
  if (!response.ok) throw new Error('Failed to update solution')
  return response.json()
}

export async function deleteSolution(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete solution')
  return response.json()
}

// Projects Management
export async function createProject(project: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project)
  })
  if (!response.ok) throw new Error('Failed to create project')
  return response.json()
}

export async function updateProject(id: string, project: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(project)
  })
  if (!response.ok) throw new Error('Failed to update project')
  return response.json()
}

export async function deleteProject(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete project')
  return response.json()
}

// Form Submissions
export async function getConsultationSubmissions() {
  const response = await fetch(`${BACKEND_URL}/api/admin/submissions/consultations`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch consultations')
  return response.json()
}

export async function getContactSubmissions() {
  const response = await fetch(`${BACKEND_URL}/api/admin/submissions/contacts`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch contacts')
  return response.json()
}

// Articles Management
export async function createArticle(article: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/articles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(article)
  })
  if (!response.ok) throw new Error('Failed to create article')
  return response.json()
}

export async function updateArticle(id: string, article: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/articles/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(article)
  })
  if (!response.ok) throw new Error('Failed to update article')
  return response.json()
}

export async function deleteArticle(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/articles/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete article')
  return response.json()
}

// Brands Management
export async function createBrand(brand: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/brands`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(brand)
  })
  if (!response.ok) throw new Error('Failed to create brand')
  return response.json()
}

export async function updateBrand(id: string, brand: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/brands/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(brand)
  })
  if (!response.ok) throw new Error('Failed to update brand')
  return response.json()
}

export async function deleteBrand(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/brands/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete brand')
  return response.json()
}

// Catalogues Management
export async function getCatalogues() {
  const response = await fetch(`${BACKEND_URL}/api/admin/catalogues`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch catalogues')
  return response.json()
}

export async function createCatalogue(data: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/catalogues`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create catalogue')
  return response.json()
}

export async function updateCatalogue(id: string, data: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/catalogues/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to update catalogue')
  return response.json()
}

export async function deleteCatalogue(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/catalogues/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete catalogue')
  return response.json()
}



// Products Management
export async function createProduct(product: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  })
  if (!response.ok) throw new Error('Failed to create product')
  return response.json()
}

export async function updateProduct(id: string, product: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  })
  if (!response.ok) throw new Error('Failed to update product')
  return response.json()
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete product')
  return response.json()
}

// Enhanced Solutions Management (Full CRUD with SEO & Priority)
export async function getSolutionsFull() {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch solutions')
  return response.json()
}

export async function getSolutionFull(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full/${id}`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch solution')
  return response.json()
}

export async function createSolutionFull(solution: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(solution)
  })
  if (!response.ok) throw new Error('Failed to create solution')
  return response.json()
}

export async function updateSolutionFull(id: string, solution: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(solution)
  })
  if (!response.ok) throw new Error('Failed to update solution')
  return response.json()
}

export async function deleteSolutionFull(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete solution')
  return response.json()
}

export async function reorderSolutions(items: {id: string, priority: number}[]) {
  const response = await fetch(`${BACKEND_URL}/api/admin/solutions-full/reorder`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  })
  if (!response.ok) throw new Error('Failed to reorder solutions')
  return response.json()
}

// Enhanced Services Management (Full CRUD with SEO & Priority)
export async function getServicesFull() {
  const response = await fetch(`${BACKEND_URL}/api/admin/services`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch services')
  return response.json()
}

export async function getServiceFull(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/services/${id}`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch service')
  return response.json()
}

export async function createServiceFull(service: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(service)
  })
  if (!response.ok) throw new Error('Failed to create service')
  return response.json()
}

export async function updateServiceFull(id: string, service: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(service)
  })
  if (!response.ok) throw new Error('Failed to update service')
  return response.json()
}

export async function deleteServiceFull(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete service')
  return response.json()
}

export async function reorderServices(items: {id: string, priority: number}[]) {
  const response = await fetch(`${BACKEND_URL}/api/admin/services/reorder`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items })
  })
  if (!response.ok) throw new Error('Failed to reorder services')
  return response.json()
}


// Catalog Product Management (individual products)
export async function createCatalogProduct(product: any) {
  const response = await fetch(`${BACKEND_URL}/api/catalog/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  })
  if (!response.ok) throw new Error('Failed to create catalog product')
  return response.json()
}

export async function updateCatalogProduct(id: string, product: any) {
  const response = await fetch(`${BACKEND_URL}/api/catalog/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  })
  if (!response.ok) throw new Error('Failed to update catalog product')
  return response.json()
}

export async function deleteCatalogProduct(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/catalog/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete catalog product')
  return response.json()
}


// Project Types Management
export async function getProjectTypes() {
  const response = await fetch(`${BACKEND_URL}/api/project-types`)
  if (!response.ok) return []
  return response.json()
}

export async function createProjectType(projectType: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-types`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(projectType)
  })
  if (!response.ok) throw new Error('Failed to create project type')
  return response.json()
}

export async function updateProjectType(id: string, projectType: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-types/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(projectType)
  })
  if (!response.ok) throw new Error('Failed to update project type')
  return response.json()
}

export async function deleteProjectType(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-types/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete project type')
  return response.json()
}

// Project Categories Management
export async function getProjectCategories() {
  const response = await fetch(`${BACKEND_URL}/api/project-categories`)
  if (!response.ok) return []
  return response.json()
}

export async function createProjectCategory(category: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(category)
  })
  if (!response.ok) throw new Error('Failed to create project category')
  return response.json()
}

export async function updateProjectCategory(id: string, category: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(category)
  })
  if (!response.ok) throw new Error('Failed to update project category')
  return response.json()
}

export async function deleteProjectCategory(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/project-categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete project category')
  return response.json()
}

// Team Members CRUD
export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  linkedin?: string
  email?: string
  order: number
  is_active: boolean
}

export async function getTeamMembers() {
  const response = await fetch(`${BACKEND_URL}/api/admin/team-members`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch team members')
  return response.json()
}

export async function createTeamMember(member: TeamMember) {
  const response = await fetch(`${BACKEND_URL}/api/admin/team-members`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(member)
  })
  if (!response.ok) throw new Error('Failed to create team member')
  return response.json()
}

export async function updateTeamMember(id: string, member: TeamMember) {
  const response = await fetch(`${BACKEND_URL}/api/admin/team-members/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(member)
  })
  if (!response.ok) throw new Error('Failed to update team member')
  return response.json()
}

export async function deleteTeamMember(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/team-members/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to delete team member')
  return response.json()
}

