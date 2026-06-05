import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
  if (!token) return { user: null, error: 'Missing auth token' }

  const { data, error } = await supabase.auth.getUser(token)
  if (error) return { user: null, error: error.message }
  return { user: data.user, error: null }
}

export async function POST(req: NextRequest) {
  try {
    const { project_id } = await req.json()
    if (!project_id) return NextResponse.json({ error: 'Missing project_id' }, { status: 400 })

    const { user, error: authError } = await getUserFromRequest(req)
    if (authError || !user) return NextResponse.json({ error: 'Neplatný uživatel.' }, { status: 401 })
    if (!user.email_confirmed_at) return NextResponse.json({ error: 'Email nebyl ověřen.' }, { status: 403 })

    const userId = String(user.id)

    const { data: existingVote, error: existingError } = await supabase
      .from('votes')
      .select('id')
      .match({ project_id: String(project_id), user_id: userId })
      .maybeSingle()

    if (existingError) return NextResponse.json({ error: String(existingError.message || existingError) }, { status: 500 })

    if (existingVote) {
      const { data, error } = await supabase
        .from('votes')
        .delete()
        .eq('id', String(existingVote.id))
        .select()
      if (error) return NextResponse.json({ error: String(error.message || error) }, { status: 500 })
      return NextResponse.json({ data, removed: true })
    }

    const { data, error } = await supabase
      .from('votes')
      .insert({ project_id: String(project_id), user_id: userId })
      .select()
    if (error) return NextResponse.json({ error: String(error.message || error) }, { status: 500 })

    return NextResponse.json({ data, removed: false })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { project_id } = await req.json()
    if (!project_id) return NextResponse.json({ error: 'Missing project_id' }, { status: 400 })

    const { user, error: authError } = await getUserFromRequest(req)
    if (authError || !user) return NextResponse.json({ error: 'Neplatný uživatel.' }, { status: 401 })

    const userId = String(user.id)
    const { data: existing, error: selectErr } = await supabase.from('votes').select('id').match({ project_id: String(project_id), user_id: userId })
    if (selectErr) return NextResponse.json({ error: String(selectErr.message || selectErr) }, { status: 500 })
    if (!existing || existing.length === 0) return NextResponse.json({ error: 'Vote not found' }, { status: 404 })

    const voteId = existing[0].id
    const { data, error } = await supabase.from('votes').delete().eq('id', voteId).select()
    if (error) return NextResponse.json({ error: String(error.message || error) }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}
