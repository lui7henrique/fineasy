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
import { NewPlanningFormTypeInput } from '../new-planning-form'

import { useCdi } from '@/context/cdi/cdi'

export const NewPlanningFormFieldCDI = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()
  const { cdiRate } = useCdi()

  return (
    <FormField
      control={form.control}
      name="cdiRate"
      defaultValue={String(cdiRate)}
      render={({ field }) => (
        <FormItem>
          <FormLabel>CDI (Certificado de Depósito Interbancário)</FormLabel>

          <FormControl>
            <Input placeholder="13.15%" type="number" {...field} />
          </FormControl>

          <FormDescription>
            Este campo se refere à taxa de referência usada no mercado
            financeiro brasileiro.
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
