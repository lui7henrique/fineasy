'use client'

import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'
import type { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldTaxes = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()

  return (
    <FormField
      control={form.control}
      name="applyTaxes"
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
              <FormLabel>Considerar Imposto de Renda</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <Info size={14} />
                </PopoverTrigger>
                <PopoverContent sideOffset={8} className="text-sm space-y-3">
                  <p>
                    O Imposto de Renda sobre rendimentos de renda fixa segue a{' '}
                    <strong>tabela regressiva</strong>:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between">
                      <span>Até 180 dias:</span>
                      <span className="font-semibold">22,5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>De 181 a 360 dias:</span>
                      <span className="font-semibold">20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>De 361 a 720 dias:</span>
                      <span className="font-semibold">17,5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Acima de 720 dias:</span>
                      <span className="font-semibold">15%</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    O imposto incide apenas sobre o rendimento, não sobre o
                    valor investido.
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



