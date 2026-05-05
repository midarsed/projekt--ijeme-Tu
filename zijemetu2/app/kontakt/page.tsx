'use client'
import { useState } from 'react'

const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--gray-pale)', color: 'var(--black)' }
const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6, color: 'var(--black)' }

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <>
      {/* Černý vršek */}
      <div style={{ 
        background: 'var(--black)', 
        padding: '72px 0 48px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.88)', marginBottom: 10 }}>Kontakt</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 44,
              fontWeight: 600,
              marginBottom: 12,
              color: 'var(--white)',
            }}>Napište nám</h1>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 15,
              fontWeight: 500
            }}>Máte dotaz, nápad nebo chcete spolupracovat?</p>
          </div>
          <img
            src="/logo.png"
            alt="Žijeme TU! logo"
            style={{ height: 360, width: 360, objectFit: 'contain', marginLeft: 'auto', filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <div style={{ padding: '56px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '56px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, maxWidth: 900, margin: '0 auto' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 32 }}>Kontaktní údaje</h2>
            {[
              { icon: '✉️', label: 'Email', value: 'zijemetu@email.cz', href: 'mailto:zijemetu@email.cz' },
              { icon: '📍', label: 'Město', value: 'Strážnice, okres Hodonín', href: undefined },
              { icon: '📘', label: 'Facebook', value: 'Žijeme tu! – Strážnice', href: 'https://www.facebook.com/profile.php?id=61586332845379' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 20, flexShrink: 0, width: 28, paddingTop: 2 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: 15, color: 'var(--black)', fontWeight: 500, textDecoration: 'underline' }}>{c.value}</a>
                  ) : (
                    <div style={{ fontSize: 15 }}>{c.value}</div>
                  )}
                </div>
              </div>
            ))}
            <a href="https://www.facebook.com/profile.php?id=61586332845379" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '12px 22px', border: '1px solid var(--black)', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--black)' }}>
              Napsat na Facebooku →
            </a>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 32 }}>Kontaktní formulář</h2>
            {status === 'sent' ? (
              <div style={{ padding: '36px', border: '1px solid var(--border)', borderLeft: '3px solid var(--black)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>Odesláno!</h3>
                <p style={{ color: 'var(--gray)', fontSize: 14 }}>Odpovíme vám co nejdříve.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={lbl}>Vaše jméno</label>
                  <input type="text" placeholder="Jana Nováková" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Váš email</label>
                  <input type="email" placeholder="jana@email.cz" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Zpráva</label>
                  <textarea placeholder="Váš dotaz nebo nápad…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} style={{ ...inp, resize: 'vertical' }} />
                </div>
                <button onClick={handleSubmit} disabled={status === 'sending'} style={{ padding: '13px 0', background: status === 'sending' ? 'var(--border)' : 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {status === 'sending' ? 'Odesílám…' : 'Odeslat zprávu'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}