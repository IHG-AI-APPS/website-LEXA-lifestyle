'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ArrowRight, CheckCircle2, Clock, Target, Layers, Download, Mail, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface BOQSummaryProps {
  sessionId: string
  selectedProposal: any
  onComplete: () => void
}

export default function BOQSummary({ sessionId, selectedProposal, onComplete }: BOQSummaryProps) {
  const proposal = selectedProposal?.proposal
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailForm, setEmailForm] = useState({ name: '', email: '' })
  const [resumeLink, setResumeLink] = useState<string | null>(null)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(`${API_URL}/api/project-builder/generate-boq-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `LEXA_BOQ_${sessionId.slice(0, 8)}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('PDF downloaded successfully')
    } catch (error) {
      toast.error('Failed to download PDF')
      console.error('PDF download error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEmailBOQ = async () => {
    if (!emailForm.name || !emailForm.email) {
      toast.error('Please enter your name and email')
      return
    }
    
    setIsEmailing(true)
    try {
      const response = await fetch(`${API_URL}/api/project-builder/email-boq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          recipient_name: emailForm.name,
          recipient_email: emailForm.email
        })
      })
      
      const data = await response.json()
      
      if (data.status === 'success' || data.status === 'mock') {
        toast.success(`Proposal sent to ${emailForm.email}`)
        setShowEmailModal(false)
      } else {
        throw new Error(data.message || 'Failed to send email')
      }
    } catch (error) {
      toast.error('Failed to send email')
      console.error('Email error:', error)
    } finally {
      setIsEmailing(false)
    }
  }

  const handleSaveProgress = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`${API_URL}/api/project-builder/save-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })
      
      const data = await response.json()
      
      if (data.resume_url) {
        setResumeLink(data.resume_url)
        await navigator.clipboard.writeText(data.resume_url)
        toast.success('Progress saved! Resume link copied to clipboard')
      }
    } catch (error) {
      toast.error('Failed to save progress')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-50 rounded-full mb-6">
            <FileText className="w-5 h-5 text-green-600" />
            <span className="text-xs uppercase tracking-widest text-green-900 font-medium">
              Bill of Quantities Framework
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">Summary</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {proposal?.name} • {proposal?.feature_count} Features
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="gap-2"
            data-testid="download-pdf-btn"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowEmailModal(true)}
            className="gap-2"
            data-testid="email-boq-btn"
          >
            <Mail className="w-4 h-4" />
            Email Proposal
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveProgress}
            disabled={isSaving}
            className="gap-2"
            data-testid="save-progress-btn"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Progress
          </Button>
        </div>

        {/* Resume Link Display */}
        {resumeLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-sm text-blue-800 mb-2">Your resume link (valid for 30 days):</p>
            <code className="text-xs bg-white px-3 py-1 rounded border text-blue-600 break-all">
              {resumeLink}
            </code>
          </motion.div>
        )}

        {/* Summary Grid */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h3 className="text-sm font-medium mb-6 uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">Architecture Overview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Tier Mix</div>
                <div className="text-base text-gray-900 dark:text-white font-medium">{proposal?.tier_mix}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">System Count</div>
                <div className="text-base text-gray-900 dark:text-white font-medium font-mono">{proposal?.system_count} Integrated Systems</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Estimated Timeline</div>
                <div className="text-base text-gray-900 dark:text-white font-medium font-mono">{proposal?.estimated_timeline}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-1">Complexity Score</div>
                <div className="text-base text-gray-900 dark:text-white font-medium font-mono">{proposal?.complexity_score}/10</div>
              </div>
            </div>
          </div>

          {/* Systems List */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-4">Included Systems</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {proposal?.systems?.map((system: any, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>{system.domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="bg-gradient-to-br from-[#C9A962]/5 to-[#A68B4B]/5 border border-blue-200 p-8 mb-8">
          <h3 className="text-sm font-medium mb-4 uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">Key Highlights</h3>
          <div className="space-y-3">
            {proposal?.highlights?.map((highlight: string, index: number) => (
              <div key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-12">
          <h3 className="text-sm font-medium mb-4 uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">Next Steps</h3>
          <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-mono font-medium">01.</span>
              <span>Site survey and detailed measurements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-mono font-medium">02.</span>
              <span>Final system design and engineering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-mono font-medium">03.</span>
              <span>Detailed quotation with itemized pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-mono font-medium">04.</span>
              <span>Project timeline and phasing plan</span>
            </li>
          </ol>
        </div>

        {/* Continue */}
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
            data-testid="submit-consultation-btn"
          >
            Submit & Get Expert Consultation
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Email Your Proposal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We&apos;ll send a detailed BOQ with PDF attachment to your email.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Smith"
                  data-testid="email-modal-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                  data-testid="email-modal-email"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEmailModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEmailBOQ}
                disabled={isEmailing}
                className="flex-1 gap-2"
                data-testid="email-modal-send"
              >
                {isEmailing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                Send Email
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
