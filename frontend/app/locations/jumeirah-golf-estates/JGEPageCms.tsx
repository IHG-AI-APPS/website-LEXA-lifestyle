'use client'

import { useCms } from '@/hooks/useCms'

export default function JGEPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_jumeirah_golf', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
