import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const monthlyReturnSchema = z.object({
  id: z.string(),
  monthlyReturn: z.number(),
  investedAmount: z.number(),
  accumulatedAmount: z.number(),
})

export type MonthlyReturnSchema = z.infer<typeof monthlyReturnSchema>
