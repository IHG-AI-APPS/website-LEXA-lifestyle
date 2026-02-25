'use client'

import { useCms } from '@/hooks/useCms'

export default function asyncCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_ar_seo_blog_detail', null)
  return <>{children}</>
}
