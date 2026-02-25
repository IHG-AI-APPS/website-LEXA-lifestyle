import { Metadata } from 'next'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_vendor_supplier', {
    title: 'Become a Vendor or Supplier | LEXA Smart Home Procurement | GCC Distribution',
    description: 'Register as an approved vendor or supplier for LEXA smart home distribution in UAE, Saudi Arabia & GCC. We source home automation, audio, lighting, security & HVAC products from global manufacturers.',
    keywords: [
      'smart home supplier GCC',
      'home automation vendor UAE',
      'AV equipment distributor Dubai',
      'smart home manufacturer partner',
      'Control4 competitor supplier',
      'home automation wholesale GCC',
      'smart lighting vendor Middle East',
      'security systems supplier UAE',
      'HVAC smart controls vendor',
      'audio equipment supplier Dubai',
      'smart home OEM partner',
      'B2B smart home supplier',
      'GCC distribution partner',
      'smart home procurement UAE'
    ],
    openGraph: {
      title: 'Become a LEXA Approved Vendor - Smart Home Distribution GCC',
      description: 'Register as an approved vendor for smart home distribution across UAE, Saudi Arabia & GCC. We source automation, audio, lighting & security products.',
      type: 'website',
      locale: 'en_AE',
    },
    alternates: {
      canonical: '/vendor-supplier',
    },
    robots: {
      index: true,
      follow: true,
    }
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
