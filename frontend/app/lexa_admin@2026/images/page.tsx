'use client'

import { useEffect, useState, useMemo } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import { Search, Copy, Trash2, Filter, Grid, List, HardDrive, Image as ImageIcon, FileText, Film, Upload, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const API = `${BACKEND_URL}/api`

interface FileItem {
  filename: string
  category: string
  url: string
  size: number
  modified: number
  content_type: string
  extension: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function isImage(ct: string) {
  return ct.startsWith('image/')
}

export default function ImageManagement() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [totalSize, setTotalSize] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 48

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const resp = await fetch(`${API}/uploads/management/list`)
      const data = await resp.json()
      setFiles(data.images || [])
      setCategories(data.categories || [])
      setTotalSize(data.total_size || 0)
    } catch {
      toast.error('Failed to load files')
    }
    setLoading(false)
  }

  const filtered = useMemo(() => {
    let result = files
    if (selectedCategory) result = result.filter(f => f.category === selectedCategory)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(f => f.filename.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
    }
    return result
  }, [files, selectedCategory, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageFiles = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Delete ${file.filename}?`)) return
    try {
      const resp = await fetch(`${API}/uploads/files/${file.category}/${file.filename}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('File deleted')
        setFiles(prev => prev.filter(f => f.url !== file.url))
        if (selectedFile?.url === file.url) setSelectedFile(null)
      } else {
        toast.error('Failed to delete file')
      }
    } catch {
      toast.error('Failed to delete file')
    }
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    files.forEach(f => { counts[f.category] = (counts[f.category] || 0) + 1 })
    return counts
  }, [files])

  const imageCount = files.filter(f => isImage(f.content_type)).length
  const docCount = files.filter(f => f.content_type === 'application/pdf').length
  const videoCount = files.filter(f => f.content_type.startsWith('video/')).length

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto" data-testid="image-management-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold" data-testid="image-mgmt-title">File Manager</h1>
          <p className="text-sm text-gray-500 mt-1">{files.length} files &middot; {formatSize(totalSize)} total</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-blue-400" />
          </div>
          <div><div className="text-xs text-gray-500">Total Size</div><div className="text-sm font-semibold">{formatSize(totalSize)}</div></div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-500/10 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-green-400" />
          </div>
          <div><div className="text-xs text-gray-500">Images</div><div className="text-sm font-semibold">{imageCount}</div></div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-orange-400" />
          </div>
          <div><div className="text-xs text-gray-500">Documents</div><div className="text-sm font-semibold">{docCount}</div></div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Film className="w-4 h-4 text-purple-400" />
          </div>
          <div><div className="text-xs text-gray-500">Videos</div><div className="text-sm font-semibold">{videoCount}</div></div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 bg-zinc-900 border-zinc-800"
            data-testid="file-search-input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "primary" : "outline"}
            size="sm"
            onClick={() => { setSelectedCategory(null); setPage(1) }}
            data-testid="filter-all"
          >
            All ({files.length})
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "primary" : "outline"}
              size="sm"
              onClick={() => { setSelectedCategory(cat); setPage(1) }}
              data-testid={`filter-${cat}`}
            >
              {cat} ({categoryCounts[cat] || 0})
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button variant={viewMode === 'grid' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('grid')} data-testid="view-grid">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('list')} data-testid="view-list">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results info */}
      <div className="text-xs text-gray-500 mb-3">
        Showing {((page - 1) * PAGE_SIZE) + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} files
        {search && <span> matching &ldquo;{search}&rdquo;</span>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-500">Loading files...</div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2" data-testid="files-grid">
              {pageFiles.map((file) => (
                <button
                  key={file.url}
                  onClick={() => setSelectedFile(file)}
                  data-testid={`file-card-${file.filename}`}
                  className={`group relative bg-zinc-900 border rounded-lg overflow-hidden text-left transition-all hover:border-[#C9A962]/50 ${
                    selectedFile?.url === file.url ? 'border-[#C9A962] ring-1 ring-[#C9A962]/30' : 'border-zinc-800'
                  }`}
                >
                  <div className="aspect-square relative bg-zinc-950 flex items-center justify-center">
                    {isImage(file.content_type) ? (
                      <SafeImage src={file.url} alt={file.filename} fill className="object-contain p-1" />
                    ) : (
                      <FileText className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="p-1.5">
                    <p className="text-[10px] text-gray-400 truncate">{file.filename}</p>
                    <p className="text-[9px] text-gray-600">{formatSize(file.size)}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-1" data-testid="files-list">
              {pageFiles.map((file) => (
                <button
                  key={file.url}
                  onClick={() => setSelectedFile(file)}
                  data-testid={`file-row-${file.filename}`}
                  className={`w-full flex items-center gap-3 px-3 py-2 bg-zinc-900 border rounded-lg text-left transition-all hover:border-[#C9A962]/50 ${
                    selectedFile?.url === file.url ? 'border-[#C9A962]' : 'border-zinc-800'
                  }`}
                >
                  <div className="w-10 h-10 relative flex-shrink-0 bg-zinc-950 rounded overflow-hidden flex items-center justify-center">
                    {isImage(file.content_type) ? (
                      <SafeImage src={file.url} alt={file.filename} fill className="object-contain p-0.5" />
                    ) : (
                      <FileText className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{file.filename}</p>
                    <p className="text-xs text-gray-500">{file.category} &middot; {formatSize(file.size)} &middot; {file.extension.toUpperCase()}</p>
                  </div>
                  <div className="text-xs text-gray-600 hidden md:block">{formatDate(file.modified)}</div>
                  <button onClick={(e) => { e.stopPropagation(); copyUrl(file.url) }} className="p-1.5 hover:bg-zinc-800 rounded">
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* File Detail Panel */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex" data-testid="file-detail-panel">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedFile(null)} />
          <div className="ml-auto relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">File Details</h3>
                <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-zinc-800 rounded" data-testid="close-detail">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="relative aspect-square bg-zinc-900 rounded-lg overflow-hidden mb-4 border border-zinc-800">
                {isImage(selectedFile.content_type) ? (
                  <SafeImage src={selectedFile.url} alt={selectedFile.filename} fill className="object-contain p-4" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-700" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-gray-500">Filename</label>
                  <p className="text-sm break-all" data-testid="detail-filename">{selectedFile.filename}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-gray-500">URL</label>
                  <div className="flex items-start gap-2">
                    <p className="text-xs break-all text-[#C9A962] flex-1" data-testid="detail-url">{selectedFile.url}</p>
                    <button onClick={() => copyUrl(selectedFile.url)} className="p-1 hover:bg-zinc-800 rounded flex-shrink-0" data-testid="copy-url-btn">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Size</label>
                    <p className="text-sm" data-testid="detail-size">{formatSize(selectedFile.size)}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Type</label>
                    <p className="text-sm" data-testid="detail-type">{selectedFile.content_type}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Category</label>
                    <p className="text-sm" data-testid="detail-category">{selectedFile.category}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Modified</label>
                    <p className="text-sm" data-testid="detail-modified">{formatDate(selectedFile.modified)}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-500">Extension</label>
                    <p className="text-sm">{selectedFile.extension.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button size="sm" className="flex-1" onClick={() => copyUrl(selectedFile.url)} data-testid="copy-url-button">
                    <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy URL
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(selectedFile)} data-testid="delete-file-btn">
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
