'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'

type InvestmentLineChartProps = {
  data: MonthlyInvestmentInfo[]
}

type ChartDatum = {
  monthIndex: number
  monthLabel: string
  dateLabel: string
  investedAmount: number
  accumulatedAmount: number
  accumulatedReturns: number
  monthlyReturn: number
  monthlyInvestment: number
}

const COLORS = {
  invested: 'hsl(var(--muted-foreground))',
  accumulated: 'hsl(var(--primary))',
  earnings: 'hsl(142 76% 36%)',
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: {
    payload: ChartDatum
  }[]
}

const CustomTooltip = ({
  active,
  payload,
}: CustomTooltipProps): ReactNode => {
  if (!active || !payload?.length) {
    return null
  }

  const { payload: item } = payload[0]
  const chartDatum = item as ChartDatum

  return (
    <div className="space-y-2 rounded-md border bg-background p-3 text-sm shadow-sm">
      <div>
        <p className="font-medium">{chartDatum.dateLabel}</p>
        <p className="text-muted-foreground text-xs">
          {chartDatum.monthIndex}º mês
        </p>
      </div>

      <div className="space-y-1">
        <p className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Total investido</span>
          <span className="font-medium">
            {formatCurrency(chartDatum.investedAmount)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Acumulado</span>
          <span className="font-medium text-primary">
            {formatCurrency(chartDatum.accumulatedAmount)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Rendimento acumulado</span>
          <span className="font-medium" style={{ color: COLORS.earnings }}>
            {formatCurrency(chartDatum.accumulatedReturns)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Rendimento mensal</span>
          <span className="font-medium" style={{ color: COLORS.earnings }}>
            {formatCurrency(chartDatum.monthlyReturn)}
          </span>
        </p>
      </div>
    </div>
  )
}

export function InvestmentLineChart({ data }: InvestmentLineChartProps) {
  const chartData = useMemo<ChartDatum[]>(() => {
    return data.map((item, index) => {
      const date = new Date(item.investmentDate)

      return {
        monthIndex: index + 1,
        monthLabel: `${index + 1}º`,
        dateLabel: format(date, "MMMM 'de' yyyy", { locale: ptBR }),
        investedAmount: item.investedAmount,
        accumulatedAmount: item.accumulatedAmount,
        accumulatedReturns: item.accumulatedReturns,
        monthlyReturn: item.monthlyReturn,
        monthlyInvestment: item.monthlyInvestment,
      }
    })
  }, [data])

  const breakEvenPoint = useMemo(() => {
    for (const item of chartData) {
      if (item.monthlyReturn >= item.monthlyInvestment) {
        return item
      }
    }
    return null
  }, [chartData])

  if (!chartData.length) {
    return (
      <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
        Nenhum dado disponível para gerar o gráfico.
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="space-y-1 border-b px-4 py-3">
        <h3 className="text-lg font-semibold">Evolução dos investimentos</h3>
        <p className="text-sm text-muted-foreground">
          Compare o valor investido com o montante acumulado e rendimento ao
          longo do planejamento.
        </p>
      </div>

      <div className="p-2 sm:p-4">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="monthLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              minTickGap={12}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value))}
              tickLine={false}
              axisLine={false}
              width={70}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="investedAmount"
              stroke={COLORS.invested}
              strokeWidth={2}
              dot={false}
              name="Investido"
            />
            <Line
              type="monotone"
              dataKey="accumulatedAmount"
              stroke={COLORS.accumulated}
              strokeWidth={2}
              dot={false}
              name="Acumulado"
            />
            <Line
              type="monotone"
              dataKey="accumulatedReturns"
              stroke={COLORS.earnings}
              strokeWidth={2}
              dot={false}
              name="Rendimento"
            />
            {breakEvenPoint && (
              <ReferenceDot
                x={breakEvenPoint.monthLabel}
                y={breakEvenPoint.accumulatedReturns}
                r={6}
                fill={COLORS.earnings}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                label={{
                  value: 'Rendimento mensal ≥ Investimento mensal',
                  position: 'top',
                  fontSize: 10,
                  fill: 'hsl(var(--foreground))',
                  offset: 10,
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS.invested }}
            />
            <span className="text-muted-foreground">Total investido</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS.accumulated }}
            />
            <span className="text-muted-foreground">Acumulado</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS.earnings }}
            />
            <span className="text-muted-foreground">Rendimento acumulado</span>
          </div>
        </div>
      </div>
    </div>
  )
}
