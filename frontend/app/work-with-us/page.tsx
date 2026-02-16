'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Briefcase, Users, Award, MapPin, Mail, ArrowRight, ChevronDown, ChevronUp,
  Lightbulb, Film, Speaker, Shield, Home, Waves,
  GraduationCap, Heart, TrendingUp, Clock, CheckCircle2, Building2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const expertiseAreas = [
  {
    icon: Home,
    title: 'Smart Home Automation',
    description: 'Control4, Crestron, Savant system design and programming',
    skills: ['System Design', 'Programming', 'Integration', 'Commissioning']
  },
  {
    icon: Lightbulb,
    title: 'Lighting Control',
    description: 'Lutron, Ketra, Philips Dynalite lighting design and installation',
    skills: ['Lutron RadioRA 3', 'Homeworks QSX', 'Circadian Design', 'DMX']
  },
  {
    icon: Film,
    title: 'Home Cinema & AV',
    description: 'Private cinema design, Dolby Atmos, ISF calibration',
    skills: ['Acoustic Design', 'Video Calibration', 'Dolby Atmos', 'Projection']
  },
  {
    icon: Speaker,
    title: 'High-End Audio',
    description: 'Premium HiFi systems, multi-room audio, architectural speakers',
    skills: ['B&W', 'McIntosh', 'Sonance', 'KEF', 'System Tuning']
  },
  {
    icon: Shield,
    title: 'Security & Access',
    description: 'CCTV, access control, alarm systems, remote monitoring',
    skills: ['IP Cameras', 'Biometrics', 'Intercom', 'Monitoring']
  },
  {
    icon: Waves,
    title: 'Marine & Outdoor',
    description: 'Yacht automation, outdoor entertainment, pool systems',
    skills: ['Marine Grade', 'Weather-Proof', 'Landscape Audio', 'Pool Control']
  },
]

