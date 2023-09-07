import { addMonths } from 'date-fns'

export type MonthlyInvestmentInfo = {
  id: string
  monthlyReturn: number
  investedAmount: number
  accumulatedAmount: number
  investmentDate: Date
}

export function calculateMonthlyReturns(
  investment: number,
  investmentTimeInMonths: number,
  investmentRate: number,
  investmentDate: Date,
  cdiRate: number,
): MonthlyInvestmentInfo[] {
  if (investment <= 0 || investmentTimeInMonths <= 0 || investmentRate <= 0) {
    throw new Error(
      'Investment, investmentTimeInMonths, and cdiRate must be positive values',
    )
  }

  const monthlyReturns: MonthlyInvestmentInfo[] = []
  let accumulatedAmount = 0

  for (let month = 1; month <= investmentTimeInMonths; month++) {
    const investmentRateReturn = (investmentRate / 100) * cdiRate

    const monthlyReturn = Number(
      (((investmentRateReturn / 100) * accumulatedAmount) / 12).toFixed(),
    )

    accumulatedAmount += investment + monthlyReturn
    const investedAmount = investment * month

    monthlyReturns.push({
      id: month.toString(),
      monthlyReturn,
      investedAmount,
      accumulatedAmount,
      investmentDate: addMonths(new Date(investmentDate), month),
    })
  }

  return monthlyReturns
}
