const fs = require('fs');
const path = require('path');

const domain = 'https://ui.unbrn.tech';
const distDocsDir = path.resolve(__dirname, '../../dist-docs');
const componentsPath = path.resolve(__dirname, '../data/components.json');
const backgroundsPath = path.resolve(__dirname, '../data/backgrounds.json');

console.log('=== STARTING SEO META TAG INJECTION AND PRE-RENDERING ===');

if (!fs.existsSync(distDocsDir)) {
  console.error(`Build output directory not found: ${distDocsDir}`);
  process.exit(1);
}

const baseHtmlPath = path.join(distDocsDir, 'index.html');
if (!fs.existsSync(baseHtmlPath)) {
  console.error(`Base index.html not found: ${baseHtmlPath}`);
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
const backgrounds = JSON.parse(fs.readFileSync(backgroundsPath, 'utf-8'));

const pages = [
  // Static pages
  {
    route: '/',
    title: 'Unbrn UI - Minimalist UI Crafted with Precision.',
    description: 'A clean, modern React component library built with vanilla CSS. Get beautiful, highly-customizable components that look great out of the box.',
    image: `${domain}/unbrn_ui_banner.jpg`,
    isHome: true
  },
  {
    route: '/docs/quick-start',
    title: 'Quick Start - unbrn/ui',
    description: 'Get started with Unbrn UI. Install the package and set up styling in your React projects.',
  },
  {
    route: '/docs/components',
    title: 'Components - unbrn/ui',
    description: 'Browse the full collection of premium, softly-rounded React components in Unbrn UI.',
  },
  {
    route: '/docs/backgrounds',
    title: 'Backgrounds - unbrn/ui',
    description: 'Interactive background WebGL shaders to elevate your website aesthetics.',
  },
  {
    route: '/docs/changelog',
    title: 'Changelog - unbrn/ui',
    description: 'See all recent releases, features, improvements, and bug fixes for Unbrn UI.',
  }
];

// Add component pages
components.forEach(item => {
  pages.push({
    route: `/docs${item.path}`,
    title: `${item.name} - unbrn/ui`,
    description: item.description
  });
});

// Add background pages
backgrounds.forEach(item => {
  pages.push({
    route: `/docs${item.path}`,
    title: `${item.name} - unbrn/ui`,
    description: item.description
  });
});

pages.forEach(p => {
  // Determine image URL
  const imageUrl = p.image || `${domain}/og?title=${encodeURIComponent(p.title)}&description=${encodeURIComponent(p.description)}`;
  const pageUrl = `${domain}${p.route}`;

  // Build meta tags HTML block
  const metaHtml = `
  <title>${p.title}</title>
  <meta name="description" content="${p.description}" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.description}" />
  <meta name="twitter:image" content="${imageUrl}" />`;

  // Inject meta tags by replacing the default title tag
  let customHtml = baseHtml.replace('<title>Unbrn UI</title>', metaHtml);

  if (p.isHome) {
    // Write directly to index.html for homepage
    fs.writeFileSync(baseHtmlPath, customHtml, 'utf-8');
    console.log(`- Injected meta tags for Homepage in: ${baseHtmlPath}`);
  } else {
    // Write to /route/index.html
    const relativeFolder = p.route.startsWith('/') ? p.route.substring(1) : p.route;
    const targetFolder = path.join(distDocsDir, relativeFolder);
    fs.mkdirSync(targetFolder, { recursive: true });
    
    const targetHtmlPath = path.join(targetFolder, 'index.html');
    fs.writeFileSync(targetHtmlPath, customHtml, 'utf-8');
    console.log(`- Created pre-rendered HTML page for: ${p.route} in: ${targetHtmlPath}`);
  }
});

console.log('=== SEO META TAG INJECTION COMPLETE ===');
