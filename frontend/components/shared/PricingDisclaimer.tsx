'use client'

import { Info } from 'lucide-react'

interface PricingDisclaimerProps {
  variant?: 'light' | 'dark' | 'minimal'
  className?: string
}

export default function PricingDisclaimer({ variant = 'light', className = '' }: PricingDisclaimerProps) {
  const baseStyles = {
    light: 'bg-gray-100 border-t border-gray-200 text-gray-500',
    dark: 'bg-gray-900/50 border-t border-white/10 text-gray-400',
    minimal: 'bg-transparent text-gray-400'
  }

  return (
    <div className={`py-6 ${baseStyles[variant]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-start gap-2 justify-center">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60" />
          <p className="text-xs text-center max-w-4xl">
            <span className="font-medium">Disclaimer:</span> All prices, estimates, and performance metrics shown are indicative and based on typical project specifications in the UAE market. 
            Actual costs may vary depending on property size, system complexity, brand selection, and installation requirements. 
            Savings and ROI projections are estimates based on industry benchmarks and may differ based on usage patterns and local conditions. 
            Contact us for a personalized quote tailored to your specific requirements.
          </p>
        </div>
      </div>
    </div>
  )
}

export function CompactDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-gray-500 text-center ${className}`}>
      * Prices are indicative. Actual costs vary based on specifications. Contact us for accurate quotes.
    </p>
  )
}
