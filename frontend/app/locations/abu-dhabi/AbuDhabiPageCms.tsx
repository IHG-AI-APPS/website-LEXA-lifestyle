'use client'

import { useCms } from '@/hooks/useCms'

export default function AbuDhabiPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_abu_dhabi', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
