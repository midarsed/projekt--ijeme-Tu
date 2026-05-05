-- Aktualizace Facebook URL pro příspěvky
UPDATE fb_posts SET fb_url = 'https://www.facebook.com/profile.php?id=61586332845379' WHERE fb_url = 'https://www.facebook.com/zijemetu';

-- Přidání thumbnail_url pro lepší zobrazení
UPDATE fb_posts SET thumbnail_url = 'https://picsum.photos/seed/zijemetu1/400/300.jpg' WHERE title = 'Setkání s občany – duben 2024';
UPDATE fb_posts SET thumbnail_url = 'https://picsum.photos/seed/zijemetu2/400/300.jpg' WHERE title = 'Folklórní festival Strážnice 2024';

-- Zkontrolujte výsledek
SELECT id, title, fb_url, thumbnail_url FROM fb_posts;
