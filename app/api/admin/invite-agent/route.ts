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
  if (!body || !body.email || !body.full_name || !body.role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  if (!['admin', 'manager', 'sales', 'viewer'].includes(body.role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Create user without sending email (avoids Supabase rate limit)
  const { data: userData, error: createError } = await admin.auth.admin.createUser({
    email: body.email,
    password: Math.random().toString(36).slice(-20), // Temporary password
    user_metadata: { full_name: body.full_name },
    email_confirm: false,
  })
  if (createError || !userData?.user) {
    return NextResponse.json({ error: createError?.message ?? 'User creation failed' }, { status: 400 })
  }

  // Generate magic link for password setup
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: 'signup',
    email: body.email,
  })
  if (linkError) {
    console.error('Magic link generation error:', linkError)
  }
  const magicLink = linkData?.properties?.action_link

  const { error: agentError } = await admin.from('agents').upsert({
    id: userData.user.id,
    email: body.email,
    full_name: body.full_name,
    phone: body.phone ?? null,
    role: body.role,
    is_active: true,
  })
  if (agentError) {
    return NextResponse.json({ error: agentError.message }, { status: 500 })
  }

  // Send custom-branded invitation email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY)
  const inviteLink = magicLink || `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login?email=${encodeURIComponent(body.email)}`

  try {
    console.log('Attempting to send invitation email via Resend...')
    console.log('To:', body.email)
    console.log('Subject: Join Shanta Sriram CRM - Set Your Password')
    console.log('Invite Link:', inviteLink)
    console.log('Inviter:', agent.full_name)

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Shanta Sriram CRM <onboarding@resend.dev>',
      to: body.email,
      subject: `Join Shanta Sriram CRM - Set Your Password`,
      react: AgentInvite({
        agentName: body.full_name,
        inviteLink,
        invitedBy: agent.full_name,
      }),
    })

    if (emailError) {
      console.error('❌ Resend email error:', emailError)
      return NextResponse.json({
        ok: true,
        user_id: userData.user.id,
        email_sent: false,
        email_error: emailError.message
      }, { status: 207 })
    }

    console.log('✅ Email sent via Resend:', emailData?.id)
    return NextResponse.json({
      ok: true,
      user_id: userData.user.id,
      email_sent: true,
      email_id: emailData?.id
    })
  } catch (err) {
    console.error('❌ Exception sending email:', err)
    return NextResponse.json({
      ok: true,
      user_id: userData.user.id,
      email_sent: false,
      email_error: String(err)
    }, { status: 207 })
  }
}
