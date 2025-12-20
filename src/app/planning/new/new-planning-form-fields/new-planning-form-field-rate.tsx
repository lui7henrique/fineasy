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

export const NewPlanningFormFieldRate = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="investmentRate"
      defaultValue="100"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Taxa de rendimento</FormLabel>

          <FormControl>
            <Input placeholder="100%" type="number" {...field} />
          </FormControl>

          <FormDescription>
            Indique a porcentagem de lucro ou ganho que espera obter com seu
            investimento.
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
