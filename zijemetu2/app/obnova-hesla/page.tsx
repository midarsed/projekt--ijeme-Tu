'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        // Supabase should pick up the recovery session from the URL
        await supabase.auth.getSessionFromUrl()
      } catch (err) {
        console.warn('Unable to read Supabase recovery session from URL', err)
      } finally {
        setReady(true)
      }
    }
    prepare()
  }, [])

  const handleSubmit = async () => {
    setError('')
    setMessage('')
    if (!password || password.length < 6) {
      setError('Heslo musí mít alespoň 6 znaků.')
      return
    }
    setLoading(true)
    const { data, error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message || 'Nepodařilo se změnit heslo.')
      return
    }
    setMessage('Heslo bylo úspěšně změněno. Přesměrovávám na přihlášení...')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '72px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
      <div style={{ width: '100%', maxWidth: 400, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 14 }}>Obnova hesla</h1>
        <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Zadejte nové heslo pro svůj účet. Odkaz pro obnovu hesla vám přišel do e-mailu.</p>
        {!ready && <p style={{ color: 'var(--gray)' }}>Připravuji stránku...</p>}
        {ready && (
          <>
            <input
              type="password"
              placeholder="Nové heslo"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '14px 16px', fontSize: 15, borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 16 }}
            />
            {error && <div style={{ marginBottom: 16, color: 'var(--red)', fontSize: 14 }}>{error}</div>}
            {message && <div style={{ marginBottom: 16, color: 'var(--green)', fontSize: 14 }}>{message}</div>}
            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '14px 0', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 14 }}>
              {loading ? 'Ukládám…' : 'Uložit nové heslo'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
