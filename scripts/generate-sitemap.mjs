// Generates dist/sitemap.xml after the SSG build by scanning the pre-rendered
// HTML files, so the sitemap always matches exactly what was built.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://www.indianbravehearts.com';
const distDir = fileURLToPath(new URL('../dist', import.meta.url));

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html') && name !== '404.html') htmlFiles.push(full);
  }
};
walk(distDir);

const toUrl = (file) => {
  const rel = relative(distDir, file).split(sep).join('/');
  const path = rel === 'index.html' ? '/' : `/${rel.replace(/\.html$/, '')}`;
  return `${SITE_URL}${path}`;
};

const urls = htmlFiles.map(toUrl).sort();
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(distDir, 'sitemap.xml'), xml);
console.log(`[sitemap] wrote ${urls.length} URLs to dist/sitemap.xml`);
