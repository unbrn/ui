import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import './App.css';
import { Header } from './components/layout/Header';
import { Menu } from './components/layout/Menu';
import { DocsLayout } from './components/layout/DocsLayout';
import { Dock } from '../package/components/Dock/Dock';
import { Button } from '../package/components/Button/Button';
import { Sun, Moon } from 'lucide-react';
import { DocsSearchModal } from './components/layout/DocsSearchModal';
import componentsData from './data/components.json';
import backgroundsData from './data/backgrounds.json';



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

  // Dynamic head and meta tags updates for client-side routing
  useEffect(() => {
    let title = 'Unbrn UI - Minimalist UI Crafted with Precision.';
    let description = 'A clean, modern React component library built with vanilla CSS. Get beautiful, highly-customizable components that look great out of the box.';
    const isHome = location.pathname === '/';

    if (!isHome) {
      if (location.pathname === '/docs/quick-start' || location.pathname.startsWith('/docs/quick-start/')) {
        title = 'Quick Start - unbrn/ui';
        description = 'Get started with Unbrn UI. Install the package and set up styling in your React projects.';
      } else if (location.pathname === '/docs/components') {
        title = 'Components - unbrn/ui';
        description = 'Browse the full collection of premium, softly-rounded React components in Unbrn UI.';
      } else if (location.pathname === '/docs/backgrounds') {
        title = 'Backgrounds - unbrn/ui';
        description = 'Interactive background WebGL shaders to elevate your website aesthetics.';
      } else if (location.pathname === '/docs/changelog') {
        title = 'Changelog - unbrn/ui';
        description = 'See all recent releases, features, improvements, and bug fixes for Unbrn UI.';
      } else {
        // Search in components
        const comp = componentsData.find(item => `/docs${item.path}` === location.pathname);
        if (comp) {
          title = `${comp.name} - unbrn/ui`;
          description = comp.description;
        } else {
          // Search in backgrounds
          const bg = backgroundsData.find(item => `/docs${item.path}` === location.pathname);
          if (bg) {
            title = `${bg.name} - unbrn/ui`;
            description = bg.description;
          }
        }
      }
    }

    // Update document title
    document.title = title;

    const updateMetaTag = (nameAttr: string, valueAttr: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${valueAttr}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, valueAttr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Update meta description
    updateMetaTag('name', 'description', description);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', `https://ui.unbrn.tech${location.pathname}`);

    const imageUrl = isHome
      ? 'https://ui.unbrn.tech/unbrn_ui_banner.jpg'
      : `https://ui.unbrn.tech/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    updateMetaTag('property', 'og:image', imageUrl);

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', imageUrl);
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
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            buttonOnClick={toggleTheme}
            buttonIcon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          />
        }
      />

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
