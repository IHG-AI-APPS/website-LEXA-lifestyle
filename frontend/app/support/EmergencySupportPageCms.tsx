'use client'

import { useCms } from '@/hooks/useCms'

export default function EmergencySupportPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_support', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
