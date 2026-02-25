import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_privacy', {
  title: 'Privacy Policy | LEXA Lifestyle',
  description: 'Privacy policy and data protection at LEXA Lifestyle'
})
}

export default function PrivacyPage() {
  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">Data Collection</h2>
          <p className="mb-4">We collect essential personal and project-related information, including:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Name, email address, and contact number</li>
            <li>Location & project details</li>
            <li>Preferences, automation requirements, and technical specifications</li>
            <li>Payment information (processed via secure third-party gateways)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">How We Use Your Data</h2>
          <p className="mb-4">Data is used strictly to:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Provide consultation and design services</li>
            <li>Process and deliver orders</li>
            <li>Improve website functionality</li>
            <li>Conduct technical support and after-sales care</li>
            <li>Share updates (only with explicit opt-in consent)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Third-Party Sharing</h2>
          <p className="mb-4">
            We do <strong>not</strong> sell or trade your data. Limited sharing may occur only with:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Logistics partners</li>
            <li>Certified technicians</li>
            <li>Compliance and legal authorities (when required by UAE law)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Your Rights</h2>
          <p className="mb-4">In accordance with UAE Data Protection Law (PDPL):</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>You may request data access</li>
            <li>You may request correction or deletion</li>
            <li>You may opt out of marketing communication at any time</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Data Security</h2>
          <p className="mb-8">
            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. All payment transactions are processed through secure, PCI-DSS compliant gateways.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Cookies</h2>
          <p className="mb-8">
            Our website uses cookies to enhance user experience, analyze site usage, and assist in our marketing efforts. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Contact Us</h2>
          <p className="mb-8">
            For any privacy-related questions or to exercise your data rights, please contact us at <a href="mailto:sales@lexalifestyle.com" className="text-[#E8DCC8]">sales@lexalifestyle.com</a> or call <a href="tel:+97142670470" className="text-[#E8DCC8]">+971 42 670 470</a>.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
