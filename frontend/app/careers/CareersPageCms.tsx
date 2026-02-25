'use client'

import { useCms } from '@/hooks/useCms'

export default function CareersPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_careers', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
