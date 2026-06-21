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
            <div className="footer-logo" onClick={() => window.location.href = "/"}>
              <svg width="20" height="20" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)"/>
                <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)"/>
              </svg>
              <span>unbrn/ui</span>
            </div>
            <p className="footer-description">
              A clean, modern React component library crafted with precision and vanilla CSS.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-col">
              <div className="footer-col-title">Library</div>
              <Link to="/docs/quick-start">Quick Start</Link>
              <Link to="/docs/components">Components</Link>
            </div>
            <div className="footer-links-col">
              <div className="footer-col-title">Resources</div>
              <a href="https://github.com/unbrn/ui" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.npmjs.com/package/@unbrn/ui" target="_blank" rel="noopener noreferrer">npm</a>
              <a href="https://github.com/unbrn/ui/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a>
            </div>
            <div className="footer-links-col">
              <div className="footer-col-title">Community</div>
              <a href="https://x.com/kunalkandepatil" target="_blank" rel="noopener noreferrer">Twitter / X</a>
              <a href="https://discord.gg/W8wTjESM3t" target="_blank" rel="noopener noreferrer">Discord</a>
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
