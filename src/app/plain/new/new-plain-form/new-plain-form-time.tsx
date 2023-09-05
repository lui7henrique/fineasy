'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
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

export const NewPlainFormTime = () => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="timeInMonths"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tempo</FormLabel>

          <FormControl>
            <div className="grid grid-cols-2 w-full gap-4">
              <Input placeholder="20" type="number" {...field} />

              <Select defaultValue="years">
                <SelectTrigger className="w-full" placeholder="Anos">
                  <SelectValue placeholder="" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="months">Meses</SelectItem>
                  <SelectItem value="years">Anos</SelectItem>
                  <SelectItem value="">Décadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
