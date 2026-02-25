'use client'

import { useCms } from '@/hooks/useCms'

export default function HowToInstallPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_guide_install_smart_home', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
