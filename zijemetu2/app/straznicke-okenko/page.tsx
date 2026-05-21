const videos = [
  { id: 'FsbfXjVP45s', title: 'Cesta na tenis s Jožinem' },
  { id: 'toSduZgn6Ao', title: 'otvírajte sa strážnické brány!' },
  { id: '_LgKHxR3gW0', title: 'Psychedelická čekárna' },
]

export default function StraznickeOkenkoPage() {
  return (
    <div>
      <section style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-container">
            <div className="hero-content" style={{ flex: 1, minWidth: 280, maxWidth: 520, order: 1 }}>
              <h1 style={{
                fontFamily: 'Segoe UI Semibold, var(--font-display)',
                fontSize: 44,
                fontWeight: 600,
                color: 'var(--white)',
                marginBottom: 14,
              }}>
                Strážnické okénko
              </h1>
              <a
                href="https://www.youtube.com/@%C5%BDijemeTU"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 24,
                  padding: '12px 24px',
                  background: 'var(--white)',
                  color: 'var(--black)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Sledujte náš YouTube →
              </a>
            </div>
            <div style={{ flexShrink: 0, order: 2 }}>
              <img
                src="/LOGO_kulate.png"
                alt="Žijeme TU! logo"
                className="hero-logo"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--white)', padding: '60px 0 96px' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: 32 }}>
            {videos.map((video, index) => (
              <article key={video.id} style={{ padding: 0, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 18px 50px rgba(17,17,17,0.05)', border: '1px solid var(--border)' }}>
                <div style={{ padding: '28px 30px', background: 'var(--white)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, margin: 0, color: 'var(--black)' }}>
                    {video.title}
                  </h2>
                  <p style={{ margin: '16px 0 0', color: 'var(--gray)', fontSize: 15, lineHeight: 1.7 }}>
                    Přehrajte video přímo zde kliknutím do přehrávače.
                  </p>
                </div>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
