import React, { useState } from 'react';
import { Dock } from '../../../package/components/Dock/Dock';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Plus, Search, Home, Sun, Moon } from 'lucide-react';
import { ComponentHeader } from '../../components/layout/ComponentHeader';

export interface DockPageProps {
  globalTheme?: 'light' | 'dark';
  setGlobalTheme?: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  globalAccent?: string;
  setGlobalAccent?: React.Dispatch<React.SetStateAction<string>>;
}

export const DockPage: React.FC<DockPageProps> = ({ globalTheme, setGlobalTheme, globalAccent, setGlobalAccent }) => {
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('dark');
  const [localAccent, setLocalAccent] = useState('red');

  const theme = globalTheme || localTheme;
  const setTheme = setGlobalTheme || setLocalTheme;
  const accent = globalAccent || localAccent;
  const setAccent = setGlobalAccent || setLocalAccent;
  const [demoOpen1, setDemoOpen1] = useState(false);
  const [demoOpen2, setDemoOpen2] = useState(false);

  return (
    <>
      <ComponentHeader title="Dock" />

      <Showcase
        title="PREVIEW"
        code={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  return (
    <Dock
      isMenuOpen={isOpen}
      onMenuToggle={() => setIsOpen(!isOpen)}
    >
      <Button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </Dock>
  );
}`}
      >
        <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Dock
            isMenuOpen={demoOpen1}
            onMenuToggle={() => setDemoOpen1(!demoOpen1)}
            className="showcase-dock"
          >
            <Button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button onClick={() => setAccent(accent === 'red' ? 'blue' : 'red')}>
              <div
                className="unburn-accent-preview"
                style={{ backgroundColor: 'var(--accent-color)' }}
              />
            </Button>
          </Dock>
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {children}
      <Dock 
        isMenuOpen={isOpen}
        onMenuToggle={() => setIsOpen(!isOpen)}
      >
        <Button onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </Dock>
    </>
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="SIZES"
          description="Choose from three sizes: small, medium, or large."
          code={`import { Dock } from '@unburn/ui/Dock';

export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Dock size="sm" isMenuOpen={false} onMenuToggle={() => {}} />
      <Dock size="default" isMenuOpen={false} onMenuToggle={() => {}} />
      <Dock size="lg" isMenuOpen={false} onMenuToggle={() => {}} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
              <Dock size="sm" isMenuOpen={false} onMenuToggle={() => { }} className="showcase-dock" />
            </div>
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
              <Dock size="default" isMenuOpen={false} onMenuToggle={() => { }} className="showcase-dock" />
            </div>
            <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
              <Dock size="lg" isMenuOpen={false} onMenuToggle={() => { }} className="showcase-dock" />
            </div>
          </div>
        </Showcase>

        <Showcase
          title="CUSTOM ACTIONS"
          description="Add custom action buttons inside the dock."
          code={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Home, Search, Plus } from 'lucide-react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dock
      isMenuOpen={isOpen}
      onMenuToggle={() => setIsOpen(!isOpen)}
    >
      <Button><Home size={20} /></Button>
      <Button><Search size={20} /></Button>
      <Button><Plus size={20} /></Button>
    </Dock>
  );
}`}
        >
          <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Dock
              isMenuOpen={demoOpen2}
              onMenuToggle={() => setDemoOpen2(!demoOpen2)}
              className="showcase-dock"
            >
              <Button><Home size={20} /></Button>
              <Button><Search size={20} /></Button>
              <Button><Plus size={20} /></Button>
            </Dock>
          </div>
        </Showcase>

        <Showcase
          title="CONFIGURATION"
          description="Show or hide the collapse button on the right."
          code={`import { Dock } from '@unburn/ui/Dock';

export default function Example() {
  return (
    <Dock
      showHideToggle={false}
      isMenuOpen={false}
      onMenuToggle={() => {}}
    />
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
            <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
              <Dock
                showHideToggle={false}
                isMenuOpen={false}
                onMenuToggle={() => { }}
                className="showcase-dock"
              />
            </div>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'isMenuOpen', type: 'boolean', required: true, description: 'Turn the main menu on or off.' },
          { name: 'onMenuToggle', type: 'function', required: true, description: 'Function called when clicking the menu button.' },
          { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'bottom'", description: 'Where the dock attaches on the screen (top, bottom, left, or right).' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: 'The size of the dock.' },
          { name: 'showHideToggle', type: 'boolean', defaultValue: 'true', description: 'Show the arrow button to hide the dock.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the dock.' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part.' },
        ]}
      />

      <style>{`
        .showcase-dock {
          position: absolute !important;
          bottom: 0.5rem !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          display: flex !important;
          z-index: 1 !important;
          margin-bottom: 0 !important;
        }

        .showcase-dock.unburn-collapsed {
          bottom: -4rem !important;
        }

        .unburn-accent-preview {
          width: 20px;
          height: 20px;
          border-radius: var(--radius);
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
};
