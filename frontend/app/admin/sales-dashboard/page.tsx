'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, TrendingUp, Target, DollarSign, ArrowRight,
  ChevronDown, Search, Filter, RefreshCw, X,
  Phone, Mail, Clock, Star, AlertCircle,
  BarChart3, PieChart, Activity, Zap, Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const API = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  source: string
  source_collection?: string
  lead_score: number
  score_breakdown?: Record<string, number>
  status: string
  assigned_to: string
  timestamp: string
  message?: string
  budget_range?: string
  timeline?: string
  property_type?: string
  interests?: string[]
  total_cost?: number
  notes?: Array<{ text: string; timestamp: string; by: string }>
  stage_history?: Array<{ stage: string; timestamp: string }>
}

interface DashboardStats {
  total_leads: number
  conversion_rate: number
  avg_lead_score: number
  pipeline_value: number
  recent_leads_7d: number
  stage_counts: Record<string, number>
  score_distribution: { hot: number; warm: number; cold: number }
  source_breakdown: Record<string, number>
  assigned_distribution: Record<string, number>
  pipeline_stages: string[]
}

const STAGE_COLORS: Record<string, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-yellow-500',
  qualified: 'bg-purple-500',
  proposal: 'bg-orange-500',
  won: 'bg-green-500',
  lost: 'bg-red-500',
}

const STAGE_LABELS: Record<string, string> = {
  new: 'New', contacted: 'Contacted', qualified: 'Qualified',
  proposal: 'Proposal', won: 'Won', lost: 'Lost',
}

const SOURCE_LABELS: Record<string, string> = {
  calculator: 'Calculator', consultation: 'Consultation',
  experience_centre: 'Experience Centre', contact_form: 'Contact Form',
  exit_intent: 'Exit Intent', ai_chat: 'AI Chat', direct: 'Direct',
  'developer-packages': 'Developer', 'smart-home-quiz': 'Quiz',
  'vendor-supplier-page': 'Vendor/Supplier',
}

function getScoreColor(score: number): string {
  if (score >= 70) return 'text-green-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-500'
}

