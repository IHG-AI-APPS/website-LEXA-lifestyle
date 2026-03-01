'use client'

import { useCms } from '@/hooks/useCms'

const fallback = {
  title: 'Privacy Policy',
  last_updated: 'February 2026',
  sections: [
    { heading: '1. Introduction', content: 'LEXA Lifestyle Trading LLC ("LEXA," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website lexalifestyle.com, use our services, or interact with us.\n\nBy using our services, you agree to the collection and use of information in accordance with this policy.' },
    { heading: '2. Information We Collect', content: '**2.1 Personal Information**\nWe may collect personally identifiable information, including but not limited to:\n- Name and contact information (email, phone number, address)\n- Property details for project consultations\n- Payment information for transactions\n- Communication preferences\n- Project requirements and specifications\n\n**2.2 Automatically Collected Information**\nWhen you visit our website, we automatically collect:\n- Device information (browser type, operating system)\n- IP address and location data\n- Pages visited and time spent on our website\n- Referring website information\n- Cookies and similar tracking technologies' },
    { heading: '3. How We Use Your Information', content: 'We use collected information to:\n- Provide, operate, and maintain our services\n- Process and manage your project inquiries and bookings\n- Send you relevant communications about our services\n- Improve our website and customer experience\n- Analyze usage patterns and optimize our offerings\n- Comply with legal obligations\n- Prevent fraud and ensure security' },
    { heading: '4. Cookies and Tracking Technologies', content: 'We use cookies and similar tracking technologies to track activity on our website and store certain information.\n\n**Types of Cookies We Use:**\n- **Essential Cookies:** Required for website functionality\n- **Analytics Cookies:** Help us understand how visitors interact with our website\n- **Marketing Cookies:** Used to deliver relevant advertisements\n\nYou can instruct your browser to refuse all cookies or indicate when a cookie is being sent.' },
    { heading: '5. Information Sharing and Disclosure', content: 'We may share your information with:\n- **Service Providers:** Third parties who assist us in operating our website\n- **Business Partners:** Trusted partners for project implementation\n- **Legal Requirements:** When required by law or to protect our rights\n- **Business Transfers:** In connection with any merger, sale, or acquisition\n\nWe do not sell your personal information to third parties.' },
    { heading: '6. Data Security', content: 'We implement appropriate technical and organizational security measures to protect your personal information, including:\n- SSL/TLS encryption for data transmission\n- Secure servers with access controls\n- Regular security assessments\n- Employee training on data protection' },
    { heading: '7. Your Rights', content: 'You have the right to:\n- Access your personal data\n- Correct inaccurate information\n- Request deletion of your data\n- Object to processing of your data\n- Request data portability\n- Withdraw consent at any time\n\nTo exercise these rights, please contact us at privacy@lexalifestyle.com.' },
    { heading: '8. Data Retention', content: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.' },
    { heading: '9. International Data Transfers', content: 'Your information may be transferred to and processed in countries other than the UAE. We ensure that appropriate safeguards are in place.' },
    { heading: '10. Children\'s Privacy', content: 'Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.' },
    { heading: '11. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.' },
    { heading: '12. Contact Us', content: 'LEXA Lifestyle Trading LLC\nAl Quoz Industrial 1, SZR - Interchange No 3\nDubai, United Arab Emirates\nEmail: privacy@lexalifestyle.com\nPhone: +971 4 267 0470' },
    { heading: '13. UAE Compliance', content: 'This Privacy Policy complies with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection and other applicable UAE regulations.' },
  ],
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) return <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2">{line.replace(/\*\*/g, '')}</h3>
    if (line.startsWith('- **')) {
      const parts = line.replace(/^- /, '').split(':** ')
      return <li key={i} className="text-gray-600 dark:text-gray-400"><strong>{parts[0].replace(/\*\*/g, '')}:</strong> {parts[1]}</li>
    }
    if (line.startsWith('- ')) return <li key={i} className="text-gray-600 dark:text-gray-400">{line.replace(/^- /, '')}</li>
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{line}</p>
  })
}

export default function PrivacyPolicyContent() {
  const cms = useCms('page_privacy_policy', fallback)

  const title = cms?.title || fallback.title
  const lastUpdated = cms?.last_updated || fallback.last_updated
  const sections = cms?.sections?.length ? cms.sections : fallback.sections

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="privacy-policy-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Legal</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="privacy-policy-title">{title}</h1>
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
          </div>
        </div>
      </section>
    </div>
  )
}
