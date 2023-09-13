import { addMonths } from 'date-fns'
import { formatValue } from './format-value'

export type MonthlyInvestmentInfo = {
  id: string
  investedAmount: number
  accumulatedAmount: number
  investmentDate: Date
  monthlyReturn: number
  monthlyInvestment: number
  accumulatedReturns: number
}

type CalculateMonthlyReturnsOptions = {
  investmentValue: number
  investmentTimeInMonths: number
  investmentRate: number
  investmentDate: Date
  cdiRate: number
}

export function calculateMonthlyReturns(
  options: CalculateMonthlyReturnsOptions,
): MonthlyInvestmentInfo[] {
  const {
    investmentValue,
    investmentTimeInMonths,
    investmentDate,
    investmentRate,
    cdiRate,
  } = options

  if (
    investmentValue <= 0 ||
    investmentTimeInMonths <= 0 ||
    investmentRate <= 0
  ) {
    throw new Error(
      'Investment, investmentTimeInMonths, and cdiRate must be positive values',
    )
  }

  const monthlyReturns: MonthlyInvestmentInfo[] = []
  let accumulatedAmount = 0

  for (let month = 1; month <= investmentTimeInMonths; month++) {
    const investmentRateReturn = formatValue((investmentRate / 100) * cdiRate)

    const monthlyReturn = formatValue(
      Number(((investmentRateReturn / 100) * accumulatedAmount) / 12),
    )

    accumulatedAmount += investmentValue + monthlyReturn
    const investedAmount = investmentValue * month

    monthlyReturns.push({
      id: month.toString(),
      monthlyInvestment: investmentValue,
      monthlyReturn,
      investedAmount,
      accumulatedAmount,
      accumulatedReturns: accumulatedAmount - investedAmount,
      investmentDate: addMonths(new Date(investmentDate), month),
    })
  }

  return monthlyReturns
}
