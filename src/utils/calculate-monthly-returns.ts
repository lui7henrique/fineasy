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
  realAccumulatedAmount?: number
  realAccumulatedReturns?: number
  inflationLoss?: number
}

type CalculateMonthlyReturnsOptions = {
  investmentValue: number
  investmentTimeInMonths: number
  investmentRate: number
  investmentDate: Date
  cdiRate: number
  applyInflation?: boolean
  inflationRate?: number
}

export function calculateMonthlyReturns(
  options: CalculateMonthlyReturnsOptions
): MonthlyInvestmentInfo[] {
  const {
    investmentValue,
    investmentTimeInMonths,
    investmentDate,
    investmentRate,
    cdiRate,
    applyInflation = false,
    inflationRate = 4.5,
  } = options

  if (
    investmentValue <= 0 ||
    investmentTimeInMonths <= 0 ||
    investmentRate <= 0
  ) {
    throw new Error(
      'Investment, investmentTimeInMonths, and cdiRate must be positive values'
    )
  }

  const monthlyReturns: MonthlyInvestmentInfo[] = []
  let accumulatedAmount = 0

  const monthlyInflationRate = (1 + inflationRate / 100) ** (1 / 12) - 1

  for (let month = 1; month <= investmentTimeInMonths; month++) {
    const investmentRateReturn = formatValue((investmentRate / 100) * cdiRate)

    const monthlyReturn = formatValue(
      Number(((investmentRateReturn / 100) * accumulatedAmount) / 12)
    )

    accumulatedAmount += investmentValue + monthlyReturn
    const investedAmount = investmentValue * month

    const monthlyInfo: MonthlyInvestmentInfo = {
      id: month.toString(),
      monthlyInvestment: investmentValue,
      monthlyReturn,
      investedAmount,
      accumulatedAmount,
      accumulatedReturns: accumulatedAmount - investedAmount,
      investmentDate: addMonths(new Date(investmentDate), month),
    }

    if (applyInflation) {
      const inflationFactor = (1 + monthlyInflationRate) ** month
      const realAccumulatedAmount = formatValue(
        accumulatedAmount / inflationFactor
      )
      const realAccumulatedReturns = formatValue(
        realAccumulatedAmount - investedAmount
      )
      const inflationLoss = formatValue(
        accumulatedAmount - realAccumulatedAmount
      )

      monthlyInfo.realAccumulatedAmount = realAccumulatedAmount
      monthlyInfo.realAccumulatedReturns = realAccumulatedReturns
      monthlyInfo.inflationLoss = inflationLoss
    }

    monthlyReturns.push(monthlyInfo)
  }

  return monthlyReturns
}
