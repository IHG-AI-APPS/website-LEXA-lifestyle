'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  Mail,
  Phone,
  User,
  Package,
  Calendar,
  MapPin,
  Building2,
  Check,
  AlertCircle,
  Loader2,
  Eye,
  X,
  FileText,
  Wallet,
  Home,
  Settings,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Project {
  id: string
  session_id: string
  quote_ref: string
  project_details: {
    projectType?: string
    propertyType?: string
    propertySize?: string
    customSize?: number
    bedrooms?: number
    floors?: number
    budget?: string
    timeline?: string
    location?: string
  } | null
  selected_categories: string[]
  must_have_features: string[]
  should_have_features: string[]
  protocol_type: string
  selected_protocols: string[]
  selected_systems: string[]
  selected_package: string
  package_price: string
  upgrade_features: string[]
  total_upgrade_price: number
  total_features: number
  status: string
  created_at: string
  updated_at: string
}

interface Consultation {
  id: string
  quote_ref: string
  session_id: string
  project_id: string | null
  confirmation_number: string
  name: string
  email: string
  phone: string
  preferred_date: string | null
  preferred_time: string
  notes: string | null
  project_type: string | null
  property_type: string | null
  selected_package: string | null
  total_features: number
  status: string
  created_at: string
  updated_at: string
}

