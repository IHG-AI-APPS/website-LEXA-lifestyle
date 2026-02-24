/**
 * AI Recommendation Component
 * Final step showing AI-calculated package with pricing and suggestions
 * Features: PDF Export, Save to Dashboard, Consultation Booking
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Package,
  Check,
  ChevronRight,
  ChevronLeft,
  Crown,
  Star,
  Zap,
  Download,
  Mail,
  Lightbulb,
  TrendingUp,
  Shield,
  Calendar,
  Phone,
  X,
  Save,
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  Wallet,
  LayoutGrid,
  Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface PackageOption {
  name: string
  description: string
  features_included: number
  price_indicator: string
  recommended: boolean
}

interface ProjectSummary {
  project_type?: string
  property_type?: string
  size?: string | number
  bedrooms?: number
  floors?: number
  budget?: string
  timeline?: string
  location?: string
}

interface RecommendationData {
  session_id: string
  summary: {
    total_features: number
    feature_breakdown: Record<string, number>
    complexity_level: string
    protocol_type: string
    selected_protocols: string[]
    selected_systems: string[]
  }
  project_summary?: ProjectSummary
  packages: PackageOption[]
  ai_insights: string[]
}

interface ProjectDetails {
  projectType: string
  propertyType: string
  propertySize: string
  customSize?: number
  bedrooms: number
  floors: number
  budget: string
  timeline: string
  location: string
  specialRequirements: string
}

interface AIRecommendationProps {
  sessionId: string
  selectedFeatures: Record<string, string[]>
  protocolType: string
  selectedProtocols: string[]
  selectedSystems: string[]
  onComplete: (selectedPackage: string) => void
  onBack: () => void
  projectDetails?: ProjectDetails | null
}

export default function AIRecommendation({
  sessionId,
  selectedFeatures,
  protocolType,
  selectedProtocols,
  selectedSystems,
  onComplete,
  onBack,
  projectDetails
}: AIRecommendationProps) {
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'morning',
    notes: ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)

  // Fetch AI recommendation
  useEffect(() => {
    const fetchRecommendation = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${BACKEND_URL}/api/smart-home/calculate-package`, {
          method: 'POST',
          cache: 'no-store',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({
            session_id: sessionId,
            selected_features: selectedFeatures,
            protocol_type: protocolType,
            selected_protocols: selectedProtocols,
            selected_systems: selectedSystems,
            project_details: projectDetails
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          setRecommendation(data)
          const recommended = data.packages.find((p: PackageOption) => p.recommended)
          if (recommended) {
            setSelectedPackage(recommended.name)
          }
        }
      } catch (err) {
        console.error('Error fetching recommendation:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendation()
  }, [sessionId, selectedFeatures, protocolType, selectedProtocols, selectedSystems, projectDetails])

  // Save to Dashboard
  const handleSaveToDashboard = async () => {
    setSaving(true)
    try {
      const projectData = {
        id: sessionId,
        title: `${projectDetails?.propertyType || 'Smart Home'} Project - ${projectDetails?.location || 'Dubai'}`,
        created_at: new Date().toISOString(),
        status: 'draft',
        project_details: projectDetails,
        selected_features: selectedFeatures,
        protocol_type: protocolType,
        selected_protocols: selectedProtocols,
        selected_systems: selectedSystems,
        selected_package: selectedPackage,
        recommendation: recommendation
      }
      
      // Save to localStorage for dashboard
      const existingProjects = JSON.parse(localStorage.getItem('smart_builder_projects') || '[]')
      const updatedProjects = [projectData, ...existingProjects.filter((p: any) => p.id !== sessionId)]
      localStorage.setItem('smart_builder_projects', JSON.stringify(updatedProjects.slice(0, 20)))
      
      setSaved(true)
      toast.success('Project saved to dashboard!')
    } catch (error) {
      toast.error('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  // Export PDF
  const handleExportPDF = async () => {
    setExporting(true)
    try {
      // Generate PDF content
      const pdfContent = generatePDFContent()
      
      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Smart_Home_Quote_${sessionId.slice(-8)}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success('Quote exported successfully!')
    } catch (error) {
      toast.error('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  // Generate PDF HTML content - LEXA Brand Standards
  const generatePDFContent = () => {
    const pkg = recommendation?.packages.find(p => p.name === selectedPackage)
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Smart Home Quote - LEXA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body { 
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 0;
      color: #1a1a1a; 
      line-height: 1.5;
      font-size: 13px;
    }
    
    /* Letterhead Header */
    .letterhead {
      padding: 30px 40px 20px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .logo-section { display: flex; flex-direction: column; }
    .logo-text { font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #000; }
    .logo-subtitle { font-size: 11px; letter-spacing: 6px; color: #666; margin-top: 2px; }
    
    .company-info { text-align: right; font-size: 11px; color: #444; line-height: 1.8; }
    .company-info strong { display: block; font-size: 12px; color: #000; margin-bottom: 4px; }
    .categories-bar { font-size: 10px; letter-spacing: 4px; color: #888; margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; }
    
    /* Quote Title */
    .quote-title-section {
      background: #000;
      color: #fff;
      padding: 25px 40px;
      text-align: center;
    }
    .quote-title { font-size: 18px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; }
    .quote-ref { font-size: 14px; color: #C9A962; margin-top: 8px; font-weight: 500; }
    .quote-date { font-size: 11px; color: #888; margin-top: 4px; }
    
    /* Content */
    .content { padding: 30px 40px; }
    
    .section { margin-bottom: 25px; }
    .section-header { display: flex; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #000; padding-bottom: 8px; }
    .section-header h2 { font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #000; }
    
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-item { padding: 12px 15px; background: #f8f8f8; border-left: 3px solid #C9A962; }
    .grid-item .label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
    .grid-item .value { font-size: 14px; font-weight: 600; color: #000; margin-top: 3px; }
    
    /* Package Box */
    .package-box {
      background: #000;
      color: #fff;
      padding: 25px 30px;
      margin: 25px 0;
      text-align: center;
    }
    .package-box h3 { font-size: 22px; font-weight: 600; color: #C9A962; margin-bottom: 8px; }
    .package-box .description { font-size: 12px; color: #888; margin-bottom: 15px; }
    .package-box .price { font-size: 28px; font-weight: 700; color: #fff; }
    .package-box .features-note { font-size: 11px; color: #888; margin-top: 8px; }
    
    /* AI Insights */
    .insights-box {
      background: #FFF8E7;
      border: 1px solid #C9A962;
      padding: 20px 25px;
      margin: 20px 0;
    }
    .insights-box h4 { font-size: 12px; font-weight: 600; color: #8B6914; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
    .insights-box ul { list-style: none; }
    .insights-box li { margin: 8px 0; padding-left: 15px; position: relative; font-size: 12px; color: #666; }
    .insights-box li:before { content: "✓"; position: absolute; left: 0; color: #C9A962; font-weight: bold; }
    
    /* Total Box */
    .total-box {
      background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
      color: #fff;
      padding: 25px 30px;
      margin: 25px 0;
      text-align: center;
    }
    .total-box .label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #888; }
    .total-box .amount { font-size: 32px; font-weight: 700; color: #C9A962; margin-top: 8px; }
    .total-box .validity { font-size: 11px; color: #666; margin-top: 10px; }
    
    /* Footer */
    .footer {
      background: #f8f8f8;
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    .footer-contact { font-size: 12px; color: #444; margin-bottom: 10px; }
    .footer-contact a { color: #000; text-decoration: none; font-weight: 500; }
    .footer-brands { font-size: 9px; color: #999; letter-spacing: 2px; text-transform: uppercase; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; }
    
    @media print { body { padding: 0; } .letterhead, .content, .footer { padding-left: 30px; padding-right: 30px; } }
  </style>
</head>
<body>
  <!-- Letterhead -->
  <div class="letterhead">
    <div class="logo-section">
      <div class="logo-text">LEXA</div>
      <div class="logo-subtitle">LIFE STYLE</div>
    </div>
    <div class="company-info">
      <strong>LEXA LIFESTYLE TRADING LLC</strong>
      Al Quoz IND 1, SZR - Interchange No 3 - Dubai<br>
      info@lexalifestyle.com<br>
      +971 4 267 0470<br>
      TRN: 104472899400003
      <div class="categories-bar">LIGHTING • ELECTRONICS • AUTOMATION • AUDIO</div>
    </div>
  </div>
  
  <!-- Quote Title -->
  <div class="quote-title-section">
    <div class="quote-title">Smart Home Quotation</div>
    <div class="quote-ref">Reference: ${sessionId.slice(-8).toUpperCase()}</div>
    <div class="quote-date">Generated: ${new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>
  
  <!-- Content -->
  <div class="content">
    <!-- Project Details -->
    <div class="section">
      <div class="section-header"><h2>Project Details</h2></div>
      <div class="grid">
        <div class="grid-item"><div class="label">Project Type</div><div class="value">${projectDetails?.projectType || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Property Type</div><div class="value">${projectDetails?.propertyType || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Property Size</div><div class="value">${projectDetails?.customSize || projectDetails?.propertySize || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Location</div><div class="value">${projectDetails?.location || 'Dubai, UAE'}</div></div>
        <div class="grid-item"><div class="label">Bedrooms</div><div class="value">${projectDetails?.bedrooms || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Floors</div><div class="value">${projectDetails?.floors || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Budget Range</div><div class="value">${projectDetails?.budget || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Timeline</div><div class="value">${projectDetails?.timeline || 'N/A'}</div></div>
      </div>
    </div>
    
    <!-- System Configuration -->
    <div class="section">
      <div class="section-header"><h2>System Configuration</h2></div>
      <div class="grid">
        <div class="grid-item"><div class="label">Total Features</div><div class="value">${recommendation?.summary.total_features || 0} Features</div></div>
        <div class="grid-item"><div class="label">Protocol Type</div><div class="value">${recommendation?.summary.protocol_type || 'N/A'}</div></div>
        <div class="grid-item"><div class="label">Must Have Features</div><div class="value">${recommendation?.summary.feature_breakdown.must_have || 0}</div></div>
        <div class="grid-item"><div class="label">Should Have Features</div><div class="value">${recommendation?.summary.feature_breakdown.should_have || 0}</div></div>
        <div class="grid-item"><div class="label">Selected Systems</div><div class="value">${selectedSystems.join(', ') || 'To be determined'}</div></div>
        <div class="grid-item"><div class="label">Complexity Level</div><div class="value">${recommendation?.summary.complexity_level || 'N/A'}</div></div>
      </div>
    </div>
    
    <!-- Package -->
    <div class="package-box">
      <h3>${pkg?.name || selectedPackage} Package</h3>
      <p class="description">${pkg?.description || 'Comprehensive smart home solution'}</p>
      <div class="price">${pkg?.price_indicator || 'Contact for pricing'}</div>
      <p class="features-note">${pkg?.features_included || 0} features included</p>
    </div>
    
    <!-- AI Insights -->
    <div class="insights-box">
      <h4>AI Recommendations</h4>
      <ul>
        ${recommendation?.ai_insights.map(i => `<li>${i}</li>`).join('') || '<li>Personalized recommendations will be provided during consultation</li>'}
      </ul>
    </div>
    
    <!-- Total -->
    <div class="total-box">
      <div class="label">Estimated Investment</div>
      <div class="amount">${pkg?.price_indicator || 'Contact for pricing'}</div>
      <div class="validity">Quote valid for 30 days from date of issue</div>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="footer">
    <div class="footer-contact">
      <a href="mailto:info@lexalifestyle.com">info@lexalifestyle.com</a> &nbsp;|&nbsp; 
      <a href="tel:+97142670470">+971 4 267 0470</a> &nbsp;|&nbsp; 
      <a href="https://lexalifestyle.com">www.lexalifestyle.com</a>
    </div>
    <div class="footer-brands">
      Control4 • Lutron • Sonos • B&W • KEF • Sony • JBL Synthesis • Crestron • Savant
    </div>
  </div>
</body>
</html>
    `
  }

  // Handle consultation booking
  const handleBookConsultation = async () => {
    if (!consultationForm.name || !consultationForm.email || !consultationForm.phone) {
      toast.error('Please fill in all required fields')
      return
    }
    
    try {
      // Save consultation request
      const consultationData = {
        ...consultationForm,
        session_id: sessionId,
        project_details: projectDetails,
        selected_package: selectedPackage,
        timestamp: new Date().toISOString()
      }
      
      // Store locally (in production, this would go to backend)
      const existingRequests = JSON.parse(localStorage.getItem('consultation_requests') || '[]')
      localStorage.setItem('consultation_requests', JSON.stringify([consultationData, ...existingRequests]))
      
      toast.success('Consultation request submitted! We will contact you shortly.')
      setShowConsultationModal(false)
      onComplete(selectedPackage)
    } catch (error) {
      toast.error('Failed to submit consultation request')
    }
  }

  // Package icons and colors
  const PACKAGE_CONFIG: Record<string, { icon: typeof Crown; gradient: string }> = {
    Essential: { icon: Zap, gradient: 'from-emerald-500 to-emerald-600' },
    Premium: { icon: Star, gradient: 'from-purple-500 to-purple-600' },
    Ultimate: { icon: Crown, gradient: 'from-amber-500 to-amber-600' }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-6">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="font-semibold text-lg">AI is calculating your package...</span>
          </div>
          <div className="mt-8 animate-pulse">
            <div className="h-32 bg-gray-100 rounded-xl mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-gray-100 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Unable to generate recommendation. Please try again.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-4"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI Recommendation</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          Your Personalized Smart Home Package
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Based on your {recommendation.summary.total_features} selected features, 
          we have curated the perfect package options for your project.
        </motion.p>
      </div>

      {/* Project Summary */}
      {projectDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 mb-8"
        >
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Your Project
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{projectDetails.propertyType} • {projectDetails.projectType?.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{projectDetails.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{projectDetails.budget?.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{projectDetails.timeline?.replace('_', ' ')}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{recommendation.summary.total_features}</div>
          <div className="text-sm text-gray-500">Features</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 capitalize">{recommendation.summary.protocol_type}</div>
          <div className="text-sm text-gray-500">Protocol</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSystems.length}</div>
          <div className="text-sm text-gray-500">Systems</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 capitalize">{recommendation.summary.complexity_level}</div>
          <div className="text-sm text-gray-500">Complexity</div>
        </div>
      </motion.div>

      {/* Package Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Choose Your Package
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCompareModal(true)}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
            data-testid="compare-packages-btn"
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Compare Packages
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendation.packages.map((pkg, index) => {
            const config = PACKAGE_CONFIG[pkg.name] || PACKAGE_CONFIG.Essential
            const Icon = config.icon
            const isSelected = selectedPackage === pkg.name
            
            return (
              <motion.button
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-xl ring-2 ring-purple-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-lg'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </div>
                )}

                <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                }`}>
                  {isSelected && <Check className="w-5 h-5" />}
                </div>

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h4>
                <div className="text-2xl font-bold text-gray-900 mb-3">{pkg.price_indicator}</div>
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-green-500" />
                  {pkg.features_included} features included
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 mb-10"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          AI Insights
        </h3>
        <div className="space-y-3">
          {recommendation.ai_insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-start gap-3 bg-white rounded-lg p-4"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-300">{insight}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feature Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl p-6 mb-10"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Feature Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(recommendation.summary.feature_breakdown).map(([tier, count]) => {
            const tierLabels: Record<string, { label: string; color: string }> = {
              must_have: { label: 'Must Have', color: 'bg-red-500' },
              should_have: { label: 'Should Have', color: 'bg-orange-500' },
              could_have: { label: 'Could Have', color: 'bg-yellow-500' },
              want_to_have: { label: 'Want to Have', color: 'bg-purple-500' }
            }
            const config = tierLabels[tier] || { label: tier, color: 'bg-gray-500' }
            
            return (
              <div key={tier} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{config.label}</div>
                  <div className="text-xs text-gray-500">{count} features</div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPDF}
              disabled={exporting}
              className="hidden md:flex"
            >
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export Quote'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveToDashboard}
              disabled={saving || saved}
              className="hidden md:flex"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Project'}
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button 
              onClick={() => {
                // Find selected package price
                const pkg = recommendation?.packages.find(p => p.name === selectedPackage)
                onComplete(selectedPackage)
              }}
              disabled={!selectedPackage}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white"
            >
              Continue to Upgrades
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showConsultationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConsultationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book a Consultation</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <Input
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <Input
                    type="tel"
                    value={consultationForm.phone}
                    onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                    placeholder="+971 50 XXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <Input
                    type="date"
                    value={consultationForm.preferredDate}
                    onChange={(e) => setConsultationForm({...consultationForm, preferredDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['morning', 'afternoon', 'evening'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setConsultationForm({...consultationForm, preferredTime: time})}
                        className={`p-2 rounded-lg border-2 text-sm font-medium capitalize ${
                          consultationForm.preferredTime === time
                            ? 'border-purple-500 bg-purple-50 text-purple-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={consultationForm.notes}
                    onChange={(e) => setConsultationForm({...consultationForm, notes: e.target.value})}
                    placeholder="Any specific requirements or questions..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowConsultationModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={handleBookConsultation}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Our team will contact you within 24 hours to confirm your consultation.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Packages Modal */}
      <AnimatePresence>
        {showCompareModal && recommendation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowCompareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-5xl w-full shadow-2xl my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Packages</h3>
                  <p className="text-gray-500 text-sm mt-1">See what&apos;s included in each package</p>
                </div>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Package Headers */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="font-medium text-gray-500">Feature</div>
                {recommendation.packages.map((pkg) => {
                  const config = PACKAGE_CONFIG[pkg.name] || PACKAGE_CONFIG.Essential
                  const Icon = config.icon
                  return (
                    <div 
                      key={pkg.name}
                      className={`text-center p-4 rounded-xl ${
                        pkg.recommended 
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${pkg.recommended ? 'text-white' : 'text-gray-600'}`} />
                      <div className={`font-bold ${pkg.recommended ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</div>
                      <div className={`text-lg font-bold ${pkg.recommended ? 'text-white/90' : 'text-gray-700'}`}>
                        {pkg.price_indicator}
                      </div>
                      {pkg.recommended && (
                        <div className="text-xs bg-white/20 rounded-full px-2 py-1 mt-2 inline-block">
                          Best Value
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Comparison Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Features Included */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-700 dark:text-gray-300">Features Included</div>
                  {recommendation.packages.map((pkg) => (
                    <div key={pkg.name} className="text-center font-bold text-gray-900 dark:text-white">
                      {pkg.features_included}
                    </div>
                  ))}
                </div>

                {/* Must-Have Features */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Must-Have Features</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>

                {/* Should-Have Features */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Should-Have Features</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      {idx >= 1 ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Nice-to-Have Upgrades */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">Nice-to-Have Upgrades</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      {idx >= 2 ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Premium Hardware */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Premium Hardware</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      {idx >= 1 ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-gray-400 text-sm">Standard</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Extended Warranty */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Extended Warranty</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="text-center text-sm">
                      {idx === 0 ? (
                        <span className="text-gray-500">1 Year</span>
                      ) : idx === 1 ? (
                        <span className="text-green-600 font-medium">2 Years</span>
                      ) : (
                        <span className="text-purple-600 font-medium">3 Years</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Priority Support */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      {idx >= 1 ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Dedicated Project Manager */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Dedicated Project Manager</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="flex justify-center">
                      {idx >= 2 ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Free Maintenance Visits */}
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Free Maintenance Visits</span>
                  </div>
                  {recommendation.packages.map((pkg, idx) => (
                    <div key={pkg.name} className="text-center text-sm">
                      {idx === 0 ? (
                        <span className="text-gray-500">1 Visit/Year</span>
                      ) : idx === 1 ? (
                        <span className="text-green-600 font-medium">2 Visits/Year</span>
                      ) : (
                        <span className="text-purple-600 font-medium">4 Visits/Year</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Package Buttons */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {recommendation.packages.map((pkg) => (
                  <Button
                    key={pkg.name}
                    onClick={() => {
                      setSelectedPackage(pkg.name)
                      setShowCompareModal(false)
                    }}
                    variant={selectedPackage === pkg.name ? "primary" : "outline"}
                    className={`py-6 ${
                      selectedPackage === pkg.name 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                        : ''
                    }`}
                    data-testid={`select-${pkg.name.toLowerCase()}-btn`}
                  >
                    {selectedPackage === pkg.name ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      `Select ${pkg.name}`
                    )}
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
