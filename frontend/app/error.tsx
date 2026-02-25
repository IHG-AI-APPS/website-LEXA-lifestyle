'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RefreshCcw, Home } from 'lucide-react'

function isChunkLoadError(error: Error): boolean {
  const msg = error.message || ''
  return (
    msg.includes('Loading chunk') ||
    msg.includes('Cannot read properties of undefined') ||
    msg.includes("reading 'call'") ||
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('ChunkLoadError')
  )
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [retryCount, setRetryCount] = useState(0)
  const isChunkError = isChunkLoadError(error)

  // Auto-retry once for chunk load errors (stale cache)
  useEffect(() => {
    if (isChunkError && retryCount === 0) {
      setRetryCount(1)
      // Small delay then auto-reload to get fresh chunks
      const timer = setTimeout(() => {
        window.location.reload()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isChunkError, retryCount])

  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  // Show a minimal loading state during auto-retry
  if (isChunkError && retryCount <= 1) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-xl text-gray-600 mb-8">
          We&apos;re sorry for the inconvenience. An unexpected error occurred.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => {
              reset()
            }}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
            data-testid="error-try-again"
          >
            <RefreshCcw size={20} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            data-testid="error-go-home"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
        </div>

        <div className="mt-12 text-gray-600">
          <p className="mb-4">If this problem persists, please contact our support team:</p>
          <p className="font-semibold">+971 42 670 470</p>
          <p className="text-sm">Available Saturday-Thursday, 9AM-6PM GST</p>
        </div>
      </div>
    </div>
  )
}
