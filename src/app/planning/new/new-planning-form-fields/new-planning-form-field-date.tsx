'use client'

import { useState } from 'react'
import { RefreshCcw, RefreshCw } from 'lucide-react'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NewPlanningFormType } from '../new-planning-form'

export const NewPlanningFormFieldDate = () => {
  const form = useFormContext<NewPlanningFormType>()

  return (
    <FormField
      control={form.control}
      name="investmentDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data</FormLabel>

          <FormControl>
            <Input placeholder="18/11" type="number" {...field} disabled />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
