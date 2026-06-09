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
}

export const DockPage: React.FC<DockPageProps> = ({ globalTheme, setGlobalTheme }) => {
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('dark');

  const theme = globalTheme || localTheme;
  const setTheme = setGlobalTheme || setLocalTheme;
  const [demoOpen1, setDemoOpen1] = useState(false);
  const [demoOpen2, setDemoOpen2] = useState(false);

  return (
    <>
      <ComponentHeader title="Dock" />

      <Showcase
        title="Preview"
        code={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  return (
    <Dock
      dockIsMenuOpen={isOpen}
      dockOnMenuToggle={() => setIsOpen(!isOpen)}
      dockChildren={
        <Button buttonOnClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} buttonChildren={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} />
      }
    />
  );
}`}
      >
        <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Dock
            dockIsMenuOpen={demoOpen1}
            dockOnMenuToggle={() => setDemoOpen1(!demoOpen1)}
            dockClassName="showcase-dock"
            dockChildren={
              <Button
                buttonOnClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                buttonChildren={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              />
            }
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {children}
      <Dock 
        dockIsMenuOpen={isOpen}
        dockOnMenuToggle={() => setIsOpen(!isOpen)}
        dockChildren={
          <Button buttonOnClick={toggleTheme} buttonChildren={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} />
        }
      />
    </>
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Custom Actions"
          description="Add custom action buttons inside the dock."
          code={`import { Dock } from '@unburn/ui/Dock';
import { Button } from '@unburn/ui/Button';
import { Home, Search, Plus } from 'lucide-react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dock
      dockIsMenuOpen={isOpen}
      dockOnMenuToggle={() => setIsOpen(!isOpen)}
      dockChildren={
        <>
          <Button buttonChildren={<Home size={20} />} />
          <Button buttonChildren={<Search size={20} />} />
          <Button buttonChildren={<Plus size={20} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Dock
              dockIsMenuOpen={demoOpen2}
              dockOnMenuToggle={() => setDemoOpen2(!demoOpen2)}
              dockClassName="showcase-dock"
              dockChildren={
                <>
                  <Button buttonChildren={<Home size={20} />} />
                  <Button buttonChildren={<Search size={20} />} />
                  <Button buttonChildren={<Plus size={20} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Configuration"
          description="Show or hide the collapse button on the right."
          code={`import { Dock } from '@unburn/ui/Dock';

export default function Example() {
  return (
    <Dock
      dockShowHideToggle={false}
      dockIsMenuOpen={false}
      dockOnMenuToggle={() => {}}
    />
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
            <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
              <Dock
                dockShowHideToggle={false}
                dockIsMenuOpen={false}
                dockOnMenuToggle={() => { }}
                dockClassName="showcase-dock"
              />
            </div>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'dockIsMenuOpen', type: 'boolean', required: true, description: 'Turn the main menu on or off.' },
          { name: 'dockOnMenuToggle', type: 'function', required: true, description: 'Function called when clicking the menu button.' },
          { name: 'dockPosition', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'bottom'", description: 'Where the dock attaches on the screen (top, bottom, left, or right).' },
          { name: 'dockShowHideToggle', type: 'boolean', defaultValue: 'true', description: 'Show the arrow button to hide the dock.' },
          { name: 'dockClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'dockStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'dockChildren', type: 'ReactNode', description: 'The buttons or action components inside the dock.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the dock (prefixed with dock).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with dock).' },
        ]}
        stylingTargets={[
          { name: 'dockRoot', description: 'Styles the outer fixed container overlay.' },
          { name: 'dockContainer', description: 'Styles the main blurred dock bar wrapper.' },
          { name: 'dockTrigger', description: 'Styles the main hamburger/menu action button.' },
          { name: 'dockActionBtn', description: 'Styles each action button slot inside the dock.' },
          { name: 'dockCollapseBtn', description: 'Styles the button to hide the dock.' },
          { name: 'dockExpandBtn', description: 'Styles the floating indicator to expand the dock.' },
        ]}
        stylingStructure={`dockRoot
 └── dockContainer
      ├── dockTrigger
      ├── dockActionBtn
      ├── dockCollapseBtn
      └── dockExpandBtn`}
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
