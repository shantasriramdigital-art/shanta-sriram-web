import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || !body.email || !body.action) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service configuration error' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Check if user exists
  const { data: userData, error: userError } = await admin.auth.admin.listUsers()
  const user = userData?.users?.find(u => u.email === body.email)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (body.action === 'send-link') {
    // Send password reset link via email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: 'recovery',
      email: body.email,
      redirectTo: `${siteUrl}/admin/login`,
    })

    if (linkError) {
      console.error('Link generation error:', linkError)
      return NextResponse.json({ error: 'Failed to generate reset link' }, { status: 500 })
    }

    // Send email with reset link
    const resetLink = linkData?.properties?.action_link
    if (!resetLink) {
      return NextResponse.json({ error: 'Failed to generate reset link' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: emailError } = await resend.emails.send({
      from: 'Shanta Sriram CRM <noreply@shantasriram.com>',
      to: body.email,
      subject: 'Reset Your Shanta Sriram CRM Password',
      html: `
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F4EF; padding: 20px;">
            <div style="max-width: 560px; margin: 0 auto; background: white; border: 1px solid #E8ECF0; border-radius: 6px; padding: 28px;">
              <h1 style="color: #1A1A2E; font-size: 22px; margin: 0 0 8px 0;">Reset Your Password</h1>
              <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 16px 0;">You requested to reset your password for the Shanta Sriram CRM.</p>
              <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 24px 0;">Click the button below to set a new password:</p>
              <div style="text-align: center; margin: 24px 0;">
                <a href="${resetLink}" style="display: inline-block; background: #CD0E12; color: white; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 500;">Reset Password</a>
              </div>
              <p style="color: #6B6B6B; font-size: 12px; margin: 0;">This link expires in 24 hours.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('Email send error:', emailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Reset link sent to email' })
  }

  if (body.action === 'direct-reset') {
    // Direct password reset
    if (!body.newPassword) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (body.newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      password: body.newPassword,
    })

    if (updateError) {
      console.error('Password update error:', updateError)
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Password updated successfully' })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
