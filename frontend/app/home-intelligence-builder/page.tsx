'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeIntelligenceBuilderRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to project builder
    router.replace('/project-builder/start')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="text-center">
        <div className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Redirecting to Smart Project Builder...</p>
      </div>
    </div>
  )
}
