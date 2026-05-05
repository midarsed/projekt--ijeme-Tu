import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { filterComment } from '../../lib/filter'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  const { projectId, content, userId } = await req.json()
  if (!projectId || !content || !userId) return NextResponse.json({ error: 'Chybí povinné údaje.' }, { status: 400 })
  const check = filterComment(content)
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 })
  const { data, error } = await supabase.from('comments').insert({ project_id: projectId, user_id: userId, content: content.trim(), is_approved: true }).select().single()
  if (error) return NextResponse.json({ error: 'Chyba při ukládání.' }, { status: 500 })
  return NextResponse.json({ comment: data })
}
