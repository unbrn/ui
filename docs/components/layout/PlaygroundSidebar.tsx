import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Minimize2 } from 'lucide-react';

export interface PlaygroundSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onExit?: () => void;
}

export const PlaygroundSidebar: React.FC<PlaygroundSidebarProps> = ({
  isOpen,
  onToggle,
  onClose,
  title,
  subtitle = "Playground Controls",
  children,
  onExit
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const sidebarWidth = isMobile ? Math.min(300, windowWidth - 50) : 360;

  return (
    <>
      {/* Mobile overlay backdrop to auto-close sidebar on click outside */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
          }}
        />
      )}

      {/* Slide Bar Controls Dashboard */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${sidebarWidth}px`,
        height: '100%',
        background: 'var(--bg-main)',
        borderRight: '1px solid var(--border-color)',
        boxShadow: '20px 0 40px rgba(0, 0, 0, 0.15)',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.15rem'
          }}>
            <span style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>
              {title}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {subtitle}
            </span>
          </div>
          {onExit && (
            <button
              onClick={onExit}
              title="Exit Full Screen"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                transition: 'color 0.2s, background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Minimize2 size={16} />
            </button>
          )}
        </div>

        {/* Scrollable controls panel */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          WebkitOverflowScrolling: 'touch'
        }}>
          {children}
        </div>

        {/* Minimize / Maximize toggle slide handle */}
        <button
          onClick={onToggle}
          style={{
            position: 'absolute',
            top: '50%',
            right: '-32px',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '64px',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderLeft: 'none',
            borderRadius: '0 12px 12px 0',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '10px 0 20px rgba(0,0,0,0.1)',
            transition: 'background 0.2s',
            padding: 0
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </>
  );
};
