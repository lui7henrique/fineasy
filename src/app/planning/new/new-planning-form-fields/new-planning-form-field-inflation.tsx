'use client'

import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'
import type { NewPlanningFormTypeInput } from '../new-planning-form'

export const NewPlanningFormFieldInflation = () => {
  const form = useFormContext<NewPlanningFormTypeInput>()
  const inflationEnabled = form.watch('inflation')

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="inflation"
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
                <FormLabel>Corrigir com base na inflação</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <Info size={14} />
                  </PopoverTrigger>
                  <PopoverContent sideOffset={8} className="text-sm">
                    <p className="mb-2">
                      Ao habilitar esta opção, o cálculo mostrará o{' '}
                      <strong>valor real</strong> do seu investimento,
                      descontando a perda do poder de compra causada pela
                      inflação.
                    </p>
                    <p>
                      Por exemplo: se você acumular R$ 100.000 em 10 anos, mas a
                      inflação for de 4,5% ao ano, esse valor terá um poder de
                      compra equivalente a aproximadamente R$ 64.000 em valores
                      de hoje.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </FormItem>
        )}
      />

      {inflationEnabled && (
        <FormField
          control={form.control}
          name="inflationRate"
          defaultValue="4.5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxa de inflação anual (%)</FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="4.5"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...field}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    % a.a.
                  </span>
                </div>
              </FormControl>

              <FormDescription>
                A meta de inflação do Banco Central é de 3% a.a. (com tolerância
                de 1,5 p.p.). Historicamente, o IPCA médio dos últimos 10 anos
                foi de aproximadamente 5,5% a.a.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
