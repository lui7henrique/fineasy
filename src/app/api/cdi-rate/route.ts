import { NextResponse } from 'next/server'
import { getCdiRate } from 'selic'

export async function GET() {
  const cdiRate = await getCdiRate()

  return NextResponse.json({ cdiRate })
}
