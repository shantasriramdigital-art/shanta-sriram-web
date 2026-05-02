'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'
import { AgentAvatar } from './AgentAvatar'
import { ProjectBadge } from './ProjectBadge'
import { formatBudgetRange, daysBetween } from '@/lib/crm/format'

export interface KanbanLead {
  id: string
  name: string
  phone: string
  project_interest: string | null
  budget_min: number | null
  budget_max: number | null
  updated_at: string | null
  agent: { id: string; full_name: string } | null
}

export function LeadCard({ lead }: { lead: KanbanLead }) {
  const days = daysBetween(lead.updated_at)
  return (
    <Link
      href={`/admin/crm/leads/${lead.id}`}
      className="block rounded-md border border-[#E8ECF0] bg-white p-3 shadow-sm transition hover:border-[#CD0E12]/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-[#1A1A2E]">{lead.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B6B6B]">
            <Phone className="h-3 w-3" /> {lead.phone}
          </p>
        </div>
        <AgentAvatar name={lead.agent?.full_name ?? null} size="sm" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <ProjectBadge project={lead.project_interest} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-[#6B6B6B]">
        <span>{formatBudgetRange(lead.budget_min, lead.budget_max)}</span>
        <span>{days}d in stage</span>
      </div>
    </Link>
  )
}
