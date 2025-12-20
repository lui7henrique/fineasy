'use client'

import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { NewPlanningFormFieldValue } from './new-planning-form-field-value'
import { NewPlanningFormFieldTime } from './new-planning-form-field-time'
import { NewPlanningFormFieldInflation } from './new-planning-form-field-inflation'
import { NewPlanningFormFieldDate } from './new-planning-form-field-date'
import type { NewPlanningFormTypeInput } from '../new-planning-form'
import { Separator } from '@/components/ui/separator'
import { NewPlanningFormFieldRate } from './new-planning-form-field-rate'
import { NewPlanningFormFieldCDI } from './new-planning-form-field-cdi'
import { NewPlanningFormFieldBusinessDays } from './new-planning-form-field-business-days'
import { NewPlanningFormFieldTaxes } from './new-planning-form-field-taxes'

export function NewPlanningFormFields() {
  const {
    formState: { isSubmitting },
  } = useFormContext<NewPlanningFormTypeInput>()

  return (
    <div className="w-full space-y-2">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 rounded-md border p-4">
            <NewPlanningFormFieldValue />
            <NewPlanningFormFieldTime />
            <NewPlanningFormFieldDate />
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
              <NewPlanningFormFieldRate />
              <NewPlanningFormFieldCDI />
            </div>

            <Separator />

            <div className="space-y-4">
              <NewPlanningFormFieldInflation />
              <NewPlanningFormFieldBusinessDays />
              <NewPlanningFormFieldTaxes />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="reset" variant="outline">
          Resetar
        </Button>

        <Button type="submit" loading={isSubmitting}>
          Calcular
        </Button>
      </div>
    </div>
  )
}
