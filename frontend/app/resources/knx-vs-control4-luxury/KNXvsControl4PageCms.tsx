'use client'

import { useCms } from '@/hooks/useCms'

export default function KNXvsControl4PageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_resource_knx_vs_control4', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
