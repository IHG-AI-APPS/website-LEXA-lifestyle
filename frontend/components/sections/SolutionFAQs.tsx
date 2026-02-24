'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface FAQ {
  question: string
  answer: string
}

interface SolutionFAQsProps {
  solutionSlug: string
  title?: string
}

export default function SolutionFAQs({ solutionSlug, title = "Frequently Asked Questions" }: SolutionFAQsProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFAQs = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/solutions/${solutionSlug}`)
      const data = await response.json()
      
      if (data.faqs && data.faqs.length > 0) {
        setFaqs(data.faqs)
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to load FAQs:', error)
      setLoading(false)
    }
  }, [solutionSlug])

  useEffect(() => {
    fetchFAQs()
  }, [fetchFAQs])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#E8DCC8] animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) {
    return null // Don't render if no FAQs
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-heading font-semibold mb-4">{title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about this solution
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
