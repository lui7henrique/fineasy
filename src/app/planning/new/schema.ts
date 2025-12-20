import { z } from 'zod'

const numericField = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === 'string' ? parseFloat(val) : val))
  .refine((val) => !isNaN(val) && val >= 1, {
    message: 'O valor deve ser um número válido e maior ou igual a 1.',
  })

export const FormSchema = z.object({
  investment: numericField,
  investmentTime: numericField,
  investmentRate: numericField,
  cdiRate: numericField,
  timeMetric: z.enum(['months', 'years']),
  investmentDate: z.date({ required_error: 'Data é um campo obrigatório.' }),
  inflation: z.boolean().default(false).optional(),
})
