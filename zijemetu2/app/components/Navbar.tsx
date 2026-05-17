'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth-context'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
        width: '100%',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 64,
          width: '100%',
          paddingLeft: '20px',
          paddingRight: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Logo - vlevo s omezenou šířkou */}
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '200px', flexShrink: 0 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
              <img src="/logo.jpg" alt="Žijeme TU!"
                style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
                color: 'black', whiteSpace: 'nowrap', letterSpacing: '-0.01em',
              }}>
                Žijeme <span style={{ textTransform: 'uppercase' }}>TU!</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav - střed, skryté na mobilu */}
          <div className="nav-desktop hidden md:flex" style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {[['/', 'O nás'], ['/facebook', 'Volební program'], ['/projekty', 'Projekty'], ['/o-nas', 'Kandidátka'], ['/potkejme-se', 'Potkejme se'], ['/kontakt', 'Kontakt']].map(([href, label]) => (
              <Link key={href} href={href} style={{
                fontSize: 14, fontWeight: 700, color: 'black',
                letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
              }}>{label}</Link>
            ))}
          </div>

          {/* Auth - vpravo, skryté na mobilu */}
          <div className="nav-desktop hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {user ? (
              <>
                {(user.role === 'admin' || user.role === 'team') && (
                  <Link href="/admin" style={{ fontSize: 12, color: 'gray', letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none' }}>Admin</Link>
                )}
                <span style={{ fontSize: 12, color: 'gray' }}>{user.email.split('@')[0]}</span>
                <button onClick={logout} style={{ fontSize: 12, padding: '6px 14px', border: '1px solid black', borderRadius: 'var(--radius)', background: 'transparent', color: 'black', cursor: 'pointer' }}>
                  Odhlásit
                </button>
              </>
            ) : (
              <button onClick={() => setAuthOpen(true)} style={{
                fontSize: 12, padding: '8px 20px', background: 'transparent',
                color: 'black', border: '1px solid black', borderRadius: 'var(--radius)',
                fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              }}>Přihlásit</button>
            )}
          </div>

          {/* Mobile: pouze logo a černé 3 čárky */}
          <div className="nav-mobile flex md:hidden" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="24" height="24" fill="none" stroke="black" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu - černý sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="md:hidden" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            className="md:hidden" 
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '300px',
              height: '100vh',
              background: 'black',
              zIndex: 999,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <div style={{ padding: '24px 20px' }}>
              {/* Logo v sidebaru */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 16, borderBottom: '2px solid rgba(255,255,255,0.4)' }}>
                <img src="/logo.jpg" alt="Žijeme TU!"
                  style={{ height: 40, width: 40, objectFit: 'contain', borderRadius: '50%' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
                  color: 'white', whiteSpace: 'nowrap', letterSpacing: '-0.01em',
                }}>
                  Žijeme <span style={{ textTransform: 'uppercase' }}>TU!</span>
                </span>
              </div>
              
              {/* Odkazy v sidebaru */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
                {[
                  { href: '/', label: 'O nás' },
                  { href: '/facebook', label: 'Volební program' },
                  { href: '/projekty', label: 'Projekty' },
                  { href: '/o-nas', label: 'Kandidátka' },
                  { href: '/potkejme-se', label: 'Potkejme se' },
                  { href: '/kontakt', label: 'Kontakt' },
                ].map(({ href, label }) => (
                  <Link 
                    key={href} 
                    href={href}
                    style={{
                      display: 'block',
                      padding: '16px 0',
                      fontSize: 16,
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 500,
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              
              {/* Auth v sidebaru - dole */}
              <div style={{ marginTop: 16, paddingTop: 32 }}>
                {user ? (
                  <>
                    {(user.role === 'admin' || user.role === 'team') && (
                      <Link href="/admin" style={{
                        display: 'block',
                        padding: '16px 0',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        marginBottom: 8,
                      }}>Admin</Link>
                    )}
                    <span style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>{user.email.split('@')[0]}</span>
                    <button onClick={logout} style={{
                      width: '100%',
                      padding: '12px 20px',
                      border: '1px solid white',
                      borderRadius: 'var(--radius)',
                      background: 'transparent',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 14,
                    }}>Odhlásit</button>
                  </>
                ) : (
                  <button onClick={() => setAuthOpen(true)} style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}>Přihlásit</button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      
      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}