/**
 * API utilities for calculator
 */

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

export interface CalculatorSubmission {
  project_type: string
  sub_category: string
  total_area: number
  num_rooms: number
  num_floors: number
  construction_stage: string
  selected_solutions: Record<string, string>
  control_platform?: string
  security_brand?: string
  lighting_system?: string
  timeline: string
  budget_range: string
  emirate: string
  city?: string
  property_name?: string
  contact_name: string
  contact_email: string
  contact_phone: string
  contact_company?: string
  contact_role?: string
  additional_features: string[]
  notes?: string
}

export interface CalculatorResponse {
  id: string
  total_cost: number
  estimated_timeline_weeks: number
  cost_breakdown: Array<{
    name: string
    cost: number
  }>
  status: string
  timestamp: string
}

export async function submitCalculator(
  data: CalculatorSubmission
): Promise<CalculatorResponse> {
  const response = await fetch(`${API_URL}/api/calculator/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to submit calculator' }))
    throw new Error(error.detail || 'Failed to submit calculator')
  }

  return response.json()
}

export async function getCalculatorQuote(
  data: CalculatorSubmission
): Promise<{
  total_cost: number
  estimated_timeline_weeks: number
  cost_breakdown: Array<{
    name: string
    cost: number
  }>
  size_multiplier: number
  retrofit_premium: number
}> {
  const response = await fetch(`${API_URL}/api/calculator/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to get quote' }))
    throw new Error(error.detail || 'Failed to get quote')
  }

  return response.json()
}