const benefits = [
  { icon: TrendingUp, title: 'Career Growth', desc: 'Clear progression paths and continuous learning opportunities' },
  { icon: GraduationCap, title: 'Training & Certifications', desc: 'Manufacturer training, industry certifications paid by company' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance and wellness programs' },
  { icon: Clock, title: 'Work-Life Balance', desc: 'Flexible schedules and generous leave policy' },
]

const openPositions = [
  { 
    title: 'Smart Home Programmer', 
    type: 'Full-time', 
    location: 'Dubai',
    experience: '3-5 years',
    department: 'Technical',
    description: 'Design and program Control4, Crestron, and Savant automation systems for luxury residential projects across UAE.',
    responsibilities: [
      'Program and configure Control4, Crestron, and Savant automation systems',
      'Develop custom drivers and modules for client-specific requirements',
      'Conduct system testing, debugging, and optimization',
      'Provide technical support during installation and commissioning',
      'Create system documentation and user guides',
      'Collaborate with project managers and installation teams'
    ],
    requirements: [
      'Bachelor\'s degree in Electronics, Computer Science, or related field',
      '3-5 years experience in smart home programming',
      'Control4 and/or Crestron certification required',
      'Proficiency in programming languages (C++, Python, JavaScript)',
      'Strong understanding of networking protocols (TCP/IP, RS-232, IR)',
      'Experience with Lutron, Sonos, and third-party integrations',
      'Valid UAE driving license',
      'Excellent English communication skills'
    ]
  },
  { 
    title: 'AV Installation Technician', 
    type: 'Full-time', 
    location: 'Dubai',
    experience: '2-4 years',
    department: 'Installation',
    description: 'Install and configure home theater, audio systems, and AV equipment in luxury villas and apartments.',
    responsibilities: [
      'Install home theater systems including projectors, screens, and speakers',
      'Mount and configure TVs, soundbars, and multi-room audio systems',
      'Run and terminate audio/video cabling (HDMI, speaker wire, fiber)',
      'Rack build and equipment installation in technical rooms',
      'Perform system calibration and audio tuning',
      'Conduct site surveys and pre-installation assessments',
      'Maintain installation quality standards and documentation'
    ],
    requirements: [
      'Technical diploma in Electronics or equivalent',
      '2-4 years experience in AV installation',
      'CTS (Certified Technology Specialist) certification preferred',
      'Experience with Dolby Atmos and surround sound systems',
      'Knowledge of video calibration (ISF certification a plus)',
      'Ability to read technical drawings and floor plans',
      'Physical fitness for ladder work and equipment handling',
      'Valid UAE driving license'
    ]
  },
  { 
    title: 'Project Manager - Smart Home', 
    type: 'Full-time', 
    location: 'Dubai',
    experience: '5-8 years',
    department: 'Project Management',
    description: 'Lead end-to-end delivery of high-end residential automation projects from design to handover.',
    responsibilities: [
      'Manage multiple smart home projects simultaneously (AED 500K - 5M+)',
      'Develop project plans, schedules, and resource allocation',
      'Coordinate with clients, contractors, interior designers, and consultants',
      'Conduct regular site visits and progress meetings',
      'Manage project budgets, change orders, and profitability',
      'Ensure quality standards and timely project completion',
      'Handle client communications and expectations management',
      'Lead and mentor junior project coordinators'
    ],
    requirements: [
      'Bachelor\'s degree in Engineering, Project Management, or related field',
      '5-8 years experience in AV/smart home project management',
      'PMP or PRINCE2 certification preferred',
      'Experience managing luxury residential projects in UAE',
      'Strong knowledge of smart home systems and AV technology',
      'Excellent client relationship management skills',
      'Proficiency in MS Project, AutoCAD reading, and project tools',
      'Fluent English; Arabic is a plus',
      'Valid UAE driving license'
    ]
  },
  { 
    title: 'Sales Consultant - Smart Home Solutions', 
    type: 'Full-time', 
    location: 'Dubai / Abu Dhabi',
    experience: '3-5 years',
    department: 'Sales',
    description: 'Drive sales of smart home automation solutions to HNW clients, developers, and interior designers.',
    responsibilities: [
      'Generate and qualify leads from HNW individuals and property developers',
      'Conduct client consultations and needs assessments',
      'Prepare and present technical proposals and quotations',
      'Demonstrate smart home solutions in our Experience Centre',
      'Build and maintain relationships with architects and interior designers',
      'Achieve monthly and quarterly sales targets',
      'Attend industry events, exhibitions, and networking functions',
      'Maintain CRM records and sales pipeline reporting'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Marketing, or Technical field',
      '3-5 years B2B/B2C sales experience in luxury goods or technology',
      'Experience in smart home, AV, or related technology sales preferred',
      'Proven track record of meeting/exceeding sales targets',
      'Strong presentation and negotiation skills',
      'Existing network in UAE real estate/interior design industry a plus',
      'Fluent English; Arabic highly preferred',
      'Professional appearance and demeanor',
      'Valid UAE driving license'
    ]
  },
  { 
    title: 'Service & Support Engineer', 
    type: 'Full-time', 
    location: 'Dubai',
    experience: '2-4 years',
    department: 'After-Sales',
    description: 'Provide technical support and maintenance services for installed smart home systems across UAE.',
    responsibilities: [
      'Respond to customer support requests and troubleshoot issues',
      'Perform scheduled maintenance visits and system health checks',
      'Diagnose and resolve hardware and software problems',
      'Update and optimize existing automation systems',
      'Document service calls and maintain service records',
      'Provide on-call emergency support on rotation',
      'Train clients on system usage and new features',
      'Coordinate warranty claims with manufacturers'
    ],
    requirements: [
      'Technical diploma or degree in Electronics/IT',
      '2-4 years experience in smart home or AV support',
      'Strong troubleshooting and diagnostic skills',
      'Experience with Control4, Crestron, Lutron systems',
      'Knowledge of networking and IP-based systems',
      'Customer service oriented with excellent communication',
      'Flexibility for after-hours emergency support',
      'Valid UAE driving license'
    ]
  },
]

// Job Card Component with expandable details
function JobCard(props) {
  const { position, index } = props
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{position.title}</h3>
              <span className="text-xs bg-[#C9A962]/20 text-[#C9A962] px-2 py-1 rounded-full font-medium">
                {position.department}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{position.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Briefcase className="w-4 h-4" /> {position.type}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" /> {position.location}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Award className="w-4 h-4" /> {position.experience}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-1 text-[#C9A962] font-medium text-sm hover:underline"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded) }}
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-600 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Responsibilities */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C9A962]" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {position.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Requirements */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#C9A962]" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Apply Button */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-600 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ready to apply? Send your CV and cover letter to our HR team.
                </p>
                <a
                  href={`mailto:info@lexalifestyle.com?subject=Application%20for%20${encodeURIComponent(position.title)}%20Position&body=Dear%20HR%20Team%2C%0A%0AI%20am%20writing%20to%20apply%20for%20the%20${encodeURIComponent(position.title)}%20position%20at%20LEXA%20Lifestyle.%0A%0APlease%20find%20my%20CV%20attached.%0A%0AName%3A%20%0APhone%3A%20%0ACurrent%20Role%3A%20%0AYears%20of%20Experience%3A%20%0ANotice%20Period%3A%20%0A%0ABest%20regards`}
                  className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  Apply for This Position
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-[#1a2e1a] to-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 text-[#C9A962] mb-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">CAREERS AT LEXA</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Work With Us
              <br />
              <span className="text-[#C9A962]">Shape the Future of Living</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Join Dubai's leading smart home integration company. We're looking for passionate professionals 
              who share our vision of creating exceptional living experiences through technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:info@lexalifestyle.com?subject=Career%20Inquiry%20-%20LEXA%20Lifestyle"
                className="bg-[#C9A962] hover:bg-[#B8994D] text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send Your CV
              </a>
              <a 
                href="#positions"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                View Open Positions
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '15+', label: 'Years in Industry' },
                { value: '50+', label: 'Team Members' },
                { value: '500+', label: 'Projects Delivered' },
                { value: 'GCC', label: 'Wide Presence' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Expertise Areas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We specialize in luxury smart home technology. If you have expertise in any of these areas, we'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#C9A962]/10 rounded-xl flex items-center justify-center mb-4">
                  <area.icon className="w-7 h-7 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join LEXA */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join LEXA?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We invest in our people because they are the heart of our success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-[#C9A962]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our team of experts. Click on any position to view full details and requirements.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <JobCard key={position.title} position={position} index={index} />
            ))}
          </div>
          
          {/* General Application */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-[#C9A962]/10 to-[#C9A962]/5 border-2 border-dashed border-[#C9A962]/30 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Don't See a Suitable Role?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're always looking for talented individuals. Send us your CV and we'll keep it on file for future opportunities.
              </p>
              <a
                href="mailto:info@lexalifestyle.com?subject=General%20Application%20-%20LEXA%20Lifestyle&body=Dear%20HR%20Team%2C%0A%0AI%20am%20interested%20in%20joining%20LEXA%20Lifestyle.%20Please%20find%20my%20CV%20attached.%0A%0AName%3A%20%0APhone%3A%20%0ACurrent%20Role%3A%20%0AYears%20of%20Experience%3A%20%0AArea%20of%20Expertise%3A%20%0A%0ABest%20regards"
                className="inline-flex items-center gap-2 bg-[#C9A962] hover:bg-[#B8994D] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Mail className="w-5 h-5" />
                Submit General Application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C9A962]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Send your CV and portfolio to our HR team. We review all applications and will get back to you within 5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@lexalifestyle.com?subject=Career%20Inquiry%20-%20LEXA%20Lifestyle&body=Hi%20LEXA%20Team%2C%0A%0AI%20am%20interested%20in%20joining%20your%20team.%0A%0AName%3A%20%0APosition%20of%20Interest%3A%20%0AExperience%3A%20%0A%0APlease%20find%20my%20CV%20attached.%0A%0ABest%20regards"
                className="bg-white text-[#C9A962] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@lexalifestyle.com
              </a>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-[#C9A962] px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Visit Our Office
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema.org JobPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LEXA Lifestyle",
            "url": "https://lexalifestyle.com",
            "description": "Dubai's leading smart home integration company specializing in luxury residential automation.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@lexalifestyle.com",
              "contactType": "HR Department"
            }
          })
        }}
      />
    </div>
  )
}
