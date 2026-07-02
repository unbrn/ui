import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '../../package/components/Button/Button';
import { Footer } from '../components/layout/Footer';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
  });

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
          setTheme(currentTheme || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="home-page">
        <img
          src={theme === 'light' ? '/background-light.svg' : '/background.svg'}
          className="hero-background-img"
          alt=""
        />
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
                variant="filled"
                size={3}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                onClick={() => navigate('/docs/components')}
                children="Explore Components"
              />
              <Button
                variant="duo"
                size={3}
                icon={<GitBranch size={16} />}
                iconPosition="left"
                onClick={() => window.open('https://github.com/unbrn/ui', '_blank', 'noopener,noreferrer')}
                children="GitHub"
              />
            </div>
          </section>
        </div>
      </div>

      <Footer
        logo={
          <svg width="20" height="20" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)" />
            <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)" />
          </svg>
        }
        brandName="unbrn/ui"
        brandHref="/"
        description="A clean, modern React component library crafted with precision and vanilla CSS."
        socials={[
          { icon: 'discord', href: 'https://discord.gg/W8wTjESM3t', label: 'Discord' },
          { icon: 'twitter', href: 'https://x.com/unbrntech', label: 'Twitter' },
          { icon: 'github', href: 'https://github.com/unbrn/ui', label: 'GitHub' }
        ]}
        linksGrid={[
          {
            title: 'Library',
            links: [
              { label: 'Quick Start', href: '/docs/quick-start' },
              { label: 'Components', href: '/docs/components' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'npm Registry', href: 'https://www.npmjs.com/package/@unbrn/ui', external: true },
              { label: 'License', href: 'https://github.com/unbrn/ui/blob/main/LICENSE', external: true },
              { label: 'Support', href: 'https://github.com/unbrn/ui/issues', external: true }
            ]
          }
        ]}
        copyright="© UNBRN UI. ALL RIGHTS RESERVED."
      />
    </>
  );
};
