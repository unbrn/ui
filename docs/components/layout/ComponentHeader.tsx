import React from 'react';
import componentsMeta from '../../data/components.json';
import { AddedAt } from './AddedAt';

interface ComponentHeaderProps {
  title: string;
}

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({ title }) => {
  const meta = componentsMeta.find(c => c.name === title);

  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {meta && (
        <p className="section-description">
          {meta.description}
        </p>
      )}
      <AddedAt componentName={title} />
    </div>
  );
};
