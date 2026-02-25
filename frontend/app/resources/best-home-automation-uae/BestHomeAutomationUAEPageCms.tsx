'use client'

import { useCms } from '@/hooks/useCms'

export default function BestHomeAutomationUAEPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_resource_best_automation_uae', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
