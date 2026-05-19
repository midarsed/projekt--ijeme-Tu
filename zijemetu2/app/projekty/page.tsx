'use client'
import { useState, useEffect } from 'react'

// Static data pro projekty - protože databáze nefunguje spolehlivě
const staticProjects = [
  {
    id: '1',
    title: 'Revitalizace cesty k tenisovým kurtům',
    description: 'Rádi bychom vám představili naši vizi pro revitalizaci cesty k tenisovým kurtům a celkové oživení této sportovní části města. Zkusme na tento projekt pohlédnout ze širší perspektivy, očima vizionáře, diplomata, sportovce, Strážničana stejně jako turisty. Nemáme sice k dispozici potřebné podklady ani související kontexty, nicméně máme návrh uceleného konceptu, který by dotvořil sportovní část města a mohl rozšířit život v něm i do těchto končin. Představujeme vám naši vizi možného řešení, která se vymyká dosavadnímu stylu „po strážnicku", ale naopak obsahuje jasný názorný plán a integritu, jež využívá stávajícího majetku a přitom prohlubuje potenciál města.',
    category: 'Sportovní vybavení',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/tenis-kurty-nova/400/300.jpg',
    video_url: 'https://www.facebook.com/61586332845379/videos/pcb.122111354013211094/877624205106538',
    images: [
      '/projekty/hlavní.jpg',
      '/projekty/vedlejsi-potom-ostre-2.png',
      '/projekty/vedlejsi-ted-ostre.png'
    ]
  },
  {
    id: '2',
    title: 'Rekonstrukce brány',
    description: 'Chtěli bychom strážničanům nabídnout ukázku toho, jak by mohla rekonstrukce brány vypadat, kdyby se dělala komplexně, tak jak si tato památka a s ní spojené okolí zaslouží. Nyní místo slouží spíše jako průchozí. Vizí je, že by se mohlo stát jednou z vyhledávaných zastávek nejen místních cestou na hřbitov, ale také návštěvníků našeho města. Posuďte sami, zda by vám takové řešení dávalo smysl.',
    category: 'Historická památka',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/brana-straznice/400/300.jpg',
    video_url: null,
    images: [
      '/projekty/hlavní-brána.jpg',
      '/projekty/vedlejší-brána.jpg'
    ]
  },
  {
    id: '3',
    title: 'Naše hřiště vs. hřiště v okolí',
    description: 'Rozdíl není jen v designu, ale hlavně v kvalitě, údržbě, funkčnosti, udržitelnosti a bezpečnosti. Hřiště v okolních obcích už dnes vznikají jako promyšlené projekty pracující s terénem, zelení, různorodými povrchy i klidovými zónami pro rodiče. Chtěly bychom ve Strážnici kvalitní veřejný prostor, který je moderní, bezpečný a dlouhodobě udržitelný.',
    category: 'Srovnání',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/hriste-srovnani/400/300.jpg',
    video_url: null,
    votable: false,
    images: [
      '/projekty/srovnani-nase-uprkova.png',
      '/projekty/srovnani-nase-orechovka.png',
      '/projekty/srovnani-nase-kovarska.png'
    ]
  },
  {
    id: '4',
    title: 'HŘIŠTĚ A SPORTOVIŠTĚ',
    description: 'Naší představou je kultivovaný veřejný prostor s promyšlenou strukturou, přírodními herními prvky, možností pohybu po bezpečném povrchu i možnost klidového pobytu v zeleni. 🌿Návrh zároveň pracuje s diferenciací řešení – je zde ukázka jak přírodního hřiště, tak i modernějšího pojetí s různými prvky povrchů i využití, aby bylo možné zvolit nejvhodnější řešení pro dané místo. Cílem je funkční a přehledné místo pro všechny generace, které bude přirozeně začleněno do okolí a dlouhodobě udržitelné. Nejde o velká hřiště, ale o příjemné místo pro děti, rodiče i seniory, kde se dá hrát, odpočívat i potkávat.',
    category: 'Sportovní vybavení',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/hriste-sportoviste/400/300.jpg',
    video_url: null,
    images: [
      '/projekty/projekty2/hřiště a sportoviště vedlejší1.jpg',
      '/projekty/projekty2/hřiště a sportoviště vedlejší2.jpg',
      '/projekty/projekty2/hřiště a sportoviště vedlejší3.jpg'
    ]
  }
]

