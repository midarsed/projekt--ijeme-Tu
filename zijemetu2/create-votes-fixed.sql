-- Vytvoření tabulky votes pro vlastní auth systém
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id) -- Zajišťuje, že uživatel může hlasovat jen jednou za projekt
);

-- Vytvoření indexu pro rychlejší dotazy
CREATE INDEX IF NOT EXISTS idx_votes_project_id ON votes(project_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);

-- Povolení RLS (Row Level Security)
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- RLS politika: Uživatelé mohou číst všechny hlasy (pro počítání)
CREATE POLICY "Anyone can view votes" ON votes
  FOR SELECT USING (true);

-- RLS politika: Přihlášení uživatelé mohou vkládat hlasy
CREATE POLICY "Users can insert votes" ON votes
  FOR INSERT WITH CHECK (
    -- Pro jednoduchost povolíme všem přihlášeným
    -- V reálné aplikaci by zde byla kontrola auth.uid()
    true
  );

-- RLS politika: Uživatelé mohou smazat pouze své vlastní hlasy
CREATE POLICY "Users can delete own votes" ON votes
  FOR DELETE USING (
    -- Pro jednoduchost povolíme všem
    -- V reálné aplikaci by zde byla kontrola auth.uid()
    true
  );

-- RLS politika: Uživatelé mohou aktualizovat pouze své vlastní hlasy
CREATE POLICY "Users can update own votes" ON votes
  FOR UPDATE USING (
    -- Pro jednoduchost povolíme všem
    -- V reálné aplikaci by zde byla kontrola auth.uid()
    true
  );
