'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

import { DataTable } from '../new-planning-preview/components/data-table'
import { columns } from '../new-planning-preview/components/columns'
import { NewPlanningFormFields } from '../new-planning-form-fields'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

import { FormSchema } from '../schema'
import {
  MonthlyInvestmentInfo,
  calculateMonthlyReturns,
} from '@/utils/calculate-monthly-returns'
import { toast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'
import { useCdi } from '@/context/cdi/cdi'

export type NewPlanningFormTypeInput = z.input<typeof FormSchema>
export type NewPlanningFormTypeOutput = z.output<typeof FormSchema>

export const NewPlanningForm = () => {
  const [newPlanning, setNewPlanning] = useState<
    MonthlyInvestmentInfo[] | null
  >(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const { cdiRate } = useCdi()

  const form = useForm<NewPlanningFormTypeInput>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      investmentTime: '10',
      investmentRate: '100',
      cdiRate: String(cdiRate),
    },
  })

  async function onSubmit(formValues: NewPlanningFormTypeInput) {
    const parsedForm = FormSchema.parse(formValues)

    const getFormattedInvestmentTime = () => {
      const multiplier: Record<
        NewPlanningFormTypeOutput['timeMetric'],
        number
      > = {
        months: 1,
        years: 12,
      }

      return parsedForm.investmentTime * multiplier[parsedForm.timeMetric]
    }

    try {
      const returns = calculateMonthlyReturns({
        cdiRate: parsedForm.cdiRate,
        investmentDate: new Date(),
        investmentRate: parsedForm.investmentRate,
        investmentTimeInMonths: getFormattedInvestmentTime(),
        investmentValue: parsedForm.investment,
      })

      setNewPlanning(returns)

      process.env.NODE_ENV === 'development' &&
        toast({
          title: 'You submitted the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 max-h-80 overflow-y-scroll">
              <code className="text-white">
                {JSON.stringify(returns, null, 2)}
              </code>
            </pre>
          ),
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (newPlanning && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [newPlanning])

  return (
    <Form {...form}>
      <div className="max-w-app py-6 mx-auto px-4 space-y-8">
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <NewPlanningFormFields />
        </form>

        {newPlanning && <Separator />}

        {newPlanning && (
          <div ref={resultsRef} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Acompanhe seus rendimentos mensais
              </h2>

              <p className="text-muted-foreground">
                A tabela abaixo mostra o rendimento detalhado de cada mês,
                permitindo que você planeje com precisão seus objetivos
                financeiros e acompanhe seu progresso de forma transparente
              </p>
            </div>

            <DataTable data={newPlanning} columns={columns} />
          </div>
        )}
      </div>
    </Form>
  )
}
