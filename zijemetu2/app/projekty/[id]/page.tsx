'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth-context'
import { supabase, Project } from '../../lib/supabase'
import AuthModal from '../../components/AuthModal'
import ConfirmModal from '../../components/ConfirmModal'
import { formatDistanceToNow } from 'date-fns'
import { cs } from 'date-fns/locale'
import { useParams } from 'next/navigation'

// Static data pro projekty
const staticProjects = [
  {
    id: '1',
    title: 'Revitalizace cesty k tenisovým kurtům',
    description: 'Rádi bychom vám představili naši vizi pro revitalizaci cesty k tenisovým kurtům a celkové oživení této sportovní části města. Zkusme na tento projekt pohlédnout ze širší perspektivy, očima vizionáře, diplomata, sportovce, Strážničana stejně jako turisty. Nemáme sice k dispozici potřebné podklady ani související kontexty, nicméně máme návrh uceleného konceptu, který by dotvořil sportovní část města a mohl rozšířit život v něm i do těchto končin. Představujeme vám naši vizi možného řešení, která se vymyká dosavadnímu stylu „po strážnicku", ale naopak obsahuje jasný názorný plán a integritu, jež využívá stávajícího majetku a přitom prohlubuje potenciál města.',
    category: 'Sportovní vybavení',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/tenis-kurty-straznice/400/300.jpg',
    video_url: 'https://www.facebook.com/61586332845379/videos/pcb.122111354013211094/877624205106538',
    order_num: 1,
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
    order_num: 2,
    images: [
      '/projekty/hlavní-brána.jpg',
      '/projekty/vedlejší-brána.jpg'
    ]
  },
  {
    id: '3',
    title: 'Analýza hřišť Strážnice vs. okolí',
    description: 'Vytvořily jsme srovnání hřišť, které zachycuje rozdíly reflektující proč naše hřiště zaostávají nad současnými. Rozdíl není jen v designu, ale hlavně v kvalitě, údržbě, funkčnosti, udržitelnosti a v neposlední řadě bezpečnosti. Hřiště v okolních obcích už v dnešní době vznikají jako promyšlené projekty, které pracují s terénem, zelení, různorodými povrchy i klidovými zónami pro rodiče. Tento přístup přirozeně rozšiřuje cílovou skupinu a umožňuje celoroční využití prostoru napříč všemi věkovými skupinami. Naopak ve Strážnici u typizovaných hřišť se stále potýkáme s omezeným věkovým rozpětím. Chtěly bychom ve Strážnici kvalitní hřiště a veřejný prostor, který je moderní, bezpečný, udržitelný a přirozeně zapadá do svého okolí, nejen dnes, ale i za deset či dvacet let.',
    category: 'Srovnání',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/hriste-srovnani-detail/400/300.jpg',
    video_url: null,
    order_num: 3,
    votable: false,
    images: [
      '/projekty/srovnani-nase-uprkova.png',
      '/projekty/srovnani-nase-orechovka.png',
      '/projekty/srovnani-nase-kovarska.png'
    ],
    comparisonGroups: [
      {
        title: 'Hřiště ve Strážnici',
        images: [
          '/projekty/srovnani-nase-uprkova.png',
          '/projekty/srovnani-nase-orechovka.png',
          '/projekty/srovnani-nase-kovarska.png'
        ]
      },
      {
        title: 'Hřiště v okolí',
        images: [
          '/projekty/srovnani-jinde-petrov.png',
          '/projekty/srovnani-jinde-sudomerice.png',
          '/projekty/srovnani-jinde-lipov.png',
          '/projekty/srovnani-jinde-veseli.png'
        ]
      }
    ],
    comparisonTextImage: '/projekty/srovnani-text.png'
  },
  {
    id: '4',
    title: 'HŘIŠTĚ A SPORTOVIŠTĚ',
    description: 'Hřiště a sportoviště: Naší představou je vytvářet kultivovaný veřejný prostor s promyšlenou strukturou, přírodními herními prvky, možností pohybu po bezpečném povrchu i možnost klidového pobytu v zeleni. Přiložené návrhy demonstrují různé pojetí konkrétních hřišť, s přihlédnutím k jejich výchozím danostem a lokaci. Vidíme tak možnost vytvoření přírodního hřiště, ale i moderní pojetí s různými prvky povrchů i využití, aby bylo možné zvolit nejvhodnější řešení pro dané místo. Cílem je funkční a přehledné místo pro všechny generace, které bude přirozeně začleněno do okolí a dlouhodobě udržitelné. Nejde o velká hřiště, ale o příjemné místo pro děti, rodiče i seniory, kde se dá hrát, odpočívat i potkávat.',
    category: 'Sportovní vybavení',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/hriste-sportoviste/400/300.jpg',
    video_url: null,
    order_num: 4,
    images: [
      '/projekty/projekty2/hřiště a sportoviště vedlejší3.jpg',
      '/projekty/projekty2/hřiště a sportoviště vedlejší2.jpg'
    ]
  },
  {
    id: '5',
    title: 'Revitalizace herních a odpočinkových ploch Kovářská',
    description: 'Abychom ukázaly, jakým způsobem by se v rámci plánování hřišť a sportovišť mělo správně postupovat, předkládáme ilustrační návrh revitalizace ploch v ulici Kovářská, 🏙️ který slouží jako modelový příklad moderního přístupu k urbanistickému plánování sportovišť ve Strážnici. Naším cílem není pouze výměna vysloužilých herních prvků, 🎠 ale vytvoření multifunkčního komunitního uzlu, 🤝 který reaguje na potřeby všech věkových skupin obyvatel v centru města. 👨‍👩‍👧‍👦 Navržené koncepční řešení 📐 pracuje i s dosud nevyužitými prostory, se zelení, 🌱 a tolik absentujícím funkčním zónováním (Intergenerační mix): uzavřená zóna pro batolata, zóna aktivního pohybu pro děti školního věku, teen-zóna a fitness se začleněním workoutových prvků 💪 a míst pro setkávání, které eliminují potřebu teenagerů obsazovat prvky pro malé děti. ✅ Tento příklad ulice Kovářská jasně ukazuje, že strategické plánování může proměnit zanedbaná prostranství v reprezentativní místa, která zvyšují hodnotu bydlení v našem městě a podporují zdravý životní styl napříč generacemi. 🫶',
    category: 'Sportovní vybavení',
    cost: 'K určení',
    voting_ends_at: null,
    created_at: new Date().toISOString(),
    image_url: 'https://picsum.photos/seed/kovarska/400/300.jpg',
    video_url: null,
    order_num: 5,
    images: [
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_obr_celek_1.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_1.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_obr_celek_2.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_2_U.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_obr_celek_3.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_3_U.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_obr_celek_4.jpg',
      '/projekty/projekty-Revitalizace herních a odpočinkových ploch Kovářská/KOVARSKA_4.jpg'
    ]
  }
]

