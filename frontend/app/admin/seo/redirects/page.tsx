'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Plus, Trash2, Search, CheckCircle, XCircle,
  ExternalLink, AlertTriangle, BarChart3, TrendingUp, Link as LinkIcon
} from 'lucide-react'

interface Redirect {
  id: string
  from_url: string
  to_url: string
  type: '301' | '302' | '307'
  enabled: boolean
  created_at: string
  hit_count?: number
}

export default function RedirectsManager() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRedirect, setNewRedirect] = useState<Partial<Redirect>>({
    from_url: '',
    to_url: '',
    type: '301',
    enabled: true
  })

  useEffect(() => {
    fetchRedirects()
  }, [])

  const fetchRedirects = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/redirects`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        }
      )
      const data = await response.json()
      setRedirects(data)
    } catch (error) {
      console.error('Error fetching redirects:', error)
    } finally {
      setLoading(false)
    }
  }

  const createRedirect = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/redirects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: JSON.stringify(newRedirect)
        }
      )

      if (response.ok) {
        await fetchRedirects()
        setShowAddModal(false)
        setNewRedirect({
          from_url: '',
          to_url: '',
          type: '301',
          enabled: true
        })
        alert('Redirect created successfully!')
      } else {
        alert('Failed to create redirect')
      }
    } catch (error) {
      console.error('Error creating redirect:', error)
      alert('Error creating redirect')
    }
  }

  const deleteRedirect = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/redirects/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        }
      )

      if (response.ok) {
        await fetchRedirects()
        alert('Redirect deleted successfully!')
      } else {
        alert('Failed to delete redirect')
      }
    } catch (error) {
      console.error('Error deleting redirect:', error)
      alert('Error deleting redirect')
    }
  }

  const filteredRedirects = redirects.filter(redirect =>
    redirect.from_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    redirect.to_url.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: redirects.length,
    active: redirects.filter(r => r.enabled).length,
    type301: redirects.filter(r => r.type === '301').length,
    type302: redirects.filter(r => r.type === '302').length
  }

  if (loading) {
    return <div className="p-8">Loading redirects...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Redirect Manager</h1>
              <p className="text-gray-600 mt-2">Manage 301, 302, and 307 redirects for your site</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Redirect
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search redirects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Redirects</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <LinkIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">301 (Permanent)</p>
                <p className="text-2xl font-bold">{stats.type301}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">302/307 (Temporary)</p>
                <p className="text-2xl font-bold">{stats.type302}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Redirects List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From URL
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To URL
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRedirects.map((redirect) => (
                  <motion.tr
                    key={redirect.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {redirect.from_url}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {redirect.to_url}
                        </code>
                        <a
                          href={redirect.to_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        redirect.type === '301'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {redirect.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {redirect.enabled ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          <XCircle className="w-3 h-3" />
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(redirect.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteRedirect(redirect.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredRedirects.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <LinkIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No redirects found</p>
                <p className="text-sm">Create your first redirect to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Redirect Types Explained</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>
                  <strong>301 (Permanent):</strong> Use for permanently moved pages. Passes SEO value to new URL.
                </li>
                <li>
                  <strong>302 (Temporary):</strong> Use for temporarily moved pages. Does not pass full SEO value.
                </li>
                <li>
                  <strong>307 (Temporary):</strong> Similar to 302 but preserves HTTP method (POST, GET, etc).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Add Redirect Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Add New Redirect</h2>

              <div className="space-y-6">
                {/* From URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From URL (Old URL) *
                  </label>
                  <input
                    type="text"
                    value={newRedirect.from_url}
                    onChange={(e) => setNewRedirect({ ...newRedirect, from_url: e.target.value })}
                    placeholder="/old-page"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">Start with / for relative paths or include full URL</p>
                </div>

                {/* To URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To URL (New URL) *
                  </label>
                  <input
                    type="text"
                    value={newRedirect.to_url}
                    onChange={(e) => setNewRedirect({ ...newRedirect, to_url: e.target.value })}
                    placeholder="/new-page"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">Can be relative path or full URL</p>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Redirect Type *
                  </label>
                  <select
                    value={newRedirect.type}
                    onChange={(e) => setNewRedirect({ ...newRedirect, type: e.target.value as '301' | '302' | '307' })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="301">301 - Permanent Redirect (Recommended)</option>
                    <option value="302">302 - Temporary Redirect</option>
                    <option value="307">307 - Temporary Redirect (Method Preserved)</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={newRedirect.enabled}
                    onChange={(e) => setNewRedirect({ ...newRedirect, enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
                    Enable redirect immediately
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createRedirect}
                  disabled={!newRedirect.from_url || !newRedirect.to_url}
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Redirect
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddModal(false)
                    setNewRedirect({
                      from_url: '',
                      to_url: '',
                      type: '301',
                      enabled: true
                    })
                  }}
                  className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
