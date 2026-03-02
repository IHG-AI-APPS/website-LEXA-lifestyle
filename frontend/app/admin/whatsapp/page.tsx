'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Send, Trash2, CheckCircle, XCircle, Clock, RefreshCw, Plus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const API = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Template {
  name: string
  description: string
  body_text: string
  variables: string[]
  status: string
  created_at: string
  updated_at: string
}

interface LogEntry {
  phone: string
  template: string
  status: string
  error?: string
  sent_at: string
  sent_by: string
  is_test?: boolean
}

interface WhatsAppStatus {
  enabled: boolean
  has_token: boolean
  api_url: string
  templates: Template[]
  recent_messages: LogEntry[]
  total_sent: number
  total_failed: number
}

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : ''
}

async function apiFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json', ...opts.headers },
  })
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
  return res.json()
}

export default function WhatsAppAdminPage() {
  const [status, setStatus] = useState<WhatsAppStatus | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'logs' | 'test'>('overview')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', body_text: '', variables: '' })
  const [testForm, setTestForm] = useState({ country_code: '+971', phone_number: '', template_name: '', body_values: '' })
  const [testResult, setTestResult] = useState<any>(null)
  const [sending, setSending] = useState(false)

  const loadData = async () => {
    try {
      const [statusData, logsData] = await Promise.all([
        apiFetch('/api/admin/whatsapp/status'),
        apiFetch('/api/admin/whatsapp/logs?limit=50'),
      ])
      setStatus(statusData)
      setLogs(logsData)
    } catch (err) {
      console.error('Failed to load WhatsApp data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const createTemplate = async () => {
    try {
      await apiFetch('/api/admin/whatsapp/templates', {
        method: 'POST',
        body: JSON.stringify({
          ...newTemplate,
          variables: newTemplate.variables.split(',').map(v => v.trim()).filter(Boolean),
        }),
      })
      setNewTemplate({ name: '', description: '', body_text: '', variables: '' })
      setShowCreateForm(false)
      loadData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const updateStatus = async (name: string, newStatus: string) => {
    try {
      await apiFetch(`/api/admin/whatsapp/templates/${name}?status=${newStatus}`, { method: 'PUT' })
      loadData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const deleteTemplate = async (name: string) => {
    if (!confirm(`Delete template "${name}"?`)) return
    try {
      await apiFetch(`/api/admin/whatsapp/templates/${name}`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const sendTest = async () => {
    setSending(true)
    setTestResult(null)
    try {
      const result = await apiFetch('/api/admin/whatsapp/test', {
        method: 'POST',
        body: JSON.stringify({
          ...testForm,
          body_values: testForm.body_values.split(',').map(v => v.trim()).filter(Boolean),
        }),
      })
      setTestResult(result)
      loadData()
    } catch (err: any) {
      setTestResult({ status: 'error', error: err.message })
    } finally {
      setSending(false)
    }
  }

  const statusIcon = (s: string) => {
    if (s === 'approved') return <CheckCircle size={14} className="text-green-500" />
    if (s === 'rejected') return <XCircle size={14} className="text-red-500" />
    return <Clock size={14} className="text-yellow-500" />
  }

  if (loading) return <div className="text-center py-20">Loading WhatsApp dashboard...</div>

  const templates = status?.templates || []

  return (
    <div data-testid="whatsapp-admin-page">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-1 flex items-center gap-3">
            <MessageCircle className="text-green-500" size={28} />
            WhatsApp Dashboard
          </h1>
          <p className="text-gray-600">Manage templates, send test messages, and monitor delivery</p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm" className="gap-2">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="stat-status">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Integration</p>
          <p className={`text-2xl font-bold ${status?.enabled ? 'text-green-600' : 'text-red-600'}`}>
            {status?.enabled ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="stat-templates">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Templates</p>
          <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
          <p className="text-xs text-gray-400">{templates.filter(t => t.status === 'approved').length} approved</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="stat-sent">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Messages Sent</p>
          <p className="text-2xl font-bold text-green-600">{status?.total_sent || 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="stat-failed">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-600">{status?.total_failed || 0}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {(['overview', 'templates', 'logs', 'test'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-[#C9A962] text-[#C9A962]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            data-testid={`tab-${tab}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6" data-testid="tab-content-overview">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Connection Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">API Endpoint</p>
                <p className="font-mono text-xs bg-gray-50 p-2 rounded mt-1 break-all">{status?.api_url}</p>
              </div>
              <div>
                <p className="text-gray-500">Auth Token</p>
                <p className="font-mono text-xs bg-gray-50 p-2 rounded mt-1">{status?.has_token ? '********** (configured)' : 'Not configured'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Recent Messages</h3>
            {logs.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages sent yet</p>
            ) : (
              <div className="space-y-2">
                {logs.slice(0, 5).map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                    <div className="flex items-center gap-3">
                      {log.status === 'success' ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                      <span className="font-mono text-xs">{log.phone}</span>
                      <span className="text-gray-400">{log.template}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{new Date(log.sent_at).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div data-testid="tab-content-templates">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Message Templates</h3>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm" className="gap-2 bg-[#C9A962] hover:bg-[#B8983F] text-white">
              <Plus size={14} /> New Template
            </Button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 space-y-3" data-testid="create-template-form">
              <input
                type="text"
                placeholder="Template name (e.g. booking_reminder)"
                value={newTemplate.name}
                onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                data-testid="input-template-name"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTemplate.description}
                onChange={e => setNewTemplate({ ...newTemplate, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <textarea
                placeholder="Body text (use {{1}}, {{2}} for variables)"
                value={newTemplate.body_text}
                onChange={e => setNewTemplate({ ...newTemplate, body_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24"
              />
              <input
                type="text"
                placeholder="Variable names (comma-separated, e.g. customer_name, date)"
                value={newTemplate.variables}
                onChange={e => setNewTemplate({ ...newTemplate, variables: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={createTemplate} size="sm" className="bg-[#C9A962] hover:bg-[#B8983F] text-white" data-testid="btn-create-template">Create</Button>
                <Button onClick={() => setShowCreateForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          )}

          {/* Templates list */}
          <div className="space-y-3">
            {templates.map(t => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-lg p-5" data-testid={`template-${t.name}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {statusIcon(t.status)}
                      <h4 className="font-semibold text-sm">{t.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${
                        t.status === 'approved' ? 'bg-green-50 text-green-700' :
                        t.status === 'rejected' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{t.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative group">
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        Status <ChevronDown size={12} />
                      </Button>
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block min-w-[120px]">
                        {['approved', 'pending', 'rejected'].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(t.name, s)}
                            className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 capitalize"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTemplate(t.name)}
                      className="text-red-500 hover:text-red-700 hover:border-red-300"
                      data-testid={`delete-${t.name}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 font-mono mb-2">
                  {t.body_text}
                </div>
                <div className="flex gap-2">
                  {t.variables.map(v => (
                    <span key={v} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div data-testid="tab-content-logs">
          <h3 className="font-semibold mb-4">Message Logs ({logs.length})</h3>
          {logs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MessageCircle size={40} className="mx-auto mb-3 opacity-30" />
              <p>No messages sent yet</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Phone</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Template</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Sent By</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3">
                        {log.status === 'success' ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{log.phone}</td>
                      <td className="px-4 py-3">{log.template}</td>
                      <td className="px-4 py-3 text-gray-500">{log.sent_by}{log.is_test ? ' (test)' : ''}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(log.sent_at).toLocaleString()}</td>
                      <td className="px-4 py-3 text-red-500 text-xs max-w-[200px] truncate">{log.error || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Test Tab */}
      {activeTab === 'test' && (
        <div data-testid="tab-content-test">
          <h3 className="font-semibold mb-4">Send Test Message</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Country Code</label>
              <input
                type="text"
                value={testForm.country_code}
                onChange={e => setTestForm({ ...testForm, country_code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                data-testid="test-country-code"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone Number (without country code)</label>
              <input
                type="text"
                placeholder="501234567"
                value={testForm.phone_number}
                onChange={e => setTestForm({ ...testForm, phone_number: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                data-testid="test-phone"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Template</label>
              <select
                value={testForm.template_name}
                onChange={e => setTestForm({ ...testForm, template_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                data-testid="test-template"
              >
                <option value="">Select a template...</option>
                {templates.filter(t => t.status === 'approved').map(t => (
                  <option key={t.name} value={t.name}>{t.name} — {t.description}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Body Values (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. John Doe, Villa Automation"
                value={testForm.body_values}
                onChange={e => setTestForm({ ...testForm, body_values: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                data-testid="test-body-values"
              />
            </div>
            <Button
              onClick={sendTest}
              disabled={sending || !testForm.phone_number || !testForm.template_name}
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              data-testid="btn-send-test"
            >
              <Send size={14} /> {sending ? 'Sending...' : 'Send Test Message'}
            </Button>

            {testResult && (
              <div className={`mt-4 p-4 rounded-lg text-sm ${testResult.status === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`} data-testid="test-result">
                <p className="font-semibold mb-1">{testResult.status === 'success' ? 'Message Sent Successfully' : 'Message Failed'}</p>
                {testResult.error && <p className="text-xs">{testResult.error}</p>}
                {testResult.message_id && <p className="text-xs font-mono">ID: {testResult.message_id}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
