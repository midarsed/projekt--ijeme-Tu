import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Vyplňte email a heslo.' }, { status: 400 })
  const { data: user, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).single()
  if (error || !user) return NextResponse.json({ error: 'Nesprávný email nebo heslo.' }, { status: 401 })
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return NextResponse.json({ error: 'Nesprávný email nebo heslo.' }, { status: 401 })
  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role, verified: !!user.email_verified } })
}
