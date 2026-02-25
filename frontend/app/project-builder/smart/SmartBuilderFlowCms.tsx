'use client'

import { useCms } from '@/hooks/useCms'

export default function SmartBuilderFlowCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_project_builder_smart', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
