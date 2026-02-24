'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'
import BookingModal from '@/components/modals/BookingModal'
import { 
  CheckCircle, TrendingUp, Leaf, DollarSign, Clock, BarChart3, 
  Home, Zap, Shield, Tv, Sun, Wifi, Building, 
  ArrowRight, Sparkles, TreePine, Droplets, Award
} from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface ROIResult {
  costs: {
    equipment: number
    installation: number
    initial_investment: number
    annual_maintenance: number
  }
  savings: {
    monthly: number
    annual: number
    rental_premium_monthly: number
    insurance_savings_annual: number
    total_annual_benefit: number
  }
  property_benefits: {
    estimated_property_value: number
    value_increase: number
    value_increase_percentage: number
  }
  roi_timeline: Array<{
    year: number
    cumulative_savings: number
    cumulative_costs: number
    net_benefit: number
    roi_percentage: number
  }>
  break_even_years: number
  environmental: {
    energy_saved_kwh_annual: number
    co2_reduction_kg_annual: number
    water_savings_liters_annual: number
    trees_equivalent: number
  }
  system_breakdown: Array<{
    system: string
    equipment_cost: number
    installation_cost: number
    monthly_savings: number
    property_value_add_pct: number
  }>
  dubai_insights: {
    market_trend: string
    resale_advantage: string
    dewa_savings: string
  }
}

const systemIcons: Record<string, any> = {
  'Lighting Control': Zap,
  'Climate Control': Sun,
  'Security & Access': Shield,
  'Audio/Visual': Tv,
  'Shading & Blinds': Home,
  'Energy Management': BarChart3,
  'Networking': Wifi
}

const systemDescriptions: Record<string, string> = {
  'Lighting Control': 'Smart LED, scene control, motion sensors',
  'Climate Control': 'AC automation, zoned climate, smart thermostat',
  'Security & Access': 'CCTV, access control, smart locks',
  'Audio/Visual': 'Multi-room audio, home theater',
  'Shading & Blinds': 'Motorized curtains, smart blinds',
  'Energy Management': 'Real-time monitoring, load balancing',
  'Networking': 'Enterprise WiFi, structured cabling'
}

