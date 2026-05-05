-- Přidání dalších ukázkových projektů
INSERT INTO projects (title, description, cost, category, voting_ends_at) VALUES
('Nové osvětlení ulic', 'Moderní LED osvětlení v ulicích Míru, 17. listopadu a Nádražní. Úspora energie a lepší bezpečnost.', '1,5 mil. Kč', 'Infrastruktura', NOW() + INTERVAL '60 days'),
('Kulturní dům rekonstrukce', 'Obnova fasády a střechy kulturního domu, nové vytápění a bezbariérový vstup.', '4,2 mil. Kč', 'Kultura', NOW() + INTERVAL '60 days'),
('Sportovní areál', 'Nové víceúčelové hřiště pro volejbal, basketbal a nohejbal s tribunami.', '1,1 mil. Kč', 'Sport', NOW() + INTERVAL '60 days'),
('Zelené parky', 'Výsadba nových stromů v parcích a vytvoření relaxačních zón s lavičkami.', '600 tis. Kč', 'Zelená', NOW() + INTERVAL '60 days'),
('Městská knihovna', 'Modernizace knihovny, nové počítače a studovna pro studenty.', '800 tis. Kč', 'Vzdělávání', NOW() + INTERVAL '60 days');

-- Přidání dalších Facebook příspěvků/videí
INSERT INTO fb_posts (title, description, fb_url, thumbnail_url) VALUES
('Jarmark na náměstí', 'Tradiční velikonoční jarmark na náměstí Svobody. Nádherná atmosféra a spousta stánků.', 'https://www.facebook.com/zijemetu/videos/123456', 'https://placehold.co/400x300/4CAF50/white?text=Jarmark'),
('Čištění řeky', 'Společné úklidové akce u řeky Strážnice. Děkujeme všem dobrovolníkům!', 'https://www.facebook.com/zijemetu/posts/789012', 'https://placehold.co/400x300/2196F3/white?text=Čištění+řeky'),
('Dětský den 2024', 'Nádherný den plný her, soutěží a smíchu pro naše nejmenší občany.', 'https://www.facebook.com/zijemetu/videos/345678', 'https://placehold.co/400x300/FF9800/white?text=Dětský+den'),
('Setkání seniorů', 'Příjemné odpoledne pro seniory s občerstvením a kulturním programem.', 'https://www.facebook.com/zijemetu/posts/901234', 'https://placehold.co/400x300/9C27B0/white?text=Senioři'),
('Výstava vín', 'Oslava vinařské tradice Strážnice. Výborná vína a skvělá nálada.', 'https://www.facebook.com/zijemetu/videos/567890', 'https://placehold.co/400x300/F44336/white?text=Vína'),
('Adventní koncert', 'Krásný vánoční koncert v kostele sv. Michala. Děkujeme všem účinkujícím!', 'https://www.facebook.com/zijemetu/posts/234567', 'https://placehold.co/400x300/795548/white?text=Koncert');
