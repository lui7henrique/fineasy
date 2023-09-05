'use client'

import { useState } from 'react'
import { RefreshCcw, RefreshCw } from 'lucide-react'

import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const NewPlainFormValue = () => {
  const [isAccumulatedValue, setIsAccumulatedValue] = useState(false)

  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {isAccumulatedValue ? 'Valor acumulado' : 'Investimento'}
          </FormLabel>

          <FormControl>
            <div className="flex gap-2">
              <Input placeholder="R$ 2.300" type="number" {...field} />

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setIsAccumulatedValue(
                    (prevAccumulatedValue) => !prevAccumulatedValue,
                  )
                }
              >
                {isAccumulatedValue ? (
                  <RefreshCw className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all" />
                ) : (
                  <RefreshCcw className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all" />
                )}
              </Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
