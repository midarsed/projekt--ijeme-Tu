import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function sendVerificationEmail(to: string, url: string) {
  // If SMTP is configured, send email; otherwise log the URL
  const host = process.env.SMTP_HOST
  if (!host) {
    console.log('Verification URL (no SMTP configured):', url)
    return { sent: false, url }
  }
  try {
    // @ts-ignore - optional dependency loaded only when SMTP configured
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
      subject: 'Ověřte svůj email — Žijeme TU!',
      text: `Klikněte na odkaz pro ověření: ${url}`,
      html: `<p>Klikněte na odkaz pro ověření emailu:</p><p><a href="${url}">${url}</a></p>`
    })
    return { sent: true }
  } catch (e) {
    console.log('Verification URL (failed to send email):', url, e)
    return { sent: false, url, error: String(e) }
  }
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Vyplňte email a heslo.' }, { status: 400 })
  if (password.length < 6) return NextResponse.json({ error: 'Heslo musí mít alespoň 6 znaků.' }, { status: 400 })

  const { data: existing, error: existingErr } = await supabase.from('users').select('id').eq('email', email.toLowerCase()).maybeSingle()
  if (existingErr) console.warn('Existing user check warning:', existingErr)
  if (existing) return NextResponse.json({ error: 'Tento email je již registrován.' }, { status: 409 })

  const password_hash = await bcrypt.hash(password, 10)
  const { data: user, error } = await supabase.from('users').insert({ email: email.toLowerCase(), password_hash, role: 'user', email_verified: false }).select().single()
  if (error || !user) {
    const msg = error?.message || 'Chyba při registraci.'
    console.error('Register error:', error)
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Chyba při registraci.' }, { status: 500 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // Vytvoříme token pro ověření
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
  await supabase.from('email_verifications').insert({ user_id: user.id, token, expires_at: expiresAt })

  const base = process.env.NEXT_PUBLIC_BASE_URL || ''
  const verifyUrl = `${base}/api/auth/verify?token=${encodeURIComponent(token)}`
  try {
    const emailResult = await sendVerificationEmail(user.email, verifyUrl)
    if (emailResult && !emailResult.sent) {
      // include verify URL in response in development or when SMTP not configured
      return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role, verified: false }, message: 'Registrováno. Zkontrolujte email pro ověření.', verifyUrl: emailResult.url })
    }
  } catch (e) {
    console.error('Error sending verification email:', e)
  }
  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role, verified: false }, message: 'Registrováno. Zkontrolujte email pro ověření.' })
}
