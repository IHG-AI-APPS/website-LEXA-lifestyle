'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, Phone, User } from 'lucide-react'
import { getConsultationSubmissions, getContactSubmissions } from '@/lib/adminApi'

export default function SubmissionsPage() {
  const [consultations, setConsultations] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'consultations' | 'contacts'>('consultations')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getConsultationSubmissions(),
      getContactSubmissions()
    ])
      .then(([consData, contData]) => {
        setConsultations(consData)
        setContacts(contData)
      })
      .catch(err => console.error('Failed to load submissions:', err))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="text-center py-20">Loading submissions...</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2">Form Submissions</h1>
        <p className="text-gray-600">View all consultation and contact form submissions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('consultations')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'consultations'
              ? 'border-b-2 border-charcoal text-charcoal'
              : 'text-gray-600 hover:text-charcoal'
          }`}
        >
          Consultations ({consultations.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'border-b-2 border-charcoal text-charcoal'
              : 'text-gray-600 hover:text-charcoal'
          }`}
        >
          Contact Messages ({contacts.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'consultations' ? (
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No consultation submissions yet
            </div>
          ) : (
            consultations.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white p-6 border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{submission.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                      {submission.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${submission.phone}`} className="hover:text-charcoal">
                      {submission.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(submission.timestamp)}</span>
                  </div>
                </div>
                {submission.persona && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Persona: </span>
                    <span className="text-sm font-medium">{submission.persona}</span>
                  </div>
                )}
                {submission.message && (
                  <div className="mt-4 p-4 bg-gray-50">
                    <div className="text-sm text-gray-600 mb-1">Message:</div>
                    <p className="text-gray-800">{submission.message}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No contact submissions yet
            </div>
          ) : (
            contacts.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white p-6 border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{submission.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                      {submission.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${submission.phone}`} className="hover:text-charcoal">
                      {submission.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(submission.timestamp)}</span>
                  </div>
                </div>
                {submission.subject && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Subject: </span>
                    <span className="font-medium">{submission.subject}</span>
                  </div>
                )}
                {submission.message && (
                  <div className="mt-4 p-4 bg-gray-50">
                    <div className="text-sm text-gray-600 mb-1">Message:</div>
                    <p className="text-gray-800">{submission.message}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
