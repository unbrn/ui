import React, { useState } from 'react';
import { Dock } from '../../../package/components/Dock/Dock';
import { Button } from '../../../package/components/Button/Button';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { Plus, Search, Home, Sun, Moon, Trash } from 'lucide-react';
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
        code={`import { Dock } from '@unbrn/ui/Dock';
import { Button } from '@unbrn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  return (
    <Dock
      isMenuOpen={isOpen}
      onMenuToggle={() => setIsOpen(!isOpen)}
      children={
        <Button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} children={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} />
      }
    />
  );
}`}
      >
        <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Dock
            isMenuOpen={demoOpen1}
            onMenuToggle={() => setDemoOpen1(!demoOpen1)}
            className="showcase-dock"
            children={
              <Button
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                icon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              />
            }
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Dock } from '@unbrn/ui/Dock';
import { Button } from '@unbrn/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {children}
      <Dock 
        isMenuOpen={isOpen}
        onMenuToggle={() => setIsOpen(!isOpen)}
        children={
          <Button onClick={toggleTheme} children={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} />
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
          description="By default, buttons inside the dock use the duo variant and large size."
          code={`import { Dock } from '@unbrn/ui/Dock';
import { Button } from '@unbrn/ui/Button';
import { Home, Search, Plus } from 'lucide-react';

export default function Example() {
  return (
    <Dock
      isMenuOpen={false}
      onMenuToggle={() => {}}
      children={
        <>
          <Button icon={<Home size={20} />} />
          <Button icon={<Search size={20} />} />
          <Button icon={<Plus size={20} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Dock
              isMenuOpen={demoOpen2}
              onMenuToggle={() => setDemoOpen2(!demoOpen2)}
              className="showcase-dock"
              children={
                <>
                  <Button icon={<Home size={20} />} />
                  <Button icon={<Search size={20} />} />
                  <Button icon={<Plus size={20} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Global Customization"
          description="Style all dock buttons globally using variant, size, and accentColor."
          code={`import { Dock } from '@unbrn/ui/Dock';
import { Button } from '@unbrn/ui/Button';
import { Home, Search, Plus } from 'lucide-react';

export default function Example() {
  return (
    <Dock
      isMenuOpen={false}
      onMenuToggle={() => {}}
      accentColor="#10b981"
      children={
        <>
          <Button icon={<Home size={20} />} />
          <Button icon={<Search size={20} />} />
          <Button icon={<Plus size={20} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Dock
              isMenuOpen={false}
              onMenuToggle={() => { }}
              className="showcase-dock"
              accentColor="#10b981"
              showHideToggle={false}
              children={
                <>
                  <Button icon={<Home size={20} />} />
                  <Button icon={<Search size={20} />} />
                  <Button icon={<Plus size={20} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Buttons with Text & Overrides"
          description="Buttons inside the dock can include text labels and override global styles individually."
          code={`import { Dock } from '@unbrn/ui/Dock';
import { Button } from '@unbrn/ui/Button';
import { Trash } from 'lucide-react';

export default function Example() {
  return (
    <Dock
      showMenuToggle={false}
      showHideToggle={false}
      children={
        <>
          <Button>Save Changes</Button>
          <Button accentColor="red" icon={<Trash size={20} />} />
        </>
      }
    />
  );
}`}
        >
          <div style={{ height: '120px', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Dock
              isMenuOpen={false}
              onMenuToggle={() => { }}
              className="showcase-dock"
              showMenuToggle={false}
              showHideToggle={false}
              children={
                <>
                  <Button>Save Changes</Button>
                  <Button accentColor="red" icon={<Trash size={20} />} />
                </>
              }
            />
          </div>
        </Showcase>

        <Showcase
          title="Configuration"
          description="Show or hide the collapse button on the right."
          code={`import { Dock } from '@unbrn/ui/Dock';
 
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
          { name: 'variant', type: "'filled' | 'outlined'", defaultValue: "'outlined'", description: 'The visual style variant of the dock bar.' },
          { name: 'isMenuOpen', type: 'boolean', defaultValue: 'false', description: 'Turn the main menu on or off.' },
          { name: 'onMenuToggle', type: 'function', description: 'Function called when clicking the menu button.' },
          { name: 'showMenuToggle', type: 'boolean', defaultValue: 'true', description: 'Show the main menu hamburger/toggle button.' },
          { name: 'position', type: "'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", defaultValue: "'bottom'", description: 'Where the dock attaches on the screen.' },
          { name: 'accentColor', type: 'string', description: 'Custom accent color for the dock container.' },
          { name: 'showHideToggle', type: 'boolean', defaultValue: 'true', description: 'Show the arrow button to hide the dock.' },
          { name: 'buttonSize', type: '1 | 2 | 3', defaultValue: '3', description: 'Default size for all buttons inside the dock.' },
          { name: 'buttonVariant', type: "'filled' | 'outlined' | 'duo' | 'ghost'", defaultValue: "'duo'", description: 'Default variant for all buttons inside the dock.' },
          { name: 'buttonAccentColor', type: 'string', description: 'Default accent color for all buttons inside the dock.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
          { name: 'children', type: 'ReactNode', description: 'The buttons or action components inside the dock.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS classes for each part of the dock (prefixed with dock).' },
          { name: 'styles', type: 'object', description: 'Custom inline CSS styles for each part (prefixed with dock).' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer fixed container overlay.' },
          { name: 'container', description: 'Styles the main blurred dock bar wrapper.' },
          { name: 'trigger', description: 'Styles the main hamburger/menu action button.' },
          { name: 'actionBtn', description: 'Styles each action button slot inside the dock.' },
          { name: 'collapseBtn', description: 'Styles the button to hide the dock.' },
          { name: 'expandBtn', description: 'Styles the floating indicator to expand the dock.' },
        ]}
        stylingStructure={`root
 └── container
      ├── trigger
      ├── actionBtn
      ├── collapseBtn
      └── expandBtn`}
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

        .showcase-dock.unbrn-collapsed {
          bottom: -4rem !important;
        }

        .unbrn-accent-preview {
          width: 20px;
          height: 20px;
          border-radius: var(--radius);
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
};
