'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { 
  Lightbulb, Zap, TrendingDown, Shield, Smartphone, BarChart3, 
  CheckCircle2, ArrowRight, Clock, DollarSign, Wifi, Activity,
  Settings, Battery, CloudCog, MapPin, AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function SmartCarParkLightingPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('rental1')

  const heroStats = [
    { value: '83%', label: 'Energy Savings', icon: TrendingDown },
    { value: '66%', label: '5-Year Cost Reduction', icon: DollarSign },
    { value: '30%+', label: 'Guaranteed Savings', icon: CheckCircle2 },
    { value: '24/7', label: 'Remote Monitoring', icon: Activity }
  ]

  const challenges = [
    { problem: 'High Energy Consumption', impact: 'Electricity costs consume 40-60% of operational budget' },
    { problem: 'Safety Concerns', impact: 'Inadequate lighting creates security risks and accidents' },
    { problem: 'Maintenance Overhead', impact: 'Frequent bulb replacements and manual inspections' },
    { problem: 'Fixed Brightness', impact: 'Wasted energy during low-traffic periods' }
  ]

  const features = [
    {
      icon: Activity,
      title: 'Intelligent Motion Detection',
      description: '5.8GHz radar sensing with AI algorithms detects people and vehicles 5-7 meters away, activating lights preemptively for enhanced safety.'
    },
    {
      icon: Lightbulb,
      title: 'Adaptive Lighting',
      description: 'Lights dynamically follow vehicles and pedestrians, brightening to 100% on arrival and dimming to 10-20% when area is vacant.'
    },
    {
      icon: Battery,
      title: 'Smart Energy Management',
      description: 'Automatic adjustment based on usage patterns and time of day. Achieve up to 83% reduction in electricity consumption.'
    },
    {
      icon: Wifi,
      title: 'Bluetooth Mesh Network',
      description: 'Seamless device communication with 0-100% customizable dimming. No complex wiring required for smart control.'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Monitoring',
      description: 'Cloud-based dashboard provides live status updates, power tracking (±5-10% accuracy), and device health monitoring.'
    },
    {
      icon: AlertTriangle,
      title: 'Automated Fault Detection',
      description: 'Instant alerts for equipment malfunctions with precise location mapping for quick maintenance response.'
    }
  ]

  const technicalSpecs = {
    ledTube: [
      { spec: 'Size', value: '4-foot (120cm) T8 Tube' },
      { spec: 'Power Consumption', value: '12W' },
      { spec: 'Brightness', value: '1800 Lumens' },
      { spec: 'Radar Detection', value: '5.8GHz, 5-7m radius' },
      { spec: 'Networking', value: 'Bluetooth LE 4.0+ Mesh' },
      { spec: 'Power Tracking', value: '±5-10% accuracy' }
    ],
    gateway: [
      { spec: 'Internal Comm', value: 'Zigbee + Bluetooth' },
      { spec: 'External Comm', value: 'Wi-Fi 2.4GHz + Ethernet' },
      { spec: 'Device Capacity', value: '150 BT + 150 Zigbee' },
      { spec: 'RF Distance', value: '35m indoor, 100m outdoor' }
    ]
  }

  const pricingPlans = [
    {
      id: 'rental1',
      name: 'Full Service Package',
      recommended: true,
      monthlyRate: 'AED 2.88',
      perUnit: 'per T8 tube/month',
      features: [
        'Free installation',
        'Free platform access',
        'Product warranty included',
        'Free replacement for malfunctions',
        '30%+ guaranteed savings',
        '5-year contract',
        '20% renewal discount'
      ],
      assumptions: 'Based on 500 qty T8 tubes',
      totalCost5Year: 'AED 133,920'
    },
    {
      id: 'rental2',
      name: 'Flexible Option',
      recommended: false,
      monthlyRate: 'AED 1.92',
      perUnit: 'per T8 tube/month',
      features: [
        'Lower monthly rate',
        'Permanent warranty',
        'Free replacement',
        'Installation: AED 4.80/unit',
        'Refundable deposit: AED 28.80/unit',
        '30%+ guaranteed savings',
        'Auto-renewal after 5 years'
      ],
      assumptions: 'Based on 500 qty T8 tubes',
      totalCost5Year: 'AED 107,520'
    },
    {
      id: 'purchase',
      name: 'Outright Purchase',
      recommended: false,
      monthlyRate: 'One-time',
      perUnit: 'investment',
      features: [
        'Lowest long-term cost',
        'Full ownership',
        'No monthly fees',
        'Standard warranty',
        'Self-managed maintenance',
        'Platform access included',
        'Best for long-term savings'
      ],
      assumptions: 'Based on 500 qty T8 tubes',
      totalCost5Year: 'AED 97,920'
    }
  ]

  const roiComparison = [
    { metric: 'Traditional LED T8', monthly: 'AED 9.50', yearly: 'AED 114.00', fiveYear: 'AED 301,152' },
    { metric: 'Smart Bluetooth T8', monthly: 'AED 1.57', yearly: 'AED 18.84', fiveYear: 'AED 97,920', savings: '83%' }
  ]

  const implementationSteps = [
    { step: 1, title: 'Site Assessment', desc: 'Evaluate parking lot layout and lighting requirements' },
    { step: 2, title: 'System Design', desc: 'Custom configuration based on your facility needs' },
    { step: 3, title: 'Installation', desc: 'Professional deployment with minimal disruption' },
    { step: 4, title: 'Configuration', desc: 'Setup dashboard, zones, and dimming schedules' },
    { step: 5, title: 'Training', desc: 'Staff training on management platform and mobile app' },
    { step: 6, title: 'Go Live', desc: '24/7 support and continuous monitoring' }
  ]

  const useCases = [
    { icon: '🛍️', title: 'Shopping Malls', desc: 'Enhance customer safety and reduce operational costs' },
    { icon: '🏢', title: 'Corporate Buildings', desc: 'Smart lighting for employee and visitor parking areas' },
    { icon: '✈️', title: 'Airports', desc: 'Large-scale intelligent lighting with cloud management' },
    { icon: '🏥', title: 'Healthcare Facilities', desc: 'Critical lighting with fail-safe monitoring' },
    { icon: '🏨', title: 'Hotels & Resorts', desc: 'Premium guest experience with automated lighting' },
    { icon: '🏭', title: 'Industrial Sites', desc: 'Heavy-duty lighting with energy optimization' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">High ROI & Energy Save Solution</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Smart Car Park
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Lighting System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your parking facility with AI-powered IoT lighting that delivers up to 83% energy savings and guaranteed ROI
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => setShowConsultationForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Request ROI Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Download Brochure
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge vs Solution */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Traditional Lighting Challenges</h2>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                  >
                    <h3 className="font-bold text-gray-900 mb-1">{challenge.problem}</h3>
                    <p className="text-sm text-gray-700">{challenge.impact}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Dynamic Lighting Solution</h2>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">IoT-Powered Intelligence</h3>
                    <p className="text-sm text-gray-600">AI + Radar + Cloud Management</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>83% energy reduction</strong> compared to traditional LEDs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Motion-activated</strong> lighting with 5-7m detection radius</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Real-time monitoring</strong> with automated fault detection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Guaranteed 30%+ savings</strong> after rental fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Extended lifespan</strong> through smart dimming</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Average Monthly Savings per Lamp</div>
                  <div className="text-3xl font-bold text-blue-600">AED 7.93</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Features</h2>
            <p className="text-xl text-gray-600">Next-generation IoT lighting for modern parking facilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Savings Data */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven ROI & Energy Savings</h2>
            <p className="text-xl text-gray-600">Real numbers from real implementations</p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Electricity Consumption Comparison (per lamp)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 text-gray-700 font-semibold">System</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-semibold">Monthly Cost</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-semibold">Yearly Cost</th>
                      <th className="text-right py-4 px-4 text-gray-700 font-semibold">5-Year Total</th>
                      <th className="text-center py-4 px-4 text-gray-700 font-semibold">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roiComparison.map((row, index) => (
                      <tr key={index} className={`border-b border-gray-200 ${index === 1 ? 'bg-green-50' : ''}`}>
                        <td className="py-4 px-4 font-medium text-gray-900">{row.metric}</td>
                        <td className="py-4 px-4 text-right text-gray-700">{row.monthly}</td>
                        <td className="py-4 px-4 text-right text-gray-700">{row.yearly}</td>
                        <td className="py-4 px-4 text-right font-bold text-gray-900">{row.fiveYear}</td>
                        <td className="py-4 px-4 text-center">
                          {row.savings && (
                            <span className="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              <TrendingDown className="w-4 h-4" />
                              {row.savings}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-600 text-white rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Average Monthly Savings per Lamp</div>
                    <div className="text-4xl font-bold">AED 7.93</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90 mb-1">For 500 Lamps - 5 Year Savings</div>
                    <div className="text-4xl font-bold">AED 203,232</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Year Cost Comparison */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Total Investment Comparison (500 units, 5 years)
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                <div className="text-sm text-red-700 font-semibold mb-2">Traditional LED</div>
                <div className="text-3xl font-bold text-red-600 mb-1">AED 301K</div>
                <div className="text-xs text-red-600">Baseline Cost</div>
              </div>
              <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 relative">
                <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  Best Value
                </div>
                <div className="text-sm text-green-700 font-semibold mb-2">Purchase Option</div>
                <div className="text-3xl font-bold text-green-600 mb-1">AED 98K</div>
                <div className="text-xs text-green-600">67% Savings</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <div className="text-sm text-blue-700 font-semibold mb-2">Rental Plan 2</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">AED 108K</div>
                <div className="text-xs text-blue-600">64% Savings</div>
              </div>
              <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                <div className="text-sm text-purple-700 font-semibold mb-2">Rental Plan 1</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">AED 134K</div>
                <div className="text-xs text-purple-600">56% Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Flexible Pricing Options</h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your budget and operational needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${
                  plan.recommended 
                    ? 'border-blue-400 shadow-2xl shadow-blue-500/20' 
                    : 'border-white/10'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Recommended
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.monthlyRate}</span>
                    <span className="text-gray-400 text-sm">{plan.perUnit}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/10">
                  <div className="text-xs text-gray-400 mb-2">5-Year Total Investment</div>
                  <div className="text-2xl font-bold text-blue-400 mb-4">{plan.totalCost5Year}</div>
                  <div className="text-xs text-gray-500 mb-4">{plan.assumptions}</div>
                  
                  <Button 
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      setShowConsultationForm(true)
                    }}
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    Get Quote
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">Enterprise-grade hardware and connectivity</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* LED Tube Specs */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AIOT Bluetooth Radar LED T8</h3>
              </div>
              <div className="space-y-3">
                {technicalSpecs.ledTube.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">{item.spec}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gateway Specs */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <CloudCog className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Smart Gateway</h3>
              </div>
              <div className="space-y-3">
                {technicalSpecs.gateway.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">{item.spec}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Implementation Process</h2>
            <p className="text-xl text-gray-600">From assessment to go-live in 6 simple steps</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-xl text-gray-600">Proven solutions across industries</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all text-center"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Parking Facility?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join leading organizations achieving 83% energy savings with intelligent lighting
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Schedule ROI Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Contact Sales Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
      />
    </>
  )
}
