import { Metadata } from 'next'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_privacy_policy', {
  title: 'Privacy Policy | LEXA Lifestyle',
  description: 'LEXA Lifestyle Privacy Policy - How we collect, use, and protect your personal information.',
  robots: 'index, follow',
})
}

export default function PrivacyPolicyPage() {
  return (
        <>
      <CmsReg />
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              LEXA Lifestyle Trading LLC ("LEXA," "we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you visit our website lexalifestyle.com, use our services, or interact with us.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-white mt-6 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">We may collect personally identifiable information, including but not limited to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Property details for project consultations</li>
              <li>Payment information for transactions</li>
              <li>Communication preferences</li>
              <li>Project requirements and specifications</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-white mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">We use collected information to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Provide, operate, and maintain our services</li>
              <li>Process and manage your project inquiries and bookings</li>
              <li>Send you relevant communications about our services</li>
              <li>Improve our website and customer experience</li>
              <li>Analyze usage patterns and optimize our offerings</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. 
              Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-white mt-6 mb-3">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. 
              However, some features of our website may not function properly without cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">We may share your information with:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li><strong>Service Providers:</strong> Third parties who assist us in operating our website and conducting our business</li>
              <li><strong>Business Partners:</strong> Trusted partners for project implementation (Control4, Crestron, Lutron dealers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">6. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure servers with access controls</li>
              <li>Regular security assessments</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">7. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-3">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@lexalifestyle.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required by law. Project-related data may be retained 
              for warranty and service purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">9. International Data Transfers</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your information may be transferred to and processed in countries other than the UAE. We ensure that 
              appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">10. Children's Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If you become aware that a child has provided us with personal information, 
              please contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this 
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">12. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mt-4">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">LEXA Lifestyle Trading LLC</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Al Quoz Industrial 1, SZR - Interchange No 3</p>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Dubai, United Arab Emirates</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Email: privacy@lexalifestyle.com</p>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Phone: +971 4 267 0470</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-[#1A1A1A] dark:text-white mb-4">13. UAE Compliance</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This Privacy Policy complies with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection 
              and other applicable UAE regulations governing data privacy and protection.
            </p>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}
