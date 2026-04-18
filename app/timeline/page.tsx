import type { Metadata } from 'next'
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'Schedule — The Senatus Summit 2026',
  description: 'Full two-day schedule for the Senatus Summit 2026 — July 11 & 12, 2026.',
}

export default function TimelinePage() {
  return <Timeline />
}
