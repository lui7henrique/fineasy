'use client'

import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'
import type { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldBusinessDays = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="businessDaysOnly"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <div className="leading-none flex items-center gap-2">
              <FormLabel>Considerar apenas dias úteis</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <Info size={14} />
                </PopoverTrigger>
                <PopoverContent sideOffset={8} className="text-sm">
                  <p className="mb-2">
                    O CDI é calculado com base em <strong>dias úteis</strong>,
                    não dias corridos. Ao habilitar esta opção, o cálculo
                    considera aproximadamente 252 dias úteis por ano.
                  </p>
                  <p>
                    Isso resulta em um rendimento ligeiramente maior, pois a
                    taxa diária é aplicada apenas em dias úteis (cerca de 21 por
                    mês).
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}


