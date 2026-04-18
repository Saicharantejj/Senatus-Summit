import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Contact — The Senatus Summit 2026',
  description: 'Get in touch with the Senatus Summit team. Email us at thesenatussummit@gmail.com.',
}

export default function ContactPage() {
  return <Contact />
}
