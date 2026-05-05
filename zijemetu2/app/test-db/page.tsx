import { supabase } from '../lib/supabase'

export default async function TestDB() {
  try {
    // Test připojení
    const { data: posts, error } = await supabase.from('fb_posts').select('*')
    
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Test databáze</h1>
        
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2>Výsledky testu:</h2>
          <p><strong>Počet příspěvků:</strong> {posts?.length || 0}</p>
          <p><strong>Chyba:</strong> {error ? JSON.stringify(error) : 'Žádná chyba'}</p>
        </div>

        {posts && posts.length > 0 && (
          <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '8px' }}>
            <h2>Data se načetla správně! ✅</h2>
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <strong>{post.title}</strong> - {post.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {posts && posts.length === 0 && !error && (
          <div style={{ background: '#ffe8e8', padding: '20px', borderRadius: '8px' }}>
            <h2>Žádná data v databázi ❌</h2>
            <p>Zkontrolujte, zda jste spustili SQL skript v Supabase.</p>
          </div>
        )}
      </div>
    )
  } catch (err) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Chyba připojení</h1>
        <div style={{ background: '#ffe8e8', padding: '20px', borderRadius: '8px' }}>
          <p><strong>Chyba:</strong> {String(err)}</p>
        </div>
      </div>
    )
  }
}
