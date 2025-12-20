export function formatCurrency(value: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error('The provided value is not a valid number.')
  }

  const formattedCurrency = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedCurrency
}