export default function ProjectDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set())
  const [authOpen, setAuthOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openComments, setOpenComments] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferLoading, setTransferLoading] = useState(false)

  async function refreshVotes(projId: string, currentUserId: string | null) {
    try {
      const { data: allVotes, error: allVotesError } = await supabase
        .from('votes')
        .select('*')
        .eq('project_id', projId)

      if (allVotesError) {
        console.error('Chyba při načítání hlasů:', allVotesError)
        setVotes(prev => ({ ...prev, [projId]: 0 }))
      } else {
        setVotes(prev => ({ ...prev, [projId]: allVotes?.length || 0 }))
      }

      if (currentUserId) {
        const { data: currentUserVotes, error: userVotesError } = await supabase
          .from('votes')
          .select('*')
          .eq('project_id', projId)
          .eq('user_id', currentUserId)

        if (userVotesError) {
          console.error('Chyba při načítání uživatelských hlasů:', userVotesError)
          setUserVotes(new Set())
        } else {
          setUserVotes(currentUserVotes && currentUserVotes.length > 0 ? new Set([projId]) : new Set())
        }
      } else {
        setUserVotes(new Set())
      }
    } catch (err) {
      console.error('Neočekaná chyba při načítání hlasů:', err)
      setVotes(prev => ({ ...prev, [projId]: 0 }))
      setUserVotes(new Set())
    }
  }

  useEffect(() => {
    async function loadVotes() {
      const foundProject = staticProjects.find(p => p.id === projectId)
      if (!foundProject) {
        setLoading(false)
        return
      }
      
      setProject(foundProject)
      
      try {
        await refreshVotes(projectId, user ? String(user.id) : null)
      } catch (err) {
        console.log('Chyba:', err)
        setVotes({ [projectId]: 0 })
        setUserVotes(new Set())
      }
      
      setLoading(false)
    }
    
    loadVotes()
  }, [projectId, user])

  async function handleVote() {
    if (!project) return

    if (!user) {
      setAuthOpen(true)
      return
    }

    // Zkontrolujeme, zda má uživatel ověřený email
    if (!(user as any).verified) {
      alert('Pro hlasování musíte ověřit svůj email. Zkontrolujte schránku a potvrďte odkaz.')
      return
    }

    try {
      const userId = String((user as any).id)
      const alreadyVoted = userVotes.has(project.id)

      if (alreadyVoted) {
        // Zavoláme serverovou API, která používá service role key
        const res = await fetch('/api/votes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ project_id: String(project.id), user_id: userId })
        })

        const data = await res.json()
        if (!res.ok) {
          console.error('Chyba při odstraňování hlasu (API):', data)
          alert('Nepodařilo se odebrat hlas: ' + (data.error || res.statusText))
          return
        }

        await refreshVotes(String(project.id), userId)
        return
      }

      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: String(project.id), user_id: userId })
      })

      const data = await res.json()
      if (!res.ok) {
        console.error('Chyba při přidávání hlasu (API):', data)
        if (res.status === 409) {
          // Otevřeme modal pro nabídku přesunu hlasu
          setTransferOpen(true)
          return
        }

        const msg = String(data.error || '')
        if (msg.includes('unique') || msg.includes('already')) {
          alert('Pro tento projekt už jste hlasovali')
          return
        }
        alert('Chyba při přidávání hlasu: ' + (data.error || res.statusText))
        return
      }

      await refreshVotes(String(project.id), userId)
    } catch (err) {
      console.error('Neočekaná chyba při hlasování:', err)
      alert('Neočekaná chyba při hlasování. Zkuste to prosím později.')
    }
  }

  async function performTransfer() {
    if (!project || !user) return
    try {
      setTransferLoading(true)
      const userId = String((user as any).id)
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: String(project.id), user_id: userId, transfer: true })
      })
      const data = await res.json()
      if (!res.ok) {
        console.error('Chyba při přesunu hlasu (API):', data)
        alert('Nepodařilo se přesunout hlas: ' + (data.error || res.statusText))
        setTransferLoading(false)
        setTransferOpen(false)
        return
      }

      await refreshVotes(String(project.id), String((user as any).id))
      setTransferLoading(false)
      setTransferOpen(false)
    } catch (err) {
      console.error('Neočekaná chyba při přesunu hlasu:', err)
      alert('Neočekaná chyba při přesunu hlasu. Zkuste to později.')
      setTransferLoading(false)
      setTransferOpen(false)
    }
  }

  async function submitComment() {
    if (!user) { setAuthOpen(true); return }
    if (!project) return
    setCommentError('')
    if (newComment.trim().length < 3) { setCommentError('Komentář je příliš krátký.'); return }
    setCommentLoading(true)
    
    // Simulace odeslání komentáře
    setTimeout(() => {
      const comment = {
        id: Date.now().toString(),
        content: newComment,
        created_at: new Date().toISOString(),
        users: { email: user.email }
      }
      setComments(prev => [...prev, comment])
      setNewComment('')
      setCommentLoading(false)
    }, 1000)
  }

  function openLightbox(index: number) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function showPrevImage() {
    const images = [
      ...(((project as any)?.comparisonGroups
        ? (project as any).comparisonGroups.flatMap((group: any) => group.images)
        : ((project as any)?.images || []))),
      ...(((project as any)?.comparisonTextImage ? [(project as any).comparisonTextImage] : []))
    ]
    if (!images.length) return
    setLightboxIndex(current => {
      if (current === null) return null
      return current === 0 ? images.length - 1 : current - 1
    })
  }

  function showNextImage() {
    const images = [
      ...(((project as any)?.comparisonGroups
        ? (project as any).comparisonGroups.flatMap((group: any) => group.images)
        : ((project as any)?.images || []))),
      ...(((project as any)?.comparisonTextImage ? [(project as any).comparisonTextImage] : []))
    ]
    if (!images.length) return
    setLightboxIndex(current => {
      if (current === null) return null
      return current === images.length - 1 ? 0 : current + 1
    })
  }

  if (loading) {
    return (
      <div style={{ padding: '56px 0', textAlign: 'center' }}>
        <div style={{ color: 'var(--gray)' }}>Načítám projekt…</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div style={{ padding: '56px 0', textAlign: 'center' }}>
        <div style={{ color: 'var(--gray)' }}>Projekt nebyl nalezen.</div>
      </div>
    )
  }

  const vc = votes[project.id] || 0
  const voted = userVotes.has(project.id)
  const expired = project.voting_ends_at && new Date(project.voting_ends_at) < new Date()
  const isVotable = (project as any).votable !== false
  const galleryImages: string[] = (project as any).comparisonGroups
    ? (project as any).comparisonGroups.flatMap((group: any) => group.images)
    : ((project as any).images || [])
  const allLightboxImages = [
    ...galleryImages,
    ...((project as any).comparisonTextImage ? [(project as any).comparisonTextImage] : [])
  ]

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <ConfirmModal
        isOpen={transferOpen}
        title="Přesun hlasu"
        message="Už jste hlasovali pro jiný projekt. Přejete si přesunout svůj hlas na tento projekt?"
        confirmText={transferLoading ? 'Přesouvání…' : 'Přesunout'}
        cancelText="Zrušit"
        onConfirm={performTransfer}
        onCancel={() => setTransferOpen(false)}
      />
      <div style={{ background: 'var(--black)', padding: '72px 0 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.86)', marginBottom: 10 }}>Detail projektu</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, marginBottom: 12, color: 'var(--white)' }}>{project.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 15, fontWeight: 600, maxWidth: 520, lineHeight: 1.7 }}>
              {isVotable
                ? 'Prohlížet projekty může každý. Pro hlasování se zaregistrujte – každý email hlasuje jednou za každý projekt.'
                : 'Tento projekt je informativní srovnání, bez možnosti hlasování.'}
            </p>
          </div>
          <img
            src="/LOGO_kulate.png"
            alt="Žijeme TU! logo"
            style={{ height: 360, width: 360, objectFit: 'contain', marginLeft: 'auto', filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, maxWidth: 800, margin: '0 auto' }}>
          {/* Informace o projektu */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 32 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {project.category && <span style={{ fontSize: 10, padding: '3px 10px', border: '1px solid var(--border)', color: 'var(--gray)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{project.category}</span>}
              {expired && <span style={{ fontSize: 10, padding: '3px 10px', border: '1px solid var(--border)', color: 'var(--gray)', background: 'var(--gray-light)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Ukončeno</span>}
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, marginBottom: 16 }}>{project.title}</h2>
            <p style={{ fontSize: 16, color: 'var(--black-soft)', fontWeight: 500, lineHeight: 1.75, marginBottom: 20 }}>{project.description}</p>
            
            {project.voting_ends_at && !expired && (
              <p style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 20 }}>
                Hlasování do {new Date(project.voting_ends_at).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              <a href="https://www.facebook.com/profile.php?id=61586332845379" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--black)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                Více na Facebooku →
              </a>
              {(project as any).video_url && (
                <a href={(project as any).video_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--white)', textDecoration: 'none', padding: '8px 16px', background: 'var(--black)', border: '1px solid var(--black)', borderRadius: 'var(--radius)' }}>
                  📹 Video →
                </a>
              )}
            </div>

            {isVotable ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderTop: '1px solid var(--border)', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <img src="/LOGO_kulate.png" alt="Žijeme TU!" style={{ width: 64, height: 64, objectFit: 'contain', flex: '0 0 auto' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <div style={{ textAlign: 'center', minWidth: 96 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, lineHeight: 1, color: voted ? 'var(--black)' : 'var(--gray)' }}>{vc}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray)' }}>hlasů</div>
                </div>
                <div style={{ flex: 1 }}>
                  <button onClick={handleVote} disabled={!user || !!expired}
                    style={{ padding: '12px 24px', fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', border: '1px solid var(--black)', background: voted ? 'var(--black)' : 'transparent', color: voted ? 'var(--white)' : 'var(--black)', cursor: (!user || expired) ? 'not-allowed' : 'pointer', opacity: (!user || expired) ? 0.6 : 1, borderRadius: 'var(--radius)', whiteSpace: 'nowrap' }}>
                    {voted ? '✓ Hlasováno' : 'Hlasovat'}
                  </button>
                  {!user && <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8 }}>Pro hlasování se prosím přihlaste nebo zaregistrujte.</p>}
                </div>
              </div>
            ) : (
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--gray)' }}>
                Tento obsah slouží ke srovnání přístupu k hřištím, bez hlasování.
              </div>
            )}
          </div>

          {/* Srovnávací skupiny */}
          {(project as any).comparisonGroups ? (
            <div style={{ display: 'grid', gap: 28 }}>
              {(project as any).comparisonGroups.map((group: any, groupIdx: number) => (
                <div key={group.title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 18 }}>{group.title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                    {group.images.map((img: string, idx: number) => {
                      const globalIndex = (project as any).comparisonGroups
                        .slice(0, groupIdx)
                        .reduce((sum: number, g: any) => sum + g.images.length, 0) + idx
                      return (
                        <img
                          key={img}
                          src={img}
                          alt={`${group.title} - ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          onClick={() => openLightbox(globalIndex)}
                          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 'var(--radius)', cursor: 'pointer', display: 'block' }}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
              {(project as any).comparisonTextImage && (
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18 }}>
                  <img
                    src={(project as any).comparisonTextImage}
                    alt="Srovnění Strážnice vs. okolí"
                    loading="lazy"
                    decoding="async"
                    onClick={() => openLightbox(galleryImages.length)}
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)', cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          ) : (
          /* Fotky */
          (project as any).images && (project as any).images.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                alignItems: 'start',
              }}
            >
              {galleryImages.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`${project.title} - fotka ${idx + 1}`} 
                  loading="lazy"
                  decoding="async"
                  onClick={() => openLightbox(idx)}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    height: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          ))}

          {/* Video */}
          {(project as any).video_url && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <a href={(project as any).video_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                📹 Podívat se na video →
              </a>
            </div>
          )}

          {/* Komentáře */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 32 }}>
            <button onClick={() => setOpenComments(!openComments)} style={{ fontSize: 14, color: 'var(--gray)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, letterSpacing: '0.04em', marginBottom: 20 }}>
              Komentáře ({comments.length}) {openComments ? '▲' : '▼'}
            </button>

            {openComments && (
              <>
                {comments.length === 0 && <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 20 }}>Zatím žádné komentáře.</p>}
                {comments.map((c: any) => (
                  <div key={c.id} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 6, fontSize: 11, color: 'var(--gray)' }}>
                      <span style={{ fontWeight: 500, color: 'var(--black)' }}>{c.users?.email?.split('@')[0] || 'Anonym'}</span>
                      <span>·</span>
                      <span>{formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: cs })}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--black-soft)', lineHeight: 1.65 }}>{c.content}</p>
                  </div>
                ))}
                
                {user ? (
                  <div style={{ marginTop: 16 }}>
                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Napište komentář…" rows={3}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', background: 'var(--white)', borderRadius: 'var(--radius)', fontSize: 14, fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none' }} />
                    {commentError && <p style={{ fontSize: 12, color: 'var(--black)', marginTop: 4 }}>{commentError}</p>}
                    <button onClick={submitComment} disabled={commentLoading}
                      style={{ marginTop: 8, padding: '10px 20px', background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                      {commentLoading ? 'Odesílám…' : 'Odeslat'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setAuthOpen(true)} style={{ marginTop: 8, fontSize: 13, color: 'var(--gray)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                    Přihlaste se pro přidání komentáře
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && allLightboxImages.length > 0 && (
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
          {allLightboxImages.length > 1 && (
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
            src={allLightboxImages[lightboxIndex]} 
            alt="Fotka v plné velikosti"
            loading="eager"
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
            {lightboxIndex + 1} / {allLightboxImages.length}
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
