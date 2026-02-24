'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              <Home size={20} />
              Go to Homepage
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              <Search size={20} />
              Browse Articles
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <Link href="/services" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Our Services</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Smart home automation services</div>
              </Link>
              <Link href="/solutions" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Solutions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Integrated smart living solutions</div>
              </Link>
              <Link href="/case-studies" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Case Studies</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Real project examples</div>
              </Link>
              <Link href="/why-lexa" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Why Choose LEXA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">See what makes us different</div>
              </Link>
              <Link href="/glossary" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Glossary</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Smart home terminology</div>
              </Link>
              <Link href="/contact" className="p-4 border border-gray-200 hover:border-gray-900 transition-colors group">
                <div className="font-semibold mb-1 group-hover:text-gray-600 dark:text-gray-400 dark:text-gray-400">Contact Us</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Get in touch with our team</div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}