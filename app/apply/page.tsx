import type { Metadata } from 'next'
import Application from '@/components/Application'
import Payment from '@/components/Payment'

export const metadata: Metadata = {
  title: 'Apply — The Senatus Summit 2026',
  description: 'Apply as a delegate for the Senatus Summit 2026. Applications are open — secure your seat today.',
}

export default function ApplyPage() {
  return (
    <>
      <Application />
      <Payment />
    </>
  )
}
