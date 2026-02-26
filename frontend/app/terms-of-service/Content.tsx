'use client'

import { useCms } from '@/hooks/useCms'

const fallback = {
  title: 'Terms of Service',
  last_updated: 'February 2026',
  sections: [
    { heading: '1. Agreement to Terms', content: 'By accessing or using the services provided by LEXA Lifestyle Trading LLC ("LEXA," "we," "us," or "our"), including our website, smart home automation services, and related offerings, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our services.' },
    { heading: '2. Services Description', content: 'LEXA Lifestyle provides luxury smart home automation services, including but not limited to:\n- Smart home system design and consultation\n- Installation of automation systems (Control4, Crestron, Lutron, KNX)\n- Home cinema and audio-visual integration\n- Lighting control and climate automation\n- Security and surveillance systems\n- Maintenance and support services\n- Online calculators and project planning tools' },
    { heading: '3. Quotations and Pricing', content: 'All quotations and estimates provided through our website, including the smart home calculator, are indicative only and subject to:\n- Site survey and technical assessment\n- Specific requirements and customizations\n- Current market prices for equipment\n- Project complexity and scope changes\n\nFinal pricing will be confirmed in a formal quotation document after consultation. All prices are in UAE Dirhams (AED) and exclusive of VAT unless otherwise stated.' },
    { heading: '4. Project Engagement', content: '**4.1 Consultation**\nInitial consultations are complimentary. Detailed design consultations may be subject to fees, which will be clearly communicated in advance.\n\n**4.2 Contract Formation**\nA binding contract is formed only upon written acceptance of our formal quotation and receipt of the agreed deposit payment.\n\n**4.3 Payment Terms**\nStandard payment terms are:\n- 50% deposit upon contract signing\n- 40% upon equipment delivery\n- 10% upon project completion and handover' },
    { heading: '5. Warranty and Support', content: '**5.1 Installation Warranty**\nAll LEXA installations include a 2-year comprehensive warranty covering:\n- Workmanship and installation quality\n- System programming and configuration\n- Integration and functionality\n\n**5.2 Equipment Warranty**\nEquipment warranties vary by product:\n- Control4: 3 years\n- Crestron: 3 years\n- Lutron: 5 years\n- Other equipment: As per manufacturer terms\n\n**5.3 Extended Support**\nAnnual Maintenance Contracts (AMC) are available for continued support beyond the warranty period.' },
    { heading: '6. Client Responsibilities', content: 'Clients are responsible for:\n- Providing accurate property information and access\n- Ensuring adequate electrical infrastructure\n- Coordinating with other contractors as needed\n- Obtaining necessary permissions and approvals\n- Protecting installed equipment from damage\n- Timely communication and decision-making' },
    { heading: '7. Intellectual Property', content: 'All content on our website, including text, graphics, logos, images, and software, is the property of LEXA Lifestyle or its licensors and is protected by UAE and international intellectual property laws.' },
    { heading: '8. Website Use', content: 'When using our website, you agree not to:\n- Use the website for any unlawful purpose\n- Attempt to gain unauthorized access to any systems\n- Transmit viruses or malicious code\n- Collect user information without consent\n- Interfere with the website\'s operation\n- Submit false or misleading information' },
    { heading: '9. Limitation of Liability', content: 'To the maximum extent permitted by UAE law:\n- LEXA\'s total liability shall not exceed the contract value\n- We are not liable for indirect, consequential, or incidental damages\n- We are not liable for third-party equipment failures beyond warranty\n- Calculator estimates are for guidance only and not guaranteed' },
    { heading: '10. Cancellation and Refunds', content: '**10.1 Client Cancellation**\nIf you cancel after contract signing:\n- Before equipment order: 25% of contract value retained\n- After equipment order: Deposit non-refundable, equipment delivered\n- During installation: Payment for completed work plus materials\n\n**10.2 LEXA Cancellation**\nWe reserve the right to cancel projects due to non-payment, site access issues, or circumstances beyond our control.' },
    { heading: '11. Force Majeure', content: 'Neither party shall be liable for delays or failures due to circumstances beyond reasonable control, including natural disasters, war, pandemic, government actions, or supply chain disruptions.' },
    { heading: '12. Dispute Resolution', content: 'Any disputes arising from these Terms shall be:\n- First addressed through good-faith negotiation\n- If unresolved, submitted to mediation in Dubai\n- Finally resolved by Dubai Courts under UAE law' },
    { heading: '13. Governing Law', content: 'These Terms are governed by the laws of the United Arab Emirates. The Dubai Courts shall have exclusive jurisdiction over any disputes.' },
    { heading: '14. Changes to Terms', content: 'We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our services constitutes acceptance of modified Terms.' },
    { heading: '15. Contact Information', content: 'LEXA Lifestyle Trading LLC\nAl Quoz Industrial 1, SZR - Interchange No 3\nDubai, United Arab Emirates\nEmail: legal@lexalifestyle.com\nPhone: +971 4 267 0470\nTRN: 104472899400003' },
    { heading: '16. Severability', content: 'If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.' },
  ],
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) return <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2">{line.replace(/\*\*/g, '')}</h3>
    if (line.startsWith('- ')) return <li key={i} className="text-gray-600 dark:text-gray-400">{line.replace(/^- /, '')}</li>
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{line}</p>
  })
}

export default function TermsOfServiceContent() {
  const cms = useCms('page_terms_of_service', fallback)

  const title = cms?.title || fallback.title
  const lastUpdated = cms?.last_updated || fallback.last_updated
  const sections = cms?.sections?.length ? cms.sections : fallback.sections

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="terms-of-service-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Legal</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="tos-title">{title}</h1>
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
