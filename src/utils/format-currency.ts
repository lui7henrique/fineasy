export function formatCurrency(value: number) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('The provided value is not a valid number.')
  }

  const formattedCurrency = (Math.floor(value * 100) / 100).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  )

  return formattedCurrency
}
