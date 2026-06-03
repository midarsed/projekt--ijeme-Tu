-- ŽIJEME TU! – Spusť v Supabase → SQL Editor → Run

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'team')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cost TEXT,
  category TEXT,
  voting_ends_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

CREATE TABLE password_resets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);

CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fb_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  fb_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_url TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ukázkové projekty
INSERT INTO projects (title, description, cost, category, voting_ends_at) VALUES
('Revitalizace náměstí', 'Obnova centrálního náměstí Svobody – nové lavičky, fontána, výsadba stromů a záhonů. Náměstí se stane místem setkávání pro všechny generace.', '3,2 mil. Kč', 'Veřejný prostor', NOW() + INTERVAL '60 days'),
('Oprava chodníků', 'Rekonstrukce rozbitých chodníků v ulicích Úprkova, Kovářská a Příční. Bezpečná chůze pro seniory i rodiče s kočárky.', '1,8 mil. Kč', 'Infrastruktura', NOW() + INTERVAL '60 days'),
('Dětské hřiště u ZŠ', 'Moderní hřiště s bezpečným povrchem, průlezkami a lavičkami přímo u základní školy.', '900 tis. Kč', 'Děti a rodiny', NOW() + INTERVAL '60 days'),
('Cyklostezka k nádraží', 'Bezpečná cyklostezka spojující centrum města s vlakovým nádražím. Délka 1,2 km.', '2,1 mil. Kč', 'Doprava', NOW() + INTERVAL '60 days');

-- Ukázkové kandidátky
INSERT INTO candidates (name, role, bio, order_num) VALUES
('Jana Nováková', 'Předsedkyně sdružení', 'Pedagožka a matka tří dětí. Žiji ve Strážnici 20 let a záleží mi na tom, aby zde bylo příjemně žít pro všechny.', 1),
('Marie Svobodová', 'Místopředsedkyně', 'Zdravotní sestra v důchodu. Bojuji za lepší péči o seniory a bezbariérový přístup v celém městě.', 2),
('Petra Horváthová', 'Členka týmu', 'Podnikatelka. Chci podpořit místní kulturu, folklór a turistický ruch ve Strážnici.', 3),
('Lucie Blahová', 'Členka týmu', 'Architektka. Věřím, že krásné veřejné prostory dělají město živým a příjemným.', 4),
('Eva Martínková', 'Členka týmu', 'Učitelka na ZŠ Strážnice. Prioritou jsou pro mě děti, školství a volnočasové aktivity.', 5),
('Hana Červenková', 'Členka týmu', 'Zahradnice a enviromentální aktivistka. Pracuji na zlepšení zeleně a ekologie.', 6),
('Věra Poláková', 'Členka týmu', 'Ekonomka. Zaměřuji se na transparentní hospodaření a efektivní využití rozpočtu.', 7),
('Alena Krejčí', 'Členka týmu', 'Právnička. Dbám na dodržování práv občanů a transparentnost rozhodování.', 8),
('Soňa Vlčková', 'Členka týmu', 'Sociální pracovnice. Pomáhám rodinám v nouzi a starám se o komunitní život.', 9);

-- Ukázkové FB příspěvky  
INSERT INTO fb_posts (title, description, fb_url) VALUES
('Setkání s občany – duben 2024', 'Navštívily jsme setkání s občany na náměstí Svobody. Diskutovaly jsme o projektech. Děkujeme za účast!', 'https://www.facebook.com/zijemetu'),
('Folklórní festival Strážnice 2024', 'Byly jsme součástí letošního folklórního festivalu. Strážnice je naše město a jsme na něj hrdé!', 'https://www.facebook.com/zijemetu');
