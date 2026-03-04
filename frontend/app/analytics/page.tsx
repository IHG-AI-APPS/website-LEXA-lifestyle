'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Clock,
  Flame,
  ThermometerSun,
  Leaf,
  RefreshCw,
  Loader2,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface AnalyticsData {
  overview: {
    total_sessions: number
    sessions_30d: number
    sessions_7d: number
    completed_sessions: number
    completed_30d: number
    conversion_rate: number
  }
  lead_quality: {
    hot: number
    warm: number
    nurture: number
  }
  funnel_stages: Record<string, number>
  segments: Record<string, number>
  property_types: Record<string, number>
  proposal_selections: Record<string, number>
  generated_at: string
}

export default function AnalyticsDashboard() {
  const cms = useCms('page_analytics', null)

  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/project-builder/analytics/overview`)
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError('Failed to load analytics data')
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#171717] rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </motion.div>
  )

  const DistributionBar = ({ data, colors }: { data: Record<string, number>; colors: Record<string, string> }) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0)
    if (total === 0) return <div className="text-sm text-gray-400">No data</div>
    
    return (
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => {
          const percentage = Math.round((value / total) * 100)
          return (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-zinc-500 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="text-gray-900 dark:text-white font-medium">{value} ({percentage}%)</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-[#171717] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`h-full rounded-full ${colors[key] || 'bg-gray-400'}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAnalytics}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#C9A962]" />
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Project Builder Performance Insights
            </p>
          </div>
          <Button
            variant="outline"
            onClick={fetchAnalytics}
            className="gap-2"
            data-testid="refresh-analytics"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Sessions"
            value={data?.overview.total_sessions || 0}
            subtitle={`${data?.overview.sessions_7d || 0} in last 7 days`}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Completed Projects"
            value={data?.overview.completed_sessions || 0}
            subtitle={`${data?.overview.completed_30d || 0} in last 30 days`}
            icon={CheckCircle2}
            color="green"
          />
          <StatCard
            title="Conversion Rate"
            value={`${data?.overview.conversion_rate || 0}%`}
            subtitle="Sessions to submissions"
            icon={TrendingUp}
            color="#C9A962"
          />
          <StatCard
            title="Active This Week"
            value={data?.overview.sessions_7d || 0}
            subtitle="New sessions"
            icon={Clock}
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lead Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#171717] rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A962]" />
              Lead Quality Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Hot Leads</span>
                </div>
                <span className="text-2xl font-semibold text-red-600">
                  {data?.lead_quality.hot || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Warm Leads</span>
                </div>
                <span className="text-2xl font-semibold text-orange-600">
                  {data?.lead_quality.warm || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Nurture Leads</span>
                </div>
                <span className="text-2xl font-semibold text-green-600">
                  {data?.lead_quality.nurture || 0}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Proposal Selections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#171717] rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Proposal Selections
            </h3>
            <DistributionBar
              data={data?.proposal_selections || {}}
              colors={{
                value: 'bg-[#C9A962]',
                balanced: 'bg-green-500',
                flagship: 'bg-[#C9A962]/50'
              }}
            />
          </motion.div>

          {/* Segment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#171717] rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C9A962]" />
              Segment Distribution
            </h3>
            <DistributionBar
              data={data?.segments || {}}
              colors={{
                Residential: 'bg-[#C9A962]',
                Commercial: 'bg-[#C9A962]/50',
                Hospitality: 'bg-orange-500'
              }}
            />
          </motion.div>

          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#171717] rounded-xl border border-gray-200 dark:border-zinc-800 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C9A962]" />
              Property Types
            </h3>
            <DistributionBar
              data={data?.property_types || {}}
              colors={{
                Villa: 'bg-[#C9A962]',
                Apartment: 'bg-green-500',
                Penthouse: 'bg-[#C9A962]/50',
                Estate: 'bg-orange-500'
              }}
            />
          </motion.div>
        </div>

        {/* Last Updated */}
        {data?.generated_at && (
          <div className="text-center text-sm text-gray-400">
            Last updated: {new Date(data.generated_at).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}
