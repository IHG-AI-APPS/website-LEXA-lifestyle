'use client'

import { useCms } from '@/hooks/useCms'

export default function BlogArticlePageCms({ children }: { children: React.ReactNode }) {
  const cms = useCms('page_blog_smart_home_guide_2025', null)
  // CMS data available via cms variable for dynamic content override
  return <>{children}</>
}
