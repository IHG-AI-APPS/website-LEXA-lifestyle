'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  CheckCircle, XCircle, Clock, Play, RefreshCw,
  AlertTriangle, ArrowRight, Activity
} from 'lucide-react'

interface TestRun {
  timestamp: string
  status: 'PASS' | 'FAIL' | 'NO_RUNS'
  passed: number
  failed: number
  errors: number
  total: number
  failures: string[]
  duration_seconds: number | null
  exit_code: number
  message?: string
  report_file?: string
}

interface TestHistory {
  runs: TestRun[]
  total: number
}

export default function TestResultsPage() {
  const [latest, setLatest] = useState<TestRun | null>(null)
  const [history, setHistory] = useState<TestHistory | null>(null)
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)

  const API = process.env.NEXT_PUBLIC_BACKEND_URL

  const headers = {
    'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('admin_token') : ''}`,
    'Content-Type': 'application/json'
  }

  const fetchData = async () => {
    try {
      const [latestRes, historyRes] = await Promise.all([
        fetch(`${API}/api/admin/regression/latest`, { headers }),
        fetch(`${API}/api/admin/regression/history?limit=20`, { headers })
      ])
      const latestData = await latestRes.json()
      const historyData = await historyRes.json()
      setLatest(latestData)
      setHistory(historyData)
    } catch (err) {
      console.error('Failed to fetch test results:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const triggerRun = async () => {
    setRunning(true)
    try {
      const res = await fetch(`${API}/api/admin/regression/run`, {
        method: 'POST',
        headers
      })
      if (res.ok) {
        toast.success('Regression tests triggered! Results will appear in a few minutes.')
        // Poll for new results after a delay
        setTimeout(() => fetchData(), 15000)
        setTimeout(() => { fetchData(); setRunning(false) }, 60000)
      } else {
        toast.error('Failed to trigger tests')
        setRunning(false)
      }
    } catch {
      toast.error('Failed to trigger tests')
      setRunning(false)
    }
  }

  const formatTime = (iso: string) => {
    try {
      const d = new Date(iso)
      return d.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      })
    } catch { return iso }
  }

  const formatDuration = (s: number | null) => {
    if (s === null || s === undefined) return '—'
    if (s < 60) return `${s.toFixed(1)}s`
    return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-3 text-gray-500">
        <RefreshCw size={18} className="animate-spin" /> Loading test results...
      </div>
    )
  }

  const noRuns = latest?.status === 'NO_RUNS' || !latest?.timestamp

  return (
    <div data-testid="test-results-page">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold mb-2" data-testid="test-results-title">
            API Regression Tests
          </h1>
          <p className="text-gray-600">
            Automated backend test results — runs every 4 hours via cron
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
            data-testid="refresh-results-btn"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={triggerRun}
            disabled={running}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            data-testid="run-tests-btn"
          >
            {running ? (
              <><RefreshCw size={16} className="animate-spin" /> Running...</>
            ) : (
              <><Play size={16} /> Run Tests Now</>
            )}
          </button>
        </div>
      </div>

      {noRuns ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-12 text-center"
          data-testid="no-runs-message"
        >
          <Activity className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Test Runs Yet</h2>
          <p className="text-gray-500 mb-6">
            Click "Run Tests Now" to trigger the first regression test, or wait for the next scheduled run.
          </p>
          <button
            onClick={triggerRun}
            disabled={running}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <Play size={18} /> Trigger First Run
          </button>
        </motion.div>
      ) : (
        <>
          {/* Latest Run Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border p-8 mb-8 ${
              latest?.status === 'PASS'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
            data-testid="latest-run-card"
          >
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {latest?.status === 'PASS' ? (
                  <CheckCircle className="text-green-600 flex-shrink-0" size={40} />
                ) : (
                  <XCircle className="text-red-600 flex-shrink-0" size={40} />
                )}
                <div>
                  <h2 className="text-2xl font-bold" data-testid="latest-run-status">
                    {latest?.status === 'PASS' ? 'All Tests Passing' : 'Tests Failing'}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Last run: {formatTime(latest?.timestamp || '')}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-green-700" data-testid="passed-count">
                    {latest?.passed ?? 0}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Passed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-700" data-testid="failed-count">
                    {latest?.failed ?? 0}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Failed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-700" data-testid="error-count">
                    {latest?.errors ?? 0}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Errors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-700" data-testid="duration-display">
                    {formatDuration(latest?.duration_seconds ?? null)}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                </div>
              </div>
            </div>

            {/* Failures list */}
            {latest?.failures && latest.failures.length > 0 && (
              <div className="mt-6 bg-white/70 border border-red-200 p-4" data-testid="failures-list">
                <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} /> Failed Tests
                </h3>
                <ul className="space-y-1 text-sm font-mono text-red-800">
                  {latest.failures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight size={12} className="mt-1 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* History Table */}
          {history && history.runs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200"
              data-testid="test-history-section"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock size={18} /> Run History
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({history.total} total runs)
                  </span>
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="history-table">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                      <th className="text-left px-6 py-3 font-medium text-gray-500">Date</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Passed</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Failed</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Errors</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Total</th>
                      <th className="text-right px-6 py-3 font-medium text-gray-500">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {history.runs.map((run, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3">
                          {run.status === 'PASS' ? (
                            <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-100 px-2.5 py-1 text-xs font-semibold rounded-full">
                              <CheckCircle size={12} /> PASS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-red-700 bg-red-100 px-2.5 py-1 text-xs font-semibold rounded-full">
                              <XCircle size={12} /> FAIL
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-gray-700">{formatTime(run.timestamp)}</td>
                        <td className="px-6 py-3 text-right font-medium text-green-700">{run.passed}</td>
                        <td className="px-6 py-3 text-right font-medium text-red-700">{run.failed}</td>
                        <td className="px-6 py-3 text-right font-medium text-yellow-700">{run.errors}</td>
                        <td className="px-6 py-3 text-right font-medium">{run.total}</td>
                        <td className="px-6 py-3 text-right text-gray-500">
                          {formatDuration(run.duration_seconds)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
