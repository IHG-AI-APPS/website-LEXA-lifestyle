import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms & Conditions | LEXA Lifestyle',
  description: 'Terms and conditions for LEXA Lifestyle services and products'
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-600 mb-8">
            Welcome to LEXA Lifestyle, a premium provider of luxury home automation, audio-visual systems, integrated smart home solutions, and intelligent lifestyle technologies. By accessing our website, visiting our premises, or engaging our services, you agree to comply with the terms outlined below.
          </p>

          <p className="mb-8">
            These Terms govern all interactions with Lexa Lifestyle, including but not limited to product purchases, project consultations, system design, installation, maintenance, after-sales service, and digital engagements.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Scope of Services</h2>
          <p className="mb-4">Lexa Lifestyle specializes in:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Smart home automation</li>
            <li>Lighting control systems</li>
            <li>Audio-visual integration</li>
            <li>Home cinemas and immersive environments</li>
            <li>Smart lighting and IoT solutions</li>
            <li>Enterprise and residential automation</li>
          </ul>
          <p className="mb-8">
            All quotations, design proposals, system specifications, project timelines, and deliverables are subject to written confirmation.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Intellectual Property</h2>
          <p className="mb-8">
            All website content, project images, designs, system schematics, artworks, branding, written materials, and digital assets belong exclusively to Lexa Lifestyle unless explicitly stated. Unauthorized usage, reproduction, or distribution is prohibited.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Client Responsibilities</h2>
          <p className="mb-4">Clients must:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Provide accurate project information and site readiness updates</li>
            <li>Ensure all required civil, electrical, network, and structural work is completed on time</li>
            <li>Maintain safe access for installation teams</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Changes & Variations</h2>
          <p className="mb-8">
            Any alterations to project scope, design, or material selections must be approved in writing. Variations may influence pricing or timelines.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Limitation of Liability</h2>
          <p className="mb-4">Lexa Lifestyle is not responsible for damages resulting from:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Third-party equipment</li>
            <li>Improper use</li>
            <li>Unauthorized modifications</li>
            <li>Site conditions beyond our control</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Governing Law</h2>
          <p className="mb-8">
            All interactions with Lexa Lifestyle comply with UAE federal laws, including consumer protection, electronic transactions, commercial compliance, and data privacy regulations.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
