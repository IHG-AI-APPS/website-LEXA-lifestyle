'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator } from 'lucide-react'
import Link from 'next/link'

export default function CalculatorCTA() {
  const router = useRouter()

  return (
    <section className="bg-[#F9F9F7] py-16 md:py-20">
      <div className="content-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="h-8 w-8 text-[#E8DCC8]" />
                <span className="section-label text-[#1A1A1A]">INVESTMENT CALCULATOR</span>
              </div>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#E8DCC8] to-transparent"></div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1A1A1A] mb-4 leading-tight">
              Calculate Your Investment
            </h2>

            <p className="text-base md:text-lg text-[#2A2A2A] leading-relaxed mb-10 max-w-lg">
              Instant quotes for your luxury smart home. Transparent pricing, personalized to your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => router.push('/calculator')}
                className="bg-[#1A1A1A] text-white uppercase tracking-widest hover:bg-[#1A1A1A]/90 rounded-none px-10 py-6 text-sm font-medium transition-all"
              >
                Calculate Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black/20 text-[#1A1A1A] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white rounded-none px-10 py-6 text-sm font-medium transition-all"
                >
                  View Sample Projects
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Calculator Widget */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 md:p-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8DCC8]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E8DCC8]/10 rounded-full blur-3xl" />
              
              <div className="relative space-y-6">
                <div className="pb-4 border-b border-white/10">
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Property Type</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-none text-sm focus:outline-none focus:border-[#E8DCC8] appearance-none cursor-pointer [&>option]:bg-[#1A1A1A] [&>option]:text-white [&>optgroup]:bg-[#2A2A2A] [&>optgroup]:text-white [&>optgroup]:font-semibold">
                    <option value="" className="text-white/60">Select Property Type</option>
                    <optgroup label="Apartments">
                      <option value="studio">Studio Apartment</option>
                      <option value="1bed">1 Bedroom Apartment</option>
                      <option value="2bed">2 Bedroom Apartment</option>
                      <option value="3bed">3 Bedroom Apartment</option>
                      <option value="4bed">4 Bedroom Apartment</option>
                      <option value="5bed">5 Bedroom Apartment</option>
                    </optgroup>
                    <optgroup label="Luxury">
                      <option value="duplex">Duplex</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                    </optgroup>
                    <optgroup label="Villas">
                      <option value="villa-3bed">3 Bedroom Villa</option>
                      <option value="villa-4bed">4 Bedroom Villa</option>
                      <option value="villa-5bed">5 Bedroom Villa</option>
                      <option value="villa-6bed">6 Bedroom Villa</option>
                      <option value="villa-7bed">7 Bedroom Villa</option>
                      <option value="villa-8bed">8 Bedroom Villa</option>
                    </optgroup>
                    <optgroup label="Premium">
                      <option value="mansion">Mansion</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="other">Other</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="pb-4 border-b border-white/10">
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Area (sq ft)</label>
                  <input 
                    type="number"
                    placeholder="Enter area in sq ft"
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-none text-sm focus:outline-none focus:border-[#E8DCC8] placeholder-white/40"
                  />
                </div>
                
                <div className="pb-4 border-b border-white/10">
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Systems Required</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-none text-sm focus:outline-none focus:border-[#E8DCC8] appearance-none cursor-pointer [&>option]:bg-[#1A1A1A] [&>option]:text-white [&>optgroup]:bg-[#2A2A2A] [&>optgroup]:text-white [&>optgroup]:font-semibold">
                    <option value="" className="text-white/60">Select Systems</option>
                    <optgroup label="Entertainment">
                      <option value="home-theater">Home Theater & Cinema</option>
                      <option value="audio">Multi-Room Audio</option>
                      <option value="av">Audio Visual Systems</option>
                    </optgroup>
                    <optgroup label="Automation">
                      <option value="lighting">Smart Lighting Control</option>
                      <option value="climate">Climate Control</option>
                      <option value="shades">Motorized Shades & Curtains</option>
                    </optgroup>
                    <optgroup label="Security">
                      <option value="security">Security & Surveillance</option>
                      <option value="access">Access Control</option>
                      <option value="intercom">Video Intercom</option>
                    </optgroup>
                    <optgroup label="Infrastructure">
                      <option value="networking">Networking & WiFi</option>
                      <option value="integration">Full System Integration</option>
                      <option value="all">Complete Smart Home Package</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="pt-6">
                  <Button
                    onClick={() => router.push('/calculator')}
                    className="w-full bg-[#E8DCC8] hover:bg-[#D4C4A8] text-black font-semibold uppercase tracking-widest py-6 rounded-none transition-all shadow-lg hover:shadow-xl"
                  >
                    Calculate My Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-[#E8DCC8] text-xs text-center mt-3 font-medium">
                    Get instant personalized estimate →
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
