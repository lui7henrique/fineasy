import { calculateMonthlyReturns } from '@/utils/calculate-monthly-returns'
import { NextResponse } from 'next/server'

import { z } from 'zod'

const investmentSchema = z.number().positive()
const investmentTimeSchema = z.number().positive()

export async function POST(request: Request) {
  try {
    const { investment, investmentTimeInMonths } = await request.json()

    const parsedInvestment = investmentSchema.parse(investment)
    const parsedInvestmentTime = investmentTimeSchema.parse(
      investmentTimeInMonths,
    )

    const returns = await calculateMonthlyReturns(
      parsedInvestment,
      parsedInvestmentTime,
      115,
    )

    return NextResponse.json(returns)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error:
          'Invalid input. Please provide valid investment and investmentTime',
      })
    } else {
      return NextResponse.json({ error: 'Internal server error' })
    }
  }
}
