import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NewLeadAlert } from '@/emails/NewLeadAlert'
import { formatBudgetRange } from '@/lib/crm/format'

export const runtime = 'nodejs'

interface LeadRecord {
  id: string
  name: string
  phone: string
  email: string | null
  source: string | null
  project_interest: string | null
  budget_min: number | null
  budget_max: number | null
  assigned_to: string | null
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!auth || auth !== `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body || body.type !== 'INSERT' || !body.record) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  const lead = body.record as LeadRecord

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const sixtySecondsAgo = new Date(Date.now() - 60_000).toISOString()
  const { data: existing } = await admin
    .from('lead_activities')
    .select('id')
    .eq('lead_id', lead.id)
    .eq('activity_type', 'note')
    .ilike('content', 'Email alert sent%')
    .gte('created_at', sixtySecondsAgo)
    .limit(1)
  if (existing && existing.length > 0) {
    return NextResponse.json({ skipped: true })
  }

  type AgentInfo = { full_name: string; email: string }
  let agent: AgentInfo | null = null
  if (lead.assigned_to) {
    const { data } = await admin
      .from('agents')
      .select('full_name, email')
      .eq('id', lead.assigned_to)
      .maybeSingle()
    agent = (data as AgentInfo | null) ?? null
  }

  const ccEmail = process.env.LEAD_ALERT_CC_EMAIL!
  const recipient = agent?.email ?? ccEmail
  const subjectPrefix = agent ? '' : '[UNASSIGNED] '
  const subject = `${subjectPrefix}New lead: ${lead.name} - ${lead.project_interest || 'No project'}`
  const leadDetailUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/crm/leads/${lead.id}`

  const resend = new Resend(process.env.RESEND_API_KEY!)
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: recipient,
      cc: agent ? ccEmail : undefined,
      subject,
      react: NewLeadAlert({
        leadName: lead.name,
        leadPhone: lead.phone,
        leadEmail: lead.email,
        leadSource: lead.source,
        projectInterest: lead.project_interest,
        budget: formatBudgetRange(lead.budget_min, lead.budget_max),
        agentName: agent?.full_name ?? null,
        leadDetailUrl,
      }),
    })
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    await admin.from('lead_activities').insert({
      lead_id: lead.id,
      agent_id: null,
      activity_type: 'note',
      content: `Email alert sent to ${recipient}`,
    })

    return NextResponse.json({ success: true, recipient })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Send failed' },
      { status: 500 }
    )
  }
}
