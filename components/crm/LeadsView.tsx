'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LeadsKanban } from './LeadsKanban'
import { LeadsTable } from './LeadsTable'
import { LeadsExportButton } from './LeadsExportButton'
import { LeadsImportDialog } from './LeadsImportDialog'
import type { LeadStage } from '@/types/crm'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  source: string | null
  stage: LeadStage
  project_interest: string | null
  budget_min: number | null
  budget_max: number | null
  created_at: string
  updated_at: string | null
  last_contacted_at: string | null
  agent: { id: string; full_name: string } | null
}

interface Props {
  leads: Lead[]
  agents: { id: string; full_name: string }[]
  sources: string[]
  projects: string[]
  isAdmin?: boolean
}

export function LeadsView({ leads, agents, sources, projects, isAdmin = false }: Props) {
  return (
    <Tabs defaultValue="kanban" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <LeadsExportButton />
            <LeadsImportDialog />
          </div>
        )}
      </div>
      <TabsContent value="kanban">
        <LeadsKanban leads={leads} />
      </TabsContent>
      <TabsContent value="table">
        <LeadsTable leads={leads} agents={agents} sources={sources} projects={projects} />
      </TabsContent>
    </Tabs>
  )
}
