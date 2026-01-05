'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'

import type { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Separator } from '@/components/ui/separator'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'

export const columns: ColumnDef<MonthlyInvestmentInfo>[] = [
  {
    accessorKey: 'investmentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mês" />
    ),
    cell: ({ row }) => {
      const month = row.index + 1

      const progress = `${month}º mês`

      const value = row.getValue('investmentDate')

      const label = format(new Date(value as string), 'MMMM, yyyy', {
        locale: ptBR,
      })

      const isYear = month % 12 === 0
      const year = month / 12

      return (
        <div className="capitalize whitespace-nowrap flex items-center gap-1.5">
          <div className="inline-flex items-center rounded-lg bg-foreground/5 px-3 py-1 text-sm font-medium">
            {progress}

            <Separator className="mx-2 h-4" orientation="vertical" />
            <span>{label}</span>

            {isYear && (
              <>
                <Separator className="mx-2 h-4" orientation="vertical" />
                <span>{year}º Ano</span>
              </>
            )}
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Valor investido',
    accessorKey: 'monthlyInvestment',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor investido"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {formatCurrency(row.getValue('Valor investido'))}
        </div>
      )
    },
  },
  {
    id: 'Valor total investido',
    accessorKey: 'investedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor total investido"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {formatCurrency(row.getValue('Valor total investido'))}
      </div>
    ),
  },
  {
    id: 'Valor acumulado',
    accessorKey: 'accumulatedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor acumulado"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="">{formatCurrency(row.getValue('Valor acumulado'))}</div>
    ),
  },
  {
    id: 'Rendimento mensal',
    accessorKey: 'monthlyReturn',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rendimento mensal"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const monthlyReturn = Number(row.getValue('Rendimento mensal'))
      const investedAmount = Number(row.getValue('Valor investido'))

      const isBreakEven = monthlyReturn > investedAmount

      const percentageReturn = (
        ((monthlyReturn - investedAmount) / investedAmount) *
        100
      ).toFixed(2)

      return (
        <div className="flex gap-2 items-center">
          {formatCurrency(row.getValue('Rendimento mensal'))}

          <TooltipProvider>
            {isBreakEven && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="bg-green-600/70 px-1 rounded-sm">
                    <TrendingUp className="stroke-white w-4 h-4" />
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  +{percentageReturn}% do investimento
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      )
    },
  },
  {
    id: 'Rendimento acumulado',
    accessorKey: 'accumulatedReturns',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rendimento acumulado"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('Rendimento acumulado'))}</div>
    ),
  },
  {
    id: 'Valor real',
    accessorKey: 'realAccumulatedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor real"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const realAmount = row.original.realAccumulatedAmount
      if (realAmount === undefined) return null

      return (
        <div className="whitespace-nowrap text-blue-600 dark:text-blue-400">
          {formatCurrency(realAmount)}
        </div>
      )
    },
  },
  {
    id: 'Rendimento real',
    accessorKey: 'realAccumulatedReturns',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rendimento real"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const realReturns = row.original.realAccumulatedReturns
      if (realReturns === undefined) return null

      const isPositive = realReturns > 0

      return (
        <div
          className={`whitespace-nowrap ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {formatCurrency(realReturns)}
        </div>
      )
    },
  },
  {
    id: 'Perda inflação',
    accessorKey: 'inflationLoss',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Perda inflação"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const inflationLoss = row.original.inflationLoss
      if (inflationLoss === undefined) return null

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 whitespace-nowrap">
                <TrendingDown className="w-4 h-4" />
                {formatCurrency(inflationLoss)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Perda de poder de compra devido à inflação
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    id: 'Alíquota IR',
    accessorKey: 'taxRate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Alíquota IR"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const taxRate = row.original.taxRate
      if (taxRate === undefined) return null

      return (
        <div className="whitespace-nowrap text-amber-600 dark:text-amber-400">
          {taxRate}%
        </div>
      )
    },
  },
  {
    id: 'Imposto',
    accessorKey: 'taxAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Imposto"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const taxAmount = row.original.taxAmount
      if (taxAmount === undefined) return null

      return (
        <div className="whitespace-nowrap text-red-600 dark:text-red-400">
          {formatCurrency(taxAmount)}
        </div>
      )
    },
  },
  {
    id: 'Valor líquido',
    accessorKey: 'netAccumulatedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor líquido"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const netAmount = row.original.netAccumulatedAmount
      if (netAmount === undefined) return null

      return (
        <div className="whitespace-nowrap font-medium text-green-600 dark:text-green-400">
          {formatCurrency(netAmount)}
        </div>
      )
    },
  },
  {
    id: 'Rendimento líquido',
    accessorKey: 'netAccumulatedReturns',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rendimento líquido"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const netReturns = row.original.netAccumulatedReturns
      if (netReturns === undefined) return null

      return (
        <div className="whitespace-nowrap text-green-600 dark:text-green-400">
          {formatCurrency(netReturns)}
        </div>
      )
    },
  },
]
