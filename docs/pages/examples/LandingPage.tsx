import React from 'react';
import {
  Zap,
  Shield,
  Smartphone,
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { Button } from '../../../package/components/Button/Button';
import { Badge } from '../../../package/components/Badge/Badge';
import { Input } from '../../../package/components/Input/Input';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="lp-container">
      <section className="lp-section lp-hero">
        <div className="viewport-glow" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />

        <Badge variant="duo" size="sm" style={{ marginBottom: '2rem' }}>
          New: AI-Powered Analytics is here
        </Badge>

        <h1 className="lp-hero-title">
          Build faster with <br />
          <span className="hero-accent">Liquid Intelligence.</span>
        </h1>

        <p className="lp-hero-subtitle">
          The all-in-one design system for high-performance teams.
          Beautiful by default, customizable by design, and optimized for the modern web.
        </p>

        <div className="lp-hero-actions">
          <Button size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
            Start Building
          </Button>
          <Button variant="outlined" size="lg" icon={<PlayCircle size={20} />}>
            Watch Demo
          </Button>
        </div>
      </section>

      <div className="lp-logos">
        <div className="lp-logo-item">Acme Corp</div>
        <div className="lp-logo-item">Globex</div>
        <div className="lp-logo-item">Soylent Corp</div>
        <div className="lp-logo-item">Initech</div>
        <div className="lp-logo-item">Umbrella</div>
      </div>

      <section className="lp-section">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="section-title">Designed for <span className="hero-accent">Excellence.</span></h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Everything you need to launch professional-grade applications in record time.
          </p>
        </div>

        <div className="lp-features-grid">
          {[
            {
              icon: <Zap size={24} />,
              title: 'Lightning Fast',
              desc: 'Optimized for performance with zero-runtime CSS and tree-shakable components.'
            },
            {
              icon: <Shield size={24} />,
              title: 'Secure by Design',
              desc: 'Enterprise-grade security patterns built into every interactive component.'
            },
            {
              icon: <Smartphone size={24} />,
              title: 'Fully Responsive',
              desc: 'Seamlessly adapts to any screen size, from mobile to ultra-wide desktops.'
            },
            {
              icon: <BarChart3 size={24} />,
              title: 'Data Focused',
              desc: 'Powerful visualization components designed for complex data requirements.'
            },
            {
              icon: <Globe size={24} />,
              title: 'Global Scale',
              desc: 'Multi-language support and RTL layouts ready for your international audience.'
            },
            {
              icon: <CheckCircle2 size={24} />,
              title: 'Type Safe',
              desc: 'First-class TypeScript support with detailed documentation and auto-complete.'
            },
          ].map((feature, i) => (
            <div key={i} className="lp-feature-card feature-card unburn-glass">
              <div className="lp-feature-icon">{feature.icon}</div>
              <h3 className="lp-feature-title">{feature.title}</h3>
              <p className="lp-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="section-title">Simple <span className="hero-accent">Pricing.</span></h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Choose the perfect plan for your project's ambitions.
          </p>
        </div>

        <div className="lp-pricing-grid">
          <div className="lp-price-card feature-card unburn-glass">
            <h3 className="lp-feature-title">Starter</h3>
            <div className="lp-price-amount">$0</div>
            <div className="lp-price-period">Free forever for personal use</div>
            <ul className="lp-price-features">
              <li><CheckCircle2 size={16} /> 20+ Core Components</li>
              <li><CheckCircle2 size={16} /> Community Support</li>
              <li><CheckCircle2 size={16} /> Basic Layouts</li>
            </ul>
            <Button variant="outlined" fullWidth>Get Started</Button>
          </div>

          <div className="lp-price-card feature-card unburn-glass featured">
            <div className="lp-price-tag">
              <Badge color="blue" size="sm">Most Popular</Badge>
            </div>
            <h3 className="lp-feature-title">Pro</h3>
            <div className="lp-price-amount">$49</div>
            <div className="lp-price-period">Per developer, per month</div>
            <ul className="lp-price-features">
              <li><CheckCircle2 size={16} /> All Core & Pro Components</li>
              <li><CheckCircle2 size={16} /> Priority Email Support</li>
              <li><CheckCircle2 size={16} /> Advanced Analytics Dashboards</li>
              <li><CheckCircle2 size={16} /> Custom Theme Generation</li>
            </ul>
            <Button fullWidth>Upgrade to Pro</Button>
          </div>

          <div className="lp-price-card feature-card unburn-glass">
            <h3 className="lp-feature-title">Enterprise</h3>
            <div className="lp-price-amount">Custom</div>
            <div className="lp-price-period">Contact us for tailored pricing</div>
            <ul className="lp-price-features">
              <li><CheckCircle2 size={16} /> Unlimited Components</li>
              <li><CheckCircle2 size={16} /> Dedicated Success Manager</li>
              <li><CheckCircle2 size={16} /> Custom Integration Support</li>
              <li><CheckCircle2 size={16} /> On-premise Deployment</li>
            </ul>
            <Button variant="outlined" fullWidth>Contact Sales</Button>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              unburn<span className="lp-footer-logo-dot"></span>
            </div>
            <p className="lp-footer-tagline">
              Crafting premium design experiences for the next generation of web applications.
            </p>
            <div className="lp-newsletter">
              <h4>Subscribe to our newsletter</h4>
              <div className="lp-newsletter-form">
                <Input placeholder="Enter your email" variant="filled" />
                <Button variant="filled" size="default">Join</Button>
              </div>
            </div>
          </div>

          <div className="lp-footer-links-group">
            <h4>Product</h4>
            <ul className="lp-footer-links-list">
              <li><a href="#features" className="lp-footer-link">Features</a></li>
              <li><a href="#pricing" className="lp-footer-link">Pricing</a></li>
              <li><a href="#docs" className="lp-footer-link">Documentation</a></li>
              <li><a href="#changelog" className="lp-footer-link">Changelog</a></li>
            </ul>
          </div>

          <div className="lp-footer-links-group">
            <h4>Company</h4>
            <ul className="lp-footer-links-list">
              <li><a href="#about" className="lp-footer-link">About Us</a></li>
              <li><a href="#careers" className="lp-footer-link">Careers</a></li>
              <li><a href="#blog" className="lp-footer-link">Blog</a></li>
              <li><a href="#contact" className="lp-footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="lp-footer-links-group">
            <h4>Legal</h4>
            <ul className="lp-footer-links-list">
              <li><a href="#privacy" className="lp-footer-link">Privacy Policy</a></li>
              <li><a href="#terms" className="lp-footer-link">Terms of Service</a></li>
              <li><a href="#cookie" className="lp-footer-link">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <div className="lp-footer-copyright">
            © 2026 UNBURN UI. ALL RIGHTS RESERVED.
          </div>
          <div className="lp-footer-socials">
            <a href="#twitter" className="lp-social-icon" aria-label="Twitter">
              <Globe size={20} />
            </a>
            <a href="#github" className="lp-social-icon" aria-label="GitHub">
              <BarChart3 size={20} />
            </a>
            <a href="#discord" className="lp-social-icon" aria-label="Discord">
              <Shield size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
