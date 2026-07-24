import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabase } from '@/utils/supabase/server'
import { Resend } from 'resend'
import { AgentInvite } from '@/emails/AgentInvite'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()
  if (agent?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  if (!body || !body.agent_id) {
    return NextResponse.json({ error: 'Missing agent_id' }, { status: 400 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Get agent email
  const { data: agentData, error: fetchError } = await admin
    .from('agents')
    .select('email, full_name')
    .eq('id', body.agent_id)
    .maybeSingle()

  if (fetchError || !agentData) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  // Generate new invitation via Supabase (creates new invite token)
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(agentData.email, {
    data: { full_name: agentData.full_name },
  })

  if (inviteError || !invited?.user) {
    return NextResponse.json({ error: inviteError?.message ?? 'Invite failed' }, { status: 400 })
  }

  // Send invitation email via Resend with custom template
  const resend = new Resend(process.env.RESEND_API_KEY)
  const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login?email=${encodeURIComponent(agentData.email)}`

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev',
    to: agentData.email,
    subject: `Join Shanta Sriram CRM - Set Your Password`,
    react: AgentInvite({
      agentName: agentData.full_name,
      inviteLink,
      invitedBy: agent.full_name,
    }),
  })

  if (emailError) {
    console.error('Email send error:', emailError)
    return NextResponse.json({ error: 'Invitation generated but email failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
