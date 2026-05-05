'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth-context'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <nav style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 64,
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', marginLeft: 20 }}>
            <img src="/logo.jpg" alt="Žijeme TU!"
              style={{ height: 60, width: 60, objectFit: 'contain', borderRadius: '50%' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700,
              color: 'var(--black)', whiteSpace: 'nowrap', letterSpacing: '-0.01em',
            }}>
              Žijeme <span style={{ textTransform: 'uppercase' }}>TU!</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
            {[['/', 'Úvod'], ['/projekty', 'Projekty'], ['/facebook', 'Aktivity'], ['/o-nas', 'O nás'], ['/kontakt', 'Kontakt']].map(([href, label]) => (
              <Link key={href} href={href} style={{
                fontSize: 14, fontWeight: 700, color: 'var(--black)',
                letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              }}>{label}</Link>
            ))}
          </div>

          {/* Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <>
                {(user.role === 'admin' || user.role === 'team') && (
                  <Link href="/admin" style={{ fontSize: 12, color: 'var(--gray)', letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none' }}>Admin</Link>
                )}
                <span style={{ fontSize: 12, color: 'var(--gray)' }}>{user.email.split('@')[0]}</span>
                <button onClick={logout} style={{ fontSize: 12, padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'transparent', color: 'var(--gray)', cursor: 'pointer' }}>
                  Odhlásit
                </button>
              </>
            ) : (
              <button onClick={() => setAuthOpen(true)} style={{
                fontSize: 12, padding: '8px 20px', background: 'var(--black)',
                color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)',
                fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              }}>Přihlásit</button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <style>{`
        @media (max-width: 720px) { .nav-links { display: none !important; } }
      `}</style>
    </>
  )
}