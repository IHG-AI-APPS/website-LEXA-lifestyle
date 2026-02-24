import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | LEXA Lifestyle',
  description: 'LEXA Lifestyle Terms of Service - Terms and conditions for using our smart home automation services.',
  robots: 'index, follow',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1A1A1A] mb-4">Terms of Service</h1>
          <p className="text-gray-500">Last updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using the services provided by LEXA Lifestyle Trading LLC ("LEXA," "we," "us," or "our"), 
              including our website, smart home automation services, and related offerings, you agree to be bound by 
              these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">2. Services Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              LEXA Lifestyle provides luxury smart home automation services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Smart home system design and consultation</li>
              <li>Installation of automation systems (Control4, Crestron, Lutron, KNX)</li>
              <li>Home cinema and audio-visual integration</li>
              <li>Lighting control and climate automation</li>
              <li>Security and surveillance systems</li>
              <li>Maintenance and support services</li>
              <li>Online calculators and project planning tools</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">3. Quotations and Pricing</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All quotations and estimates provided through our website, including the smart home calculator, are 
              indicative only and subject to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Site survey and technical assessment</li>
              <li>Specific requirements and customizations</li>
              <li>Current market prices for equipment</li>
              <li>Project complexity and scope changes</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              Final pricing will be confirmed in a formal quotation document after consultation. 
              All prices are in UAE Dirhams (AED) and exclusive of VAT unless otherwise stated.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">4. Project Engagement</h2>
            
            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">4.1 Consultation</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Initial consultations are complimentary. Detailed design consultations may be subject to fees, 
              which will be clearly communicated in advance.
            </p>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">4.2 Contract Formation</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A binding contract is formed only upon written acceptance of our formal quotation and receipt of 
              the agreed deposit payment. These Terms form part of any such contract.
            </p>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">4.3 Payment Terms</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Standard payment terms are:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>50% deposit upon contract signing</li>
              <li>40% upon equipment delivery</li>
              <li>10% upon project completion and handover</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              Custom payment schedules may be agreed upon for large projects.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">5. Warranty and Support</h2>
            
            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">5.1 Installation Warranty</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All LEXA installations include a 2-year comprehensive warranty covering:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Workmanship and installation quality</li>
              <li>System programming and configuration</li>
              <li>Integration and functionality</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">5.2 Equipment Warranty</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Equipment warranties are provided by manufacturers and vary by product:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Control4: 3 years</li>
              <li>Crestron: 3 years</li>
              <li>Lutron: 5 years</li>
              <li>Other equipment: As per manufacturer terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">5.3 Extended Support</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Annual Maintenance Contracts (AMC) are available for continued support beyond the warranty period.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">6. Client Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Clients are responsible for:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Providing accurate property information and access</li>
              <li>Ensuring adequate electrical infrastructure</li>
              <li>Coordinating with other contractors as needed</li>
              <li>Obtaining necessary permissions and approvals</li>
              <li>Protecting installed equipment from damage</li>
              <li>Timely communication and decision-making</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, is the property 
              of LEXA Lifestyle or its licensors and is protected by UAE and international intellectual property laws. 
              System designs and programming created for your project remain our intellectual property until final 
              payment is received.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">8. Website Use</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">When using our website, you agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Transmit viruses or malicious code</li>
              <li>Collect user information without consent</li>
              <li>Interfere with the website's operation</li>
              <li>Submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To the maximum extent permitted by UAE law:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>LEXA's total liability shall not exceed the contract value</li>
              <li>We are not liable for indirect, consequential, or incidental damages</li>
              <li>We are not liable for third-party equipment failures beyond warranty</li>
              <li>Calculator estimates are for guidance only and not guaranteed</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">10. Cancellation and Refunds</h2>
            
            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">10.1 Client Cancellation</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you cancel after contract signing:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Before equipment order: 25% of contract value retained</li>
              <li>After equipment order: Deposit non-refundable, equipment delivered</li>
              <li>During installation: Payment for completed work plus materials</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1A1A1A] mt-6 mb-3">10.2 LEXA Cancellation</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to cancel projects due to non-payment, site access issues, or circumstances 
              beyond our control. In such cases, refunds will be calculated based on work completed and materials ordered.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">11. Force Majeure</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Neither party shall be liable for delays or failures due to circumstances beyond reasonable control, 
              including natural disasters, war, pandemic, government actions, or supply chain disruptions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">12. Dispute Resolution</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Any disputes arising from these Terms or our services shall be:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>First addressed through good-faith negotiation</li>
              <li>If unresolved, submitted to mediation in Dubai</li>
              <li>Finally resolved by Dubai Courts under UAE law</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">13. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms are governed by the laws of the United Arab Emirates. The Dubai Courts shall have 
              exclusive jurisdiction over any disputes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">14. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting 
              to our website. Continued use of our services constitutes acceptance of modified Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">15. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mt-4">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">LEXA Lifestyle Trading LLC</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Al Quoz Industrial 1, SZR - Interchange No 3</p>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Dubai, United Arab Emirates</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Email: legal@lexalifestyle.com</p>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Phone: +971 4 267 0470</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">TRN: 104472899400003</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] mb-4">16. Severability</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall 
              continue in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
