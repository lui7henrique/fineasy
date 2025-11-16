'use client'

import * as React from 'react'
import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as ReactTableInstance,
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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DataTableProps {
  columns: ColumnDef<MonthlyInvestmentInfo, unknown>[]
  data: MonthlyInvestmentInfo[]
}

type ViewMode = 'total' | 'parcial'

type GroupedInvestments = {
  year: number
  months: MonthlyInvestmentInfo[]
}

const groupInvestmentsByYear = (
  investments: MonthlyInvestmentInfo[],
): GroupedInvestments[] => {
  const grouped = investments.reduce<Record<string, MonthlyInvestmentInfo[]>>(
    (acc, investment) => {
      const date = new Date(investment.investmentDate)
      const year = date.getFullYear().toString()

      if (!acc[year]) {
        acc[year] = []
      }

      acc[year].push(investment)
      return acc
    },
    {},
  )

  return Object.entries(grouped)
    .map(([year, months]) => ({
      year: Number(year),
      months: months.sort(
        (a, b) =>
          new Date(a.investmentDate).getTime() -
          new Date(b.investmentDate).getTime(),
      ),
    }))
    .sort((a, b) => a.year - b.year)
}

export function DataTable({ columns, data }: DataTableProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>('total')
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [sorting, setSorting] = React.useState<SortingState>([])

  const groupedByYear = React.useMemo(
    () => groupInvestmentsByYear(data),
    [data],
  )

  const table = useReactTable({
    data,
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
    table.setPageSize(data.length)
  }, [table, data.length])

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

      {viewMode === 'total' ? (
        <TableContent table={table} columnsLength={columns.length} />
      ) : groupedByYear.length ? (
        <div className="space-y-8">
          {groupedByYear.map(({ year, months }) => (
            <div key={year} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{year}</h3>
                <span className="text-sm text-muted-foreground">
                  {months.length} {months.length > 1 ? 'meses' : 'mês'}
                </span>
              </div>

              <div className="grid gap-4">
                {months.map((month) => (
                  <PartialMonthTable
                    key={month.id}
                    columns={columns}
                    data={[month]}
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
          Nenhum resultado.
        </div>
      )}
    </Tabs>
  )
}

type PartialMonthTableProps = {
  columns: ColumnDef<MonthlyInvestmentInfo, unknown>[]
  data: MonthlyInvestmentInfo[]
  columnVisibility: VisibilityState
  onColumnVisibilityChange: OnChangeFn<VisibilityState>
}

function PartialMonthTable({
  columns,
  data,
  columnVisibility,
  onColumnVisibilityChange,
}: PartialMonthTableProps) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    enableSorting: false,
    enableRowSelection: false,
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
  })

  const dateLabel = format(new Date(data[0].investmentDate), "MMMM 'de' yyyy", {
    locale: ptBR,
  })

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium capitalize">{dateLabel}</p>
      <TableContent table={table} columnsLength={columns.length} />
    </div>
  )
}

function TableContent({
  table,
  columnsLength,
}: {
  table: ReactTableInstance<MonthlyInvestmentInfo>
  columnsLength: number
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 outline-muted bg-background outline outline-1">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
