'use client'

import { useCms } from '@/hooks/useCms'

export default function TermsPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_terms', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
