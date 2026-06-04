'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NeonovyBehPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const imageSrc = '/potkejme%20se/neonov%C3%BD%20b%C4%9Bh/704697665_122128735161187626_6089121178362323911_n.jpg'
  const imageAlt = 'Neonový běh'

  return (
    <>
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
            <div className="hero-content">
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', marginBottom: 10 }}>Potkejme se</div>
              <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--white)', marginBottom: 16 }}>Neonový běh</h1>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, maxWidth: 520, lineHeight: 1.8 }}>V pátek 22. května jsme si zaběhaly pro dobrou věc a zúčastnily jsme se Neon běhu s úsměvem.</p>
            </div>
            <img
              src="/LOGO_kulate.png"
              alt="Žijeme TU! logo"
              className="hero-logo"
            />
          </div>
        </div>
      </div>

      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <article style={{ width: '100%', maxWidth: '100%', margin: 0, border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--white)', boxShadow: '0 18px 55px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '24px 24px 18px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 10 }}>Neonový běh</div>
              <h2 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 32, fontWeight: 700, margin: '0 0 18px' }}>Neonový běh</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', margin: '0 0 16px', whiteSpace: 'pre-wrap' }}>✨ V pátek jsme si zaběhaly pro dobrou věc a zúčastnily jsme se Neon běhu s úsměvem – charitativního běhu na podporu Zdravotních klaunů 💛 Byla to krásná akce plná energie, radosti a skvělé nálady 💫
Jsme moc rády, že jsme mohly být součástí a děkujeme za úžasnou atmosféru💕</p>
              <Link href="/potkejme-se" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', background: 'var(--black)', color: 'var(--white)', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                Zpět na Potkejme se
              </Link>
            </div>
            <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
              <button type="button" onClick={() => setLightboxOpen(true)} style={{ border: 'none', background: 'transparent', padding: 0, width: '100%', cursor: 'pointer' }}>
                <img src={imageSrc} alt={imageAlt} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 12, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.24))', color: 'var(--white)', fontSize: 11, fontWeight: 600 }}>
                  Klikněte pro zvětšení
                </div>
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
