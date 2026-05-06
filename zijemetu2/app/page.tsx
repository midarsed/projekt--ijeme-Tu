'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--black)', padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>

            {/* Levý sloupec: textová část */}
            <div style={{ flex: 1, minWidth: 280, maxWidth: 520 }}>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 2, marginTop: 0, marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.86)' }}>
                  Sdružení nezávislých kandidátek · Strážnice
                </span>
              </div>

              {/* Nadpis */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 5.5vw, 58px)',
                fontWeight: 700, color: 'var(--white)',
                lineHeight: 1, letterSpacing: '-0.02em',
                marginBottom: 12,
              }}>
                Žijeme <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>TU!</span>
              </h1>

              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.92)', lineHeight: 1.8, marginTop: 0, marginBottom: 20 }}>
                Hlasujte o projektech, které považujete za nejdůležitější pro Strážnici. Váš hlas přímo ovlivňuje naše priority.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 0 }}>
                <Link href="/projekty" style={{ padding: '14px 32px', background: 'var(--white)', color: 'var(--black)', borderRadius: 'var(--radius)', fontWeight: 500, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  Hlasovat o projektech
                </Link>
                <Link href="/o-nas" style={{ padding: '14px 32px', background: 'transparent', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 'var(--radius)', fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  Poznat kandidátky
                </Link>
              </div>
            </div>

            {/* Pravý sloupec: logo */}
            <div style={{ flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="Žijeme TU! logo"
                style={{
                  height: 360,
                  width: 360,
                  objectFit: 'contain',
                  opacity: 1,
                  filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))',
                  transform: 'translateZ(0)',
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 0 }}>
            {[
              { num: '5 300', label: 'obyvatel Strážnice' },
              { num: '9+', label: 'nezávislých kandidátek' },
              { num: '4', label: 'aktivní projekty' },
              { num: '100%', label: 'bez stranické příslušnosti' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '24px 0', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, lineHeight: 1, color: 'var(--black)', marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UVÍTACÍ TEXT */}
      <section style={{ background: 'var(--white)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 24 }}>Vítejte</div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 32, 
              fontWeight: 600, 
              color: 'var(--black)', 
              marginBottom: 32,
              lineHeight: 1.2
            }}>
              Vítáme vás, STRÁŽNIČANY, na našich stránkách ☺️
            </h2>
            <div style={{ 
              fontSize: 17, 
              lineHeight: 1.8, 
              color: 'var(--gray-dark)',
              marginBottom: 32
            }}>
              <p style={{ marginBottom: 20 }}>
                Rády bychom se představily - jsme ženy ze Strážnice, které chtějí otevřeně a férově pracovat pro město - plánovat jeho rozvoj, pečovat o majetek, chránit historii, podporovat sport a zapojit občany do rozhodování.
              </p>
              <p style={{ marginBottom: 20 }}>
                Postupně budeme přidávat obsah, který poskytne náhled naší vize, kterou bychom vám chtěly v letošních komunálních volbách nabídnout.
              </p>
              <p>
                A proč zrovna my, ženy? Protože stejně jako jen žena dokáže z obydlí vytvořit domov, tak věříme že můžeme i my město proměnit ve fungující a vzkvétající celek 🫶.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '88px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 12 }}>Co zde najdete</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600 }}>Vše na jednom místě</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {[
              { icon: '🗳️', title: 'Hlasování o projektech', desc: 'Zaregistrujte se emailem a rozhodněte, které projekty jsou pro naše město nejdůležitější.', href: '/projekty' },
              { icon: '📱', title: 'Aktivity a videa', desc: 'Přehled toho, co děláme. Příspěvky a videa z Facebooku na jednom místě.', href: '/facebook' },
              { icon: '👩‍👩‍👧', title: 'Naše kandidátky', desc: 'Jsme ženy ze Strážnice. Poznáte nás lépe v sekci O nás.', href: '/o-nas' },
              { icon: '✉️', title: 'Kontakt', desc: 'Máte nápad nebo dotaz? Napište nám přímo nebo přes Facebook.', href: '/kontakt' },
            ].map(f => (
              <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '36px 28px', border: '1px solid var(--border)', background: 'var(--white)', height: '100%' }}>
                  <div style={{ fontSize: 28, marginBottom: 18 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.7 }}>{f.desc}</p>
                  <div style={{ marginTop: 24, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--black)', fontWeight: 500 }}>Přejít →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gray-pale)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '72px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, marginBottom: 8 }}>Váš hlas rozhoduje</h2>
            <p style={{ color: 'var(--gray)', fontSize: 15, maxWidth: 420 }}>Zaregistrujte se zdarma a hlasujte pro projekty které považujete za nejdůležitější.</p>
          </div>
          <Link href="/projekty" style={{ padding: '16px 40px', background: 'var(--black)', color: 'var(--white)', borderRadius: 'var(--radius)', fontWeight: 500, fontSize: 13, letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            Hlasovat nyní
          </Link>
        </div>
      </section>
    </>
  )
}