import { z } from 'zod'

export const FormSchema = z.object({
  investment: z
    .string({ required_error: 'Insira um valor válido.' })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value)
        return !isNaN(parsedValue) && parsedValue >= 1
      },
      {
        message: 'O valor deve ser um número válido e maior ou igual a 1.',
      },
    )
    .transform((value) => Number(value)),
  investmentTime: z
    .string({ required_error: 'Insira um valor válido.' })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value)
        return !isNaN(parsedValue) && parsedValue >= 1
      },
      {
        message: 'O valor deve ser um número válido e maior ou igual a 1.',
      },
    )
    .transform((value) => Number(value)),

  investmentRate: z
    .string({ required_error: 'Insira um valor válido.' })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value)
        return !isNaN(parsedValue) && parsedValue >= 1
      },
      {
        message: 'O valor deve ser um número válido e maior ou igual a 1.',
      },
    )
    .transform((value) => Number(value)),

  cdiRate: z
    .string({ required_error: 'Insira um valor válido.' })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value)
        return !isNaN(parsedValue) && parsedValue >= 1
      },
      {
        message: 'O valor deve ser um número válido e maior ou igual a 1.',
      },
    )
    .transform((value) => Number(value)),

  timeMetric: z.enum(['months', 'years']),

  investmentDate: z.date({ required_error: 'Data é um campo obrigatório.' }),

  inflation: z.boolean().default(false).optional(),
})
