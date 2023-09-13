'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'

import { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Separator } from '@/components/ui/separator'

export const columns: ColumnDef<MonthlyInvestmentInfo>[] = [
  {
    accessorKey: 'investmentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mês" />
    ),
    cell: ({ row, table }) => {
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
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('Rendimento mensal'))}</div>
    ),
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
]
