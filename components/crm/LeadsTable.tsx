'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StageBadge } from './StageBadge'
import { ProjectBadge } from './ProjectBadge'
import { AgentAvatar } from './AgentAvatar'
import { formatRelative, formatAbsolute } from '@/lib/crm/format'
import { LEAD_STAGES, LEAD_STAGE_LABELS, type LeadStage } from '@/types/crm'

interface TableLead {
  id: string
  name: string
  phone: string
  email: string | null
  source: string | null
  stage: LeadStage
  project_interest: string | null
  created_at: string
  last_contacted_at: string | null
  agent: { id: string; full_name: string } | null
}

interface Props {
  leads: TableLead[]
  agents: { id: string; full_name: string }[]
  sources: string[]
  projects: string[]
}

export function LeadsTable({ leads, agents, sources, projects }: Props) {
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState<string>('all')
  const [project, setProject] = useState<string>('all')
  const [agent, setAgent] = useState<string>('all')
  const [source, setSource] = useState<string>('all')

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (stage !== 'all' && l.stage !== stage) return false
      if (project !== 'all' && l.project_interest !== project) return false
      if (agent !== 'all') {
        if (agent === 'unassigned' && l.agent) return false
        if (agent !== 'unassigned' && l.agent?.id !== agent) return false
      }
      if (source !== 'all' && l.source !== source) return false
      if (search) {
        const s = search.toLowerCase()
        if (
          !l.name.toLowerCase().includes(s) &&
          !l.phone.includes(s) &&
          !(l.email ?? '').toLowerCase().includes(s)
        ) return false
      }
      return true
    })
  }, [leads, search, stage, project, agent, source])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
          <Input
            placeholder="Search name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {LEAD_STAGES.map((s) => (
              <SelectItem key={s} value={s}>{LEAD_STAGE_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={project} onValueChange={setProject}>
          <SelectTrigger><SelectValue placeholder="Project" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            {projects.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={agent} onValueChange={setAgent}>
          <SelectTrigger><SelectValue placeholder="Assigned" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All agents</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {agents.map((a) => (
              <SelectItem key={a.id} value={a.id}>{a.full_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sources.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Source" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-[#6B6B6B]">
            Showing {filtered.length} of {leads.length} leads
          </span>
        </div>
      )}

      <div className="rounded-lg border border-[#E8ECF0] bg-white overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#6B6B6B]">
            No leads match your filters.
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((l) => (
                    <TableRow key={l.id} className="cursor-pointer">
                      <TableCell>
                        <Link href={`/admin/crm/leads/${l.id}`} className="font-medium text-[#1A1A2E] hover:text-[#CD0E12]">
                          {l.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-[#4A4A5A]">{l.phone}</TableCell>
                      <TableCell><ProjectBadge project={l.project_interest} /></TableCell>
                      <TableCell><StageBadge stage={l.stage} /></TableCell>
                      <TableCell>
                        {l.agent ? (
                          <span className="inline-flex items-center gap-2 text-xs">
                            <AgentAvatar name={l.agent.full_name} size="sm" />
                            {l.agent.full_name}
                          </span>
                        ) : (
                          <span className="text-xs text-[#6B6B6B]">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-[#6B6B6B]">{l.source ?? '-'}</TableCell>
                      <TableCell className="text-xs text-[#6B6B6B]">{formatAbsolute(l.created_at)}</TableCell>
                      <TableCell className="text-xs text-[#6B6B6B]">{l.last_contacted_at ? formatRelative(l.last_contacted_at) : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ul className="md:hidden divide-y divide-[#E8ECF0]">
              {filtered.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/crm/leads/${l.id}`} className="block p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-[#1A1A2E]">{l.name}</p>
                        <p className="text-xs text-[#6B6B6B]">{l.phone}</p>
                      </div>
                      <StageBadge stage={l.stage} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <ProjectBadge project={l.project_interest} />
                      <span className="text-[11px] text-[#6B6B6B]">{formatRelative(l.created_at)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
