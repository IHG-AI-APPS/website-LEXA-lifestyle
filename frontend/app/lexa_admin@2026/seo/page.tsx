'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, TrendingUp, FileText, Link as LinkIcon, Image as ImageIcon,
  CheckCircle, AlertCircle, Settings, BarChart3, Globe, Eye,
  ExternalLink, Download, RefreshCw, Zap, ArrowRight, Edit
} from 'lucide-react'

interface SEOScore {
  overall: number
  technical: number
  content: number
  performance: number
  mobile: number
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info'
  category: string
  message: string
  page?: string
  fix?: string
}

export default function SEODashboard() {
  const [score, setScore] = useState<SEOScore | null>(null)
  const [issues, setIssues] = useState<SEOIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [auditing, setAuditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchSEOData()
  }, [])

  const fetchSEOData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/seo/audit`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      const data = await response.json()
      setScore(data.score || { overall: 0, technical: 0, content: 0, performance: 0, mobile: 0 })
      setIssues(data.issues || [])
    } catch (error) {
      console.error('Error fetching SEO data:', error)
      // Set default values on error
      setScore({ overall: 0, technical: 0, content: 0, performance: 0, mobile: 0 })
      setIssues([])
    } finally {
      setLoading(false)
    }
  }

  const runAudit = async () => {
    setAuditing(true)
    try {
      await fetchSEOData()
    } finally {
      setAuditing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200'
    if (score >= 70) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  if (loading) {
    return <div className="p-8">Loading SEO dashboard...</div>
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'meta-tags', label: 'Meta Tags', icon: FileText },
    { id: 'redirects', label: '301 Redirects', icon: LinkIcon },
    { id: 'keywords', label: 'Keywords', icon: Search },
    { id: 'images', label: 'Image SEO', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-2">SEO Management</h1>
          <p className="text-gray-600">Comprehensive SEO tools and analytics for your website</p>
        </div>
        <button
          onClick={runAudit}
          disabled={auditing}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={auditing ? 'animate-spin' : ''} />
          Run SEO Audit
        </button>
      </div>

      {/* SEO Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 border-2 ${getScoreBg(score?.overall || 0)}`}
        >
          <div className="text-center">
            <div className={`text-5xl font-bold ${getScoreColor(score?.overall || 0)}`}>
              {score?.overall || 0}
            </div>
            <div className="text-sm text-gray-600 mt-2">Overall Score</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full ${(score?.overall ?? 0) >= 90 ? 'bg-green-600' : (score?.overall ?? 0) >= 70 ? 'bg-yellow-600' : 'bg-red-600'}`}
                style={{ width: `${score?.overall || 0}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Technical SEO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 p-6"
        >
          <Zap className="text-blue-500 mb-2" size={24} />
          <div className="text-3xl font-bold">{score?.technical || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Technical SEO</div>
        </motion.div>

        {/* Content SEO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 p-6"
        >
          <FileText className="text-purple-500 mb-2" size={24} />
          <div className="text-3xl font-bold">{score?.content || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Content Quality</div>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 p-6"
        >
          <TrendingUp className="text-green-500 mb-2" size={24} />
          <div className="text-3xl font-bold">{score?.performance || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Performance</div>
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 p-6"
        >
          <Globe className="text-orange-500 mb-2" size={24} />
          <div className="text-3xl font-bold">{score?.mobile || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Mobile Friendly</div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.a
              href="/lexa_admin@2026/seo/meta-tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <FileText className="text-blue-500 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Edit Meta Tags</h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage titles, descriptions, and keywords for all pages
              </p>
              <span className="text-sm text-blue-600 flex items-center gap-1">
                Edit Meta Tags <ExternalLink size={14} />
              </span>
            </motion.a>

            <motion.a
              href="/lexa_admin@2026/seo/redirects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <LinkIcon className="text-purple-500 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">301 Redirects</h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage URL redirects and fix broken links
              </p>
              <span className="text-sm text-purple-600 flex items-center gap-1">
                Manage Redirects <ExternalLink size={14} />
              </span>
            </motion.a>

            <motion.a
              href="/lexa_admin@2026/seo/keywords"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <Search className="text-green-500 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Keyword Tracking</h3>
              <p className="text-sm text-gray-600 mb-4">
                Monitor keyword rankings and get suggestions
              </p>
              <span className="text-sm text-green-600 flex items-center gap-1">
                View Keywords <ExternalLink size={14} />
              </span>
            </motion.a>

            <motion.a
              href="/lexa_admin@2026/seo/images"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <ImageIcon className="text-orange-500 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Image SEO</h3>
              <p className="text-sm text-gray-600 mb-4">
                Optimize alt text and image performance
              </p>
              <span className="text-sm text-orange-600 flex items-center gap-1">
                Optimize Images <ExternalLink size={14} />
              </span>
            </motion.a>
          </div>

          {/* Issues List */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-6">SEO Issues & Recommendations</h2>
            
            {issues.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-lg font-semibold mb-2">No Issues Found!</h3>
                <p className="text-gray-600">Your SEO is looking great. Keep up the good work!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`p-4 border-l-4 ${
                      issue.type === 'error' ? 'border-red-500 bg-red-50' :
                      issue.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {issue.type === 'error' ? (
                        <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                      ) : issue.type === 'warning' ? (
                        <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                      ) : (
                        <CheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold capitalize">{issue.category}</span>
                          {issue.page && (
                            <span className="text-xs bg-white px-2 py-1 rounded">{issue.page}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{issue.message}</p>
                        {issue.fix && (
                          <p className="text-xs text-gray-600">
                            <strong>How to fix:</strong> {issue.fix}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'meta-tags' && (
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Meta Tags Management</h2>
          <p className="text-gray-600 mb-6">Configure meta tags, Open Graph, and Twitter Cards for all pages</p>
          <a
            href="/lexa_admin@2026/seo/meta-tags"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800"
          >
            <Settings size={18} />
            Open Meta Tags Editor
          </a>
        </div>
      )}

      {activeTab === 'redirects' && (
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">301 Redirects Manager</h2>
          <p className="text-gray-600 mb-6">Create and manage URL redirects to preserve SEO value</p>
          <a
            href="/lexa_admin@2026/seo/redirects"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800"
          >
            <LinkIcon size={18} />
            Manage Redirects
          </a>
        </div>
      )}

      {activeTab === 'keywords' && (
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Keyword Tracking</h2>
          <p className="text-gray-600 mb-6">Track your keyword rankings and discover new opportunities</p>
          <a
            href="/lexa_admin@2026/seo/keywords"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800"
          >
            <Search size={18} />
            View Keyword Dashboard
          </a>
        </div>
      )}
    </div>
  )
}
