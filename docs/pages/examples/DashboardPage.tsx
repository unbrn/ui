import React, { useState } from 'react';
import {
  Bell,
  Users,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '../../../package/components/Button/Button';
import { Select } from '../../../package/components/Select/Select';
import { Switch } from '../../../package/components/Switch/Switch';
import { Checkbox } from '../../../package/components/Checkbox/Checkbox';
import { Avatar } from '../../../package/components/Avatar/Avatar';
import { Badge } from '../../../package/components/Badge/Badge';
import { Alert } from '../../../package/components/Alert/Alert';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [status, setStatus] = useState('online');

  const statusOptions = [
    { value: 'online', label: 'Online' },
    { value: 'away', label: 'Away' },
    { value: 'busy', label: 'Do Not Disturb' },
    { value: 'offline', label: 'Invisible' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      trend: '+20.1%',
      isUp: true,
      icon: <CreditCard size={18} />,
      color: 'var(--accent-color)'
    },
    {
      title: 'Active Users',
      value: '+2,350',
      trend: '+18.1%',
      isUp: true,
      icon: <Users size={18} />,
      color: 'var(--accent-color)'
    },
    {
      title: 'System Uptime',
      value: '99.98%',
      trend: '+0.01%',
      isUp: true,
      icon: <TrendingUp size={18} />,
      color: 'var(--accent-color)'
    },
    {
      title: 'Response Time',
      value: '142ms',
      trend: '-12%',
      isUp: false,
      icon: <Clock size={18} />,
      color: 'var(--accent-color)'
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            System <span className="hero-accent">Overview</span>
          </h1>
          <p className="dashboard-subtitle">
            Welcome back, administrator. All systems are currently performing within optimal parameters.
          </p>
        </div>

        <div className="dashboard-actions">
          <Button variant="outlined" size="sm" icon={<Bell size={18} />} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="user-info-text">
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Kunal K.</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Super Admin</div>
            </div>
            <Avatar
              src="https://avatars.githubusercontent.com/u/197804266"
              alt="Admin"
              size="md"
              showStatus
              statusColor="green"
            />
          </div>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="feature-card stat-card unburn-glass">
            <div className="stat-label">
              <span style={{ color: stat.color }}>{stat.title}</span>
              <div style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{stat.icon}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-trend">
              <Badge
                variant="duo"
                size="sm"
                color={stat.isUp ? 'green' : 'red'}
                icon={stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              >
                {stat.trend}
              </Badge>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="main-content-grid">
        <div className="dashboard-section">
          <div className="feature-card unburn-glass">
            <div className="section-card-title">
              Project Configuration
              <Button variant="outlined" size="sm" icon={<MoreVertical size={16} />} />
            </div>

            <div className="settings-group">
              <div className="settings-row">
                <Select
                  label="Availability Status"
                  options={statusOptions}
                  value={status}
                  onChange={setStatus}
                  size="default"
                />
                <Button
                  variant="filled"
                  size="default"
                  fullWidth
                  style={{ background: 'var(--accent-color)', color: 'var(--accent-text)' }}
                >
                  Apply Changes
                </Button>
              </div>

              <div className="divider" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Switch
                  label="Push Notifications"
                  description="Receive real-time alerts for system events and security audits."
                  checked={notificationsEnabled}
                  onChange={setNotificationsEnabled}
                  size="default"
                />
                <Switch
                  label="Auto-Update Modules"
                  description="Automatically install security patches and minor feature updates."
                  checked={autoUpdate}
                  onChange={setAutoUpdate}
                  size="default"
                />
              </div>

              <div className="divider" />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <Checkbox label="Agree to analytics" defaultChecked size="default" />
                <Checkbox label="Public profile" size="default" />
                <Checkbox label="Expert mode" size="default" />
              </div>
            </div>
          </div>

          <Alert
            variant="filled"
            title="Scheduled Maintenance"
            description="The system will undergo scheduled maintenance on Sunday, May 24th at 02:00 AM UTC. Expect minor downtime."
            icon={<AlertCircle size={18} />}
            color='red'
          >
          </Alert>
        </div>

        <div className="dashboard-section">
          <div className="feature-card unburn-glass">
            <div className="section-card-title">
              Recent Activity
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>Live Feed</span>
            </div>

            <div className="activity-list">
              {[
                { user: 'Sarah Wilson', action: 'Uploaded new assets', time: '2m ago', color: 'green', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
                { user: 'James Miller', action: 'Deployed to production', time: '15m ago', color: 'purple', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
                { user: 'Michael Chen', action: 'Updated security policy', time: '1h ago', color: 'blue', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
                { user: 'System Bot', action: 'Backing up database', time: '2h ago', color: 'orange', avatar: null },
              ].map((activity, i) => (
                <div key={i} className="activity-item">
                  <Avatar
                    size="sm"
                    src={activity.avatar || undefined}
                    color={!activity.avatar ? activity.color : undefined}
                  />
                  <div className="activity-info">
                    <div className="activity-user">{activity.user}</div>
                    <div className="activity-action">{activity.action}</div>
                  </div>
                  <div className="activity-time">
                    {activity.time}
                  </div>
                </div>
              ))}

              <Button variant="outlined" size="default" fullWidth style={{ marginTop: '0.5rem' }}>
                View Full Audit Log
              </Button>
            </div>
          </div>

          <div className="feature-card integration-card unburn-glass">
            <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={40} strokeWidth={1} style={{ margin: '0 auto', color: 'var(--accent-color)' }} />
            </div>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 100, marginBottom: '0.75rem' }}>
              Integrations Ready
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Connect your professional toolchain to automate repetitive tasks and sync data.
            </p>
            <Button variant="outlined" size="default" fullWidth>Manage Plugins</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

