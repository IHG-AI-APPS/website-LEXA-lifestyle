'use client'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-1/4 mb-6"></div>
          <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-52 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-52 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div className="h-52 bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}