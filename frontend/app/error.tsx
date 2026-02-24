'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
          <h2 className="text-3xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re sorry for the inconvenience. An unexpected error occurred.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              <RefreshCcw size={20} />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              <Home size={20} />
              Go to Homepage
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded text-left">
              <h3 className="font-semibold text-red-900 mb-2">Error Details (Development Only)</h3>
              <pre className="text-sm text-red-700 overflow-auto">{error.message}</pre>
            </div>
          )}

          <div className="mt-12 text-gray-600 dark:text-gray-400">
            <p className="mb-4">If this problem persists, please contact our support team:</p>
            <p className="font-semibold">+971 42 670 470</p>
            <p className="text-sm">Available Saturday-Thursday, 9AM-6PM GST</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}