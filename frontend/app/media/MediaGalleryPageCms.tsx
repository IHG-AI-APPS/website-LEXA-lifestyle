'use client'

import { useCms } from '@/hooks/useCms'

export default function MediaGalleryPageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_media', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
