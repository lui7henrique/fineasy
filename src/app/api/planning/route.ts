import { calculateMonthlyReturns } from '@/utils/calculate-monthly-returns'
import { NextResponse } from 'next/server'

import { z } from 'zod'

const investmentSchema = z.number().positive()
const investmentTimeSchema = z.number().positive()
const investmentDateSchema = z.date()

export async function POST(request: Request) {
  try {
    const { investment, investmentTimeInMonths, investmentDate } =
      await request.json()

    const parsedInvestment = investmentSchema.parse(investment)
    const parsedInvestmentTime = investmentTimeSchema.parse(
      investmentTimeInMonths,
    )
    const parsedInvestmentDate = investmentDateSchema.parse(
      new Date(investmentDate),
    )

    const returns = await calculateMonthlyReturns(
      parsedInvestment,
      parsedInvestmentTime,
      100,
      parsedInvestmentDate,
    )

    return NextResponse.json(returns)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error:
          'Invalid input. Please provide valid investment, investmentTime and investmentDate',
      })
    } else {
      return NextResponse.json({ error: 'Internal server error' })
    }
  }
}
