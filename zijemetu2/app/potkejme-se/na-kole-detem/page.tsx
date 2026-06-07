'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function NaKoleDetemPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const imageSrc = '/potkejme%20se/na-kole-detem/717442425_122124867531211094_3724290735527842188_n (1).jpg'
  const imageAlt = 'Na kole dětem'

  return (
    <>
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
            <div className="hero-content">
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', marginBottom: 10 }}>Potkejme se</div>
              <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--white)', marginBottom: 16 }}>Na kole dětem</h1>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, maxWidth: 520, lineHeight: 1.8 }}>Přečtěte si report z naší účasti na charitativní jízdě na podporu nemocných dětí.</p>
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
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 10 }}>Charitativní jízda</div>
              <h2 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 32, fontWeight: 700, margin: '0 0 18px' }}>Na kole dětem</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', margin: '0 0 16px' }}>V pátek 5. června jsme se zúčastnily úžasné charitativní jízdy „Na kole dětem" na trase Strážnice–Hodonín. Je neuvěřitelné, jak velkou věc dokáže vytvořit jeden člověk se skvělou myšlenkou – děkujeme, Josefe Zimovčáku!</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', margin: '0 0 24px' }}>Bylo nám potěšením zapojit se jako zástupkyně našeho sdružení a podpořit tento projekt, který pomáhá nemocným dětem. Ta energie v pelotonu a radost na tvářích byla nakažlivá. Fotka z Hodonína je důkazem, že jsme si to i přes ne příliš příznivé počasí užily!</p>
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

      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 9999, cursor: 'pointer' }}>
          <img src={imageSrc} alt={imageAlt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'auto', borderRadius: 'var(--radius)' }} />
        </div>
      )}
    </>
  )
}
