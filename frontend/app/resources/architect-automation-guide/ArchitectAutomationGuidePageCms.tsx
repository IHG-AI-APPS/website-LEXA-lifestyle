'use client'

import { useCms } from '@/hooks/useCms'

export default function ArchitectAutomationGuidePageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_resource_architect_guide', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
