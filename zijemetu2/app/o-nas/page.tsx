import { supabase, Candidate } from '../lib/supabase'

async function getCandidates(): Promise<Candidate[]> {
  const { data } = await supabase.from('candidates').select('*').order('order_num', { ascending: true })
  return data || []
}

export default async function ONasPage() {
  const candidates = await getCandidates()
  return (
    <>
      
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
          <div className="hero-content">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', marginBottom: 10 }}>Poznejte nás</div>
            <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--white)', marginBottom: 16, lineHeight: 1, letterSpacing: '-0.02em' }}>Kandidátka</h1>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, maxWidth: 520, lineHeight: 1.8 }}>Jsme ženy ze Strážnice, kterým záleží na tom, aby zde bylo příjemné pro všechny generace.</p>
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
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 10 }}>Kandidátky</div>
            <h2 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 40, fontWeight: 600 }}>Náš tým žen</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
            {candidates.map(c => (
              <div key={c.id} style={{ border: '1px solid var(--border)', background: 'var(--white)' }}>
                <div style={{ height: 100, background: 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)', position: 'relative' }}>
                  {c.photo_url ? (
                    <img src={c.photo_url} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'var(--white)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--black)', color: 'var(--white)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
                    {c.order_num}
                  </div>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 3 }}>{c.name}</h3>
                  {c.role && <p style={{ fontSize: 10, color: 'var(--gray)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{c.role}</p>}
                  {c.bio && <p style={{ fontSize: 13, color: 'var(--gray-dark)', lineHeight: 1.65 }}>{c.bio}</p>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'grid', gap: 20 }}>
              <article style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/dMJtWS_vYrM?rel=0&modestbranding=1`}
                    title="dMJtWS_vYrM"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  />
                </div>
              </article>
              <article style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/_inA8JY0Vr8?rel=0&modestbranding=1`}
                    title="_inA8JY0Vr8"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
