import React, { useState } from 'react';
import { Action } from '../../../package/components/Action/Action';
import type { ActionItem } from '../../../package/components/Action/Action';
import { Button } from '../../../package/components/Button/Button';
import { Avatar } from '../../../package/components/Avatar/Avatar';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { Settings, LogOut, User, HelpCircle } from 'lucide-react';

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

  const showcaseItems: ActionItem[] = [
    {
      label: 'Account Details',
      icon: <User size={14} />,
      onClick: () => setLastAction('Account Details'),
    },
    {
      label: 'Settings',
      icon: <Settings size={14} />,
      onClick: () => setLastAction('Settings'),
    },
    {
      label: 'Help & Support',
      icon: <HelpCircle size={14} />,
      onClick: () => setLastAction('Help & Support'),
    },
    {
      label: 'Sign Out',
      icon: <LogOut size={14} />,
      variant: 'destructive',
      onClick: () => setLastAction('Sign Out'),
    },
  ];

  return (
    <>
      <ComponentHeader title="Action" />

      <Showcase
        title="Preview"
        description="A click-triggered dropdown popup menu that attaches to any clickable component (buttons, avatars, text elements)."
        code={`import { Action } from '@unburn/ui/Action';
import { Button } from '@unburn/ui/Button';
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
      actionTrigger={<Button buttonVariant="filled" buttonChildren="Click Me" />}
      actionItems={items}
      actionPosition="bottom"
      actionAlign="center"
    />
  );
}`}
      >
        <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Last Action: <strong style={{ color: 'var(--text-main)' }}>{lastAction}</strong>
          </div>
          <Action
            actionTrigger={<Button buttonVariant="filled" buttonChildren="Click Me" />}
            actionItems={baseItems}
            actionPosition="bottom"
            actionAlign="center"
          />
        </div>
      </Showcase>

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { Action } from '@unburn/ui/Action';`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Implemented to Button & Avatar"
          description="The Action component can wrap buttons, avatars, or any standard clickable markup."
          code={`import { Action } from '@unburn/ui/Action';
import { Button } from '@unburn/ui/Button';
import { Avatar } from '@unburn/ui/Avatar';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Example() {
  const items = [
    { label: 'Profile', icon: <User size={14} /> },
    { label: 'Settings', icon: <Settings size={14} /> },
    { label: 'Sign Out', icon: <LogOut size={14} />, variant: 'destructive' }
  ];

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      {/* Button Trigger */}
      <Action
        actionTrigger={<Button buttonVariant="outlined" buttonChildren="Open Options" />}
        actionItems={items}
      />

      {/* Avatar Trigger */}
      <Action
        actionTrigger={
          <Avatar
            avatarSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            avatarFallback="JD"
            avatarShowStatus
            avatarSize="md"
            avatarClassName="cursor-pointer"
          />
        }
        actionItems={items}
        actionAlign="start"
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <Action
              actionTrigger={<Button buttonVariant="outlined" buttonChildren="Open Options" />}
              actionItems={showcaseItems}
              actionPosition="bottom"
              actionAlign="center"
            />

            <Action
              actionTrigger={
                <Avatar
                  avatarSrc="https://avatars.githubusercontent.com/u/197804266"
                  avatarFallback="KP"
                  avatarSize="md"
                  avatarStyle={{ cursor: 'pointer' }}
                />
              }
              actionItems={showcaseItems}
              actionPosition="bottom"
              actionAlign="start"
            />
          </div>
        </Showcase>

        <Showcase
          title="Positions & Alignments"
          description="Supports placement in four directions (top, bottom, left, right) and alignment options (start, center, end)."
          code={`import { Action } from '@unburn/ui/Action';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  const items = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Sign Out', variant: 'destructive', onClick: () => console.log('Sign Out') }
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Action
        actionPosition="top"
        actionAlign="center"
        actionTrigger={<Button buttonVariant="duo" buttonChildren="Top (Center)" />}
        actionItems={items}
      />
      <Action
        actionPosition="bottom"
        actionAlign="end"
        actionTrigger={<Button buttonVariant="duo" buttonChildren="Bottom (End)" />}
        actionItems={items}
      />
      <Action
        actionPosition="left"
        actionAlign="center"
        actionTrigger={<Button buttonVariant="duo" buttonChildren="Left (Center)" />}
        actionItems={items}
      />
      <Action
        actionPosition="right"
        actionAlign="start"
        actionTrigger={<Button buttonVariant="duo" buttonChildren="Right (Start)" />}
        actionItems={items}
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '2rem' }}>
            <Action
              actionPosition="top"
              actionAlign="center"
              actionTrigger={<Button buttonVariant="duo" buttonChildren="Top (Center)" />}
              actionItems={baseItems}
            />
            <Action
              actionPosition="bottom"
              actionAlign="end"
              actionTrigger={<Button buttonVariant="duo" buttonChildren="Bottom (End)" />}
              actionItems={baseItems}
            />
            <Action
              actionPosition="left"
              actionAlign="center"
              actionTrigger={<Button buttonVariant="duo" buttonChildren="Left (Center)" />}
              actionItems={baseItems}
            />
            <Action
              actionPosition="right"
              actionAlign="start"
              actionTrigger={<Button buttonVariant="duo" buttonChildren="Right (Start)" />}
              actionItems={baseItems}
            />
          </div>
        </Showcase>

        <Showcase
          title="Dropdown Header & Footer"
          description="Supports built-in header and footer sections separated from action items with premium borders, ideal for user profile cards and settings actions."
          code={`import { Action } from '@unburn/ui/Action';
import { Avatar } from '@unburn/ui/Avatar';
import { Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Example() {
  const items = [
    { label: 'Settings', icon: <Settings size={14} /> },
    { label: 'Support', icon: <HelpCircle size={14} /> },
    { label: 'Sign Out', icon: <LogOut size={14} />, variant: 'destructive' }
  ];

  return (
    <Action
      actionTrigger={<Avatar avatarSrc="..." avatarSize="md" />}
      actionHeader={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '200px' }}>
          <Avatar avatarSrc="..." avatarSize="sm" />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Kunal KandePatil</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kunal@unburn.tech</div>
          </div>
        </div>
      }
      actionItems={items}
    />
  );
}`}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Action
              actionTrigger={
                <Avatar
                  avatarSrc="https://avatars.githubusercontent.com/u/197804266"
                  avatarFallback="KP"
                  avatarSize="md"
                  avatarStyle={{ cursor: 'pointer' }}
                />
              }
              actionHeader={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '200px' }}>
                  <Avatar
                    avatarSrc="https://avatars.githubusercontent.com/u/197804266"
                    avatarFallback="KP"
                    avatarSize="sm"
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Kunal KandePatil</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kunal@unburn.tech</div>
                  </div>
                </div>
              }
              actionItems={[
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
              actionPosition="bottom"
              actionAlign="center"
            />
          </div>
        </Showcase>

        <Showcase
          title="Auto Positioning"
          description="Setting actionPosition to 'auto' dynamically calculates the best orientation based on the viewport layout boundaries and available space."
          code={`import { Action } from '@unburn/ui/Action';
import { Button } from '@unburn/ui/Button';

export default function Example() {
  const items = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Sign Out', variant: 'destructive', onClick: () => console.log('Sign Out') }
  ];

  return (
    <Action
      actionPosition="auto"
      actionTrigger={<Button buttonVariant="outlined" buttonChildren="Auto Placement" />}
      actionItems={items}
    />
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', padding: '2rem' }}>
            <Action
              actionPosition="auto"
              actionTrigger={<Button buttonVariant="outlined" buttonChildren="Auto Placement" />}
              actionItems={baseItems}
            />
          </div>
        </Showcase>
      </div>

      <Props
        title="Action Props"
        props={[
          { name: 'actionTrigger', type: 'ReactNode', required: true, description: 'The element (e.g. Button or Avatar) that toggles the dropdown on click.' },
          { name: 'actionItems', type: 'ActionItem[]', description: 'Array of dropdown options (label, icon, onClick, href, variant, disabled).' },
          { name: 'actionChildren', type: 'ReactNode', description: 'Alternatively pass React children inside the dropdown popover overlay for custom layouts.' },
          { name: 'children', type: 'ReactNode', description: 'Alternative to actionChildren for passing custom dropdown popover overlay content.' },
          { name: 'actionHeader', type: 'ReactNode', description: 'Optional header content rendered at the top of the dropdown, separated by a dividing line.' },
          { name: 'actionFooter', type: 'ReactNode', description: 'Optional footer content rendered at the bottom of the dropdown, separated by a dividing line.' },
          { name: 'actionPosition', type: "'top' | 'bottom' | 'left' | 'right' | 'auto'", defaultValue: "'bottom'", description: 'Placement of the dropdown content relative to the trigger element.' },
          { name: 'actionAlign', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment of the dropdown content relative to the trigger element.' },
          { name: 'actionVisible', type: 'boolean', description: 'Explicit control visibility override (controlled mode).' },
          { name: 'actionOnVisibleChange', type: '(visible: boolean) => void', description: 'Callback triggered when dropdown visibility toggles.' },
          { name: 'actionDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables triggering the dropdown menu.' },
          { name: 'actionAccentColor', type: 'string', description: 'Custom primary accent color for active item styling overrides (hex, rgb, etc.).' },
          { name: 'actionCloseOnSelect', type: 'boolean', defaultValue: 'true', description: 'Automatically close the dropdown overlay when an item is selected.' },
          { name: 'actionClassName', type: 'string', description: 'Custom CSS class for the root wrapper.' },
          { name: 'actionStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root wrapper.' },
          { name: 'classNames', type: 'object', description: 'Custom CSS class configuration mapping (actionRoot, actionTrigger, actionDropdown, actionItem).' },
          { name: 'styles', type: 'object', description: 'Inline style configuration mapping.' },
        ]}
        stylingTargets={[
          { name: 'actionRoot', description: 'Styles the outer Action wrapper container.' },
          { name: 'actionTrigger', description: 'Styles the wrapper around the trigger element.' },
          { name: 'actionDropdown', description: 'Styles the absolute positioned dropdown card popover.' },
          { name: 'actionItem', description: 'Styles the individual action button or anchor items.' },
        ]}
        stylingStructure={`actionRoot
 ├── actionTrigger
 └── actionDropdown
      └── actionItem`}
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
