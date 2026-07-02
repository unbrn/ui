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
    { path: '/docs/changelog', name: 'Changelog' },
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

        <div className="docs-main-column">
          <div
            className="docs-global-nav-bar"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem',
              gap: '1.5rem'
            }}
          >
            <div
              onClick={() => window.dispatchEvent(new CustomEvent('open-docs-search'))}
              style={{ flex: 1, cursor: 'pointer' }}
            >
              <Input
                readOnly
                variant="filled"
                size={3}
                leftIcon={<Search size={14} />}
                kbd="✱ K"
                placeholder="Search documentation..."
                style={{ cursor: 'pointer' }}
                styles={{ container: { height: "56px" } }}
                fullWidth
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button
                variant="filled"
                size={3}
                style={{ width: '56px', height: '56px' }}
                icon={<ArrowLeft size={16} />}
                disabled={!prevRoute}
                onClick={() => prevRoute && navigate(prevRoute.path)}
              />
              <Button
                variant="filled"
                size={3}
                style={{ width: '56px', height: '56px' }}
                icon={<ArrowRight size={16} />}
                disabled={!nextRoute}
                onClick={() => nextRoute && navigate(nextRoute.path)}
              />
            </div>
          </div>

          <div className="docs-content-area">
            <Outlet />
          </div>
        </div>

        <OnThisPage />
      </div>
    </div>
  );
};
