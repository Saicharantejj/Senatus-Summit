import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Senatus Summit 2026 | Where Debate Meets Diplomacy',
  description:
    'The Senatus Summit is a premier Model United Nations conference uniting the brightest minds in debate and diplomacy. August 1–2, 2026.',
  keywords: ['Model UN', 'MUN', 'Senatus Summit', 'conference', 'debate', 'diplomacy', '2026'],
  openGraph: {
    title: 'The Senatus Summit 2026',
    description: 'Where Debate Meets Diplomacy — August 1–2, 2026',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cinzel.variable} ${inter.variable} bg-[#0a0d12] text-[#94a3b8] antialiased font-inter relative min-h-screen overflow-x-hidden`}>
        <div className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
