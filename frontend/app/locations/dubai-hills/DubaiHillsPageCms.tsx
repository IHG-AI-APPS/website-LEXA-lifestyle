'use client'

import { useCms } from '@/hooks/useCms'

export default function DubaiHillsPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_dubai_hills', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
