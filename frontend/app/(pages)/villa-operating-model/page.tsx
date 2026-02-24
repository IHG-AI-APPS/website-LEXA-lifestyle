'use client'

import { motion } from 'framer-motion'
import { Users, Shield, Key, Clock, MapPin, FileText, Home, UserCheck, UserCog, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function VillaOperatingModelPage() {
  const roles = [
    {
      icon: Home,
      title: 'Owners',
      color: 'from-blue-600 to-blue-400',
      description: 'Complete control and comprehensive oversight',
      features: [
        'Full system access and configuration',
        'Energy and cost analytics',
        'Performance monitoring and optimization',
        'Remote management from anywhere',
        'Override all automation rules',
        'Access all security footage and logs'
      ],
      permissions: 'Unrestricted',
      useCase: 'Property owners managing their smart home ecosystem'
    },
    {
      icon: Users,
      title: 'Family',
      color: 'from-purple-600 to-purple-400',
      description: 'Personalized comfort and independent control',
      features: [
        'Individual user profiles with preferences',
        'Personalized room scenes and automation',
        'Independent zone control (own bedroom, study)',
        'Music and entertainment preferences',
        'Privacy-protected personal spaces',
        'Guest invitation capabilities'
      ],
      permissions: 'Zone-specific with personalization',
      useCase: 'Family members with their own spaces and preferences'
    },
    {
      icon: UserPlus,
      title: 'Guests',
      color: 'from-green-600 to-green-400',
      description: 'Guided access with simplified controls',
      features: [
        'Temporary access codes (time-limited)',
        'Guest room and common area control',
        'Simplified interface for easy use',
        'Pre-set "Guest Mode" scenes',
        'Wi-Fi access with network isolation',
        'Automatic access expiration'
      ],
      permissions: 'Limited to guest areas, temporary',
      useCase: 'Short-term visitors needing comfortable, guided access'
    },
    {
      icon: UserCog,
      title: 'Staff',
      color: 'from-orange-600 to-orange-400',
      description: 'Time-restricted, zone-based operational access',
      features: [
        'Working hours-based access (e.g., 7 AM - 5 PM)',
        'Permitted zones only (kitchen, laundry, service areas)',
        'Movement tracking with audit trails',
        'Restricted from private family areas',
        'Emergency protocols override',
        'Activity logs for accountability'
      ],
      permissions: 'Time and zone restricted with full audit',
      useCase: 'Household staff requiring monitored, operational access'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Granular control ensures only authorized individuals access specific areas at appropriate times.'
    },
    {
      icon: Key,
      title: 'Operational Efficiency',
      description: 'Staff can work seamlessly while family privacy is automatically protected.'
    },
    {
      icon: FileText,
      title: 'Complete Accountability',
      description: 'Comprehensive audit trails provide visibility into all access events and system usage.'
    },
    {
      icon: Clock,
      title: 'Time-Based Intelligence',
      description: 'Access permissions automatically adjust based on time, day, and occupancy patterns.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
              Access Intelligence
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8">
              THE VILLA
              <br />
              <span className="text-transparent bg-clip-text metallic-gradient">OPERATING MODEL</span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8 mx-auto" />
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Your home adapts to people, not keys. Four distinct roles ensure everyone has the right access 
              at the right time—from full control for owners to time-restricted zones for staff.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 p-8 hover:border-gray-400 transition-all duration-300 h-full">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 bg-gradient-to-br ${role.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{role.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {role.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-black mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="pt-6 border-t border-gray-200 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Permissions:</span>
                        <span className="font-medium">{role.permissions}</span>
                      </div>
                      <div className="text-xs text-gray-500 italic">{role.useCase}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Role-Based Access?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Intelligent access management enhances security while maintaining operational efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-white rounded-lg shadow-sm mb-4">
                    <Icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Real-World Scenarios
            </motion.h2>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-transparent p-6 border-l-4 border-blue-600"
              >
                <h3 className="text-xl font-semibold mb-2">Scenario: Weekend Guests</h3>
                <p className="text-gray-700 mb-4">
                  Your family is hosting friends for the weekend. You create temporary guest access codes valid 
                  Friday through Sunday. Guests can control lights, climate, and entertainment in their rooms and 
                  common areas. Monday morning, access automatically expires—no manual management needed.
                </p>
                <div className="text-sm text-gray-600 italic">
                  <strong>Result:</strong> Guests feel welcomed with full comfort control, while family areas remain private.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-orange-50 to-transparent p-6 border-l-4 border-orange-600"
              >
                <h3 className="text-xl font-semibold mb-2">Scenario: Daily Staff Operations</h3>
                <p className="text-gray-700 mb-4">
                  Your housekeeping staff arrives at 7 AM. Their access cards work only during 7 AM - 5 PM on weekdays, 
                  and only in service areas (kitchen, laundry, guest rooms). The master bedroom, home office, and children&apos;s 
                  rooms are automatically off-limits. Movement is logged for accountability.
                </p>
                <div className="text-sm text-gray-600 italic">
                  <strong>Result:</strong> Staff can work efficiently while family privacy is guaranteed and all activity is auditable.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple-50 to-transparent p-6 border-l-4 border-purple-600"
              >
                <h3 className="text-xl font-semibold mb-2">Scenario: Family Personalization</h3>
                <p className="text-gray-700 mb-4">
                  Each family member has a unique profile. When your daughter enters her bedroom, her preferred lighting, 
                  temperature, and music automatically activate. Your son&apos;s room has different settings tailored to his preferences. 
                  Everyone has full control of their personal spaces while common areas adapt to whoever&apos;s present.
                </p>
                <div className="text-sm text-gray-600 italic">
                  <strong>Result:</strong> Truly personalized comfort without manual adjustment—the home remembers and adapts.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Access adapts to people, not keys
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience intelligent access management designed for luxury estates. 
              Learn how the Villa Operating Model enhances security and simplifies daily operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/solutions/staff-access-management"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
              >
                Learn More About Staff Management
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
