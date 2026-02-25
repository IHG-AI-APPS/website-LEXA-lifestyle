'use client'

import { useCms } from '@/hooks/useCms'

export default function EmiratesHillsPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_emirates_hills', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
