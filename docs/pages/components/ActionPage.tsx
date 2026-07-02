import React, { useState } from 'react';
import { Action } from '../../../package/components/Action/Action';
import type { ActionItem } from '../../../package/components/Action/Action';
import { Button } from '../../../package/components/Button/Button';
import { Avatar } from '../../../package/components/Avatar/Avatar';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { Settings, LogOut, HelpCircle } from 'lucide-react';

export const ActionPage: React.FC = () => {
  const [lastAction, setLastAction] = useState<string>('None');

  const baseItems: ActionItem[] = [
    {
      label: 'Settings',
      icon: <Settings size={14} />,
      onClick: () => setLastAction('Clicked Settings'),
    },
    {
      label: 'Sign Out',
      icon: <LogOut size={14} />,
      variant: 'destructive',
      onClick: () => setLastAction('Clicked Sign Out'),
    },
  ];



  return (
    <>
      <ComponentHeader title="Action" />

      <Showcase
        title="Preview"
        description="A click-triggered dropdown popup menu that attaches to any clickable component (buttons, avatars, text elements)."
        code={`import { Action } from '@unbrn/ui/Action';
import { Button } from '@unbrn/ui/Button';
import { Settings, LogOut } from 'lucide-react';

export default function Example() {
  const items = [
    {
      label: 'Settings',
      icon: <Settings size={14} />,
      onClick: () => console.log('Settings clicked'),
    },
    {
      label: 'Sign Out',
      icon: <LogOut size={14} />,
      variant: 'destructive',
      onClick: () => console.log('Sign Out clicked'),
    },
  ];

  return (
    <Action
      trigger={<Button variant="filled" children="Click Me" />}
      items={items}
      position="bottom"
      align="center"
    />
  );
}`}
      >
        <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Last Action: <strong style={{ color: 'var(--text-main)' }}>{lastAction}</strong>
          </div>
          <Action
            trigger={<Button variant="filled" children="Click Me" />}
            items={baseItems}
            position="bottom"
            align="center"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          language="tsx"
          code={`import { Action } from '@unbrn/ui/Action';`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Sizes"
          description="Supports two visual sizes for dropdown items: 1 and 2."
          code={`import { Action } from '@unbrn/ui/Action';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const items = [
    { label: 'Settings', icon: <Settings size={14} /> },
    { label: 'Sign Out', variant: 'destructive', icon: <LogOut size={14} /> }
  ];

  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Action
        size={1}
        trigger={<Button variant="outlined" children="Small Items" />}
        items={items}
      />
      <Action
        size={2}
        trigger={<Button variant="outlined" children="Default Items" />}
        items={items}
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', padding: '2rem', flexDirection: "column" }}>
            <Action
              size={1}
              trigger={<Button variant="outlined" children="Small Items" />}
              items={baseItems}
            />
            <Action
              size={2}
              trigger={<Button variant="outlined" children="Default Items" />}
              items={baseItems}
            />
          </div>
        </Showcase>

        <Showcase
          title="Dropdown Header & Footer"
          description="Supports built-in header and footer sections separated from action items with premium borders, ideal for user profile cards and settings actions."
          code={`import { Action } from '@unbrn/ui/Action';
import { Avatar } from '@unbrn/ui/Avatar';
import { Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Example() {
  const items = [
    { label: 'Settings', icon: <Settings size={14} /> },
    { label: 'Support', icon: <HelpCircle size={14} /> },
    { label: 'Sign Out', icon: <LogOut size={14} />, variant: 'destructive' }
  ];

  return (
    <Action
      trigger={<Avatar src="..." size={3} />}
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '200px' }}>
          <Avatar src="..." size={2} />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Kunal KandePatil</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kunal@unbrn.tech</div>
          </div>
        </div>
      }
      items={items}
    />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Action
              trigger={
                <Avatar
                  src="https://avatars.githubusercontent.com/u/197804266"
                  fallback="KP"
                  size={3}
                  style={{ cursor: 'pointer' }}
                />
              }
              header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '200px' }}>
                  <Avatar
                    src="https://avatars.githubusercontent.com/u/197804266"
                    fallback="KP"
                    size={2}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Kunal KandePatil</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kunal@unbrn.tech</div>
                  </div>
                </div>
              }
              items={[
                {
                  label: 'Settings',
                  icon: <Settings size={14} />,
                  onClick: () => setLastAction('Clicked Settings'),
                },
                {
                  label: 'Support',
                  icon: <HelpCircle size={14} />,
                  onClick: () => setLastAction('Clicked Support'),
                },
                {
                  label: 'Sign Out',
                  icon: <LogOut size={14} />,
                  variant: 'destructive',
                  onClick: () => setLastAction('Clicked Sign Out'),
                },
              ]}
              position="bottom"
              align="center"
            />
          </div>
        </Showcase>

        <Showcase
          title="Auto Positioning"
          description="Setting position to 'auto' dynamically calculates the best orientation based on the viewport layout boundaries and available space."
          code={`import { Action } from '@unbrn/ui/Action';
import { Button } from '@unbrn/ui/Button';

export default function Example() {
  const items = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Sign Out', variant: 'destructive', onClick: () => console.log('Sign Out') }
  ];

  return (
    <Action
      position="auto"
      trigger={<Button variant="outlined" children="Auto Placement" />}
      items={items}
    />
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', padding: '2rem' }}>
            <Action
              position="auto"
              trigger={<Button variant="outlined" children="Auto Placement" />}
              items={baseItems}
            />
          </div>
        </Showcase>
      </div>

      <Props
        title="Action Props"
        props={[
          { name: 'trigger', type: 'ReactNode', required: true, description: 'The element (e.g. Button or Avatar) that toggles the dropdown on click.' },
          { name: 'items', type: 'ActionItem[]', description: 'Array of dropdown options (label, icon, onClick, href, variant, disabled).' },
          { name: '', type: 'ReactNode', description: 'Alternatively pass React children inside the dropdown popover overlay for custom layouts.' },
          { name: 'children', type: 'ReactNode', description: 'Alternative to for passing custom dropdown popover overlay content.' },
          { name: 'header', type: 'ReactNode', description: 'Optional header content rendered at the top of the dropdown, separated by a dividing line.' },
          { name: 'footer', type: 'ReactNode', description: 'Optional footer content rendered at the bottom of the dropdown, separated by a dividing line.' },
          { name: 'position', type: "'top' | 'bottom' | 'left' | 'right' | 'auto'", defaultValue: "'auto'", description: 'Placement of the dropdown content relative to the trigger element.' },
          { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment of the dropdown content relative to the trigger element.' },
          { name: 'size', type: '1 | 2', defaultValue: '2', description: 'The visual size of the trigger button and dropdown items.' },
          { name: 'visible', type: 'boolean', description: 'Explicit control visibility override (controlled mode).' },
          { name: 'onVisibleChange', type: '(visible: boolean) => void', description: 'Callback triggered when dropdown visibility toggles.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables triggering the dropdown menu.' },
          { name: 'accentColor', type: 'string', description: 'Custom primary accent color for active item styling overrides (hex, rgb, etc.).' },
          { name: 'closeOnSelect', type: 'boolean', defaultValue: 'true', description: 'Automatically close the dropdown overlay when an item is selected.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the root wrapper.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root wrapper.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS class configuration mapping (root, trigger, dropdown, item).' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'root', description: 'Styles the outer Action wrapper container.' },
          { name: 'trigger', description: 'Styles the wrapper around the trigger element.' },
          { name: 'dropdown', description: 'Styles the absolute positioned dropdown card popover.' },
          { name: 'item', description: 'Styles the individual action button or anchor items.' },
        ]}
        stylingStructure={`root
 ├── trigger
 └── dropdown
      └── item`}
      />

      <Props
        title="ActionItem Props"
        props={[
          { name: 'id', type: 'string', description: 'Optional unique identifier for the action item.' },
          { name: 'label', type: 'ReactNode', required: true, description: 'The display label or content inside the item.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional leading icon to display next to the label.' },
          { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Callback triggered when the action item is clicked.' },
          { name: 'href', type: 'string', description: 'Optional link destination. If provided, renders the item as an anchor <a> element.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction with the item.' },
          { name: 'variant', type: "'default' | 'destructive' | 'primary'", defaultValue: "'default'", description: 'Color treatment/styling variant for the action item.' },
          { name: 'className', type: 'string', description: 'Custom CSS class for the item element.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the item element.' },
        ]}
      />
    </>
  );
};
