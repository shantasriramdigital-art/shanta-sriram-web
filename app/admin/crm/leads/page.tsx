import { getAgents, getLeads } from '@/lib/crm/queries'
import { LeadsView } from '@/components/crm/LeadsView'
import type { LeadStage } from '@/types/crm'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const [{ rows }, agents] = await Promise.all([
    getLeads({ pageSize: 500 }),
    getAgents(),
  ])

  const sources = Array.from(
    new Set(rows.map((r) => r.source).filter((s): s is string => Boolean(s)))
  ).sort()
  const projects = Array.from(
    new Set(rows.map((r) => r.project_interest).filter((s): s is string => Boolean(s)))
  ).sort()

  const leads = rows.map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    source: r.source,
    stage: r.stage as LeadStage,
    project_interest: r.project_interest,
    budget_min: r.budget_min,
    budget_max: r.budget_max,
    created_at: r.created_at,
    updated_at: r.updated_at,
    last_contacted_at: r.last_contacted_at,
    agent: Array.isArray(r.agent) ? (r.agent[0] ?? null) : (r.agent ?? null),
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#1A1A2E]">Leads</h1>
          <p className="mt-1 text-sm text-[#6B6B6B]">{rows.length} total. Drag cards between stages or switch to table view.</p>
        </div>
      </div>
      <LeadsView
        leads={leads}
        agents={agents.map((a) => ({ id: a.id, full_name: a.full_name }))}
        sources={sources}
        projects={projects}
      />
    </div>
  )
}
