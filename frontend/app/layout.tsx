import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LEXA Lifestyle - Luxury Smart Living | Dubai',
  description: 'Luxury Smart Living, Designed & Delivered End-to-End. Premium home automation and system integration in Dubai, UAE.',
  keywords: 'luxury smart home, home automation Dubai, smart living, LEXA lifestyle, premium home technology',
  authors: [{ name: 'LEXA Lifestyle LLC' }],
  openGraph: {
    title: 'LEXA Lifestyle - Luxury Smart Living',
    description: 'Designed & Delivered End-to-End',
    url: 'https://lexalifestyle.com',
    siteName: 'LEXA Lifestyle',
    locale: 'en_AE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}