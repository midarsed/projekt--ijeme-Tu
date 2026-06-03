'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string
  const [manualToken, setManualToken] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const effectiveToken = (token || manualToken).trim()

  const handleSubmit = async () => {
    setError('')
    setMessage('')
    if (!effectiveToken) { setError('Neplatný nebo chybějící reset token.'); return }
    if (!password || password.length < 6) { setError('Heslo musí mít alespoň 6 znaků.'); return }
    setLoading(true)
    const res = await fetch('/api/auth/reset/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: effectiveToken, password })
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.error || 'Nepodařilo se změnit heslo.')
    } else {
      setMessage(data.message || 'Heslo bylo úspěšně změněno. Přihlaste se novým heslem.')
      setPassword('')
      setTimeout(() => router.push('/'), 2000)
    }
  }

  return (
    <div style={{ padding: '72px 24px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Obnova hesla</h1>
        <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Zadejte nové heslo pro svůj účet.</p>
        {!token && (
          <input
            type="text"
            placeholder="Token pro obnovu hesla"
            value={manualToken}
            onChange={e => setManualToken(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', fontSize: 15, borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 16 }}
          />
        )}
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
          {loading ? 'Odesílám…' : 'Změnit heslo'}
        </button>
      </div>
    </div>
  )
}
