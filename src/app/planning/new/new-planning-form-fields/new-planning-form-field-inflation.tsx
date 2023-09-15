'use client'

import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { NewPlanningFormTypeInput } from '../new-planning-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'

export const NewPlanningFormFieldInflation = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="inflation"
      render={({ field }) => (
        <FormItem className="">
          <div className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled
              />
            </FormControl>

            <div className="leading-none flex items-center gap-2">
              <FormLabel>Corrigir com base na inflação</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <Info size={14} />
                </PopoverTrigger>
                <PopoverContent sideOffset={8}>
                  Selecione esta opção para calcular o rendimento considerando a
                  correção com base na inflação. Isso significa que o valor do
                  seu investimento será ajustado de acordo com as taxas de
                  inflação durante o período de investimento, para manter o
                  poder de compra.
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
