'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

interface PDFFlipbookProps {
  pdfUrl: string
  title?: string
}

export default function PDFFlipbook({ pdfUrl, title }: PDFFlipbookProps) {
  const [pages, setPages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 })
  const bookRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateDimensions = useCallback(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const maxW = isFullscreen ? w * 0.45 : Math.min(w * 0.42, 550)
    const maxH = isFullscreen ? h * 0.85 : Math.min(h * 0.75, 750)
    const ratio = 0.707 // A4 ratio
    let pw = maxW
    let ph = pw / ratio
    if (ph > maxH) {
      ph = maxH
      pw = ph * ratio
    }
    setDimensions({ width: Math.round(pw), height: Math.round(ph) })
  }, [isFullscreen])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  useEffect(() => {
    loadPDF()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl])

  const loadPDF = async () => {
    try {
      setLoading(true)
      setError(null)
      const fullUrl = pdfUrl.startsWith('/') ? `${window.location.origin}${pdfUrl}` : pdfUrl
      const pdf = await pdfjsLib.getDocument(fullUrl).promise
      setTotalPages(pdf.numPages)

      const pageImages: string[] = []
      const scale = 2 // High quality rendering

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise
        pageImages.push(canvas.toDataURL('image/jpeg', 0.85))
      }

      setPages(pageImages)
      setLoading(false)
    } catch (err: any) {
      console.error('PDF load error:', err)
      setError('Failed to load PDF. Please try again.')
      setLoading(false)
    }
  }

  const onFlip = (e: any) => {
    setCurrentPage(e.data)
  }

  const goNext = () => bookRef.current?.pageFlip()?.flipNext()
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape' && isFullscreen) document.exitFullscreen()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFullscreen])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" data-testid="flipbook-loading">
        <div className="w-12 h-12 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading catalogue...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" data-testid="flipbook-error">
        <p className="text-red-400">{error}</p>
        <button onClick={loadPDF} className="px-4 py-2 bg-[#C9A962] text-gray-900 rounded-lg text-sm font-medium">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center ${isFullscreen ? 'bg-gray-950 h-screen' : ''}`}
      data-testid="flipbook-viewer"
    >
      {/* Flipbook */}
      <div className="relative">
        {pages.length > 0 && (
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={300}
            maxWidth={700}
            minHeight={400}
            maxHeight={900}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="shadow-2xl"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={600}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
            swipeDistance={30}
            clickEventForward={true}
            useMouseEvents={true}
          >
            {pages.map((src, i) => (
              <div key={i} className="bg-white" data-testid={`flipbook-page-${i}`}>
                <img
                  src={src}
                  alt={`Page ${i + 1}`}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6 select-none">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          data-testid="flipbook-prev"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm text-gray-400 min-w-[100px] text-center font-medium" data-testid="flipbook-page-indicator">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={goNext}
          disabled={currentPage >= totalPages - 1}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          data-testid="flipbook-next"
        >
          <ChevronRight size={20} />
        </button>

        <div className="w-px h-5 bg-gray-700 mx-2" />

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          data-testid="flipbook-fullscreen"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-[10px] text-gray-600 mt-3">
        Use arrow keys or click pages to navigate
      </p>
    </div>
  )
}
