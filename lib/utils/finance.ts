export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `\u20b9${(amount / 10000000).toFixed(2)} Cr`
  } else if (amount >= 100000) {
    return `\u20b9${(amount / 100000).toFixed(2)} L`
  } else {
    return `\u20b9${amount.toLocaleString('en-IN')}`
  }
}

export function calculateEMI(principal: number, annualRate: number, tenureYears: number): number {
  const monthlyRate = annualRate / 12 / 100
  const n = tenureYears * 12
  if (monthlyRate === 0) return principal / n
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
  return Math.round(emi)
}
