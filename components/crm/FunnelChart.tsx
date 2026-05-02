import { LEAD_STAGE_LABELS, type FunnelRow, type LeadStage } from '@/types/crm'
import { formatINR } from '@/lib/crm/format'

const STAGE_ORDER: LeadStage[] = [
  'new',
  'contacted',
  'qualified',
  'visit_scheduled',
  'visited',
  'negotiation',
  'booked',
  'lost',
]

const stageColors: Record<LeadStage, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-cyan-500',
  qualified: 'bg-violet-500',
  visit_scheduled: 'bg-amber-500',
  visited: 'bg-orange-500',
  negotiation: 'bg-fuchsia-500',
  booked: 'bg-emerald-600',
  lost: 'bg-neutral-400',
}

export function FunnelChart({ rows }: { rows: FunnelRow[] }) {
  const map = new Map<LeadStage, FunnelRow>()
  for (const r of rows) map.set(r.stage, r)
  const total = rows.reduce((s, r) => s + (r.lead_count ?? 0), 0)
  const max = Math.max(1, ...rows.map((r) => r.lead_count ?? 0))

  return (
    <div className="flex flex-col gap-3">
      {STAGE_ORDER.map((stage) => {
        const row = map.get(stage)
        const count = row?.lead_count ?? 0
        const value = row?.pipeline_value ?? 0
        const widthPct = max ? (count / max) * 100 : 0
        const sharePct = total ? (count / total) * 100 : 0
        return (
          <div key={stage} className="grid grid-cols-[160px_1fr_auto] items-center gap-3">
            <div className="text-sm font-medium text-[#1A1A2E]">{LEAD_STAGE_LABELS[stage]}</div>
            <div className="relative h-7 rounded bg-[#F4F7FC]">
              <div
                className={`absolute inset-y-0 left-0 rounded ${stageColors[stage]}`}
                style={{ width: `${Math.max(2, widthPct)}%` }}
              />
              <div className="relative flex h-full items-center justify-between px-3 text-[11px] font-medium text-white mix-blend-difference">
                <span>{count} leads</span>
                <span>{sharePct.toFixed(0)}%</span>
              </div>
            </div>
            <div className="min-w-[80px] text-right text-xs text-[#6B6B6B]">{formatINR(value)}</div>
          </div>
        )
      })}
    </div>
  )
}
