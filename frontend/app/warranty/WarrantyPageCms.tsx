'use client'

import { useCms } from '@/hooks/useCms'

export default function WarrantyPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_warranty', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
