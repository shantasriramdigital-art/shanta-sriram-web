import { LEAD_STAGE_LABELS, type LeadStage } from '@/types/crm'
import { cn } from '@/lib/utils'

const stageStyles: Record<LeadStage, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  qualified: 'bg-violet-50 text-violet-700 border-violet-200',
  visit_scheduled: 'bg-amber-50 text-amber-800 border-amber-200',
  visited: 'bg-orange-50 text-orange-800 border-orange-200',
  negotiation: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  booked: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  lost: 'bg-neutral-100 text-neutral-600 border-neutral-200',
}

export function StageBadge({ stage, className }: { stage: LeadStage; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider',
        stageStyles[stage],
        className
      )}
    >
      {LEAD_STAGE_LABELS[stage]}
    </span>
  )
}
