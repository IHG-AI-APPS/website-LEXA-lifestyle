'use client'

import { useCms } from '@/hooks/useCms'

const fallback = {
  title: 'Privacy Policy',
  last_updated: 'February 2026',
  sections: [
    { heading: 'Data Collection', content: 'We collect essential personal and project-related information, including:\n- Name, email address, and contact number\n- Location & project details\n- Preferences, automation requirements, and technical specifications\n- Payment information (processed via secure third-party gateways)' },
    { heading: 'How We Use Your Data', content: 'Data is used strictly to:\n- Provide consultation and design services\n- Process and deliver orders\n- Improve website functionality\n- Conduct technical support and after-sales care\n- Share updates (only with explicit opt-in consent)' },
    { heading: 'Third-Party Sharing', content: 'We do not sell or trade your data. Limited sharing may occur only with:\n- Logistics partners\n- Certified technicians\n- Compliance and legal authorities (when required by UAE law)' },
    { heading: 'Your Rights', content: 'In accordance with UAE Data Protection Law (PDPL):\n- You may request data access\n- You may request correction or deletion\n- You may opt out of marketing communication at any time' },
    { heading: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. All payment transactions are processed through secure, PCI-DSS compliant gateways.' },
    { heading: 'Cookies', content: 'Our website uses cookies to enhance user experience, analyze site usage, and assist in our marketing efforts. You can control cookie preferences through your browser settings.' },
    { heading: 'Contact Us', content: 'For any privacy-related questions or to exercise your data rights, please contact us at sales@lexalifestyle.com or call +971 42 670 470.' },
  ],
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- ')) return <li key={i} className="text-gray-600 dark:text-gray-400">{line.replace(/^- /, '')}</li>
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{line}</p>
  })
}

export default function PrivacyContent() {
  const cms = useCms('page_privacy', fallback)

  const title = cms?.title || fallback.title
  const lastUpdated = cms?.last_updated || fallback.last_updated
  const sections = cms?.sections?.length ? cms.sections : fallback.sections

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="privacy-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Legal</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="privacy-title">{title}</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {sections.map((s: any, i: number) => (
              <div key={i} className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{s.heading}</h2>
                <div className="prose prose-sm max-w-none">
                  <ul className="list-disc pl-5 space-y-1">
                    {renderContent(s.content)}
                  </ul>
                </div>
              </div>
            ))}
            <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
