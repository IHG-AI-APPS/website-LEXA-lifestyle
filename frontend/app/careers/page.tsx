import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Briefcase, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Careers | LEXA Lifestyle',
  description: 'Join the LEXA Lifestyle team and shape the future of smart living in Dubai'
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <Link href="/">
            <Button variant="outline" className="mb-8 border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Be part of a team that&apos;s redefining smart luxury living across the Middle East. We&apos;re looking for passionate individuals to shape the future of home automation and AV integration.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold mb-12">Why LEXA Lifestyle?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Innovation & Excellence</h3>
              <p className="text-gray-600">
                Work with cutting-edge technologies from world-leading brands like Savant, Crestron, Bowers & Wilkins, and Sony.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Growth & Learning</h3>
              <p className="text-gray-600">
                Continuous training, certifications, and career development opportunities in smart home and AV technologies.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Prestigious Projects</h3>
              <p className="text-gray-600">
                Work on high-end residential villas, luxury hotels, and commercial projects across Dubai and the UAE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold mb-12">Open Positions</h2>
          
          <div className="space-y-6">
            {[
              {
                title: 'Smart Home Systems Engineer',
                department: 'Engineering',
                location: 'Dubai, UAE',
                type: 'Full-time'
              },
              {
                title: 'Audio-Visual Integration Specialist',
                department: 'Technical',
                location: 'Dubai, UAE',
                type: 'Full-time'
              },
              {
                title: 'Project Manager - Smart Living',
                department: 'Operations',
                location: 'Dubai, UAE',
                type: 'Full-time'
              },
              {
                title: 'Sales Consultant - Luxury Automation',
                department: 'Sales',
                location: 'Dubai, UAE',
                type: 'Full-time'
              },
              {
                title: 'Home Cinema Design Specialist',
                department: 'Design',
                location: 'Dubai, UAE',
                type: 'Full-time'
              }
            ].map((job, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-[#E8DCC8] transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-3xl font-bold mb-8">How to Apply</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Interested in joining our team? We&apos;d love to hear from you.
            </p>
            
            <ol className="list-decimal pl-6 space-y-3 mb-8">
              <li>Review the open positions above</li>
              <li>Prepare your CV/resume and portfolio (if applicable)</li>
              <li>Send your application to <a href="mailto:careers@lexalifestyle.com" className="text-[#E8DCC8]">careers@lexalifestyle.com</a></li>
              <li>Include the position title in your email subject line</li>
            </ol>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-2">
                <strong>Email:</strong> <a href="mailto:careers@lexalifestyle.com" className="text-[#E8DCC8]">careers@lexalifestyle.com</a>
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> <a href="tel:+97142670470" className="text-[#E8DCC8]">+971 42 670 470</a>
              </p>
              <p>
                <strong>Address:</strong> Al Quoz 1, Sheikh Zayed Road, 3rd Interchange, Dubai, UAE
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
