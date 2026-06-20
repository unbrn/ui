const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tempDir = path.join(__dirname, 'dist-docs-temp');
const docsComponentsDir = path.join(__dirname, 'pages/components');
const docsBackgroundsDir = path.join(__dirname, 'pages/backgrounds');
const docsPagesDir = path.join(__dirname, 'pages');
const outputDir = path.resolve(__dirname, '../dist-docs/pagefind');

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

console.log('=== STARTING UNBRN UI STATIC SEARCH INDEX GENERATOR ===');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

function createHtmlPage(title, route, bodyText) {
  const cleanBody = bodyText
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\{\}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Unbrn UI</title>
</head>
<body>
  <main data-pagefind-body>
    <h1 data-pagefind-meta="title">${title}</h1>
    <span style="display:none;" data-pagefind-meta="url">${route}</span>
    <div class="content">
      ${cleanBody}
    </div>
  </main>
</body>
</html>`;
}

const standardPages = [
  { file: 'InstallationPage.tsx', title: 'Quick Start', route: '/docs/quick-start' },
  { file: 'HomePage.tsx', title: 'Homepage', route: '/' },
  { file: 'ChangelogPage.tsx', title: 'Changelog', route: '/docs/changelog' }
];

standardPages.forEach(p => {
  const filePath = path.join(docsPagesDir, p.file);
  if (fs.existsSync(filePath)) {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const html = createHtmlPage(p.title, p.route, rawContent);
    const outputName = p.file.replace('.tsx', '.html');
    fs.writeFileSync(path.join(tempDir, outputName), html, 'utf-8');
    console.log(`- Created static HTML index page for: ${p.title}`);
  }
});

if (fs.existsSync(docsComponentsDir)) {
  const files = fs.readdirSync(docsComponentsDir);
  files.forEach(file => {
    if (file.endsWith('Page.tsx')) {
      const filePath = path.join(docsComponentsDir, file);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      
      const componentName = file.replace('Page.tsx', '');
      const cleanTitle = componentName.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
      const route = `/docs/components/${toKebabCase(componentName)}`;
      
      const html = createHtmlPage(`${cleanTitle} Component`, route, rawContent);
      const outputName = file.replace('.tsx', '.html');
      fs.writeFileSync(path.join(tempDir, outputName), html, 'utf-8');
      console.log(`- Created static HTML index page for component: ${cleanTitle}`);
    }
  });
}

if (fs.existsSync(docsBackgroundsDir)) {
  const files = fs.readdirSync(docsBackgroundsDir);
  files.forEach(file => {
    if (file.endsWith('Page.tsx')) {
      const filePath = path.join(docsBackgroundsDir, file);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      
      const backgroundName = file.replace('Page.tsx', '');
      const cleanTitle = backgroundName.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
      const route = `/docs/backgrounds/${toKebabCase(backgroundName)}`;
      
      const html = createHtmlPage(`${cleanTitle} Background`, route, rawContent);
      const outputName = file.replace('.tsx', '.html');
      fs.writeFileSync(path.join(tempDir, outputName), html, 'utf-8');
      console.log(`- Created static HTML index page for background: ${cleanTitle}`);
    }
  });
}

console.log('\n=== RUNNING PAGEFIND STATIC INDEXER ===');
try {

  execSync(`npx -y pagefind --site "${tempDir}" --output-path "${outputDir}"`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('\n[SUCCESS] Pagefind index successfully created!');
} catch (err) {
  console.error('\n[ERROR] Pagefind execution failed:', err.message);
}

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
console.log('=== SEARCH INDEX PROCESS COMPLETE ===');
