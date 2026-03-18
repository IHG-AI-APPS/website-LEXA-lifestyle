'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  Eye, 
  FileText, 
  Calculator, 
  MousePointer, 
  TrendingUp,
  Users,
  Calendar,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface DashboardData {
  period_days: number
  summary: {
    total_pageviews: number
    unique_visitors: number
    form_submissions: number
    calculator_interactions: number
    button_clicks: number
  }
  top_pages: Array<{ page: string; views: number }>
  form_stats: Array<{
    form_type: string
    submissions: number
    successful: number
    conversion_rate: number
  }>
  calculator_funnel: Record<string, number>
  daily_pageviews: Array<{ date: string; views: number }>
  top_referrers: Array<{ referrer: string; count: number }>
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(30)
  const [error, setError] = useState('')

  const fetchAnalytics = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/analytics/dashboard?days=${period}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const result = await response.json()
        setData(result)
      } else {
        setError('Failed to load analytics')
      }
    } catch (err) {
      setError('Failed to connect to analytics service')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period]) // eslint-disable-line react-hooks/exhaustive-deps

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-80 bg-gray-100 rounded-xl"></div>
            <div className="h-80 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAnalytics}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Track website performance and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Page Views</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(data?.summary.total_pageviews || 0)}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Unique Visitors</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(data?.summary.unique_visitors || 0)}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Form Submissions</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(data?.summary.form_submissions || 0)}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-600">Calculator Uses</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(data?.summary.calculator_interactions || 0)}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <MousePointer className="w-5 h-5 text-pink-600" />
            </div>
            <span className="text-sm text-gray-600">Button Clicks</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(data?.summary.button_clicks || 0)}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Views Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Daily Page Views
          </h3>
          <div className="h-64 flex items-end gap-1">
            {data?.daily_pageviews.slice(-14).map((day, index) => {
              const maxViews = Math.max(...(data?.daily_pageviews.map(d => d.views) || [1]))
              const height = (day.views / maxViews) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${day.date}: ${day.views} views`}
                  />
                  <span className="text-xs text-gray-400 rotate-45 origin-left">
                    {day.date.slice(5)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-500" />
            Top Pages
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data?.top_pages.slice(0, 10).map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
                  <span className="text-sm text-gray-700 truncate">{page.page || '/'}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {formatNumber(page.views)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Stats & Calculator Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Form Submissions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Form Performance
          </h3>
          <div className="space-y-4">
            {data?.form_stats.map((form, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {form.form_type.replace(/_/g, ' ')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {form.submissions} submissions
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {form.conversion_rate}%
                  </div>
                  <div className="text-xs text-gray-500">success rate</div>
                </div>
              </div>
            ))}
            {(!data?.form_stats || data.form_stats.length === 0) && (
              <p className="text-gray-500 text-center py-4">No form submissions yet</p>
            )}
          </div>
        </div>

        {/* Calculator Funnel */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            Calculator Funnel
          </h3>
          <div className="space-y-3">
            {['start', 'step_complete', 'submit', 'pdf_download'].map((step, index) => {
              const count = data?.calculator_funnel[step] || 0
              const maxCount = Math.max(...Object.values(data?.calculator_funnel || {1: 1}))
              const width = maxCount > 0 ? (count / maxCount) * 100 : 0
              return (
                <div key={step}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 capitalize">{step.replace(/_/g, ' ')}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
                      style={{ width: `${Math.max(width, 2)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-indigo-500" />
          Top Referrers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data?.top_referrers.slice(0, 5).map((ref, index) => {
            let hostname = ref.referrer
            try {
              hostname = new URL(ref.referrer).hostname
            } catch {
              hostname = ref.referrer?.substring(0, 30) || 'Direct'
            }
            return (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{ref.count}</div>
                <div className="text-xs text-gray-500 truncate" title={ref.referrer}>
                  {hostname}
                </div>
              </div>
            )
          })}
          {(!data?.top_referrers || data.top_referrers.length === 0) && (
            <p className="col-span-5 text-gray-500 text-center py-4">No referrer data yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
