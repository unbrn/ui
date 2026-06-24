/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../package/components/Button/Button';
import { Avatar } from '../../../package/components/Avatar/Avatar';
import { Badge } from '../../../package/components/Badge/Badge';
import { VoiceAgent } from '../../../package/components/VoiceAgent/VoiceAgent';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export const ComponentCard = ({
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
}) => {
  const targetPath = path.startsWith('/components/')
    ? path.replace(/^\/components/, '/docs/components')
    : path.startsWith('/backgrounds/')
      ? path.replace(/^\/backgrounds/, '/docs/backgrounds')
      : path;

  return (
    <Link to={targetPath} className="component-catalog-card">
      <div className="catalog-preview-area">
        <div className="catalog-preview-content">
          {preview}
        </div>
        {isNew && (
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 5 }}>
            <Badge badgeVariant="outlined" badgeSize="sm" badgeChildren="NEW" />
          </div>
        )}
      </div>
      <div className="catalog-info-area">
        <h3 className="catalog-title">{title}</h3>
        <p className="catalog-desc">{description}</p>
      </div>
    </Link>
  );
};

export const PREVIEWS: Record<string, React.ReactNode> = {
  Accordions: (
    <div style={{
      width: '140px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }}>
      <div style={{
        height: '32px',
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
  Action: (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      position: 'relative',
      width: '140px',
      padding: '8px'
    }}>
      <div style={{
        width: '100px',
        height: '30px',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        background: 'var(--bg-secondary)',
        opacity: 0.9,
        zIndex: 1
      }}>
        <div style={{ width: '40px', height: '4px', background: 'var(--text-main)', opacity: 0.6, borderRadius: '2px' }}></div>
        <ChevronDown size={12} color="var(--text-muted)" />
      </div>
      <div style={{
        position: 'absolute',
        top: '42px',
        width: '120px',
        padding: '6px',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        zIndex: 2
      }}>
        <div style={{
          height: '24px',
          background: 'var(--accent-color)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
        }}>
          <div style={{ width: '50px', height: '3px', background: 'var(--accent-text)', borderRadius: '1.5px' }}></div>
        </div>
        <div style={{
          height: '24px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
        }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--text-main)', opacity: 0.5, borderRadius: '1.5px' }}></div>
        </div>
        <div style={{
          height: '24px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
        }}>
          <div style={{ width: '35px', height: '3px', background: 'var(--text-main)', opacity: 0.5, borderRadius: '1.5px' }}></div>
        </div>
      </div>
    </div>
  ),
  Alerts: (
    <div style={{
      width: '140px',
      padding: '12px',
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
  Avatars: <Avatar avatarSrc="https://avatars.githubusercontent.com/u/197804266" avatarShowStatus avatarStatusColor="green" />,
  Badges: <Badge badgeVariant="duo" badgeIcon={<CheckCircle2 size={12} />} badgeChildren="Verified" />,
  Buttons: <Button buttonVariant="filled" buttonChildren="Action" />,
  Checkbox: (
    <div style={{
      width: '130px',
      padding: '12px',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '25px',
          height: '18px',
          borderRadius: '100px',
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
        <div style={{ width: '25px', height: '18px', borderRadius: '100px', border: '1px solid var(--text-main)' }}></div>
        <div style={{ width: '60%', height: '4px', background: 'var(--text-main)', borderRadius: '2px' }}></div>
      </div>
    </div>
  ),
  "Code Block": (
    <div style={{
      width: '140px',
      padding: '12px',
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
  "Color Picker": (
    <div style={{
      width: '140px',
      padding: '12px',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        background: 'var(--accent-color)',
        boxShadow: '0 0 10px rgba(82, 39, 255, 0.4)',
      }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ width: '50px', height: '4px', background: 'var(--text-main)', opacity: 0.6, borderRadius: '2px' }}></div>
        <div style={{ width: '30px', height: '3px', background: 'var(--text-muted)', opacity: 0.4, borderRadius: '1.5px' }}></div>
      </div>
    </div>
  ),
  Dock: (
    <div style={{
      padding: '8px',
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
        width: '28px',
        height: '20px',
        borderRadius: '100px',
        background: 'var(--accent-text)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}></div>
    </div>
  ),
  Textarea: (
    <div style={{
      width: '140px',
      padding: '16px',
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
  Slider: (
    <div style={{
      width: '140px',
      padding: '12px 16px',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '30%', height: '4px', background: 'var(--text-main)', opacity: 0.5, borderRadius: '2px' }}></div>
        <div style={{ width: '15%', height: '4px', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', height: '12px' }}>
        <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
        <div style={{ width: '60%', height: '4px', background: 'var(--accent-color)', borderRadius: '2px', position: 'absolute', left: 0 }}></div>
        <div style={{ width: '15px', height: '10px', borderRadius: '100px', background: 'var(--accent-color)', position: 'absolute', left: '60%', transform: 'translateX(-50%)' }}></div>
      </div>
    </div>
  ),
  Tooltip: (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      position: 'relative',
      padding: '8px'
    }}>
      <div style={{
        background: 'var(--accent-color)',
        padding: '6px 12px',
        borderRadius: '6px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        <div style={{ width: '16px', height: '3px', background: 'var(--accent-text)', borderRadius: '1.5px', opacity: 0.8 }} />
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '6px',
          height: '6px',
          background: 'var(--accent-color)',
        }} />
      </div>
      <div style={{
        width: '90px',
        height: '32px',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        opacity: 0.8
      }}>
        <div style={{ width: '40px', height: '4px', background: 'var(--text-main)', opacity: 0.3, borderRadius: '2px' }} />
      </div>
    </div>
  ),
  Steps: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px'
    }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold', color: 'var(--accent-text)' }}>1</div>
      <div style={{ width: '20px', height: '2px', background: 'var(--accent-color)', opacity: 0.4 }} />
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', opacity: 0.5, color: 'var(--text-main)' }}>2</div>
    </div>
  ),
  "Voice Agent": (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <VoiceAgent
        voiceAgentStatus="speaking"
        voiceAgentVariant="grid"
        voiceAgentAccentColor="var(--accent-color)"
        voiceAgentGridSize={{ rows: 5, cols: 5 }}
        voiceAgentShowControls={false}
        voiceAgentDotSize={6}
        voiceAgentGridGap={4}
      />
    </div>
  ),
  "Lumen Beam": (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 110%, #ffffff 0%, #555555 40%, #000000 100%)',
    }} />
  ),
  "Satin Flow": (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'repeating-linear-gradient(135deg, #ffffff 0%, #888888 25%, #000000 50%, #888888 75%, #ffffff 100%)',
      backgroundSize: '200% 200%',
    }} />
  ),
  "Liquid Chrome": (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'conic-gradient(from 180deg at 50% 50%, #ffffff 0deg, #888888 90deg, #111111 180deg, #888888 270deg, #ffffff 360deg)',
    }} />
  )
};
