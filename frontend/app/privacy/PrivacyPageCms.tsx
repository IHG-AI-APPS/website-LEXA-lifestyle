'use client'

import { useCms } from '@/hooks/useCms'

export default function PrivacyPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_privacy', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
