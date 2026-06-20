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
import componentsMeta from './data/components.json';
import backgroundsMeta from './data/backgrounds.json';



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
const BackgroundsPage = lazy(() => import('./pages/BackgroundsPage').then(m => ({ default: m.BackgroundsPage })));
const InstallationPage = lazy(() => import('./pages/InstallationPage').then(m => ({ default: m.InstallationPage })));
const DropzonePage = lazy(() => import('./pages/components/DropzonePage').then(m => ({ default: m.DropzonePage })));
const SliderPage = lazy(() => import('./pages/components/SliderPage').then(m => ({ default: m.SliderPage })));
const TooltipPage = lazy(() => import('./pages/components/TooltipPage').then(m => ({ default: m.TooltipPage })));
const StepsPage = lazy(() => import('./pages/components/StepsPage').then(m => ({ default: m.StepsPage })));
const ColorPickerPage = lazy(() => import('./pages/components/ColorPickerPage').then(m => ({ default: m.ColorPickerPage })));
const VoiceAgentPage = lazy(() => import('./pages/components/VoiceAgentPage').then(m => ({ default: m.VoiceAgentPage })));
const LumenBeamPage = lazy(() => import('./pages/backgrounds/LumenBeamPage').then(m => ({ default: m.LumenBeamPage })));
const SatinFlowPage = lazy(() => import('./pages/backgrounds/SatinFlowPage').then(m => ({ default: m.SatinFlowPage })));
const LiquidChromePage = lazy(() => import('./pages/backgrounds/LiquidChromePage').then(m => ({ default: m.LiquidChromePage })));
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

function BackgroundRedirect() {
  const { name } = useParams<{ name?: string }>();
  return <Navigate to={name ? `/docs/backgrounds/${name}` : '/docs/backgrounds'} replace />;
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

  useEffect(() => {
    let title = 'Unbrn UI - Premium Glassmorphic React Components & Shaders';
    const path = location.pathname;

    if (path === '/') {
      title = 'Unbrn UI - Premium Glassmorphic React Components & Shaders';
    } else if (path === '/docs/quick-start' || path.startsWith('/docs/quick-start/')) {
      title = 'Quick Start - unbrn/ui';
    } else if (path === '/docs/components') {
      title = 'Components - unbrn/ui';
    } else if (path === '/docs/backgrounds') {
      title = 'Backgrounds - unbrn/ui';
    } else if (path === '/docs/changelog') {
      title = 'Changelog - unbrn/ui';
    } else if (path.startsWith('/docs/components/')) {
      const cleanPath = path.replace('/docs/components/', '/components/');
      const comp = componentsMeta.find(c => c.path === cleanPath);
      title = comp ? `${comp.name} - unbrn/ui` : 'Components - unbrn/ui';
    } else if (path.startsWith('/docs/backgrounds/')) {
      const cleanPath = path.replace('/docs/backgrounds/', '/backgrounds/');
      const bg = backgroundsMeta.find(b => b.path === cleanPath);
      title = bg ? `${bg.name} - unbrn/ui` : 'Backgrounds - unbrn/ui';
    }

    document.title = title;
  }, [location.pathname]);


  return (
    <div className="unbrn-app">
      <Header
        className="unbrn-glass"
      />

      <div className="unbrn-layout">
        <Menu
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main className="unbrn-main">
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
                <Route path="components/color-picker" element={<ColorPickerPage />} />
                <Route path="components/voice-agent" element={<VoiceAgentPage />} />

                <Route path="backgrounds" element={<BackgroundsPage />} />
                <Route path="backgrounds/lumen-beam" element={<LumenBeamPage />} />
                <Route path="backgrounds/satin-flow" element={<SatinFlowPage />} />
                <Route path="backgrounds/liquid-chrome" element={<LiquidChromePage />} />
                <Route path="changelog" element={<ChangelogPage />} />
              </Route>

              <Route path="/installation" element={<Navigate to="/docs/quick-start" replace />} />
              <Route path="/installation/:framework" element={<InstallationRedirect />} />
              <Route path="/components" element={<Navigate to="/docs/components" replace />} />
              <Route path="/components/:name" element={<ComponentRedirect />} />
              <Route path="/backgrounds" element={<Navigate to="/docs/backgrounds" replace />} />
              <Route path="/backgrounds/:name" element={<BackgroundRedirect />} />
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
        <footer className="unbrn-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo" onClick={() => window.location.href = "/"}>
                <svg width="20" height="20" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 105.203C0 47.101 47.101 0 105.203 0C163.305 0 210.406 47.101 210.406 105.203V280.533C210.406 385.667 295.636 470.895 400.773 470.895C409.421 470.895 417.935 470.319 426.277 469.202C381.423 504.763 324.695 526 263.008 526C117.753 526 0 408.251 0 263V105.203Z" fill="var(--accent-color)"/>
                  <path d="M286.977 119.511C286.977 53.507 340.484 0 406.489 0C472.493 0 526 53.507 526 119.511V267.545C526 333.55 472.493 387.057 406.489 387.057C340.484 387.057 286.977 333.55 286.977 267.545V119.511Z" fill="var(--accent-color)"/>
                </svg>
                <span>unbrn/ui</span>
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
                <a href="https://github.com/unbrn/ui" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.npmjs.com/package/@unbrn/ui" target="_blank" rel="noopener noreferrer">npm</a>
                <a href="https://github.com/unbrn/ui/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a>
              </div>
              <div className="footer-links-col">
                <h4>Community</h4>
                <a href="https://x.com/kunalkandepatil" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                <a href="https://discord.gg/W8wTjESM3t" target="_blank" rel="noopener noreferrer">Discord</a>
                <a href="https://github.com/unbrn/ui/issues" target="_blank" rel="noopener noreferrer">Support</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              &copy; {new Date().getFullYear()} UNBRN UI. ALL RIGHTS RESERVED.
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
    const saved = localStorage.getItem('unbrn-theme');
    return (saved as Theme) || 'dark';
  });

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('unbrn-theme', theme);
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
