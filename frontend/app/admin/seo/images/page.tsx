'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { 
  Image as ImageIcon, AlertCircle, CheckCircle, Download, 
  RefreshCw, Search, Edit2, Save, X, Filter, Eye
} from 'lucide-react'

interface ImageData {
  id: string
  url: string
  alt: string
  page: string
  size: number
  width: number
  height: number
  format: string
  hasAlt: boolean
  isOptimized: boolean
  lazyLoaded: boolean
}

interface ImageStats {
  total: number
  withAlt: number
  withoutAlt: number
  optimized: number
  needsOptimization: number
  lazyLoaded: number
}

export default function ImageSEOPage() {
  const [images, setImages] = useState<ImageData[]>([])
  const [stats, setStats] = useState<ImageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'missing-alt' | 'needs-optimization'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchImageData()
  }, [])

  const fetchImageData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/images`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      const data = await response.json()
      setImages(data.images)
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching image data:', error)
    } finally {
      setLoading(false)
    }
  }

  const scanImages = async () => {
    setScanning(true)
    try {
      await fetchImageData()
    } finally {
      setScanning(false)
    }
  }

  const updateAltText = async (imageId: string, newAlt: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ alt: newAlt })
      })
      
      // Update local state
      setImages(images.map(img => 
        img.id === imageId ? { ...img, alt: newAlt, hasAlt: !!newAlt } : img
      ))
      setEditingId(null)
    } catch (error) {
      console.error('Error updating alt text:', error)
    }
  }

  const exportReport = () => {
    const csv = [
      ['URL', 'Alt Text', 'Page', 'Size (KB)', 'Dimensions', 'Format', 'Has Alt', 'Optimized', 'Lazy Loaded'],
      ...filteredImages.map(img => [
        img.url,
        img.alt || '(missing)',
        img.page,
        (img.size / 1024).toFixed(2),
        `${img.width}x${img.height}`,
        img.format,
        img.hasAlt ? 'Yes' : 'No',
        img.isOptimized ? 'Yes' : 'No',
        img.lazyLoaded ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `image-seo-audit-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredImages = images.filter(img => {
    // Apply filter
    if (filter === 'missing-alt' && img.hasAlt) return false
    if (filter === 'needs-optimization' && img.isOptimized) return false
    
    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        img.url.toLowerCase().includes(search) ||
        img.alt.toLowerCase().includes(search) ||
        img.page.toLowerCase().includes(search)
      )
    }
    
    return true
  })

  if (loading) {
    return <div className="p-8">Loading image data...</div>
  }

  const completionPercentage = stats ? Math.round((stats.withAlt / stats.total) * 100) : 0

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Image SEO Optimizer</h1>
          <p className="text-gray-600">Manage alt text, optimize images, and improve performance</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportReport}
            className="flex items-center gap-2 border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Export Report
          </button>
          <button
            onClick={scanImages}
            disabled={scanning}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={scanning ? 'animate-spin' : ''} />
            Scan Images
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-6"
        >
          <ImageIcon className="text-blue-500 mb-2" size={24} />
          <div className="text-3xl font-bold">{stats?.total || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Total Images</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-green-200 p-6"
        >
          <CheckCircle className="text-green-500 mb-2" size={24} />
          <div className="text-3xl font-bold text-green-600">{stats?.withAlt || 0}</div>
          <div className="text-sm text-gray-600 mt-1">With Alt Text</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-red-200 p-6"
        >
          <AlertCircle className="text-red-500 mb-2" size={24} />
          <div className="text-3xl font-bold text-red-600">{stats?.withoutAlt || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Missing Alt Text</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-yellow-200 p-6"
        >
          <AlertCircle className="text-yellow-500 mb-2" size={24} />
          <div className="text-3xl font-bold text-yellow-600">{stats?.needsOptimization || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Needs Optimization</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-purple-200 p-6"
        >
          <div className="text-3xl font-bold text-purple-600">{completionPercentage}%</div>
          <div className="text-sm text-gray-600 mt-1">Alt Text Coverage</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search images by URL, alt text, or page..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 border transition-colors ${
                filter === 'all' 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Images
            </button>
            <button
              onClick={() => setFilter('missing-alt')}
              className={`flex-1 py-2 border transition-colors ${
                filter === 'missing-alt' 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Missing Alt
            </button>
            <button
              onClick={() => setFilter('needs-optimization')}
              className={`flex-1 py-2 border transition-colors ${
                filter === 'needs-optimization' 
                  ? 'bg-yellow-600 text-white border-yellow-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Needs Optimization
            </button>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white border border-gray-200">
        {filteredImages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {filter === 'all' ? 'No images found' : 
             filter === 'missing-alt' ? '✅ All images have alt text!' :
             '✅ All images are optimized!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alt Text</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredImages.map((image) => (
                  <motion.tr
                    key={image.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <SafeImage 
                          src={image.url} 
                          alt={image.alt || 'Preview'} 
                          fill
                          className="object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23ddd" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999"%3E?%3C/text%3E%3C/svg%3E'
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {image.url}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === image.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Enter alt text..."
                            autoFocus
                          />
                          <button
                            onClick={() => updateAltText(image.id, editValue)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm">
                          {image.alt || <span className="text-red-500 italic">(missing)</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {image.page}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div>{(image.size / 1024).toFixed(1)} KB</div>
                      <div className="text-xs text-gray-500">{image.width}x{image.height}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {!image.hasAlt && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">No Alt</span>
                        )}
                        {!image.isOptimized && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Large</span>
                        )}
                        {image.lazyLoaded && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Lazy</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setEditingId(image.id)
                          setEditValue(image.alt)
                        }}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={14} />
                        Edit Alt
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {stats && stats.withoutAlt > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded"
        >
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="text-blue-600" />
            SEO Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Add descriptive alt text to {stats.withoutAlt} images for better accessibility and SEO</li>
            <li>Alt text should describe the image content clearly and concisely (50-125 characters)</li>
            <li>Include relevant keywords naturally, but avoid keyword stuffing</li>
            {stats.needsOptimization > 0 && (
              <li>Optimize {stats.needsOptimization} large images to improve page load speed</li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
