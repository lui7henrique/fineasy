'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldInitialInvestment = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="initialInvestment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Investimento inicial</FormLabel>

          <FormControl>
            <Input placeholder="R$ 5.000" type="number" {...field} />
          </FormControl>

          <FormDescription>
            Valor que você já possui para começar a investir.
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}


