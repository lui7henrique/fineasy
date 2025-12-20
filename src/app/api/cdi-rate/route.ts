import { NextResponse } from 'next/server'
import { getSafeCdiRate } from '@/lib/cdi-rate'

export const dynamic = 'force-dynamic'

export async function GET() {
  const cdiRate = await getSafeCdiRate()

  return NextResponse.json({ cdiRate })
}
