-- Kontrola dat v databázi
SELECT 'projects' as table_name, COUNT(*) as count FROM projects
UNION ALL
SELECT 'candidates' as table_name, COUNT(*) as count FROM candidates
UNION ALL
SELECT 'fb_posts' as table_name, COUNT(*) as count FROM fb_posts;

-- Detaily projektů
SELECT id, title, category FROM projects;

-- Detaily fb_posts
SELECT id, title, thumbnail_url FROM fb_posts;
