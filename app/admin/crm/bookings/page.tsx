import Link from 'next/link'
import { Calendar, IndianRupee, TrendingUp } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getBookings } from '@/lib/crm/queries'
import { KpiCard } from '@/components/crm/KpiCard'
import { ProjectBadge } from '@/components/crm/ProjectBadge'
import { AgentAvatar } from '@/components/crm/AgentAvatar'
import { BookingsExportButton } from '@/components/crm/BookingsExportButton'
import { formatAbsolute, formatINR } from '@/lib/crm/format'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  const bookings = await getBookings()

  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const monthEndPrev = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

  const totalCount = bookings.length
  const totalRevenue = bookings.reduce((s, b) => s + (b.total_value ?? 0), 0)
  const avgTicket = totalCount > 0 ? totalRevenue / totalCount : 0
  const thisMonthCount = bookings.filter((b) => new Date(b.booked_at) >= thisMonth).length
  const lastMonthCount = bookings.filter((b) => {
    const d = new Date(b.booked_at)
    return d >= lastMonth && d <= monthEndPrev
  }).length
  const delta = lastMonthCount > 0 ? ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100 : null

  const exportRows = bookings.map((b) => {
    const lead = Array.isArray(b.lead) ? b.lead[0] : b.lead
    const agent = Array.isArray(b.agent) ? b.agent[0] : b.agent
    return {
      booked_at: b.booked_at,
      lead_name: lead?.name ?? null,
      project: b.project,
      unit_number: b.unit_number,
      unit_type: b.unit_type,
      carpet_area: b.carpet_area,
      total_value: b.total_value,
      booking_amount: b.booking_amount,
      agent_name: agent?.full_name ?? null,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#1A1A2E]">Bookings</h1>
          <p className="mt-1 text-sm text-[#6B6B6B]">All confirmed bookings across projects.</p>
        </div>
        <BookingsExportButton rows={exportRows} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Bookings" value={totalCount.toString()} icon={<Calendar className="h-5 w-5" />} accent="navy" />
        <KpiCard label="Total Revenue" value={formatINR(totalRevenue)} icon={<IndianRupee className="h-5 w-5" />} accent="emerald" />
        <KpiCard label="Avg Ticket" value={formatINR(avgTicket)} icon={<TrendingUp className="h-5 w-5" />} accent="gold" />
        <KpiCard
          label="This Month"
          value={thisMonthCount.toString()}
          delta={delta}
          hint={`${lastMonthCount} last month`}
          icon={<Calendar className="h-5 w-5" />}
          accent="crimson"
        />
      </div>

      <div className="rounded-lg border border-[#E8ECF0] bg-white overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#6B6B6B]">No bookings yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booked</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Carpet</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Token</TableHead>
                <TableHead>Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => {
                const lead = Array.isArray(b.lead) ? b.lead[0] : b.lead
                const agent = Array.isArray(b.agent) ? b.agent[0] : b.agent
                return (
                  <TableRow key={b.id}>
                    <TableCell className="text-xs text-[#6B6B6B]">{formatAbsolute(b.booked_at)}</TableCell>
                    <TableCell>
                      {lead ? (
                        <Link href={`/admin/crm/leads/${b.lead_id}`} className="text-[#1A1A2E] hover:text-[#CD0E12]">
                          {lead.name}
                        </Link>
                      ) : '-'}
                    </TableCell>
                    <TableCell><ProjectBadge project={b.project} /></TableCell>
                    <TableCell className="text-sm">{b.unit_number ?? '-'}</TableCell>
                    <TableCell className="text-sm">{b.unit_type ?? '-'}</TableCell>
                    <TableCell className="text-sm text-right">{b.carpet_area ? `${b.carpet_area} sqft` : '-'}</TableCell>
                    <TableCell className="text-sm text-right font-medium">{formatINR(b.total_value)}</TableCell>
                    <TableCell className="text-sm text-right">{formatINR(b.booking_amount)}</TableCell>
                    <TableCell>
                      {agent ? (
                        <span className="inline-flex items-center gap-2 text-xs">
                          <AgentAvatar name={agent.full_name} size="sm" /> {agent.full_name}
                        </span>
                      ) : <span className="text-xs text-[#6B6B6B]">-</span>}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
