-- Jen INSERT příkazy pro data
INSERT INTO projects (title, description, cost, category, voting_ends_at) VALUES
('Revitalizace náměstí', 'Obnova centrálního náměstí Svobody – nové lavičky, fontána, výsadba stromů a záhonů. Náměstí se stane místem setkávání pro všechny generace.', '3,2 mil. Kč', 'Veřejný prostor', NOW() + INTERVAL '60 days'),
('Oprava chodníků', 'Rekonstrukce rozbitých chodníků v ulicích Úprkova, Kovářská a Příční. Bezpečná chůze pro seniory i rodiče s kočárky.', '1,8 mil. Kč', 'Infrastruktura', NOW() + INTERVAL '60 days'),
('Dětské hřiště u ZŠ', 'Moderní hřiště s bezpečným povrchem, průlezkami a lavičkami přímo u základní školy.', '900 tis. Kč', 'Děti a rodiny', NOW() + INTERVAL '60 days'),
('Cyklostezka k nádraží', 'Bezpečná cyklostezka spojující centrum města s vlakovým nádražím. Délka 1,2 km.', '2,1 mil. Kč', 'Doprava', NOW() + INTERVAL '60 days');

INSERT INTO fb_posts (title, description, fb_url) VALUES
('Setkání s občany – duben 2024', 'Navštívily jsme setkání s občany na náměstí Svobody. Diskutovaly jsme o projektech. Děkujeme za účast!', 'https://www.facebook.com/zijemetu'),
('Folklórní festival Strážnice 2024', 'Byly jsme součástí letošního folklórního festivalu. Strážnice je naše město a jsme na něj hrdé!', 'https://www.facebook.com/zijemetu');
