export interface ProjectType {
  id: string
  label: string
  icon: any
  description: string
  subCategories: { id: string; label: string }[]
}

export interface SolutionLevel {
  id: string
  label: string
  price: number
}

export interface Solution {
  id: string
  label: string
  basePrice: number
  levels: SolutionLevel[]
}

export interface CalculatorState {
  projectType: string
  subCategory: string
  totalArea: string
  numRooms: string
  numFloors: string
  constructionStage: string
  selectedSolutions: Record<string, string>
  controlPlatform: string
  securityBrand: string
  lightingSystem: string
  timeline: string
  budgetRange: string
  emirate: string
  city: string
  propertyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  contactCompany: string
  contactRole: string
  additionalFeatures: string[]
}

export interface CostBreakdownItem {
  name: string
  cost: number
}
