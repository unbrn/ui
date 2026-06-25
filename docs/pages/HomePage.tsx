import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '../../package/components/Button/Button';
import { LiquidChrome } from '../../package/backgrounds/LiquidChrome/LiquidChrome';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <LiquidChrome
        className="home-chroma-bg"
        speed={1}
        interactive={false}
        primaryColor={theme === 'dark' ? '#ffffff' : '#000000'}
        secondaryColor={theme === 'dark' ? '#0a0a0a' : '#ffffff'}
      />

      <div className="home-page">
        <div className="home-page-container">
          <section className="hero-section">
            <h1 className="hero-title">
              Minimalist UI<br /><span className="hero-accent">Crafted with Precision.</span>
            </h1>

            <p className="hero-subtitle">
              A clean, modern React component library built with vanilla CSS. Get beautiful, highly-customizable components that look great out of the box.
            </p>

            <div className="hero-actions">
              <Button
                buttonVariant="filled"
                buttonSize="lg"
                buttonIcon={<ArrowRight size={16} />}
                buttonIconPosition="right"
                buttonOnClick={() => navigate('/docs/components')}
                buttonChildren="Explore Components"
              />
              <Button
                buttonVariant="duo"
                buttonSize="lg"
                buttonIcon={<GitBranch size={16} />}
                buttonIconPosition="left"
                buttonOnClick={() => window.open('https://github.com/unbrn/ui', '_blank', 'noopener,noreferrer')}
                buttonChildren="GitHub"
              />
            </div>
          </section>
        </div>
      </div>

      <footer className="unbrn-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
              <svg width="20" height="20" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)" />
                <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)" />
              </svg>
              <span>unbrn/ui</span>
            </Link>
            <p className="footer-description">
              A clean, modern React component library crafted with precision and vanilla CSS.
            </p>
            <div className="footer-socials">
              <a href="https://discord.gg/W8wTjESM3t" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.87-.64,1.71-1.32,2.51-2a75.76,75.76,0,0,0,72.6,0c.8.7,1.64,1.38,2.51,2a68.43,68.43,0,0,1-10.4,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.93,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                </svg>
              </a>
              <a href="https://x.com/unbrntech" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://github.com/unbrn/ui" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-col">
              <div className="footer-col-title">Library</div>
              <Link to="/docs/quick-start">Quick Start</Link>
              <Link to="/docs/components">Components</Link>
            </div>
            <div className="footer-links-col">
              <div className="footer-col-title">Resources</div>
              <a href="https://www.npmjs.com/package/@unbrn/ui" target="_blank" rel="noopener noreferrer">npm Registry</a>
              <a href="https://github.com/unbrn/ui/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a>
              <a href="https://github.com/unbrn/ui/issues" target="_blank" rel="noopener noreferrer">Support</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} UNBRN UI. ALL RIGHTS RESERVED.
          </span>
          <span className="footer-made-by">
            Crafted with precision
          </span>
        </div>
      </footer>
    </>
  );
};
