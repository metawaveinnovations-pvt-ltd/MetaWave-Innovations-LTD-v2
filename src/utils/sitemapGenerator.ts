import { ROUTES_DATA } from '../data/routesData';

export function generateSitemapXml(): string {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const urlEntries = ROUTES_DATA.map(route => {
    return `  <url>
    <loc>${route.canonical}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  const xmlFooter = `\n</urlset>`;

  return `${xmlHeader}\n${urlEntries}${xmlFooter}\n`;
}
