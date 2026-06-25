import type { Metadata } from 'next'
import Terms from '@/components/Terms'

export const metadata: Metadata = {
  title: 'Terms & Conditions — The Senatus Summit 2026',
  description: 'Terms and conditions for registering and attending The Senatus Summit 2026, including our refund and committee modification policies.',
}

export default function TermsPage() {
  return <Terms />
}
