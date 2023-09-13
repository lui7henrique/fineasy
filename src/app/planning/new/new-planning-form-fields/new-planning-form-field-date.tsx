'use client'

import { CalendarIcon } from 'lucide-react'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { NewPlanningFormTypeInput } from '../new-planning-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const today = new Date()

export const NewPlanningFormFieldDate = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="investmentDate"
      defaultValue={today}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(field.value, "dd 'de' MMMM", {
                      locale: ptBR,
                    })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormDescription>
            Este é o dia que você irá investir mensalmente.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
