import Link from 'next/link'
import { Clock } from 'lucide-react'
import { StageBadge } from './StageBadge'
import { daysBetween } from '@/lib/crm/format'
import type { StaleLeads } from '@/lib/crm/queries'
import type { LeadStage } from '@/types/crm'

const ALERT_THRESHOLD = 5

interface Props {
  data: StaleLeads
  scoped: boolean
}

export function StaleLeadsCard({ data, scoped }: Props) {
  const { rows, count } = data
  const urgent = count > ALERT_THRESHOLD
  const accent = urgent ? '#CD0E12' : '#8a7240'

  return (
    <div
      className="rounded-lg border bg-white p-6"
      style={{ borderColor: urgent ? 'rgba(205,14,18,0.25)' : '#E8ECF0' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-lg text-[#1A1A2E]">
            <Clock className="h-4 w-4" style={{ color: accent }} />
            Aging Leads
          </h2>
          <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
            {scoped ? 'Your active leads' : 'Active leads'} untouched for over 7 days.
          </p>
        </div>
        {count > 0 && (
          <span
            className="shrink-0 rounded-md px-2.5 py-1 font-serif text-lg leading-none"
            style={{
              color: accent,
              backgroundColor: urgent ? 'rgba(205,14,18,0.10)' : 'rgba(201,169,110,0.18)',
            }}
          >
            {count}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2.5">
        {count === 0 ? (
          <div className="rounded-md border border-dashed border-[#E8ECF0] bg-[#F8F4EF] p-6 text-center font-sans text-sm text-[#6B6B6B]">
            No stale leads. Everything active has been touched this week.
          </div>
        ) : (
          rows.map((l) => {
            const agent = Array.isArray(l.agent) ? l.agent[0] : l.agent
            const age = daysBetween(l.created_at)
            return (
              <Link
                key={l.id}
                href={`/admin/crm/leads/${l.id}`}
                className="flex items-center justify-between gap-3 rounded-md border border-[#E8ECF0] p-3 transition hover:border-[#C9A96E]/60 hover:bg-[#F8F4EF]"
              >
                <div className="min-w-0">
                  <p className="truncate font-sans font-medium text-[#1A1A2E]">{l.name}</p>
                  {!scoped && agent && (
                    <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">{agent.full_name}</p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-sans text-xs text-[#6B6B6B]">{age} days old</span>
                  <StageBadge stage={l.stage as LeadStage} />
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