export default function SmartHomeLeadsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [activeTab, setActiveTab] = useState<'projects' | 'consultations'>('consultations')
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)

  useEffect(() => {
    fetchData()
  }, [statusFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoading(true)
    try {
      const [projectsRes, consultationsRes] = await Promise.all([
        fetch(`${API_URL}/api/smart-home/projects?limit=100${statusFilter ? `&status=${statusFilter}` : ''}`),
        fetch(`${API_URL}/api/smart-home/consultations?limit=100${statusFilter ? `&status=${statusFilter}` : ''}`)
      ])

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData.projects || [])
      }

      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json()
        setConsultations(consultationsData.consultations || [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatLabel = (str: string | undefined | null) => {
    if (!str) return 'N/A'
    return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      saved: 'bg-blue-100 text-blue-700',
      consultation_booked: 'bg-green-100 text-green-700',
      converted: 'bg-purple-100 text-purple-700',
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2">Smart Home Builder Leads</h1>
        <p className="text-gray-600">View saved projects and consultation bookings from the Smart Project Builder</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Projects</div>
          <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Consultations</div>
          <div className="text-2xl font-bold text-green-600">{consultations.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {consultations.filter(c => c.status === 'pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold text-purple-600">
            {projects.length > 0 ? Math.round((consultations.length / projects.length) * 100) : 0}%
          </div>
        </div>
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
          <Calendar className="w-4 h-4 inline mr-2" />
          Consultations ({consultations.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'projects'
              ? 'border-b-2 border-charcoal text-charcoal'
              : 'text-gray-600 hover:text-charcoal'
          }`}
        >
          <Package className="w-4 h-4 inline mr-2" />
          Saved Projects ({projects.length})
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-charcoal"
        >
          <option value="">All Statuses</option>
          {activeTab === 'consultations' ? (
            <>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </>
          ) : (
            <>
              <option value="saved">Saved</option>
              <option value="consultation_booked">Consultation Booked</option>
              <option value="converted">Converted</option>
            </>
          )}
        </select>
      </div>

      {/* Content */}
      {activeTab === 'consultations' ? (
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <div className="text-center py-12 text-gray-600 bg-white rounded-lg border border-gray-200">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              No consultation bookings yet
            </div>
          ) : (
            consultations.map((consultation, index) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {consultation.confirmation_number}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(consultation.status)}`}>
                        {formatLabel(consultation.status)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{consultation.name}</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedConsultation(consultation)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${consultation.email}`} className="text-blue-600 hover:underline text-sm">
                      {consultation.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${consultation.phone}`} className="hover:text-charcoal text-sm">
                      {consultation.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(consultation.created_at)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                  {consultation.selected_package && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                      {consultation.selected_package} Package
                    </span>
                  )}
                  {consultation.property_type && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {formatLabel(consultation.property_type)}
                    </span>
                  )}
                  {consultation.total_features > 0 && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      {consultation.total_features} features
                    </span>
                  )}
                  {consultation.preferred_date && (
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
                      Preferred: {consultation.preferred_date} ({consultation.preferred_time})
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-600 bg-white rounded-lg border border-gray-200">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              No saved projects yet
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {project.quote_ref}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(project.status)}`}>
                        {formatLabel(project.status)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">
                      {formatLabel(project.project_details?.propertyType)} - {formatLabel(project.project_details?.projectType)}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm">{project.project_details?.location || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-gray-400" />
                    <span className="text-sm">{formatLabel(project.project_details?.budget)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-400" />
                    <span className="text-sm">{project.selected_package} Package</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(project.created_at)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                    {project.must_have_features.length} Must-Have
                  </span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                    {project.should_have_features.length} Should-Have
                  </span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                    {project.upgrade_features.length} Upgrades
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {formatLabel(project.protocol_type)}
                  </span>
                  {project.selected_systems.map(system => (
                    <span key={system} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {system}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Project Details</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedProject.quote_ref}</p>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Project Info */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Project Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Type:</span> {formatLabel(selectedProject.project_details?.projectType)}</div>
                  <div><span className="text-gray-500">Property:</span> {formatLabel(selectedProject.project_details?.propertyType)}</div>
                  <div><span className="text-gray-500">Size:</span> {selectedProject.project_details?.customSize || selectedProject.project_details?.propertySize}</div>
                  <div><span className="text-gray-500">Location:</span> {selectedProject.project_details?.location || 'N/A'}</div>
                  <div><span className="text-gray-500">Bedrooms:</span> {selectedProject.project_details?.bedrooms}</div>
                  <div><span className="text-gray-500">Floors:</span> {selectedProject.project_details?.floors}</div>
                  <div><span className="text-gray-500">Budget:</span> {formatLabel(selectedProject.project_details?.budget)}</div>
                  <div><span className="text-gray-500">Timeline:</span> {formatLabel(selectedProject.project_details?.timeline)}</div>
                </div>
              </div>

              {/* System Config */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> System Configuration
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Protocol:</span> {formatLabel(selectedProject.protocol_type)}</div>
                  <div><span className="text-gray-500">Systems:</span> {selectedProject.selected_systems.join(', ')}</div>
                </div>
              </div>

              {/* Package */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Selected Package
                </h4>
                <div className="text-2xl font-bold">{selectedProject.selected_package}</div>
                <div className="text-lg opacity-90">{selectedProject.package_price}</div>
                {selectedProject.total_upgrade_price > 0 && (
                  <div className="mt-2 text-sm opacity-80">
                    + AED {selectedProject.total_upgrade_price.toLocaleString()} in upgrades
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Features ({selectedProject.total_features} total)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{selectedProject.must_have_features.length}</div>
                    <div className="text-xs text-red-700">Must-Have</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedProject.should_have_features.length}</div>
                    <div className="text-xs text-orange-700">Should-Have</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedProject.upgrade_features.length}</div>
                    <div className="text-xs text-purple-700">Upgrades</div>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-400 pt-4 border-t">
                <div>Created: {formatDate(selectedProject.created_at)}</div>
                <div>Updated: {formatDate(selectedProject.updated_at)}</div>
                <div>Session: {selectedProject.session_id}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Consultation Details</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedConsultation.confirmation_number}</p>
              </div>
              <button onClick={() => setSelectedConsultation(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" /> Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{selectedConsultation.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${selectedConsultation.email}`} className="text-blue-600 hover:underline">
                      {selectedConsultation.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${selectedConsultation.phone}`} className="hover:text-charcoal">
                      {selectedConsultation.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Booking Preferences */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Booking Preferences
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Date:</span> {selectedConsultation.preferred_date || 'Not specified'}</div>
                  <div><span className="text-gray-500">Time:</span> {formatLabel(selectedConsultation.preferred_time)}</div>
                </div>
              </div>

              {/* Project Summary */}
              {(selectedConsultation.project_type || selectedConsultation.property_type) && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Project Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Project:</span> {formatLabel(selectedConsultation.project_type)}</div>
                    <div><span className="text-gray-500">Property:</span> {formatLabel(selectedConsultation.property_type)}</div>
                    <div><span className="text-gray-500">Package:</span> {selectedConsultation.selected_package || 'N/A'}</div>
                    <div><span className="text-gray-500">Features:</span> {selectedConsultation.total_features}</div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedConsultation.notes && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Notes
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    {selectedConsultation.notes}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(selectedConsultation.status)}`}>
                  {formatLabel(selectedConsultation.status)}
                </span>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-400 pt-4 border-t">
                <div>Quote Ref: {selectedConsultation.quote_ref}</div>
                <div>Created: {formatDate(selectedConsultation.created_at)}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => window.open(`mailto:${selectedConsultation.email}?subject=Re: LEXA Smart Home Consultation - ${selectedConsultation.confirmation_number}`)}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedConsultation.phone}`)}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
