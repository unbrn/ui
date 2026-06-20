import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    </>
  );
};
