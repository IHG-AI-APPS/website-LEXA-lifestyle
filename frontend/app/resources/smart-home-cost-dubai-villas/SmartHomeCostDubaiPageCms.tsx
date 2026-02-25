'use client'

import { useCms } from '@/hooks/useCms'

export default function SmartHomeCostDubaiPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_resource_smart_home_cost', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
