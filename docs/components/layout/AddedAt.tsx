import React from 'react';
import componentsMeta from '../../data/components.json';
import backgroundsMeta from '../../data/backgrounds.json';

interface AddedAtProps {
  componentName: string;
}

export const AddedAt: React.FC<AddedAtProps> = ({ componentName }) => {
  const meta = componentsMeta.find(c => c.name === componentName) || backgroundsMeta.find(b => b.name === componentName);
  if (!meta) return null;

  
  const date = new Date(meta.addedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' 
  });

  return (
    <span style={{
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)',
      opacity: 0.5,
      display: 'block',
      marginTop: '0.75rem'
    }}>
      Added on {formattedDate}
    </span>
  );
};
