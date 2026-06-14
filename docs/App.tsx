import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams, Link } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header';
import { Menu } from './components/layout/Menu';
import { DocsLayout } from './components/layout/DocsLayout';
import { Dock } from '../package/components/Dock/Dock';
import { Button } from '../package/components/Button/Button';
import { Sun, Moon } from 'lucide-react';
import { DocsSearchModal } from './components/layout/DocsSearchModal';


const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ButtonsPage = lazy(() => import('./pages/components/ButtonsPage').then(m => ({ default: m.ButtonsPage })));
const ActionPage = lazy(() => import('./pages/components/ActionPage').then(m => ({ default: m.ActionPage })));
const AvatarsPage = lazy(() => import('./pages/components/AvatarsPage').then(m => ({ default: m.AvatarsPage })));
const AlertsPage = lazy(() => import('./pages/components/AlertsPage').then(m => ({ default: m.AlertsPage })));
const AccordionsPage = lazy(() => import('./pages/components/AccordionsPage').then(m => ({ default: m.AccordionsPage })));
const BadgesPage = lazy(() => import('./pages/components/BadgesPage').then(m => ({ default: m.BadgesPage })));
const DockPage = lazy(() => import('./pages/components/DockPage').then(m => ({ default: m.DockPage })));
const CheckboxPage = lazy(() => import('./pages/components/CheckboxPage').then(m => ({ default: m.CheckboxPage })));
const SwitchPage = lazy(() => import('./pages/components/SwitchPage').then(m => ({ default: m.SwitchPage })));
const SelectPage = lazy(() => import('./pages/components/SelectPage').then(m => ({ default: m.SelectPage })));
const InputsPage = lazy(() => import('./pages/components/InputsPage').then(m => ({ default: m.InputsPage })));
const TextareaPage = lazy(() => import('./pages/components/TextareaPage').then(m => ({ default: m.TextareaPage })));
const CodeBlockPage = lazy(() => import('./pages/components/CodeBlockPage').then(m => ({ default: m.CodeBlockPage })));
const ComponentsPage = lazy(() => import('./pages/ComponentsPage').then(m => ({ default: m.ComponentsPage })));
const InstallationPage = lazy(() => import('./pages/InstallationPage').then(m => ({ default: m.InstallationPage })));
const DropzonePage = lazy(() => import('./pages/components/DropzonePage').then(m => ({ default: m.DropzonePage })));
const SliderPage = lazy(() => import('./pages/components/SliderPage').then(m => ({ default: m.SliderPage })));
const TooltipPage = lazy(() => import('./pages/components/TooltipPage').then(m => ({ default: m.TooltipPage })));
const StepsPage = lazy(() => import('./pages/components/StepsPage').then(m => ({ default: m.StepsPage })));
const VoiceAgentPage = lazy(() => import('./pages/components/VoiceAgentPage').then(m => ({ default: m.VoiceAgentPage })));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })));

type Theme = 'light' | 'dark';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function InstallationRedirect() {
  const { framework } = useParams<{ framework?: string }>();
  return <Navigate to={framework ? `/docs/quick-start/${framework}` : '/docs/quick-start'} replace />;
}

function ComponentRedirect() {
  const { name } = useParams<{ name?: string }>();
  return <Navigate to={name ? `/docs/components/${name}` : '/docs/components'} replace />;
}




interface AppContentProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleTheme: () => void;
}

