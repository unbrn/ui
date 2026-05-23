import React, { useState, useRef } from 'react';
import { Sparkles, Search, Settings } from 'lucide-react';
import { Button } from '../../package/components/Button/Button';
import { Switch } from '../../package/components/Switch/Switch';
import { Input } from '../../package/components/Input/Input';
import { Badge } from '../../package/components/Badge/Badge';
import { Alert } from '../../package/components/Alert/Alert';
import { Avatar } from '../../package/components/Avatar/Avatar';
import { Dropzone } from '../../package/components/Dropzone/Dropzone';
import './TiltedShowcase.css';

export const TiltedShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 10, y: -15 });

  const [isFollowed, setIsFollowed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    setTilt({
      x: 10 - py * 18,
      y: -15 + px * 18
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 10, y: -15 });
  };

  const renderColumn1 = () => (
    <>
      <div className="showcase-card profile-card">
        <div className="card-header">
          <Avatar
            src="https://avatars.githubusercontent.com/u/197804266"
            alt="Kunal"
            size="md"
            showStatus={true}
            statusColor="#10b981"
            color="var(--accent-color)"
          />
          <div className="card-info">
            <h4 className="card-title">Kunal</h4>
            <p className="card-subtitle">Lead Developer</p>
          </div>
          <Badge variant="outlined" size="sm" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
            PRO
          </Badge>
        </div>
        <div className="card-body">
          <p className="card-text">Building the future of lightweight, performant React layouts with vanilla CSS.</p>
        </div>
        <div className="card-actions">
          <Button
            variant={isFollowed ? "outlined" : "filled"}
            size="sm"
            fullWidth={true}
            onClick={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Following" : "Follow User"}
          </Button>
        </div>
      </div>

      <div className="showcase-card search-card">
        <div className="card-title-row">
          <span className="card-tag">Interactive Search</span>
          <Sparkles size={12} className="tag-icon" />
        </div>
        <div className="search-row">
          <Input
            variant="duo"
            size="sm"
            placeholder="Search docs..."
            leftIcon={<Search size={14} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth={true}
          />
          <Button
            variant="outlined"
            size="sm"
            icon={<Settings size={14} />}
            onClick={() => setSearchValue('')}
          />
        </div>
        <div className="search-status">
          {searchValue ? (
            <span className="status-text font-mono">Query: "{searchValue}"</span>
          ) : (
            <span className="status-text font-mono">Ready to query...</span>
          )}
        </div>
      </div>

      <div className="showcase-card alert-card">
        <Alert
          variant='duo'
          title="Deployment Complete"
          classNames={{ root: 'mini-alert-root' }}
        >
          All pages compiled under 24ms.
        </Alert>
      </div>
    </>
  );

  const renderColumn2 = () => (
    <>
      <div className="showcase-card control-card">
        <h4 className="control-title font-mono">SYSTEM PREFERENCES</h4>
        <div className="control-item">
          <div className="control-info">
            <span className="control-label">Dark Aesthetics</span>
            <span className="control-desc">Use deep space palette</span>
          </div>
          <Switch
            variant="duo"
            checked={darkMode}
            onChange={(checked) => setDarkMode(checked)}
            size="sm"
          />
        </div>
        <div className="control-divider"></div>
        <div className="control-item">
          <div className="control-info">
            <span className="control-label">Live Updates</span>
            <span className="control-desc">Enable auto sync</span>
          </div>
          <Switch
            variant="filled"
            checked={notifications}
            onChange={(checked) => setNotifications(checked)}
            size="sm"
          />
        </div>
      </div>

      <div className="showcase-card dropzone-card">
        <div className="card-title-row">
          <span className="card-tag">File Uploader</span>
          <Sparkles size={12} className="tag-icon" />
        </div>
        <Dropzone
          label="Drop file here"
          description="PNG, JPG, PDF up to 5MB"
          accept=".png,.jpg,.pdf"
          classNames={{ root: 'mini-dropzone-root' }}
        />
      </div>

      <div className="showcase-card badges-card">
        <div className="card-title-row">
          <span className="card-tag">Atomic Badges</span>
        </div>
        <div className="badge-grid">
          <Badge variant="filled">Active</Badge>
          <Badge variant="outlined">Beta</Badge>
          <Badge variant="duo">Duo</Badge>
        </div>
        <div className="button-row">
          <Button variant="duo" size="sm" fullWidth={true}>
            Interactive Action
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="showcase-perspective"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="showcase-glow" style={{
        transform: `translate3d(${(tilt.y + 15) * 2}px, ${(tilt.x - 10) * 2}px, 0)`
      }}></div>

      <div
        className="showcase-board"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(3deg)`
        }}
      >
        <div className="showcase-column showcase-column-up">
          <div className="column-loop-wrapper">
            {renderColumn1()}
          </div>

          <div className="column-loop-wrapper" aria-hidden="true">
            {renderColumn1()}
          </div>
        </div>

        <div className="showcase-column showcase-column-down">
          <div className="column-loop-wrapper">
            {renderColumn2()}
          </div>

          <div className="column-loop-wrapper" aria-hidden="true">
            {renderColumn2()}
          </div>
        </div>
      </div>

      <div className="showcase-fade-top"></div>
      <div className="showcase-fade-bottom"></div>
    </div>
  );
};
