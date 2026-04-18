import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const url = process.env.APPS_SCRIPT_URL
  if (!url) {
    return NextResponse.json({ success: false, error: 'Server not configured.' }, { status: 500 })
  }

  try {
    const body = await req.json()

    // Validate required fields
    const { name, email, fileName, fileBase64 } = body
    if (!name || !email || !fileName || !fileBase64) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 })
    }

    // Forward to Apps Script with action flag
    const res = await fetch(url, {
      method:   'POST',
      headers:  { 'Content-Type': 'application/json' },
      body:     JSON.stringify({ action: 'payment', name, email, fileName, fileBase64 }),
      redirect: 'follow',
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Payment API error:', err)
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 })
  }
}
