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
        decades: 10 * 12,
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
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  console.log({ newPlanning })

  return (
    <Form {...form}>
      <div className="max-w-app space-y-4 mx-auto px-4">
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <NewPlanningFormFields />
        </form>

        {newPlanning && <DataTable data={newPlanning} columns={columns} />}
      </div>
    </Form>
  )
}
