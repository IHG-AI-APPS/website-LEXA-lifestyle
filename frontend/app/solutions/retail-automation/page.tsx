'use client'
import { motion } from 'framer-motion'
import { ShoppingBag, Users, Camera, TrendingUp, Zap, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import Link from 'next/link'

export default function RetailAutomationPage() {
  const [showForm, setShowForm] = useState(false)
  
  const features = [
    { icon: Users, title: 'Customer Analytics', desc: 'AI-powered foot traffic analysis, heat mapping, and behavior tracking for optimized layouts.' },
    { icon: Camera, title: 'Smart Surveillance', desc: 'Real-time security with theft detection, queue management, and crowd monitoring.' },
    { icon: Zap, title: 'Energy Management', desc: 'Occupancy-based lighting and HVAC control reducing energy costs by 35-45%.' },
    { icon: BarChart3, title: 'Sales Optimization', desc: 'Data-driven insights on peak hours, product placement, and conversion rates.' }
  ]
  
  return (
    <>
      <div className="min-h-screen bg-white">
        <section className="relative bg-gradient-to-br from-purple-900 via-[#1A1A1A] to-gray-900 text-white py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Retail Intelligence</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Retail<br /><span className="text-gray-300">Automation</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl">
                Transform your retail space with AI-driven customer analytics, smart energy management, and automated operations that boost sales while reducing costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setShowForm(true)} className="bg-white text-[#1A1A1A] hover:bg-gray-100 px-8 py-6 text-sm font-semibold uppercase">
                  Request Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1A1A1A]">Complete Retail Intelligence</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white p-8 border-2 border-gray-200 hover:border-[#1A1A1A] transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800"><Icon className="h-6 w-6 text-[#1A1A1A]" /></div>
                      <div><h3 className="text-lg font-semibold mb-2 text-[#1A1A1A]">{f.title}</h3><p className="text-gray-600 text-sm">{f.desc}</p></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A]">Proven Impact</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="p-6 bg-gray-50 dark:bg-gray-800"><div className="text-4xl font-bold text-[#1A1A1A]">35%</div><div className="text-sm text-gray-600">Energy Savings</div></div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800"><div className="text-4xl font-bold text-[#1A1A1A]">22%</div><div className="text-sm text-gray-600">Sales Increase</div></div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800"><div className="text-4xl font-bold text-[#1A1A1A]">40%</div><div className="text-sm text-gray-600">Faster Checkout</div></div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800"><div className="text-4xl font-bold text-[#1A1A1A]">60%</div><div className="text-sm text-gray-600">Loss Prevention</div></div>
            </div>
          </div>
        </section>
      </div>
      <ConsultationForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}
