import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerSupabase } from '@/utils/supabase/server'
import { NewLeadAlert } from '@/emails/NewLeadAlert'

export const runtime = 'nodejs'

export async function GET() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents')
    .select('role, is_active, email, full_name')
    .eq('id', user.id)
    .maybeSingle()
  if (!agent || agent.role !== 'admin' || !agent.is_active) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const recipient = agent.email
  const leadDetailUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/crm`

  const resend = new Resend(process.env.RESEND_API_KEY!)
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: recipient,
      subject: '[TEST] New lead alert pipeline check',
      react: NewLeadAlert({
        leadName: 'Test Lead (sample)',
        leadPhone: '+91 98765 43210',
        leadEmail: 'test@example.com',
        leadSource: 'lead-form',
        projectInterest: 'bodhivriksha',
        budget: 'Rs 80 L - Rs 1.2 Cr',
        agentName: agent.full_name,
        leadDetailUrl,
      }),
    })
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true, recipient })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Send failed' },
      { status: 500 }
    )
  }
}
