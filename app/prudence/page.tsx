import type { Metadata } from 'next'
import Application from '@/components/Application'

export const metadata: Metadata = {
  title: 'Prudence 16B Registration — The Senatus Summit 2026',
  description: 'Special discounted registration portal for the students of Prudence School, Dwarka Sector 16B.',
}

export default function PrudencePage() {
  return <Application isPrudence={true} />
}
