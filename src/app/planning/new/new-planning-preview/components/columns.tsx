'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'

import { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { formatCurrency } from '@/utils/format-currency'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export const columns: ColumnDef<MonthlyInvestmentInfo>[] = [
  {
    accessorKey: 'investmentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mês" />
    ),
    cell: ({ row }) => (
      <div className="min-w-fit">
        <Badge className="whitespace-nowrap">
          {format(new Date(row.getValue('investmentDate')), 'MMM, yyyy')}
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'investedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor investido" />
    ),
    cell: ({ row }) => (
      <div className="">{formatCurrency(row.getValue('investedAmount'))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'accumulatedAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor acumulado" />
    ),
    cell: ({ row }) => (
      <div className="">
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
      <div className="">{formatCurrency(row.getValue('monthlyReturn'))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
