'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Download } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import type { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'

interface ExportCSVButtonProps {
  data: MonthlyInvestmentInfo[]
}

function useExportCSV(data: MonthlyInvestmentInfo[]) {
  const exportToCSV = useCallback(() => {
    if (data.length === 0) return

    const hasInflation = data[0]?.realAccumulatedAmount !== undefined
    const hasTaxes = data[0]?.taxRate !== undefined

    const headers = [
      'Mês',
      'Data',
      'Valor Investido',
      'Valor Total Investido',
      'Valor Acumulado',
      'Rendimento Mensal',
      'Rendimento Acumulado',
      ...(hasInflation
        ? ['Valor Real', 'Rendimento Real', 'Perda Inflação']
        : []),
      ...(hasTaxes
        ? ['Alíquota IR (%)', 'Imposto', 'Valor Líquido', 'Rendimento Líquido']
        : []),
    ]

    const rows = data.map((item, index) => {
      const row = [
        `${index + 1}º mês`,
        format(new Date(item.investmentDate), 'MM/yyyy', { locale: ptBR }),
        formatCurrency(item.monthlyInvestment),
        formatCurrency(item.investedAmount),
        formatCurrency(item.accumulatedAmount),
        formatCurrency(item.monthlyReturn),
        formatCurrency(item.accumulatedReturns),
      ]

      if (hasInflation) {
        row.push(
          formatCurrency(item.realAccumulatedAmount ?? 0),
          formatCurrency(item.realAccumulatedReturns ?? 0),
          formatCurrency(item.inflationLoss ?? 0)
        )
      }

      if (hasTaxes) {
        row.push(
          `${item.taxRate ?? 0}%`,
          formatCurrency(item.taxAmount ?? 0),
          formatCurrency(item.netAccumulatedAmount ?? 0),
          formatCurrency(item.netAccumulatedReturns ?? 0)
        )
      }

      return row
    })

    const csvContent = [
      headers.join(';'),
      ...rows.map((row) => row.join(';')),
    ].join('\n')

    const blob = new Blob([`\ufeff${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute(
      'download',
      `simulacao-investimento-${format(new Date(), 'yyyy-MM-dd')}.csv`
    )
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [data])

  return { exportToCSV }
}

export function ExportCSVButton({ data }: ExportCSVButtonProps) {
  const { exportToCSV } = useExportCSV(data)

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={exportToCSV}
      className="h-8"
      disabled={data.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar
    </Button>
  )
}
