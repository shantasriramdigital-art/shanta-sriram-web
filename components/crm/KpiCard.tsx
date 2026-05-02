import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  value: string
  delta?: number | null
  hint?: string
  icon?: React.ReactNode
  accent?: 'crimson' | 'navy' | 'gold' | 'emerald'
}

const accentColors: Record<NonNullable<Props['accent']>, string> = {
  crimson: 'bg-[#CD0E12]/10 text-[#CD0E12]',
  navy: 'bg-[#1A1A2E]/10 text-[#1A1A2E]',
  gold: 'bg-[#C9A96E]/20 text-[#8a7240]',
  emerald: 'bg-emerald-100 text-emerald-700',
}

export function KpiCard({ label, value, delta, hint, icon, accent = 'navy' }: Props) {
  const showDelta = typeof delta === 'number' && isFinite(delta)
  const positive = (delta ?? 0) > 0
  const negative = (delta ?? 0) < 0
  return (
    <div className="rounded-lg border border-[#E8ECF0] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">{label}</p>
          <p className="mt-2 font-serif text-3xl text-[#1A1A2E]">{value}</p>
          {hint && <p className="mt-1 text-xs text-[#6B6B6B]">{hint}</p>}
        </div>
        {icon && <span className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md', accentColors[accent])}>{icon}</span>}
      </div>
      {showDelta && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium">
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
          ) : negative ? (
            <ArrowDownRight className="h-3.5 w-3.5 text-[#CD0E12]" />
          ) : (
            <Minus className="h-3.5 w-3.5 text-neutral-400" />
          )}
          <span className={cn(positive && 'text-emerald-600', negative && 'text-[#CD0E12]', !positive && !negative && 'text-neutral-500')}>
            {positive && '+'}{delta!.toFixed(1)}% vs previous period
          </span>
        </div>
      )}
    </div>
  )
}
