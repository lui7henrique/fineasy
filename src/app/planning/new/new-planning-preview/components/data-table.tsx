'use client'

import * as React from 'react'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableViewOptions } from './data-table-view-options'
import { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface DataTableProps {
  columns: ColumnDef<MonthlyInvestmentInfo, unknown>[]
  data: MonthlyInvestmentInfo[]
}

type ViewMode = 'total' | 'parcial'

const groupInvestmentsByYear = (
  investments: MonthlyInvestmentInfo[],
): MonthlyInvestmentInfo[] => {
  const grouped = investments.reduce<Record<string, MonthlyInvestmentInfo>>(
    (acc, investment) => {
      const year = new Date(investment.investmentDate).getFullYear()
      const key = year.toString()

      if (!acc[key]) {
        acc[key] = {
          ...investment,
          id: key,
          monthlyInvestment: 0,
          monthlyReturn: 0,
          investedAmount: investment.investedAmount,
          accumulatedAmount: investment.accumulatedAmount,
          accumulatedReturns: investment.accumulatedReturns,
          investmentDate: new Date(investment.investmentDate),
        }
      }

      acc[key].monthlyInvestment += investment.monthlyInvestment
      acc[key].monthlyReturn += investment.monthlyReturn
      acc[key].investedAmount = investment.investedAmount
      acc[key].accumulatedAmount = investment.accumulatedAmount
      acc[key].accumulatedReturns = investment.accumulatedReturns
      acc[key].investmentDate = new Date(investment.investmentDate)

      return acc
    },
    {},
  )

  return Object.values(grouped).sort(
    (a, b) =>
      new Date(a.investmentDate).getTime() -
      new Date(b.investmentDate).getTime(),
  )
}

export function DataTable({ columns, data }: DataTableProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>('total')
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [sorting, setSorting] = React.useState<SortingState>([])

  const groupedData = React.useMemo(() => groupInvestmentsByYear(data), [data])
  const tableData = viewMode === 'total' ? data : groupedData

  const table = useReactTable({
    data: tableData,
    columns,
    initialState: {},
    state: {
      sorting,
      columnVisibility,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,

    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  React.useEffect(() => {
    table.setPageSize(tableData.length)
  }, [table, tableData.length])

  return (
    <Tabs
      value={viewMode}
      onValueChange={(value) => setViewMode(value as ViewMode)}
      className="mt-4 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabsList>
          <TabsTrigger value="total">Total</TabsTrigger>
          <TabsTrigger value="parcial">Parcial</TabsTrigger>
        </TabsList>

        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 outline-muted bg-background outline outline-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Tabs>
  )
}
