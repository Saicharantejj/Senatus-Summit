import type { Metadata } from 'next'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'About — The Senatus Summit 2026',
  description: 'Learn about The Senatus Summit — a premier Model United Nations conference inspired by the legacy of the Roman Senate.',
}

export default function AboutPage() {
  return <About />
}
