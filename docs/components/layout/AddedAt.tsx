import React from 'react';
import componentsMeta from '../../data/components.json';

interface AddedAtProps {
  componentName: string;
}

export const AddedAt: React.FC<AddedAtProps> = ({ componentName }) => {
  const meta = componentsMeta.find(c => c.name === componentName);
  if (!meta) return null;

  // Format date-only string YYYY-MM-DD cleanly to "May 15, 2026"
  const date = new Date(meta.addedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Keep it absolute to match JSON date exactly
  });

  return (
    <span style={{
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      opacity: 0.5,
      display: 'block',
      marginTop: '0.75rem'
    }}>
      Added on {formattedDate}
    </span>
  );
};
