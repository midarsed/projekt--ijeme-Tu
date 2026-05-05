import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Vyplňte email a heslo.' }, { status: 400 })
  if (password.length < 6) return NextResponse.json({ error: 'Heslo musí mít alespoň 6 znaků.' }, { status: 400 })
  const { data: existing } = await supabase.from('users').select('id').eq('email', email.toLowerCase()).single()
  if (existing) return NextResponse.json({ error: 'Tento email je již registrován.' }, { status: 409 })
  const password_hash = await bcrypt.hash(password, 10)
  const { data: user, error } = await supabase.from('users').insert({ email: email.toLowerCase(), password_hash, role: 'user' }).select().single()
  if (error) return NextResponse.json({ error: 'Chyba při registraci.' }, { status: 500 })
  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } })
}
