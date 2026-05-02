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
  console.log('[lead-created] webhook invoked at', new Date().toISOString())

  try {
    console.log('[lead-created] auth check')
    const auth = req.headers.get('authorization')
    if (!auth || auth !== `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`) {
      console.log('[lead-created] EARLY EXIT: auth failed')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log('[lead-created] auth check passed')

    console.log('[lead-created] parsing body')
    const body = await req.json().catch(() => null)
    if (!body || body.type !== 'INSERT' || !body.record) {
      console.log('[lead-created] EARLY EXIT: invalid payload', {
        hasBody: !!body,
        type: body?.type,
      })
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    const lead = body.record as LeadRecord
    console.log('[lead-created] parsed body, lead id:', lead?.id)

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('[lead-created] EARLY EXIT: missing supabase env vars')
      return NextResponse.json(
        { error: 'Server misconfigured: supabase env' },
        { status: 500 }
      )
    }
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.log('[lead-created] EARLY EXIT: missing resend env vars')
      return NextResponse.json(
        { error: 'Server misconfigured: resend env' },
        { status: 500 }
      )
    }
    if (!process.env.LEAD_ALERT_CC_EMAIL) {
      console.log('[lead-created] EARLY EXIT: missing LEAD_ALERT_CC_EMAIL')
      return NextResponse.json(
        { error: 'Server misconfigured: cc email' },
        { status: 500 }
      )
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    console.log('[lead-created] idempotency check')
    const sixtySecondsAgo = new Date(Date.now() - 60_000).toISOString()
    const { data: existing, error: existingError } = await admin
      .from('lead_activities')
      .select('id')
      .eq('lead_id', lead.id)
      .eq('activity_type', 'note')
      .ilike('content', 'Email alert sent%')
      .gte('created_at', sixtySecondsAgo)
      .limit(1)
    if (existingError) {
      console.log('[lead-created] idempotency query error:', existingError.message)
    }
    console.log('[lead-created] idempotency: existing entries:', existing?.length || 0)
    if (existing && existing.length > 0) {
      console.log('[lead-created] EARLY EXIT: duplicate within 60s')
      return NextResponse.json({ skipped: true })
    }

    console.log('[lead-created] looking up agent')
    type AgentInfo = { full_name: string; email: string }
    let agent: AgentInfo | null = null
    if (lead.assigned_to) {
      const { data, error: agentError } = await admin
        .from('agents')
        .select('full_name, email')
        .eq('id', lead.assigned_to)
        .maybeSingle()
      if (agentError) {
        console.log('[lead-created] agent lookup error:', agentError.message)
      }
      agent = (data as AgentInfo | null) ?? null
    }
    console.log('[lead-created] agent lookup result:', agent?.email || 'no agent')

    const ccEmail = process.env.LEAD_ALERT_CC_EMAIL
    const recipient = agent?.email ?? ccEmail
    const subjectPrefix = agent ? '' : '[UNASSIGNED] '
    const subject = `${subjectPrefix}New lead: ${lead.name} - ${lead.project_interest || 'No project'}`
    const leadDetailUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/crm/leads/${lead.id}`

    console.log('[lead-created] sending email via Resend', {
      to: recipient,
      cc: agent ? ccEmail : null,
      from: process.env.RESEND_FROM_EMAIL,
    })
    const resend = new Resend(process.env.RESEND_API_KEY)
    const resendResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
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
    console.log('[lead-created] resend response:', JSON.stringify(resendResult))
    if (resendResult.error) {
      return NextResponse.json({ error: resendResult.error.message }, { status: 500 })
    }

    console.log('[lead-created] logging activity')
    const { error: insertError } = await admin.from('lead_activities').insert({
      lead_id: lead.id,
      agent_id: null,
      activity_type: 'note',
      content: `Email alert sent to ${recipient}`,
    })
    if (insertError) {
      console.log('[lead-created] activity insert error:', insertError.message)
    } else {
      console.log('[lead-created] activity logged')
    }

    console.log('[lead-created] complete')
    return NextResponse.json({ success: true, recipient })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('[lead-created] FATAL:', message)
    if (stack) console.error('[lead-created] stack:', stack)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
