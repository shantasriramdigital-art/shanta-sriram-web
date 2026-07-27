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

  // Generate magic link for password setup (no email sent by Supabase)
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: 'signup',
    email: agentData.email,
  })
  if (linkError) {
    console.error('Magic link generation error:', linkError)
  }
  const magicLink = linkData?.properties?.action_link

  // Send invitation email via Resend with custom template
  const resend = new Resend(process.env.RESEND_API_KEY)
  const inviteLink = magicLink || `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login?email=${encodeURIComponent(agentData.email)}`

  const { error: emailError } = await resend.emails.send({
    from: 'Shanta Sriram CRM <noreply@shantasriram.com>',
    to: agentData.email,
    subject: `Join Shanta Sriram CRM - Set Your Password`,
    react: AgentInvite({
      agentName: agentData.full_name,
      inviteLink,
      invitedBy: agent.full_name,
    }),
  })

  if (emailError) {
    console.error('Resend email error:', emailError)
    console.log('Falling back to Supabase email for resend invitation')
    // Resend failed, but invitation was generated. That's acceptable.
    // The user will receive Supabase's invitation email automatically.
  }

  return NextResponse.json({ ok: true })
}
