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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldTime = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="investmentTime"
      defaultValue="10"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tempo de investimento</FormLabel>

          <FormControl>
            <div className="flex w-full gap-2">
              <Input placeholder="10" type="number" className="flex-1" {...field} />

              <FormField
                control={form.control}
                name="timeMetric"
                defaultValue="years"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Anos" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="months">Meses</SelectItem>
                      <SelectItem value="years">Anos</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </FormControl>

          <FormDescription>
            Especifique por quantos meses/anos você deseja investir.
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
