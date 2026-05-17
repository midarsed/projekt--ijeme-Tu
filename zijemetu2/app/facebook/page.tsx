'use client'
import { useState } from 'react'

const programCategories = [
  {
    id: 'historicka-hodnota',
    title: 'Historická hodnota města',
    folder: 'historická hodnota města',
    images: [
      'hodnota hlavní.jpg',
      'hodnota vedlejší.jpg',
      'hodnota vedlejší2.jpg',
      'hodnota vedlejší3.jpg'
    ]
  },
  {
    id: 'hriste',
    title: 'Hřiště a sportoviště',
    folder: 'hřiště a sportoviště',
    images: [
      'hřiště hlavní.jpg',
      'hřiště vedlejší1.jpg',
      'hřiště vedlejší2.jpg',
      'hřiště vedlejší3.jpg'
    ]
  },
  {
    id: 'majetek',
    title: 'Kontinuální péče o majetek města',
    folder: 'kontinuální péče o majetek města',
    images: [
      'majetek hlavní.jpg',
      'majetek vedlejší.jpg',
      'majetek vedlejší2.jpg',
      'majetek vedlejší3.jpg'
    ]
  },
  {
    id: 'strategie',
    title: 'Strategická koncepce města',
    folder: 'strategická koncepce města',
    images: [
      'koncepce hlavní.jpg',
      'koncepce vedlejší.jpg',
      'koncepce vedlejší2.jpg',
      'koncepce vedlejší3.jpg',
      'koncepce vedlejší4.jpg'
    ]
  },
  {
    id: 'transparentnost',
    title: 'Transparentní vedení a komunikace',
    folder: 'transparentní vedení a komunikce',
    images: [
      'transparentnost hlavní.jpg',
      'transparentnost vedlejší1.jpg',
      'transparentnost vedlejší2.jpg',
      'transparentnost vedlejší3.jpg'
    ]
  },
  {
    id: 'obcane',
    title: 'Zapojení občanů',
    folder: 'zapojení občanů',
    images: [
      'občané hlavní.jpg',
      'občané vedlejší.jpg',
      'občané vedlejší2.jpg',
      'občané vedlejší3.jpg'
    ]
  }
]

export default function FacebookPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    const category = programCategories.find(c => c.id === selectedCategory)
    if (category) {
      setCurrentImageIndex((prev) => (prev + 1) % category.images.length)
    }
  }

  const handlePrevImage = () => {
    const category = programCategories.find(c => c.id === selectedCategory)
    if (category) {
      setCurrentImageIndex((prev) => (prev - 1 + category.images.length) % category.images.length)
    }
  }

  const handleClose = () => {
    setSelectedCategory(null)
    setCurrentImageIndex(0)
  }

  const currentCategory = programCategories.find(c => c.id === selectedCategory)

  return (
    <>
      {/* Uvítací sekce s logem */}
      <div style={{ background: 'var(--black)', padding: '72px 0 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
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
            style={{ height: 400, width: 400, objectFit: 'contain', filter: 'contrast(1.45) brightness(1.08) saturate(1.05) drop-shadow(0 0 10px rgba(255,255,255,0.22))' }}
          />
        </div>
      </div>

      {/* Galerie kategorií */}
      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
          {programCategories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                border: '1px solid var(--border)',
                background: 'var(--white)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src={`/volební program/${category.folder}/${category.images[0]}`}
                alt={category.title}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'contain' }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal s galerií */}
      {selectedCategory && currentCategory && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
          onClick={handleClose}
        >
          <div
            style={{
              maxWidth: 1200,
              width: '100%',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: -50,
                right: 0,
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: 32,
                cursor: 'pointer',
                padding: 8
              }}
            >
              ×
            </button>
            
            <img
              src={`/volební program/${currentCategory.folder}/${currentCategory.images[currentImageIndex]}`}
              alt={currentCategory.title}
              style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <button
                onClick={handlePrevImage}
                style={{
                  padding: '12px 24px',
                  background: 'var(--white)',
                  color: 'var(--black)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                ← Předchozí
              </button>
              
              <div style={{ color: 'white', fontSize: 16 }}>
                {currentImageIndex + 1} / {currentCategory.images.length}
              </div>
              
              <button
                onClick={handleNextImage}
                style={{
                  padding: '12px 24px',
                  background: 'var(--white)',
                  color: 'var(--black)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Další →
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 16, color: 'white', fontSize: 18, fontWeight: 500 }}>
              {currentCategory.title}
            </div>
          </div>
        </div>
      )}
    </>
  )
}