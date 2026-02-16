'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SchemaMarkupProps {
  type?: 'organization' | 'faq' | 'howto' | 'breadcrumb'
  path?: string
}

export default function SchemaMarkup({ type = 'organization', path = '/' }: SchemaMarkupProps) {
  const [schema, setSchema] = useState<object | null>(null)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        let endpoint = ''
        switch (type) {
          case 'organization':
            endpoint = '/api/seo/schema/organization'
            break
          case 'faq':
            endpoint = '/api/seo/schema/faq'
            break
          case 'howto':
            endpoint = '/api/seo/schema/howto'
            break
          case 'breadcrumb':
            endpoint = `/api/seo/schema/breadcrumb?path=${encodeURIComponent(path)}`
            break
        }

        const response = await fetch(`${API_URL}${endpoint}`)
        if (response.ok) {
          const data = await response.json()
          setSchema(data)
        }
      } catch (error) {
        console.error('Failed to fetch schema:', error)
      }
    }

    fetchSchema()
  }, [type, path])

  if (!schema) return null

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// Composite schema component for pages
export function PageSchemas({ path }: { path: string }) {
  return (
    <>
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="breadcrumb" path={path} />
    </>
  )
}

// FAQ schema for pages with FAQs
export function FAQSchema() {
  return <SchemaMarkup type="faq" />
}

// HowTo schema for process/guide pages
export function HowToSchema() {
  return <SchemaMarkup type="howto" />
}
