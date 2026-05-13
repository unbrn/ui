import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileMenuOpen = false, 
  setIsMobileMenuOpen = () => {} 
}) => {
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Introduction' },
    { to: '/installation', label: 'Installation' },
    { to: '/components', label: 'Components' },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile via CSS) */}
      <aside className="unburn-sidebar desktop-only">
        <div className="sidebar-group">
          <h3 className="sidebar-group-title">Getting Started</h3>
          <NavLink to="/" className="sidebar-nav-item">Introduction</NavLink>
          <NavLink to="/installation" className="sidebar-nav-item">Installation</NavLink>
          <NavLink to="/components" className="sidebar-nav-item">Components</NavLink>
        </div>
      </aside>

      {/* Mobile Fullscreen Overlay Nav */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-content">
          {navLinks.map((link, index) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className="mobile-nav-link"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="mobile-link-number">0{index + 1}</span>
              <span className="mobile-link-text">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
