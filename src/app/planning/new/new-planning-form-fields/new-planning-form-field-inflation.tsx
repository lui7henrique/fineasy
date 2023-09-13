'use client'

import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldInflation = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="inflation"
      render={({ field }) => (
        <FormItem className="rounded-md border p-4">
          <div className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled
              />
            </FormControl>

            <div className="space-y-1 leading-none">
              <FormLabel>Corrigir com base na inflação</FormLabel>

              <FormDescription className="leading-4">
                Selecione esta opção para calcular o rendimento considerando a
                correção com base na inflação. Isso significa que o valor do seu
                investimento será ajustado de acordo com as taxas de inflação
                durante o período de investimento, para manter o poder de
                compra.
              </FormDescription>
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
