import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface MenuProps {
  isMenuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({
  isMenuOpen = false,
  setMenuOpen = () => { }
}) => {
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Introduction', desc: 'Crafted design philosophy & principles.' },
    { to: '/docs', label: 'Documentation', desc: 'Browse interactive components & installation guides.' },
    { to: 'https://discord.gg/W8wTjESM3t', label: 'Discord', desc: 'Join the community and chat with other developers.', isExternal: true }
  ];

  return (
    <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
      <div className="menu-overlay-container unbrn-glass">
        <div className="menu-nav-panel">
          <nav className="menu-overlay-content">
            {navLinks.map((link, index) => {
              const className = `menu-overlay-link ${link.isExternal ? 'discord-touch' : ''}`;
              const delayStyle = { animationDelay: `${index * 0.08}s` } as React.CSSProperties;

              const linkContent = (
                <>
                  <div className="active-indicator" />
                  <div className="menu-link-left">
                    <span className="menu-overlay-link-number">0{index + 1}</span>
                    <div className="menu-link-text-group">
                      <span className="menu-overlay-link-text">{link.label}</span>
                      <span className="menu-overlay-link-desc">{link.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="menu-link-arrow" size={20} />
                </>
              );

              if (link.isExternal) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    style={delayStyle}
                  >
                    {linkContent}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={className}
                  style={delayStyle}
                >
                  {linkContent}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
