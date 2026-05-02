import Link from 'next/link'
import { Users, IndianRupee, CalendarCheck, Percent, Phone } from 'lucide-react'
import {
  getDashboardKPIs,
  getFunnelSummary,
  getRecentActivity,
  getTodaysFollowups,
} from '@/lib/crm/queries'
import { KpiCard } from '@/components/crm/KpiCard'
import { FunnelChart } from '@/components/crm/FunnelChart'
import { ActivityIcon } from '@/components/crm/ActivityIcon'
import { StageBadge } from '@/components/crm/StageBadge'
import { ProjectBadge } from '@/components/crm/ProjectBadge'
import { formatINR, formatRelative, formatSmartDate } from '@/lib/crm/format'
import type { LeadStage } from '@/types/crm'

export const dynamic = 'force-dynamic'

export default async function CrmDashboardPage() {
  const [kpis, funnel, recent, followups] = await Promise.all([
    getDashboardKPIs(),
    getFunnelSummary(),
    getRecentActivity(10),
    getTodaysFollowups(),
  ])

  const delta =
    kpis.totalLeadsPrior > 0
      ? ((kpis.totalLeads - kpis.totalLeadsPrior) / kpis.totalLeadsPrior) * 100
      : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#1A1A2E]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">A quick read on the pipeline and today's priorities.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Leads (30d)"
          value={kpis.totalLeads.toLocaleString('en-IN')}
          delta={delta}
          icon={<Users className="h-5 w-5" />}
          accent="navy"
        />
        <KpiCard
          label="Pipeline Value"
          value={formatINR(kpis.pipelineValue)}
          hint="Active leads (excl. booked/lost)"
          icon={<IndianRupee className="h-5 w-5" />}
          accent="gold"
        />
        <KpiCard
          label="Bookings MTD"
          value={kpis.bookingsThisMonth.toString()}
          hint={`${formatINR(kpis.revenueThisMonth)} revenue`}
          icon={<CalendarCheck className="h-5 w-5" />}
          accent="emerald"
        />
        <KpiCard
          label="Conversion"
          value={`${kpis.conversionPct.toFixed(1)}%`}
          hint="Lifetime booked / total"
          icon={<Percent className="h-5 w-5" />}
          accent="crimson"
        />
      </div>

      <section className="rounded-lg border border-[#E8ECF0] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Funnel</h2>
          <Link href="/admin/crm/reports" className="text-xs text-[#CD0E12] hover:underline">
            View full report
          </Link>
        </div>
        {funnel.length === 0 ? (
          <EmptyHint label="No leads in the pipeline yet." />
        ) : (
          <FunnelChart rows={funnel} />
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Today's Follow-ups</h2>
          <p className="mt-0.5 text-xs text-[#6B6B6B]">Leads with a follow-up scheduled today.</p>
          <div className="mt-4 space-y-3">
            {followups.length === 0 && <EmptyHint label="No follow-ups due today." />}
            {followups.map((f) => {
              const agent = Array.isArray(f.agent) ? f.agent[0] : f.agent
              return (
                <Link
                  key={f.id}
                  href={`/admin/crm/leads/${f.id}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-[#E8ECF0] p-3 hover:border-[#CD0E12]/30"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#1A1A2E]">{f.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B6B6B]">
                      <Phone className="h-3 w-3" />
                      {f.phone}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StageBadge stage={f.stage as LeadStage} />
                    <span className="text-[11px] text-[#6B6B6B]">
                      {formatSmartDate(f.next_followup_at)}
                    </span>
                    {agent && <span className="text-[10px] text-[#6B6B6B]">{agent.full_name}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
          <h2 className="font-serif text-lg text-[#1A1A2E]">Recent Activity</h2>
          <p className="mt-0.5 text-xs text-[#6B6B6B]">Latest 10 events across all leads.</p>
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
                        className="truncate text-sm font-medium text-[#1A1A2E] hover:text-[#CD0E12]"
                      >
                        {lead?.name ?? 'Unknown lead'}
                      </Link>
                      <span className="shrink-0 text-[11px] text-[#6B6B6B]">
                        {formatRelative(row.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6B6B6B] line-clamp-2">
                      {row.content ?? row.activity_type.replace('_', ' ')}
                    </p>
                    {agent && <p className="mt-0.5 text-[10px] text-[#6B6B6B]">by {agent.full_name}</p>}
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
    <div className="rounded-md border border-dashed border-[#E8ECF0] p-6 text-center text-sm text-[#6B6B6B]">
      {label}
    </div>
  )
}
