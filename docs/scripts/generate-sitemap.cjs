const fs = require('fs');
const path = require('path');

const domain = 'https://ui.unbrn.tech';
const docsComponentsDir = path.resolve(__dirname, '../pages/components');
const docsBackgroundsDir = path.resolve(__dirname, '../pages/backgrounds');
const distDocsDir = path.resolve(__dirname, '../../dist-docs');

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

console.log('=== STARTING SITEMAP AND ROBOTS.TXT GENERATOR ===');

if (!fs.existsSync(distDocsDir)) {
  fs.mkdirSync(distDocsDir, { recursive: true });
}

const urls = [
  { loc: `${domain}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${domain}/docs/quick-start`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${domain}/docs/components`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${domain}/docs/backgrounds`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${domain}/docs/changelog`, changefreq: 'weekly', priority: '0.8' },
];

if (fs.existsSync(docsComponentsDir)) {
  const files = fs.readdirSync(docsComponentsDir);
  files.forEach(file => {
    if (file.endsWith('Page.tsx')) {
      const componentName = file.replace('Page.tsx', '');
      const route = `/docs/components/${toKebabCase(componentName)}`;
      urls.push({
        loc: `${domain}${route}`,
        changefreq: 'weekly',
        priority: '0.7'
      });
    }
  });
}

if (fs.existsSync(docsBackgroundsDir)) {
  const files = fs.readdirSync(docsBackgroundsDir);
  files.forEach(file => {
    if (file.endsWith('Page.tsx')) {
      const backgroundName = file.replace('Page.tsx', '');
      const route = `/docs/backgrounds/${toKebabCase(backgroundName)}`;
      urls.push({
        loc: `${domain}${route}`,
        changefreq: 'weekly',
        priority: '0.7'
      });
    }
  });
}

// Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${url.loc}</loc>\n`;
  sitemapXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${url.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(distDocsDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`- Generated sitemap.xml with ${urls.length} URLs in: ${path.join(distDocsDir, 'sitemap.xml')}`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.join(distDocsDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log(`- Generated robots.txt in: ${path.join(distDocsDir, 'robots.txt')}`);

console.log('=== SITEMAP AND ROBOTS.TXT GENERATOR COMPLETE ===');
