import { addMonths, differenceInDays } from 'date-fns'
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
  taxRate?: number
  taxAmount?: number
  netAccumulatedAmount?: number
  netAccumulatedReturns?: number
}

type CalculateMonthlyReturnsOptions = {
  investmentValue: number
  initialInvestment?: number
  investmentTimeInMonths: number
  investmentRate: number
  investmentDate: Date
  cdiRate: number
  applyInflation?: boolean
  inflationRate?: number
  businessDaysOnly?: boolean
  applyTaxes?: boolean
}

function getTaxRate(days: number): number {
  if (days <= 180) return 22.5
  if (days <= 360) return 20
  if (days <= 720) return 17.5
  return 15
}

export function calculateMonthlyReturns(
  options: CalculateMonthlyReturnsOptions
): MonthlyInvestmentInfo[] {
  const {
    investmentValue,
    initialInvestment = 0,
    investmentTimeInMonths,
    investmentDate,
    investmentRate,
    cdiRate,
    applyInflation = false,
    inflationRate = 4.5,
    businessDaysOnly = false,
    applyTaxes = false,
  } = options

  if (investmentTimeInMonths <= 0 || investmentRate <= 0) {
    throw new Error(
      'investmentTimeInMonths and investmentRate must be positive values'
    )
  }

  if (investmentValue <= 0 && initialInvestment <= 0) {
    throw new Error(
      'At least one of investmentValue or initialInvestment must be greater than 0'
    )
  }

  const monthlyReturns: MonthlyInvestmentInfo[] = []
  let accumulatedAmount = initialInvestment

  const monthlyInflationRate = (1 + inflationRate / 100) ** (1 / 12) - 1

  const daysPerMonth = businessDaysOnly ? 21 : 30
  const daysPerYear = businessDaysOnly ? 252 : 365

  const effectiveAnnualRate = (investmentRate / 100) * (cdiRate / 100)

  const dailyRate = (1 + effectiveAnnualRate) ** (1 / daysPerYear) - 1

  const monthlyRate = (1 + dailyRate) ** daysPerMonth - 1

  const startDate = new Date(investmentDate)

  for (let month = 1; month <= investmentTimeInMonths; month++) {
    accumulatedAmount += investmentValue

    const monthlyReturn = formatValue(accumulatedAmount * monthlyRate)

    accumulatedAmount += monthlyReturn

    const investedAmount = initialInvestment + investmentValue * month

    const currentDate = addMonths(startDate, month)

    const monthlyInfo: MonthlyInvestmentInfo = {
      id: month.toString(),
      monthlyInvestment: investmentValue,
      monthlyReturn,
      investedAmount,
      accumulatedAmount: formatValue(accumulatedAmount),
      accumulatedReturns: formatValue(accumulatedAmount - investedAmount),
      investmentDate: currentDate,
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

    if (applyTaxes) {
      const daysSinceStart = differenceInDays(currentDate, startDate)
      const taxRate = getTaxRate(daysSinceStart)
      const accumulatedReturns = accumulatedAmount - investedAmount
      const taxAmount = formatValue(accumulatedReturns * (taxRate / 100))
      const netAccumulatedAmount = formatValue(accumulatedAmount - taxAmount)
      const netAccumulatedReturns = formatValue(
        netAccumulatedAmount - investedAmount
      )

      monthlyInfo.taxRate = taxRate
      monthlyInfo.taxAmount = taxAmount
      monthlyInfo.netAccumulatedAmount = netAccumulatedAmount
      monthlyInfo.netAccumulatedReturns = netAccumulatedReturns
    }

    monthlyReturns.push(monthlyInfo)
  }

  return monthlyReturns
}
