import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getVisits } from '@/lib/crm/queries'
import { VisitRowActions } from '@/components/crm/VisitRowActions'
import { ProjectBadge } from '@/components/crm/ProjectBadge'
import { AgentAvatar } from '@/components/crm/AgentAvatar'
import { formatSmartDate } from '@/lib/crm/format'
import type { VisitStatus } from '@/types/crm'

export const dynamic = 'force-dynamic'

const STATUS_TABS = ['upcoming', 'today', 'completed', 'all'] as const
type StatusTab = typeof STATUS_TABS[number]

export default async function VisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const sp = await searchParams
  const tab = (STATUS_TABS.includes((sp.tab ?? '') as StatusTab) ? sp.tab : 'upcoming') as StatusTab
  const visits = await getVisits({ status: tab })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-[#1A1A2E]">Site Visits</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">Manage upcoming visits and capture feedback after each.</p>
      </div>

      <Tabs defaultValue={tab}>
        <TabsList>
          {STATUS_TABS.map((t) => (
            <TabsTrigger key={t} value={t} asChild>
              <Link href={`/admin/crm/visits?tab=${t}`} className="capitalize">{t}</Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="rounded-lg border border-[#E8ECF0] bg-white overflow-hidden">
            {visits.length === 0 ? (
              <div className="p-12 text-center text-sm text-[#6B6B6B]">No visits in this view.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((v) => {
                    const lead = Array.isArray(v.lead) ? v.lead[0] : v.lead
                    const agent = Array.isArray(v.agent) ? v.agent[0] : v.agent
                    return (
                      <TableRow key={v.id}>
                        <TableCell className="text-sm">{formatSmartDate(v.scheduled_at)}</TableCell>
                        <TableCell>
                          {lead ? (
                            <Link href={`/admin/crm/leads/${v.lead_id}`} className="text-[#1A1A2E] hover:text-[#CD0E12]">
                              {lead.name}
                              <span className="ml-2 text-[11px] text-[#6B6B6B]">{lead.phone}</span>
                            </Link>
                          ) : '-'}
                        </TableCell>
                        <TableCell><ProjectBadge project={v.project} /></TableCell>
                        <TableCell>
                          {agent ? (
                            <span className="inline-flex items-center gap-2 text-xs">
                              <AgentAvatar name={agent.full_name} size="sm" /> {agent.full_name}
                            </span>
                          ) : <span className="text-xs text-[#6B6B6B]">-</span>}
                        </TableCell>
                        <TableCell>
                          <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">{v.status}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <VisitRowActions visitId={v.id} status={v.status as VisitStatus} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
