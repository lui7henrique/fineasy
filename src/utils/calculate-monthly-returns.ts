import { getCdiRate } from 'selic'

type MonthlyInvestmentInfo = {
  monthlyReturn: number
  investedAmount: number
  accumulatedAmount: number
}

export async function calculateMonthlyReturns(
  investment: number,
  investmentTimeInMonths: number,
  investmentRate: number,
): Promise<MonthlyInvestmentInfo[]> {
  if (investment <= 0 || investmentTimeInMonths <= 0 || investmentRate <= 0) {
    throw new Error(
      'Investment, investmentTimeInMonths, and cdiRate must be positive values',
    )
  }

  const monthlyReturns: MonthlyInvestmentInfo[] = []
  let accumulatedAmount = 0

  const cdiRate = await getCdiRate()

  for (let month = 1; month <= investmentTimeInMonths; month++) {
    const investmentRateReturn = (investmentRate / 100) * cdiRate

    const monthlyReturn = Number(
      (((investmentRateReturn / 100) * accumulatedAmount) / 12).toFixed(),
    )

    accumulatedAmount += investment + monthlyReturn
    const investedAmount = investment * month

    monthlyReturns.push({
      monthlyReturn,
      investedAmount,
      accumulatedAmount,
    })
  }

  return monthlyReturns
}
