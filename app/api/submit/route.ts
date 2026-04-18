import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = process.env.APPS_SCRIPT_URL
  if (!url) {
    return NextResponse.json(
      { success: false, error: 'Server not configured. Contact the admin.' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()

    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
      redirect: 'follow',
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json(
      { success: false, error: 'Submission failed. Please try again.' },
      { status: 500 }
    )
  }
}
