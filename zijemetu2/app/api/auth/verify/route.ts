import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

    const { data, error } = await supabase.from('email_verifications').select('user_id,expires_at').eq('token', token).single()
    if (error || !data) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })

    const expiresAt = new Date(data.expires_at)
    if (expiresAt < new Date()) return NextResponse.json({ error: 'Token expired' }, { status: 400 })

    // Označíme uživatele jako ověřeného
    await supabase.from('users').update({ email_verified: true }).eq('id', data.user_id)
    await supabase.from('email_verifications').delete().eq('token', token)

    // Přesměrujeme na jednoduchou stránku (můžete upravit)
    const redirectTo = process.env.NEXT_PUBLIC_BASE_URL || '/'
    return NextResponse.redirect(redirectTo)
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}
