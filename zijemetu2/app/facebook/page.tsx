// Static data pro Facebook příspěvky - strategie a vize uživatele
const staticPosts = [
  {
    id: '1',
    title: 'Jasná vize a strategie',
    description: 'Strategie je o směru a společné vizi, která určuje, kam chceme město posunout.',
    article: 'Strategie je o směru a společné vizi, která určuje, kam chceme město posunout. Nejde jen o seznam úkolů, ale o promyšlený plán budoucnosti. Díky jasné vizi se sny mění v uskutečnitelné kroky a jednotlivá rozhodnutí dávají smysl.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '2', 
    title: 'Hrdost na historii a identitu',
    description: 'Historie tvoří jedinečnost města a je základem pro jeho další rozvoj.',
    article: 'Historie tvoří jedinečnost města a je základem pro jeho další rozvoj. Je důležité být na ni pyšný a aktivně ji propagovat. Lepší prezentace památek a vytvoření turistických tras může přiblížit město návštěvníkům i obyvatelům.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Kvalitní veřejný prostor a hřiště',
    description: 'Investice do hřišť nejsou luxusem, ale investicí do zdraví a budoucnosti.',
    article: 'Investice do hřišť nejsou luxusem, ale investicí do zdraví a budoucnosti. Moderní hřiště mají být funkční, bezpečná a navržená pro různé věkové skupiny. Zároveň slouží jako místo setkávání, pohybu a budování komunity.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Zapojení občanů (participace)',
    description: 'Občané by měli mít možnost podílet se na rozhodování o městě.',
    article: 'Občané by měli mít možnost podílet se na rozhodování o městě. Mohou navrhovat projekty, hlasovat o prioritách a přinášet nové podněty. Otevřená komunikace posiluje důvěru a vede ke kvalitnějším rozhodnutím.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Péče o veřejný majetek',
    description: 'Veřejný majetek patří všem a jeho stav ovlivňuje kvalitu života i vzhled města.',
    article: 'Veřejný majetek patří všem a jeho stav ovlivňuje kvalitu života i vzhled města. Pravidelná údržba a modernizace prodlužují jeho životnost. Důležitý je důraz na udržitelnost, funkčnost a celkovou estetiku prostředí.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Odpovědné vedení a dlouhodobý rozvoj',
    description: 'Město potřebuje osvícené vedení s jasným plánem rozvoje.',
    article: 'Město potřebuje osvícené vedení s jasným plánem rozvoje. Ten vzniká ve spolupráci s občany i odborníky a propojuje jednotlivé projekty. Díky tomu na sebe kroky navazují a vytvářejí dlouhodobě fungující celek.',
    fb_url: 'https://www.facebook.com/profile.php?id=61586332845379',
    thumbnail_url: null,
    created_at: new Date().toISOString()
  }
]

export default async function FacebookPage() {
  const posts = staticPosts
  console.log('Posts in component:', posts.length)
  return (
    <>
      {/* Uvítací sekce s logem */}
      <div style={{ background: 'var(--black)', padding: '72px 0 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, color: 'var(--white)', marginBottom: 14 }}>
              Aktivity a kampaně
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, maxWidth: 520, lineHeight: 1.8 }}>
              Jsme nezávislé kandidátky žen ze Strážnice. Chceme, aby se tu žilo lépe pro všechny generace.
            </p>
            <a href="https://www.facebook.com/profile.php?id=61586332845379" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, padding: '12px 24px', background: 'var(--white)', color: 'var(--black)', border: 'none', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Sledujte nás na Facebooku →
            </a>
          </div>
          <img
            src="/logo.png"
            alt="Žijeme TU! logo"
            style={{ height: 360, width: 360, objectFit: 'contain', marginLeft: 'auto', filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))' }}
          />
        </div>
      </div>

      {/* Aktivity a příspěvky s logem */}
      <div style={{ padding: '56px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 80, height: 80, flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Žijeme TU! logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(1.1) contrast(1.05)' }}
            />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, marginBottom: 12 }}>Aktivity a kampaně</h1>
            <p style={{ color: 'var(--gray-dark)', fontSize: 15, fontWeight: 500, maxWidth: 500, lineHeight: 1.7 }}>Klikněte na aktivitu pro více informací.</p>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px' }}>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>Zatím žádné příspěvky.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
            {posts.map(post => (
              <div key={post.id} style={{ border: '1px solid var(--border)', background: 'var(--white)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{post.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-dark)', lineHeight: 1.7, marginBottom: 16 }}>{post.description}</p>
                  <details style={{ cursor: 'pointer' }}>
                    <summary style={{ fontSize: 13, color: 'var(--black)', fontWeight: 500, padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ display: 'inline-block', width: 20, height: 20, background: 'var(--black)', color: 'var(--white)', borderRadius: '50%', textAlign: 'center', lineHeight: '20px', fontSize: 12 }}>+</span>
                      Více informací
                    </summary>
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                      <p style={{ fontSize: 14, color: 'var(--black-soft)', lineHeight: 1.7, marginBottom: 16 }}>{post.article}</p>
                      <a href={post.fb_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none' }}>
                        Zobrazit na Facebooku →
                      </a>
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}