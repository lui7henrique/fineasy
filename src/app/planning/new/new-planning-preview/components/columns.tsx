'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'

import { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const columns: ColumnDef<MonthlyInvestmentInfo>[] = [
  {
    id: 'select',
    header: () => <></>,
    cell: ({ row, table }) => {
      return (
        <div className="min-w-[20px]">
          <Badge>
            {row.index + 1}/{table.getState().pagination.pageSize}
          </Badge>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'investmentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mês" />
    ),
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        {format(new Date(row.getValue('investmentDate')), 'MMMM, yyyy', {
          locale: ptBR,
        })}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'investedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor investido"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 whitespace-nowrap">
        {formatCurrency(row.getValue('investedAmount'))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'accumulatedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Valor acumulado"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {formatCurrency(row.getValue('accumulatedAmount'))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'monthlyReturn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rendimento" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {formatCurrency(row.getValue('monthlyReturn'))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
