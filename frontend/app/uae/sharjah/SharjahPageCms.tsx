'use client'

import { useCms } from '@/hooks/useCms'

export default function SharjahPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_uae_sharjah', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
