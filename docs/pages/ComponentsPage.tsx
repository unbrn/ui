import React from 'react';
import componentsMeta from '../data/components.json';
import { ComponentCard, PREVIEWS } from '../components/layout/ComponentsShowcase';
import { isItemNew } from '../lib/utils';

export const ComponentsPage: React.FC = () => {
  
  const sortedComponents = [...componentsMeta].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="components-page">
      <h1 className="hero-title" style={{ fontSize: 'clamp(1.85rem, 7.5vw, 3.5rem)', marginBottom: '1rem' }}>
        Explore<br /><span className="hero-accent">The Collection.</span>
      </h1>
      <p className="hero-subtitle" style={{ marginBottom: '4rem' }}>
        A complete gallery of clean, interactive components ready to use in your React apps.
      </p>

      <div className="component-catalog-grid">
        {sortedComponents.map((comp) => (
          <ComponentCard
            key={comp.name}
            title={comp.name}
            description={comp.description}
            path={comp.path}
            preview={PREVIEWS[comp.name]}
            isNew={isItemNew(comp.addedAt)}
          />
        ))}
      </div>
    </div>
  );
};
