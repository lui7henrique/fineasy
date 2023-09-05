'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { NewPlanningFormValue } from './new-planning-form-value'
import { NewPlanningFormTime } from './new-planning-form-time'
import { NewPlanningFormInflationSelect } from './new-planning-form-inflation-select'

const FormSchema = z.object({
  value: z.string({ required_error: 'Insira um valor válido.' }).refine(
    (value) => {
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue) && parsedValue >= 1
    },
    {
      message: 'O valor deve ser um número válido e maior ou igual a 1.',
    },
  ),
  timeInMonths: z.string({ required_error: 'Insira um valor válido.' }).refine(
    (value) => {
      const parsedValue = parseFloat(value)
      return !isNaN(parsedValue) && parsedValue >= 1
    },
    {
      message: 'O valor deve ser um número válido e maior ou igual a 1.',
    },
  ),
  inflation: z.boolean().default(false).optional(),
})

export function NewPlainForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <NewPlanningFormValue />
          <NewPlanningFormTime />
        </div>

        <NewPlanningFormInflationSelect />

        <Button type="submit">Calcular</Button>
      </form>
    </Form>
  )
}
