export const formatCurrency = (amount: number | null) => {
  const value = amount || 0
  return new Intl.NumberFormat('en-Eu', {
    style: 'currency',
    currency: 'eur',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
