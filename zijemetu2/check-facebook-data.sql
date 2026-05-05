-- Kontrola Facebook příspěvků
SELECT id, title, fb_url, thumbnail_url FROM fb_posts;

-- Počet příspěvků
SELECT COUNT(*) as total_posts FROM fb_posts;
