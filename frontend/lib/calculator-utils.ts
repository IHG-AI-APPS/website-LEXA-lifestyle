export function calculateEstimate(
  projectType: string,
  selectedSolutions: Record<string, string>,
  additionalFeatures: string[],
  squareFootage: string,
  constructionStage: string,
  currentSolutions: Array<{ id: string; label: string; basePrice: number; levels: Array<{ id: string; label: string; price: number }> }>,
  ADDITIONAL_FEATURES: Array<{ id: string; label: string; price: number }>
) {
  let total = 0
  const items: Array<{ name: string; cost: number }> = []
  
  // Size multiplier
  const size = parseInt(squareFootage) || 0
  const sizeMultiplier = size > 10000 ? 1.4 : size > 5000 ? 1.3 : size > 3000 ? 1.15 : 1
  
  // Solutions cost
  Object.entries(selectedSolutions).forEach(([solutionId, level]) => {
    const solution = currentSolutions.find(s => s.id === solutionId)
    if (solution && level) {
      const levelData = solution.levels.find(l => l.id === level)
      const systemCost = (levelData?.price || solution.basePrice) * sizeMultiplier
      total += systemCost
      items.push({
        name: `${solution.label} (${levelData?.label || level})`,
        cost: systemCost
      })
    }
  })
  
  // Additional features
  additionalFeatures.forEach(featureId => {
    const feature = ADDITIONAL_FEATURES.find(f => f.id === featureId)
    if (feature) {
      total += feature.price
      items.push({
        name: feature.label,
        cost: feature.price
      })
    }
  })
  
  // Construction stage adjustment
  if (constructionStage === 'retrofit') {
    const retrofitCost = total * 0.25
    total += retrofitCost
    items.push({
      name: 'Retrofit Installation Premium',
      cost: retrofitCost
    })
  }
  
  // Timeline estimation
  const systemCount = Object.keys(selectedSolutions).length
  const baseTimeline = projectType === 'residential' ? 12 : projectType === 'commercial-office' ? 16 : 20
  const timelineCalc = baseTimeline + (systemCount * 2) + (size > 10000 ? 8 : size > 5000 ? 4 : 0)
  
  return {
    totalCost: total,
    breakdown: items,
    estimatedTimeline: timelineCalc
  }
}

export function validateStep(
  step: number,
  data: {
    projectType: string | null
    projectSubCategory: string | null
    selectedSolutions: Record<string, string>
    squareFootage: string
    country: string
    city: string
    contactName: string
    contactEmail: string
    contactPhone: string
  }
): boolean {
  switch (step) {
    case 1:
      return !!(data.projectType && data.projectSubCategory)
    case 2:
      return Object.keys(data.selectedSolutions).length > 0
    case 3:
      return true // Additional features are optional
    case 4:
      return !!(data.squareFootage && parseInt(data.squareFootage) > 0)
    case 5:
      return true // Construction stage auto-selected
    case 6:
      return true // Preferences optional
    case 7:
      return true // Floor plan optional
    case 8:
      return !!(data.country && data.city)
    case 9:
      return !!(data.contactName && data.contactEmail && data.contactPhone)
    default:
      return false
  }
}
