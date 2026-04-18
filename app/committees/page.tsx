import type { Metadata } from 'next'
import Committees from '@/components/Committees'

export const metadata: Metadata = {
  title: 'Committees — The Senatus Summit 2026',
  description: 'Explore the six committees at the Senatus Summit 2026, covering human rights, geopolitics, finance, motorsport governance, and more.',
}

export default function CommitteesPage() {
  return <Committees />
}
