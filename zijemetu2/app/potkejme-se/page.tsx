export default function PotkejmeSePage() {
  return (
    <>
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
          <div className="hero-content">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', marginBottom: 10 }}>Potkejme se</div>
            <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--white)', marginBottom: 16 }}>Potkejme se</h1>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, maxWidth: 520, lineHeight: 1.8 }}>Pokud máte zájem o prezentaci našeho sdružení, neváhejte, rády se s vámi sejdeme.</p>
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
        </div>
      </section>
    </>
  )
}
