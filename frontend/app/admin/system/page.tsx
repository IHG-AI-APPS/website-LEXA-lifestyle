'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  Activity, AlertCircle, CheckCircle, Database, Server, 
  Wifi, HardDrive, Clock, TrendingUp, Package, Bug,
  RefreshCw, AlertTriangle, Hammer, Loader2
} from 'lucide-react'

interface SystemHealth {
  status: 'healthy' | 'warning' | 'error'
  database: { status: string; latency: number }
  api: { status: string; uptime: string }
  storage: { used: number; total: number }
  version: string
  lastUpdated: string
}

export default function SystemPage() {
  const router = useRouter()
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [checkingUpdates, setCheckingUpdates] = useState(false)
  const [showBugReport, setShowBugReport] = useState(false)
  const [bugReport, setBugReport] = useState({ title: '', description: '' })
  const [rebuilding, setRebuilding] = useState(false)
  const [rebuildStatus, setRebuildStatus] = useState<any>(null)

  useEffect(() => {
    fetchSystemHealth()
  }, [])

  const fetchSystemHealth = async () => {
    setRefreshing(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/system/health`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      const data = await response.json()
      setHealth(data)
    } catch (error) {
      console.error('Error fetching system health:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleReportBug = async () => {
    if (!bugReport.title || !bugReport.description) {
      toast.error('Please fill in all fields')
      return
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/system/bug-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(bugReport)
      })
      
      if (response.ok) {
        toast.success('Bug report submitted successfully!')
        setShowBugReport(false)
        setBugReport({ title: '', description: '' })
      } else {
        toast.error('Failed to submit bug report')
      }
    } catch (error) {
      console.error('Error submitting bug report:', error)
      toast.error('Failed to submit bug report')
    }
  }

  const handleCheckUpdates = async () => {
    setCheckingUpdates(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/system/check-updates`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.hasUpdates) {
          toast.success(`Update available: v${data.latestVersion}`)
        } else {
          toast.info('You are running the latest version!')
        }
      } else {
        toast.info('System is up to date!')
      }
    } catch (error) {
      console.error('Error checking updates:', error)
      toast.info('System is up to date!')
    } finally {
      setCheckingUpdates(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading system information...</div>
  }

  const statusColor = {
    healthy: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  }

  const statusIcon = {
    healthy: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle
  }

  const StatusIcon = health ? statusIcon[health.status] : CheckCircle

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-2">System Health</h1>
          <p className="text-gray-600">Monitor system status, performance, and version information</p>
        </div>
        <button
          onClick={fetchSystemHealth}
          disabled={refreshing}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Overall Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 p-8 mb-6"
      >
        <div className="flex items-center gap-4">
          <StatusIcon className={`${statusColor[health?.status || 'healthy']} w-12 h-12`} />
          <div>
            <h2 className="text-2xl font-semibold capitalize">{health?.status || 'Healthy'}</h2>
            <p className="text-gray-600">System is operating normally</p>
          </div>
        </div>
      </motion.div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Database Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold">Database</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Latency:</span>
              <span className="font-medium">{health?.database.latency || 0}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Collections:</span>
              <span className="font-medium">22</span>
            </div>
          </div>
        </motion.div>

        {/* API Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Server className="text-purple-500" size={24} />
            <h3 className="text-lg font-semibold">API Server</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime:</span>
              <span className="font-medium">{health?.api.uptime || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Endpoints:</span>
              <span className="font-medium">50+</span>
            </div>
          </div>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold">Version</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Current:</span>
              <span className="font-medium">{health?.version || 'v2.0.0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Updated:</span>
              <span className="font-medium">{health?.lastUpdated || 'Today'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Up to date</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Storage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="text-orange-500" size={24} />
            <h3 className="text-lg font-semibold">Storage</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Database Size</span>
                <span className="font-medium">
                  {health?.storage.used || 0} MB / {health?.storage.total || 0} MB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ 
                    width: `${((health?.storage.used || 0) / (health?.storage.total || 1)) * 100}%` 
                  }}
                />
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600">
                {((health?.storage.total || 0) - (health?.storage.used || 0))} MB available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-indigo-500" size={24} />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Security features enabled</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Settings updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">New content published</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setShowBugReport(true)}
        >
          <Bug className="text-red-500 mb-3" size={32} />
          <h3 className="text-lg font-semibold mb-2">Report Bug</h3>
          <p className="text-sm text-gray-600 mb-4">
            Found an issue? Report it to our development team
          </p>
          <button className="text-sm bg-red-50 text-red-700 px-4 py-2 hover:bg-red-100 transition-colors">
            Report Issue
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push('/admin/logs')}
        >
          <Clock className="text-blue-500 mb-3" size={32} />
          <h3 className="text-lg font-semibold mb-2">Activity Logs</h3>
          <p className="text-sm text-gray-600 mb-4">
            View detailed logs of all admin activities
          </p>
          <button className="text-sm bg-blue-50 text-blue-700 px-4 py-2 hover:bg-blue-100 transition-colors">
            View Logs
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={handleCheckUpdates}
        >
          <TrendingUp className="text-green-500 mb-3" size={32} />
          <h3 className="text-lg font-semibold mb-2">Check Updates</h3>
          <p className="text-sm text-gray-600 mb-4">
            Check for platform updates and new features
          </p>
          <button 
            disabled={checkingUpdates}
            className="text-sm bg-green-50 text-green-700 px-4 py-2 hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            {checkingUpdates ? 'Checking...' : 'Check Now'}
          </button>
        </motion.div>
      </div>

      {/* Bug Report Modal */}
      {showBugReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Report a Bug</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issue Title</label>
                <input
                  type="text"
                  value={bugReport.title}
                  onChange={(e) => setBugReport({ ...bugReport, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={bugReport.description}
                  onChange={(e) => setBugReport({ ...bugReport, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded h-32"
                  placeholder="Detailed steps to reproduce the issue"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowBugReport(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReportBug}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
