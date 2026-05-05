'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth-context'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<'projekty' | 'fb' | 'komentare'>('projekty')
  const [proj, setProj] = useState({ title: '', description: '', cost: '', category: '', voting_ends_at: '' })
  const [projMsg, setProjMsg] = useState('')
  const [fb, setFb] = useState({ title: '', description: '', fb_url: '', thumbnail_url: '' })
  const [fbMsg, setFbMsg] = useState('')
  const [pending, setPending] = useState<any[]>([])

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'team')) { router.push('/'); return }
    if (tab === 'komentare') loadComments()
  }, [user, tab])

  async function loadComments() {
    const { data } = await supabase.from('comments').select('*, users(email), projects(title)').eq('is_approved', false).order('created_at', { ascending: false })
    setPending(data || [])
  }

  async function addProject() {
    if (!proj.title || !proj.description) { setProjMsg('Vyplňte název a popis.'); return }
    const { error } = await supabase.from('projects').insert({ ...proj, created_by: user!.id, voting_ends_at: proj.voting_ends_at ? new Date(proj.voting_ends_at).toISOString() : null })
    if (error) { setProjMsg('Chyba: ' + error.message); return }
    setProjMsg('✅ Projekt přidán!')
    setProj({ title: '', description: '', cost: '', category: '', voting_ends_at: '' })
    setTimeout(() => setProjMsg(''), 3000)
  }

  async function addFbPost() {
    if (!fb.title || !fb.description || !fb.fb_url) { setFbMsg('Vyplňte název, popis a odkaz.'); return }
    const { error } = await supabase.from('fb_posts').insert({ ...fb, created_by: user!.id })
    if (error) { setFbMsg('Chyba: ' + error.message); return }
    setFbMsg('✅ Příspěvek přidán!')
    setFb({ title: '', description: '', fb_url: '', thumbnail_url: '' })
    setTimeout(() => setFbMsg(''), 3000)
  }

  if (!user || (user.role !== 'admin' && user.role !== 'team')) return null

  return (
    <>
      <div style={{ background: 'var(--black)', padding: '36px 0 28px' }}>
        <div className="container">
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Správa webu</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--white)', marginBottom: 4 }}>Administrace</h1>
          <p style={{ color: '#666', fontSize: 13 }}>Přihlášen jako: {user.email}</p>
        </div>
      </div>
      <div className="container" style={{ padding: '36px 24px' }}>
        <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid var(--border)' }}>
          {(['projekty', 'fb', 'komentare'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', border: 'none', background: 'none', borderBottom: tab === t ? '2px solid var(--black)' : '2px solid transparent', color: tab === t ? 'var(--black)' : 'var(--gray)', fontWeight: tab === t ? 500 : 400, fontSize: 13, cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t === 'projekty' ? 'Přidat projekt' : t === 'fb' ? 'Přidat příspěvek' : `Komentáře (${pending.length})`}
            </button>
          ))}
        </div>

        {tab === 'projekty' && (
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 28 }}>Nový projekt</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Název projektu *" value={proj.title} onChange={e => setProj(p => ({ ...p, title: e.target.value }))} style={inp} />
              <textarea placeholder="Popis projektu *" value={proj.description} rows={4} onChange={e => setProj(p => ({ ...p, description: e.target.value }))} style={{ ...inp, resize: 'vertical' }} />
              <input placeholder="Odhadovaná cena (např. 2,5 mil. Kč)" value={proj.cost} onChange={e => setProj(p => ({ ...p, cost: e.target.value }))} style={inp} />
              <input placeholder="Kategorie (např. Infrastruktura)" value={proj.category} onChange={e => setProj(p => ({ ...p, category: e.target.value }))} style={inp} />
              <div>
                <label style={{ fontSize: 11, color: 'var(--gray)', display: 'block', marginBottom: 4, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Hlasování do (datum)</label>
                <input type="date" value={proj.voting_ends_at} onChange={e => setProj(p => ({ ...p, voting_ends_at: e.target.value }))} style={inp} />
              </div>
              {projMsg && <p style={{ fontSize: 13, borderLeft: '2px solid var(--black)', paddingLeft: 10 }}>{projMsg}</p>}
              <button onClick={addProject} style={btn}>Přidat projekt</button>
            </div>
          </div>
        )}

        {tab === 'fb' && (
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 28 }}>Nový Facebook příspěvek</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Název příspěvku *" value={fb.title} onChange={e => setFb(f => ({ ...f, title: e.target.value }))} style={inp} />
              <textarea placeholder="Popis příspěvku *" value={fb.description} rows={3} onChange={e => setFb(f => ({ ...f, description: e.target.value }))} style={{ ...inp, resize: 'vertical' }} />
              <input placeholder="Odkaz na Facebook příspěvek nebo video *" value={fb.fb_url} onChange={e => setFb(f => ({ ...f, fb_url: e.target.value }))} style={inp} />
              <input placeholder="URL náhledového obrázku (volitelné)" value={fb.thumbnail_url} onChange={e => setFb(f => ({ ...f, thumbnail_url: e.target.value }))} style={inp} />
              {fbMsg && <p style={{ fontSize: 13, borderLeft: '2px solid var(--black)', paddingLeft: 10 }}>{fbMsg}</p>}
              <button onClick={addFbPost} style={btn}>Přidat příspěvek</button>
            </div>
          </div>
        )}

        {tab === 'komentare' && (
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 28 }}>Komentáře ke schválení</h2>
            {pending.length === 0 ? <p style={{ color: 'var(--gray)', fontSize: 14 }}>Žádné komentáře nečekají.</p> : pending.map(c => (
              <div key={c.id} style={{ border: '1px solid var(--border)', padding: '20px 22px', marginBottom: 12, background: 'var(--gray-pale)' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 11, color: 'var(--gray)' }}>
                  <span style={{ fontWeight: 500, color: 'var(--black)' }}>{c.users?.email}</span>
                  <span>·</span><span>Projekt: {c.projects?.title}</span>
                  <span>·</span><span>{new Date(c.created_at).toLocaleDateString('cs-CZ')}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{c.content}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={async () => { await supabase.from('comments').update({ is_approved: true }).eq('id', c.id); setPending(p => p.filter(x => x.id !== c.id)) }}
                    style={{ padding: '8px 18px', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Schválit</button>
                  <button onClick={async () => { await supabase.from('comments').delete().eq('id', c.id); setPending(p => p.filter(x => x.id !== c.id)) }}
                    style={{ padding: '8px 18px', background: 'transparent', color: 'var(--gray)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Smazat</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--white)', color: 'var(--black)' }
const btn: React.CSSProperties = { padding: '13px 0', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }
