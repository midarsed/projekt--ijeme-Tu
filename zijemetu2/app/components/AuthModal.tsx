'use client'
import { useState } from 'react'
import { useAuth } from '../lib/auth-context'

type Props = { isOpen: boolean; onClose: () => void }

export default function AuthModal({ isOpen, onClose }: Props) {
  const { login, register, forgotPassword } = useAuth()
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [resetLink, setResetLink] = useState('')
  const [verifyLink, setVerifyLink] = useState('')

  if (!isOpen) return null

  const handleSubmit = async () => {
    setError(''); setSuccess(''); setLoading(true)
    if (!email || (mode !== 'reset' && !password)) {
      setError('Vyplň email a heslo.'); setLoading(false); return
    }
    if (mode !== 'reset' && password.length < 6) { setError('Heslo musí mít alespoň 6 znaků.'); setLoading(false); return }

    if (mode === 'reset') {
      const result = await forgotPassword(email)
      setLoading(false)
      setResetLink('')
      if (result.error) { setError(result.error); return }
      setSuccess(result.message || 'Zkontrolujte email pro další instrukce.')
      return
    }

    const fn = mode === 'login' ? login : register
    const result = await fn(email, password)
    setLoading(false)
    if (result.error) { setError(result.error) }
    else {
      const msg = (result as any).message
      if (msg) {
        setSuccess(msg)
        // show verify URL if provided (SMTP not configured)
        if ((result as any).verifyUrl) {
          setVerifyLink((result as any).verifyUrl)
        }
        // keep modal open so user sees instructions
      } else {
        setSuccess('Úspěch!')
        setTimeout(() => { onClose(); setSuccess('') }, 800)
      }
    }
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 4,
        padding: '44px 36px', width: '100%', maxWidth: 400,
        boxShadow: '0 16px 60px rgba(0,0,0,0.25)', border: '1px solid var(--border)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src="/LOGO_kulate.png"
            alt="Žijeme TU! logo"
            style={{
              height: 120,
              width: 120,
              objectFit: 'contain',
              marginBottom: 16,
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 6 }}>
            {mode === 'login' ? 'Přihlásit se' : mode === 'register' ? 'Registrovat se' : 'Obnova hesla'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--gray)' }}>
            {mode === 'login'
              ? 'Pro hlasování je potřeba účet.'
              : mode === 'register'
                ? 'Každý email = 1 hlas.'
                : 'Zadejte svůj email a pošleme vám odkaz pro obnovení hesla.'}
          </p>
        </div>

        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 20 }}>
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); setResetLink('') }} style={{
              flex: 1, padding: '9px 0', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
              border: 'none', fontWeight: 500,
              background: mode === m ? 'var(--black)' : 'transparent',
              color: mode === m ? 'var(--white)' : 'var(--gray)',
            }}>
              {m === 'login' ? 'Přihlásit' : 'Registrovat'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="email" placeholder="Váš email" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={inp} />
          {mode !== 'reset' && (
            <input type="password" placeholder="Heslo (min. 6 znaků)" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inp} />
          )}
        </div>

        {error && <div style={{ marginTop: 14, padding: '10px 14px', fontSize: 13, background: '#fafafa', border: '1px solid #ddd', borderLeft: '3px solid var(--black)', borderRadius: 'var(--radius)' }}>{error}</div>}
        {success && <div style={{ marginTop: 14, padding: '10px 14px', fontSize: 13, background: '#fafafa', border: '1px solid #ddd' }}>{success}</div>}
        {resetLink && (
          <div style={{ marginTop: 12, padding: '12px 14px', fontSize: 13, background: '#fff9e6', border: '1px solid #f2d591', borderRadius: 'var(--radius)' }}>
            <p style={{ margin: 0, marginBottom: 8, fontWeight: 600 }}>Odkaz pro obnovu hesla:</p>
            <a href={resetLink} style={{ color: 'var(--black)', wordBreak: 'break-all' }}>{resetLink}</a>
          </div>
        )}
        {verifyLink && (
          <div style={{ marginTop: 12, padding: '12px 14px', fontSize: 13, background: '#fff9e6', border: '1px solid #f2d591', borderRadius: 'var(--radius)' }}>
            <p style={{ margin: 0, marginBottom: 8, fontWeight: 600 }}>Odkaz pro ověření emailu:</p>
            <a href={verifyLink} style={{ color: 'var(--black)', wordBreak: 'break-all' }}>{verifyLink}</a>
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', marginTop: 20, padding: '13px 0',
          background: loading ? 'var(--border)' : 'var(--black)',
          color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)',
          fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {loading ? 'Načítám…' : mode === 'login' ? 'Přihlásit se' : mode === 'register' ? 'Zaregistrovat se' : 'Odeslat odkaz'}
        </button>
        {mode === 'login' && (
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <button type="button" onClick={() => { setMode('reset'); setError(''); setSuccess('') }} style={{
              background: 'transparent', border: 'none', color: 'var(--black)', textDecoration: 'underline', cursor: 'pointer', fontSize: 12,
            }}>
              Zapomenuté heslo?
            </button>
          </div>
        )}
        {mode === 'reset' && (
          <>
            <p style={{ marginTop: 12, fontSize: 12, color: 'var(--gray)', textAlign: 'center' }}>
              Pokud není SMTP nastavené, odkaz bude viditelný v konzoli serveru.
            </p>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess('') }} style={{
                background: 'transparent', border: 'none', color: 'var(--black)', textDecoration: 'underline', cursor: 'pointer', fontSize: 12,
              }}>
                Zpět k přihlášení
              </button>
            </div>
          </>
        )}
        <button onClick={onClose} style={{ width: '100%', marginTop: 10, padding: '9px 0', background: 'transparent', border: 'none', fontSize: 12, color: 'var(--gray)' }}>Zrušit</button>
      </div>
    </div>
  )
}

const inp: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1px solid var(--border)', borderRadius: 'var(--radius)',
  fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none',
  background: 'var(--gray-pale)', color: 'var(--black)',
}
