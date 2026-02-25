/**
 * Final Summary Component
 * Step 9: Complete project summary with all selections
 * Shows: Project details, features, systems, package, upgrades, total price
 * Actions: Book Consultation, Export PDF, Share Quote
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  CheckCircle2,
  Download,
  Calendar,
  Share2,
  Phone,
  Mail,
  Building2,
  MapPin,
  Wallet,
  Clock,
  Package,
  Zap,
  Settings,
  Gift,
  Star,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ArrowRight,
  RefreshCcw,
  Copy,
  X,
  Save,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

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

interface FinalSummaryProps {
  sessionId: string
  projectDetails: ProjectDetails | null
  selectedCategories: string[]
  mustHaveFeatures: string[]
  shouldHaveFeatures: string[]
  protocolType: string
  selectedProtocols: string[]
  selectedSystems: string[]
  selectedPackage: string
  packagePrice: string
  upgradeFeatures: string[]
  totalUpgradePrice: number
  onBack: () => void
  onStartNew: () => void
}

export default function FinalSummary({
  sessionId,
  projectDetails,
  selectedCategories,
  mustHaveFeatures,
  shouldHaveFeatures,
  protocolType,
  selectedProtocols,
  selectedSystems,
  selectedPackage,
  packagePrice,
  upgradeFeatures,
  totalUpgradePrice,
  onBack,
  onStartNew
}: FinalSummaryProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'morning',
    notes: ''
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState('')
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false)
  const [isSavingProject, setIsSavingProject] = useState(false)
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null)

  // Calculate totals
  const totalFeatures = mustHaveFeatures.length + shouldHaveFeatures.length + upgradeFeatures.length
  
  // Quote reference
  const quoteRef = `LEXA-${sessionId.slice(-8).toUpperCase()}`

  // Format labels
  const formatLabel = (str: string | undefined) => str?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'

  // Export PDF
  const handleExportPDF = () => {
    const content = generateQuoteHTML()
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `LEXA_Quote_${quoteRef}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Quote exported successfully!')
  }

  // Generate PDF HTML - LEXA Brand Standards
  const generateQuoteHTML = () => `
<!DOCTYPE html>
<html>
<head>
  <title>LEXA Smart Home Quote - ${quoteRef}</title>
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
    
    /* Header - Letterhead Style */
    .letterhead {
      padding: 30px 40px 20px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .logo-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .logo-section img {
      height: 48px;
      width: auto;
    }
    
    .company-info {
      text-align: right;
      font-size: 11px;
      color: #444;
      line-height: 1.8;
    }
    
    .company-info strong {
      display: block;
      font-size: 12px;
      color: #000;
      margin-bottom: 4px;
    }
    
    .categories-bar {
      font-size: 10px;
      letter-spacing: 4px;
      color: #888;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #eee;
    }
    
    /* Quote Title Section */
    .quote-title-section {
      background: #000;
      color: #fff;
      padding: 25px 40px;
      text-align: center;
    }
    
    .quote-title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
    
    .quote-ref {
      font-size: 14px;
      color: #C9A962;
      margin-top: 8px;
      font-weight: 500;
    }
    
    .quote-date {
      font-size: 11px;
      color: #888;
      margin-top: 4px;
    }
    
    /* Content Area */
    .content {
      padding: 30px 40px;
    }
    
    /* Section Styling */
    .section {
      margin-bottom: 25px;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
    }
    
    .section-header h2 {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #000;
    }
    
    /* Grid Layout */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .grid-item {
      padding: 12px 15px;
      background: #f8f8f8;
      border-left: 3px solid #C9A962;
    }
    
    .grid-item .label {
      font-size: 10px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .grid-item .value {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      margin-top: 3px;
    }
    
    /* Package Box */
    .package-box {
      background: #000;
      color: #fff;
      padding: 25px 30px;
      margin: 25px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .package-info h3 {
      font-size: 20px;
      font-weight: 600;
      color: #C9A962;
    }
    
    .package-info p {
      font-size: 12px;
      color: #888;
      margin-top: 4px;
    }
    
    .package-price {
      text-align: right;
    }
    
    .package-price .amount {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }
    
    .package-price .note {
      font-size: 11px;
      color: #888;
    }
    
    /* Upgrades Box */
    .upgrades-box {
      background: #FFF8E7;
      border: 1px solid #C9A962;
      padding: 20px 25px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .upgrades-box h4 {
      font-size: 13px;
      font-weight: 600;
      color: #8B6914;
      margin-bottom: 4px;
    }
    
    .upgrades-box p {
      font-size: 11px;
      color: #666;
    }
    
    .upgrades-price {
      font-size: 18px;
      font-weight: 700;
      color: #8B6914;
    }
    
    /* Features Summary */
    .features-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    
    .feature-stat {
      text-align: center;
      padding: 15px;
      background: #f8f8f8;
    }
    
    .feature-stat .number {
      font-size: 28px;
      font-weight: 700;
      color: #000;
    }
    
    .feature-stat .label {
      font-size: 10px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    
    /* Total Box */
    .total-box {
      background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
      color: #fff;
      padding: 25px 30px;
      margin: 25px 0;
      text-align: center;
    }
    
    .total-box .label {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #888;
    }
    
    .total-box .amount {
      font-size: 32px;
      font-weight: 700;
      color: #C9A962;
      margin-top: 8px;
    }
    
    .total-box .validity {
      font-size: 11px;
      color: #666;
      margin-top: 10px;
    }
    
    /* Terms */
    .terms {
      font-size: 10px;
      color: #888;
      padding: 15px 0;
      border-top: 1px solid #eee;
      margin-top: 20px;
    }
    
    .terms ul {
      list-style: none;
      columns: 2;
      column-gap: 30px;
    }
    
    .terms li {
      margin: 4px 0;
      padding-left: 12px;
      position: relative;
    }
    
    .terms li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #C9A962;
    }
    
    /* Footer */
    .footer {
      background: #f8f8f8;
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer-contact {
      font-size: 12px;
      color: #444;
      margin-bottom: 10px;
    }
    
    .footer-contact a {
      color: #000;
      text-decoration: none;
      font-weight: 500;
    }
    
    .footer-brands {
      font-size: 9px;
      color: #999;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e0e0e0;
    }
    
    /* Print Styles */
    @media print { 
      body { padding: 0; }
      .letterhead, .content, .footer { padding-left: 30px; padding-right: 30px; }
    }
  </style>
</head>
<body>
  <!-- Letterhead Header -->
  <div class="letterhead">
    <div class="logo-section">
      <img src="${typeof window !== 'undefined' ? window.location.origin : ''}/lexa-black.png" alt="LEXA Lifestyle" />
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
    <div class="quote-ref">Reference: ${quoteRef}</div>
    <div class="quote-date">Generated: ${new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>
  
  <!-- Content -->
  <div class="content">
    <!-- Project Details -->
    <div class="section">
      <div class="section-header">
        <h2>Project Details</h2>
      </div>
      <div class="grid">
        <div class="grid-item">
          <div class="label">Project Type</div>
          <div class="value">${formatLabel(projectDetails?.projectType)}</div>
        </div>
        <div class="grid-item">
          <div class="label">Property Type</div>
          <div class="value">${formatLabel(projectDetails?.propertyType)}</div>
        </div>
        <div class="grid-item">
          <div class="label">Property Size</div>
          <div class="value">${projectDetails?.customSize ? projectDetails.customSize + ' sqm' : projectDetails?.propertySize || 'N/A'}</div>
        </div>
        <div class="grid-item">
          <div class="label">Location</div>
          <div class="value">${projectDetails?.location || 'Dubai, UAE'}</div>
        </div>
        <div class="grid-item">
          <div class="label">Bedrooms</div>
          <div class="value">${projectDetails?.bedrooms || 'N/A'}</div>
        </div>
        <div class="grid-item">
          <div class="label">Floors</div>
          <div class="value">${projectDetails?.floors || 'N/A'}</div>
        </div>
        <div class="grid-item">
          <div class="label">Budget Range</div>
          <div class="value">${formatLabel(projectDetails?.budget)}</div>
        </div>
        <div class="grid-item">
          <div class="label">Timeline</div>
          <div class="value">${formatLabel(projectDetails?.timeline)}</div>
        </div>
      </div>
    </div>
    
    <!-- System Configuration -->
    <div class="section">
      <div class="section-header">
        <h2>System Configuration</h2>
      </div>
      <div class="grid">
        <div class="grid-item">
          <div class="label">Protocol Type</div>
          <div class="value">${formatLabel(protocolType)}</div>
        </div>
        <div class="grid-item">
          <div class="label">Control System</div>
          <div class="value">${selectedSystems.join(', ') || 'To be determined'}</div>
        </div>
        <div class="grid-item">
          <div class="label">Total Features</div>
          <div class="value">${totalFeatures} Features</div>
        </div>
        <div class="grid-item">
          <div class="label">Categories</div>
          <div class="value">${selectedCategories.length} Categories</div>
        </div>
      </div>
    </div>
    
    <!-- Feature Summary -->
    <div class="section">
      <div class="section-header">
        <h2>Feature Summary</h2>
      </div>
      <div class="features-summary">
        <div class="feature-stat">
          <div class="number">${mustHaveFeatures.length}</div>
          <div class="label">Must-Have</div>
        </div>
        <div class="feature-stat">
          <div class="number">${shouldHaveFeatures.length}</div>
          <div class="label">Should-Have</div>
        </div>
        <div class="feature-stat">
          <div class="number">${upgradeFeatures.length}</div>
          <div class="label">Upgrades</div>
        </div>
      </div>
    </div>
    
    <!-- Package -->
    <div class="package-box">
      <div class="package-info">
        <h3>${selectedPackage} Package</h3>
        <p>Includes ${mustHaveFeatures.length + shouldHaveFeatures.length} core features</p>
      </div>
      <div class="package-price">
        <div class="amount">${packagePrice || 'Custom Pricing'}</div>
        <div class="note">Base Package</div>
      </div>
    </div>
    
    ${totalUpgradePrice > 0 ? `
    <!-- Upgrades -->
    <div class="upgrades-box">
      <div>
        <h4>Selected Premium Upgrades</h4>
        <p>${upgradeFeatures.length} additional features selected</p>
      </div>
      <div class="upgrades-price">+AED ${totalUpgradePrice.toLocaleString()}</div>
    </div>
    ` : ''}
    
    <!-- Total -->
    <div class="total-box">
      <div class="label">Estimated Total Investment</div>
      <div class="amount">${(() => {
        // Try to extract numeric value from packagePrice
        const numMatch = packagePrice?.match(/[\d,]+/)
        if (numMatch) {
          const baseNum = parseInt(numMatch[0].replace(/,/g, ''))
          const total = baseNum + totalUpgradePrice
          return 'AED ' + total.toLocaleString() + '+'
        }
        return packagePrice ? (totalUpgradePrice > 0 ? packagePrice + ' + AED ' + totalUpgradePrice.toLocaleString() : packagePrice) : 'Contact for detailed pricing'
      })()}</div>
      <div class="validity">Quote valid for 30 days from date of issue</div>
    </div>
    
    <!-- Terms -->
    <div class="terms">
      <ul>
        <li>Prices are subject to final site survey</li>
        <li>VAT (5%) not included in above pricing</li>
        <li>Payment terms: 50% advance, 50% on completion</li>
        <li>Installation timeline: 4-12 weeks depending on scope</li>
        <li>2-year warranty on all installations</li>
        <li>24/7 support available with AMC packages</li>
      </ul>
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

  // Copy quote reference
  const copyQuoteRef = () => {
    navigator.clipboard.writeText(quoteRef)
    toast.success('Quote reference copied!')
  }

  // Save project to backend
  const handleSaveProject = async () => {
    if (savedProjectId) {
      toast.info('Project already saved!')
      return
    }

    setIsSavingProject(true)
    try {
      const response = await fetch(`${API_URL}/api/smart-home/save-project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          quote_ref: quoteRef,
          project_details: projectDetails,
          selected_categories: selectedCategories,
          must_have_features: mustHaveFeatures,
          should_have_features: shouldHaveFeatures,
          protocol_type: protocolType,
          selected_protocols: selectedProtocols,
          selected_systems: selectedSystems,
          selected_package: selectedPackage,
          package_price: packagePrice,
          upgrade_features: upgradeFeatures,
          total_upgrade_price: totalUpgradePrice,
          total_features: totalFeatures
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save project')
      }

      const data = await response.json()
      setSavedProjectId(data.project_id)
      
      // Also save to localStorage for dashboard
      const savedProjects = JSON.parse(localStorage.getItem('lexa_saved_projects') || '[]')
      localStorage.setItem('lexa_saved_projects', JSON.stringify([{
        id: data.project_id,
        quoteRef: quoteRef,
        projectDetails,
        selectedPackage,
        totalFeatures,
        savedAt: data.created_at
      }, ...savedProjects]))
      
      toast.success('Project saved successfully!')
    } catch (error) {
      console.error('Save project error:', error)
      toast.error('Failed to save project. Please try again.')
    } finally {
      setIsSavingProject(false)
    }
  }

  // Submit booking to backend
  const handleSubmitBooking = async () => {
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmittingBooking(true)
    try {
      const response = await fetch(`${API_URL}/api/smart-home/book-consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote_ref: quoteRef,
          session_id: sessionId,
          project_id: savedProjectId,
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          preferred_date: bookingForm.preferredDate,
          preferred_time: bookingForm.preferredTime,
          notes: bookingForm.notes,
          project_type: projectDetails?.projectType,
          property_type: projectDetails?.propertyType,
          selected_package: selectedPackage,
          total_features: totalFeatures
        })
      })

      if (!response.ok) {
        throw new Error('Failed to book consultation')
      }

      const data = await response.json()
      setBookingConfirmation(data.confirmation_number)
      setBookingSubmitted(true)
      
      // Also save to localStorage for reference
      const bookings = JSON.parse(localStorage.getItem('lexa_bookings') || '[]')
      localStorage.setItem('lexa_bookings', JSON.stringify([{
        ...bookingForm,
        quoteRef,
        confirmationNumber: data.confirmation_number,
        timestamp: data.created_at
      }, ...bookings]))
      
      toast.success('Consultation booked successfully!')
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book consultation. Please try again.')
    } finally {
      setIsSubmittingBooking(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-10"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Smart Home Package is Ready!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Here&apos;s a summary of your personalized automation solution</p>
        
        {/* Quote Reference */}
        <button
          onClick={copyQuoteRef}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-full transition-colors"
        >
          <span className="text-sm text-gray-500">Quote Reference:</span>
          <span className="font-mono font-bold text-gray-900 dark:text-white dark:text-white">{quoteRef}</span>
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </motion.div>

      {/* Project Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-400" />
          Project Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Type</div>
            <div className="font-semibold text-gray-900 dark:text-white dark:text-white">{formatLabel(projectDetails?.projectType)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Property</div>
            <div className="font-semibold text-gray-900 dark:text-white dark:text-white">{formatLabel(projectDetails?.propertyType)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Size</div>
            <div className="font-semibold text-gray-900 dark:text-white dark:text-white">{projectDetails?.customSize || projectDetails?.propertySize}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Location</div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">{projectDetails?.location}</div>
          </div>
        </div>
      </motion.div>

      {/* Features Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gray-400" />
          Features Selected
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-xl text-center">
            <Star className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{mustHaveFeatures.length}</div>
            <div className="text-sm text-red-700">Must-Have</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-center">
            <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{shouldHaveFeatures.length}</div>
            <div className="text-sm text-orange-700">Should-Have</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <Gift className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{upgradeFeatures.length}</div>
            <div className="text-sm text-purple-700">Upgrades</div>
          </div>
        </div>
      </motion.div>

      {/* System Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          System Configuration
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white dark:text-white">Protocol</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{formatLabel(protocolType)}</div>
            <div className="text-sm text-gray-500 mt-1">{selectedProtocols.join(', ')}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-900 dark:text-white dark:text-white">Control System</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{selectedSystems.join(', ')}</div>
          </div>
        </div>
      </motion.div>

      {/* Package & Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 mb-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Package className="w-5 h-5" />
            Your Package
          </h2>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {totalFeatures} features
          </span>
        </div>
        
        <div className="text-center py-4">
          <div className="text-xl opacity-80 mb-1">{selectedPackage} Package</div>
          <div className="text-4xl font-bold mb-2">{packagePrice || 'Custom Pricing'}</div>
          {totalUpgradePrice > 0 && (
            <div className="text-lg opacity-90">
              + AED {totalUpgradePrice.toLocaleString()} in upgrades
            </div>
          )}
          {packagePrice && totalUpgradePrice > 0 && (() => {
            const numMatch = packagePrice.match(/[\d,]+/)
            if (numMatch) {
              const baseNum = parseInt(numMatch[0].replace(/,/g, ''))
              return (
                <div className="mt-3 pt-3 border-t border-white/20 text-2xl font-bold">
                  Total: AED {(baseNum + totalUpgradePrice).toLocaleString()}+
                </div>
              )
            }
            return null
          })()}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        <Button
          onClick={handleSaveProject}
          variant="outline"
          className="h-14 text-base"
          disabled={isSavingProject || !!savedProjectId}
          data-testid="save-project-btn"
        >
          {isSavingProject ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : savedProjectId ? (
            <Check className="w-5 h-5 mr-2 text-green-600" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {savedProjectId ? 'Saved' : 'Save Project'}
        </Button>
        <Button
          onClick={handleExportPDF}
          variant="outline"
          className="h-14 text-base"
          data-testid="export-quote-btn"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Quote
        </Button>
        <Button
          onClick={() => setShowBookingModal(true)}
          className="h-14 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
          data-testid="book-consultation-btn"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Consultation
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link copied!')
          }}
          variant="outline"
          className="h-14 text-base"
          data-testid="share-quote-btn"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Quote
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8"
      >
        <h3 className="font-bold text-amber-900 mb-3">What Happens Next?</h3>
        <div className="space-y-3">
          {[
            { step: 1, text: 'Book a free consultation with our smart home experts' },
            { step: 2, text: 'We\'ll visit your property for a detailed assessment' },
            { step: 3, text: 'Receive a detailed proposal with exact pricing' },
            { step: 4, text: 'Professional installation by certified technicians' }
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold">
                {item.step}
              </div>
              <span className="text-amber-900">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={onBack} className="text-gray-600">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Modify Selections
        </Button>
        <Button 
          variant="outline" 
          onClick={onStartNew}
          className="text-gray-600"
        >
          <RefreshCcw className="w-4 h-4 mr-1" />
          New Project
        </Button>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            {!bookingSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">Book Consultation</h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <Input
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <Input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                    <Input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      placeholder="+971 50 XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
                    <Input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['morning', 'afternoon', 'evening'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setBookingForm({...bookingForm, preferredTime: time})}
                          className={`p-2 rounded-lg border-2 text-sm font-medium capitalize ${
                            bookingForm.preferredTime === time
                              ? 'border-green-500 bg-green-50 text-green-600'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowBookingModal(false)}
                    disabled={isSubmittingBooking}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    onClick={handleSubmitBooking}
                    disabled={isSubmittingBooking}
                    data-testid="submit-booking-btn"
                  >
                    {isSubmittingBooking ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Consultation Booked!</h3>
                {bookingConfirmation && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confirmation Number:</p>
                    <p className="font-mono font-bold text-green-700 text-lg">{bookingConfirmation}</p>
                  </div>
                )}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our team will contact you within 24 hours to confirm your consultation.
                </p>
                <Button onClick={() => setShowBookingModal(false)}>
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
