import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function sendPasswordResetEmail(to: string, url: string) {
  const host = process.env.SMTP_HOST
  if (!host) {
    console.log('Password reset URL (no SMTP configured):', url)
    return { sent: false, url }
  }

  try {
    // @ts-ignore
    const nodemailer: any = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: !!process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    })

    await transporter.sendMail({
      to,
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      subject: 'Obnova hesla — Žijeme TU!',
      text: `Klikněte na odkaz pro obnovu hesla: ${url}`,
      html: `<p>Klikněte na odkaz pro obnovu hesla:</p><p><a href="${url}">${url}</a></p>`
    })
    return { sent: true }
  } catch (err) {
    console.log('Password reset URL (failed to send email):', url, err)
    return { sent: false, url, error: String(err) }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Vyplňte email.' }, { status: 400 })

    const { data: user, error } = await supabase.from('users').select('id,email').eq('email', email.toLowerCase()).single()
    if (error || !user) {
      return NextResponse.json({ message: 'Pokud je tento email v systému, bude vám zaslán odkaz pro obnovu hesla.' })
    }

    const token = crypto.randomUUID().replace(/-/g, '')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const { error: insertError } = await supabase.from('password_resets').insert({ user_id: user.id, token, expires_at: expiresAt })
    if (insertError) {
      console.error('Password reset insert failed:', insertError)
      return NextResponse.json({ error: 'Nepodařilo se vytvořit reset token. Zkuste to znovu.' }, { status: 500 })
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const resetUrl = `${base}/reset-password/${token}`
    const emailResult = await sendPasswordResetEmail(user.email, resetUrl)

    return NextResponse.json({
      message: 'Pokud je tento email v systému, bude vám zaslán odkaz pro obnovu hesla.',
      resetUrl: emailResult?.sent ? undefined : emailResult?.url,
    })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}
