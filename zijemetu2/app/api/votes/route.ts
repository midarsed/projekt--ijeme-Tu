import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { project_id, user_id, transfer } = await req.json()
    if (!project_id || !user_id) return NextResponse.json({ error: 'Missing project_id or user_id' }, { status: 400 })

    // Zkontrolujeme, jestli už uživatel někam nehlasoval (omezení 1 hlas na uživatele)
    const { data: existingByUser, error: userCheckErr } = await supabase.from('votes').select('project_id').eq('user_id', String(user_id))
    if (userCheckErr) return NextResponse.json({ error: String(userCheckErr.message || userCheckErr) }, { status: 500 })
    if (existingByUser && existingByUser.length > 0) {
      // Pokud hlasuje pro stejný projekt, ignorujeme (idempotentní)
      if (existingByUser.some((v: any) => String(v.project_id) === String(project_id))) {
        return NextResponse.json({ data: [], message: 'Already voted for this project' })
      }

      // Pokud klient žádá převod hlasu, smažeme starý a vložíme nový
      if (transfer) {
        // Smažeme všechny hlasy tohoto uživatele (bez ohledu na project_id)
        const { data: deleted, error: delErr } = await supabase.from('votes').delete().eq('user_id', String(user_id)).select()
        if (delErr) return NextResponse.json({ error: String(delErr.message || delErr) }, { status: 500 })

        const { data, error } = await supabase.from('votes').insert({ project_id: String(project_id), user_id: String(user_id) }).select()
        if (error) return NextResponse.json({ error: String(error.message || error) }, { status: 500 })
        return NextResponse.json({ data, transferred: true, deleted })
      }

      return NextResponse.json({ error: 'User already voted for another project' }, { status: 409 })
    }

    const { data, error } = await supabase.from('votes').insert({ project_id: String(project_id), user_id: String(user_id) }).select()
    if (error) return NextResponse.json({ error: String(error.message || error) }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { project_id, user_id } = await req.json()
    if (!project_id || !user_id) return NextResponse.json({ error: 'Missing project_id or user_id' }, { status: 400 })

    const { data: existing, error: selectErr } = await supabase.from('votes').select('id').match({ project_id: String(project_id), user_id: String(user_id) })
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
