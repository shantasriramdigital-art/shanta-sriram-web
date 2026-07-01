import Link from 'next/link'
import { Users, IndianRupee, CalendarCheck, Percent, Phone } from 'lucide-react'
import {
  getCurrentUser,
  getDashboardKPIs,
  getFunnelSummary,
  getFunnelForAgent,
  getRecentActivity,
  getTodaysFollowups,
  getOverdueFollowups,
  getStaleLeads,
  getSourceBreakdown30d,
} from '@/lib/crm/queries'
import { KpiCard } from '@/components/crm/KpiCard'
import { DashboardFunnel } from '@/components/crm/DashboardFunnel'
import { OverdueFollowupsCard } from '@/components/crm/OverdueFollowupsCard'
import { StaleLeadsCard } from '@/components/crm/StaleLeadsCard'
import { SourceBars } from '@/components/crm/SourceBars'
import { ActivityIcon } from '@/components/crm/ActivityIcon'
import { StageBadge } from '@/components/crm/StageBadge'
import { formatINR, formatRelative, formatSmartDate } from '@/lib/crm/format'
import type { LeadStage, SourcePerformanceRow } from '@/types/crm'

export const dynamic = 'force-dynamic'

export default async function CrmDashboardPage() {
  const user = await getCurrentUser()
  const role = user?.role ?? null
  const isSales = role === 'sales'
  const agentId = isSales && user ? user.id : null
  const canSeeSource = role === 'admin' || role === 'manager' || role === 'viewer'

  const [kpis, funnel, recent, followups, overdue, stale, source] = await Promise.all([
    getDashboardKPIs(agentId),
    isSales && user ? getFunnelForAgent(user.id) : getFunnelSummary(),
    getRecentActivity(10, agentId),
    getTodaysFollowups(agentId),
    getOverdueFollowups(agentId),
    getStaleLeads(agentId),
    canSeeSource ? getSourceBreakdown30d(agentId) : Promise.resolve([] as SourcePerformanceRow[]),
  ])

  const delta =
    kpis.totalLeadsPrior > 0
      ? ((kpis.totalLeads - kpis.totalLeadsPrior) / kpis.totalLeadsPrior) * 100
      : null

  const scopeLabel = isSales ? 'your leads' : 'all leads'
  const pfx = isSales ? 'My ' : ''

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#1A1A2E]">Dashboard</h1>
        <p className="mt-1 font-sans text-sm text-[#6B6B6B]">
          {isSales
            ? 'Your pipeline and priorities for today.'
            : 'A quick read on the pipeline and priorities for today.'}
        </p>
      </div>

      {/* Row 1: KPIs. Crimson is not used here so it stays reserved for urgency. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label={`${pfx}Leads (30d)`}
          value={kpis.totalLeads.toLocaleString('en-IN')}
          delta={delta}
          icon={<Users className="h-5 w-5" />}
          accent="navy"
        />
        <KpiCard
          label={`${pfx}Pipeline Value`}
          value={formatINR(kpis.pipelineValue)}
          hint="Active leads (excl. booked/lost)"
          icon={<IndianRupee className="h-5 w-5" />}
          accent="gold"
        />
        <KpiCard
          label={`${pfx}Bookings MTD`}
          value={kpis.bookingsThisMonth.toString()}
          hint={`${formatINR(kpis.revenueThisMonth)} revenue`}
          icon={<CalendarCheck className="h-5 w-5" />}
          accent="emerald"
        />
        <KpiCard
          label={`${pfx}Conversion`}
          value={`${kpis.conversionPct.toFixed(1)}%`}
          hint="Booked / total"
          icon={<Percent className="h-5 w-5" />}
          accent="navy"
        />
      </div>

      {/* Row 2: Action zone. The daily driver, kept high on the page. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OverdueFollowupsCard data={overdue} scoped={isSales} />
        <StaleLeadsCard data={stale} scoped={isSales} />
      </div>

      {/* Row 3: Where leads sit (funnel) and where they come from (source). */}
      <div className={`grid grid-cols-1 gap-4 ${canSeeSource ? 'lg:grid-cols-2' : ''}`}>
        <section className="rounded-lg border border-[#E8ECF0] bg-[#F8F4EF] p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-lg text-[#1A1A2E]">Funnel</h2>
              <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
                Where {scopeLabel} sit in the pipeline.
              </p>
            </div>
            <Link
              href="/admin/crm/reports"
              className="shrink-0 font-sans text-xs text-[#8a7240] hover:underline"
            >
              View full report
            </Link>
          </div>
          {funnel.length === 0 ? (
            <EmptyHint label="No leads in the pipeline yet." />
          ) : (
            <DashboardFunnel rows={funnel} />
          )}
        </section>

        {canSeeSource && (
          <section className="rounded-lg border border-[#E8ECF0] bg-[#F8F4EF] p-6">
            <div className="mb-4">
              <h2 className="font-serif text-lg text-[#1A1A2E]">Lead sources, last 30 days</h2>
              <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">New leads by channel.</p>
            </div>
            <SourceBars rows={source} />
          </section>
        )}
      </div>

      {/* Row 4: Today's follow-ups and the activity feed. */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Today&apos;s Follow-ups</h2>
          <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
            {isSales ? 'Your leads' : 'Leads'} with a follow-up scheduled today.
          </p>
          <div className="mt-4 space-y-3">
            {followups.length === 0 && <EmptyHint label="No follow-ups due today." />}
            {followups.map((f) => {
              const agent = Array.isArray(f.agent) ? f.agent[0] : f.agent
              return (
                <Link
                  key={f.id}
                  href={`/admin/crm/leads/${f.id}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-[#E8ECF0] p-3 transition hover:border-[#C9A96E]/60 hover:bg-[#F8F4EF]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans font-medium text-[#1A1A2E]">{f.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 font-sans text-xs text-[#6B6B6B]">
                      <Phone className="h-3 w-3" />
                      {f.phone}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <StageBadge stage={f.stage as LeadStage} />
                    <span className="font-sans text-[11px] text-[#6B6B6B]">
                      {formatSmartDate(f.next_followup_at)}
                    </span>
                    {!isSales && agent && (
                      <span className="font-sans text-[10px] text-[#6B6B6B]">{agent.full_name}</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Recent Activity</h2>
          <p className="mt-0.5 font-sans text-xs text-[#6B6B6B]">
            {isSales ? 'Latest events on your leads.' : 'Latest events across all leads.'}
          </p>
          <ul className="mt-4 space-y-3">
            {recent.length === 0 && <EmptyHint label="No recent activity." />}
            {recent.map((row) => {
              const lead = Array.isArray(row.lead) ? row.lead[0] : row.lead
              const agent = Array.isArray(row.agent) ? row.agent[0] : row.agent
              return (
                <li key={row.id} className="flex items-start gap-3">
                  <ActivityIcon type={row.activity_type} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/admin/crm/leads/${row.lead_id}`}
                        className="truncate font-sans text-sm font-medium text-[#1A1A2E] hover:text-[#8a7240]"
                      >
                        {lead?.name ?? 'Unknown lead'}
                      </Link>
                      <span className="shrink-0 font-sans text-[11px] text-[#6B6B6B]">
                        {formatRelative(row.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 font-sans text-xs text-[#6B6B6B] line-clamp-2">
                      {row.content ?? row.activity_type.replace('_', ' ')}
                    </p>
                    {agent && (
                      <p className="mt-0.5 font-sans text-[10px] text-[#6B6B6B]">by {agent.full_name}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

function EmptyHint({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-[#E8ECF0] bg-transparent p-6 text-center font-sans text-sm text-[#6B6B6B]">
      {label}
    </div>
  )
}
