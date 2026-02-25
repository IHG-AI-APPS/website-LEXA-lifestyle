'use client'

import { useCms } from '@/hooks/useCms'

export default function TermsOfServicePageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_terms_of_service', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