export default function ProjektyPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  useEffect(() => { 
    console.log('Loading static projects...')
    setProjects(staticProjects)
    setVotes({})
    setUserVotes([])
    setLoading(false)
  }, [])

  function handleVote(projectId: string) {
    const voted = userVotes.includes(projectId)
    if (voted) {
      setUserVotes(userVotes.filter(id => id !== projectId))
      setVotes(p => ({ ...p, [projectId]: Math.max(0, (p[projectId] || 1) - 1) }))
    } else {
      setUserVotes([...userVotes, projectId])
      setVotes(p => ({ ...p, [projectId]: (p[projectId] || 0) + 1 }))
    }
  }

  function openLightbox(images: string[], index = 0) {
    setLightbox({ images, index })
  }

  function closeLightbox() {
    setLightbox(null)
  }

  function showPrevImage() {
    setLightbox(current => {
      if (!current) return null
      return {
        ...current,
        index: current.index === 0 ? current.images.length - 1 : current.index - 1,
      }
    })
  }

  function showNextImage() {
    setLightbox(current => {
      if (!current) return null
      return {
        ...current,
        index: current.index === current.images.length - 1 ? 0 : current.index + 1,
      }
    })
  }

  const maxV = Math.max(...Object.values(votes), 1)

  return (
    <>
      {/* Černý vršek */}
      <div style={{
        background: 'var(--black)',
        padding: '72px 0 56px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <h1 style={{
              fontFamily: 'Segoe UI Semibold, var(--font-display)',
              fontSize: 48,
              fontWeight: 600,
              marginBottom: 16,
              color: 'var(--white)'
            }}>
              Projekty a vize
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: 15,
              fontWeight: 600,
              maxWidth: 520,
              lineHeight: 1.7
            }}>
              Prohlížet projekty může každý. Pro hlasování se zaregistrujte – každý email hlasuje jednou za každý projekt.
            </p>
          </div>
          <img
            src="/LOGO_kulate.png"
            alt="Žijeme TU! logo"
            style={{ height: 360, width: 360, objectFit: 'contain', filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <div className="container" style={{ padding: '48px 0 64px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--gray)' }}>Načítám projekty…</div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--gray)' }}>Žádné projekty k zobrazení.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {projects.map(project => {
              const vc = votes[project.id] || 0
              const voted = userVotes.includes(project.id)
              const expired = project.voting_ends_at && new Date(project.voting_ends_at) < new Date()
              const pct = Math.round((vc / maxV) * 100)

              return (
              <div
                key={project.id}
                style={{
                  border: '1px solid var(--border)',
                  background: voted ? 'var(--gray-pale)' : 'var(--white)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                }}
              >
                  <a href={`/projekty/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '22px 22px 18px' }}>
                      <h2 style={{ fontFamily: 'Segoe UI Semibold, var(--font-display)', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{project.title}</h2>
                      <p style={{ fontSize: 13, color: 'var(--black-soft)', fontWeight: 500, lineHeight: 1.7, marginBottom: 14 }}>
                        {project.description.slice(0, 150)}...
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--gray-dark)', fontWeight: 500 }}>Klikněte pro více informací</p>
                    </div>

                    {/* Fotka */}
                    <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
                      {project.images && project.images.length > 0 && (
                        <img src={project.images[0]} alt={`${project.title} - fotka`}
                          onClick={(e) => {
                            e.preventDefault()
                            openLightbox(project.images, 0)
                          }}
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            height: 'auto',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            display: 'block',
                          }} />
                      )}
                      {project.video_url && (
                        <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--black)', color: 'var(--white)', padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: 11, fontWeight: 500 }}>
                          📹 Video
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer'
          }}
        >
          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  showPrevImage()
                }}
                style={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(0, 0, 0, 0.45)',
                  color: 'white',
                  fontSize: 28,
                  cursor: 'pointer',
                }}
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  showNextImage()
                }}
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(0, 0, 0, 0.45)',
                  color: 'white',
                  fontSize: 28,
                  cursor: 'pointer',
                }}
              >
                ›
              </button>
            </>
          )}
          <img 
            src={lightbox.images[lightbox.index]} 
            alt="Fotka v plné velikosti"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'contain',
              cursor: 'default'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: 14,
            background: 'rgba(0, 0, 0, 0.45)',
            padding: '8px 14px',
            borderRadius: 999,
          }}>
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
          <div 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
              fontSize: 24,
              cursor: 'pointer',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </div>
        </div>
      )}
    </>
  )
}
