import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work With Us | Careers at LEXA Lifestyle Dubai',
  description: 'Join Dubai\'s leading smart home integration company. Explore career opportunities in home automation, AV installation, lighting design, and project management.',
  keywords: ['smart home jobs Dubai', 'AV technician jobs UAE', 'Control4 programmer jobs', 'home automation careers', 'LEXA careers'],
  openGraph: {
    title: 'Careers at LEXA Lifestyle - Smart Home Jobs Dubai',
    description: 'Join our team of smart home experts. We\'re hiring programmers, technicians, project managers, and sales consultants.',
    type: 'website',
  },
}

export default function WorkWithUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
