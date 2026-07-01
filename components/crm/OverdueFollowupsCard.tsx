import Link from 'next/link'
import { AlertTriangle, Phone } from 'lucide-react'
import { StageBadge } from './StageBadge'
import { daysBetween } from '@/lib/crm/format'
import type { OverdueFollowups } from '@/lib/crm/queries'
import type { LeadStage } from '@/types/crm'

interface Props {
  data: OverdueFollowups
  scoped: boolean
}

export function OverdueFollowupsCard({ data, scoped }: Props) {
  const { rows, scheduledCount } = data
  const count = rows.length

  return (
    <div className="rounded-lg border border-[#CD0E12]/25 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-lg text-[#1A1A2E]">
            <AlertTriangle className="h-4 w-4 text-[#CD0E12]" />
            Overdue Follow-ups
          </h2>
          <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
            {scoped ? 'Your leads past their follow-up date.' : 'Leads past their follow-up date.'}
          </p>
        </div>
        {count > 0 && (
          <span className="shrink-0 rounded-md bg-[#CD0E12]/10 px-2.5 py-1 font-serif text-lg leading-none text-[#CD0E12]">
            {count}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2.5">
        {count === 0 ? (
          <div className="rounded-md border border-dashed border-[#E8ECF0] bg-[#F8F4EF] p-6 text-center font-sans text-sm text-[#6B6B6B]">
            {scheduledCount > 0
              ? `Nothing overdue. ${scheduledCount} follow-up${scheduledCount === 1 ? '' : 's'} scheduled ahead.`
              : 'No follow-ups scheduled yet. Set follow-up dates to track them here.'}
          </div>
        ) : (
          rows.map((f) => {
            const agent = Array.isArray(f.agent) ? f.agent[0] : f.agent
            const daysLate = daysBetween(f.next_followup_at)
            return (
              <Link
                key={f.id}
                href={`/admin/crm/leads/${f.id}`}
                className="flex items-center justify-between gap-3 rounded-md border border-[#E8ECF0] p-3 transition hover:border-[#CD0E12]/40 hover:bg-[#F8F4EF]"
              >
                <div className="min-w-0">
                  <p className="truncate font-sans font-medium text-[#1A1A2E]">{f.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 font-sans text-xs text-[#6B6B6B]">
                    <Phone className="h-3 w-3" />
                    {f.phone}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-sans text-xs font-semibold text-[#CD0E12]">
                    {daysLate} day{daysLate === 1 ? '' : 's'} overdue
                  </span>
                  <StageBadge stage={f.stage as LeadStage} />
                  {!scoped && agent && (
                    <span className="font-sans text-[10px] text-[#6B6B6B]">{agent.full_name}</span>
                  )}
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
