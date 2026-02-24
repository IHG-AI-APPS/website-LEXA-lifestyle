import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Download, CheckCircle2, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Architect Guide to Smart Home Planning UAE | LEXA Lifestyle',
  description: 'Essential guide for architects specifying smart home automation in UAE villas. BOQ templates, CAD blocks, MEP coordination, and technical specs.',
  keywords: 'architect automation guide, smart home specifications, MEP coordination, automation BOQ, villa automation planning',
}

export default function ArchitectAutomationGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
              <Link href="/resources" className="hover:text-white">Resources</Link>
              <span>/</span>
              <span>Architect Guide</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              What Architects Should Know Before Specifying Automation
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete technical guide for integrating smart home systems in UAE luxury villa projects
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/architects">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                  <Download className="mr-2" size={20} />
                  Get Resources
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Technical Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Planning Stages */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">5 Critical Planning Stages</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Concept Design (DD Phase)</h3>
                  <p className="text-gray-700 mb-4">
                    Engage automation integrator during early design. Decisions made here impact final aesthetics and cost by 40%.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Key Questions:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Wired (KNX) or wireless (Zigbee) infrastructure?</li>
                      <li>• Where will control panels and touch screens be located?</li>
                      <li>• Server room size and cooling requirements?</li>
                      <li>• Ceiling depth needed for motorized systems?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">MEP Coordination (CD Phase)</h3>
                  <p className="text-gray-700 mb-4">
                    Automation isn&apos;t a separate trade—it touches electrical, mechanical, and IT. Coordinate early or face change orders.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Integration Points:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Electrical: Load calculations, dedicated circuits, emergency lighting</li>
                      <li>• Mechanical: BMS integration, VAV control, energy monitoring</li>
                      <li>• IT: Network backbone, Wi-Fi planning, AV distribution</li>
                      <li>• Interiors: Device mounting, cable concealment, switch plate design</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Technical Specifications</h3>
                  <p className="text-gray-700 mb-4">
                    Don&apos;t specify brands too early. Performance requirements let you compare competitive bids while maintaining quality.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Sample Spec Language:</p>
                    <p className="text-sm text-gray-700 italic">
                      &quot;Lighting control system shall be open-protocol (KNX or equivalent), supporting minimum 500 addressable devices, 
                      with graphical programming interface and mobile app control. Manufacturer to provide 2-year warranty and local support.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Contractor Selection</h3>
                  <p className="text-gray-700 mb-4">
                    Not all integrators are equal. Vet for luxury villa experience, not apartment projects.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Qualification Criteria:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• CEDIA or equivalent certification</li>
                      <li>• 3+ comparable villa projects in UAE</li>
                      <li>• Manufacturer training certificates</li>
                      <li>• Dedicated project management capability</li>
                      <li>• Post-handover support structure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Commissioning & Handover</h3>
                  <p className="text-gray-700 mb-4">
                    Automation should be the last system commissioned—after painting, furniture, and final cleaning.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Handover Documentation:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• As-built drawings with device addressing</li>
                      <li>• Programming backup files</li>
                      <li>• User manuals and training videos</li>
                      <li>• Warranty certificates</li>
                      <li>• Support contact information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-24 md:py-32 bg-gallery-base">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">7 Costly Mistakes to Avoid</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">Insufficient Conduit Sizing</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Standard 20mm conduits can&apos;t handle automation + AV + networking. Specify 32mm minimum for future-proofing.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">No Server Room Cooling</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Equipment racks generate 2-3 kW heat. Dedicated mini-split or VRV zone is mandatory, not optional.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">Late Network Planning</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Wi-Fi as afterthought causes dead zones. Plan structured cabling and AP locations during DD phase.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">Ignoring False Ceiling Depth</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Motorized shades need 180-220mm. Speakers need 150mm. Check with integrator before finalizing heights.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">Over-Specifying Brands</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Locking to one brand eliminates competition. Specify performance requirements, not product names.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">No Cable Management Strategy</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Visible cables ruin luxury interiors. Plan cable trays, floor boxes, and in-wall routing early.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">Forgetting Power Backup</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Smart homes need UPS for network and servers. Size for 4-hour runtime minimum.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <h3 className="font-bold text-lg">No Integration Budget</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Owners assume automation is &quot;included.&quot; Clarify budget expectations during concept phase to avoid VE surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12">Resources for Architects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/architects">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all">
                  <FileText size={40} className="mb-4" />
                  <h3 className="font-bold text-lg mb-2">Sample BOQ Templates</h3>
                  <p className="text-sm text-gray-600 mb-4">Excel and PDF formats for cost estimation</p>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <span>Request Access</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>

              <Link href="/architects">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all">
                  <FileText size={40} className="mb-4" />
                  <h3 className="font-bold text-lg mb-2">CAD Blocks & Symbols</h3>
                  <p className="text-sm text-gray-600 mb-4">DWG and Revit families for devices</p>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <span>Request Access</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>

              <Link href="/architects">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all">
                  <FileText size={40} className="mb-4" />
                  <h3 className="font-bold text-lg mb-2">Specification Text</h3>
                  <p className="text-sm text-gray-600 mb-4">Ready-to-use technical specs</p>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <span>Request Access</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-8 bg-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Need Project Support?</h3>
              <p className="text-gray-700 mb-4">
                Our engineering team provides free technical consultations for architects during design phase. 
                We review drawings, provide load calculations, and offer MEP coordination guidance—no obligation.
              </p>
              <Link href="/consultation">
                <Button className="bg-black hover:bg-gray-800 uppercase tracking-widest">
                  Schedule Technical Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Partner With Technical Experts
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              LEXA supports architects from concept through commissioning. Get resources, technical support, and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/architects">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 uppercase tracking-widest">
                  <Download className="mr-2" size={20} />
                  Get All Resources
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest">
                  Talk to Engineer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
