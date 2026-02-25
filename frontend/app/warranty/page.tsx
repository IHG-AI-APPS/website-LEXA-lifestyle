import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_warranty', {
  title: 'Warranty & Service Policy | LEXA Lifestyle',
  description: 'Warranty terms and service policies for LEXA Lifestyle products and installations'
})
}

export default function WarrantyPage() {
  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <Shield className="h-12 w-12 text-[#E8DCC8]" />
          <h1 className="text-4xl md:text-5xl font-bold">Warranty & Service Policy</h1>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">Product Warranty</h2>
          <p className="mb-4">
            LEXA Lifestyle offers comprehensive warranty coverage on all products and installations:
          </p>
          <ul className="list-none space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#E8DCC8] flex-shrink-0 mt-1" />
              <span><strong>Premium Brands:</strong> Manufacturer warranty ranging from 1-5 years depending on the brand and product</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#E8DCC8] flex-shrink-0 mt-1" />
              <span><strong>Installation Work:</strong> 12-month warranty on all installation and integration services</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#E8DCC8] flex-shrink-0 mt-1" />
              <span><strong>Cabling & Infrastructure:</strong> 24-month warranty on structured cabling and network infrastructure</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What&apos;s Covered</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Manufacturing defects in materials or workmanship</li>
            <li>Installation errors or integration issues</li>
            <li>System malfunctions under normal use conditions</li>
            <li>Programming and configuration errors</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">What&apos;s Not Covered</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Damage from misuse, abuse, or unauthorized modifications</li>
            <li>Normal wear and tear or cosmetic damage</li>
            <li>Damage from power surges, lightning, or environmental factors</li>
            <li>Third-party products or services not supplied by LEXA</li>
            <li>Consumable items (batteries, remote controls)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">After-Sales Support</h2>
          <p className="mb-4">We provide comprehensive support services:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>24/7 Emergency Support:</strong> For critical system failures</li>
            <li><strong>Remote Assistance:</strong> Technical support via phone, email, or remote access</li>
            <li><strong>On-Site Service:</strong> Scheduled maintenance and repair visits</li>
            <li><strong>Annual Maintenance Contracts:</strong> Optional extended support packages available</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Claiming Warranty</h2>
          <p className="mb-4">To make a warranty claim:</p>
          <ol className="list-decimal pl-6 mb-8 space-y-2">
            <li>Contact our support team at <a href="tel:+97142670470" className="text-[#E8DCC8]">+971 42 670 470</a></li>
            <li>Provide your project details and purchase information</li>
            <li>Describe the issue in detail</li>
            <li>Our team will diagnose and schedule repair or replacement</li>
          </ol>

          <h2 className="text-2xl font-bold mt-12 mb-4">Extended Warranty</h2>
          <p className="mb-8">
            We offer extended warranty packages for additional peace of mind. Contact our sales team for customized maintenance and support plans tailored to your property.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="font-semibold mb-2">Need Support?</p>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
              Call: <a href="tel:+97142670470" className="text-[#E8DCC8]">+971 42 670 470</a><br/>
              Email: <a href="mailto:support@lexalifestyle.com" className="text-[#E8DCC8]">support@lexalifestyle.com</a><br/>
              WhatsApp: <a href="https://wa.me/+971521782109" className="text-[#E8DCC8]">+971 52 178 2109</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
