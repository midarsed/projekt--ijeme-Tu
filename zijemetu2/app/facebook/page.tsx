'use client'
import { useState } from 'react'

const programItems = [
  {
    title: '1. Jasná vize a strategie',
    text: 'Strategie je o směru a společné vizi, která určuje, kam chceme město posunout. Nejde jen o seznam úkolů, ale o promyšlený plán budoucnosti. Díky jasné vizi se sny mění v uskutečnitelné kroky a jednotlivá rozhodnutí dávají smysl.'
  },
  {
    title: '2. Hrdost na historii a identitu',
    text: 'Historie tvoří jedinečnost města a je základem pro jeho další rozvoj. Je důležité být na ni pyšný a aktivně ji propagovat. Lepší prezentace památek a vytvoření turistických tras může přiblížit město návštěvníkům i obyvatelům.'
  },
  {
    title: '3. Kvalitní veřejný prostor a hřiště',
    text: 'Investice do hřišť nejsou luxusem, ale investicí do zdraví a budoucnosti. Moderní hřiště mají být funkční, bezpečná a navržená pro různé věkové skupiny. Zároveň slouží jako místo setkávání, pohybu a budování komunity.'
  },
  {
    title: '4. Zapojení občanů (participace)',
    text: 'Občané by měli mít možnost podílet se na rozhodování o městě. Mohou navrhovat projekty, hlasovat o prioritách a přinášet nové podněty. Otevřená komunikace posiluje důvěru a vede ke kvalitnějším rozhodnutím.'
  },
  {
    title: '5. Péče o veřejný majetek',
    text: 'Veřejný majetek patří všem a jeho stav ovlivňuje kvalitu života i vzhled města. Pravidelná údržba a modernizace prodlužují jeho životnost. Důležitý je důraz na udržitelnost, funkčnost a celkovou estetiku prostředí.'
  },
  {
    title: '6. Odpovědné vedení a dlouhodobý rozvoj',
    text: 'Město potřebuje osvícené vedení s jasným plánem rozvoje. Ten vzniká ve spolupráci s občany i odborníky a propojuje jednotlivé projekty. Díky tomu na sebe kroky navazují a vytvářejí dlouhodobě fungující celek.'
  }
  ,
  {
    title: '7. Mobilita a bezpečný pohyb po městě',
    text: 'Kvalitní veřejný prostor je základem příjemného života ve městě. Patří sem upravené parky, náměstí, ulice i místa k odpočinku, která podporují setkávání lidí, bezpečí a relaxaci. Stejně důležitý je bezpečný a bezbariérový pohyb pro chodce, rodiče s kočárky, seniory i osoby na vozíku. Díky dopravním analýzám a podnětům občanů lze odhalovat problematická místa a navrhovat lepší řešení. Město by mělo být dostupné pro všechny, s bezpečnými přechody, přehlednými křižovatkami, kvalitními chodníky, cyklostezkami i dostatečnou kapacitou parkování.'
  }
]

export default function FacebookPage() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const getPreview = (text: string) => {
    if (text.length <= 130) return text
    return text.slice(0, 130).trim() + '...'
  }

  return (
    <>
      {/* Uvítací sekce s logem */}
      <div style={{ background: 'var(--black)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-container">
            <div className="hero-content">
              <h1 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 44, fontWeight: 600, color: 'var(--white)', marginBottom: 14 }}>
                Volební program
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
              src="/LOGO_kulate.png"
              alt="Žijeme TU! logo"
              className="hero-logo"
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
          {programItems.map((item) => {
            const isOpen = openSection === item.title
            const previewText = item.text.length <= 130 ? item.text : item.text.slice(0, 130).trim()
            const tailText = item.text.length <= 130 ? '' : item.text.slice(previewText.length)
            return (
              <article
                key={item.title}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 18px 55px rgba(0,0,0,0.05)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenSection(isOpen ? null : item.title)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 12 }}>{item.title}</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', margin: 0 }}>
                      {previewText}{isOpen ? tailText : '...'}
                    </p>
                  </div>
                  <span style={{ fontSize: 28, lineHeight: 1, color: 'var(--black)' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
