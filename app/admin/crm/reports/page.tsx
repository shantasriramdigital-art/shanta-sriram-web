import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  getAgentPerformance,
  getCurrentUser,
  getFunnelSummary,
  getSourcePerformance,
} from '@/lib/crm/queries'
import { FunnelChart } from '@/components/crm/FunnelChart'
import { AgentAvatar } from '@/components/crm/AgentAvatar'
import { formatINR } from '@/lib/crm/format'
import { LEAD_STAGE_LABELS, type LeadStage } from '@/types/crm'

export const dynamic = 'force-dynamic'

const STAGE_ORDER: LeadStage[] = [
  'new', 'contacted', 'qualified', 'visit_scheduled', 'visited', 'negotiation', 'booked',
]

export default async function ReportsPage() {
  const user = await getCurrentUser()
  const [funnel, agentPerf, sourcePerf] = await Promise.all([
    getFunnelSummary(),
    getAgentPerformance(),
    getSourcePerformance(),
  ])

  const showAgentPerf = user?.role === 'admin' || user?.role === 'viewer'
  const maxLeadsBySource = Math.max(1, ...sourcePerf.map((s) => s.total_leads))

  const stageCounts = new Map<LeadStage, number>()
  for (const r of funnel) stageCounts.set(r.stage, r.lead_count)
  const transitions: { from: LeadStage; to: LeadStage; pct: number }[] = []
  for (let i = 0; i < STAGE_ORDER.length - 1; i++) {
    const from = STAGE_ORDER[i]
    const to = STAGE_ORDER[i + 1]
    const fromCount = stageCounts.get(from) ?? 0
    const toCount = stageCounts.get(to) ?? 0
    if (fromCount > 0) transitions.push({ from, to, pct: (toCount / fromCount) * 100 })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#1A1A2E]">Reports</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">Funnel health, agent performance, and source attribution.</p>
      </div>

      <section className="rounded-lg border border-[#E8ECF0] bg-white p-6">
        <h2 className="font-serif text-lg text-[#1A1A2E]">Funnel Report</h2>
        <p className="mt-0.5 text-xs text-[#6B6B6B]">Stage distribution across all active leads.</p>
        <div className="mt-4">
          {funnel.length === 0 ? (
            <p className="text-sm text-[#6B6B6B]">No funnel data yet.</p>
          ) : (
            <FunnelChart rows={funnel} />
          )}
        </div>
        {transitions.length > 0 && (
          <div className="mt-6 rounded bg-[#F8F4EF] p-4">
            <p className="font-medium text-sm text-[#1A1A2E] mb-2">Stage-to-stage conversion</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {transitions.map((t) => (
                <div key={`${t.from}-${t.to}`} className="rounded bg-white px-3 py-2 border border-[#E8ECF0]">
                  <p className="text-[#6B6B6B]">{LEAD_STAGE_LABELS[t.from]} -&gt; {LEAD_STAGE_LABELS[t.to]}</p>
                  <p className="mt-0.5 font-medium text-[#1A1A2E]">{t.pct.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {showAgentPerf && (
        <section className="rounded-lg border border-[#E8ECF0] bg-white p-6">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Agent Performance</h2>
          <p className="mt-0.5 text-xs text-[#6B6B6B]">Sorted by revenue. Conversion = bookings / leads.</p>
          <div className="mt-4 overflow-hidden rounded border border-[#E8ECF0]">
            {agentPerf.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#6B6B6B]">No agent data yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead className="text-right">Total Leads</TableHead>
                    <TableHead className="text-right">Visits</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentPerf.map((a) => (
                    <TableRow key={a.agent_id}>
                      <TableCell>
                        <span className="inline-flex items-center gap-2">
                          <AgentAvatar name={a.full_name} size="sm" />
                          <span>{a.full_name}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{a.total_leads}</TableCell>
                      <TableCell className="text-right">{a.visits_completed}</TableCell>
                      <TableCell className="text-right">{a.bookings_count}</TableCell>
                      <TableCell className="text-right font-medium">{formatINR(a.total_revenue)}</TableCell>
                      <TableCell className="text-right">{a.conversion_pct == null ? '-' : `${a.conversion_pct.toFixed(1)}%`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>
      )}

      <section className="rounded-lg border border-[#E8ECF0] bg-white p-6">
        <h2 className="font-serif text-lg text-[#1A1A2E]">Source Attribution</h2>
        <p className="mt-0.5 text-xs text-[#6B6B6B]">Where leads come from and how they convert.</p>
        {sourcePerf.length === 0 ? (
          <p className="mt-4 text-sm text-[#6B6B6B]">No source data yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              {sourcePerf.map((s) => {
                const widthPct = (s.total_leads / maxLeadsBySource) * 100
                return (
                  <div key={s.source} className="grid grid-cols-[140px_1fr_auto] items-center gap-3 text-sm">
                    <span className="truncate text-[#1A1A2E]">{s.source}</span>
                    <div className="h-5 rounded bg-[#F4F7FC]">
                      <div className="h-full rounded bg-[#CD0E12]" style={{ width: `${Math.max(2, widthPct)}%` }} />
                    </div>
                    <span className="text-xs text-[#6B6B6B]">{s.total_leads} leads</span>
                  </div>
                )
              })}
            </div>
            <div className="rounded border border-[#E8ECF0] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Leads</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourcePerf.map((s) => (
                    <TableRow key={s.source}>
                      <TableCell>{s.source}</TableCell>
                      <TableCell className="text-right">{s.total_leads}</TableCell>
                      <TableCell className="text-right">{s.bookings_count}</TableCell>
                      <TableCell className="text-right">{s.conversion_pct == null ? '-' : `${s.conversion_pct.toFixed(1)}%`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
