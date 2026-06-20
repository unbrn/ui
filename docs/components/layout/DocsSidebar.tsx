import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import componentsMeta from '../../data/components.json';
import backgroundsMeta from '../../data/backgrounds.json';

const frameworks = [
  { id: 'nextjs', name: 'Next.js' },
  { id: 'vite', name: 'Vite' },
  { id: 'remix', name: 'Remix' },
  { id: 'astro', name: 'Astro' },
  { id: 'gatsby', name: 'Gatsby' },
  { id: 'manual', name: 'Manual' },
];

export const DocsSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleToggle = () => setIsOpen((v) => !v);
    window.addEventListener('toggle-docs-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-docs-sidebar', handleToggle);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open-lock', isOpen);
    window.dispatchEvent(new CustomEvent('docs-sidebar-state', { detail: { isOpen } }));
    return () => document.body.classList.remove('sidebar-open-lock');
  }, [isOpen]);

  const sortedComponents = [...componentsMeta].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedBackgrounds = [...backgroundsMeta].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const isComponentNew = (addedAtString: string) => {
    const addedDate = new Date(addedAtString);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - addedDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 5;
  };

  return (
    <>

      {isOpen && (
        <div
          className="docs-sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="docs-sidebar-inner" aria-label="Documentation">

          <div className="sidebar-tree-branch">
            <NavLink
              to="/docs/quick-start"
              end
              className={({ isActive }) =>
                `sidebar-branch-header sidebar-branch-link ${isActive ? 'active' : ''}`
              }
            >
              Quick Start
            </NavLink>

            <div className="sidebar-sub-links">
              {frameworks.map((fw) => (
                <NavLink
                  key={fw.id}
                  to={`/docs/quick-start/${fw.id}`}
                  className={({ isActive }) =>
                    `sidebar-sub-link ${isActive ? 'active' : ''}`
                  }
                >
                  {fw.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="sidebar-tree-branch">
            <NavLink
              to="/docs/changelog"
              end
              className={({ isActive }) =>
                `sidebar-branch-header sidebar-branch-link ${isActive ? 'active' : ''}`
              }
            >
              Changelog
            </NavLink>
          </div>

          <div className="sidebar-tree-branch">
            <NavLink
              to="/docs/components"
              end
              className={({ isActive }) =>
                `sidebar-branch-header sidebar-branch-link ${isActive ? 'active' : ''}`
              }
            >
              Components
            </NavLink>

            <div className="sidebar-sub-links">
              {sortedComponents.map((comp) => {
                const docsPath = comp.path.replace(
                  /^\/components/,
                  '/docs/components'
                );
                return (
                  <NavLink
                    key={comp.name}
                    to={docsPath}
                    className={({ isActive }) =>
                      `sidebar-sub-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {comp.name}
                    {isComponentNew(comp.addedAt) && (
                      <span className="sidebar-new-badge">NEW</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="sidebar-tree-branch">
            <NavLink
              to="/docs/backgrounds"
              end
              className={({ isActive }) =>
                `sidebar-branch-header sidebar-branch-link ${isActive ? 'active' : ''}`
              }
            >
              Backgrounds
            </NavLink>

            <div className="sidebar-sub-links">
              {sortedBackgrounds.map((bg) => {
                const docsPath = bg.path.replace(
                  /^\/backgrounds/,
                  '/docs/backgrounds'
                );
                return (
                  <NavLink
                    key={bg.name}
                    to={docsPath}
                    className={({ isActive }) =>
                      `sidebar-sub-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {bg.name}
                    {isComponentNew(bg.addedAt) && (
                      <span className="sidebar-new-badge">NEW</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

        </nav>
      </aside>
    </>
  );
};
