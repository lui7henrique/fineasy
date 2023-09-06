'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { DataTable } from '../new-planning-preview/components/data-table'
import { columns } from '../new-planning-preview/components/columns'
import { NewPlanningFormFields } from '../new-planning-form-fields'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

import { FormSchema } from '../schema'
import { MonthlyInvestmentInfo } from '@/utils/calculate-monthly-returns'
import { api } from '@/services/api'
import { toast } from '@/components/ui/use-toast'

export type NewPlanningFormType = z.infer<typeof FormSchema>

export const NewPlanningForm = () => {
  const [newPlanning, setNewPlanning] = useState<
    MonthlyInvestmentInfo[] | null
  >(null)

  const form = useForm<NewPlanningFormType>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(form: NewPlanningFormType) {
    const getFormattedInvestment = () => {
      const multiplier: Record<NewPlanningFormType['timeMetric'], number> = {
        months: 1,
        years: 12,
      }

      return form.investmentTime * multiplier[form.timeMetric]
    }

    const formattedData = {
      investment: form.investment,
      investmentTimeInMonths: getFormattedInvestment(),
      investmentDate: new Date().toISOString(),
    }

    try {
      const response = await api.post<MonthlyInvestmentInfo[]>(
        '/planning',
        formattedData,
      )

      setNewPlanning(response.data)

      process.env.NODE_ENV === 'development' &&
        toast({
          title: 'You submitted the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 max-h-80 overflow-y-scroll">
              <code className="text-white">
                {JSON.stringify(response.data, null, 2)}
              </code>
            </pre>
          ),
        })
    } catch {}
  }

  console.log({ newPlanning })

  return (
    <Form {...form}>
      <div className="max-w-app py-6 mx-auto px-4 space-y-6">
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <NewPlanningFormFields />
        </form>

        {newPlanning && (
          <div className="rounded-lg border bg-background shadow h-full overflow-y-scroll max-h-[60vh]">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Acompanhe seus rendimentos mensais
                  </h2>
                  <p className="text-muted-foreground">
                    A tabela abaixo mostra o rendimento detalhado de cada mês,
                    permitindo que você planeje com precisão seus objetivos
                    financeiros e acompanhe seu progresso de forma transparente
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <UserNav /> */}
                </div>
              </div>
              <DataTable data={newPlanning} columns={columns} />
            </div>
          </div>
        )}
      </div>
    </Form>
  )
}
