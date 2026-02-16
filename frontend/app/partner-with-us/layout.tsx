import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Dealer or Distributor | LEXA Smart Home Partnership Program | GCC',
  description: 'Join LEXA as an authorized smart home dealer or distributor in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain & Oman. Access Control4, Crestron, Lutron, Sonos & 30+ premium brands. Competitive margins, training & support.',
  keywords: [
    'smart home dealer UAE',
    'smart home distributor GCC',
    'Control4 dealer Dubai',
    'Crestron distributor Saudi Arabia',
    'Lutron dealer Qatar',
    'home automation dealer Kuwait',
    'AV integrator partner Bahrain',
    'smart home franchise Oman',
    'become smart home dealer',
    'smart home business opportunity',
    'home automation partnership',
    'B2B smart home',
    'wholesale smart home products',
    'smart home reseller program'
  ],
  openGraph: {
    title: 'Partner With LEXA - Smart Home Dealer & Distributor Program',
    description: 'Become an authorized smart home dealer or distributor across the GCC. Access 30+ premium brands with competitive margins and full support.',
    type: 'website',
    locale: 'en_AE',
  },
  alternates: {
    canonical: '/partner-with-us',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
