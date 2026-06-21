import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CodeBlock } from '../../package/components/CodeBlock/CodeBlock';

type Framework = 'nextjs' | 'vite' | 'astro' | 'remix' | 'gatsby' | 'manual' | null;

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
        title: '1. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your root layout',
        code: `
import '@unbrn/ui/styles.css';

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
        code: `
'use client';

import { Button } from '@unbrn/ui/Button';
import { Badge } from '@unbrn/ui/Badge';

export default function Home() {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      <Button buttonVariant="filled" buttonChildren="Get Started" />
      <Button buttonVariant="outlined" buttonChildren="Learn More" />
      <Badge badgeVariant="duo" badgeChildren="NEW" />
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
        title: '1. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your entry file',
        code: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@unbrn/ui/styles.css';
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
        code: `
import { Button } from '@unbrn/ui/Button';
import { Alert } from '@unbrn/ui/Alert';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button buttonVariant="filled" buttonChildren="Click Me" />
      <Alert alertAccentColor="green" alertTitle="Success!" alertDescription="Everything is working." />
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
        title: '1. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in your root',
        code: `
import '@unbrn/ui/styles.css';

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
        code: `
import { Button } from '@unbrn/ui/Button';
import { Badge } from '@unbrn/ui/Badge';

export default function Index() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button buttonVariant="duo" buttonChildren="Remix + Unbrn" />
      <Badge badgeChildren="v0.1.0" />
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
        title: '2. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '3. Import styles in your layout',
        code: `---

import '@unbrn/ui/styles.css';
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

import Layout from '../layouts/Layout.astro';
import { Button } from '@unbrn/ui/Button';
---

<Layout>
  <div style="padding: 2rem;">
    <Button client:load buttonVariant="filled" buttonChildren="Interactive Button" />
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
        title: '1. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '2. Import styles in gatsby-browser',
        code: `
import '@unbrn/ui/styles.css';`,
        language: 'javascript',
        note: 'Set data-theme and data-accent on the <html> element via gatsby-ssr.js or a layout component.',
      },
      {
        title: '3. Use components in any page',
        code: `
import { Button } from '@unbrn/ui/Button';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <Button buttonVariant="filled" buttonAccentColor="green" buttonChildren="Gatsby + Unbrn" />
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
        title: '1. Install @unbrn/ui',
        code: 'npm install @unbrn/ui',
        language: 'bash',
      },
      {
        title: '2. Import the stylesheet',
        code: `import '@unbrn/ui/styles.css';`,
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
        code: `import { Button } from '@unbrn/ui/Button';
import { Alert } from '@unbrn/ui/Alert';
import { Badge } from '@unbrn/ui/Badge';
import { Avatar } from '@unbrn/ui/Avatar';
import { Accordion } from '@unbrn/ui/Accordion';
import { Checkbox } from '@unbrn/ui/Checkbox';
import { Switch } from '@unbrn/ui/Switch';
import { Select } from '@unbrn/ui/Select';
import { Dock } from '@unbrn/ui/Dock';
import { CodeBlock } from '@unbrn/ui/CodeBlock';`,
        language: 'javascript',
      },
    ],
  },
};

export const InstallationPage: React.FC = () => {
  const { framework } = useParams<{ framework: string }>();
  const selected = framework as Framework;

  if (selected && frameworkGuides[selected]) {
    const guide = frameworkGuides[selected];
    const fw = frameworks.find(f => f.id === selected)!;

    return (
      <div className="installation-page">
        <h2 className="section-title">
          {fw.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '3rem', lineHeight: '1.6' }}>
          Follow these simple steps to get <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>@unbrn/ui</span> running in your {fw.name} app.
        </p>

        <div className="install-steps">
          {guide.steps.map((step, i) => (
            <div key={i} className="install-step">
              <div className="install-step-header">
                <h3 className="install-step-title">{step.title}</h3>
              </div>
              {step.language === 'bash' && step.code.includes('@unbrn/ui') ? (
                <CodeBlock
                  codeBlockDefaultTab="npm"
                  codeBlockTabs={{
                    npm: step.code,
                    pnpm: step.code.replace('npm install', 'pnpm add').replace('npx', 'pnpm dlx'),
                    yarn: step.code.replace('npm install', 'yarn add').replace('npx', 'yarn dlx'),
                    bun: step.code.replace('npm install', 'bun add').replace('npx', 'bunx'),
                  }}
                />
              ) : (
                <CodeBlock
                  codeBlockCode={step.code}
                  codeBlockLanguage={step.language}
                  codeBlockVariant="filled"
                />
              )}
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
      <h2 className="section-title">Quick Start</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem' }}>
        Get started with @unbrn/ui in less than a minute. Our components work seamlessly out of the box in any modern React application.
      </p>

      <div className="install-steps" style={{ marginBottom: '5rem' }}>
        <div className="install-step">
          <h3 className="install-step-title">1. Install package</h3>
          <CodeBlock
            codeBlockDefaultTab="npm"
            codeBlockTabs={{
              npm: 'npm install @unbrn/ui',
              pnpm: 'pnpm add @unbrn/ui',
              yarn: 'yarn add @unbrn/ui',
              bun: 'bun add @unbrn/ui',
            }}
          />
        </div>

        <div className="install-step">
          <h3 className="install-step-title">2. Import styles</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
            Import Unbrn UI's main stylesheet at the top of your root or entry file (e.g., <code style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>main.tsx</code>, <code style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>index.js</code>, or <code style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>layout.tsx</code>):
          </p>
          <CodeBlock
            codeBlockCode="import '@unbrn/ui/styles.css';"
            codeBlockLanguage="tsx"
            codeBlockVariant="filled"
          />
        </div>

        <div className="install-step">
          <h3 className="install-step-title">3. Render components</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
            Now you can import and render any components in your application:
          </p>
          <CodeBlock
            codeBlockCode={`import { Button } from '@unbrn/ui/Button';
import { Badge } from '@unbrn/ui/Badge';

export default function App() {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      <Button buttonVariant="filled" buttonChildren="Get Started" />
      <Badge badgeVariant="duo" badgeChildren="NEW" />
    </div>
  );
}`}
            codeBlockLanguage="tsx"
            codeBlockVariant="filled"
          />
        </div>

        <div className="install-step">
          <h3 className="install-step-title">4. Customize theme dynamically</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
            Instead of overriding CSS variables manually, you can use the built-in theming engine to dynamically customize colors, radius, and borders in JavaScript:
          </p>
          <CodeBlock
            codeBlockCode={`import { applyTheme } from '@unbrn/ui/theme';

// Apply a custom theme dynamically on the document root
applyTheme({
  bgMain: '#0f172a',
  bgSecondary: '#1e293b',
  borderColor: '#334155',
  accentColor: '#3b82f6',
  radius: '12px'
});`}
            codeBlockLanguage="tsx"
            codeBlockVariant="filled"
          />
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Framework Guides</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Choose your framework below for deep integrations, SSR setups, and customized configurations.
        </p>

        <div className="component-catalog-grid">
          {frameworks.map(fw => (
            <Link
              key={fw.id}
              to={`/docs/quick-start/${fw.id}`}
              className="component-catalog-card"
              style={{ textDecoration: 'none' }}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
