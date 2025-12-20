import { z } from 'zod'

const numericField = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === 'string' ? Number.parseFloat(val) : val))
  .refine((val) => !Number.isNaN(val) && val >= 1, {
    message: 'O valor deve ser um número válido e maior ou igual a 1.',
  })

const inflationRateField = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === 'string' ? Number.parseFloat(val) : val))
  .refine((val) => !Number.isNaN(val) && val >= 0, {
    message: 'O valor deve ser um número válido e maior ou igual a 0.',
  })

export const FormSchema = z.object({
  investment: numericField,
  investmentTime: numericField,
  investmentRate: numericField,
  cdiRate: numericField,
  timeMetric: z.enum(['months', 'years']),
  investmentDate: z.date({ required_error: 'Data é um campo obrigatório.' }),
  inflation: z.boolean().default(false).optional(),
  inflationRate: inflationRateField.optional().default(4.5),
  businessDaysOnly: z.boolean().default(false).optional(),
  applyTaxes: z.boolean().default(false).optional(),
})
