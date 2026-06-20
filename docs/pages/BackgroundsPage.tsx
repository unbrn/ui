import React from 'react';
import backgroundsMeta from '../data/backgrounds.json';
import { ComponentCard, PREVIEWS } from '../components/layout/ComponentsShowcase';

export const BackgroundsPage: React.FC = () => {
  const sortedBackgrounds = [...backgroundsMeta].sort((a, b) => a.name.localeCompare(b.name));

  const isBackgroundNew = (addedAtString: string) => {
    const addedDate = new Date(addedAtString);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - addedDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 5;
  };

  return (
    <div className="components-page">
      <h1 className="hero-title" style={{ fontSize: 'clamp(1.85rem, 7.5vw, 3.5rem)', marginBottom: '1rem' }}>
        Dynamic<br /><span className="hero-accent">Backgrounds.</span>
      </h1>
      <p className="hero-subtitle" style={{ marginBottom: '4rem' }}>
        Fluid, visual backdrop systems crafted with vanilla WebGL shaders to elevate your layouts.
      </p>

      <div className="component-catalog-grid">
        {sortedBackgrounds.map((bg) => (
          <ComponentCard
            key={bg.name}
            title={bg.name}
            description={bg.description}
            path={bg.path}
            preview={PREVIEWS[bg.name]}
            isNew={isBackgroundNew(bg.addedAt)}
          />
        ))}
      </div>
    </div>
  );
};
