import React, { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { DocsSidebar } from './DocsSidebar';
import { OnThisPage } from './OnThisPage';
import { Input } from '../../../package/components/Input/Input';
import { Button } from '../../../package/components/Button/Button';
import componentsMeta from '../../data/components.json';
import backgroundsMeta from '../../data/backgrounds.json';
import './DocsLayout.css';

const frameworks = [
  { id: 'nextjs', name: 'Next.js' },
  { id: 'vite', name: 'Vite' },
  { id: 'remix', name: 'Remix' },
  { id: 'astro', name: 'Astro' },
  { id: 'gatsby', name: 'Gatsby' },
  { id: 'manual', name: 'Manual' },
];

export const DocsLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');

  const docsRoutes = useMemo(() => [
    { path: '/docs/quick-start', name: 'Quick Start' },
    ...frameworks.map(fw => ({
      path: `/docs/quick-start/${fw.id}`,
      name: `Quick Start - ${fw.name}`
    })),
    { path: '/docs/components', name: 'Components Overview' },
    ...[...componentsMeta].sort((a, b) => a.name.localeCompare(b.name)).map(c => ({
      path: c.path.replace(/^\/components/, '/docs/components'),
      name: c.name
    })),
    { path: '/docs/backgrounds', name: 'Backgrounds Overview' },
    ...[...backgroundsMeta].sort((a, b) => a.name.localeCompare(b.name)).map(b => ({
      path: b.path.replace(/^\/backgrounds/, '/docs/backgrounds'),
      name: b.name
    }))
  ], []);

  const currentIndex = docsRoutes.findIndex(r => r.path === currentPath);
  const prevRoute = currentIndex > 0 ? docsRoutes[currentIndex - 1] : null;
  const nextRoute = currentIndex !== -1 && currentIndex < docsRoutes.length - 1 ? docsRoutes[currentIndex + 1] : null;

  return (
    <div className="docs-layout-wrapper">
      <div className="docs-layout-container">
        <DocsSidebar />

        <div className="docs-content-area">
          {currentIndex !== -1 && (
            <div
              className="docs-global-nav-bar"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1.25rem',
                gap: '1.5rem'
              }}
            >
              <div
                onClick={() => window.dispatchEvent(new CustomEvent('open-docs-search'))}
                style={{ width: '220px', cursor: 'pointer' }}
              >
                <Input
                  inputReadOnly
                  inputVariant="outlined"
                  inputSize="sm"
                  inputLeftIcon={<Search size={14} />}
                  inputKbd="⌘K"
                  inputPlaceholder="Search..."
                  inputStyle={{ cursor: 'pointer' }}
                  inputFullWidth
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button
                  buttonVariant="duo"
                  buttonSize="sm"
                  buttonIcon={<ArrowLeft size={14} />}
                  buttonDisabled={!prevRoute}
                  buttonOnClick={() => prevRoute && navigate(prevRoute.path)}
                />
                <Button
                  buttonVariant="duo"
                  buttonSize="sm"
                  buttonIcon={<ArrowRight size={14} />}
                  buttonDisabled={!nextRoute}
                  buttonOnClick={() => nextRoute && navigate(nextRoute.path)}
                />
              </div>
            </div>
          )}

          <Outlet />
        </div>

        <OnThisPage />
      </div>
    </div>
  );
};
