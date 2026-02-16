'use client'

import { useEffect } from 'react'

interface SEOProps {
  schema: any
}

export default function SEOSchema({ schema }: SEOProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      try {
        document.head.removeChild(script)
      } catch (e) {
        // Script already removed
      }
    }
  }, [schema])

  return null
}
