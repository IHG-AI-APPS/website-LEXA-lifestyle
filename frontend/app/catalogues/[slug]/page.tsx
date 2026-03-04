'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

const PDFFlipbook = dynamic(() => import('@/components/catalogues/PDFFlipbook'), { ssr: false })

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface Catalogue {
  id: string
  slug: string
  title: string
  description: string
  category: string
  pdf_url: string
  thumbnail: string
  page_count: number
}

export default function CatalogueViewerPage() {
  const params = useParams()
  const slug = params.slug as string
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/catalogues/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(data => { setCatalogue(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!catalogue) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
        <BookOpen size={48} className="text-gray-600" />
        <h1 className="text-2xl font-bold">Catalogue Not Found</h1>
        <Link href="/catalogues" className="text-[#C9A962] text-sm hover:underline">Back to Catalogues</Link>
      </div>
    )
  }

  const pdfUrl = catalogue.pdf_url.startsWith('/') ? `${BACKEND_URL}${catalogue.pdf_url}` : catalogue.pdf_url

  return (
    <div className="min-h-screen bg-gray-950 text-white" data-testid="catalogue-viewer-page">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/catalogues"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              data-testid="back-to-catalogues"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">All Catalogues</span>
            </Link>
            <div className="w-px h-5 bg-gray-700" />
            <div>
              <h1 className="text-sm font-semibold text-white truncate max-w-[300px] sm:max-w-none" data-testid="viewer-title">
                {catalogue.title}
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{catalogue.category.replace(/-/g, ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              <BookOpen size={14} className="inline mr-1" />
              View Only
            </span>
          </div>
        </div>
      </div>

      {/* Flipbook Area */}
      <div className="pt-20 pb-8 flex items-center justify-center min-h-screen">
        <PDFFlipbook pdfUrl={pdfUrl} title={catalogue.title} />
      </div>
    </div>
  )
}
