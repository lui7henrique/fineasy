'use client'

import { Button } from '@/components/ui/button'

import { NewPlanningFormFieldValue } from './new-planning-form-field-value'
import { NewPlanningFormFieldTime } from './new-planning-form-field-time'
import { NewPlanningFormFieldInflation } from './new-planning-form-field-inflation'
import { NewPlanningFormFieldDate } from './new-planning-form-field-date'
import { useFormContext } from 'react-hook-form'
import { NewPlanningFormType } from '../new-planning-form'

export function NewPlanningFormFields() {
  const {
    formState: { isSubmitting },
  } = useFormContext<NewPlanningFormType>()

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4">
        <NewPlanningFormFieldValue />
        <NewPlanningFormFieldTime />
        <NewPlanningFormFieldDate />
      </div>

      <NewPlanningFormFieldInflation />
      <Button type="submit" loading={isSubmitting}>
        Calcular
      </Button>
    </div>
  )
}
