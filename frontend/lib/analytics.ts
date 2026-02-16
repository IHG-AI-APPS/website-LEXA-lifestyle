/**
 * Analytics and Tracking Configuration
 * Add your analytics provider (Google Analytics, Plausible, etc.)
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'AED',
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit_form',
    category: 'engagement',
    label: formName,
  })
}

// Track calculator usage
export const trackCalculatorUse = (calculatorType: string, result: any) => {
  event({
    action: 'use_calculator',
    category: 'tools',
    label: calculatorType,
    value: result.totalCost || 0,
  })
}

// Track package builder
export const trackPackageBuilder = (packageDetails: any) => {
  event({
    action: 'build_package',
    category: 'tools',
    label: packageDetails.packageType,
    value: packageDetails.estimatedCost || 0,
  })
}

// Declare gtag types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