function getScoreBg(score: number): string {
  if (score >= 70) return 'bg-green-100 text-green-700'
  if (score >= 40) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `AED ${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000) return `AED ${(val / 1_000).toFixed(0)}K`
  return `AED ${val}`
}

function formatDate(ts: string): string {
  if (!ts) return '—'
  try { return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
  catch { return '—' }
}

function formatTime(ts: string): string {
  if (!ts) return '—'
  try { return new Date(ts).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
  catch { return '—' }
}

export default function SalesDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterSource, setFilterSource] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline')
  const [refreshing, setRefreshing] = useState(false)

  const getToken = () => {
    if (typeof window !== 'undefined') return localStorage.getItem('admin_token') || ''
    return ''
  }

  const headers = useCallback(() => ({
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }), [])

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, pipelineRes] = await Promise.all([
        fetch(`${API}/api/sales-intelligence/dashboard-stats`, { headers: headers() }),
        fetch(`${API}/api/sales-intelligence/pipeline?limit=300`, { headers: headers() })
      ])

      if (statsRes.ok) {
        const d = await statsRes.json()
        setStats(d)
      }
      if (pipelineRes.ok) {
        const d = await pipelineRes.json()
        setLeads(d.leads || [])
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [headers])

  useEffect(() => { fetchData() }, [fetchData])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API}/api/sales-intelligence/lead/${leadId}/status`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
        if (selectedLead?.id === leadId) setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null)
        fetchData()
      }
    } catch (err) { console.error('Failed to update status:', err) }
  }

  // Filter leads
  const filtered = leads.filter(l => {
    if (filterStatus && l.status !== filterStatus) return false
    if (filterSource && !l.source.includes(filterSource)) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.phone?.includes(q))
    }
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 px-6" data-testid="sales-dashboard-loading">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => <div key={i} className="h-28 bg-white rounded-lg" />)}
          </div>
          <div className="h-96 bg-white rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-12" data-testid="sales-dashboard">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">Sales Intelligence</h1>
            <p className="text-sm text-gray-500 mt-1">Unified pipeline across {stats?.total_leads || 0} leads from {Object.keys(stats?.source_breakdown || {}).length} sources</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} data-testid="refresh-btn">
              <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: stats?.total_leads || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg. Lead Score', value: stats?.avg_lead_score || 0, icon: Target, color: 'text-purple-600', bg: 'bg-purple-50', suffix: '/100' },
            { label: 'Pipeline Value', value: formatCurrency(stats?.pipeline_value || 0), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'New This Week', value: stats?.recent_leads_7d || 0, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              data-testid={`kpi-card-${i}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {kpi.value}{kpi.suffix || ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pipeline Funnel + Score Distribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Pipeline Funnel */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5" data-testid="pipeline-funnel">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-400" /> Pipeline Stages
            </h3>
            <div className="space-y-3">
              {(stats?.pipeline_stages || []).map(stage => {
                const count = stats?.stage_counts?.[stage] || 0
                const total = stats?.total_leads || 1
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={stage} className="flex items-center gap-3" data-testid={`stage-${stage}`}>
                    <span className="w-20 text-xs font-medium text-gray-600 capitalize">{STAGE_LABELS[stage]}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(pct, 2)}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`h-full ${STAGE_COLORS[stage]} rounded-full flex items-center justify-end pr-2`}
                      >
                        {pct > 10 && <span className="text-xs font-bold text-white">{count}</span>}
                      </motion.div>
                      {pct <= 10 && <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">{count}</span>}
                    </div>
                    <span className="w-10 text-xs text-gray-400 text-right">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5" data-testid="score-distribution">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-gray-400" /> Lead Quality
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Hot (70+)', count: stats?.score_distribution?.hot || 0, color: 'bg-green-500', textColor: 'text-green-600' },
                { label: 'Warm (40-69)', count: stats?.score_distribution?.warm || 0, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
                { label: 'Cold (<40)', count: stats?.score_distribution?.cold || 0, color: 'bg-red-500', textColor: 'text-red-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className={`text-lg font-bold ${item.textColor}`}>{item.count}</span>
                </div>
              ))}
            </div>

            {/* Source breakdown */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">By Source</h4>
              <div className="space-y-2">
                {Object.entries(stats?.source_breakdown || {})
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 6)
                  .map(([src, count]) => (
                    <div key={src} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 truncate">{SOURCE_LABELS[src] || src}</span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm" data-testid="leads-table">
          {/* Table Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" /> All Leads
              <span className="text-xs text-gray-400 font-normal">({filtered.length})</span>
            </h3>
            <div className="flex-1" />

            {/* Search */}
            <div className="relative w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input
                type="text" placeholder="Search leads..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 h-8 text-sm" data-testid="lead-search"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="h-8 text-sm border border-gray-200 rounded-md px-2"
              data-testid="status-filter"
            >
              <option value="">All Stages</option>
              {(stats?.pipeline_stages || []).map(s => (
                <option key={s} value={s}>{STAGE_LABELS[s]}</option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              value={filterSource} onChange={e => setFilterSource(e.target.value)}
              className="h-8 text-sm border border-gray-200 rounded-md px-2"
              data-testid="source-filter"
            >
              <option value="">All Sources</option>
              {Object.entries(stats?.source_breakdown || {}).map(([src]) => (
                <option key={src} value={src}>{SOURCE_LABELS[src] || src}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase w-12">Score</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Assigned</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.slice(0, 50).map((lead, idx) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLead(lead)}
                    data-testid={`lead-row-${idx}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold ${getScoreBg(lead.lead_score)}`}>
                        {lead.lead_score}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name || '—'}</div>
                      <div className="text-xs text-gray-500">{lead.email || '—'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {SOURCE_LABELS[lead.source] || lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STAGE_COLORS[lead.status] || 'bg-gray-400'}`} />
                        {STAGE_LABELS[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{lead.assigned_to}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(lead.timestamp)}</td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost" size="sm"
                        onClick={e => { e.stopPropagation(); setSelectedLead(lead) }}
                        data-testid={`lead-view-${idx}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No leads match your filters</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400 text-center">
              Showing 50 of {filtered.length} leads. Use filters to narrow results.
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
              data-testid="lead-detail-modal"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedLead.name || 'Unknown Lead'}</h3>
                  <p className="text-xs text-gray-500">{selectedLead.email}</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-gray-100 rounded" data-testid="close-detail">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">
                {/* Score */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${getScoreBg(selectedLead.lead_score)}`}>
                    {selectedLead.lead_score}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lead Score</p>
                    <p className={`text-xs ${getScoreColor(selectedLead.lead_score)}`}>
                      {selectedLead.lead_score >= 70 ? 'Hot Lead' : selectedLead.lead_score >= 40 ? 'Warm Lead' : 'Cold Lead'}
                    </p>
                  </div>
                </div>

                {/* Score Breakdown */}
                {selectedLead.score_breakdown && Object.keys(selectedLead.score_breakdown).length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Score Breakdown</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedLead.score_breakdown).map(([key, val]) => (
                        <div key={key} className="bg-gray-50 rounded-lg px-3 py-2">
                          <span className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                          <span className="block text-sm font-bold text-gray-900">+{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Contact</h4>
                  <div className="space-y-2">
                    {selectedLead.email && (
                      <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                        <Mail className="w-4 h-4 text-gray-400" />{selectedLead.email}
                      </a>
                    )}
                    {selectedLead.phone && (
                      <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                        <Phone className="w-4 h-4 text-gray-400" />{selectedLead.phone}
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-gray-400" />{formatTime(selectedLead.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Source</span><span className="font-medium">{SOURCE_LABELS[selectedLead.source] || selectedLead.source}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Assigned To</span><span className="font-medium">{selectedLead.assigned_to}</span></div>
                    {selectedLead.budget_range && <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-medium">{selectedLead.budget_range}</span></div>}
                    {selectedLead.timeline && <div className="flex justify-between"><span className="text-gray-500">Timeline</span><span className="font-medium">{selectedLead.timeline}</span></div>}
                    {selectedLead.property_type && <div className="flex justify-between"><span className="text-gray-500">Property</span><span className="font-medium">{selectedLead.property_type}</span></div>}
                    {selectedLead.total_cost && <div className="flex justify-between"><span className="text-gray-500">Est. Value</span><span className="font-medium text-green-600">{formatCurrency(selectedLead.total_cost)}</span></div>}
                  </div>
                </div>

                {/* Message */}
                {selectedLead.message && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Message</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedLead.message}</p>
                  </div>
                )}

                {/* Interests */}
                {selectedLead.interests && selectedLead.interests.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLead.interests.map((interest, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{interest}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage Update */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Move to Stage</h4>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'].map(stage => (
                      <button
                        key={stage}
                        onClick={() => updateLeadStatus(selectedLead.id, stage)}
                        disabled={selectedLead.status === stage}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          selectedLead.status === stage
                            ? `${STAGE_COLORS[stage]} text-white`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        data-testid={`stage-btn-${stage}`}
                      >
                        {STAGE_LABELS[stage]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedLead.notes && selectedLead.notes.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Notes</h4>
                    <div className="space-y-2">
                      {selectedLead.notes.map((note, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">{note.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTime(note.timestamp)} by {note.by}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
