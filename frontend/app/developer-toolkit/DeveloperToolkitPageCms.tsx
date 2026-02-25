'use client'

import { useCms } from '@/hooks/useCms'

export default function DeveloperToolkitPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_developer_toolkit', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
