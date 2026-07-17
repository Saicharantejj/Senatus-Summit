import type { Metadata } from 'next'
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'Schedule — The Senatus Summit 2026',
  description: 'Full two-day schedule for the Senatus Summit 2026 — August 1 & 2, 2026.',
}

export default function TimelinePage() {
  return <Timeline />
}
