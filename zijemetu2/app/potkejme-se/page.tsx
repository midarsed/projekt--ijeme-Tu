'use client'
import { useState } from 'react'
import Link from 'next/link'

const posts = [
  {
    id: 'neonovy-beh',
    category: 'Potkejme se',
    title: 'Neonový běh',
    excerpt: 'V pátek 22. května jsme si zaběhaly pro dobrou věc a zúčastnily jsme se Neon běhu s úsměvem.',
    text: '✨ V pátek jsme si zaběhaly pro dobrou věc a zúčastnily jsme se Neon běhu s úsměvem – charitativního běhu na podporu Zdravotních klaunů 💛 Byla to krásná akce plná energie, radosti a skvělé nálady 💫\nJsme moc rády, že jsme mohly být součástí a děkujeme za úžasnou atmosféru💕',
    image: '/potkejme%20se/neonov%C3%BD%20b%C4%9Bh/704697665_122128735161187626_6089121178362323911_n.jpg',
    alt: 'Neonový běh'
  },
  {
    id: 'den-matek',
    category: 'Potkejme se',
    title: 'Den matek na zahradě sv. Martina',
    excerpt: 'V neděli 10. května jsme měly možnost prezentovat naše sdružení na akci Rodinného centra pořádané ke Dni matek🌸.',
    text: 'V neděli 10. května jsme měly možnost prezentovat naše sdružení na akci Rodinného centra pořádané ke Dni matek🌸. Rozdaly jsme spoustu dárečků, probraly s vámi naše volební vize a děti nás ohromily svými znalostmi v kvízu o místních památkách🙌. Těšíme se na další spolupráci a setkání s vámi 🤝.',
    image: '/potkejme%20se/den%20matek/att.3bhmMCb7PxiCsnfx5Y36rwsSmEd8KWwsItk6lnd3_BE.jpg',
    alt: 'Den matek na zahradě sv. Martina'
  },
  {
    id: 'na-kole-detem',
    category: 'Potkejme se',
    title: 'Na kole dětem',
    excerpt: 'V pátek 5. června jsme se zúčastnily úžasné charitativní jízdy „Na kole dětem" na trase Strážnice–Hodonín.',
    text: 'V pátek 5. června jsme se zúčastnily úžasné charitativní jízdy „Na kole dětem" na trase Strážnice–Hodonín. Je neuvěřitelné, jak velkou věc dokáže vytvořit jeden člověk se skvělou myšlenkou – děkujeme, Josefe Zimovčáku!\nBylo nám potěšením zapojit se jako zástupkyně našeho sdružení a podpořit tento projekt, který pomáhá nemocným dětem. Ta energie v pelotonu a radost na tvářích byla nakažlivá. Fotka z Hodonína je důkazem, že jsme si to i přes ne příliš příznivé počasí užily!',
    image: '/potkejme%20se/na-kole-detem/717442425_122124867531211094_3724290735527842188_n (1).jpg',
    alt: 'Na kole dětem'
  }
]

export default function PotkejmeSePage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
            <div className="hero-content">
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', marginBottom: 10 }}>Potkejme se</div>
              <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--white)', marginBottom: 16 }}>Potkejme se</h1>
              <div style={{ maxWidth: 520 }}>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, lineHeight: 1.8, marginBottom: 12 }}>
                  Pojďme si popovídat osobně
                </p>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, lineHeight: 1.8, marginBottom: 12 }}>
                  Jsme ženy, sousedky a hlavně aktivní obyvatelky našeho města, kterým záleží na tom, jak se nám zde společně žije. Proto nás můžete často potkat na nejrůznějších akcích a slavnostech, kde rády pomáháme a šíříme naši vizi (mrkněte na fotky níže!).
                </p>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, lineHeight: 1.8, marginBottom: 12 }}>
                  Chceme vám být nablízku, a proto pro vás chystáme další příležitosti k neformálnímu potkávání. Přijďte za námi na některou z chystaných akcí – rády vám osobně představíme naše projekty.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 16, fontWeight: 600, lineHeight: 1.8 }}>
                  Máte otázku hned teď nebo se chcete potkat individuálně? Stačí nám napsat, jsme tu pro vás!
                </p>
              </div>
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
          <div className="potkejme-se-grid">
            {posts.map((post) => (
                <article
                  key={post.id}
                  style={{
                    width: '100%',
                    border: '1px solid var(--border)',
                    background: 'var(--white)',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    boxShadow: '0 18px 55px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ padding: '20px 20px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>{post.category}</div>
                    <h2 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>{post.title}</h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text)', margin: '0 0 16px' }}>
                      {post.excerpt}
                    </p>
                    <Link href={`/potkejme-se/${post.id}`} style={{
                      color: 'var(--black)',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none'
                    }}>
                      Číst dál
                    </Link>
                  </div>

                  <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
                    <button
                      type="button"
                      onClick={() => setLightbox({ src: post.image, alt: post.alt })}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        src={post.image}
                        alt={post.alt}
                        style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 12, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.24))', color: 'var(--white)', fontSize: 11, fontWeight: 600 }}>
                        Klikněte pro zvětšení
                      </div>
                    </button>
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            zIndex: 9999,
            cursor: 'pointer'
          }}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'auto', borderRadius: 'var(--radius)' }}
          />
        </div>
      )}
    </>
  )
}
