'use client'

import { useCms } from '@/hooks/useCms'

export default function PrivacyPolicyPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_privacy_policy', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