function AppContent({ theme, setTheme, isMenuOpen, setMenuOpen, toggleTheme }: AppContentProps) {
  const location = useLocation();
  const isDocsRoute = location.pathname.startsWith('/docs');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };
    window.addEventListener('docs-sidebar-state', handleState);
    return () => window.removeEventListener('docs-sidebar-state', handleState);
  }, []);

  useEffect(() => {
    if (!isDocsRoute) {
      Promise.resolve().then(() => {
        setIsSidebarOpen(false);
      });
    }
  }, [isDocsRoute]);

  return (
    <div className="unburn-app">
      <Header
        className="unburn-glass"
      />

      <div className="unburn-layout">
        <Menu
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main className="unburn-main">
          <Suspense fallback={<div className="loading-state">LOADING...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<Navigate to="/docs/quick-start" replace />} />

                <Route path="quick-start" element={<InstallationPage />} />
                <Route path="quick-start/:framework" element={<InstallationPage />} />

                <Route path="components" element={<ComponentsPage />} />
                <Route path="components/buttons" element={<ButtonsPage />} />
                <Route path="components/action" element={<ActionPage />} />
                <Route path="components/avatars" element={<AvatarsPage />} />
                <Route path="components/alerts" element={<AlertsPage />} />
                <Route path="components/accordions" element={<AccordionsPage />} />
                <Route path="components/badges" element={<BadgesPage />} />
                <Route path="components/dock" element={<DockPage globalTheme={theme} setGlobalTheme={setTheme} />} />
                <Route path="components/checkbox" element={<CheckboxPage />} />
                <Route path="components/switch" element={<SwitchPage />} />
                <Route path="components/select" element={<SelectPage />} />
                <Route path="components/inputs" element={<InputsPage />} />
                <Route path="components/textarea" element={<TextareaPage />} />
                <Route path="components/code-block" element={<CodeBlockPage />} />
                <Route path="components/dropzone" element={<DropzonePage />} />
                <Route path="components/slider" element={<SliderPage />} />
                <Route path="components/tooltip" element={<TooltipPage />} />
                <Route path="components/steps" element={<StepsPage />} />
                <Route path="components/voice-agent" element={<VoiceAgentPage />} />
                <Route path="changelog" element={<ChangelogPage />} />
              </Route>

              <Route path="/installation" element={<Navigate to="/docs/quick-start" replace />} />
              <Route path="/installation/:framework" element={<InstallationRedirect />} />
              <Route path="/components" element={<Navigate to="/docs/components" replace />} />
              <Route path="/components/:name" element={<ComponentRedirect />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <Dock
        dockIsMenuOpen={isMenuOpen}
        dockOnMenuToggle={() => setMenuOpen(!isMenuOpen)}
        dockPosition='bottom'
        dockClassName={isSidebarOpen ? 'dock-hidden' : ''}
        dockChildren={
          <Button
            buttonOnClick={toggleTheme}
            buttonIcon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          />
        }
      />

      {!isDocsRoute && (
        <footer className="unburn-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo" onClick={() => window.location.href = "/"}>
                <svg width="20" height="20" viewBox="0 0 184 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 96.4999C-4.70757e-06 136.541 32.4593 169 72.5 169H110.766C150.807 169 183.266 136.541 183.266 96.5V72.5C183.266 32.4594 150.807 1.1526e-05 110.766 5.63239e-06L72.5 0C32.4594 -5.89357e-06 7.52923e-06 32.4593 2.82167e-06 72.5L0 96.4999ZM107.545 10.974L73.5259 10.974C46.2524 10.974 24.1428 33.0836 24.1428 60.3571C24.1428 87.6306 46.2524 109.74 73.5259 109.74H107.545C134.819 109.74 156.928 87.6306 156.928 60.3571C156.928 33.0836 134.819 10.974 107.545 10.974Z" fill="var(--accent-color)" />
                </svg>
                <span>unburn/ui</span>
              </div>
              <p className="footer-description">
                A clean, modern React component library crafted with precision and vanilla CSS.
              </p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-links-col">
                <h4>Library</h4>
                <Link to="/docs/quick-start">Quick Start</Link>
                <Link to="/docs/components">Components</Link>
              </div>
              <div className="footer-links-col">
                <h4>Resources</h4>
                <a href="https://github.com/unburn/ui" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.npmjs.com/package/@unburn/ui" target="_blank" rel="noopener noreferrer">npm</a>
                <a href="https://github.com/unburn/ui/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a>
              </div>
              <div className="footer-links-col">
                <h4>Community</h4>
                <a href="https://x.com/kunalkandepatil" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                <a href="https://discord.gg/W8wTjESM3t" target="_blank" rel="noopener noreferrer">Discord</a>
                <a href="https://github.com/unburn/ui/issues" target="_blank" rel="noopener noreferrer">Support</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              &copy; {new Date().getFullYear()} UNBURN UI. ALL RIGHTS RESERVED.
            </span>
            <span className="footer-made-by">
              Crafted with precision
            </span>
          </div>
        </footer>
      )}

      <DocsSearchModal />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('unburn-theme');
    return (saved as Theme) || 'dark';
  });

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('unburn-theme', theme);
  }, [theme]);

  return (
    <Router>
      <ScrollToTop />
      <AppContent
        theme={theme}
        setTheme={setTheme}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        toggleTheme={toggleTheme}
      />
    </Router>
  );
}

export default App;
