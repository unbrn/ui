import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../package/components/Button/Button';
import { Avatar } from '../../package/components/Avatar/Avatar';
import { Badge } from '../../package/components/Badge/Badge';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import componentsMeta from '../data/components.json';

const ComponentCard = ({
  title,
  description,
  path,
  preview,
  isNew
}: {
  title: string,
  description: string,
  path: string,
  preview: React.ReactNode,
  isNew?: boolean
}) => (
  <Link to={path} className="component-catalog-card">
    <div className="catalog-preview-area">
      <div className="catalog-preview-content">
        {preview}
      </div>
      {isNew && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 5 }}>
          <Badge variant="outlined" size='sm'>NEW</Badge>
        </div>
      )}
    </div>
    <div className="catalog-info-area">
      <h3 className="catalog-title">{title}</h3>
      <p className="catalog-desc">{description}</p>
    </div>
  </Link>
);

const PREVIEWS: Record<string, React.ReactNode> = {
  Accordions: (
    <div style={{
      width: '140px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }}>
      <div style={{
        height: '32px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--accent-color)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ width: '40%', height: '4px', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
        <ChevronDown size={14} color="var(--accent-color)" />
      </div>
      <div style={{
        height: '32px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        justifyContent: 'space-between',
        opacity: 1
      }}>
        <div style={{ width: '30%', height: '4px', background: 'var(--text-main)', borderRadius: '2px' }}></div>
        <ChevronDown size={14} color="var(--text-main)" />
      </div>
    </div>
  ),
  Alerts: (
    <div style={{
      width: '140px',
      padding: '12px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
      <div style={{ flex: 1, height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
    </div>
  ),
  Avatars: <Avatar src="https://avatars.githubusercontent.com/u/197804266" showStatus statusColor="green" />,
  Badges: <Badge variant="duo" icon={<CheckCircle2 size={12} />}>Verified</Badge>,
  Buttons: <Button variant="filled">Action</Button>,
  Checkbox: (
    <div style={{
      width: '130px',
      padding: '12px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          background: 'var(--accent-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '8px', height: '4px', borderBottom: '2px solid var(--accent-text)', borderLeft: '2px solid var(--accent-text)', transform: 'rotate(-45deg) translateY(-1px)' }}></div>
        </div>
        <div style={{ flex: 1, height: '4px', background: 'var(--accent-color)', opacity: 0.3, borderRadius: '2px' }}></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.2 }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1px solid var(--text-main)' }}></div>
        <div style={{ width: '60%', height: '4px', background: 'var(--text-main)', borderRadius: '2px' }}></div>
      </div>
    </div>
  ),
  "Code Block": (
    <div style={{
      width: '140px',
      padding: '12px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderLeft: '4px solid var(--accent-color)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ width: '30%', height: '6px', background: 'var(--accent-color)', borderRadius: '3px', opacity: 0.4 }}></div>
      <div style={{ width: '90%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', opacity: 0.4 }}></div>
      <div style={{ width: '70%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', opacity: 0.2 }}></div>
    </div>
  ),
  Dock: (
    <div style={{
      padding: '8px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '100px',
      display: 'flex',
      gap: '8px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.2 }}></div>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.1 }}></div>
    </div>
  ),
  Dropzone: (
    <div style={{
      width: '130px',
      height: '90px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'var(--accent-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderTop: '2px solid var(--accent-text)',
          borderRight: '2px solid var(--accent-text)',
          transform: 'rotate(-45deg) translateY(2px) translateX(-2px)'
        }}></div>
      </div>
      <div style={{ width: '60px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', opacity: 0.5 }}></div>
    </div>
  ),
  Inputs: (
    <div style={{
      width: '140px',
      padding: '12px 16px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--accent-color)' }}></div>
      <div style={{ width: '1px', height: '14px', background: 'var(--accent-color)' }}></div>
      <div style={{ flex: 1, height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
    </div>
  ),
  Select: (
    <div style={{
      width: '140px',
      padding: '10px 14px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
        <div style={{ width: '50px', height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
      </div>
      <ChevronDown size={14} color="var(--text-muted)" />
    </div>
  ),
  Switch: (
    <div style={{
      width: '48px',
      height: '26px',
      borderRadius: '100px',
      background: 'var(--accent-color)',
      padding: '3px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'var(--accent-text)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}></div>
    </div>
  ),
  Textarea: (
    <div style={{
      width: '140px',
      padding: '16px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backdropFilter: 'blur(10px)',
      position: 'relative',
    }}>
      <div style={{ width: '100%', height: '4px', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
      <div style={{ width: '80%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', opacity: 0.6 }}></div>
      <div style={{ width: '40%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', opacity: 0.3 }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '8px',
        height: '8px',
        borderRight: '2px solid var(--accent-color)',
        borderBottom: '2px solid var(--accent-color)',
        opacity: 0.3
      }}></div>
    </div>
  ),
  "Video Embed": (
    <div style={{
      width: '140px',
      aspectRatio: '16/9',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'var(--bg-glass)',
        border: '1px solid var(--accent-color)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '0',
          height: '0',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '8px solid var(--accent-color)',
          transform: 'translateX(1.5px)',
          borderRadius: '10px'
        }}></div>
      </div>
    </div>
  )
};

export const ComponentsPage: React.FC = () => {
  // Sort alphabetically by name
  const sortedComponents = [...componentsMeta].sort((a, b) => a.name.localeCompare(b.name));

  const isComponentNew = (addedAtString: string) => {
    const addedDate = new Date(addedAtString);
    const currentDate = new Date();

    // Calculate difference in milliseconds
    const diffTime = currentDate.getTime() - addedDate.getTime();
    // Convert to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Returns true if added within last 5 days and is not in the future
    return diffDays >= 0 && diffDays <= 5;
  };

  return (
    <div className="components-page">
      <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
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
            isNew={isComponentNew(comp.addedAt)}
          />
        ))}
      </div>
    </div>
  );
};
