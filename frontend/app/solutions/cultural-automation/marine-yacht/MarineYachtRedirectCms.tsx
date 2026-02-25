'use client'

import { useCms } from '@/hooks/useCms'

export default function MarineYachtRedirectCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_solutions_cultural_marine_yacht', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
