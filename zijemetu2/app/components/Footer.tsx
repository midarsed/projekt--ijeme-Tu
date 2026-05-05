'use client'
import Link from 'next/link'

const FB_URL = 'https://www.facebook.com/profile.php?id=61586332845379'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--white)', padding: '52px 0 28px', marginTop: 96 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="Žijeme TU!"
                style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: '50%' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap' }}>
                Žijeme <span style={{ textTransform: 'uppercase', color: 'var(--white)' }}>TU!</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#777', lineHeight: 1.8 }}>Sdružení nezávislých kandidátek.<br />Strážnice, okres Hodonín.</p>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Navigace</div>
            {[['/', 'Úvod'], ['/projekty', 'Projekty'], ['/facebook', 'Aktivity'], ['/o-nas', 'O nás'], ['/kontakt', 'Kontakt']].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: '#888', marginBottom: 8, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Kontakt</div>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 10 }}>zijemetu@email.cz</p>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#aaa', border: '1px solid #333', padding: '8px 14px', borderRadius: 'var(--radius)', textDecoration: 'none' }}>
              Facebook →
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 12, color: '#444' }}>© {new Date().getFullYear()} Žijeme TU! – Sdružení nezávislých kandidátek Strážnice</p>
          <p style={{ fontSize: 12, color: '#444' }}>Každý hlas se počítá.</p>
        </div>
      </div>
    </footer>
  )
}