'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const solutions = [
    { name: 'Home Theater', href: '/solutions/home-theater' },
    { name: 'Lighting Automation', href: '/solutions/lighting-automation' },
    { name: 'Security Systems', href: '/solutions/security' },
    { name: 'Climate Control', href: '/solutions/climate-control' },
  ]

  const company = [
    { name: 'About Us', href: '/company/about' },
    { name: 'Our Team', href: '/company/team' },
    { name: 'Certifications', href: '/company/certifications' },
    { name: 'Careers', href: '/company/careers' },
  ]

  const personas = [
    { name: 'Homeowners', href: '/persona/homeowner' },
    { name: 'Architects & Designers', href: '/persona/architect' },
    { name: 'Developers', href: '/persona/developer' },
    { name: 'Commercial', href: '/persona/commercial' },
  ]

  return (
    <footer className="bg-lexa-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-3xl font-bold tracking-tight">LEXA</div>
              <div className="text-sm tracking-widest text-lexa-gold">LIFE STYLE</div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Luxury Smart Living, Designed & Delivered End-to-End. Transforming spaces with integrated technology solutions.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-lexa-gold" />
                <span>Shaikh Zayed Road - Al Quoz 1<br />Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-lexa-gold" />
                <a href="tel:+971554452224" className="hover:text-white transition-colors">
                  +971 55 445 2224
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-lexa-gold" />
                <a href="mailto:sales@lexalifestyle.com" className="hover:text-white transition-colors">
                  sales@lexalifestyle.com
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide">SOLUTIONS</h3>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-lexa-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide">COMPANY</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-lexa-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Serve Column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide">WHO WE SERVE</h3>
            <ul className="space-y-2">
              {personas.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-lexa-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} LEXA Lifestyle LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-lexa-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-lexa-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}