import React, { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type Framework = 'nextjs' | 'vite' | 'astro' | 'remix' | 'gatsby' | 'manual' | null;

const unburnTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': { color: 'var(--text-main)', background: 'none', fontFamily: 'var(--font-mono)' },
  'pre[class*="language-"]': { color: 'var(--text-main)', background: 'none', fontFamily: 'var(--font-mono)' },
  'comment': { color: 'var(--text-muted)' },
  'prolog': { color: 'var(--text-muted)' },
  'doctype': { color: 'var(--text-muted)' },
  'cdata': { color: 'var(--text-muted)' },
  'punctuation': { color: 'var(--text-main)', opacity: 0.7 },
  'namespace': { opacity: 0.7 },
  'property': { color: 'var(--accent-color)' },
  'tag': { color: 'var(--accent-color)' },
  'boolean': { color: 'var(--accent-color)' },
  'number': { color: 'var(--accent-color)' },
  'constant': { color: 'var(--accent-color)' },
  'symbol': { color: 'var(--accent-color)' },
  'deleted': { color: 'var(--color-red)' },
  'selector': { color: 'var(--color-green)' },
  'attr-name': { color: 'var(--accent-color)' },
  'string': { color: 'var(--color-green)' },
  'char': { color: 'var(--color-green)' },
  'builtin': { color: 'var(--color-green)' },
  'inserted': { color: 'var(--color-green)' },
  'operator': { color: 'var(--text-main)' },
  'entity': { color: 'var(--text-main)', cursor: 'help' },
  'url': { color: 'var(--text-main)' },
  'variable': { color: 'var(--text-main)' },
  'atrule': { color: 'var(--accent-color)' },
  'attr-value': { color: 'var(--color-green)' },
  'function': { color: 'var(--color-blue)' },
  'keyword': { color: 'var(--accent-color)' },
  'regex': { color: 'var(--color-orange)' },
  'important': { fontWeight: 'bold' },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
};

const frameworks: { id: Framework; name: string; icon: string }[] = [
  { id: 'nextjs', name: 'Next.js', icon: 'N' },
  { id: 'vite', name: 'Vite', icon: 'V' },
  { id: 'remix', name: 'Remix', icon: 'R' },
  { id: 'astro', name: 'Astro', icon: 'A' },
  { id: 'gatsby', name: 'Gatsby', icon: 'G' },
  { id: 'manual', name: 'Manual', icon: 'M' },
];

const frameworkGuides: Record<string, { steps: { title: string; code: string; language: string; note?: string }[] }> = {
  nextjs: {
    steps: [
      {
        title: '1. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your root layout',
        code: `// app/layout.tsx
import '@unburn/ui/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-accent="green">
      <body>{children}</body>
    </html>
  );
}`,
        language: 'tsx',
        note: 'Add data-theme and data-accent attributes to <html> to activate theming.',
      },
      {
        title: '3. Use components',
        code: `// app/page.tsx
'use client';

import { Button, Badge } from '@unburn/ui';

export default function Home() {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      <Button variant="filled">Get Started</Button>
      <Button variant="outlined">Learn More</Button>
      <Badge variant="duo">NEW</Badge>
    </div>
  );
}`,
        language: 'tsx',
        note: "Components using state (like Accordion) require the 'use client' directive in Next.js App Router.",
      },
    ],
  },
  vite: {
    steps: [
      {
        title: '1. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your entry file',
        code: `// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@unburn/ui/styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        language: 'tsx',
        note: 'Set data-theme="dark" and data-accent="green" on your <html> element in index.html.',
      },
      {
        title: '3. Use components',
        code: `// src/App.tsx
import { Button, Alert } from '@unburn/ui';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button variant="filled">Click Me</Button>
      <Alert status="success" title="Success!" description="Everything is working." />
    </div>
  );
}

export default App;`,
        language: 'tsx',
      },
    ],
  },
  remix: {
    steps: [
      {
        title: '1. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your root',
        code: `// app/root.tsx
import '@unburn/ui/styles.css';

export default function App() {
  return (
    <html lang="en" data-theme="dark" data-accent="green">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}`,
        language: 'tsx',
      },
      {
        title: '3. Use components in any route',
        code: `// app/routes/_index.tsx
import { Button, Badge } from '@unburn/ui';

export default function Index() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button variant="duo">Remix + Unburn</Button>
      <Badge>v0.1.0</Badge>
    </div>
  );
}`,
        language: 'tsx',
      },
    ],
  },
  astro: {
    steps: [
      {
        title: '1. Add React integration',
        code: 'npx astro add react',
        language: 'bash',
        note: 'Astro requires a framework integration to render React components.',
      },
      {
        title: '2. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '3. Import styles in your layout',
        code: `---
// src/layouts/Layout.astro
import '@unburn/ui/styles.css';
---

<html lang="en" data-theme="dark" data-accent="green">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <slot />
  </body>
</html>`,
        language: 'astro',
      },
      {
        title: '4. Use components with client directive',
        code: `---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import { Button } from '@unburn/ui';
---

<Layout>
  <div style="padding: 2rem;">
    <Button client:load variant="filled">Interactive Button</Button>
  </div>
</Layout>`,
        language: 'astro',
        note: 'Use client:load or client:visible to hydrate React components in Astro.',
      },
    ],
  },
  gatsby: {
    steps: [
      {
        title: '1. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in gatsby-browser',
        code: `// gatsby-browser.js
import '@unburn/ui/styles.css';`,
        language: 'javascript',
        note: 'Set data-theme and data-accent on the <html> element via gatsby-ssr.js or a layout component.',
      },
      {
        title: '3. Use components in any page',
        code: `// src/pages/index.tsx
import { Button, Accordion } from '@unburn/ui';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button variant="filled" color="green">Gatsby + Unburn</Button>
    </div>
  );
}`,
        language: 'tsx',
      },
    ],
  },
  manual: {
    steps: [
      {
        title: '1. Install @unburn/ui',
        code: 'npm install @unburn/ui',
        language: 'bash',
      },
      {
        title: '2. Import the stylesheet',
        code: `import '@unburn/ui/styles.css';`,
        language: 'javascript',
        note: 'This single import includes all design tokens and component styles.',
      },
      {
        title: '3. Set theme attributes on your root HTML element',
        code: `<!-- index.html -->
