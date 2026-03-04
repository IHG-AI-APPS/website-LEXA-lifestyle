'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, Link, Image as ImageIcon, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  category?: string
  placeholder?: string
  className?: string
  showPreview?: boolean
  accept?: string
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  category = 'images',
  placeholder = 'Enter image URL or upload a file',
  className = '',
  showPreview = true,
  accept = 'image/*'
}: ImageUploadProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('upload')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      const response = await fetch(`${API_URL}/api/uploads/image`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Upload failed')
      }

      const data = await response.json()
      
      // Use the full URL for the uploaded image
      const imageUrl = data.url.startsWith('http') 
        ? data.url 
        : `${API_URL}${data.url}`
      
      onChange(imageUrl)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }, [category, onChange])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }, [handleFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }, [handleFileUpload])

  const clearImage = useCallback(() => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">{label}</label>
      )}

      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-gray-200 dark:border-zinc-800 p-1 bg-gray-50 w-fit">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
            mode === 'upload'
              ? 'bg-white text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-zinc-500 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
            mode === 'url'
              ? 'bg-white text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-zinc-500 hover:text-gray-900'
          }`}
        >
          <Link className="w-4 h-4" />
          URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 dark:border-zinc-700 hover:border-gray-400'
          } ${uploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm text-gray-600 dark:text-zinc-500">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-zinc-500 mb-1">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
            </>
          )}
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
          />
          {value && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-zinc-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview */}
      {showPreview && value && (
        <div className="relative mt-3">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-50">
            <img
              src={value}
              alt="Preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Cline x1="3" y1="21" x2="21" y2="3"/%3E%3C/svg%3E'
              }}
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 truncate">{value}</p>
        </div>
      )}
    </div>
  )
}

// Multi-image upload variant
interface MultiImageUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
  label?: string
  category?: string
  maxImages?: number
  className?: string
}

export function MultiImageUpload({
  values = [],
  onChange,
  label = 'Images',
  category = 'images',
  maxImages = 10,
  className = ''
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesUpload = useCallback(async (files: FileList) => {
    if (!files.length) return

    const remainingSlots = maxImages - values.length
    if (remainingSlots <= 0) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots)
    setUploading(true)
    setError(null)

    const newUrls: string[] = []

    for (const file of filesToUpload) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 10 * 1024 * 1024) continue

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', category)

        const response = await fetch(`${API_URL}/api/uploads/image`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          const imageUrl = data.url.startsWith('http') 
            ? data.url 
            : `${API_URL}${data.url}`
          newUrls.push(imageUrl)
        }
      } catch (err) {
        console.error('Upload error:', err)
      }
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls])
    }

    setUploading(false)
  }, [category, maxImages, onChange, values])

  const removeImage = useCallback((index: number) => {
    const newValues = values.filter((_, i) => i !== index)
    onChange(newValues)
  }, [onChange, values])

  const addUrlImage = useCallback(() => {
    if (values.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      onChange([...values, url.trim()])
    }
  }, [maxImages, onChange, values])

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
          {label} ({values.length}/{maxImages})
        </label>
      )}

      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-zinc-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3C/svg%3E'
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add More */}
      {values.length < maxImages && (
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload Images
          </button>
          <button
            type="button"
            onClick={addUrlImage}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50"
          >
            <Link className="w-4 h-4" />
            Add URL
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default ImageUpload
