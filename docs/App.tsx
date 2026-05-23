import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header';
import { Menu } from './components/layout/Menu';
import { Dock } from '../package/components/Dock/Dock';
import { Button } from '../package/components/Button/Button';
import { Sun, Moon } from 'lucide-react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ButtonsPage = lazy(() => import('./pages/components/ButtonsPage').then(m => ({ default: m.ButtonsPage })));
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
const DashboardPage = lazy(() => import('./pages/examples/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage').then(m => ({ default: m.ExamplesPage })));
const AuthPage = lazy(() => import('./pages/examples/AuthPage').then(m => ({ default: m.AuthPage })));
const DropzonePage = lazy(() => import('./pages/components/DropzonePage').then(m => ({ default: m.DropzonePage })));
const LandingPage = lazy(() => import('./pages/examples/LandingPage').then(m => ({ default: m.LandingPage })));
const VideoEmbedPage = lazy(() => import('./pages/components/VideoEmbedPage').then(m => ({ default: m.VideoEmbedPage })));

type Theme = 'light' | 'dark';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('unburn-theme');
    return (saved as Theme) || 'dark';
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('unburn-accent') || 'green';
  });

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('unburn-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('unburn-accent', accent);
  }, [accent]);

  return (
    <Router>
      <ScrollToTop />
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
                <Route path="/examples" element={<ExamplesPage />} />
                <Route path="/examples/dashboard" element={<DashboardPage />} />
                <Route path="/examples/auth" element={<AuthPage />} />
                <Route path="/examples/landing" element={<LandingPage />} />
                <Route path="/installation" element={<InstallationPage />} />
                <Route path="/installation/:framework" element={<InstallationPage />} />
                <Route path="/components" element={<ComponentsPage />} />
                <Route path="/components/buttons" element={<ButtonsPage />} />
                <Route path="/components/avatars" element={<AvatarsPage />} />
                <Route path="/components/alerts" element={<AlertsPage />} />
                <Route path="/components/accordions" element={<AccordionsPage />} />
                <Route path="/components/badges" element={<BadgesPage />} />
                <Route path="/components/dock" element={<DockPage globalTheme={theme} setGlobalTheme={setTheme} globalAccent={accent} setGlobalAccent={setAccent} />} />
                <Route path="/components/checkbox" element={<CheckboxPage />} />
                <Route path="/components/switch" element={<SwitchPage />} />
                <Route path="/components/select" element={<SelectPage />} />
                <Route path="/components/inputs" element={<InputsPage />} />
                <Route path="/components/textarea" element={<TextareaPage />} />
                <Route path="/components/code-block" element={<CodeBlockPage />} />
                <Route path="/components/dropzone" element={<DropzonePage />} />
                <Route path="/components/video-embed" element={<VideoEmbedPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        <Dock
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setMenuOpen(!isMenuOpen)}
          position='bottom'
        >
          {!isMenuOpen && (
            <>
              <Button onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button onClick={() => {
                const colors = ['red', 'orange', 'blue', 'green', 'purple', theme === 'dark' ? 'white' : 'black'];
                const currentIndex = colors.indexOf(accent);
                const nextIndex = (currentIndex + 1) % colors.length;
                setAccent(colors[nextIndex]);
              }}>
                <div
                  className="unburn-accent-preview"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />
              </Button>
            </>
          )}
        </Dock>

        <footer className="unburn-footer">
          &copy; 2026 UNBURN UI. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </Router>
  );
}

export default App;
