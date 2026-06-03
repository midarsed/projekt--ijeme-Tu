import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()
    const cleanedToken = typeof token === 'string' ? token.trim() : ''
    if (!cleanedToken || !password) return NextResponse.json({ error: 'Chybí token nebo heslo.' }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ error: 'Heslo musí mít alespoň 6 znaků.' }, { status: 400 })

    const { data: reset, error } = await supabase.from('password_resets').select('user_id,expires_at').eq('token', cleanedToken).single()
    if (error || !reset) return NextResponse.json({ error: 'Neplatný nebo expirovaný token.' }, { status: 400 })

    if (new Date(reset.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Odkaz pro obnovu hesla vypršel.' }, { status: 400 })
    }

    const password_hash = await bcrypt.hash(password, 10)
    await supabase.from('users').update({ password_hash, email_verified: true }).eq('id', reset.user_id)
    await supabase.from('password_resets').delete().eq('token', token)

    return NextResponse.json({ message: 'Heslo bylo úspěšně změněno.' })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}
