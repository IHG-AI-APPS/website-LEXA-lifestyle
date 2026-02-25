'use client'

import { useCms } from '@/hooks/useCms'

export default function DowntownPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_downtown_dubai', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
