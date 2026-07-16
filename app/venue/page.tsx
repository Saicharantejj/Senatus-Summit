import type { Metadata } from 'next'
import Venue from '@/components/Venue'

export const metadata: Metadata = {
  title: 'Venue — The Senatus Summit 2026',
  description: 'Discover the official venue partner of the Senatus Summit 2026.',
}

export default function VenuePage() {
  return <Venue />
}
