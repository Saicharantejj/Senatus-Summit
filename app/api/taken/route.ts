import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.APPS_SCRIPT_URL
  if (!url) return NextResponse.json({ taken: [] })

  try {
    const res  = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    // If the sheet is unreachable, return empty — form still works
    return NextResponse.json({ taken: [] })
  }
}
