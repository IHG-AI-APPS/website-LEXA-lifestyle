'use client'

import { useState, useEffect } from 'react'
import { 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Trash2,
  FileArchive,
  Download,
  Info,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Patch {
  id: string
  filename: string
  description: string
  uploaded_by: string
  uploaded_at: string
  applied: boolean
  applied_at: string | null
  rollback_available: boolean
  backup_path: string | null
  files_modified: string[]
  status: 'uploaded' | 'applied' | 'failed' | 'rolled_back'
  error_message: string | null
  file_size: number
  patch_path: string
}

interface PatchStats {
  total: number
  applied: number
  pending: number
  failed: number
}

export default function PatchManagementPage() {
  const [patches, setPatches] = useState<Patch[]>([])
  const [stats, setStats] = useState<PatchStats>({ total: 0, applied: 0, pending: 0, failed: 0 })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [expandedPatch, setExpandedPatch] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

  useEffect(() => {
    fetchPatches()
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPatches = async () => {
    try {
      const response = await fetch(`${API_URL}/api/patches`)
      const data = await response.json()
      if (data.success) {
        setPatches(data.patches)
      }
    } catch (err) {
      console.error('Failed to fetch patches:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/patches/stats`)
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.zip')) {
        setError('Only .zip files are allowed')
        return
      }
      if (file.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB')
        return
      }
      setSelectedFile(file)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('description', description)

      const response = await fetch(`${API_URL}/api/patches/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Patch uploaded successfully! ${data.files_count} files ready to apply.`)
        setSelectedFile(null)
        setDescription('')
        fetchPatches()
        fetchStats()
        // Reset file input
        const fileInput = document.getElementById('patch-file') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setError(data.detail || 'Upload failed')
      }
    } catch (err) {
      setError('Upload failed: ' + (err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const handleApplyPatch = async (patchId: string) => {
    if (!confirm('Are you sure you want to apply this patch? A backup will be created automatically.')) {
      return
    }

    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_URL}/api/patches/${patchId}/apply`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Patch applied successfully! ${data.files_applied} files updated. ${data.needs_restart.frontend || data.needs_restart.backend ? 'Please restart services.' : ''}`)
        fetchPatches()
        fetchStats()
      } else {
        setError(data.detail || 'Failed to apply patch')
      }
    } catch (err) {
      setError('Apply failed: ' + (err as Error).message)
    }
  }

  const handleRollback = async (patchId: string) => {
    if (!confirm('Are you sure you want to rollback this patch? Files will be restored from backup.')) {
      return
    }

    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_URL}/api/patches/${patchId}/rollback`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Patch rolled back successfully! ${data.files_restored} files restored.`)
        fetchPatches()
        fetchStats()
      } else {
        setError(data.detail || 'Rollback failed')
      }
    } catch (err) {
      setError('Rollback failed: ' + (err as Error).message)
    }
  }

  const handleDeletePatch = async (patchId: string) => {
    if (!confirm('Are you sure you want to delete this patch? This cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/patches/${patchId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Patch deleted successfully')
        fetchPatches()
        fetchStats()
      } else {
        setError(data.detail || 'Delete failed')
      }
    } catch (err) {
      setError('Delete failed: ' + (err as Error).message)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      uploaded: <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center gap-1"><Clock size={14} /> Pending</span>,
      applied: <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1"><CheckCircle2 size={14} /> Applied</span>,
      failed: <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center gap-1"><XCircle size={14} /> Failed</span>,
      rolled_back: <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full flex items-center gap-1"><RefreshCw size={14} /> Rolled Back</span>
    }
    return badges[status as keyof typeof badges] || status
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patch Management System</h1>
          <p className="text-gray-600">Upload, apply, and manage system patches securely</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patches</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileArchive size={32} className="text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Applied</p>
                <p className="text-3xl font-bold text-green-600">{stats.applied}</p>
              </div>
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-blue-600">{stats.pending}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle size={32} className="text-red-400" />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload size={24} />
            Upload New Patch
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patch File (.zip only, max 100MB)
              </label>
              <input
                id="patch-file"
                type="file"
                accept=".zip"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What changes does this patch include?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Selected:</strong> {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {uploading ? 'Uploading...' : 'Upload Patch'}
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Patches List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Patch History</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading patches...
            </div>
          ) : patches.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No patches uploaded yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {patches.map((patch) => (
                <div key={patch.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{patch.filename}</h3>
                        {getStatusBadge(patch.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{patch.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Uploaded: {formatDate(patch.uploaded_at)}</span>
                        <span>•</span>
                        <span>{formatFileSize(patch.file_size)}</span>
                        <span>•</span>
                        <span>{patch.files_modified.length} files</span>
                        {patch.applied_at && (
                          <>
                            <span>•</span>
                            <span>Applied: {formatDate(patch.applied_at)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {patch.status === 'uploaded' && (
                        <>
                          <Button
                            onClick={() => handleApplyPatch(patch.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm"
                            size="sm"
                          >
                            <CheckCircle2 size={16} className="mr-1" />
                            Apply
                          </Button>
                          <Button
                            onClick={() => handleDeletePatch(patch.id)}
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50 text-sm"
                            size="sm"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </>
                      )}

                      {patch.status === 'applied' && patch.rollback_available && (
                        <Button
                          onClick={() => handleRollback(patch.id)}
                          variant="outline"
                          className="text-orange-600 border-orange-300 hover:bg-orange-50 text-sm"
                          size="sm"
                        >
                          <RefreshCw size={16} className="mr-1" />
                          Rollback
                        </Button>
                      )}

                      <Button
                        onClick={() => setExpandedPatch(expandedPatch === patch.id ? null : patch.id)}
                        variant="outline"
                        size="sm"
                        className="text-sm"
                      >
                        <Info size={16} />
                      </Button>
                    </div>
                  </div>

                  {patch.error_message && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
                      <strong>Error:</strong> {patch.error_message}
                    </div>
                  )}

                  {expandedPatch === patch.id && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Modified Files ({patch.files_modified.length})</h4>
                      <ul className="space-y-1 max-h-60 overflow-y-auto">
                        {patch.files_modified.map((file, idx) => (
                          <li key={idx} className="text-sm text-gray-700 font-mono bg-white px-3 py-1 rounded">
                            {file}
                          </li>
                        ))}
                      </ul>
                      {patch.backup_path && (
                        <p className="mt-3 text-xs text-gray-600">
                          <strong>Backup:</strong> {patch.backup_path}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Info size={20} />
            How to Use Patch System
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Upload:</strong> Upload a .zip file containing modified files</li>
            <li>• <strong>Apply:</strong> System creates automatic backup and applies changes</li>
            <li>• <strong>Rollback:</strong> Restore previous version if issues occur</li>
            <li>• <strong>Security:</strong> Only .zip files accepted, path traversal protected</li>
            <li>• <strong>Restart:</strong> Some patches may require service restart (frontend/backend)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
