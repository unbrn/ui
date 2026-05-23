import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Palette, Zap, ArrowRight, ArrowUpRight, GitBranch } from 'lucide-react';
import { CodeBlock } from '../../package/components/CodeBlock/CodeBlock';
import { Badge } from '../../package/components/Badge/Badge';
import { Button } from '../../package/components/Button/Button';

import componentsMeta from '../data/components.json';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [version, setVersion] = useState('v1.1.1');

  // Fetch latest package version from npm registry
  useEffect(() => {
    fetch('https://registry.npmjs.org/@unburn/ui/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.version) {
          setVersion(`v${data.version}`);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch package version:', err);
      });
  }, []);
  // Helper to check if a component is added within 10 days relative to current local date
  const isNewComponent = (addedAtDateStr: string) => {
    const addedDate = new Date(addedAtDateStr);
    const currentDate = new Date();

    // Normalize to UTC midnight to avoid local timezone drift
    const currentUTC = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const addedUTC = Date.UTC(addedDate.getFullYear(), addedDate.getMonth(), addedDate.getDate());

    const diffTime = currentUTC - addedUTC;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= 4;
  };

  return (
    <div className="home-page">
      <div className="viewport-glow"></div>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span>{version} Release</span>
            </div>

            <h1 className="hero-title">
              Minimalist UI<br /><span className="hero-accent">Crafted with Precision.</span>
            </h1>

            <p className="hero-subtitle">
              A clean, modern React component library built with vanilla CSS. Get beautiful, highly-customizable components that look great out of the box.
            </p>

            <div className="hero-actions">
              <Button
                variant="filled"
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                onClick={() => navigate('/components')}
              >
                Explore Components
              </Button>
              <Button
                variant="duo"
                size="lg"
                icon={<GitBranch size={16} />}
                iconPosition="left"
                onClick={() => window.open('https://github.com/unburn/ui', '_blank', 'noopener,noreferrer')}
              >
                GitHub
              </Button>
            </div>
          </div>

        </div>
      </section>

      <div className="home-content">
        <section className="home-section-group">
          <div className="section-index">01 / INSTALLATION</div>
          <h2 className="section-title">Quick Start</h2>
          <div className="quickstart-container">
            <CodeBlock
              defaultTab="npm"
              tabs={{
                pnpm: 'pnpm add @unburn/ui',
                npm: 'npm install @unburn/ui',
                yarn: 'yarn add @unburn/ui',
                bun: 'bun add @unburn/ui'
              }}
            />
          </div>
        </section>

        <section className="home-section-group" style={{ marginTop: '6rem' }}>
          <div className="section-index">02 / CORE PHILOSOPHY</div>
          <h2 className="section-title">Why Unburn UI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Layers size={20} />
              </div>
              <h3 className="feature-title">Easy Styling</h3>
              <p className="feature-desc">
                Every part of our components is exposed. Customize any part using simple <code>styles</code> and <code>classNames</code> props.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Palette size={20} />
              </div>
              <h3 className="feature-title">Color Themes</h3>
              <p className="feature-desc">
                Built using CSS variables. Change colors, layouts, and entire brand themes in seconds with zero effort.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Zap size={20} />
              </div>
              <h3 className="feature-title">Developer First</h3>
              <p className="feature-desc">
                Fully typed with TypeScript, works perfectly with React Server Components, and builds incredibly fast.
              </p>
            </div>
          </div>
        </section>

        <section className="home-section-group" style={{ marginTop: '6rem' }}>
          <div className="section-index">03 / COMPONENT CATALOG</div>
          <h2 className="section-title">Supported Components</h2>
          <p className="catalog-subtitle">
            Explore our collection of beautiful, atomic components designed for speed and flexibility.
          </p>

          <div className="catalog-mini-grid">
            {componentsMeta.map(comp => {
              const isNew = isNewComponent(comp.addedAt);
              return (
                <Link to={comp.path} key={comp.name} className="catalog-mini-card">
                  <div className="card-top">
                    <span className="card-name">{comp.name}</span>
                    <div className="card-meta">
                      {isNew && (
                        <Badge variant="outlined" size="sm" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                          NEW
                        </Badge>
                      )}
                      <ArrowUpRight size={14} className="card-link-icon" />
                    </div>
                  </div>
                  <p className="card-desc">{comp.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
