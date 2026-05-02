import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, MessageCircle, Mail, ArrowLeft } from 'lucide-react'
import { getAgents, getCurrentUser, getLeadById } from '@/lib/crm/queries'
import { ActivityIcon } from '@/components/crm/ActivityIcon'
import { StageBadge } from '@/components/crm/StageBadge'
import { ProjectBadge } from '@/components/crm/ProjectBadge'
import { AgentAvatar } from '@/components/crm/AgentAvatar'
import { LeadDetailActions } from '@/components/crm/LeadDetailActions'
import {
  formatAbsolute,
  formatBudgetRange,
  formatDateTime,
  formatINR,
  formatRelative,
  formatSmartDate,
} from '@/lib/crm/format'
import type { LeadStage } from '@/types/crm'

export const dynamic = 'force-dynamic'

interface PageProps { params: Promise<{ id: string }> }

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params
  const [lead, agents, user] = await Promise.all([
    getLeadById(id),
    getAgents(),
    getCurrentUser(),
  ])
  if (!lead) notFound()

  const canReassign = user?.role === 'admin' || (user?.role === 'sales' && (lead.assigned_to === null || lead.assigned_to === user.id))
  const waLink = `https://wa.me/91${lead.phone.replace(/\D/g, '')}`

  return (
    <div className="space-y-6">
      <Link href="/admin/crm/leads" className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#CD0E12]">
        <ArrowLeft className="h-3 w-3" /> Back to leads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-serif text-3xl text-[#1A1A2E]">{lead.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 text-[#1A1A2E] hover:text-[#CD0E12]">
                    <Phone className="h-3.5 w-3.5" /> {lead.phone}
                  </a>
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 text-[#1A1A2E] hover:text-[#CD0E12]">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </a>
                  )}
                  <a href={waLink} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StageBadge stage={lead.stage as LeadStage} />
                  <ProjectBadge project={lead.project_interest} />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <LeadDetailActions
                leadId={lead.id}
                currentStage={lead.stage as LeadStage}
                currentAgentId={lead.assigned_to}
                defaultProject={lead.project_interest as string | null}
                agents={agents.map((a) => ({ id: a.id, full_name: a.full_name }))}
                canReassign={!!canReassign}
                nextFollowupAt={lead.next_followup_at}
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#E8ECF0] bg-white p-6">
            <h2 className="font-serif text-lg text-[#1A1A2E]">Activity Timeline</h2>
            {lead.activities.length === 0 ? (
              <p className="mt-4 text-sm text-[#6B6B6B]">No activity recorded yet. Use the actions above to log a call or add a note.</p>
            ) : (
              <ol className="mt-4 relative border-l border-[#E8ECF0] pl-6 space-y-5">
                {lead.activities.map((a) => {
                  const agent = Array.isArray(a.agent) ? a.agent[0] : a.agent
                  return (
                    <li key={a.id} className="relative">
                      <span className="absolute -left-[34px] top-0">
                        <ActivityIcon type={a.activity_type} size="sm" />
                      </span>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#1A1A2E]">
                          {a.activity_type.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-[#6B6B6B]">{formatRelative(a.created_at)}</span>
                        {agent && <span className="text-[11px] text-[#6B6B6B]">· {agent.full_name}</span>}
                      </div>
                      {a.content && <p className="mt-1 text-sm text-[#4A4A5A]">{a.content}</p>}
                      <p className="mt-0.5 text-[10px] text-[#6B6B6B]">{formatDateTime(a.created_at)}</p>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <Card title="Details">
            <DetailRow label="Source" value={lead.source ?? '-'} />
            <DetailRow label="Interest" value={lead.interest ?? '-'} />
            <DetailRow label="Project" value={lead.project_interest ?? '-'} />
            <DetailRow label="Budget" value={formatBudgetRange(lead.budget_min, lead.budget_max)} />
            <DetailRow label="Created" value={formatAbsolute(lead.created_at)} />
            {lead.message && (
              <div className="mt-2 rounded bg-[#F8F4EF] p-2 text-xs text-[#4A4A5A]">
                <p className="font-medium text-[#1A1A2E]">Message</p>
                <p className="mt-1">{lead.message}</p>
              </div>
            )}
          </Card>

          <Card title="Assignment">
            {lead.agent ? (
              <div className="flex items-center gap-3">
                <AgentAvatar name={lead.agent.full_name} />
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">{lead.agent.full_name}</p>
                  <p className="text-xs text-[#6B6B6B]">{lead.agent.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#6B6B6B]">Unassigned. Use the dropdown above to assign.</p>
            )}
          </Card>

          <Card title="Follow-up">
            <DetailRow label="Next follow-up" value={lead.next_followup_at ? formatSmartDate(lead.next_followup_at) : 'Not scheduled'} />
            <DetailRow label="Last contacted" value={lead.last_contacted_at ? formatRelative(lead.last_contacted_at) : 'Never'} />
          </Card>

          <Card title={`Site Visits (${lead.visits.length})`}>
            {lead.visits.length === 0 ? (
              <p className="text-sm text-[#6B6B6B]">No visits scheduled.</p>
            ) : (
              <ul className="space-y-2">
                {lead.visits.map((v) => (
                  <li key={v.id} className="flex items-center justify-between border-b border-[#E8ECF0] pb-2 last:border-0">
                    <div>
                      <p className="text-sm text-[#1A1A2E]">{formatSmartDate(v.scheduled_at)}</p>
                      <p className="text-xs text-[#6B6B6B]">{v.project}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">{v.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {lead.booking ? (
            <Card title="Booking">
              <DetailRow label="Unit" value={`${lead.booking.unit_type ?? ''} ${lead.booking.unit_number ?? ''}`.trim() || '-'} />
              <DetailRow label="Project" value={lead.booking.project} />
              <DetailRow label="Total value" value={formatINR(lead.booking.total_value)} />
              <DetailRow label="Token" value={formatINR(lead.booking.booking_amount)} />
              <DetailRow label="Booked" value={formatAbsolute(lead.booking.booked_at)} />
            </Card>
          ) : (
            <Card title="Booking">
              <p className="text-sm text-[#6B6B6B]">No booking yet. Use "Mark Booked" above when this lead converts.</p>
            </Card>
          )}

          {lead.lost_reason && (
            <Card title="Lost Reason">
              <p className="text-sm text-[#4A4A5A]">{lead.lost_reason}</p>
            </Card>
          )}
        </aside>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#E8ECF0] bg-white p-5">
      <h3 className="font-serif text-base text-[#1A1A2E] mb-3">{title}</h3>
      {children}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">{label}</span>
      <span className="text-[#1A1A2E]">{value}</span>
    </div>
  )
}
