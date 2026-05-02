import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns'

export function formatINR(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return 'N/A'
  if (value >= 1_00_00_000) {
    const cr = value / 1_00_00_000
    return `Rs ${cr.toFixed(cr < 10 ? 2 : 1)} Cr`
  }
  if (value >= 1_00_000) {
    const lakh = value / 1_00_000
    return `Rs ${lakh.toFixed(lakh < 10 ? 2 : 1)} L`
  }
  return `Rs ${value.toLocaleString('en-IN')}`
}

export function formatBudgetRange(min: number | null, max: number | null): string {
  if (min == null && max == null) return 'Not specified'
  if (min == null) return `Up to ${formatINR(max)}`
  if (max == null) return `From ${formatINR(min)}`
  if (min === max) return formatINR(min)
  return `${formatINR(min)} - ${formatINR(max)}`
}

export function formatRelative(date: string | Date | null | undefined): string {
  if (!date) return 'Never'
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatAbsolute(date: string | Date | null | undefined): string {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'dd MMM yyyy')
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'dd MMM yyyy, h:mm a')
}

export function formatSmartDate(date: string | Date | null | undefined): string {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? new Date(date) : date
  if (isToday(d)) return `Today, ${format(d, 'h:mm a')}`
  if (isTomorrow(d)) return `Tomorrow, ${format(d, 'h:mm a')}`
  if (isYesterday(d)) return `Yesterday, ${format(d, 'h:mm a')}`
  return format(d, 'dd MMM, h:mm a')
}

export function daysBetween(from: string | Date | null, to: Date = new Date()): number {
  if (!from) return 0
  const start = typeof from === 'string' ? new Date(from) : from
  const ms = to.getTime() - start.getTime()
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
}

export function initials(name: string | null | undefined): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
