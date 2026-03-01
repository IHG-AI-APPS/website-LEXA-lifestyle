'use client'

import { useCms } from '@/hooks/useCms'

const fallback = {
  title: 'Terms & Conditions',
  last_updated: 'February 2026',
  intro: 'Welcome to LEXA Lifestyle, a premium provider of luxury home automation, audio-visual systems, integrated smart home solutions, and intelligent lifestyle technologies. By accessing our website, visiting our premises, or engaging our services, you agree to comply with the terms outlined below.',
  intro_2: 'These Terms govern all interactions with Lexa Lifestyle, including but not limited to product purchases, project consultations, system design, installation, maintenance, after-sales service, and digital engagements.',
  sections: [
    { heading: 'Scope of Services', content: 'Lexa Lifestyle specializes in:\n- Smart home automation\n- Lighting control systems\n- Audio-visual integration\n- Home cinemas and immersive environments\n- Smart lighting and IoT solutions\n- Enterprise and residential automation\n\nAll quotations, design proposals, system specifications, project timelines, and deliverables are subject to written confirmation.' },
    { heading: 'Intellectual Property', content: 'All website content, project images, designs, system schematics, artworks, branding, written materials, and digital assets belong exclusively to Lexa Lifestyle unless explicitly stated. Unauthorized usage, reproduction, or distribution is prohibited.' },
    { heading: 'Client Responsibilities', content: 'Clients must:\n- Provide accurate project information and site readiness updates\n- Ensure all required civil, electrical, network, and structural work is completed on time\n- Maintain safe access for installation teams' },
    { heading: 'Changes & Variations', content: 'Any alterations to project scope, design, or material selections must be approved in writing. Variations may influence pricing or timelines.' },
    { heading: 'Limitation of Liability', content: 'Lexa Lifestyle is not responsible for damages resulting from:\n- Third-party equipment\n- Improper use\n- Unauthorized modifications\n- Site conditions beyond our control' },
    { heading: 'Governing Law', content: 'All interactions with Lexa Lifestyle comply with UAE federal laws, including consumer protection, electronic transactions, commercial compliance, and data privacy regulations.' },
  ],
}

function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- ')) return <li key={i} className="text-gray-600 dark:text-gray-400">{line.replace(/^- /, '')}</li>
    if (line.trim() === '') return <br key={i} />
    return <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{line}</p>
  })
}

export default function TermsContent() {
  const cms = useCms('page_terms', fallback)

  const title = cms?.title || fallback.title
  const lastUpdated = cms?.last_updated || fallback.last_updated
  const intro = cms?.intro || fallback.intro
  const intro2 = cms?.intro_2 || fallback.intro_2
  const sections = cms?.sections?.length ? cms.sections : fallback.sections

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="terms-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Legal</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="terms-title">{title}</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{intro}</p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-10">{intro2}</p>
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