<html data-theme="dark" data-accent="green">
  ...
</html>`,
        language: 'html',
        note: 'Available themes: light, dark. Available accents: red, orange, blue, green, purple, white, black.',
      },
      {
        title: '4. Import and use components',
        code: `import { Button, Alert, Badge, Avatar, Accordion, Dock } from '@unburn/ui';`,
        language: 'javascript',
      },
    ],
  },
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="install-copy-btn" onClick={handleCopy}>
      {copied ? <Check size={14} style={{ color: 'var(--color-green)' }} /> : <Copy size={14} />}
      {copied ? 'COPIED' : 'COPY'}
    </button>
  );
};

export const InstallationPage: React.FC = () => {
  const [selected, setSelected] = useState<Framework>(null);

  if (selected && frameworkGuides[selected]) {
    const guide = frameworkGuides[selected];
    const fw = frameworks.find(f => f.id === selected)!;

    return (
      <div className="installation-page">
        <button className="install-back-btn" onClick={() => setSelected(null)}>
          <ArrowLeft size={16} />
          <span>CHOOSE FRAMEWORK</span>
        </button>

        <h2 className="section-title" style={{ marginTop: '2rem' }}>
          {fw.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '3rem', lineHeight: '1.6' }}>
          Follow these steps to set up <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>@unburn/ui</span> in your {fw.name} project.
        </p>

        <div className="install-steps">
          {guide.steps.map((step, i) => (
            <div key={i} className="install-step">
              <div className="install-step-header">
                <h3 className="install-step-title">{step.title}</h3>
              </div>
              <div className="install-code-block-wrapper">
                <CopyButton text={step.code} />
                <SyntaxHighlighter
                  language={step.language}
                  style={unburnTheme}
                  showLineNumbers={true}
                  lineNumberStyle={{ 
                    minWidth: '2.5rem', 
                    paddingRight: '1rem', 
                    color: 'var(--text-muted)', 
                    textAlign: 'right',
                    opacity: 0.5,
                    borderRight: '1px solid var(--border-color)',
                    marginRight: '1rem',
                    userSelect: 'none'
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem 0',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {step.code}
                </SyntaxHighlighter>
              </div>
              {step.note && (
                <p className="install-step-note">{step.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="installation-page">
      <h2 className="section-title">Installation</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4rem', lineHeight: 1.6, maxWidth: '600px' }}>
        Choose your preferred framework to see the integration guide. @unburn/ui is designed to work seamlessly across all modern React environments.
      </p>

      <div className="component-catalog-grid">
        {frameworks.map(fw => (
          <button
            key={fw.id}
            className="component-catalog-card"
            onClick={() => setSelected(fw.id)}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0, background: 'none', outline: 'none', fontFamily: 'inherit' }}
          >
            <div className="catalog-preview-area">
              <div className="framework-icon-container">
                <span className="framework-icon">{fw.icon}</span>
              </div>
            </div>
            <div className="catalog-info-area">
              <h3 className="catalog-title" style={{ fontSize: '1.25rem' }}>{fw.name}</h3>
              <p className="catalog-desc" style={{ marginTop: '0.5rem' }}>Setup guide for {fw.name} projects.</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
