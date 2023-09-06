'use client'

import { Button } from '@/components/ui/button'

import { NewPlanningFormFieldValue } from './new-planning-form-field-value'
import { NewPlanningFormFieldTime } from './new-planning-form-field-time'
import { NewPlanningFormFieldInflation } from './new-planning-form-field-inflation'
import { NewPlanningFormFieldDate } from './new-planning-form-field-date'

export function NewPlanningFormFields() {
  return (
    <div className="w-full space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
        <NewPlanningFormFieldValue />
        <NewPlanningFormFieldTime />
        <NewPlanningFormFieldDate />
      </div>

      <NewPlanningFormFieldInflation />
      <Button type="submit">Calcular</Button>
    </div>
  )
}
