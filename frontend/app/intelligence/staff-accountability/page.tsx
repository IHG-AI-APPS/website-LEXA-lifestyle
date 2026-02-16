'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, Brain, Shield, TrendingDown, Activity, BarChart3, 
  CheckCircle2, ArrowRight, Clock, DollarSign, Eye, AlertTriangle,
  Zap, Lock, MapPin, Smartphone, Radio, Camera, LineChart,
  Target, Award, Settings, Cloud, Layers, PlayCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function AIStaffAccountabilityPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [selectedStage, setSelectedStage] = useState(1)

  const heroStats = [
    { value: '15-20%', label: 'Staff Efficiency Gain', icon: TrendingDown },
    { value: '8-12%', label: 'Manpower Optimization', icon: Users },
    { value: '10-18%', label: 'Energy Cost Reduction', icon: Zap },
    { value: 'Real-time', label: 'Operational Visibility', icon: Eye }
  ]

  const painPoints = [
    {
      icon: AlertTriangle,
      problem: 'Lack of Real-Time Visibility',
      impact: 'Management operates on assumptions, not facts about staff presence and activities'
    },
    {
      icon: Clock,
      problem: 'Payroll Leakage',
      impact: '3-6% revenue loss due to unverified working hours and attendance fraud'
    },
    {
      icon: Users,
      problem: 'Inconsistent Service Coverage',
      impact: 'Gaps during peak hours lead to poor guest experience and lost revenue'
    },
    {
      icon: DollarSign,
      problem: 'High OPEX',
      impact: 'Manpower costs are 40-60% of budget with 15-20% inefficiency'
    }
  ]

  const stages = [
    {
      id: 1,
      name: 'Visibility & Accountability',
      tagline: 'See the Invisible',
      color: 'blue',
      benefits: {
        payroll: '3-6%',
        idle: '5-8%',
        supervision: '10-15%'
      },
      features: [
        { icon: Eye, title: 'Real-Time Visibility', desc: 'Live dashboards showing staff presence and duty status' },
        { icon: Users, title: 'Staff Accountability', desc: 'Verified attendance with accurate IN/OUT records' },
        { icon: MapPin, title: 'Movement Tracking', desc: 'Monitor staff movement across operational zones' },
        { icon: Activity, title: 'Zone-Based Analytics', desc: 'Precise analysis of staff presence by area' }
      ],
      roi: 'Fast ROI through immediate visibility and accountability improvements',
      investment: 'Entry-level investment, maximum impact'
    },
    {
      id: 2,
      name: 'Optimization & Risk Control',
      tagline: 'From Data to Decisions',
      color: 'purple',
      benefits: {
        efficiency: '8-12%',
        loss: '5-10%',
        management: '15-20%'
      },
      features: [
        { icon: BarChart3, title: 'Service Coverage Intelligence', desc: 'Coverage scores and under-staffed zone detection' },
        { icon: Shield, title: 'Loss Prevention', desc: 'After-hours monitoring and anomaly detection' },
        { icon: Brain, title: 'Incident Replay', desc: 'Timeline analysis for objective dispute resolution' },
        { icon: Target, title: 'Performance Insights', desc: 'Staff efficiency metrics and bottleneck identification' }
      ],
      roi: 'Improved service consistency and reduced operational risk',
      investment: 'Mid-tier investment for optimization layer'
    },
    {
      id: 3,
      name: 'Intelligence & Automation',
      tagline: 'Predictive Excellence',
      color: 'green',
      benefits: {
        energy: '10-18%',
        strategic: 'Competitive',
        automation: 'Full'
      },
      features: [
        { icon: LineChart, title: 'Predictive Analytics', desc: 'Peak-hour forecasts and demand-based staffing' },
        { icon: Zap, title: 'Facility Automation', desc: 'Smart lighting and HVAC based on occupancy' },
        { icon: Award, title: 'Training Effectiveness', desc: 'Measure behavioral change and calculate Training ROI' },
        { icon: Cloud, title: 'Executive Dashboards', desc: 'Consolidated KPIs and predictive risk alerts' }
      ],
      roi: 'Strategic advantage through advanced intelligence',
      investment: 'Premium tier for full automation'
    }
  ]

  const techStack = [
    {
      layer: 'Identity & Attendance',
      components: ['Face Recognition', 'Biometric Verification', 'Card/Hybrid Systems', 'Verified Logs'],
      icon: Lock
    },
    {
      layer: 'AI Video Analytics',
      components: ['People Detection', 'Movement Tracking', 'Dwell Time Analysis', 'Idle Detection'],
      icon: Camera
    },
    {
      layer: 'Indoor Tracking (Optional)',
      components: ['BLE/UWB/RFID Tags', 'Precise Location', 'Zone Transitions', 'Multi-floor Support'],
      icon: Radio
    },
    {
      layer: 'Dashboards & Alerts',
      components: ['Real-time Visualization', 'Custom Reports', 'Automated Alerts', 'Mobile Access'],
      icon: Smartphone
    }
  ]

  const useCases = [
    {
      icon: '🏨',
      industry: 'Luxury Hotels',
      challenge: 'Ensuring consistent service standards across multiple touchpoints',
      solution: 'Real-time staff deployment tracking with service coverage analytics',
      result: '12% improvement in guest satisfaction scores'
    },
    {
      icon: '🏛️',
      industry: 'Private Clubs',
      challenge: 'High payroll costs with unclear staff accountability',
      solution: 'Verified attendance and movement analytics across club zones',
      result: '6% payroll savings + 8% efficiency gain'
    },
    {
      icon: '🎰',
      industry: 'Entertainment Venues',
      challenge: 'Loss prevention and security in high-traffic areas',
      solution: 'AI-powered anomaly detection with after-hours monitoring',
      result: '10% reduction in internal losses'
    },
    {
      icon: '🍽️',
      industry: 'Fine Dining',
      challenge: 'Optimizing staff levels during varying demand periods',
      solution: 'Predictive analytics for peak-hour forecasting',
      result: '15% reduction in overstaffing costs'
    }
  ]

  const differentiators = [
    {
      traditional: 'Passive Observation',
      lexa: 'Actionable Intelligence',
      icon: Brain
    },
    {
      traditional: 'Security Focus',
      lexa: 'Operational Optimization',
      icon: Target
    },
    {
      traditional: 'Manual Review',
      lexa: 'Real-time Alerts',
      icon: Zap
    },
    {
      traditional: 'Reactive',
      lexa: 'Predictive & Proactive',
      icon: LineChart
    }
  ]

  const currentStage = stages.find(s => s.id === selectedStage) || stages[0]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.4),rgba(0,0,0,0))]" />
        </div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Operational Intelligence Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              AI-Enabled Staff
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Accountability System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
              Transform luxury club operations with AI-powered intelligence
            </p>
            
            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-3xl">
              Not surveillance, but operational excellence. Move beyond CCTV to actionable insights that drive efficiency, reduce costs, and enhance service quality.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => setShowConsultationForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Request Live Demo
                <PlayCircle className="ml-2 w-5 h-5" />
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

      {/* Not CCTV Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Not CCTV, But <span className="text-blue-600">Operational Intelligence</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Traditional surveillance observes. LEXA transforms data into decisions.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <diff.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-gray-500 mb-2 line-through">{diff.traditional}</div>
                <div className="text-lg font-bold text-gray-900">{diff.lexa}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Operational Challenges We Solve</h2>
            <p className="text-xl text-gray-600">Common pain points in luxury hospitality operations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-white border-l-4 border-red-500 rounded-r-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <pain.icon className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pain.problem}</h3>
                <p className="text-sm text-gray-600">{pain.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Stage Implementation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">3-Stage Implementation Roadmap</h2>
            <p className="text-xl text-gray-600">Measurable ROI at every stage</p>
          </div>

          {/* Stage Selector */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedStage === stage.id
                    ? `bg-${stage.color}-600 text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Stage {stage.id}: {stage.name}
              </button>
            ))}
          </div>

          {/* Selected Stage Details */}
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-${currentStage.color}-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                  {currentStage.id}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{currentStage.name}</h3>
                  <p className="text-lg text-gray-600">{currentStage.tagline}</p>
                </div>
              </div>

              {/* Benefits Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {Object.entries(currentStage.benefits).map(([key, value], index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {currentStage.features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">ROI Impact</div>
                  <div className="font-semibold text-gray-900">{currentStage.roi}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Investment Level</div>
                  <div className="font-semibold text-gray-900">{currentStage.investment}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Architecture</h2>
            <p className="text-xl text-gray-600">4-layer intelligent system design</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {techStack.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <layer.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{layer.layer}</h3>
                <ul className="space-y-2">
                  {layer.components.map((component, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from luxury hospitality leaders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCase.industry}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-1">Challenge</div>
                    <p className="text-gray-700">{useCase.challenge}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-600 mb-1">LEXA Solution</div>
                    <p className="text-gray-700">{useCase.solution}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-700 mb-1">Result</div>
                    <p className="text-green-900 font-semibold">{useCase.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Ethics */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Privacy-First Design</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We prioritize transparency, ethics, and compliance. Our system is built with GDPR and data protection regulations at its core.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Lock className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold mb-2">Staff Communication</h3>
                <p className="text-sm text-gray-400">Transparent communication protocols about system usage</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Settings className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold mb-2">Role-Based Access</h3>
                <p className="text-sm text-gray-400">Granular access controls and audit trails</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Shield className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold mb-2">Data Protection</h3>
                <p className="text-sm text-gray-400">Compliant retention policies and encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Operations with AI Intelligence
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              See how LEXA can optimize your staff efficiency, reduce costs, and enhance service excellence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => setShowConsultationForm(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Schedule Demo
                <PlayCircle className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Download Case Studies
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
