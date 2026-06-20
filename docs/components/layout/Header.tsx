import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../../../package/components/Button/Button';
import { cn } from '../../../package/lib/utils';
import './Header.css';
import { Input } from '../../../package/components/Input/Input';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  className
}) => {
  const location = useLocation();
  const isDocsRoute = location.pathname.startsWith('/docs');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };
    window.addEventListener('docs-sidebar-state', handleState);
    return () => window.removeEventListener('docs-sidebar-state', handleState);
  }, []);

  useEffect(() => {
    if (!isDocsRoute) {
      const timer = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDocsRoute]);

  return (
    <header className={cn("unbrn-header", className)}>
      <div className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isDocsRoute && (
              <button
                className={cn("docs-sidebar-mobile-hamburger", isSidebarOpen && "is-open")}
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-docs-sidebar'))}
                aria-label="Toggle sidebar navigation"
              >
                <div className="hamburger-box">
                  <div className="hamburger-inner line-top" />
                  <div className="hamburger-inner line-bottom" />
                </div>
              </button>
            )}
            <div className="unbrn-logo" style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
              <svg width="20" height="20" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)"/>
                <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)"/>
              </svg>
              <span>unbrn/ui</span>
            </div>
          </div>

          <nav className="header-nav-links">
            <Link to="/docs/components" className={cn("header-nav-link", location.pathname.startsWith('/docs/components') && "active")}>
              Components
            </Link>
            <Link to="/docs/changelog" className={cn("header-nav-link", location.pathname.startsWith('/docs/changelog') && "active")}>
              Changelog
            </Link>
          </nav>
        </div>

        <div className="unbrn-header-actions">
          <div
            onClick={() => window.dispatchEvent(new CustomEvent('open-docs-search'))}
            style={{ width: '220px', cursor: 'pointer' }}
            className="header-search-wrapper"
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

          <a href="https://discord.gg/W8wTjESM3t" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              buttonVariant="filled"
              buttonSize="sm"
              buttonAccentColor="#5865F2"
              buttonIcon={
                <svg width="14" height="14" viewBox="0 0 127.14 96.36" fill="currentColor" style={{ display: 'block' }}>
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.9-.66,1.76-1.37,2.58-2.1a75.52,75.52,0,0,0,72.6,0c.82.73,1.68,1.44,2.58,2.1a68.43,68.43,0,0,1-10.4,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,48.12,122.57,25.29,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                </svg>
              }
            >
              Discord
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
