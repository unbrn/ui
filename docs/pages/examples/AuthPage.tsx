import React, { useState } from 'react';
import { Button } from '../../../package/components/Button/Button';
import { Input } from '../../../package/components/Input/Input';
import { Checkbox } from '../../../package/components/Checkbox/Checkbox';
import { Alert } from '../../../package/components/Alert/Alert';
import { Mail, Lock, User, Globe, LayoutGrid, ArrowRight } from 'lucide-react';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="auth-example-page">
      <div className="auth-card feature-card unburn-glass">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <Lock size={28} color="var(--accent-text)" strokeWidth={1.5} />
          </div>
          <h1 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'login' 
              ? 'Enter your credentials to access your secure workstation.' 
              : 'Join our elite community and start your journey today.'}
          </p>
        </div>

        {showSuccess && (
          <Alert 
            color="green" 
            variant="duo"
            title={mode === 'login' ? "Access Granted" : "Account Established"}
            description={mode === 'login' ? "Synchronizing your profile data..." : "Please verify your identity via email."}
            style={{ marginBottom: '2rem' }}
          />
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <Input 
              label="Full Name"
              placeholder="John Doe"
              leftIcon={<User size={18} />}
              fullWidth
            />
          )}
          
          <Input 
            label="Email Address"
            placeholder="name@example.com"
            leftIcon={<Mail size={18} />}
            fullWidth
          />

          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            fullWidth
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <Checkbox label="Keep me signed in" />
            <a href="#forgot" className="forgot-password-link">
              Forgot password?
            </a>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            loading={isLoading}
            size="lg"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            style={{ marginTop: '0.5rem' }}
          >
            {mode === 'login' ? 'Sign In' : 'Establish Account'}
          </Button>

          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">Or continue with</span>
            <div className="auth-divider-line"></div>
          </div>

          <div className="auth-social-grid">
            <Button variant="outlined" fullWidth icon={<Globe size={18} />}>
              Google
            </Button>
            <Button variant="outlined" fullWidth icon={<LayoutGrid size={18} />}>
              Microsoft
            </Button>
          </div>
        </form>

        <div className="auth-footer">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {mode === 'login' ? "New to the platform?" : "Already a member?"}{' '}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="auth-mode-toggle"
            >
              {mode === 'login' ? 'Create an account' : 'Sign in to access'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