export default function ROICalculatorPage() {
  const [formData, setFormData] = useState({
    property_size: 3500,
    property_type: 'Villa',
    num_rooms: 6,
    current_energy_cost: 2000,
    electricity_rate: 0.38,
    systems: ['Lighting Control', 'Climate Control', 'Security & Access'] as string[]
  })

  const [results, setResults] = useState<ROIResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'breakdown' | 'environmental'>('overview')
  const [showBookingModal, setShowBookingModal] = useState(false)

  const availableSystems = [
    'Lighting Control',
    'Climate Control',
    'Security & Access',
    'Audio/Visual',
    'Shading & Blinds',
    'Energy Management',
    'Networking'
  ]

  const propertyTypes = [
    { value: 'Villa', label: 'Villa', icon: Home },
    { value: 'Apartment', label: 'Apartment', icon: Building },
    { value: 'Penthouse', label: 'Penthouse', icon: Sparkles },
    { value: 'Townhouse', label: 'Townhouse', icon: Home },
    { value: 'Commercial', label: 'Commercial', icon: Building }
  ]

  const handleSystemToggle = (system: string) => {
    setFormData(prev => ({
      ...prev,
      systems: prev.systems.includes(system)
        ? prev.systems.filter(s => s !== system)
        : [...prev.systems, system]
    }))
  }

  const handleCalculate = async () => {
    if (formData.systems.length === 0) {
      alert('Please select at least one system')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/calculator/roi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Calculation failed')
      
      const data = await response.json()
      setResults(data)
      setActiveTab('overview')
    } catch (err) {
      console.error('Calculation error:', err)
      alert('Failed to calculate ROI')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-AE').format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black pt-20">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="container mx-auto px-6 lg:px-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Dubai Smart Home Investment Analysis</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Calculate Your</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Smart Home ROI
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover how smart home automation increases property value, reduces utility costs, 
              and delivers exceptional returns in Dubai&apos;s premium real estate market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
              {/* Left: Property Details */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Home className="w-5 h-5 text-emerald-400" />
                    Property Details
                  </h2>
                  
                  <div className="space-y-5">
                    {/* Property Type */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-3">Property Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {propertyTypes.slice(0, 3).map((type) => {
                          const Icon = type.icon
                          return (
                            <button
                              key={type.value}
                              onClick={() => setFormData({ ...formData, property_type: type.value })}
                              className={`p-3 rounded-xl border transition-all ${
                                formData.property_type === type.value
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-1" />
                              <span className="text-xs">{type.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Property Size */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Property Size (sq ft)</label>
                      <Input
                        type="number"
                        value={formData.property_size}
                        onChange={(e) => setFormData({ ...formData, property_size: parseInt(e.target.value) || 0 })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>

                    {/* Number of Rooms */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Number of Rooms</label>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setFormData({ ...formData, num_rooms: Math.max(1, formData.num_rooms - 1) })}
                          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        >
                          -
                        </button>
                        <span className="text-2xl font-semibold text-white w-12 text-center">{formData.num_rooms}</span>
                        <button 
                          onClick={() => setFormData({ ...formData, num_rooms: formData.num_rooms + 1 })}
                          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Current Energy Cost */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Monthly DEWA Bill (AED)</label>
                      <Input
                        type="number"
                        value={formData.current_energy_cost}
                        onChange={(e) => setFormData({ ...formData, current_energy_cost: parseInt(e.target.value) || 0 })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: System Selection */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    Select Smart Systems
                    <span className="ml-auto text-sm text-emerald-400 font-normal">
                      {formData.systems.length} selected
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSystems.map((system) => {
                      const Icon = systemIcons[system] || Zap
                      const isSelected = formData.systems.includes(system)
                      
                      return (
                        <motion.button
                          key={system}
                          onClick={() => handleSystemToggle(system)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/50'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                  {system}
                                </span>
                                {isSelected && (
                                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                {systemDescriptions[system]}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  <Button
                    onClick={handleCalculate}
                    disabled={loading || formData.systems.length === 0}
                    className="w-full mt-6 h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-xl"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Calculating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Calculate ROI
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Stats */}
            <section className="py-12">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Break-Even */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-emerald-400" />
                        <span className="text-xs text-emerald-400 uppercase tracking-wider">Break-Even</span>
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {results.break_even_years > 0 ? results.break_even_years : '< 1'}
                      </div>
                      <div className="text-sm text-gray-400">Years</div>
                    </motion.div>

                    {/* Annual Savings */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-teal-400" />
                        <span className="text-xs text-teal-400 uppercase tracking-wider">Annual Benefit</span>
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {formatCurrency(results.savings.total_annual_benefit)}
                      </div>
                      <div className="text-sm text-gray-400">Per Year</div>
                    </motion.div>

                    {/* Property Value */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-wider">Value Added</span>
                      </div>
                      <div className="text-4xl font-bold text-white">
                        +{results.property_benefits.value_increase_percentage}%
                      </div>
                      <div className="text-sm text-gray-400">{formatCurrency(results.property_benefits.value_increase)}</div>
                    </motion.div>

                    {/* 10-Year ROI */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-xs text-amber-400 uppercase tracking-wider">10-Year ROI</span>
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {results.roi_timeline.find(t => t.year === 10)?.roi_percentage || 0}%
                      </div>
                      <div className="text-sm text-gray-400">Return on Investment</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tabs Navigation */}
            <section className="py-4">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-6xl mx-auto">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit mx-auto">
                    {[
                      { id: 'overview', label: 'Overview', icon: BarChart3 },
                      { id: 'timeline', label: 'ROI Timeline', icon: TrendingUp },
                      { id: 'breakdown', label: 'Cost Breakdown', icon: DollarSign },
                      { id: 'environmental', label: 'Environmental', icon: Leaf }
                    ].map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeTab === tab.id
                              ? 'bg-emerald-500 text-white'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Tab Content */}
            <section className="py-8">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-6xl mx-auto">
                  <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                      >
                        {/* Investment Summary */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Investment Summary</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Equipment Cost</span>
                              <span className="text-white font-medium">{formatCurrency(results.costs.equipment)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Installation Cost</span>
                              <span className="text-white font-medium">{formatCurrency(results.costs.installation)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Annual Maintenance</span>
                              <span className="text-white font-medium">{formatCurrency(results.costs.annual_maintenance)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-white font-semibold">Total Investment</span>
                              <span className="text-2xl font-bold text-emerald-400">{formatCurrency(results.costs.initial_investment)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Savings Breakdown */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Annual Benefits</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Energy Savings</span>
                              <span className="text-emerald-400 font-medium">{formatCurrency(results.savings.annual)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Rental Premium</span>
                              <span className="text-emerald-400 font-medium">{formatCurrency(results.savings.rental_premium_monthly * 12)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <span className="text-gray-400">Insurance Savings</span>
                              <span className="text-emerald-400 font-medium">{formatCurrency(results.savings.insurance_savings_annual)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-white font-semibold">Total Annual Benefit</span>
                              <span className="text-2xl font-bold text-emerald-400">{formatCurrency(results.savings.total_annual_benefit)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Dubai Insights */}
                        <div className="lg:col-span-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                            Dubai Market Insights
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-black/20 rounded-xl p-4">
                              <p className="text-emerald-400 font-medium mb-1">Rental Yield Boost</p>
                              <p className="text-sm text-gray-400">{results.dubai_insights.market_trend}</p>
                            </div>
                            <div className="bg-black/20 rounded-xl p-4">
                              <p className="text-emerald-400 font-medium mb-1">Faster Sale</p>
                              <p className="text-sm text-gray-400">{results.dubai_insights.resale_advantage}</p>
                            </div>
                            <div className="bg-black/20 rounded-xl p-4">
                              <p className="text-emerald-400 font-medium mb-1">DEWA Reduction</p>
                              <p className="text-sm text-gray-400">{results.dubai_insights.dewa_savings}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                      <motion.div
                        key="timeline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                      >
                        <h3 className="text-lg font-semibold text-white mb-6">ROI Projection Over Time</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">Year</th>
                                <th className="text-right py-4 px-4 text-gray-400 font-medium">Cumulative Savings</th>
                                <th className="text-right py-4 px-4 text-gray-400 font-medium">Cumulative Costs</th>
                                <th className="text-right py-4 px-4 text-gray-400 font-medium">Net Benefit</th>
                                <th className="text-right py-4 px-4 text-gray-400 font-medium">ROI %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.roi_timeline.map((item, idx) => (
                                <motion.tr 
                                  key={item.year} 
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="border-b border-white/5"
                                >
                                  <td className="py-4 px-4 text-white font-semibold">Year {item.year}</td>
                                  <td className="text-right py-4 px-4 text-emerald-400">{formatCurrency(item.cumulative_savings)}</td>
                                  <td className="text-right py-4 px-4 text-gray-400">{formatCurrency(item.cumulative_costs)}</td>
                                  <td className={`text-right py-4 px-4 font-semibold ${item.net_benefit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {formatCurrency(item.net_benefit)}
                                  </td>
                                  <td className="text-right py-4 px-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                      item.roi_percentage >= 100 ? 'bg-emerald-500/20 text-emerald-400' :
                                      item.roi_percentage >= 0 ? 'bg-teal-500/20 text-teal-400' :
                                      'bg-red-500/20 text-red-400'
                                    }`}>
                                      {item.roi_percentage}%
                                    </span>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {/* Breakdown Tab */}
                    {activeTab === 'breakdown' && (
                      <motion.div
                        key="breakdown"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {results.system_breakdown.map((system, idx) => {
                          const Icon = systemIcons[system.system] || Zap
                          return (
                            <motion.div
                              key={system.system}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-white/5 border border-white/10 rounded-2xl p-5"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-emerald-500/20">
                                  <Icon className="w-5 h-5 text-emerald-400" />
                                </div>
                                <h4 className="font-semibold text-white">{system.system}</h4>
                              </div>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Equipment</span>
                                  <span className="text-white">{formatCurrency(system.equipment_cost)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Installation</span>
                                  <span className="text-white">{formatCurrency(system.installation_cost)}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-white/10">
                                  <span className="text-gray-400">Monthly Savings</span>
                                  <span className="text-emerald-400 font-semibold">{formatCurrency(system.monthly_savings)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Property Value Add</span>
                                  <span className="text-cyan-400 font-semibold">+{system.property_value_add_pct}%</span>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    )}

                    {/* Environmental Tab */}
                    {activeTab === 'environmental' && (
                      <motion.div
                        key="environmental"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="text-center mb-8">
                          <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-4">
                            <Leaf className="w-10 h-10 text-emerald-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">Your Environmental Impact</h3>
                          <p className="text-gray-400">Contributing to Dubai&apos;s sustainability goals</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 text-center"
                          >
                            <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">
                              {formatNumber(results.environmental.energy_saved_kwh_annual)}
                            </div>
                            <div className="text-sm text-gray-400">kWh Saved Annually</div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/30 rounded-2xl p-6 text-center"
                          >
                            <Leaf className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">
                              {formatNumber(results.environmental.co2_reduction_kg_annual)}
                            </div>
                            <div className="text-sm text-gray-400">kg CO₂ Reduced</div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-2xl p-6 text-center"
                          >
                            <TreePine className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">
                              {results.environmental.trees_equivalent}
                            </div>
                            <div className="text-sm text-gray-400">Trees Equivalent</div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-2xl p-6 text-center"
                          >
                            <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">
                              {formatNumber(results.environmental.water_savings_liters_annual)}
                            </div>
                            <div className="text-sm text-gray-400">Liters Water Saved</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 lg:p-12">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      Ready to Upgrade Your Property?
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                      Get a personalized consultation and detailed quote for your smart home project.
                      Our experts will help you maximize your ROI.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-xl font-semibold"
                        onClick={() => setShowBookingModal(true)}
                      >
                        Schedule Consultation
                      </Button>
                      <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold">
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <PricingDisclaimer variant="dark" />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}
