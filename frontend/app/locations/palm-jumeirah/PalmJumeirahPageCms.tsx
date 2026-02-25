'use client'

import { useCms } from '@/hooks/useCms'

export default function PalmJumeirahPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_locations_palm_jumeirah', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
