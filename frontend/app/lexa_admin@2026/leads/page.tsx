'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  User,
  Calendar,
  Tag,
  MessageSquare,
  Filter,
  RefreshCw,
  Eye,
  Brain,
  Building2,
  Smartphone,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/Modal'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  source: string
  type?: string
  message?: string
  timestamp: string
  companyName?: string
  projectType?: string
  unitCount?: string
  location?: string
  timeline?: string
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  qualified: 'bg-purple-100 text-purple-700 border-purple-200',
  converted: 'bg-green-100 text-green-700 border-green-200',
  lost: 'bg-gray-100 text-gray-500 border-gray-200'
}

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  lost: 'Lost'
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, source: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/admin/leads/${leadId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, source })
      })
      
      if (response.ok) {
        // Update local state
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus as Lead['status'] } : lead
        ))
      }
    } catch (error) {
      console.error('Failed to update lead status:', error)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'smart-home-quiz': return <Brain className="h-4 w-4 text-purple-500" />
      case 'developer-packages': return <Building2 className="h-4 w-4 text-amber-500" />
      case 'package-builder': return <Smartphone className="h-4 w-4 text-blue-500" />
      case 'contact': return <Mail className="h-4 w-4 text-green-500" />
      case 'consultation': return <Calendar className="h-4 w-4 text-indigo-500" />
      case 'ai-chat': return <MessageSquare className="h-4 w-4 text-cyan-500" />
      case 'exit-intent': return <Tag className="h-4 w-4 text-orange-500" />
      case 'calculator': return <FileText className="h-4 w-4 text-pink-500" />
      default: return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'smart-home-quiz': return 'Smart Home Quiz'
      case 'developer-packages': return 'Developer Inquiry'
      case 'package-builder': return 'Package Builder'
      case 'contact': return 'Contact Form'
      case 'consultation': return 'Consultation'
      case 'ai-chat': return 'AI Chat'
      case 'exit-intent': return 'Exit Popup'
      case 'calculator': return 'Calculator'
      case 'general': return 'General'
      default: return source
    }
  }

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'quiz_results': return 'bg-purple-100 text-purple-700'
      case 'bulk_inquiry': return 'bg-amber-100 text-amber-700'
      case 'package_quote': return 'bg-blue-100 text-blue-700'
      case 'contact_form': return 'bg-green-100 text-green-700'
      case 'consultation_request': return 'bg-indigo-100 text-indigo-700'
      case 'chat_qualified': return 'bg-cyan-100 text-cyan-700'
      case 'exit_popup': return 'bg-orange-100 text-orange-700'
      case 'quote_request': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(l => l.source === filter)

  const sources = ['all', ...Array.from(new Set(leads.map(l => l.source)))]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">All Leads</h1>
          <p className="text-gray-600">View and manage leads from all sources</p>
        </div>
        <Button onClick={fetchLeads} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{leads.length}</div>
          <div className="text-sm text-gray-500">Total Leads</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="text-3xl font-bold text-green-600">
            {leads.filter(l => l.source === 'contact' || l.source === 'consultation').length}
          </div>
          <div className="text-sm text-green-600">Contact Forms</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="text-3xl font-bold text-purple-600">
            {leads.filter(l => l.source === 'smart-home-quiz').length}
          </div>
          <div className="text-sm text-purple-600">Quiz Results</div>
        </div>
        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
          <div className="text-3xl font-bold text-cyan-600">
            {leads.filter(l => l.source === 'ai-chat').length}
          </div>
          <div className="text-sm text-cyan-600">AI Chat Leads</div>
        </div>
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
          <div className="text-3xl font-bold text-pink-600">
            {leads.filter(l => l.source === 'calculator').length}
          </div>
          <div className="text-sm text-pink-600">Calculator Quotes</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Filter:</span>
        {sources.map(source => (
          <button
            key={source}
            onClick={() => setFilter(source)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === source
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {source === 'all' ? 'All' : getSourceLabel(source)}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Lead</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Source</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{lead.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        {lead.phone && <div className="text-xs text-gray-400">{lead.phone}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getSourceIcon(lead.source)}
                      <span className="text-sm">{getSourceLabel(lead.source)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status || 'new'}
                      onChange={(e) => updateLeadStatus(lead.id, lead.source, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border cursor-pointer ${statusColors[lead.status || 'new']}`}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(lead.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      <Modal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Lead Details"
        size="md"
      >
        {selectedLead && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">{selectedLead.name || 'Unknown'}</div>
                  <div className="flex items-center gap-2">
                    {getSourceIcon(selectedLead.source)}
                    <span className="text-sm text-gray-500">{getSourceLabel(selectedLead.source)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email</div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                </div>
                {selectedLead.phone && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {selectedLead.companyName && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Company</div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span>{selectedLead.companyName}</span>
                  </div>
                </div>
              )}

              {selectedLead.projectType && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Project Type</div>
                    <span>{selectedLead.projectType}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Unit Count</div>
                    <span>{selectedLead.unitCount}</span>
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Message / Details</div>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Submitted {new Date(selectedLead.timestamp).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
        )}
      </Modal>
    </div>
  )
}
