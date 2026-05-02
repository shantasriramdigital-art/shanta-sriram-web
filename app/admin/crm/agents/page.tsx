import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAgentsWithStats, getCurrentUser } from '@/lib/crm/queries'
import { AgentAvatar } from '@/components/crm/AgentAvatar'
import { InviteAgentModal } from '@/components/crm/InviteAgentModal'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AgentsPage() {
  const user = await getCurrentUser()
  if (user?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-[#E8ECF0] bg-white p-8 text-center">
        <h2 className="font-serif text-xl text-[#1A1A2E]">Access denied</h2>
        <p className="mt-2 text-sm text-[#6B6B6B]">This page is restricted to admins.</p>
        <Link href="/admin/crm" className="mt-4 inline-block">
          <Button variant="outline" size="sm">Back to dashboard</Button>
        </Link>
      </div>
    )
  }

  const agents = await getAgentsWithStats()

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#1A1A2E]">Team</h1>
          <p className="mt-1 text-sm text-[#6B6B6B]">Manage agents and their roles. Invitations send a magic link from Supabase.</p>
        </div>
        <InviteAgentModal />
      </div>

      <div className="rounded-lg border border-[#E8ECF0] bg-white overflow-hidden">
        {agents.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#6B6B6B]">No agents yet. Click "Invite Agent" to get started.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <AgentAvatar name={a.full_name} size="sm" />
                      <span className="font-medium text-[#1A1A2E]">{a.full_name}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{a.email}</TableCell>
                  <TableCell className="text-sm text-[#6B6B6B]">{a.phone ?? '-'}</TableCell>
                  <TableCell>
                    <span className="text-[10px] uppercase tracking-wider text-[#CD0E12]">{a.role}</span>
                  </TableCell>
                  <TableCell className="text-sm text-right">{a.leads_count}</TableCell>
                  <TableCell className="text-sm text-right">{a.bookings_count}</TableCell>
                  <TableCell>
                    <span className={`text-[11px] ${a.is_active ? 'text-emerald-700' : 'text-[#6B6B6B]'}`}>
                      {a.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
